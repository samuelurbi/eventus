export const USER = {
  nombre: 'Samuel Urbina',
  iniciales: 'SU',
  rol: 'Organizador',
}

export const SPARKLINES = {
  eventos:     [2, 2, 3, 2, 3, 3, 3],
  proveedores: [10, 12, 13, 14, 14, 15, 16],
  presupuesto: [0, 80, 180, 220, 280, 340, 358],
  mensajes:    [1, 0, 2, 1, 3, 2, 2],
}

export const EVENTOS = [
  {
    id: 1,
    nombre: 'Boda Martínez & López',
    fecha: '14 sep 2026',
    lugar: 'Hacienda San Juan, Sevilla',
    tipo: 'Boda',
    presupuesto: 280000,
    gastado: 196000,
    proveedores: 8,
    estado: 'En curso',
  },
  {
    id: 2,
    nombre: 'Convención Anual TechES',
    fecha: '22 oct 2026',
    lugar: 'Palacio de Congresos, Madrid',
    tipo: 'Corporativo',
    presupuesto: 750000,
    gastado: 120000,
    proveedores: 3,
    estado: 'Planificación',
  },
  {
    id: 3,
    nombre: 'XV Años Sofía Ramírez',
    fecha: '5 nov 2026',
    lugar: 'Salón Imperial, Valencia',
    tipo: 'Fiesta',
    presupuesto: 95000,
    gastado: 42000,
    proveedores: 5,
    estado: 'Planificación',
  },
]

export const PROVEEDORES_RECIENTES = [
  { id: 1, nombre: 'Estudio Lumière', categoria: 'Fotografía', estado: 'Contratado', avatar: 'EL' },
  { id: 2, nombre: 'Banquetes Díaz', categoria: 'Catering', estado: 'Cotización enviada', avatar: 'BD' },
  { id: 3, nombre: 'DJ Soundtrack', categoria: 'Música', estado: 'Pendiente', avatar: 'DS' },
  { id: 4, nombre: 'Flores & Arte', categoria: 'Decoración', estado: 'Contratado', avatar: 'FA' },
]

export const MENSAJES = [
  { id: 1, de: 'Estudio Lumière', tiempo: '10 min', preview: 'Adjunto el álbum de muestra que solicitaste.', leido: false },
  { id: 2, de: 'Banquetes Díaz', tiempo: '2 h', preview: 'La propuesta del menú ya está lista para revisión.', leido: false },
  { id: 3, de: 'Flores & Arte', tiempo: 'Ayer', preview: 'Confirmamos la instalación para las 8 am.', leido: true },
]

export const TAREAS = [
  { id: 1, texto: 'Confirmar menú con Banquetes Díaz', hecho: false, evento: 'Boda Martínez', fecha: '2 jul' },
  { id: 2, texto: 'Pagar anticipo DJ Soundtrack', hecho: false, evento: 'Boda Martínez', fecha: '5 jul' },
  { id: 3, texto: 'Enviar lista de invitados al salón', hecho: true, evento: 'Boda Martínez', fecha: '28 jun' },
  { id: 4, texto: 'Contratar transporte de invitados', hecho: false, evento: 'XV Años Sofía', fecha: '10 jul' },
]

export const ACTIVIDAD = [
  { id: 1, tipo: 'mensaje',    icon: 'msg',    texto: 'Estudio Lumière envió una propuesta de álbum', tiempo: '10 min' },
  { id: 2, tipo: 'proveedor',  icon: 'user',   texto: 'DJ Soundtrack confirmó disponibilidad para sep 14', tiempo: '1 h' },
  { id: 3, tipo: 'pago',       icon: 'wallet', texto: 'Anticipo de 25.000 € registrado — Boda Martínez', tiempo: '3 h' },
  { id: 4, tipo: 'evento',     icon: 'cal',    texto: 'Convención TechES añadida al calendario', tiempo: 'Ayer' },
  { id: 5, tipo: 'documento',  icon: 'file',   texto: 'Contrato de locación subido — Hacienda San Juan', tiempo: 'Ayer' },
]

