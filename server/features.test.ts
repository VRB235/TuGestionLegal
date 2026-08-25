import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the database functions
vi.mock("./db", () => ({
  createBooking: vi.fn().mockResolvedValue(undefined),
  getBookings: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: "Test Client",
      email: "client@test.com",
      phone: "+34600000000",
      serviceType: "Arraigo Social",
      date: "2026-04-15",
      time: "10:00",
      message: null,
      status: "pending",
      createdAt: new Date(),
    },
  ]),
  getBookingById: vi.fn().mockImplementation((id: number) => {
    if (id === 1)
      return Promise.resolve({
        id: 1,
        name: "Test Client",
        email: "client@test.com",
        phone: "+34600000000",
        serviceType: "Arraigo Social",
        date: "2026-04-15",
        time: "10:00",
        message: null,
        status: "pending",
        createdAt: new Date(),
      });
    return Promise.resolve(undefined);
  }),
  updateBookingStatus: vi.fn().mockResolvedValue(undefined),
  getBookingsByDate: vi.fn().mockResolvedValue([]),
  getConfirmedBookingsForReminder: vi.fn().mockResolvedValue([
    { id: 5, name: "Reminder Client", email: "reminder@test.com", phone: "+34600111222", serviceType: "Asesoría por Videoconferencia", date: "2026-07-13", time: "10:00", message: null, status: "confirmed", reminderSent: false, createdAt: new Date() },
  ]),
  markReminderSent: vi.fn().mockResolvedValue(undefined),
  createContactMessage: vi.fn().mockResolvedValue(undefined),
  getContactMessages: vi.fn().mockResolvedValue([]),
  createBlogPost: vi.fn().mockResolvedValue(undefined),
  getPublishedPosts: vi.fn().mockResolvedValue([
    { id: 1, title: "Test Post", slug: "test-post", content: "Content", published: true, createdAt: new Date() },
  ]),
  getAllPosts: vi.fn().mockResolvedValue([]),
  getPostBySlug: vi.fn().mockResolvedValue({ id: 1, title: "Test", slug: "test", content: "Content" }),
  updateBlogPost: vi.fn().mockResolvedValue(undefined),
  deleteBlogPost: vi.fn().mockResolvedValue(undefined),
  createClientDocument: vi.fn().mockResolvedValue(undefined),
  getClientDocuments: vi.fn().mockResolvedValue([]),
  subscribeNewsletter: vi.fn().mockResolvedValue(undefined),
  getNewsletterSubscribers: vi.fn().mockResolvedValue([
    { id: 1, email: "sub1@test.com", name: "Suscriptor 1", active: true, createdAt: new Date() },
  ]),
  unsubscribeNewsletter: vi.fn().mockResolvedValue(undefined),
  getRecentPublishedPosts: vi.fn().mockResolvedValue([
    { id: 1, title: "Test Post", slug: "test-post", category: "Test", excerpt: "Excerpt", imageUrl: null, createdAt: new Date() },
  ]),
  upsertUser: vi.fn().mockResolvedValue(undefined),
  getUserByOpenId: vi.fn().mockResolvedValue(undefined),
  getUserByEmail: vi.fn().mockResolvedValue(undefined),
  getDb: vi.fn().mockResolvedValue(null),
  ensureLocalAdmin: vi.fn().mockResolvedValue(undefined),
}));

// Mock notification
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

// Mock email
vi.mock("./email", () => ({
  sendBookingNotificationToAdmin: vi.fn().mockResolvedValue(true),
  sendBookingStatusToClient: vi.fn().mockResolvedValue(true),
  sendReminderToClient: vi.fn().mockResolvedValue(true),
  sendClientDocumentsEmail: vi.fn().mockResolvedValue(true),
  verifySmtp: vi.fn().mockResolvedValue(true),
}));

