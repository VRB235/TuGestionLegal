import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { OTROS_SERVICIOS, CONTACT_INFO } from "@shared/data";
import {
  FileText,
  PenTool,
  Stamp,
  Globe,
  Briefcase,
  Calendar,
  MessageCircle,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  "solicitud-partidas": FileText,
  "documentos-notariales": PenTool,
  "legalizacion-apostilla-espana": Stamp,
  "redaccion-consulados": Globe,
};

export default function OtrosServicios() {
  return (
    <>
      <section className="bg-[#112250] text-white py-20">
        <div className="container">
          <div className="max-w-3xl animate-fade-up">
            <span className="text-[#C19D4E] text-sm font-semibold uppercase tracking-wider">Servicios Administrativos</span>
            <h1 className="text-4xl lg:text-5xl font-bold mt-3 mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Otros Servicios Administrativos
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Además de extranjería, te ayudamos con todo tipo de gestiones administrativas: documentos notariales,
              legalizaciones, apostillas, gestión fiscal y mucho más.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F5F0E9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OTROS_SERVICIOS.map((s) => {
              const Icon = ICON_MAP[s.id] || Briefcase;
              return (
                <Card key={s.id} className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#112250] flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-[#C19D4E]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-[#112250] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{s.name}</h3>
                        <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.description}</p>

                        <div className="flex gap-2">
                          <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                            <Button size="sm" variant="outline" className="border-[#112250] text-[#112250] hover:bg-[#112250] hover:text-white">
                              <MessageCircle className="w-3.5 h-3.5 mr-1" /> Consultar
                            </Button>
                          </a>
                          <Link href={`/reservas?servicio=${encodeURIComponent(s.name)}`}>
                            <Button size="sm" className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                              <Calendar className="w-3.5 h-3.5 mr-1" /> Solicitar
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#5D0018] text-white">
        <div className="container text-center">
          <Briefcase className="w-12 h-12 text-[#C19D4E] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: "var(--font-heading)" }}>¿Necesitas Otra Gestión?</h2>
          <p className="text-white/80 max-w-xl mx-auto mb-8">
            Si no encuentras el trámite que necesitas, contacta con nosotros. Podemos ayudarte con cualquier gestión administrativa.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/reservas">
              <Button size="lg" className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                <Calendar className="w-5 h-5 mr-2" /> Reservar Cita
              </Button>
            </Link>
            <Link href="/contacto">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Contactar <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
