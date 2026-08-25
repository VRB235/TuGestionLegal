import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";

const SobreMi = lazy(() => import("./pages/SobreMi"));
const Servicios = lazy(() => import("./pages/Servicios"));
const Asesorias = lazy(() => import("./pages/Asesorias"));
const Packs = lazy(() => import("./pages/Packs"));
const ServiciosJuridicos = lazy(() => import("./pages/ServiciosJuridicos"));
const ServiciosAdministrativos = lazy(() => import("./pages/ServiciosAdministrativos"));
const ServiciosInternacionales = lazy(() => import("./pages/ServiciosInternacionales"));
const OtrosServicios = lazy(() => import("./pages/OtrosServicios"));
const Reservas = lazy(() => import("./pages/Reservas"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contacto = lazy(() => import("./pages/Contacto"));
const AvisoLegal = lazy(() => import("./pages/AvisoLegal"));
const PoliticaPrivacidad = lazy(() => import("./pages/PoliticaPrivacidad"));
const PoliticaCookies = lazy(() => import("./pages/PoliticaCookies"));
const CondicionesContratacion = lazy(() => import("./pages/CondicionesContratacion"));
const AdminReservas = lazy(() => import("./pages/AdminReservas"));
const Unsubscribe = lazy(() => import("./pages/Unsubscribe"));
const Login = lazy(() => import("./pages/Login"));

function PageLoader() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#C19D4E]" />
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/sobre-mi" component={SobreMi} />
          <Route path="/servicios" component={Servicios} />
          <Route path="/asesorias" component={Asesorias} />
          <Route path="/packs" component={Packs} />
          <Route path="/servicios-juridicos" component={ServiciosJuridicos} />
          <Route path="/servicios-administrativos" component={ServiciosAdministrativos} />
          <Route path="/servicios-internacionales" component={ServiciosInternacionales} />
          <Route path="/otros-servicios" component={OtrosServicios} />
          <Route path="/reservas" component={Reservas} />
          <Route path="/blog" component={Blog} />
          <Route path="/blog/:slug" component={BlogPost} />
          <Route path="/contacto" component={Contacto} />
          <Route path="/aviso-legal" component={AvisoLegal} />
          <Route path="/politica-privacidad" component={PoliticaPrivacidad} />
          <Route path="/politica-cookies" component={PoliticaCookies} />
          <Route path="/condiciones-contratacion" component={CondicionesContratacion} />
          <Route path="/admin/reservas" component={AdminReservas} />
          <Route path="/login" component={Login} />
          <Route path="/unsubscribe" component={Unsubscribe} />
          {/* Legacy redirects */}
          <Route path="/tramites-extranjeria">{() => <Redirect to="/servicios-juridicos" />}</Route>
          <Route path="/servicios-venezuela">{() => <Redirect to="/servicios-internacionales" />}</Route>
          <Route path="/tramites-venezolanos">{() => <Redirect to="/servicios-internacionales" />}</Route>
          <Route path="/otros-tramites">{() => <Redirect to="/otros-servicios" />}</Route>
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Layout>
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
