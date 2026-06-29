# FLUJO HÍBRIDO — HTML → Figma para Eventus

**Creado:** 2026-06-28  
**Por qué existe este flujo:** El Figma Plugin API es lento para iterar visualmente (cada cambio = código → screenshot → corrección). El HTML/CSS permite ver resultados en segundos. El flujo híbrido combina la velocidad del HTML con la fidelidad del Figma final.

---

## Cuándo usar este flujo

| Situación | Enfoque |
|-----------|---------|
| Pantalla nueva con muchos elementos | ✅ HTML primero → validar look → Figma |
| Ajuste menor a pantalla existente en Figma | ❌ Directo en Figma |
| Iteración rápida de layout / jerarquía | ✅ HTML primero |
| Necesitas handoff de código | ❌ Directo en Figma con componentes AlignUI |
| Pantalla simple (1–2 componentes) | ❌ Directo en Figma |

---

## Pasos del flujo

### 1. Crear el HTML mockup
- Carpeta: `C:\Users\kevin\OneDrive\Documentos\Claude Code\eventus\screens\`
- Naming: `s{N}-{slug}.html` (ej: `s2-crear-cuenta-organizador.html`)
- El HTML debe usar los tokens exactos de Eventus (ver sección Tokens abajo)
- No usar librerías externas (salvo Google Fonts para Poppins)
- Abrir en Chrome y validar antes de pasar a Figma

### 2. Aprobar el look en HTML
- Abrir el archivo en Chrome (o en VS Code con Live Preview)
- Verificar: jerarquía visual, espaciado, colores, tipografía
- Si hay cambios → editar el HTML directamente (segundos, sin fricción)
- Una vez aprobado → pasar al paso 3

### 3. Construir la pantalla en Figma
- Usar el HTML como referencia visual (no como importación directa — ver nota abajo)
- Implementar con **componentes AlignUI reales** (Button, Text Input, Badge, etc.)
- Aplicar **text styles de la librería** (no tamaños manuales)
- Usar **spacing variables de la librería** (colección 05-Spacing, no números sueltos)
- Aplicar **Modo Eventus** al frame (`201679:0`)
- Seguir las reglas globales de diseño (ver PROGRESO.md)

### 4. Screenshot y validación final
- `get_screenshot` del frame en Figma
- Comparar contra el HTML: ¿se mantiene la jerarquía y el look?
- Verificar que todos los textos tienen text style, todos los gaps tienen variable

---

## ⚠️ Por qué NO importar el HTML directamente a Figma

Los importadores (html.to.design, Anima, etc.) generan rectángulos y texto planos — **no** instancias de la librería AlignUI, **no** variables de spacing, **no** text styles aplicados. Importar el HTML destruye exactamente lo que hace valioso el archivo Figma (componentes reales, tokens, handoff a devs). El HTML es solo una **referencia visual**, nunca el input directo.

---

## TOKENS EVENTUS (para el HTML)

Copiar estos valores directamente en el `:root {}` de cada pantalla HTML.

```css
:root {
  --navy:          #0B334C;
  --navy-dark:     #0A2A3D;
  --navy-mid:      #134E74;
  --mint:          #BCEE95;
  --mint-50:       #F0FAE6;
  --mint-100:      #DEF3C8;
  --white:         #FFFFFF;
  --off-white:     #F4F7F9;
  --gray-50:       #F8FAFC;
  --gray-100:      #EEF2F5;
  --gray-200:      #E2E8EE;
  --gray-300:      #C9D4DC;
  --gray-400:      #9AAAB8;
  --gray-500:      #6B7D8E;
  --gray-700:      #3D5168;
  --text-strong:   #0B334C;
  --text-body:     #3D5168;
  --text-muted:    #6B7D8E;
  --text-subtle:   #9AAAB8;
  --radius-4:      4px;
  --radius-8:      8px;
  --radius-12:     12px;
  --radius-16:     16px;
  --radius-full:   9999px;
}
```

---

## TIPOGRAFÍA EN HTML

```css
/* Google Fonts en <head> */
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

