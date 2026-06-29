# ALIGN UI V2.0 — Referencia para Eventus

**Archivo Figma:** `CoqzpZG61T2OGeavFq0GLJ`
**Archivo:** Original - Design System Eventus
**Versión:** AlignUI V2.0
**Features:** Auto-layout · Variables · Dark Mode

---

## ESTRUCTURA DE PÁGINAS (95 páginas)

### ⚙ Core Elements
| Página | ID | Descripción |
|--------|----|-------------|
| Color Palette | `553:14956` | Paleta base + Token System |
| Typography | `553:14957` | Escala tipográfica completa |
| Icons | `41:136` | Librería de iconos |
| Grid System | `553:14958` | Sistema de grillas |
| Shadows | `553:14959` | Sombras y efectos |
| Motions & Animations | `553:14960` | Animaciones |
| Corner Radius | `553:14961` | Radios de borde |

### 🧩 Assets
| Página | ID |
|--------|----|
| Brand | `2771:1469` |
| Placeholder | `172:5573` |
| Country Flags | `2771:1471` |
| Emojies | `2771:1472` |
| Appstore Badges | `2771:1470` |
| Thumbnails | `193450:30395` |
| Others | `2771:1473` |

### 🔘 Base Components
| Componente | ID | Notas |
|------------|----|-------|
| Alert, Notification & Toast | `169:2358` | |
| Accordion | `210:4006` | |
| Activity Feed | `164611:26451` | |
| Avatar | `210:4129` | |
| Badge | `119:2863` | |
| Banner | `224:2224` | |
| Breadcrumbs | `447:8760` | |
| **Button** | `129:605` | Variantes: Default, Link, Social, Fancy, Compact |
| Button Group | `225:2363` | |
| Checkbox | `227:1986` | |
| Color Picker | `553:22078` | |
| Content Divider | `414:4397` | |
| Command Menu | `4152:24764` | |
| Date Picker | `435:8548` | |
| Drawer | `486:7366` | |
| Dropdown | `166999:140904` | |
| File Upload | `450:9364` | |
| Filter | `3880:66172` | |
| Key Components | `263:1844` | |
| **Modal** | `466:4630` | |
| Notification Feed | `4096:21398` | |
| Pagination | `486:8465` | |
| Progress Bar | `450:17758` | |
| Popover | `553:22099` | |
| Radio | `515:3884` | |
| Rating | `532:4130` | |
| Rich Editor | `164611:20259` | |
| Scroll | `165475:768` | |
| **Select** | `270:1084` | |
| Slider | `2604:3416` | |
| Step Indicator | `479:14388` | Onboarding |
| **Tab Menu** | `553:734` | |
| **Table** | `553:14955` | |
| Tag | `417:12348` | |
| Text Area | `434:6100` | |
| **Text Input** | `266:5230` | |
| Time Picker | `164611:83414` | |
| Switch | `379:6649` | |
| Segmented Control | `553:14953` | |
| Tooltip | `553:14954` | |

### 📦 Product Components
| Componente | ID |
|------------|----|
| **Navigation** | `3789:4743` |
| **Page Headers** | `3829:27858` |
| **Widgets** | `2950:5881` |
| **Empty States** | `3860:4301` |

### 🏭 Sector Products (relevantes para Eventus)
| Sector | ID | Componentes |
|--------|----|-------------|
| Finance & Banking | `3911:35677` | Presupuesto, gráficas, tablas financieras |
| Marketing & Sales | `6696:81119` | CRM-like views, pipelines |

---

## SISTEMA DE COLOR

### Estructura de tokens
AlignUI usa un sistema de tokens en 2 capas:

**Capa 1 — Primitive Colors (Paleta base)**
- Neutral/Gray, Neutral/Dark
- Blue, Orange, Red, Green, Yellow, Purple, Sky, Pink, Teal
- Alpha Colors

**Capa 2 — Semantic Tokens (los que se usan en componentes)**
| Token | Descripción |
|-------|-------------|
| `Primary` | Color de acción principal |
| `Background` | Fondos de página y contenedores |
| `Text` | Jerarquía de textos |
| `Stroke` | Bordes y separadores |
| `Icon` | Color de iconos |
| `Data` | Gráficas y visualizaciones |
| `Feature/Teal` | Color de acento feature |
| `Alternative/Info` | Información |
| `Warning/Error` | Errores y advertencias |
| `Success` | Estados exitosos |
| `Swap` | Color de intercambio |

### Customización para Eventus
Cambios a realizar en los tokens:

| Token AlignUI | Valor Eventus |
|--------------|---------------|
| `Primary/Default` | `#BCEE95` (Verde Menta) |
| `Primary/Dark` | `#0B334C` (Navy) |
| `Background/Default` | `#FFFFFF` |
| `Background/Subtle` | `#EEF2F5` |
| `Text/Strong` | `#0B334C` (Navy) |
| `Success/Default` | `#4CAF7D` |
| `Warning/Default` | `#F5A623` |
| `Error/Default` | `#E85353` |

---

## TIPOGRAFÍA

### Fuente actual en AlignUI
- Familia por defecto: **Inter** (o sistema genérico)
- Estructura: Title, Label, Paragraph, Subheading, Footnote

