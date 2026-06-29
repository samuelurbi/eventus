# EVENTUS — Progreso del Proyecto

**Última actualización:** 2026-06-28  
**Archivo Figma DS:** `CoqzpZG61T2OGeavFq0GLJ` (Original - Design System Eventus)  
**Archivo Figma UI:** `lt75fhmYuHuF2QrvCz2cIO` (PVI - Eventus)

---

## FLUJO DE TRABAJO

```
Analizar Branding → Analizar Wireframes → Design System → Onboarding → Dashboard Organizador → Dashboard Proveedor
      ✅                    ✅                  ✅              ✅                 ✅                      ✅
```

---

## FASE 0 — ANÁLISIS ✅

### Branding ✅
- Colores: Navy #0B334C · Mint #BCEE95 · Mint Claro #DEF3E0 · Blanco #FFFFFF · Negro #1D1D1D
- Fuente objetivo: Poppins (Mont no accesible vía Plugin API)
- Estilo: Minimalista, premium, profesional. Bordes redondeados, mucho espacio, alto contraste.
- Documento: `ANALISIS_BRANDING.md`

### Wireframes ✅
- 48+ pantallas analizadas en 3 secciones
- Onboarding: 9 pantallas (flujo lineal, 1 pregunta por pantalla)
- Dashboard Organizador: 29+ pantallas (sidebar + contenido, 7 módulos)
- Dashboard Proveedor: 10+ pantallas (similar al organizador, enfoque en oportunidades)
- Documento: `ANALISIS_WIREFRAMES.md`

---

## FASE 1 — DESIGN SYSTEM ✅

### Base: AlignUI V2.0
- 95 páginas · Auto-layout · Variables · Dark Mode nativo
- Archivo de referencia: `ALIGNUI_REFERENCE.md`

### Customizaciones aplicadas

| Cambio | Detalle | Estado |
|--------|---------|--------|
| Modo `🌿 Eventus` en `03-Theme` | 13 variables: Mint como CTA, Navy como dark | ✅ |
| Colores primitivos en `06-Foundations` | 15 vars: Navy-500~900, Mint-100~500, Gray-100~900 | ✅ |
| Tipografía → Poppins | 30 text styles migrados (DM Mono intacto) | ✅ |
| Modo Eventus en Buttons | 22 frames | ✅ |
| Modo Eventus en Text Input | 14 frames | ✅ |
| Modo Eventus en Modal | 17 frames | ✅ |
| Modo Eventus en Step Indicator | 9 frames | ✅ |
| Modo Eventus en Tab Menu | 8 frames | ✅ |
| Modo Eventus en Navigation | 6 frames | ✅ |
| Modo Eventus en Badge | 5 frames | ✅ |
| Modo Eventus en Select | 9 frames | ✅ |
| Modo Eventus en Checkbox | 16 frames | ✅ |
| Modo Eventus en Radio | 24 frames | ✅ |
| Modo Eventus en Switch | 12 frames | ✅ |
| Modo Eventus en Progress Bar | 7 frames | ✅ |
| Modo Eventus en Avatar | 13 frames | ✅ |
| Modo Eventus en Color Palette + Typography | 5 frames | ✅ |

**Total: 167 frames actualizados**

### Pendiente (acción manual del usuario)
- [ ] Publicar librería en Figma: Menú → Libraries → Publish
- [ ] Conectar librería a PVI - Eventus: Resources → Add Library

---

## FASE 2 — ONBOARDING ✅

**9 pantallas** · Flujo lineal · Desktop · 1280px

| # | Pantalla | Frame ID | Estado |
|---|----------|----------|--------|
| 1 | ¿Cómo quieres usar Eventus? (Org vs Prov) — **REDISEÑADO HiFi** | `90:17` | ✅ |
| 2 | Crear cuenta de Organizador | `83:17` | ✅ |
| 3 | Crear cuenta de Proveedor | `83:56` | ✅ |
| 4 | Iniciar sesión | `84:17` | ✅ |
| 5 | ¿Qué tipo de organizador eres? (Paso 1/4) | `84:47` | ✅ |
| 6 | ¿Qué tipos de eventos organizas? (Paso 2/4) | `85:17` | ✅ |
| 7 | ¿Cuál es tu ubicación principal? (Paso 3/4) | `85:72` | ✅ |
| 8 | ¿Cuál es tu rango de presupuesto? (Paso 4/4) | `87:17` | ✅ |
| 9 | ¿Qué servicios sueles necesitar? (Paso 4/4) | `87:68` | ✅ |

