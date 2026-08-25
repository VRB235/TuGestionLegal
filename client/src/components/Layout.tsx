import { Link, useLocation } from "wouter";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Phone, Mail, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_INFO } from "@shared/data";

const NAV_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre Mí", href: "/sobre-mi" },
  {
    label: "Asesorías",
    href: "/asesorias",
    children: [
      { label: "Asesoría por Videoconferencia", href: "/asesorias#asesoria-videoconferencia" },
      { label: "Asesoría Inmobiliaria", href: "/asesorias#asesoria-inmobiliaria" },
    ],
  },
  {
    label: "Servicios",
    href: "/servicios",
    children: [
      { label: "Servicios Jurídicos", href: "/servicios-juridicos" },
      { label: "Servicios Administrativos", href: "/servicios-administrativos" },
      { label: "Servicios Internacionales", href: "/servicios-internacionales" },
      { label: "Otros Servicios", href: "/otros-servicios" },
    ],
  },
  {
    label: "Packs",
    href: "/packs",
    children: [
      { label: "Packs Extranjería", href: "/packs#extranjeria" },
      { label: "Packs Gestoría", href: "/packs#gestoria" },
    ],
  },
  { label: "Reservar Cita", href: "/reservas" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

function SocialIcons({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <>
      <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-[#C19D4E] transition-colors" aria-label="Instagram">
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
      </a>
      <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-[#C19D4E] transition-colors" aria-label="Facebook">
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href={CONTACT_INFO.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-[#C19D4E] transition-colors" aria-label="TikTok">
        <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
      </a>
    </>
  );
}

function TopBar() {
  return (
    <div className="bg-[#112250] text-white text-sm py-2 hidden md:block">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-6">
          <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-[#C19D4E] transition-colors">
            <Phone className="w-3.5 h-3.5" />
            {CONTACT_INFO.phone}
          </a>
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-[#C19D4E] transition-colors">
            <Mail className="w-3.5 h-3.5" />
            {CONTACT_INFO.email}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-white/70">Atención en español e inglés</span>
          <span className="text-[#C19D4E]">|</span>
          <span className="text-white/70 italic">We assist clients in English</span>
          <span className="text-[#C19D4E]">|</span>
          <div className="flex items-center gap-3">
            <SocialIcons className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

function NavDropdown({ item, isActive }: { item: typeof NAV_ITEMS[number]; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link
        href={item.href}
        className={`flex items-center gap-1 py-2 text-sm font-medium transition-colors ${
          isActive ? "text-[#C19D4E]" : "text-[#112250] hover:text-[#C19D4E]"
        }`}
      >
        {item.label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>
      <div
        className={`absolute top-full left-0 bg-white shadow-lg rounded-md border border-gray-100 py-2 min-w-[220px] z-50 transition-all duration-200 ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {item.children?.map((child) => {
          const hasHash = child.href.includes("#");
          if (hasHash) {
            const [path, hash] = child.href.split("#");
            return (
              <a
                key={child.href}
                href={child.href}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(false);
                  // If already on the target page, just scroll
                  if (window.location.pathname === path || window.location.pathname === path + "/") {
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                    window.history.replaceState(null, "", child.href);
                  } else {
                    // Navigate to the page with hash
                    window.location.href = child.href;
                  }
                }}
                className="block px-4 py-2 text-sm text-[#112250] hover:bg-[#F5F0E9] hover:text-[#C19D4E] transition-colors cursor-pointer"
              >
                {child.label}
              </a>
            );
          }
          return (
            <Link
              key={child.href}
              href={child.href}
              className="block px-4 py-2 text-sm text-[#112250] hover:bg-[#F5F0E9] hover:text-[#C19D4E] transition-colors"
            >
              {child.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-xl lg:text-2xl font-bold text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>
              Tu Gestión Legal
            </span>
            <span className="text-[10px] lg:text-xs text-[#5D0018] tracking-wider uppercase font-medium">
              Extranjería y Gestión Documental
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-5">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.href || (item.children?.some(c => location === c.href));
            if (item.children) {
              return <NavDropdown key={item.href} item={item} isActive={!!isActive} />;
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-[#C19D4E]" : "text-[#112250] hover:text-[#C19D4E]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-[#112250] text-[#112250] hover:bg-[#112250] hover:text-white">
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#112250]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        className={`lg:hidden overflow-hidden bg-white border-t transition-all duration-300 ${
          mobileOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container py-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className={`block py-2.5 px-3 rounded-md text-sm font-medium transition-colors ${
                  location === item.href
                    ? "bg-[#F5F0E9] text-[#C19D4E]"
                    : "text-[#112250] hover:bg-[#F5F0E9]"
                }`}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => {
                const hasHash = child.href.includes("#");
                const [path, hash] = hasHash ? child.href.split("#") : [child.href, ""];
                return (
                  hasHash ? (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setMobileOpen(false);
                        if (window.location.pathname === path || window.location.pathname === path + "/") {
                          const el = document.getElementById(hash);
                          if (el) el.scrollIntoView({ behavior: "smooth" });
                          window.history.replaceState(null, "", child.href);
                        } else {
                          window.location.href = child.href;
                        }
                      }}
                      className="block py-2 px-6 text-sm text-gray-600 hover:text-[#C19D4E] cursor-pointer"
                    >
                      {child.label}
                    </a>
                  ) : (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 px-6 text-sm text-gray-600 hover:text-[#C19D4E]"
                    >
                      {child.label}
                    </Link>
                  )
                );
              })}
            </div>
          ))}
          {/* Mobile social links */}
          <div className="flex items-center gap-4 px-3 pt-2 text-[#112250]">
            <SocialIcons className="w-5 h-5" />
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t">
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button variant="outline" className="w-full border-[#112250] text-[#112250]">
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
            </a>
            <Link href="/reservas" className="flex-1">
              <Button className="w-full bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                Reservar
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#112250] text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
              Tu Gestión Legal
            </h3>
            <p className="text-sm text-white/60 mb-4 uppercase tracking-wider">
              Extranjería y Gestión Documental
            </p>
            <p className="text-sm text-white/80 leading-relaxed">
              Despacho especializado en asesoría legal, extranjería, gestión documental y trámites administrativos.
              Soluciones claras para tu tranquilidad.
            </p>
            <div className="mt-4 flex gap-3">
              <a href={CONTACT_INFO.instagram} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C19D4E] transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={CONTACT_INFO.facebook} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C19D4E] transition-colors" aria-label="Facebook">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href={CONTACT_INFO.tiktok} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#C19D4E] transition-colors" aria-label="TikTok">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4 text-[#C19D4E]">Servicios</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/servicios-juridicos" className="hover:text-[#C19D4E] transition-colors">Servicios Jurídicos</Link></li>
              <li><Link href="/servicios-administrativos" className="hover:text-[#C19D4E] transition-colors">Servicios Administrativos</Link></li>
              <li><Link href="/servicios-internacionales" className="hover:text-[#C19D4E] transition-colors">Servicios Internacionales</Link></li>
              <li><Link href="/otros-servicios" className="hover:text-[#C19D4E] transition-colors">Otros Servicios</Link></li>
              <li><Link href="/asesorias" className="hover:text-[#C19D4E] transition-colors">Asesorías</Link></li>
              <li><Link href="/packs" className="hover:text-[#C19D4E] transition-colors">Packs</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-[#C19D4E]">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><Link href="/aviso-legal" className="hover:text-[#C19D4E] transition-colors">Aviso Legal</Link></li>
              <li><Link href="/politica-privacidad" className="hover:text-[#C19D4E] transition-colors">Política de Privacidad</Link></li>
              <li><Link href="/politica-cookies" className="hover:text-[#C19D4E] transition-colors">Política de Cookies</Link></li>
              <li><Link href="/condiciones-contratacion" className="hover:text-[#C19D4E] transition-colors">Condiciones de Contratación</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-[#C19D4E]">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li>
                <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center gap-2 hover:text-[#C19D4E] transition-colors">
                  <Phone className="w-4 h-4 text-[#C19D4E]" />
                  {CONTACT_INFO.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-[#C19D4E] transition-colors">
                  <Mail className="w-4 h-4 text-[#C19D4E]" />
                  {CONTACT_INFO.email}
                </a>
              </li>
              <li>
                <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#C19D4E] transition-colors">
                  <MessageCircle className="w-4 h-4 text-[#C19D4E]" />
                  WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-white/5 rounded-lg">
              <p className="text-xs text-white/60">Atención en español e inglés</p>
              <p className="text-xs text-white/60 italic mt-1">We assist clients in English</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container py-4 flex flex-col md:flex-row justify-between items-center text-xs text-white/50">
          <p>&copy; {new Date().getFullYear()} Tu Gestión Legal. Todos los derechos reservados.</p>
          <p className="mt-2 md:mt-0">Extranjería y gestión documental</p>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppButton() {
  return (
    <a
      href={CONTACT_INFO.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
      aria-label="Contactar por WhatsApp"
    >
      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
