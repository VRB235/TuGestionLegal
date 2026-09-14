import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function CondicionesContratacion() {
  return (
    <>
      <section className="bg-[#112250] text-white py-16">
        <div className="container">
          <h1 className="text-3xl lg:text-4xl font-bold" style={{ fontFamily: "var(--font-heading)" }}>Condiciones de Contratación</h1>
        </div>
      </section>
      <section className="py-16 bg-white">
        <div className="container max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>1. Objeto</h2>
            <p>
              Las presentes condiciones regulan la contratación de los servicios de asesoría legal, gestión documental y trámites administrativos ofrecidos por Tu Gestión Legal a través de este sitio web.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>2. Servicios</h2>
            <p>
              Los servicios ofrecidos incluyen, entre otros: asesorías legales (presenciales y online), gestión de trámites de extranjería, gestión documental, trámites venezolanos y packs de servicios. Los detalles, alcance y precios de cada servicio se describen en las secciones correspondientes del sitio web.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>3. Proceso de Contratación</h2>
            <p>La contratación de servicios se realiza a través de los siguientes pasos:</p>
            <ol>
              <li>El cliente selecciona el servicio deseado y completa el formulario de reserva o contacto.</li>
              <li>Tu Gestión Legal confirma la disponibilidad y envía una confirmación por email.</li>
              <li>Se acuerdan las condiciones específicas del servicio y, en su caso, el precio.</li>
              <li>El cliente acepta las condiciones y se procede a la prestación del servicio.</li>
            </ol>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>4. Precios y Forma de Pago</h2>
            <p>
              Los precios indicados en el sitio web incluyen los impuestos aplicables salvo que se indique lo contrario. Las asesorías online se pagan de forma segura mediante Stripe Checkout en el momento de la reserva. Otros servicios pueden facturarse según las condiciones acordadas.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>5. Cancelaciones y Devoluciones</h2>
            <p>
              Las cancelaciones de citas deben comunicarse con al menos 24 horas de antelación. En caso de cancelación fuera de plazo, Tu Gestión Legal se reserva el derecho de cobrar el importe correspondiente. Las devoluciones se gestionarán de forma individualizada según las circunstancias de cada caso.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>6. Obligaciones del Cliente</h2>
            <p>El cliente se compromete a:</p>
            <ul>
              <li>Facilitar información veraz y completa para la correcta prestación del servicio.</li>
              <li>Entregar la documentación necesaria en los plazos acordados.</li>
              <li>Colaborar activamente en la gestión de su expediente.</li>
              <li>Realizar los pagos en las condiciones acordadas.</li>
            </ul>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>7. Limitación de Responsabilidad</h2>
            <p>
              Tu Gestión Legal se compromete a prestar sus servicios con la máxima diligencia y profesionalidad. No obstante, no puede garantizar un resultado favorable en los trámites administrativos, ya que estos dependen de la decisión de las autoridades competentes.
            </p>

            <h2 className="text-[#112250]" style={{ fontFamily: "var(--font-heading)" }}>8. Legislación Aplicable</h2>
            <p>
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales competentes.
            </p>

            <p className="text-sm text-gray-500 mt-8">Última actualización: Abril 2026</p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
