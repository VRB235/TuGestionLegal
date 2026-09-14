import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ReservaExito() {
  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pago completado
          </h1>
        </div>
      </section>
      <section className="py-16 bg-[#F5F0E9]">
        <div className="container max-w-xl text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2
            className="text-2xl font-bold text-[#112250] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            ¡Gracias! Tu cita está confirmada
          </h2>
          <p className="text-gray-600 mb-6">
            Hemos recibido el pago. En breve te llegará un email con los detalles
            de la asesoría. Si no lo ves, revisa spam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#112250] hover:bg-[#1a2d5e]">
              <Link href="/">Ir al inicio</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/reservas">Nueva reserva</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
