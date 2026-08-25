# Tu Gestión Legal - TODO

## Estructura y Configuración
- [x] Configurar paleta de colores y tema visual (azul #112250, burdeos #5D0018, dorado #C19D4E)
- [x] Configurar fuentes profesionales (Google Fonts)
- [x] Esquema de base de datos (reservas, blog, contacto, documentos)
- [x] Migración SQL aplicada

## Imágenes
- [x] Generar imágenes hero profesionales
- [x] Generar imágenes para secciones de servicios
- [x] Subir imágenes a CDN

## Layout y Navegación
- [x] Layout global con header/nav/footer
- [x] Navegación responsive con menú móvil
- [x] Botón flotante WhatsApp
- [x] Footer con enlaces, contacto y redes sociales

## Página de Inicio
- [x] Hero con mensaje principal y CTAs
- [x] Sección servicios destacados
- [x] Sección "Cómo trabajamos"
- [x] Sección testimonios
- [x] Sección llamada a la acción
- [x] Sección blog destacado
- [x] Sección contacto rápido

## Página Sobre Mí
- [x] Información del equipo y experiencia
- [x] Misión, visión y valores

## Servicios
- [x] Página de servicios con tarjetas
- [x] Detalle de cada servicio con precio, descripción e incluye

## Asesorías
- [x] Consulta rápida (20€)
- [x] Asesoría videoconferencia (45€)
- [x] Estudio expediente complejo (75€)

## Packs
- [x] Pack Migrante
- [x] Pack Asesoría Mensual
- [x] Pack Tráfico
- [x] Pack Trámites Express
- [x] Pack Post-Jura Nacionalidad

## Trámites Venezolanos
- [x] Partida de nacimiento
- [x] Acta de matrimonio
- [x] Acta de defunción
- [x] Certificado antecedentes penales
- [x] Cancelación antecedentes penales
- [x] Poderes
- [x] Permisos de viaje
- [x] Apostilla de documentos

## Trámites de Extranjería
- [x] Renovaciones de residencia
- [x] Arraigo social/laboral/familiar
- [x] Reagrupación familiar
- [x] Tarjeta comunitaria
- [x] Permisos de trabajo
- [x] Estancia por estudios
- [x] Nacionalidad española (packs básico/medio/premium)
- [x] Recursos administrativos

## Otros Servicios Administrativos
- [x] Solicitud de partidas
- [x] Documentos notariales
- [x] Legalización y apostilla
- [x] Redacción documentos consulados

## Sistema de Reservas
- [x] Selección de servicio
- [x] Calendario de disponibilidad
- [x] Formulario de reserva
- [x] Confirmación automática por email
- [x] Notificación al administrador

## Blog
- [x] Listado de artículos con SEO
- [x] Página de artículo individual
- [x] Sistema CRUD para artículos (admin)

## Contacto
- [x] Formulario de contacto con validación
- [x] Datos de contacto (teléfono, email, redes)
- [x] Notificación al propietario

## Subida de Documentos
- [x] Sistema seguro de subida de archivos
- [x] Almacenamiento en S3
- [x] Acceso controlado

## Textos Legales
- [x] Aviso legal
- [x] Política de privacidad
- [x] Política de cookies
- [x] Condiciones de contratación

## SEO
- [x] Meta tags optimizados
- [x] Estructura semántica HTML
- [x] robots.txt y sitemap

## Tests
- [x] Tests unitarios con Vitest (15 tests pasando)
- [x] Revisión responsive

## Mejoras Sistema de Reservas (v2)
- [x] Ampliar selector de servicios para incluir TODOS los trámites y servicios (no solo asesorías)
- [x] Reemplazar desplegable de fecha por calendario visual interactivo
- [x] Verificar que las reservas lleguen correctamente al propietario (notificaciones)
- [x] Crear/verificar panel admin para ver reservas recibidas
- [x] Actualizar tests (22 tests pasando)

## Mejoras Sistema de Reservas (v3) - Notificación email + Confirmar/Rechazar
- [x] Añadir campo 'status' a tabla bookings (pending/confirmed/rejected)
- [x] Notificación por email a info@tugestionlegal.es al recibir reserva
- [x] Procedimientos tRPC para confirmar/rechazar reservas (admin)
- [x] Panel admin para ver y gestionar reservas con botones confirmar/rechazar
- [x] Página pública de confirmación de reserva para el cliente

## Rendimiento - Lentitud de carga
- [x] Investigar causa de lentitud de carga
- [x] Optimizar rendimiento: eliminado framer-motion de Home y Layout, CSS transitions en su lugar
- [x] Optimizar bundle size y code splitting (Home sin framer-motion, lazy loading de páginas)
- [x] Verificar mejora de rendimiento

## Bug - Email de reserva no llega
- [x] Investigar por qué no llega el email de notificación al hacer una reserva
- [x] Corregir el envío de emails (lectura dinámica de env vars + mejor logging)
- [x] Verificar que funciona correctamente (22 tests pasando, SMTP verificado)

## Mejoras visuales y de contenido (v4)

### Diseño y colores
- [x] Integrar tono vino/burdeos (#5D0018) en la paleta visual
- [x] Añadir botones de redes sociales en header (junto a "We assist clients in English")
- [x] Cambiar fuente de estadísticas (+500 clientes, etc.) a Montserrat
- [x] Generar iconos flat/ilustraciones estilo captura del usuario para servicios
- [x] Nuevas imágenes hero europeas (no estilo despacho americano/New York)

### Trámites de Extranjería
- [x] Añadir categoría "Residencias"
- [x] Juntar todos los arraigos en uno solo con descripción (laboral, social, familiar, etc.)
- [x] En estancias por estudios quitar "Incluye renovaciones y modificaciones"
- [x] En nacionalidad española: quitar niveles de servicio, poner "ofrecemos diferentes paquetes según tus necesidades", solo Paquete Básico y Paquete Premium (sin medio)
- [x] En recursos incluir nacionalidad

### Trámites Venezuela
- [x] Quitar "ver requisitos" de trámites venezolanos
- [x] En apostilla cambiar a "Legalización y apostilla de documentos"

### Otros trámites administrativos
- [x] Crear apartado "Otros trámites administrativos" en Trámites
- [x] Incluir servicios del catálogo original + gestión de impuestos (IRPF, ITP, IBI, IVTM)

### Reservas
- [x] Cuando seleccionen nacionalidad española, mostrar opción de elegir pack (básico/premium)
- [x] Botón "Solicitar" en cada trámite que lleve a reservas con trámite pre-seleccionado


## SEO Fix - Meta descripción
- [x] Corregir meta descripción de / (174 chars → 142 chars)

## Reestructuración v5 - Servicios, redes sociales y CTA

### Texto CTA
- [x] Simplificar texto "Estamos Aquí Para Ayudarte" - quitar "Atendemos en español e inglés"

### Redes Sociales
- [x] Corregir URL de Instagram: https://www.instagram.com/tugestionlegal
- [x] Añadir Facebook: https://www.facebook.com/share/1AtqGWqSZh/
- [x] Corregir URL de TikTok: https://www.tiktok.com/@tugestionlegal

### Reestructuración de Servicios
- [x] Asesorías: añadir "Asesoría inmobiliaria" como 4to servicio
- [x] Servicios Jurídicos: Extranjería + Nacionalidad (paquete básico, paquete completo) + Recursos administrativos
- [x] Servicios Administrativos: transferencia coche, IRPF, IBI, IVTM, bonificaciones, certificados, gestiones ayuntamientos, certificado digital, vida laboral, empadronamiento
- [x] Servicios Internacionales - Venezuela: partidas, actas, antecedentes, poderes, permisos viaje, apostilla
- [x] Otros Servicios Administrativos: solicitud partidas, documentos notariales, legalización/apostilla España, redacción documentos consulados
- [x] Packs de Extranjería: pack migrante, pack post jura nacionalidad
- [x] Packs de Gestoría: pack asesoría mensual, pack tráfico, pack trámites express
- [x] Actualizar navegación y rutas según nueva estructura
- [x] Actualizar bookableServices para reservas

## Rediseño completo v6 - Nueva arquitectura

### Menú / Navegación
- [x] Eliminar completamente pestaña "Trámites" del menú
- [x] Menú final: Inicio, Sobre Mí, Asesorías, Servicios, Packs, Reservar Cita, Blog, Contacto
- [x] Submenú desplegable de Servicios: Servicios Jurídicos, Servicios Administrativos, Servicios Internacionales, Otros Servicios

### Home / Portada
- [x] Hero con mensaje amplio (no solo extranjería): "Despacho especializado en servicios jurídicos, administrativos e internacionales"
- [x] Bloque de 3 áreas principales: Servicios jurídicos, Servicios administrativos, Servicios internacionales
- [x] Bloque de asesorías
- [x] Bloque de packs
- [x] Bloque de reservar cita
- [x] Bloque de contacto
- [x] Acceso al blog

### Asesorías
- [x] Tarjetas con: título, descripción, duración, para quién es, botón reservar, botón consultar
- [x] Descripción general: "Asesorías: consultas profesionales para resolver dudas..."

### Servicios (4 bloques)
- [x] 1. Servicios Jurídicos (Extranjería + Nacionalidad + Recursos)
- [x] 2. Servicios Administrativos (DGT, AEAT, SS, IBI, IVTM, Bonificaciones, Certificados, Ayuntamientos)
- [x] 3. Servicios Internacionales (Venezuela)
- [x] 4. Otros Servicios (partidas, notarías, legalización, consulados)

### Packs
- [x] Packs de Extranjería: Pack migrante, Pack post jura nacionalidad
- [x] Packs de Gestoría: Pack asesoría mensual, Pack tráfico, Pack trámites express
- [x] Cada pack con: título, categoría, descripción, para quién, qué incluye, botón consulta, botón reservar

### Contacto
- [x] Texto exacto: "Estamos Aquí Para Ayudarte / ¿Tienes dudas? Contacta con nosotros y te orientaremos sin compromiso"
- [x] Mostrar: teléfono, email, WhatsApp, reservar cita

### Footer
- [x] Actualizar footer: Servicios jurídicos, Servicios administrativos, Servicios internacionales, Asesorías, Packs, Blog, Contacto

### Limpieza
- [x] Eliminar páginas antiguas (TramitesExtranjeria, TramitesVenezolanos)
- [x] Actualizar App.tsx con rutas limpias

### Tarjetas detalladas
- [x] Asesorías: título, descripción, duración, para quién es, botón reservar, botón consultar
- [x] Packs: título, categoría, descripción, para quién, qué incluye, botón consulta, botón reservar

## Mejoras v7 - Submenús y textos
- [x] Asesorías con submenú desplegable: Consulta Rápida, Videoconferencia, Estudio Expediente, Inmobiliaria
- [x] Packs con submenú desplegable: Packs Extranjería, Packs Gestoría
- [x] Hero: cambiar a "Especialistas en Derecho de Extranjería y Gestión Documental"
- [x] Logo subtítulo: cambiar "ASESORÍA Y GESTIÓN INTEGRAL" a "EXTRANJERÍA Y GESTIÓN DOCUMENTAL"

## Mejora v8 - Texto hero
- [x] Cambiar texto descriptivo debajo del hero

## Mejora v9 - Anclas scroll
- [x] Añadir IDs de ancla en tarjetas de Asesorías para scroll desde submenú
- [x] Añadir IDs de ancla en secciones de Packs para scroll desde submenú

## Mejora v10 - Quitar Pack Tráfico
- [x] Eliminar Pack Tráfico de Packs de Gestoría

## Fix v11 - Packs
- [x] Tarjetas de packs con tamaño proporcional a la página
- [x] Fix scroll de Packs Gestoría desde desplegable del menú

## Fix v13 - Textos e Iconos
- [x] Quitar "legalizada" de "Partida de Nacimiento", "Acta de Matrimonio", "Acta de Defunción" en Servicios Internacionales
- [x] Renombrar "Apostilla de Documentos" a "Legalización y Apostilla de Documentos"
- [x] Personalizar iconos en Packs según cada título
- [x] Personalizar iconos en Servicios según cada título

## Fix v14 - Sistema de Reservas (solo asesorías + horarios + calendario)
- [x] Eliminar Consulta Rápida de ASESORIAS en shared/data.ts
- [x] Eliminar Consulta Rápida y Estudio Expediente de bookableServices.ts (solo quedan videoconferencia e inmobiliaria)
- [x] Eliminar Consulta Rápida del menú de navegación (Layout.tsx)
- [x] Eliminar referencia a consulta rápida en Asesorias.tsx (CTA WhatsApp)
- [x] Eliminar referencia a consulta rápida en Servicios.tsx
- [x] Actualizar horarios: L-V 9:00-12:00 y 17:00-19:00 (franjas 1h), Sábados 10:00-13:00
- [x] Permitir sábados en el calendario de reservas
- [x] Implementar bloqueo de horas ya reservadas (backend: query por fecha)
- [x] Implementar bloqueo de horas ya reservadas (frontend: deshabilitar botones)
- [x] Añadir enlace Google Calendar en email de confirmación al admin
- [x] Añadir enlace Google Calendar en página de confirmación post-clic
- [x] Restringir reservas solo a asesorías (videoconferencia e inmobiliaria)
- [x] Actualizar sidebar y textos de la página de reservas
- [x] Actualizar tests

## Fix v14b - Gaps pendientes
- [x] Crear test para booking.occupiedSlots y rechazo de slot ocupado
- [x] Revisar Home.tsx por textos residuales de consulta rápida

## Fix v15 - Horario de atención
- [x] Cambiar horario L-V de 9:00-19:00 a 9:00-17:00 en toda la web
- [x] Actualizar franjas de citas: L-V 9:00-12:00 y 13:00-16:00
- [x] Sábados mantener 10:00-14:00 (franjas 10:00-13:00)

## Fix v16 - Franjas correctas, festivos y recordatorio
- [x] Corregir franjas de citas: L-V mañana 9-12, tarde 17-19 (no 13-16)
- [x] Actualizar texto sidebar Reservas a "9:00-12:00 y 17:00-19:00"
- [x] Añadir lista de festivos nacionales españoles (bloquear en calendario)
- [x] Implementar recordatorio automático 24h antes al cliente por email (heartbeat)

## Fix v17 - Precios, Google Analytics, mensaje email
- [x] Añadir precios en página de Asesorías (Videoconferencia 45€, Inmobiliaria 60€)
- [x] Añadir precios en formulario de Reservas (sidebar y/o selector)
- [x] Preparar Google Analytics con variable de entorno para el ID (G-XXXXXXXXXX)
- [x] Añadir mensaje en email de confirmación: preparar dudas y documentos relevantes

## Fix v18 - Blog clic, imágenes propias, newsletter
- [x] Arreglar clic en noticias del blog (no navega al artículo)
- [x] Generar imágenes propias para los 3 artículos (sin derechos de autor)
- [x] Actualizar imageUrl de los artículos en la base de datos
- [x] Añadir formulario de suscripción al newsletter
- [x] Crear tabla de suscriptores en la base de datos
- [x] Endpoint para suscribirse al newsletter

## Fix v19 - Newsletter automático, compartir, estética editorial
- [x] Mejorar estética editorial del artículo: texto justificado, párrafos separados, tipografía periodística
- [x] Añadir botones de compartir (WhatsApp, Twitter, LinkedIn) en cada artículo
- [x] Configurar envío automático de newsletter semanal cada lunes con artículos nuevos

## Fix v19b - Gaps
- [x] Implementar página /unsubscribe para cancelar suscripción al newsletter
- [x] Añadir test para el flujo de newsletter
