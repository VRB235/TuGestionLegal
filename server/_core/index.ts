import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

function buildGoogleCalendarUrl(booking: { serviceType: string; date: string; time: string; name: string }): string {
  // date is yyyy-MM-dd, time is HH:mm
  const [year, month, day] = booking.date.split("-").map(Number);
  const [hour, minute] = booking.time.split(":").map(Number);
  // Start time in UTC format (Spain is UTC+2 in summer, UTC+1 in winter - use Europe/Madrid)
  const startDate = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(hour).padStart(2, "0")}${String(minute).padStart(2, "0")}00`;
  // End time: 1 hour later
  const endHour = hour + 1;
  const endDate = `${year}${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}T${String(endHour).padStart(2, "0")}${String(minute).padStart(2, "0")}00`;
  const title = encodeURIComponent(`Asesor\u00eda - ${booking.name} (${booking.serviceType})`);
  const details = encodeURIComponent(`Cliente: ${booking.name}\nServicio: ${booking.serviceType}\nHora: ${booking.time}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startDate}/${endDate}&details=${details}&ctz=Europe/Madrid`;
}

function buildActionPage(title: string, message: string, type: "success" | "rejected" | "error" | "info", calendarUrl?: string): string {
  const colors = {
    success: { bg: "#f0fdf4", border: "#16a34a", icon: "\u2713", iconBg: "#16a34a" },
    rejected: { bg: "#fef2f2", border: "#dc2626", icon: "\u2717", iconBg: "#dc2626" },
    error: { bg: "#fef2f2", border: "#dc2626", icon: "!", iconBg: "#dc2626" },
    info: { bg: "#eff6ff", border: "#2563eb", icon: "i", iconBg: "#2563eb" },
  };
  const c = colors[type];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} - Tu Gesti\u00f3n Legal</title></head>
<body style="margin:0;padding:0;font-family:'Segoe UI',Arial,sans-serif;background-color:#f5f0e9;display:flex;align-items:center;justify-content:center;min-height:100vh;">
<div style="max-width:500px;width:90%;text-align:center;">
<div style="background-color:#112250;padding:24px;border-radius:12px 12px 0 0;"><h1 style="color:#C19D4E;margin:0;font-size:22px;">Tu Gesti\u00f3n Legal</h1></div>
<div style="background:#fff;padding:40px 30px;border-radius:0 0 12px 12px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
<div style="width:60px;height:60px;border-radius:50%;background:${c.iconBg};color:#fff;font-size:28px;line-height:60px;margin:0 auto 20px;">${c.icon}</div>
<h2 style="color:#112250;margin:0 0 12px;">${title}</h2>
<p style="color:#555;line-height:1.6;">${message}</p>
${calendarUrl ? `<a href="${calendarUrl}" target="_blank" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#16a34a;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;margin-right:12px;">\ud83d\udcc5 A\u00f1adir a Google Calendar</a>` : ""}
<a href="/" style="display:inline-block;margin-top:24px;padding:12px 28px;background:#112250;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Ir al inicio</a>
</div></div></body></html>`;
}

async function startServer() {
  const { ENV } = await import("./env");
  if (ENV.adminEmail && ENV.adminPassword) {
    const { ensureLocalAdmin } = await import("../db");
    await ensureLocalAdmin({
      email: ENV.adminEmail,
      password: ENV.adminPassword,
      name: ENV.adminName,
    });
  } else {
    console.warn(
      "[Auth] ADMIN_EMAIL / ADMIN_PASSWORD not set — password login will not work until seeded"
    );
  }

  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // Booking action route (confirm/reject from email)
  app.get("/api/booking-action", async (req, res) => {
    try {
      const { id, action } = req.query;
      const bookingId = parseInt(id as string);
      if (!bookingId || !action) {
        return res.status(400).send(buildActionPage("Error", "Parámetros inválidos.", "error"));
      }
      const { getBookingById, updateBookingStatus } = await import("../db");
      const { sendBookingStatusToClient } = await import("../email");
      const booking = await getBookingById(bookingId);
      if (!booking) {
        return res.status(404).send(buildActionPage("No encontrada", "La reserva no existe.", "error"));
      }
      if (booking.status !== "pending") {
        const statusText = booking.status === "confirmed" ? "confirmada" : "rechazada";
        return res.send(buildActionPage("Ya procesada", `Esta reserva ya fue ${statusText} anteriormente.`, "info"));
      }
      if (action === "confirm") {
        await updateBookingStatus(bookingId, "confirmed");
        await sendBookingStatusToClient({
          clientName: booking.name,
          clientEmail: booking.email,
          serviceType: booking.serviceType,
          date: booking.date,
          time: booking.time,
          status: "confirmed",
        });
        const calendarUrl = buildGoogleCalendarUrl({
          serviceType: booking.serviceType,
          date: booking.date,
          time: booking.time,
          name: booking.name,
        });
        return res.send(buildActionPage("Cita Confirmada", `La cita de ${booking.name} para ${booking.serviceType} el ${booking.date} a las ${booking.time} ha sido confirmada. Se ha enviado un email de confirmaci\u00f3n al cliente.`, "success", calendarUrl));
      } else if (action === "reject") {
        await updateBookingStatus(bookingId, "cancelled");
        await sendBookingStatusToClient({
          clientName: booking.name,
          clientEmail: booking.email,
          serviceType: booking.serviceType,
          date: booking.date,
          time: booking.time,
          status: "rejected",
        });
        return res.send(buildActionPage("Cita Rechazada", `La cita de ${booking.name} para ${booking.serviceType} el ${booking.date} a las ${booking.time} ha sido rechazada. Se ha notificado al cliente por email.`, "rejected"));
      }
      return res.status(400).send(buildActionPage("Error", "Acción no válida.", "error"));
    } catch (err) {
      console.error("[BookingAction] Error:", err);
      return res.status(500).send(buildActionPage("Error", "Ocurrió un error al procesar la acción.", "error"));
    }
  });
  // Scheduled: 24h reminder emails for confirmed bookings
  app.post("/api/scheduled/sendReminders", async (req, res) => {
    try {
      const { sdk } = await import("./sdk");
      const user = await sdk.authenticateRequest(req);
      if (!(user as any).isCron || !(user as any).taskUid) {
        return res.status(403).json({ error: "cron-only" });
      }

      const { getConfirmedBookingsForReminder, markReminderSent } = await import("../db");
      const { sendReminderToClient } = await import("../email");

      // Calculate tomorrow's date in Spain timezone (UTC+1/+2)
      const now = new Date();
      // Use a simple offset: Spain is UTC+2 in summer, UTC+1 in winter
      const spainOffset = now.getMonth() >= 2 && now.getMonth() <= 9 ? 2 : 1;
      const spainNow = new Date(now.getTime() + spainOffset * 60 * 60 * 1000);
      const tomorrow = new Date(spainNow);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const targetDate = tomorrow.toISOString().split("T")[0]; // yyyy-MM-dd

      console.log(`[Reminder] Checking confirmed bookings for ${targetDate}`);
      const bookingsToRemind = await getConfirmedBookingsForReminder(targetDate);
      console.log(`[Reminder] Found ${bookingsToRemind.length} bookings needing reminder`);

      let sent = 0;
      let failed = 0;
      for (const booking of bookingsToRemind) {
        const success = await sendReminderToClient({
          clientName: booking.name,
          clientEmail: booking.email,
          serviceType: booking.serviceType,
          date: booking.date,
          time: booking.time,
        });
        if (success) {
          await markReminderSent(booking.id);
          sent++;
        } else {
          failed++;
        }
      }

      res.json({ ok: true, targetDate, total: bookingsToRemind.length, sent, failed });
    } catch (err: any) {
      console.error("[Reminder] Error:", err);
      res.status(500).json({
        error: err.message || "Unknown error",
        stack: err.stack,
        context: { url: req.url, taskUid: (err as any).taskUid },
        timestamp: new Date().toISOString(),
      });
    }
  });

  // Scheduled: Weekly newsletter every Monday
  app.post("/api/scheduled/sendNewsletter", async (req, res) => {
    try {
      const { sdk } = await import("./sdk");
      const user = await sdk.authenticateRequest(req);
      if (!(user as any).isCron || !(user as any).taskUid) {
        return res.status(403).json({ error: "cron-only" });
      }

      const { getRecentPublishedPosts, getNewsletterSubscribers } = await import("../db");
      const { sendWeeklyNewsletter } = await import("../email");

      const posts = await getRecentPublishedPosts(7);
      if (posts.length === 0) {
        console.log("[Newsletter] No new posts this week, skipping.");
        return res.json({ ok: true, skipped: true, reason: "no_new_posts" });
      }

      const subscribers = await getNewsletterSubscribers();
      if (subscribers.length === 0) {
        console.log("[Newsletter] No active subscribers, skipping.");
        return res.json({ ok: true, skipped: true, reason: "no_subscribers" });
      }

      const siteUrl = "https://www.tugestionlegal.es";
      const result = await sendWeeklyNewsletter(subscribers, posts, siteUrl);

      console.log(`[Newsletter] Weekly send complete. Sent: ${result.sent}, Failed: ${result.failed}`);
      res.json({ ok: true, ...result, postsCount: posts.length, subscribersCount: subscribers.length });
    } catch (err: any) {
      console.error("[Newsletter] Error:", err);
      res.status(500).json({
        error: err.message || "Unknown error",
        timestamp: new Date().toISOString(),
      });
    }
  });

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000", 10);
  // In production use the assigned PORT only (Railway/Render healthchecks).
  // In development, fall back to the next free port if busy.
  const port =
    process.env.NODE_ENV === "production"
      ? preferredPort
      : await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${port}/`);
  });
}

startServer().catch(console.error);
