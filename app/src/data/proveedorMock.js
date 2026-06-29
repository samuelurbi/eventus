import { Utensils, Briefcase, Cake, Wine, Pizza, Coffee } from 'lucide-react'

// Proveedor usa euros (coherente con el Figma de proveedor)
export const EUR = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
export const EUR2 = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 })

export const PROVEEDOR = {
  nombre: 'Catering Deluxe',
  rol: 'Proveedor',
  iniciales: 'CD',
  categoria: 'Catering',
  email: 'hola@cateringdeluxe.com',
  telefono: '+34 612 345 678',
  ubicacion: 'Barcelona, España',
  rating: 4.8,
  reviews: 23,
  plan: 'Profesional',
  verificado: true,
}

// KPIs del dashboard
export const PROV_KPIS = {
  solicitudesPendientes: 8,
  conversacionesActivas: 12,
  conversacionesSinLeer: 3,
  presupuestosEnviados: 5,
}

// Gamificación — nivel actual + logros + metas
export const PROV_NIVEL = {
  nombre: 'Plata',
  nivel: 2,
  totalNiveles: 5,
  cerrados: 12,
  meta: 20,
  logros: [
    { label: 'Respuesta rápida', estado: 'Activo', activo: true },
    { label: 'Perfil verificado', estado: 'Activo', activo: true },
    { label: '5+ valoraciones', estado: '4.8/5', activo: true },
  ],
}
export const PROV_METAS = [
  { titulo: 'Nivel Oro', desc: 'Mayor visibilidad + Badge destacado', extra: '8 restantes', pct: 60 },
  { titulo: 'Respuesta en 24h', desc: 'Badge de respuesta rápida', extra: '2h actual', pct: 90 },
  { titulo: 'Perfil Completo', desc: 'Aparecer en búsquedas destacadas', extra: '80%', pct: 80 },
]
export const PROV_STATS = [
  { label: 'Negocios Cerrados', value: '12', sub: '+3 este mes', up: true },
  { label: 'Tasa de Conversión', value: '68%', sub: '+5% vs mes anterior', up: true },
  { label: 'Valoración Media', value: '4.8', sub: 'Basado en 23 reseñas', up: true },
]

// Solicitudes recibidas (oportunidades)
// estado: 'Nueva' | 'Respondida' | 'En negociación'
export const SOLICITUDES = [
  { id: 1, evento: 'Boda en Barcelona', tipo: 'Boda',        organizador: 'Ana García',      avatar: 'AG', fecha: '15 Jun 2025', hace: 'Hace 2 horas', ubicacion: 'Barcelona', personas: 120, estado: 'Nueva' },
  { id: 2, evento: 'Evento Corporativo', tipo: 'Corporativo', organizador: 'Tech Solutions SL', avatar: 'TS', fecha: '22 May 2025', hace: 'Hace 5 horas', ubicacion: 'Madrid',    personas: 80,  estado: 'Nueva' },
  { id: 3, evento: 'Cumpleaños Infantil', tipo: 'Fiesta',     organizador: 'Laura Martínez',  avatar: 'LM', fecha: '10 May 2025', hace: 'Hace 1 día',   ubicacion: 'Valencia',  personas: 30,  estado: 'Respondida' },
  { id: 4, evento: 'Fiesta de Graduación', tipo: 'Fiesta',    organizador: 'Carlos Ruiz',     avatar: 'CR', fecha: '28 Jun 2025', hace: 'Hace 1 día',   ubicacion: 'Sevilla',   personas: 50,  estado: 'Nueva' },
  { id: 5, evento: 'Conferencia Tech', tipo: 'Corporativo',   organizador: 'Innovation Hub',  avatar: 'IH', fecha: '05 Jul 2025', hace: 'Hace 2 días',  ubicacion: 'Madrid',    personas: 200, estado: 'En negociación' },
  { id: 6, evento: 'Aniversario Empresa', tipo: 'Corporativo', organizador: 'Global Corp',    avatar: 'GC', fecha: '18 May 2025', hace: 'Hace 2 días',  ubicacion: 'Bilbao',    personas: 150, estado: 'Nueva' },
  { id: 7, evento: 'Comunión', tipo: 'Fiesta',                organizador: 'María López',     avatar: 'ML', fecha: '25 May 2025', hace: 'Hace 3 días',  ubicacion: 'Granada',   personas: 60,  estado: 'Respondida' },
  { id: 8, evento: 'Lanzamiento Producto', tipo: 'Corporativo', organizador: 'StartupX',      avatar: 'SX', fecha: '12 Jun 2025', hace: 'Hace 4 días',  ubicacion: 'Barcelona', personas: 100, estado: 'Nueva' },
]
export const SOLICITUD_TONE = { 'Nueva': 'mint', 'Respondida': 'gray', 'En negociación': 'amber' }

