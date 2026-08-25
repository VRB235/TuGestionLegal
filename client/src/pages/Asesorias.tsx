import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ASESORIAS, CONTACT_INFO } from "@shared/data";
import { Video, Building, CheckCircle, Calendar, Clock, Users, MessageCircle } from "lucide-react";

const ICONS = [Video, Building];

export default function Asesorias() {
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
              Asesorías
            </span>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6" style={{ fontFamily: "var(--font-heading)" }}>
              Asesorías Legales Personalizadas
            </h1>
            <p className="text-white/80 text-lg leading-relaxed">
              Orientación profesional adaptada a tu caso. Elige la modalidad que mejor se ajuste a tus necesidades.
            </p>
          </div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-[#F5F0E9]">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ASESORIAS.map((a, i) => {
              const Icon = ICONS[i] || Video;
              const isPopular = "popular" in a && a.popular;
              return (
                <Card
                  key={a.id}
                  id={a.id}
                  className={`relative border-0 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden scroll-mt-28 ${
                    isPopular ? "ring-2 ring-[#C19D4E]" : ""
                  }`}
                >
                  {isPopular && (
                    <div className="absolute top-4 right-4 bg-[#C19D4E] text-white text-xs font-bold px-3 py-1 rounded-full">
                      Popular
                    </div>
                  )}
                  <CardContent className="p-8">
                    {/* Icon & Title */}
                    <div className="w-14 h-14 rounded-xl bg-[#112250] flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[#C19D4E]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#112250] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
                      {a.name}
                    </h3>
                    <p className="text-sm text-[#C19D4E] font-medium mb-3">{a.subtitle}</p>

                    {/* Price & Duration */}
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-3xl font-extrabold text-[#112250]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {a.price}€
                      </span>
                      <span className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="w-4 h-4" /> {a.duration}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">{a.description}</p>

                    {/* Target Audience */}
                    {"targetAudience" in a && a.targetAudience && (
                      <div className="flex items-start gap-2 p-3 bg-[#F5F0E9] rounded-lg mb-4">
                        <Users className="w-4 h-4 text-[#C19D4E] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-semibold text-[#112250] mb-0.5">¿Para quién es?</p>
                          <p className="text-xs text-gray-600">{a.targetAudience}</p>
                        </div>
                      </div>
                    )}

                    {/* Includes */}
                    <p className="text-sm font-semibold text-[#112250] mb-2">Incluye:</p>
                    <ul className="space-y-2 mb-6">
                      {a.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-[#C19D4E] shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer" className="flex-1">
                        <Button variant="outline" className="w-full border-[#112250] text-[#112250] hover:bg-[#112250] hover:text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Consultar
                        </Button>
                      </a>
                      <Link href={`/reservas?servicio=${encodeURIComponent(a.name)}`} className="flex-1">
                        <Button className={`w-full ${isPopular ? "bg-[#C19D4E] hover:bg-[#a8873f]" : "bg-[#112250] hover:bg-[#1a2d5e]"} text-white`}>
                          <Calendar className="w-4 h-4 mr-2" />
                          Reservar
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-white">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-[#112250] mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            ¿Tienes dudas?
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mb-6">
            Escríbenos por WhatsApp y te orientamos sin compromiso.
          </p>
          <a href={CONTACT_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#20bd5a] text-white">
              <MessageCircle className="w-5 h-5 mr-2" />
              Consultar por WhatsApp
            </Button>
          </a>
        </div>
      </section>
    </>
  );
}
