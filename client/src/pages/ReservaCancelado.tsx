import { Link, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";

export default function ReservaCancelado() {
  const search = useSearch();
  const bookingId = new URLSearchParams(search).get("booking_id");

  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Pago cancelado
          </h1>
        </div>
      </section>
      <section className="py-16 bg-[#F5F0E9]">
        <div className="container max-w-xl text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          <h2
            className="text-2xl font-bold text-[#112250] mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            No se ha completado el pago
          </h2>
          <p className="text-gray-600 mb-2">
            La reserva no se ha confirmado. Puedes volver a intentarlo cuando
            quieras.
          </p>
          {bookingId ? (
            <p className="text-sm text-gray-500 mb-6">
              Referencia interna: #{bookingId}
            </p>
          ) : (
            <div className="mb-6" />
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="bg-[#112250] hover:bg-[#1a2d5e]">
              <Link href="/reservas">Volver a reservar</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://wa.me/34614002510" target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