// Presupuestos enviados — estado: 'Enviado' | 'Aceptado' | 'Rechazado' | 'Borrador'
export const PRESUPUESTOS = [
  { id: 1, evento: 'Cumpleaños Infantil', cliente: 'Laura Martínez', fecha: '11 May 2025', total: 1400, estado: 'Aceptado', items: 3 },
  { id: 2, evento: 'Comunión', cliente: 'María López', fecha: '25 May 2025', total: 2800, estado: 'Enviado', items: 4 },
  { id: 3, evento: 'Conferencia Tech', cliente: 'Innovation Hub', fecha: '06 Jul 2025', total: 6000, estado: 'En negociación', items: 5 },
  { id: 4, evento: 'Aniversario Empresa', cliente: 'Global Corp', fecha: '19 May 2025', total: 4000, estado: 'Rechazado', items: 4 },
  { id: 5, evento: 'Boda Laura & Miguel', cliente: 'Laura Pérez', fecha: '20 Feb 2025', total: 5600, estado: 'Aceptado', items: 6 },
]
export const PRESUPUESTO_TONE = { 'Enviado': 'navy', 'Aceptado': 'green', 'Rechazado': 'red', 'En negociación': 'amber', 'Borrador': 'gray' }

// Catálogo de servicios — estado: 'Activo' | 'Inactivo'
export const PROV_SERVICIOS = [
  { id: 1, nombre: 'Catering Bodas Premium', desc: 'Menú completo y servicio', Icon: Utensils, precio: 45, estado: 'Activo', solicitudes: 24 },
  { id: 2, nombre: 'Eventos Corporativos', desc: 'Coffee breaks y comidas', Icon: Briefcase, precio: 30, estado: 'Activo', solicitudes: 18 },
  { id: 3, nombre: 'Celebraciones Familiares', desc: 'Cumpleaños y aniversarios', Icon: Cake, precio: 35, estado: 'Activo', solicitudes: 12 },
  { id: 4, nombre: 'Cocktail y Aperitivos', desc: 'Servicio de barra', Icon: Wine, precio: 25, estado: 'Inactivo', solicitudes: 8 },
  { id: 5, nombre: 'Buffet Informal', desc: 'Comida casual', Icon: Pizza, precio: 20, estado: 'Activo', solicitudes: 15 },
  { id: 6, nombre: 'Coffee Break', desc: 'Desayunos y meriendas', Icon: Coffee, precio: 12, estado: 'Activo', solicitudes: 22 },
]
export const PROV_SERVICIOS_STATS = { total: 6, activos: 5, inactivos: 1, solicitudesTotales: 99, masSolicitado: 'Catering Bodas', precioPromedio: 28 }