**Página Figma:** `🚀 Onboarding` en PVI - Eventus (`lt75fhmYuHuF2QrvCz2cIO`)

### ⚠️ Cambio de enfoque (importante)
La primera tanda (S1–S9) fue "wireframe + color" — pobre y no premium. **A partir de ahora se rediseña HiFi de verdad**, elevando la calidad al nivel del brief (Stripe/Linear/Notion) y usando la identidad real de la marca.

### 📏 REGLAS GLOBALES DE DISEÑO (aplican a TODAS las pantallas)
- **Altura mínima de pantalla: 810px.** Toda pantalla debe medir ≥810px de alto para mantener un aspect ratio mínimo aceptable. Si el contenido supera esa altura, **está bien** — significa que la pantalla tiene scroll (frame más alto que el viewport). Nunca por debajo de 810px.
- **SIN sombras manuales (drop shadows).** No agregar sombras negras a boxes, cards ni botones. **Solo se permiten sombras si el componente de la librería ya las trae nativamente.** Si no las trae, no se ponen. Definir jerarquía/profundidad con bordes, fondos y contraste, no con sombras.
- **Centrado respecto a la PÁGINA.** Los elementos centrados (títulos, hero, contenedores) deben centrarse respecto al ancho completo del frame (1440), no respecto a un sub-área. El título debe quedar alineado con las cards/botón centrados debajo.
- **Textos: NUNCA altura estática ni fixed.** Usar siempre `textAutoResize = 'HEIGHT'` (multilínea) o `'WIDTH_AND_HEIGHT'` (una línea). Fijar altura encima el divider sobre el texto (bug visto en cards S1).

### 🧩 USAR COMPONENTES Y ESTILOS DE ALIGNUI (regla crítica — no dibujar a mano)
La librería **"Original - Design System Eventus"** está conectada a PVI (`lt75fhmYuHuF2QrvCz2cIO`). Sus componentes, variables y text styles **SÍ son instanciables/aplicables**. NO recrear a mano lo que el DS ya tiene.

- **Componentes** (`importComponentSetByKeyAsync` → variante → `createInstance()`): Button, Text Input, Radio, Radio Card, Checkbox, Badge, Select, Avatar, etc. Keys conocidos:
  - Buttons set: `8e3038a4b1e14ed83748abb75d73ef47db90ad82` (props variante: `🧩 Type` Primary/Neutral/Error · `🏵️ Style` Filled/Stroke/Lighter/Ghost · `📌 State` · `📏 Size` Medium(40)/Small(36)/X-Small(32)/2X-Small(28) · `🔳 Only Icon`)
  - Radio set: `379036466ded1a377a79c155ed1292479684f5d1` (`📌 State` · `🟢 Active` Off/On)
  - Radio Card set: `5d6f4f6e864f96ab317fbf896e9737748de62a9b` (compacto 360×72, no es card alta con features)
  - Text Input set: `c62e50c5737d1f9ad11deb3f6b0cc65396a3bc80`
- **⚠️ Aplicar el MODO EVENTUS al frame** o las instancias salen en azul (modo default Blue):
  ```js
  const themeCol = await figma.variables.getVariableCollectionByIdAsync('VariableCollectionId:a3c593d80f4d36067f8b7ca7e61511a862185f63/201679:0');
  frame.setExplicitVariableModeForCollection(themeCol, '201679:0'); // 🌿 Eventus
  ```
  (IDs en el archivo PVI; el modo Eventus es `201679:0`. Otros modos: Blue `113:0`, Purple, Orange, Green.)
- **Text styles AlignUI** (`importStyleByKeyAsync(key)` → `await node.setTextStyleIdAsync(style.id)`). Escala Poppins:
  | Uso | Estilo | Key | px |
  |---|---|---|---|
  | H1 hero | Title/H3 | `3d2cbac5c10bb2636241ffb892a6438039511593` | 40 SemiBold |
  | H1 alt | Title/H4 | `373c27bd12bdc550ec4ac30f18a6ac6136fb77d7` | 32 SemiBold |
  | Título card | Title/H6 | `9075c662d4fcfabc7ee8d071040ae41239227654` | 20 SemiBold |
  | Eyebrow | Subheading/X Small | `c11706e4c3e06ab8311c094acd8dcb03646fee9a` | 12 Medium 4%LS |
  | Subtítulo | Paragraph/Medium | `11a9dfa9d38188d15be3a1ce4dd93a854d90120b` | 16 Regular |
  | Body | Paragraph/Small | `a4811239d94d61ddc91ba973f4c4a0913644b9ba` | 14 Regular |
  | Features/captions | Paragraph/Compact | `29df9e1ed2b15bdb469971a97cc996e221a2f52c` | 13 Regular |
  | Link bold | Label/Compact | `2ca49f19f235aa51c3acd85176a8af03e39703d8` | 13 SemiBold |
  | Footer | Paragraph/X Small | `1040b73361803a22b515cf2f67a035817a663ea2` | 12 Regular |