### Cambio para Eventus
- Fuente objetivo: **Poppins**
- Estilos requeridos: Bold, SemiBold, Medium, Regular, Light

### Escala tipográfica observada
| Estilo | Uso |
|--------|-----|
| Display XL/LG | Headings de página principales |
| Title | Títulos de sección |
| Heading | Sub-secciones |
| Label | Etiquetas de UI |
| Paragraph | Cuerpo de texto |
| Subheading | Texto secundario |
| Footnote | Captions y notas |

---

## COMPONENTES CRÍTICOS PARA EVENTUS

### Button
- **Variantes:** Default, Link, Social, Fancy, Compact
- **Tamaños:** XS, SM, MD, LG, XL
- **Estados:** Default, Hover, Active, Disabled, Loading
- **Tipos en Default:** Primary, Secondary, Ghost, Stroke, Destructive
- **Tiene iconos:** Sí (left icon, right icon, icon-only)

### Text Input
- **Estados:** Default, Focus, Filled, Error, Disabled, Read-only
- **Variantes:** Con label, sin label, con helper text, con prefix/suffix
- **Tamaños:** SM, MD, LG

### Tab Menu
- **Orientaciones:** Horizontal, Vertical
- **Estilos:** Underline, Pill, Boxed
- **Con/sin badges e iconos**

### Table
- **Filas:** Default, Hover, Selected, Expandable
- **Headers:** Sortable, filterable
- **Con checkboxes, acciones, paginación**

### Modal
- **Tamaños:** SM, MD, LG, XL, Full
- **Con/sin header, footer, scroll interno**

### Navigation (Product)
- **Sidebar vertical** con collapso
- **Top navigation** horizontal
- **Mobile navigation**

### Step Indicator
- **Horizontal y vertical**
- **Estados:** Pending, Active, Completed, Error
- **Perfecto para el Onboarding de Eventus**

### Widgets
- **Stat cards** con métricas y cambio porcentual
- **Progress widgets**
- **Chart placeholders**
- **Listas de actividad**

---

## CÓMO TRABAJAR CON ESTE DS

### Para leer componentes
```
search_design_system → buscar por nombre de componente
```

### Para instanciar
```js
// Buscar componente por nombre
const comp = await figma.importComponentByKeyAsync(KEY);
const instance = comp.createInstance();
```

### Convención de nombres en AlignUI
- Componentes: `ComponentName/Variant/Size`
- Ejemplo: `Button/Default/MD`
- Estados se manejan con **component properties** (no capas separadas)
- Dark mode usa **variable modes**

### Proceso de customización Eventus
1. Cambiar variables de color Primary → Eventus Navy/Mint
2. Cambiar text styles de Inter → Poppins
3. Ajustar Corner Radius si es necesario
4. Publicar como librería → conectar a PVI - Eventus

---

## COMPONENTES PRIORITARIOS PARA EVENTUS

### Onboarding
- Step Indicator ✅
- Button (Primary, Secondary) ✅
- Text Input ✅
- Select ✅
- Checkbox ✅
- Radio ✅

### Dashboard Organizador
- Navigation (Sidebar) ✅
- Page Headers ✅
- Widgets (Stat cards) ✅
- Table ✅
- Tab Menu ✅
- Badge ✅
- Modal ✅
- Empty States ✅
- Progress Bar ✅
- Avatar ✅
- Breadcrumbs ✅

### Dashboard Proveedor
- Navigation (Sidebar) ✅
- Widgets ✅
- Badge ✅
- Progress Bar (niveles/tiers) ✅
- Table ✅
- Step Indicator (progreso de tier) ✅
- Rating ✅
- Avatar ✅

---

## NOTAS IMPORTANTES

- AlignUI tiene **Dark Mode** nativo via Variable Modes — Eventus usará solo Light Mode por ahora
- Los componentes usan **Auto-layout** en todos los niveles
- Las propiedades de componente usan **Boolean, Instance Swap y Text** properties
- Los tokens de color están en variables anidadas — cambiar el token primario actualiza TODO automáticamente
- Antes de customizar: siempre verificar que los tokens estén correctamente mapeados entre capas

---

**Documento creado:** 2026-06-28

---

## ESTADO DE CUSTOMIZACIÓN EVENTUS ✅

**Completado el:** 2026-06-28

| Tarea | Estado | Detalle |
|-------|--------|---------|
| Modo "🌿 Eventus" en `03-Theme` | ✅ | 13 variables: Navy (#0B334C) como dark, Mint (#BCEE95) como base/CTA |
| Colores primitivos en `06-Foundations` | ✅ | 15 vars: Navy-500~900, Mint-100~500, Gray-100~900 |
| Tipografía → Poppins | ✅ | 30 text styles actualizados. DM Mono intacto. |
| Modo Eventus aplicado a componentes | ✅ | 167 frames en 15 páginas clave |

### ID del modo Eventus (para scripts futuros)
- Modo: `201679:0`
- Colección `03-Theme`: `VariableCollectionId:113:54`
- Aplicar en código: `node.setExplicitVariableModeForCollection(themeCol, '201679:0')`

### Próximos pasos
1. **Publicar librería** (manual): Menú principal → Libraries → Publish
2. **Conectar a PVI - Eventus** (manual): Resources panel → Add Library
3. **Fase 1 — Diseñar Onboarding** (9 pantallas)