// Documentos legales — estado: 'Aprobado' | 'Pendiente'
export const PROV_DOCUMENTOS = [
  { id: 1, nombre: 'CIF-Empresa.pdf', tam: '2.4 MB', tipo: 'CIF / NIF', fecha: '15 Ene 2025', hora: '10:30', estado: 'Aprobado', validez: 'Permanente' },
  { id: 2, nombre: 'Seguro-Responsabilidad.pdf', tam: '3.1 MB', tipo: 'Seguro RC', fecha: '18 Ene 2025', hora: '14:15', estado: 'Pendiente', validez: '31 Dic 2025' },
  { id: 3, nombre: 'Certificado-Higiene.pdf', tam: '1.8 MB', tipo: 'Certificado Sanitario', fecha: '12 Ene 2025', hora: '09:45', estado: 'Aprobado', validez: '30 Jun 2025' },
  { id: 4, nombre: 'Licencia-Actividad.pdf', tam: '2.9 MB', tipo: 'Licencia Municipal', fecha: '20 Ene 2025', hora: '11:20', estado: 'Pendiente', validez: 'Permanente' },
  { id: 5, nombre: 'Cuenta-Bancaria.pdf', tam: '1.2 MB', tipo: 'Datos Bancarios', fecha: '10 Ene 2025', hora: '16:00', estado: 'Aprobado', validez: 'Permanente' },
  { id: 6, nombre: 'Contrato-Trabajadores.pdf', tam: '4.5 MB', tipo: 'Documentación Laboral', fecha: '22 Ene 2025', hora: '13:50', estado: 'Pendiente', validez: '31 Dic 2025' },
  { id: 7, nombre: 'Registro-Mercantil.pdf', tam: '3.7 MB', tipo: 'Registro Mercantil', fecha: '08 Ene 2025', hora: '15:30', estado: 'Aprobado', validez: 'Permanente' },
  { id: 8, nombre: 'Certificado-Alergenos.pdf', tam: '2.1 MB', tipo: 'Control Alérgenos', fecha: '14 Ene 2025', hora: '12:10', estado: 'Aprobado', validez: '30 Jun 2025' },
]

// Historial de eventos cerrados
export const HISTORIAL = [
  { id: 1, evento: 'Boda Ana & Carlos', ciudad: 'Barcelona', cliente: 'Ana García', email: 'ana@email.com', avatar: 'AG', fecha: '15 Jun 2025', tipo: 'Boda', personas: 120, ingreso: 4800 },
  { id: 2, evento: 'Evento Corporativo Tech', ciudad: 'Madrid', cliente: 'Tech Solutions SL', email: 'info@techsol.com', avatar: 'TS', fecha: '28 May 2025', tipo: 'Corporativo', personas: 80, ingreso: 3200 },
  { id: 3, evento: 'Cumpleaños Infantil', ciudad: 'Valencia', cliente: 'Laura Martínez', email: 'laura@email.com', avatar: 'LM', fecha: '12 May 2025', tipo: 'Cumpleaños', personas: 35, ingreso: 1400 },
  { id: 4, evento: 'Fiesta de Graduación', ciudad: 'Sevilla', cliente: 'Carlos Ruiz', email: 'carlos@email.com', avatar: 'CR', fecha: '20 Abr 2025', tipo: 'Graduación', personas: 60, ingreso: 2400 },
  { id: 5, evento: 'Conferencia Tech', ciudad: 'Bilbao', cliente: 'Innovation Hub', email: 'hub@innov.com', avatar: 'IH', fecha: '05 Abr 2025', tipo: 'Conferencia', personas: 150, ingreso: 6000 },
  { id: 6, evento: 'Aniversario Empresa', ciudad: 'Zaragoza', cliente: 'Global Corp', email: 'contact@global.com', avatar: 'GC', fecha: '18 Mar 2025', tipo: 'Corporativo', personas: 100, ingreso: 4000 },
  { id: 7, evento: 'Comunión María', ciudad: 'Málaga', cliente: 'María López', email: 'maria@email.com', avatar: 'ML', fecha: '10 Mar 2025', tipo: 'Comunión', personas: 70, ingreso: 2800 },
  { id: 8, evento: 'Boda Laura & Miguel', ciudad: 'Granada', cliente: 'Laura Pérez', email: 'laura.p@email.com', avatar: 'LP', fecha: '22 Feb 2025', tipo: 'Boda', personas: 140, ingreso: 5600 },
]
export const HISTORIAL_STATS = { cerrados: 47, ingresos: 142750, promedio: 3037 }

