import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function PoliticaCookies() {
  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Política de Cookies</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>1. ¿Qué son las Cookies?</h2>
            <p>
              Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Se utilizan para mejorar la experiencia de navegación, recordar preferencias y analizar el uso del sitio.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>2. Tipos de Cookies que Utilizamos</h2>
            <p><strong>Cookies técnicas o necesarias:</strong> Son imprescindibles para el funcionamiento del sitio web. Permiten la navegación y el uso de funciones básicas como el inicio de sesión.</p>
            <p><strong>Cookies de análisis:</strong> Nos permiten analizar el comportamiento de los usuarios en el sitio web de forma anónima para mejorar nuestros servicios.</p>
            <p><strong>Cookies de preferencias:</strong> Permiten recordar sus preferencias de navegación, como el idioma o la región.</p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>3. Gestión de Cookies</h2>
            <p>
              Usted puede configurar su navegador para aceptar o rechazar cookies, así como para eliminar las cookies almacenadas. Tenga en cuenta que la desactivación de cookies puede afectar al funcionamiento de algunas funciones del sitio web.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>4. Cookies de Terceros</h2>
            <p>
              Este sitio web puede utilizar servicios de terceros que instalan sus propias cookies. No tenemos control sobre estas cookies y le recomendamos consultar las políticas de privacidad de dichos terceros.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>5. Actualización</h2>
            <p>
              Esta política de cookies puede ser actualizada periódicamente. Le recomendamos revisarla de forma regular para estar informado sobre cómo utilizamos las cookies.
            </p>

            <p className="text-sm text-gray-500 mt-8">Última actualización: Abril 2026</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
