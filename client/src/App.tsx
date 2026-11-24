import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Router as WouterRouter, Redirect, useLocation } from "wouter";
import { useBrowserLocation } from "wouter/use-browser-location";
import { getPublicBasePath } from "./publicBase";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import SobreMi from "./pages/SobreMi";
import Servicios from "./pages/Servicios";
import Asesorias from "./pages/Asesorias";
import Packs from "./pages/Packs";
import ServiciosJuridicos from "./pages/ServiciosJuridicos";
import ServiciosAdministrativos from "./pages/ServiciosAdministrativos";
import ServiciosInternacionales from "./pages/ServiciosInternacionales";
import OtrosServicios from "./pages/OtrosServicios";
import Reservas from "./pages/Reservas";
import ReservaExito from "./pages/ReservaExito";
import ReservaCancelado from "./pages/ReservaCancelado";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contacto from "./pages/Contacto";
import AvisoLegal from "./pages/AvisoLegal";
import PoliticaPrivacidad from "./pages/PoliticaPrivacidad";
import PoliticaCookies from "./pages/PoliticaCookies";
import CondicionesContratacion from "./pages/CondicionesContratacion";
import AdminReservas from "./pages/AdminReservas";
import Unsubscribe from "./pages/Unsubscribe";
import Login from "./pages/Login";
import type { ComponentType } from "react";

function normalizeAppPath(raw: string): string {
  const base = getPublicBasePath();
  let path = (raw.split("?")[0] || "/").replace(/\/+$/, "") || "/";
  if (base && path.toLowerCase().startsWith(base.toLowerCase())) {
    path = path.slice(base.length).replace(/\/+$/, "") || "/";
  }
  return path.startsWith("/") ? path : `/${path}`;
}

/** Location hook that strips Raiola temp URL prefix for wouter Links/navigation. */
function usePrefixedLocation() {
  const [path, navigate] = useBrowserLocation();
  const base = getPublicBasePath();
  const relative =
    base && path.toLowerCase().startsWith(base.toLowerCase())
      ? path.slice(base.length) || "/"
      : path;
  return [
    relative,
    (to: string, opts?: { replace?: boolean; state?: unknown }) => {
      const cleaned = to.startsWith("~") ? to.replace(/^~/, "") : to;
      const target = cleaned.startsWith("http")
        ? cleaned
        : `${base}${cleaned.startsWith("/") ? cleaned : `/${cleaned}`}`;
      navigate(target, opts);
    },
  ] as const;
}

const EXACT_PAGES: Record<string, ComponentType> = {
  "/": Home,
  "/sobre-mi": SobreMi,
  "/servicios": Servicios,
  "/asesorias": Asesorias,
  "/packs": Packs,
  "/servicios-juridicos": ServiciosJuridicos,
  "/servicios-administrativos": ServiciosAdministrativos,
  "/servicios-internacionales": ServiciosInternacionales,
  "/otros-servicios": OtrosServicios,
  "/reservas": Reservas,
  "/reservas/exito": ReservaExito,
  "/reservas/cancelado": ReservaCancelado,
  "/blog": Blog,
  "/contacto": Contacto,
  "/aviso-legal": AvisoLegal,
  "/politica-privacidad": PoliticaPrivacidad,
  "/politica-cookies": PoliticaCookies,
  "/condiciones-contratacion": CondicionesContratacion,
  "/admin/reservas": AdminReservas,
  "/login": Login,
  "/unsubscribe": Unsubscribe,
};

function Routes() {
  useLocation(); // re-render on history changes
  const path = normalizeAppPath(
    typeof window !== "undefined" ? window.location.pathname : "/"
  );

  const Exact = EXACT_PAGES[path];
  if (Exact) return <Exact />;

  if (path.startsWith("/blog/")) return <BlogPost />;
  if (path === "/tramites-extranjeria") return <Redirect to="/servicios-juridicos" />;
  if (path === "/servicios-venezuela" || path === "/tramites-venezolanos") {
    return <Redirect to="/servicios-internacionales" />;
  }
  if (path === "/otros-tramites") return <Redirect to="/otros-servicios" />;

  return <NotFound />;
}

function Router() {
  const base = getPublicBasePath();
  return (
    <WouterRouter
      hook={usePrefixedLocation}
      hrefs={(p) => (p.startsWith("http") ? p : `${base}${p}`)}
    >
      <Layout>
        <Routes />
      </Layout>
    </WouterRouter>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
