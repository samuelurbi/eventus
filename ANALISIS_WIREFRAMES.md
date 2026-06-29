# EVENTUS - Análisis de Wireframes

## RESUMEN GENERAL

El proyecto cuenta con **3 flujos principales** organizados en sections de Figma:

1. **Onboarding** - 9 pantallas
2. **Dashboard Organizador** - 29+ pantallas  
3. **Dashboard Proveedor** - 10+ pantallas

Cada section contiene múltiples frames que representan las pantallas mínimas necesarias para cada flujo.

---

## 1. ONBOARDING (9 pantallas)

### Objetivo
Crear un perfil del usuario organizador mediante preguntas secuenciales que permitan personalizar la experiencia.

### Estructura

| # | Pantalla | Propósito | Componentes |
|---|----------|----------|-------------|
| 1 | ¿Cómo quieres que Eventus? | Pregunta inicial de bienvenida | Header + 2 opciones + botón continuar |
| 2 | ¿Para qué tipo de evento? | Seleccionar tipo de evento | Header + cuadrícula de opciones |
| 3 | ¿Cuál es tu rol en el evento? | Definir rol del usuario | Header + opciones de rol |
| 4 | ¿Cuál es el nombre del evento? | Input de texto | Header + input + validación |
| 5 | ¿Qué tipo de organizador eres? | Segmentación de organizador | Header + 3 opciones principales |
| 6 | ¿Cuál es tu experiencia? | Evaluar experiencia previa | Header + 3 niveles |
| 7 | ¿Cuál es tu presupuesto? | Input numérico | Header + input + moneda |
| 8 | ¿Cuál es la ubicación del presupuesto? | Selección geográfica | Header + selector de ubicación |
| 9 | ¿Qué servicios necesitas? | Selección múltiple de servicios | Header + grid de servicios seleccionables |

### Patrones observados

- **Flujo lineal**: Una pregunta por pantalla
- **Header consistente**: Logo + botón "Salir" en todas las pantallas
- **Botón CTA**: "Continuar" o similar al final
- **Validación**: Los inputs validados antes de pasar a siguiente
- **Progreso**: Indica paso actual (1/9, 2/9, etc.)
- **Navegación**: Botón atrás/adelante disponible

### Componentes principales

1. **Header** - Fijo en la parte superior con logo + opción de salir
2. **Título de pregunta** - Claro y directivo
3. **Área de contenido** - Cambias según el tipo (inputs, radios, checkboxes, selectores)
4. **Botón CTA** - "Continuar" destacado
5. **Indicador de progreso** - Número de paso

---

## 2. DASHBOARD ORGANIZADOR (29+ pantallas)

### Objetivo
Proporcionar a los organizadores un centro operativo completo para gestionar todos los aspectos de su evento.

### Secciones principales observadas

#### A. Dashboard Principal
- Vista general del evento
- Estado y progreso
- Acciones rápidas
- Información crítica en cards

#### B. Gestión de Eventos
- Listado de eventos
- Crear nuevo evento
- Editar evento
- Detalles del evento

#### C. Gestión de Proveedores
- Listado de proveedores
- Buscar/filtrar proveedores
- Comparar presupuestos
- Contactar proveedores
- Favoritos

#### D. Gestión de Presupuesto
- Resumen de gastos
- Tabla de costos
- Categorías de gasto
- Comparación presupuestado vs real
- Alertas de sobrecosto

#### E. Gestión de Documentos
- Listado de documentos
- Upload de archivos
- Compartir documentos
- Versiones

#### F. Chat/Mensajería
- Conversaciones con proveedores
- Historial de mensajes
- Notificaciones
- Buscar conversaciones

#### G. Configuración
- Perfil de usuario
- Preferencias
- Suscripción/plan
- Integraciones

### Patrones de diseño

- **Layout 2-columnas**: Sidebar + contenido principal
- **Sidebar fijo**: Navegación principal
- **Header**: Logo + usuario + notificaciones + busca
- **Cards**: Información en bloques discretos
- **Tablas**: Datos tabulares con acciones
- **Modales**: Diálogos y confirmaciones
- **Filtros**: Búsqueda y filtrado de información
- **Estados**: Activo, pendiente, completado, error

### Componentes clave

1. **Sidebar navegación** - Menu principal permanente
2. **Header superior** - Logo, búsqueda, usuario, notificaciones
3. **Cards de información** - Bloques de datos
4. **Tablas de datos** - Listados estructurados
5. **Tabs** - Cambio entre vistas
6. **Modales/Diálogos** - Acciones y confirmaciones
7. **Badges** - Estados y etiquetas
8. **Botones CTA** - Acciones principales

---

## 3. DASHBOARD PROVEEDOR (10+ pantallas)

### Objetivo
Permitir a los proveedores gestionar su presencia profesional, recibir solicitudes y negociar con organizadores.