// ── Proveedores (catálogo) ───────────────────────────────────────────────────
export const CATEGORIAS = ['Todos', 'Fotografía', 'Catering', 'Música', 'Decoración', 'Locación', 'Transporte']

export const PROVEEDORES = [
  { id: 1, nombre: 'Estudio Lumière',   categoria: 'Fotografía',  rating: 4.9, reviews: 128, desde: 18000, ubicacion: 'Madrid',        estado: 'Contratado', avatar: 'EL', destacado: true },
  { id: 2, nombre: 'Banquetes Díaz',    categoria: 'Catering',    rating: 4.7, reviews: 94,  desde: 350,   unidad: '/persona', ubicacion: 'Madrid', estado: 'Cotización', avatar: 'BD' },
  { id: 3, nombre: 'DJ Soundtrack',     categoria: 'Música',      rating: 4.8, reviews: 76,  desde: 12000, ubicacion: 'Valencia', estado: 'Pendiente',  avatar: 'DS' },
  { id: 4, nombre: 'Flores & Arte',     categoria: 'Decoración',  rating: 4.6, reviews: 52,  desde: 9000,  ubicacion: 'Madrid',        estado: 'Contratado', avatar: 'FA' },
  { id: 5, nombre: 'Hacienda San Juan', categoria: 'Locación',    rating: 4.9, reviews: 210, desde: 85000, ubicacion: 'Toledo',   estado: 'Contratado', avatar: 'HS', destacado: true },
  { id: 6, nombre: 'Banquetes Real',    categoria: 'Catering',    rating: 4.5, reviews: 61,  desde: 290,   unidad: '/persona', ubicacion: 'Sevilla', estado: 'Disponible', avatar: 'BR' },
  { id: 7, nombre: 'Luxe Transport',    categoria: 'Transporte',  rating: 4.4, reviews: 38,  desde: 6500,  ubicacion: 'Madrid',        estado: 'Disponible', avatar: 'LT' },
  { id: 8, nombre: 'Quinteto Aurora',   categoria: 'Música',      rating: 5.0, reviews: 41,  desde: 22000, ubicacion: 'Madrid',        estado: 'Disponible', avatar: 'QA', destacado: true },
]

// ── Detalle de proveedor (mock compartido) ──────────────────────────────────
export const PROVEEDOR_SERVICIOS = [
  { titulo: 'Servicio personalizado', desc: 'Adaptado a tu evento y presupuesto' },
  { titulo: 'Personal cualificado',   desc: 'Equipo profesional con experiencia' },
  { titulo: 'Montaje completo',       desc: 'Instalación y desmontaje incluidos' },
  { titulo: 'Opciones especiales',    desc: 'Alternativas para todos los gustos' },
  { titulo: 'Cobertura amplia',       desc: 'Disponible en Madrid y zona metropolitana' },
  { titulo: 'Certificaciones',        desc: 'Cumple normativas y seguros vigentes' },
]
export const PROVEEDOR_PAQUETES = [
  { nombre: 'Básico',  precio: 4500,  desc: 'Ideal para eventos pequeños', popular: false, features: ['Servicio de bienvenida', 'Opción estándar', 'Personal base'] },
  { nombre: 'Premium', precio: 7500,  desc: 'Para eventos especiales',     popular: true,  features: ['Todo lo del Básico', 'Servicio premium', 'Personal ampliado', 'Coordinación dedicada'] },
  { nombre: 'Deluxe',  precio: 12000, desc: 'Experiencia exclusiva',       popular: false, features: ['Todo lo del Premium', 'Personalización total', 'Montaje premium', 'Atención VIP'] },
]
export const PROVEEDOR_RESENAS = [
  { nombre: 'Laura Martínez',   rating: 5, fecha: '10 ene 2026', evento: 'Boda · 120 personas',       avatar: 'LM', texto: 'Excelente servicio para nuestra boda. El equipo fue muy profesional y atento en todo momento.' },
  { nombre: 'Carlos Rodríguez', rating: 5, fecha: '8 ene 2026',  evento: 'Corporativo · 80 personas', avatar: 'CR', texto: 'Contratamos sus servicios para un evento corporativo y quedamos muy satisfechos. Repetiremos sin duda.' },
  { nombre: 'Ana García',       rating: 4, fecha: '22 dic 2025', evento: 'XV Años · 80 personas',     avatar: 'AG', texto: 'Muy buena experiencia. Se adaptaron perfectamente a las necesidades de los invitados.' },
]

