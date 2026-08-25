import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function AvisoLegal() {
  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Aviso Legal</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>1. Datos Identificativos</h2>
            <p>
              En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y Comercio Electrónico (LSSI-CE), se informa al usuario que el titular de este sitio web es <strong>Tu Gestión Legal</strong>, con domicilio en España y correo electrónico de contacto: <strong>info@tugestionlegal.es</strong>.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>2. Objeto</h2>
            <p>
              El presente sitio web tiene como finalidad informar sobre los servicios de asesoría legal, gestión documental y trámites de extranjería ofrecidos por Tu Gestión Legal, así como facilitar la comunicación con los usuarios interesados.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>3. Propiedad Intelectual e Industrial</h2>
            <p>
              Todos los contenidos del sitio web, incluyendo textos, imágenes, diseño gráfico, logotipos, iconos, código fuente y software, son propiedad de Tu Gestión Legal o de terceros que han autorizado su uso, y están protegidos por las leyes de propiedad intelectual e industrial.
            </p>
            <p>
              Queda prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra forma de explotación de los contenidos sin la autorización expresa y por escrito de Tu Gestión Legal.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>4. Responsabilidad</h2>
            <p>
              Tu Gestión Legal no se hace responsable de los daños o perjuicios que pudieran derivarse del acceso o uso de este sitio web, incluyendo, sin limitación, los causados por virus informáticos o por la imposibilidad de acceso al sitio.
            </p>
            <p>
              La información contenida en este sitio web tiene carácter meramente informativo y no constituye asesoramiento legal. Para obtener asesoramiento personalizado, le recomendamos contactar directamente con nuestro equipo.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>5. Enlaces Externos</h2>
            <p>
              Este sitio web puede contener enlaces a páginas de terceros. Tu Gestión Legal no se responsabiliza del contenido, veracidad o funcionamiento de dichos sitios web externos.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>6. Legislación Aplicable</h2>
            <p>
              El presente aviso legal se rige por la legislación española. Para cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, las partes se someten a los Juzgados y Tribunales competentes.
            </p>

            <p className="text-sm text-gray-500 mt-8">Última actualización: Abril 2026</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