// Mock storage (legacy; documents already go by email)
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ key: "test-key", url: "https://example.com/test.pdf" }),
}));

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: { origin: "https://www.tugestionlegal.es" } } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@test.com",
    name: "Admin",
    passwordHash: null,
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: { origin: "https://www.tugestionlegal.es" } } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@test.com",
    name: "User",
    passwordHash: null,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };
  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("booking.create", () => {
  it("creates a booking and sends email + platform notification", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.booking.create({
      name: "Juan Pérez",
      email: "juan@test.com",
      phone: "+34 600 000 000",
      serviceType: "Arraigo Social",
      date: "2026-04-10",
      time: "10:00",
      message: "Consulta sobre arraigo social",
    });
    expect(result).toEqual({ success: true });

    const { sendBookingNotificationToAdmin } = await import("./email");
    expect(sendBookingNotificationToAdmin).toHaveBeenCalled();

    const { notifyOwner } = await import("./_core/notification");
    expect(notifyOwner).toHaveBeenCalled();
  });

  it("rejects booking with invalid email", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.booking.create({
        name: "Test",
        email: "invalid-email",
        phone: "+34 600 000 000",
        serviceType: "Test",
        date: "2026-04-10",
        time: "10:00",
      })
    ).rejects.toThrow();
  });
});

describe("booking.occupiedSlots", () => {
  it("returns occupied time slots for a given date", async () => {
    const { getBookingsByDate } = await import("./db");
    (getBookingsByDate as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { time: "09:00", status: "confirmed" },
      { time: "11:00", status: "pending" },
    ]);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.booking.occupiedSlots({ date: "2026-07-20" });
    expect(result).toEqual(["09:00", "11:00"]);
  });

  it("returns empty array when no bookings exist for date", async () => {
    const { getBookingsByDate } = await import("./db");
    (getBookingsByDate as ReturnType<typeof vi.fn>).mockResolvedValueOnce([]);
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.booking.occupiedSlots({ date: "2026-07-21" });
    expect(result).toEqual([]);
  });
});

describe("booking.create - slot conflict", () => {
  it("rejects booking when slot is already taken", async () => {
    const { getBookingsByDate } = await import("./db");
    (getBookingsByDate as ReturnType<typeof vi.fn>).mockResolvedValueOnce([
      { time: "10:00", status: "confirmed" },
    ]);
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.booking.create({
        name: "Test User",
        email: "test@test.com",
        phone: "+34 600 000 000",
        serviceType: "Asesor\u00eda por Videoconferencia",
        date: "2026-07-20",
        time: "10:00",
      })
    ).rejects.toThrow("Este horario ya est\u00e1 reservado");
  });
});

describe("booking.list", () => {
  it("allows admin to list bookings", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.booking.list();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].serviceType).toBe("Arraigo Social");
  });

  it("rejects non-admin from listing bookings", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.booking.list()).rejects.toThrow();
  });

  it("rejects unauthenticated user from listing bookings", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(caller.booking.list()).rejects.toThrow();
  });
});

describe("booking.confirm", () => {
  it("admin can confirm a pending booking and sends email to client", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.booking.confirm({ id: 1 });
    expect(result).toEqual({ success: true });

    const { updateBookingStatus } = await import("./db");
    expect(updateBookingStatus).toHaveBeenCalledWith(1, "confirmed");

    const { sendBookingStatusToClient } = await import("./email");
    expect(sendBookingStatusToClient).toHaveBeenCalledWith(
      expect.objectContaining({ status: "confirmed", clientEmail: "client@test.com" })
    );
  });

  it("throws NOT_FOUND for non-existent booking", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(caller.booking.confirm({ id: 99 })).rejects.toThrow("Reserva no encontrada");
  });

  it("regular user cannot confirm bookings", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.booking.confirm({ id: 1 })).rejects.toThrow();
  });
});

describe("booking.reject", () => {
  it("admin can reject a pending booking and sends email to client", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.booking.reject({ id: 1 });
    expect(result).toEqual({ success: true });

    const { updateBookingStatus } = await import("./db");
    expect(updateBookingStatus).toHaveBeenCalledWith(1, "cancelled");

    const { sendBookingStatusToClient } = await import("./email");
    expect(sendBookingStatusToClient).toHaveBeenCalledWith(
      expect.objectContaining({ status: "rejected", clientEmail: "client@test.com" })
    );
  });

  it("throws NOT_FOUND for non-existent booking", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    await expect(caller.booking.reject({ id: 99 })).rejects.toThrow("Reserva no encontrada");
  });

  it("regular user cannot reject bookings", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.booking.reject({ id: 1 })).rejects.toThrow();
  });
});

describe("contact.send", () => {
  it("sends a contact message as public user", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.contact.send({
      name: "María García",
      email: "maria@test.com",
      phone: "+34 611 111 111",
      subject: "Consulta sobre nacionalidad",
      message: "Me gustaría saber los requisitos para la nacionalidad española.",
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects contact without required fields", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.contact.send({
        name: "",
        email: "test@test.com",
        subject: "Test",
        message: "Test",
      })
    ).rejects.toThrow();
  });
});