// ── Presupuesto por categoría ────────────────────────────────────────────────
export const PRESUPUESTO_CATEGORIAS = [
  { categoria: 'Locación',                 asignado: 120000, gastado: 110000 },
  { categoria: 'Catering',                 asignado: 98000,  gastado: 64000 },
  { categoria: 'Fotografía y video',       asignado: 45000,  gastado: 18000 },
  { categoria: 'Música y entretenimiento', asignado: 34000,  gastado: 12000 },
  { categoria: 'Decoración y flores',      asignado: 38000,  gastado: 22000 },
  { categoria: 'Transporte',               asignado: 15000,  gastado: 0 },
]

// ── Documentos ───────────────────────────────────────────────────────────────
export const DOCUMENTOS = [
  { id: 1, nombre: 'Contrato — Hacienda San Juan.pdf', tipo: 'pdf', tam: '2.4 MB', evento: 'Boda Martínez & López',    fecha: '28 jun 2026' },
  { id: 2, nombre: 'Menú degustación.pdf',             tipo: 'pdf', tam: '1.1 MB', evento: 'Boda Martínez & López',    fecha: '26 jun 2026' },
  { id: 3, nombre: 'Cotización fotografía.xlsx',       tipo: 'xls', tam: '88 KB',  evento: 'Boda Martínez & López',    fecha: '24 jun 2026' },
  { id: 4, nombre: 'Lista de invitados.xlsx',          tipo: 'xls', tam: '140 KB', evento: 'XV Años Sofía Ramírez',    fecha: '22 jun 2026' },
  { id: 5, nombre: 'Brief del evento.docx',            tipo: 'doc', tam: '320 KB', evento: 'Convención Anual TechES',  fecha: '20 jun 2026' },
  { id: 6, nombre: 'Render decoración.jpg',            tipo: 'img', tam: '3.8 MB', evento: 'Boda Martínez & López',    fecha: '18 jun 2026' },
  { id: 7, nombre: 'Plano del salón.pdf',              tipo: 'pdf', tam: '900 KB', evento: 'Convención Anual TechES',  fecha: '15 jun 2026' },
]

// ── Detalle de evento (datos por evento, mock compartido) ────────────────────
export const EV_PROV_CATEGORIAS = [
  { cat: 'Lugar',       estado: 'Contratado',     proveedor: 'Hacienda San Juan', monto: 85000 },
  { cat: 'Catering',    estado: 'Contratado',     proveedor: 'Banquetes Díaz',    monto: 64000 },
  { cat: 'Fotografía',  estado: 'En negociación', proveedor: '2 cotizaciones',    monto: null },
  { cat: 'Música / DJ', estado: 'Pendiente',      proveedor: null,                monto: null },
  { cat: 'Flores',      estado: 'Contratado',     proveedor: 'Flores & Arte',     monto: 18000 },
  { cat: 'Vídeo',       estado: 'Pendiente',      proveedor: null,                monto: null },
  { cat: 'Pastelería',  estado: 'Contratado',     proveedor: 'Dulce Arte',        monto: 9000 },
  { cat: 'Transporte',  estado: 'Contactado',     proveedor: 'Luxe Transport',    monto: null },
  { cat: 'Papelería',   estado: 'Pendiente',      proveedor: null,                monto: null },
]