### Secciones principales observadas

#### A. Dashboard Principal del Proveedor
- Resumen de oportunidades
- Solicitudes recibidas
- Estado de suscripción
- Nivel/tier actual
- Metas para desbloquear beneficios

#### B. Gestión de Solicitudes
- Listado de solicitudes nuevas
- Detalles de solicitud
- Envío de presupuestos
- Seguimiento de propuestas
- Aceptación/rechazo

#### C. Gestión de Presupuestos
- Mis presupuestos enviados
- Estado (pendiente, aceptado, rechazado)
- Comparación con competencia

#### D. Chat con Organizadores
- Conversaciones activas
- Historial
- Notificaciones de nuevos mensajes
- Archivos compartidos

#### E. Gestión de Perfil
- Información profesional
- Servicios ofrecidos
- Portafolio
- Certificaciones
- Reseñas

#### F. Planes y Suscripción
- Plan actual
- Beneficios por nivel
- Upgrade/downgrade
- Estadísticas de uso

#### G. Configuración
- Preferencias de notificaciones
- Integraciones
- Datos de pago
- Documentos legales

### Patrones de diseño

- **Layout similar al organizador**: Sidebar + contenido
- **Enfoque en oportunidades**: Destaca solicitudes y propuestas
- **Sistema de niveles**: Visual del tier/nivel actual
- **Progreso**: Metas hacia siguiente nivel
- **Notificaciones**: Destaca nuevas solicitudes
- **CTA clara**: "Enviar presupuesto", "Aceptar", etc.

### Componentes clave

1. **Tarjetas de oportunidad** - Solicitudes destacadas
2. **Indicador de nivel** - Sistema de tiers visual
3. **Tabla de solicitudes** - Listado de requests
4. **Tabla de presupuestos** - Props enviadas
5. **Chat widget** - Acceso rápido a conversaciones
6. **Perfil resumen** - Info profesional del proveedor
7. **Estadísticas** - Métricas de performance

---

## COMPONENTES COMUNES EN TODOS LOS DASHBOARDS

### 1. Navegación
- **Sidebar**: Navegación principal
- **Header**: Info del usuario + notificaciones
- **Breadcrumbs**: Ubicación actual

### 2. Estructuras de datos
- **Cards**: Bloques de información
- **Tablas**: Datos estructurados
- **Listas**: Items enumerados
- **Tabs**: Vistas alternativas
- **Modales**: Diálogos y formularios

### 3. Controles
- **Botones**: CTA principales
- **Inputs**: Texto, números, emails
- **Selects**: Dropdown de opciones
- **Checkboxes**: Selección múltiple
- **Radio buttons**: Selección única
- **Toggles**: Activar/desactivar

### 4. Información
- **Badges**: Etiquetas de estado
- **Icons**: Acciones y estados
- **Avatars**: Foto de usuario
- **Progress bars**: Avance
- **Tooltips**: Información adicional

### 5. Feedback
- **Alertas**: Mensajes importantes
- **Notificaciones**: Eventos nuevos
- **Confirmaciones**: Acciones destructivas
- **Loading**: Estados de carga
- **Estados vacíos**: Sin datos

---

## FLUJOS PRINCIPALES IDENTIFICADOS

### Organizador
1. **Crear evento** → Responder preguntas (Onboarding) → Dashboard
2. **Buscar proveedores** → Comparar → Contactar → Negociar
3. **Gestionar presupuesto** → Monitorear gastos → Alertas
4. **Seguimiento evento** → Documentos → Chat → Completar

### Proveedor
1. **Crear perfil** → Esperar solicitudes → Dashboard
2. **Recibir solicitud** → Revisar detalles → Enviar presupuesto
3. **Negociar** → Chat con organizador → Acepta/rechaza
4. **Gestionar suscripción** → Subir de tier → Más beneficios

---

## RESTRICCIONES DE DISEÑO IDENTIFICADAS

✅ **Mantener**:
- Estructura de 2 columnas (sidebar + contenido)
- Header consistente en todas las páginas
- Navegación lateral clara
- Flujo lineal en onboarding
- Acciones principales destacadas

❌ **No modificar**:
- Arquitectura de navegación
- Orden de pantallas en onboarding
- Flujos de usuario
- Jerarquía de información

---

## PRÓXIMOS PASOS

1. Definir Design System basado en branding
2. Crear componentes reutilizables
3. Aplicar tipografía, colores y espaciado
4. Diseñar pantallas del Onboarding
5. Diseñar Dashboard Organizador
6. Diseñar Dashboard Proveedor
7. Validar consistencia visual

---

**Análisis completado:** 2026-06-28
**Total de wireframes analizados:** 48+ pantallas
**Arquitectura validada:** ✅ Mantenida intacta