// Conversaciones (lado proveedor) — reutiliza ChatBubble
export const PROV_CONVERSACIONES = [
  {
    id: 1, de: 'Ana García', avatar: 'AG', evento: 'Boda en Barcelona', estado: 'En negociación', hora: '10:45', noLeidos: 2,
    ultimo: '¿Podríais enviarme el menú completo?',
    mensajes: [
      { mio: false, texto: 'Hola, estoy interesada en contratar vuestro servicio de catering para mi boda el 15 de junio. Seremos aproximadamente 120 personas.', hora: '09:15' },
      { mio: true, texto: '¡Hola Ana! Muchas gracias por contactarnos. Estaremos encantados de ayudarte con tu boda. ¿Tienes alguna preferencia específica en cuanto al tipo de menú?', hora: '09:18' },
      { mio: false, texto: 'Nos gustaría un menú mediterráneo con opciones vegetarianas. También necesitamos servicio de barra libre.', hora: '09:22' },
      { mio: true, texto: 'Perfecto, tenemos varias opciones que se ajustan a lo que buscas. Te preparo un presupuesto detallado.', hora: '09:25' },
      { tipo: 'presupuesto', mio: true, estado: 'pendiente', concepto: 'Catering Boda — 120 pax', hora: '10:40',
        items: [{ label: 'Menú mediterráneo', monto: 4200 }, { label: 'Barra libre 5h', monto: 1400 }, { label: 'Personal de servicio', monto: 800 }], total: 6400 },
      { mio: false, texto: '¿Podríais enviarme el menú completo?', hora: '10:45' },
    ],
  },
  {
    id: 2, de: 'Tech Solutions SL', avatar: 'TS', evento: 'Evento Corporativo', estado: 'Aceptado', hora: 'Ayer', noLeidos: 0,
    ultimo: 'Perfecto, nos encanta la propuesta.',
    mensajes: [
      { mio: false, texto: 'Buenas, necesitamos catering para un evento corporativo de 80 personas.', hora: 'Ayer 11:00' },
      { tipo: 'presupuesto', mio: true, estado: 'aceptado', concepto: 'Coffee break + comida (80 pax)', hora: 'Ayer 11:30',
        items: [{ label: 'Coffee break', monto: 800 }, { label: 'Comida ejecutiva', monto: 2400 }], total: 3200 },
      { mio: false, texto: 'Perfecto, nos encanta la propuesta.', hora: 'Ayer 12:15' },
    ],
  },
  {
    id: 3, de: 'Laura Martínez', avatar: 'LM', evento: 'Cumpleaños Infantil', estado: 'Aceptado', hora: 'Ayer', noLeidos: 0,
    ultimo: 'Gracias por la información',
    mensajes: [
      { mio: false, texto: 'Hola, ¿hacéis cumpleaños infantiles?', hora: 'Ayer 10:00' },
      { mio: true, texto: '¡Claro! Tenemos menús especiales para niños. Te envío el presupuesto.', hora: 'Ayer 10:20' },
      { mio: false, texto: 'Gracias por la información', hora: 'Ayer 10:45' },
    ],
  },
  {
    id: 4, de: 'Carlos Ruiz', avatar: 'CR', evento: 'Fiesta de Graduación', estado: 'En negociación', hora: '2 días', noLeidos: 1,
    ultimo: '¿Cuál sería el precio final?',
    mensajes: [
      { mio: false, texto: 'Hola, organizo una fiesta de graduación para 50 personas.', hora: 'lun 16:00' },
      { mio: true, texto: 'Genial, tenemos varias opciones de buffet. ¿Qué presupuesto manejas?', hora: 'lun 16:30' },
      { mio: false, texto: '¿Cuál sería el precio final?', hora: 'lun 17:00' },
    ],
  },
  {
    id: 5, de: 'Innovation Hub', avatar: 'IH', evento: 'Conferencia Tech', estado: 'En negociación', hora: '3 días', noLeidos: 0,
    ultimo: 'Confirmado para el 5 de julio',
    mensajes: [
      { mio: false, texto: 'Necesitamos catering para una conferencia de 200 personas el 5 de julio.', hora: 'sáb 09:00' },
      { mio: true, texto: 'Perfecto, podemos cubrirlo. Te preparo una propuesta.', hora: 'sáb 09:30' },
      { mio: false, texto: 'Confirmado para el 5 de julio', hora: 'sáb 10:00' },
    ],
  },
]