describe("blog", () => {
  it("returns published posts as public user", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const posts = await caller.blog.published();
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("returns a post by slug", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const post = await caller.blog.bySlug({ slug: "test" });
    expect(post).toBeDefined();
    expect(post?.slug).toBe("test");
  });

  it("allows admin to create a blog post", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.blog.create({
      title: "Nuevo artículo",
      slug: "nuevo-articulo",
      content: "Contenido del artículo",
      category: "Extranjería",
      published: true,
    });
    expect(result).toEqual({ success: true });
  });

  it("rejects non-admin from creating posts", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(
      caller.blog.create({ title: "Test", slug: "test", content: "Test" })
    ).rejects.toThrow();
  });
});

describe("documents", () => {
  it("sends documents by email without persisting storage", async () => {
    const { sendClientDocumentsEmail } = await import("./email");
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.documents.upload({
      clientName: "Carlos López",
      clientEmail: "carlos@test.com",
      description: "Copia del pasaporte",
      files: [
        {
          fileName: "pasaporte.pdf",
          mimeType: "application/pdf",
          fileSize: 1024,
          fileBase64: "dGVzdA==",
        },
      ],
    });
    expect(result.success).toBe(true);
    expect(result.filesSent).toBe(1);
    expect(sendClientDocumentsEmail).toHaveBeenCalled();
  });

  it("rejects disallowed file extensions", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    await expect(
      caller.documents.upload({
        clientName: "Carlos López",
        clientEmail: "carlos@test.com",
        files: [
          {
            fileName: "malware.exe",
            mimeType: "application/octet-stream",
            fileBase64: "dGVzdA==",
          },
        ],
      })
    ).rejects.toThrow();
  });

  it("allows admin to list documents", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.documents.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejects non-admin from listing documents", async () => {
    const caller = appRouter.createCaller(createUserContext());
    await expect(caller.documents.list()).rejects.toThrow();
  });
});

describe("reminder system", () => {
  it("getConfirmedBookingsForReminder returns bookings needing reminder", async () => {
    const { getConfirmedBookingsForReminder } = await import("./db");
    const bookings = await getConfirmedBookingsForReminder("2026-07-13");
    expect(Array.isArray(bookings)).toBe(true);
    expect(bookings.length).toBe(1);
    expect(bookings[0].name).toBe("Reminder Client");
    expect(bookings[0].status).toBe("confirmed");
    expect(bookings[0].reminderSent).toBe(false);
  });

  it("markReminderSent marks a booking as reminded", async () => {
    const { markReminderSent } = await import("./db");
    await markReminderSent(5);
    expect(markReminderSent).toHaveBeenCalledWith(5);
  });

  it("sendReminderToClient sends reminder email", async () => {
    const { sendReminderToClient } = await import("./email");
    const result = await sendReminderToClient({
      clientName: "Reminder Client",
      clientEmail: "reminder@test.com",
      serviceType: "Asesoría por Videoconferencia",
      date: "2026-07-13",
      time: "10:00",
    });
    expect(result).toBe(true);
    expect(sendReminderToClient).toHaveBeenCalledWith({
      clientName: "Reminder Client",
      clientEmail: "reminder@test.com",
      serviceType: "Asesoría por Videoconferencia",
      date: "2026-07-13",
      time: "10:00",
    });
  });
});

describe("newsletter", () => {
  it("subscribes a new email to the newsletter", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.newsletter.subscribe({ email: "new@test.com", name: "Nuevo" });
    expect(result.success).toBe(true);
    const { subscribeNewsletter } = await import("./db");
    expect(subscribeNewsletter).toHaveBeenCalledWith({ email: "new@test.com", name: "Nuevo" });
  });

  it("unsubscribes an email from the newsletter", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.newsletter.unsubscribe({ email: "sub1@test.com" });
    expect(result.success).toBe(true);
    const { unsubscribeNewsletter } = await import("./db");
    expect(unsubscribeNewsletter).toHaveBeenCalledWith("sub1@test.com");
  });

  it("lists subscribers (admin only)", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const subscribers = await caller.newsletter.subscribers();
    expect(Array.isArray(subscribers)).toBe(true);
    expect(subscribers.length).toBe(1);
    expect(subscribers[0].email).toBe("sub1@test.com");
  });
});