- **Bespoke legítimo** (no hay componente DS): hero (gradiente+grid+glow), logo (clon de Branding `3:43`), composición de pantalla, "selection cards" altas con lista de features.
- **Gaps y paddings = variables de spacing de la LIBRERÍA AlignUI** (no las locales del file, no números sueltos). ⚠️ El file PVI tiene una colección local `Spacing` (`63:63`) que **NO** se debe usar — son las remotas de la librería. Importar por key con `figma.variables.importVariableByKeyAsync(key)` → `node.setBoundVariable('itemSpacing'|'paddingLeft'|'paddingRight'|'paddingTop'|'paddingBottom', variable)`. Colección **05-Spacing** (origen `VariableCollectionId:118:3638`):
  | Var | px | key |
  |---|---|---|
  | spacing-0 | 0 | `191c12d3fad26035070e33626017f1a7a2e0635f` |
  | spacing-2 | 2 | `4e3bc49057cb73b982859841eacf6c09270a9a66` |
  | spacing-4 | 4 | `3ed289fcb0bd1fc0fcd4ddaa062f67e55505f0be` |
  | spacing-6 | 6 | `700e32632b0b878933717f3bb7b5ca6024320d03` |
  | spacing-8 | 8 | `7c548e1a73e1620cd0e2c976ff2d4fbf97e5e784` |
  | spacing-10 | 10 | `1ea1dbcba3606232631e4548650a2f9737b6fe18` |
  | spacing-12 | 12 | `43adad570556ff278c59f3d0b23f86a55fddca9c` |
  | spacing-14 | 14 | `6aee79b3516153ef44a6bd033bef891406cfb46b` |
  | spacing-16 | 16 | `829f9fb29285c8ce60386eab5943690d2f045599` |
  | spacing-24 | 24 | `f0c318095f1ce93dbbbb801df1d234dbc9720c42` |
  | spacing-32 | 32 | `f87d7213e251dec451d823ef7710d0630c657ef1` |
  | spacing-40 | 40 | `ce1bb044174eb045636cd832563cee21314c3567` |
  | spacing-48 | 48 | `b8f1e624020721ad8f4c7229034557c230aa2987` |
  ⚠️ Nota: la escala spacing no tiene 20 ni 28 — snap a los valores existentes.
- **Radius = colección 04-Radius de la librería** (origen `VariableCollectionId:118:2724`): radius-0`003a73fb…` · radius-2 · radius-4`d9e887dd…` · radius-6 · radius-8`7040b8d6…` · radius-10`83f744d2…` · radius-12`439d433a…` · radius-16`173eca12…` · radius-20`e5572746…` · radius-24`1ebd5701…` · radius-28`35148e26…` · radius-full`87fde488…`.
- **Spacing aplicado en S1 (referencia):** hero outer gap=spacing-16 · hero inner (eyebrow+título) gap=spacing-10 · card padding=spacing-24 · card gap=spacing-16 · header(título↔desc)=spacing-8 · lista features=spacing-12 · fila(check↔texto)=spacing-8.

### 🔘 BOTÓN PRIMARY EVENTUS = MINT + TEXTO NAVY (decisión del usuario)
- Mint es `primary-base`. El botón `Primary/Filled` de AlignUI traía texto blanco (`static-white`) → ilegible sobre mint.
- **FIX aplicado en la librería origen** (`CoqzpZG61T2OGeavFq0GLJ`, Buttons set `129:1422`): las 32 variantes `Primary/Filled` ahora tienen texto+icono atados a `primary-darkest` (navy). Neutral/Error intactos (siguen blanco).
- ⚠️ **PENDIENTE MANUAL:** re-publicar la librería (Libraries → Publish) y aceptar el update en PVI para que las instancias tomen el cambio.