// Planes de suscripción
export const PROV_PLANES = [
  { id: 'basico', nombre: 'Básico', precio: 0, claim: 'Ideal para empezar', actual: true,
    features: ['Perfil público básico', 'Hasta 5 solicitudes al mes', 'Chat con organizadores', 'Gestión de presupuestos', 'Soporte por email'] },
  { id: 'profesional', nombre: 'Profesional', precio: 49, claim: 'Para crecer tu negocio', destacado: true,
    features: ['Solicitudes ilimitadas', 'Perfil destacado en búsquedas', 'Badge "Proveedor Verificado"', 'Galería de hasta 20 imágenes', 'Estadísticas avanzadas', 'Soporte prioritario', 'Acceso a promociones exclusivas'] },
  { id: 'premium', nombre: 'Premium', precio: 99, claim: 'Máxima visibilidad',
    features: ['Posición destacada en resultados', 'Badge "Top Provider"', 'Galería ilimitada + vídeos', 'Aparición en newsletter mensual', 'Análisis de competencia', 'Gestor de cuenta dedicado', 'Soporte telefónico 24/7'] },
]
export const PROV_PLANES_COMPARATIVA = [
  { f: 'Solicitudes mensuales', basico: '5', profesional: 'Ilimitadas', premium: 'Ilimitadas' },
  { f: 'Imágenes en galería', basico: '5', profesional: '20', premium: 'Ilimitadas' },
  { f: 'Vídeos en perfil', basico: false, profesional: false, premium: true },
  { f: 'Badge verificado', basico: false, profesional: true, premium: true },
  { f: 'Posición destacada', basico: false, profesional: true, premium: true },
  { f: 'Estadísticas avanzadas', basico: false, profesional: true, premium: true },
  { f: 'Gestor de cuenta dedicado', basico: false, profesional: false, premium: true },
  { f: 'Soporte prioritario', basico: 'Email', profesional: 'Chat + Email', premium: '24/7 Teléfono' },
  { f: 'Newsletter mensual', basico: false, profesional: false, premium: true },
  { f: 'Análisis de competencia', basico: false, profesional: false, premium: true },
]
export const PROV_PLANES_FAQ = [
  { q: '¿Puedo cambiar de plan en cualquier momento?', a: 'Sí, puedes actualizar o degradar tu plan cuando lo desees. Los cambios se aplican al inicio del siguiente ciclo de facturación.' },
  { q: '¿Qué métodos de pago aceptan?', a: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, American Express) y transferencia bancaria para planes anuales.' },
  { q: '¿Hay descuentos por pago anual?', a: 'Sí, obtienes 2 meses gratis al contratar cualquier plan de forma anual. Contacta con nuestro equipo para más información.' },
  { q: '¿Puedo cancelar mi suscripción?', a: 'Puedes cancelar tu suscripción en cualquier momento. Seguirás teniendo acceso hasta el final del período pagado.' },
]
