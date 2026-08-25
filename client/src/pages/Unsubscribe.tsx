import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { MailX, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Unsubscribe() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = params.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, []);

  const unsubscribe = trpc.newsletter.unsubscribe.useMutation({
    onSuccess: () => setDone(true),
    onError: (err) => setError(err.message || "Ha ocurrido un error. Inténtalo de nuevo más tarde."),
  });

  const handleUnsubscribe = () => {
    if (email) {
      setError("");
      unsubscribe.mutate({ email });
    }
  };

  // No email provided
  if (!email && !done) {
    return (
      <section className="py-20 bg-[#F5F0E9] min-h-[60vh] flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center bg-white p-10 rounded-2xl shadow-lg"
          >
            <AlertCircle className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#112250] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Enlace no válido
            </h1>
            <p className="text-gray-600 mb-6">
              Este enlace de baja no contiene un email válido. Si deseas cancelar tu suscripción, 
              utiliza el enlace que aparece al final de cualquier email del newsletter.
            </p>
            <Link href="/blog">
              <Button className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                Ir al Blog
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  if (done) {
    return (
      <section className="py-20 bg-[#F5F0E9] min-h-[60vh] flex items-center">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center bg-white p-10 rounded-2xl shadow-lg"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-[#112250] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              Suscripción cancelada
            </h1>
            <p className="text-gray-600 mb-6">
              Has sido dado de baja del newsletter. No recibirás más correos semanales.
            </p>
            <Link href="/">
              <Button className="bg-[#C19D4E] hover:bg-[#a8873f] text-white">
                Volver al inicio
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-[#F5F0E9] min-h-[60vh] flex items-center">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto text-center bg-white p-10 rounded-2xl shadow-lg"
        >
          <MailX className="w-16 h-16 text-[#C19D4E] mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-[#112250] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Cancelar suscripción
          </h1>
          <p className="text-gray-600 mb-6">
            ¿Estás seguro de que deseas dejar de recibir nuestro newsletter semanal?
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Email: <strong>{email}</strong>
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <Button
              onClick={handleUnsubscribe}
              disabled={unsubscribe.isPending}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              {unsubscribe.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
              Sí, cancelar suscripción
            </Button>
            <Link href="/blog">
              <Button variant="outline" className="w-full">
                No, quiero seguir suscrito
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