### Lenguaje visual / plantilla HiFi (definido en S1 rediseñada `90:17`)
- **Hero navy** full-width (~320px): gradiente navy `#0B334C→#0A2A3D`, **patrón de grid** sutil (líneas blancas @4%), **glow mint** difuminado, **logo real** clonado de Branding (`3:43`), eyebrow mint + H1 blanco + subtítulo (todo **centrado respecto a la página**).
- **Zona de foto** (humanización): panel placeholder glass sutil (blanco @6%, sin borde) a la derecha del hero — reemplazar por foto real (`createImageAsync` está bloqueado por red en el plugin; se deja placeholder marcado).
- **Cards elevadas** que **se superponen** al hero (profundidad por solapamiento, NO por sombra). Estados: *default* (blanco, borde gris), *selected* (borde mint 2px, fondo mint-50, badge de check navy/mint). Iconos line reales + checks mint en circulito.
- **Botón** navy radius 12 (**sin sombra**); **footer** mínimo; fondo de página off-white `#F6F8F9`.
- Decisiones del usuario: layout **centrado y elevado** + marca **navy con foto real**.

### Pendiente onboarding
- [ ] **Rediseñar HiFi S2–S9** aplicando esta misma plantilla (reemplazar las versiones "wireframe+color" actuales).

---

## FASE 3 — DASHBOARD ORGANIZADOR ⏳

**29+ pantallas** · 7 módulos · Desktop · 1440px

| Módulo | Pantallas | Estado |
|--------|-----------|--------|
| A. Dashboard Principal | Vista general, estado, acciones rápidas | ⏳ Pendiente |
| B. Gestión de Eventos | Listado, crear, editar, detalles | ⏳ Pendiente |
| C. Gestión de Proveedores | Búsqueda, comparar, contactar, favoritos | ⏳ Pendiente |
| D. Gestión de Presupuesto | Resumen, tabla de costos, alertas | ⏳ Pendiente |
| E. Gestión de Documentos | Listado, upload, compartir | ⏳ Pendiente |
| F. Chat/Mensajería | Conversaciones, historial, notificaciones | ⏳ Pendiente |
| G. Configuración | Perfil, suscripción, integraciones | ⏳ Pendiente |

---

## FASE 4 — DASHBOARD PROVEEDOR ⏳

**10+ pantallas** · 7 módulos · Desktop · 1440px

| Módulo | Pantallas | Estado |
|--------|-----------|--------|
| A. Dashboard Principal | Oportunidades, solicitudes, nivel/tier | ⏳ Pendiente |
| B. Gestión de Solicitudes | Listado, detalles, envío de presupuestos | ⏳ Pendiente |
| C. Gestión de Presupuestos | Enviados, estado, comparación | ⏳ Pendiente |
| D. Chat con Organizadores | Conversaciones, archivos | ⏳ Pendiente |
| E. Gestión de Perfil | Info profesional, portafolio, reseñas | ⏳ Pendiente |
| F. Planes y Suscripción | Plan actual, upgrade, estadísticas | ⏳ Pendiente |
| G. Configuración | Notificaciones, pagos, documentos legales | ⏳ Pendiente |

---

## DECISIONES TÉCNICAS

