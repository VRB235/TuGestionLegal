import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TRAMITES_VENEZUELA, CONTACT_INFO } from "@shared/data";
import {
  Baby,
  Heart,
  BookOpen,
  ShieldCheck,
  ShieldX,
  Gavel,
  Plane,
  Stamp,
  Calendar,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "partida-nacimiento": Baby,
  "acta-matrimonio": Heart,
  "acta-defuncion": BookOpen,
  "antecedentes-penales": ShieldCheck,
  "cancelacion-antecedentes": ShieldX,
  "poderes": Gavel,
  "permisos-viaje": Plane,
  "apostilla-documentos": Stamp,
};

export default function ServiciosInternacionales() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#112250] text-white py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-block px-4 py-1.5 bg-[#C19D4E]/20 text-[#C19D4E] text-sm font-medium rounded-full border border-[#C19D4E]/30 mb-4">
              Servicios Internacionales
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Servicios Internacionales — Venezuela
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Gestionamos tus documentos venezolanos desde España. Partidas, antecedentes penales, poderes y apostillas sin necesidad de viajar.
            </p>
          </div>
        </div>
      </section>

      {/* Tramites List */}
      <section className="py-20 bg-[#F5F0E9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRAMITES_VENEZUELA.map((t) => {
              const Icon = ICON_MAP[t.id] || Stamp;
              return (
                <Card key={t.id} className="border-0 shadow-sm hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#C19D4E]/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-[#C19D4E]" />
                    </div>
                    <h3 className="text-lg font-bold text-[#112250] mb-2 group-hover:text-[#C19D4E] transition-colors" style={{ fontFamily: "var(--font-heading)" }}>
                      {t.name}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{t.description}</p>
                    <Link href={`/reservas?servicio=${encodeURIComponent(t.name)}`}>
                      <span className="inline-flex items-center text-sm text-[#C19D4E] font-medium cursor-pointer">
                        Solicitar <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#5D0018] text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ¿Necesitas gestionar documentos en Venezuela?
          </h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Nos encargamos de todo desde España para que no tengas que viajar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reservas">
              <Button size="lg" className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                <Calendar className="w-5 h-5 mr-2" />
                Reservar Cita
              </Button>
            </Link>
            <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