/* Equivalencias HTML → Figma (text styles AlignUI) */
/* Title/H3  = 40px SemiBold -0.5px LS   → key: 3d2cbac5... */
/* Title/H4  = 32px SemiBold -0.3px LS   → key: 373c27bd... */
/* Title/H6  = 20px SemiBold              → key: 9075c662... */
/* Subhead/XS= 12px Medium 0.12em LS UC  → key: c11706e4... */
/* Para/Med  = 16px Regular 1.6 LH        → key: 11a9dfa9... */
/* Para/Sm   = 14px Regular               → key: a4811239... */
/* Para/Comp = 13px Regular               → key: 29df9e1e... */
/* Label/Comp= 13px SemiBold              → key: 2ca49f19... */
/* Para/XSm  = 12px Regular               → key: 1040b733... */
```

---

## PATRÓN HERO NAVY (código reutilizable)

El hero navy es la firma visual de Eventus. Aparece en TODAS las pantallas de onboarding. Copiar y pegar entre pantallas HTML:

```css
.hero {
  position: relative;
  width: 100%;
  height: 280px; /* ajustar según contenido del hero */
  background: linear-gradient(135deg, #0B334C 0%, #0A2A3D 100%);
  overflow: hidden;
}

/* Grid pattern sutil */
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Glow mint */
.hero::after {
  content: '';
  position: absolute;
  width: 500px; height: 500px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(188,238,149,0.18) 0%, transparent 70%);
  top: -200px; right: -100px;
}
```

---

## REGLAS DE DISEÑO EN HTML (espejo de las reglas Figma)

1. **Mínimo 900px de alto** (viewport mínimo para onboarding). Si hay scroll, el body puede ser más alto.
2. **Sin box-shadows manuales** en cards ni botones. Solo las que vienen del componente (en Figma). En HTML: si se necesita profundidad, usar borde + fondo tintado.
3. **Centrado respecto a la página** — usar `margin: 0 auto` con `max-width` fijo, nunca `text-align: left` dentro de un sub-área que no es el ancho total.
4. **Textos con `height: auto`** — nunca `height: Xpx` en elementos de texto.
5. **Card overlapping hero**: la card principal debe tener `margin-top: -48px` y `position: relative; z-index: 20` para crear el efecto de solapamiento premium (jerarquía sin sombra).

---

## PANTALLAS EN ESTE FLUJO

| # | Pantalla | HTML | Estado Figma |
|---|----------|------|--------------|
| S1 | ¿Cómo quieres usar Eventus? | — (construida directamente en Figma) | ✅ HiFi |
| S2 | Crear cuenta · Organizador | `s2-crear-cuenta-organizador.html` | ⏳ Pendiente |
| S3 | Crear cuenta · Proveedor | — | ⏳ Pendiente |
| S4 | Iniciar sesión | — | ⏳ Pendiente |
| S5 | ¿Qué tipo de organizador eres? | — | ⏳ Pendiente |
| S6 | ¿Qué tipos de eventos organizas? | — | ⏳ Pendiente |
| S7 | ¿Cuál es tu ubicación principal? | — | ⏳ Pendiente |
| S8 | ¿Cuál es tu rango de presupuesto? | — | ⏳ Pendiente |
| S9 | ¿Qué servicios sueles necesitar? | — | ⏳ Pendiente |

---

## DESDE VS CODE

Si estás trabajando desde la extensión de Claude Code en VS Code:

1. Abrir `screens/s2-crear-cuenta-organizador.html` en VS Code
2. Usar **Live Server** (extensión recomendada) para ver el resultado en Chrome
3. Editar el HTML — se recarga automáticamente
4. Una vez aprobado el look, continuar la conversación con Claude Code para construir la pantalla en Figma

**Extensiones recomendadas para VS Code en este proyecto:**
- Live Server (por Ritwick Dey)
- Figma for VS Code (para handoff)
- Tailwind CSS IntelliSense (si se migra a Tailwind en el futuro)
