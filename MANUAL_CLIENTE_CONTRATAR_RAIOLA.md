# Manual para el cliente — Contratar el hosting (Raiola Networks)

## Introducción breve

Vamos a contratar el **servidor donde vivirá la web** de Tu Gestión Legal (como alquilar un local para el negocio, pero en internet).

Usted **no tiene que tocar el código** ni cambiar el dominio todavía. Solo:

1. Comprar el plan correcto.
2. Anotar unos datos de acceso.
3. Enviárselos a quien hace el despliegue técnico.

Cuando eso esté listo, el técnico montará la web, el correo y la base de datos.

---

## Requisitos previos

Tenga a mano:

- Una **tarjeta** o cuenta **PayPal** (recomendado: activan el servicio al momento).
- El correo electrónico que usará para la **cuenta de cliente** de Raiola.
- Saber que el dominio **ya está** en IONOS: `tugestionlegal.es`  
  **No** hay que comprar ni transferir el dominio en este paso.
- Un bloc de notas (o un documento) para copiar usuario, contraseñas y enlaces.

**Importante:** hasta que le digan lo contrario, **no cambie nada del DNS** en IONOS (los “apuntadores” del dominio). La web puede seguir como esté ahora mientras montamos el servidor nuevo.

---

## Paso a paso

### Paso 1 — Abrir la página del producto

1. Abra el navegador (Chrome, Edge, Firefox…).
2. Entre en esta dirección:

   **https://raiolanetworks.com/hosting-nodejs/**

3. Debe ver una página de **Hosting Node.js** con un panel a la derecha para elegir CPU, memoria, disco y periodo.

---

### Paso 2 — Elegir la configuración correcta

En el panel de la derecha, deje (o deje como ya venga) esto:

| Qué | Valor |
|-----|--------|
| **CPU** | **150%** (el mínimo / primera posición del control) |
| **Memoria RAM** | **2048MB** (2 GB) |
| **Espacio en disco** | **50GB** |
| **Periodo** | **Mensual** (al principio; más adelante se puede pasar a anual) |

Debajo debería ver un precio cercano a **27,20 € al mes** (sin IVA; el IVA se suma al pagar).

Si ve un botón de plan llamado **«Para crecer»**, también sirve: es esa misma configuración.

---

### Paso 3 — Pulsar Contratar

1. Pulse el botón naranja **Contratar**.
2. Puede aparecer una pantalla de seguridad («Verifique que es humano»). Márquela y espere unos segundos.
3. Entrará en el **área de clientes / carro de pedidos** de Raiola.

---

### Paso 4 — Decir que ya tiene dominio (muy importante)

Le preguntarán cómo gestionar el dominio. Elija **exactamente** esta opción:

**«Yo tengo mi dominio que no quiero transferir y lo voy a usar con este hosting.»**

**No** elija:

- registrar un dominio nuevo, ni  
- transferir el dominio.

Luego rellene:

1. En el primer recuadro: **`tugestionlegal`**
2. En el segundo (la extensión): **`es`**
3. Pulse **Usar**.
4. Espere a que termine de comprobar.
5. Cuando se active, pulse **Continuar**.

Así el hosting queda asociado a `tugestionlegal.es` **sin mover el dominio** de IONOS todavía.

---

### Paso 5 — Revisar el carrito

1. Debe ver el producto de hosting en el carrito (no debe decir que el carro está vacío).
2. Si el carro aparece **vacío**, vuelva al Paso 1 y repita el flujo **sin cerrar la ventana a medias**.
3. Cuando el producto esté en el carrito, pulse **Pagar Ahora**.

---

### Paso 6 — Crear cuenta o iniciar sesión

- Si **nunca** ha comprado en Raiola: pulse **Registro** y cree la cuenta con su email y una contraseña segura. **Guarde** email y contraseña.
- Si **ya** tiene cuenta: pulse **Acceder** e inicie sesión.

Complete los datos de facturación que pida el formulario (nombre, dirección, etc.) con los datos reales del negocio o de quien factura.

---

### Paso 7 — Pagar

Recomendado:

- **PayPal**, o  
- **Tarjeta de crédito/débito**

Esos métodos suelen **activar el servicio enseguida**.

Evite de momento (salvo que no haya otra opción):

- Transferencia bancaria  
- Domiciliación SEPA  

…porque suelen retrasar la activación hasta que revisen el pago.

Acepte condiciones si las pide y confirme el pago.

Guarde el **correo de confirmación** del pedido.

---

### Paso 8 — Entrar al panel cuando el servicio esté activo

1. Entre en el área de clientes de Raiola (enlace del email de bienvenida, o desde la web de Raiola → **Área de clientes**).
2. Inicie sesión con el email y contraseña del Paso 6.
3. Busque su servicio / producto de hosting (a veces aparece como Hosting Code / Node.js).
4. Abra el acceso a **cPanel** (suele decir **cPanel**, **Acceder al panel** o similar).