| Decisión | Razón |
|----------|-------|
| Poppins como fuente definitiva | **Mont quedó descartada.** Poppins es la fuente del producto (en la app React vía Google Fonts y `tailwind.config`). |
| AlignUI V2.0 como base | DS completo con componentes reales, variables, dark mode, listo para customizar |
| Mint (#BCEE95) como `primary-base` | Es el color de acción/CTA de Eventus. Navy es el color de fondo/oscuro. |
| Sidebar oscuro via variable mode `Dark` | El sidebar del dashboard usará el Dark mode de `01-Tokens`, no un componente aparte |

---

---

## FASE 3 — DASHBOARD ORGANIZADOR ✅

**Página Figma:** `📊 Dashboard Organizador` en PVI - Eventus (`lt75fhmYuHuF2QrvCz2cIO`)  
**Layout:** 1440px · Sidebar navy 240px + Content area 1200px · SH=900px  
**Arquetipo:** Carlos Mendoza · Organizador Empresa

| Módulo | Pantalla | Frame en canvas | HTML | Estado |
|--------|----------|-----------------|------|--------|
| A | Dashboard Principal | x=0 | `da1-dashboard-principal.html` | ✅ |
| B | Gestión de Eventos | x=1540 | `da2-eventos.html` | ✅ |
| C | Gestión de Proveedores | x=3080 | `da3-proveedores.html` | ✅ |
| D | Gestión de Presupuesto | x=4620 | `da4-presupuesto.html` | ✅ |
| E | Gestión de Documentos | x=6160 | `da5-documentos.html` | ✅ |
| F | Chat / Mensajería | x=7700 | `da6-mensajes.html` | ✅ |
| G | Configuración | x=9240 | `da7-configuracion.html` | ✅ |

### Patrones clave del dashboard
- Sidebar: navy sólido, logo + user chip + nav items con dot indicator + badge mint para contadores
- Nav activo: `rgba(MINT, 0.12)` fill + texto MINT + dot MINT
- Topbar: blanco, border-bottom G200, título H1 18px Bold + subtítulo 11px, CTA mint a la derecha
- Cards: fondo blanco, border G200, border-radius 12px, sin sombra
- KPIs: 4 cards en fila, icon box 32px, valor 22-26px Bold, sub 10px Regular
- Tablas: header OW bg, rows con border G100, acciones con icon buttons 28px G100

---

## FASE 4 — DASHBOARD PROVEEDOR ✅

**Página Figma:** `🔧 Dashboard Proveedor` en PVI - Eventus (`lt75fhmYuHuF2QrvCz2cIO`)  
**Layout:** 1440px · Sidebar navy 240px + Content area 1200px · SH=900px  
**Arquetipo:** Marco Reyes · Proveedor Fotografía

| Módulo | Pantalla | Frame en canvas | HTML | Estado |
|--------|----------|-----------------|------|--------|
| A | Dashboard Principal | x=0 | `dp1-dashboard-proveedor.html` | ✅ |
| B | Gestión de Solicitudes | x=1540 | `dp2-solicitudes.html` | ✅ |
| C | Mis Presupuestos | x=3080 | `dp3-presupuestos-proveedor.html` | ✅ |
| D | Chat con Organizadores | x=4620 | `dp4-mensajes-proveedor.html` | ✅ |
| E | Mi Perfil Profesional | x=6160 | `dp5-perfil-proveedor.html` | ✅ |
| F | Planes y Suscripción | x=7700 | `dp6-planes.html` | ✅ |
| G | Configuración | x=9240 | `dp7-configuracion-proveedor.html` | ✅ |

### Diferencias clave vs Organizador
- Dashboard A: Tier banner navy gradient con progress bar hacia siguiente nivel
- Dashboard B: Split panel — lista de solicitudes (300px) + detalle+formulario cotización
- Dashboard C: Tabla de presupuestos con 5 KPI cards sumario
- Dashboard D: Chat idéntico al organizador, invertido (Marco como proveedor)
- Dashboard E: Hero de perfil navy gradient + portafolio 4-column photo grid + reviews
- Dashboard F: 3 plan cards (Básico / Profesional★ / Elite) con highlight navy en plan actual
- Dashboard G: Settings nav + toggles de notificaciones (misma estructura que Organizador)

---

## RESUMEN FINAL

| Fase | Entregables | Estado |
|------|-------------|--------|
| Branding + Wireframes | Análisis completo | ✅ |
| Design System (AlignUI Eventus) | 167 frames actualizados | ✅ |
| Onboarding (S1–S9) | 9 pantallas HiFi 1280px | ✅ |
| Dashboard Organizador | 7 módulos 1440px | ✅ |
| Dashboard Proveedor | 7 módulos 1440px | ✅ |
| **TOTAL** | **32 pantallas + 25 archivos HTML** | **✅ COMPLETO** |

---

## NOTAS

- **Fuente definitiva:** Poppins. Mont quedó descartada (no se usará).
- **Solo Light Mode por ahora** — Dark mode de AlignUI disponible pero no se usa en Eventus
- **Contenido realista** — Sin lorem ipsum. Nombres de eventos, fechas, presupuestos, proveedores reales
- **Arquitectura de wireframes bloqueada** — No modificar flujos ni jerarquía aprobada

---

## FASE 5 — APP REACT (en construcción) 🚧

El producto se está construyendo como **app React** en `app/`. La carpeta `screens/` (HTML estático de prototipos) fue **eliminada** y ya no se usa.

**Stack:** Vite + React 19 + Tailwind 3 + react-router-dom + lucide-react (iconos SVG).
**Correr:** `cd app && npm run dev` → http://localhost:5173 (dashboard en `/organizador`).
**Estructura:** `src/pages/` (auth, onboarding, organizador/Home), `src/layouts/DashboardLayout.jsx`, `src/data/mock.js`, `src/components/`, `tailwind.config.js` (tokens de marca).

**Estado:** Splash, Auth, Onboarding y **Dashboard Organizador completo** (7 pantallas: Home, Mis Eventos, Crear Evento, Proveedores, Presupuesto, Documentos, Mensajes, Configuración) implementados en React. Helpers compartidos en `src/data/theme.js` y `src/components/ui.jsx`. Dashboard Proveedor: pendiente.

**Lenguaje de diseño del dashboard** (decidido al iterar el Home):
- Poppins · **sin sombras** (jerarquía con bordes/color) · **sin emojis** (SVG) · tokens de texto oscurecidos para legibilidad.
- **Identidad por tipo de evento** (`EVENT_THEME`): Boda=rosa/Heart, Corporativo=navy/Briefcase, Fiesta=violeta/PartyPopper → gradiente + foto **Unsplash** + icono.
- Radios: exterior (`rounded-xl`) > interior (`rounded-lg`). Acento navy (barrita 3px) en títulos.
- **Home:** hero horizontal del próximo evento (imagen 34% que llena altura + contenido) + 4 KPIs con sparkline a los bordes. Cuerpo en **3 columnas** `[1.4fr_1fr_300px]`: izq (Mis eventos + Presupuesto) · centro (Actividad + Próximas tareas) · der (Acciones rápidas *sticky* + Mensajes). Último box de cada columna con `flex-1` para alinear fondos.

**Verificación visual:** sin chromium-cli/playwright; screenshots con Edge headless (`msedge --headless=new --virtual-time-budget=8000 --screenshot=... --window-size=1540,1180 <url>`). El `--virtual-time-budget` es necesario para que carguen las imágenes de Unsplash.

### Roadmap (lo que sigue)

> **Arquitectura confirmada con Figma** (sección `Dashboard-organizador`, node 45:18688, 15 frames): es **dual** — secciones GLOBALES en el sidebar + tabs POR EVENTO. Presupuesto y Documentos son **por evento** (tabs), no del sidebar.
>
> **Sidebar:** Dashboard · Mis Eventos · Proveedores (marketplace) · Mensajes (bandeja) · Referidos · Configuración · Ayuda.
> **Detalle de Evento** `/eventos/:id` con tabs: Resumen · Proveedores · Presupuesto · Documentos · Mensajes · Invitados.

1. ✅ **Home + da2–da7** — Home, Mis Eventos, Crear Evento, Proveedores, Presupuesto, Documentos, Mensajes, Configuración construidas en React.
2. ✅ **Fase 1** — Sidebar reestructurado (fuera Presupuesto/Documentos, dentro Referidos + Ayuda) + página **Referidos** (programa + historial, MXN).
3. ✅ **Fase 2** — **Detalle de Evento** `/eventos/:id` (`EventoDetalle.jsx`) con 6 tabs: Resumen (mini-dashboard) · Proveedores (categorías) · Presupuesto (tabla desglose + calendario de pagos) · Invitados · Documentos · Mensajes (chat). Tabs por `useState`. Links "Ver evento" del Home y Mis Eventos apuntan aquí. Datos en `mock.js` (EV_PROV_CATEGORIAS, EV_PARTIDAS, EV_PAGOS, EV_INVITADOS). También: header global movido al topbar vía `usePageHeader` (sin breadcrumb) y quitado el botón "Nuevo evento" duplicado.
4. ✅ **Fase 3** — **Marketplace** de Proveedores enriquecido (filtros laterales, orden, cards con imagen/verificado/favorito) + **Detalle de Proveedor** `/proveedores/:id` (`ProveedorDetalle.jsx`: galería, sobre nosotros, servicios, paquetes Básico/Premium/Deluxe, valoraciones, sidebar solicitar presupuesto + info adicional). Datos PROVEEDOR_SERVICIOS/PAQUETES/RESENAS en mock.
5. ✅ **Fase 4** — **Configuración** ampliada (`Configuracion.jsx`), 4 tabs: Datos personales (foto, datos, dirección, sobre mí, idioma/zona + eliminar cuenta) · Seguridad (contraseña + checklist, 2FA, códigos recuperación, sesiones, opciones avanzadas) · Notificaciones (toggles correo/push + general + privacidad) · Facturación (plan, método de pago, historial de facturas).
6. 🚧 **Fase 5** — **Ayuda** (reemplazar stub) — siguiente.
7. **Dashboard Proveedor (dp1–dp7)** — las 7 pantallas del proveedor con el mismo sistema.
4. **Componentizar** — extraer patrones repetidos (card de sección, fila de lista, badges de estado, KPI) a `src/components/` para reutilizar entre pantallas.
5. **Datos reales** — sustituir `src/data/mock.js` por API/backend (fase futura).