export const EV_PARTIDAS = [
  { cat: 'Lugar',       proveedor: 'Hacienda San Juan', estado: 'Confirmado',     estimado: 85000, confirmado: 85000, pagado: 40000 },
  { cat: 'Catering',    proveedor: 'Banquetes Díaz',    estado: 'Confirmado',     estimado: 70000, confirmado: 64000, pagado: 30000 },
  { cat: 'Fotografía',  proveedor: '—',                 estado: 'En negociación', estimado: 25000, confirmado: 0,     pagado: 0 },
  { cat: 'Flores',      proveedor: 'Flores & Arte',     estado: 'Confirmado',     estimado: 18000, confirmado: 18000, pagado: 0 },
  { cat: 'Pastelería',  proveedor: 'Dulce Arte',        estado: 'Confirmado',     estimado: 9000,  confirmado: 9000,  pagado: 0 },
  { cat: 'Música / DJ', proveedor: '—',                 estado: 'Pendiente',      estimado: 15000, confirmado: 0,     pagado: 0 },
  { cat: 'Transporte',  proveedor: '—',                 estado: 'Contactado',     estimado: 6500,  confirmado: 0,     pagado: 0 },
]

export const EV_PAGOS = [
  { titulo: 'Segundo pago — Hacienda San Juan', cat: 'Lugar',      vence: '15 jul 2026', monto: 45000 },
  { titulo: 'Segundo pago — Banquetes Díaz',    cat: 'Catering',   vence: '01 ago 2026', monto: 34000 },
  { titulo: 'Pago completo — Flores & Arte',    cat: 'Flores',     vence: '20 ago 2026', monto: 18000 },
  { titulo: 'Pago completo — Dulce Arte',       cat: 'Pastelería', vence: '25 ago 2026', monto: 9000 },
]

export const EV_INVITADOS = {
  total: 280, confirmados: 198, pendientes: 64, declinados: 18,
  grupos: [
    { nombre: 'Familia García',     grupo: 'Familia novia', personas: 32, estado: 'Confirmado' },
    { nombre: 'Familia López',      grupo: 'Familia novio', personas: 28, estado: 'Confirmado' },
    { nombre: 'Amigos universidad', grupo: 'Amigos',        personas: 24, estado: 'Pendiente' },
    { nombre: 'Compañeros trabajo', grupo: 'Trabajo',       personas: 18, estado: 'Confirmado' },
    { nombre: 'Tíos y primos',      grupo: 'Familia',       personas: 40, estado: 'Pendiente' },
    { nombre: 'Invitados especiales', grupo: 'Otros',       personas: 6,  estado: 'Declinado' },
  ],
}

// ── Referidos ────────────────────────────────────────────────────────────────
export const REFERIDOS_STATS = {
  enlace: 'eventus.mx/ref/samuelurbina',
  total: 12,
  meta: 20,
  registrados: 8,
  conEvento: 5,
  creditos: 2500,        // € disponibles
  porReferido: 500,      // € por referido con evento creado
}
export const REFERIDOS = [
  { id: 1, nombre: 'Carlos Ruiz',     email: 'carlos.ruiz@email.com',     estado: 'Evento creado', fecha: '15 ene 2026', credito: 500 },
  { id: 2, nombre: 'Laura Martínez',  email: 'laura.martinez@email.com',  estado: 'Evento creado', fecha: '18 ene 2026', credito: 500 },
  { id: 3, nombre: 'Ana Fernández',   email: 'ana.fernandez@email.com',   estado: 'Registrado',    fecha: '20 ene 2026', credito: 0 },
  { id: 4, nombre: 'Pedro Sánchez',   email: 'pedro.sanchez@email.com',   estado: 'Evento creado', fecha: '22 ene 2026', credito: 500 },
  { id: 5, nombre: 'Isabel Torres',   email: 'isabel.torres@email.com',   estado: 'Evento creado', fecha: '23 ene 2026', credito: 500 },
]