Si aún no ve el servicio, espere el email de «servicio activado» (con PayPal/tarjeta suele ser rápido; si no, contacte soporte de Raiola).

---

### Paso 9 — Anotar lo que el técnico necesita (checklist)

En un documento seguro (no lo publique en redes), copie:

#### A) Cuenta Raiola

- [ ] Email de la cuenta de cliente  
- [ ] Contraseña de la cuenta (o indíquele al técnico que **usted** entrará cuando haga falta)  
- [ ] Número de pedido / factura (si lo tiene)

#### B) Accesos del hosting

- [ ] Enlace o forma de entrar a **cPanel**  
- [ ] Usuario de **cPanel**  
- [ ] Contraseña de **cPanel**  
- [ ] Datos de **SSH** si aparecen (host, usuario, puerto, contraseña o clave)  
- [ ] La **URL temporal** del hosting (algo tipo `…raiolanetworks…` o el dominio provisional que muestre el panel). **Aún no** tiene que apuntar `www.tugestionlegal.es` ahí.

#### C) Correo (importante)

Si **`info@tugestionlegal.es` ya funciona con Google** (Gmail / Calendar):

- [ ] **No** cree esa cuenta en Raiola  
- [ ] Avise al técnico: el correo se queda en Google  
- [ ] Al cambiar DNS, el técnico **debe conservar los MX de Google**

Si el correo aún no está en Google y quiere usarlo del hosting:

- [ ] Crear `info@tugestionlegal.es` en cPanel y anotar SMTP

#### D) Lo que **no** debe hacer todavía

- [ ] **No** cambie DNS / nameservers en IONOS todavía  
- [ ] **No** borre el hosting anterior / Railway si aún existe, hasta que el técnico lo diga  
- [ ] **No** envíe contraseñas por canales inseguros si puede evitarlo

---

## Qué debe entregarle al técnico para continuar el despliegue

Envíe (o comparta en llamada) este paquete mínimo:

1. **Confirmación:** «Hosting Raiola contratado y activo».
2. **Acceso cPanel** (usuario + contraseña + cómo entrar).
3. **SSH** (si el panel lo muestra).
4. **URL temporal** del sitio en Raiola.
5. **Email `info@…`** + contraseña + SMTP (si ya lo creó).
6. **Email de la cuenta Raiola** (por si hay que abrir tickets de soporte).

Con eso el técnico hará, en este orden:

1. Crear la base de datos **vacía** (empezamos limpio, sin copiar datos viejos).  
2. Subir y arrancar la aplicación.  
3. Probar la web en la URL temporal.  
4. Solo al final: cambiar el DNS y el pago online (Stripe) al dominio `www.tugestionlegal.es`.

---

## Preguntas frecuentes / Qué hacer si algo sale mal

### «El carrito dice que está vacío»
Vuelva a https://raiolanetworks.com/hosting-nodejs/, pulse otra vez **Contratar**, elija de nuevo **dominio propio sin transferir**, `tugestionlegal` + `es`, **Usar** y **Continuar**. No cierre la pestaña a mitad del proceso.

### «Me obliga a comprar un dominio .es»
Ha elegido la opción incorrecta. Vuelva atrás y marque  
**«Yo tengo mi dominio que no quiero transferir…»**.

### «¿Cambio ya el dominio en IONOS?»
**No.** Eso se hace al final, cuando la web ya funcione en la URL temporal de Raiola. Si lo cambia antes, el sitio público puede romperse.

### «Pagué por transferencia y no veo el servicio»
Es normal: Raiola puede esperar el comprobante. Suba el justificante por su sistema de tickets o elija PayPal/tarjeta la próxima vez para activación inmediata.

### «No encuentro cPanel»
En el área de clientes abra el producto de hosting y busque botones como **Acceder a cPanel** / **Login to cPanel**. Si no aparece, espere el email de activación o escriba a soporte Raiola: **info@raiolanetworks.es** / teléfono **+34 982 77 60 81**.

### «¿Qué plan exacto contraté?»
Debe ser el básico de Hosting Node.js / Code: **2 GB RAM, 50 GB disco, 150 % CPU, pago mensual**. Si contrató otro por error, avise al técnico antes de seguir.

### «¿Hace falta que yo sepa de programación?»
No. Solo contratar, guardar accesos y enviárselos al técnico.

---

## Resumen en una frase

**Contrate el hosting Node.js básico mensual en Raiola sin mover el dominio, entre a cPanel cuando esté activo y envíe al técnico: cPanel, SSH (si hay), URL temporal y, si puede, el correo info@.**
