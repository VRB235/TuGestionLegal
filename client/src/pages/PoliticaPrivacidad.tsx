import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function PoliticaPrivacidad() {
  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Política de Privacidad</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>1. Responsable del Tratamiento</h2>
            <p>
              El responsable del tratamiento de sus datos personales es <strong>Tu Gestión Legal</strong>, con correo electrónico de contacto: <strong>info@tugestionlegal.es</strong>.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>2. Finalidad del Tratamiento</h2>
            <p>Los datos personales que nos facilite serán tratados con las siguientes finalidades:</p>
            <ul>
              <li>Gestionar las consultas y solicitudes realizadas a través del formulario de contacto.</li>
              <li>Gestionar las reservas de asesorías y citas.</li>
              <li>Almacenar de forma segura los documentos subidos por los clientes para la gestión de sus trámites.</li>
              <li>Enviar comunicaciones relacionadas con los servicios contratados.</li>
              <li>Cumplir con las obligaciones legales aplicables.</li>
            </ul>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>3. Base Legal</h2>
            <p>
              El tratamiento de sus datos se basa en el consentimiento que usted otorga al enviar sus datos a través de nuestros formularios, así como en la ejecución de un contrato de prestación de servicios y el cumplimiento de obligaciones legales.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>4. Destinatarios</h2>
            <p>
              Sus datos no serán cedidos a terceros salvo obligación legal. Los documentos subidos se almacenan de forma segura en servidores en la nube con acceso controlado.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>5. Derechos del Interesado</h2>
            <p>Usted tiene derecho a:</p>
            <ul>
              <li>Acceder a sus datos personales.</li>
              <li>Solicitar la rectificación de datos inexactos.</li>
              <li>Solicitar la supresión de sus datos.</li>
              <li>Solicitar la limitación del tratamiento.</li>
              <li>Oponerse al tratamiento.</li>
              <li>Solicitar la portabilidad de sus datos.</li>
            </ul>
            <p>
              Para ejercer estos derechos, puede contactarnos en <strong>info@tugestionlegal.es</strong>.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>6. Conservación de Datos</h2>
            <p>
              Los datos personales se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para cumplir con las obligaciones legales aplicables.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>7. Seguridad</h2>
            <p>
              Tu Gestión Legal adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad de sus datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado.
            </p>

            <p className="text-sm text-gray-500 mt-8">Última actualización: Abril 2026</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