// ── Conversaciones (chat) ────────────────────────────────────────────────────
// estado: 'En negociación' | 'Aceptado' | 'Rechazado' | 'Nuevo'
// mensaje especial: { tipo:'presupuesto', estado:'pendiente'|'aceptado'|'rechazado', concepto, items[], total, hora }
export const CONVERSACIONES = [
  {
    id: 1, de: 'Estudio Lumière', avatar: 'EL', categoria: 'Fotografía', estado: 'En negociación', hora: '10:24', noLeidos: 2,
    ultimo: 'Te envié el presupuesto definitivo.',
    mensajes: [
      { mio: false, texto: '¡Hola Samuel! Gracias por tu interés en nuestro trabajo.', hora: '10:02' },
      { mio: true,  texto: 'Hola, ¿tienen disponibilidad para el 14 de septiembre?', hora: '10:10' },
      { mio: false, texto: 'Sí, esa fecha está libre. Te comparto el presupuesto.', hora: '10:18' },
      { tipo: 'presupuesto', estado: 'pendiente', concepto: 'Cobertura fotográfica — Boda', hora: '10:24',
        items: [{ label: 'Cobertura 10 h', monto: 14000 }, { label: 'Álbum premium', monto: 3000 }, { label: 'Sesión previa', monto: 1000 }], total: 18000 },
    ],
  },
  {
    id: 2, de: 'Banquetes Díaz', avatar: 'BD', categoria: 'Catering', estado: 'En negociación', hora: '2 h', noLeidos: 1,
    ultimo: 'La propuesta del menú ya está lista.',
    mensajes: [
      { mio: false, texto: 'Buen día, preparamos la propuesta de menú para tu evento.', hora: '08:30' },
      { tipo: 'presupuesto', estado: 'pendiente', concepto: 'Menú degustación (280 pax)', hora: '09:15',
        items: [{ label: 'Menú 3 tiempos', monto: 52000 }, { label: 'Bebidas y barra', monto: 9000 }, { label: 'Personal de servicio', monto: 3000 }], total: 64000 },
    ],
  },
  {
    id: 3, de: 'Flores & Arte', avatar: 'FA', categoria: 'Decoración', estado: 'Aceptado', hora: 'Ayer', noLeidos: 0,
    ultimo: 'Confirmamos la instalación para las 8 am.',
    mensajes: [
      { tipo: 'presupuesto', estado: 'aceptado', concepto: 'Decoración floral', hora: 'Ayer 15:00',
        items: [{ label: 'Centros de mesa', monto: 12000 }, { label: 'Arco floral', monto: 6000 }], total: 18000 },
      { mio: true,  texto: '¿A qué hora llegan a montar la decoración?', hora: 'Ayer 16:40' },
      { mio: false, texto: 'Confirmamos la instalación para las 8 am.', hora: 'Ayer 17:02' },
    ],
  },
  {
    id: 4, de: 'DJ Soundtrack', avatar: 'DS', categoria: 'Música', estado: 'Rechazado', hora: '2 d', noLeidos: 0,
    ultimo: 'Entendido, gracias por avisar.',
    mensajes: [
      { tipo: 'presupuesto', estado: 'rechazado', concepto: 'DJ + sonido e iluminación', hora: 'lun 11:00',
        items: [{ label: 'DJ 6 h', monto: 12000 }, { label: 'Iluminación', monto: 6000 }], total: 18000 },
      { mio: false, texto: 'Entendido, gracias por avisar. Quedamos a la orden.', hora: 'lun 12:20' },
    ],
  },
  {
    id: 5, de: 'Quinteto Aurora', avatar: 'QA', categoria: 'Música', estado: 'Nuevo', hora: '3 d', noLeidos: 0,
    ultimo: '¿Te gustaría agendar una llamada?',
    mensajes: [
      { mio: false, texto: 'Hola, vimos tu solicitud para música en vivo. ¿Te gustaría agendar una llamada?', hora: 'sáb 18:00' },
    ],
  },
]

// Estados de conversación → tono de Badge
export const ESTADO_MSG = { 'En negociación': 'amber', 'Aceptado': 'green', 'Rechazado': 'red', 'Nuevo': 'navy' }
