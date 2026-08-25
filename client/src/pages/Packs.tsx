import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PACKS_EXTRANJERIA, PACKS_GESTORIA, CONTACT_INFO } from "@shared/data";
import {
  CheckCircle,
  Calendar,
  MessageCircle,
  AlertCircle,
  Users,
  Luggage,
  Flag,
  CalendarClock,
  Zap,
  type LucideIcon,
} from "lucide-react";

type PackItem = {
  id: string;
  name: string;
  category?: string;
  targetAudience?: string;
  description: string;
  includes: readonly string[];
  note?: string;
};

const PACK_ICON_MAP: Record<string, LucideIcon> = {
  "pack-migrante": Luggage,
  "pack-post-jura": Flag,
  "pack-asesoria-mensual": CalendarClock,
  "pack-tramites-express": Zap,
};

function PackCard({ pack }: { pack: PackItem }) {
  const Icon = PACK_ICON_MAP[pack.id] || Luggage;
  return (
    <Card className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8 flex flex-col h-full">
        {/* Category Badge */}
        {pack.category && (
          <span className="inline-block self-start px-3 py-1 bg-[#112250]/10 text-[#112250] text-xs font-semibold rounded-full mb-4">
            {pack.category}
          </span>
        )}

        {/* Icon & Title */}
        <div className="w-14 h-14 rounded-xl bg-[#112250] flex items-center justify-center mb-5">
          <Icon className="w-7 h-7 text-[#C19D4E]" />
        </div>
        <h3 className="text-xl font-bold text-[#112250] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
          {pack.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{pack.description}</p>

        {/* Target Audience */}
        {pack.targetAudience && (
          <div className="flex items-start gap-2 p-3 bg-[#F5F0E9] rounded-lg mb-4">
            <Users className="w-4 h-4 text-[#C19D4E] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-[#112250] mb-0.5">¿Para quién es?</p>
              <p className="text-xs text-gray-600">{pack.targetAudience}</p>
            </div>
          </div>
        )}

        {/* Includes */}
        <p className="text-sm font-semibold text-[#112250] mb-2">Incluye:</p>
        <ul className="space-y-2 mb-5">
          {pack.includes.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
              <CheckCircle className="w-4 h-4 text-[#C19D4E] shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>

        {/* Note */}
        {pack.note && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg mb-5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">{pack.note}</p>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-auto flex gap-3">
          <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button variant="outline" className="w-full border-[#112250] text-[#112250] hover:bg-[#112250] hover:text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Consultar
            </Button>
          </a>
          <Link href={`/reservas?servicio=${encodeURIComponent(pack.name)}`} className="flex-1">
            <Button className="w-full bg-[#C19D4E] hover:bg-[#a8873f] text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Reservar
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Packs() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="bg-[#112250] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-[#C19D4E]/20 text-[#C19D4E] text-sm font-medium rounded-full border border-[#C19D4E]/30 mb-4">
              Packs
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Packs de Servicios
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Paquetes diseñados para cubrir tus necesidades de forma integral, con atención personalizada y precios cerrados.
            </p>
          </div>
        </div>
      </section>

      {/* Packs de Extranjería */}
      <section id="extranjeria" className="py-20 bg-[#F5F0E9] scroll-mt-28">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#C19D4E] text-sm font-semibold uppercase tracking-wider">Extranjería</span>
            <h2 className="text-3xl font-bold text-[#112250] mt-3 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Packs de Extranjería
            </h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKS_EXTRANJERIA.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* Packs de Gestoría */}
      <section id="gestoria" className="py-20 bg-white scroll-mt-28">
        <div className="container">
          <div className="text-center mb-12">
            <span className="text-[#C19D4E] text-sm font-semibold uppercase tracking-wider">Gestoría</span>
            <h2 className="text-3xl font-bold text-[#112250] mt-3 mb-4" style={{ fontFamily: "var(--font-heading)" }}>
              Packs de Gestoría
            </h2>
            <div className="section-divider mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PACKS_GESTORIA.map((pack) => (
              <PackCard key={pack.id} pack={pack} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5D0018] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ¿Necesitas un pack personalizado?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Contacta con nosotros y diseñaremos un paquete a medida para tu situación.
          </p>
          <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              Consultar por WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
