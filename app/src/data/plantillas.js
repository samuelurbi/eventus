import { Camera, Utensils, Music, Flower2, MapPin, Car, Video, Cake, Mail, Sparkles, Wine, Users } from 'lucide-react'

// Catálogo de servicios contratables + su icono
export const SERVICIO_ICON = {
  'Locación': MapPin,
  'Catering': Utensils,
  'Fotografía': Camera,
  'Video': Video,
  'Música / DJ': Music,
  'Decoración': Sparkles,
  'Flores': Flower2,
  'Transporte': Car,
  'Pastel': Cake,
  'Invitaciones': Mail,
  'Barra de bebidas': Wine,
  'Animación': Users,
}

export const TODOS_SERVICIOS = Object.keys(SERVICIO_ICON)

// Atajos para no repetir
const S = (cat, esencial = false) => ({ cat, esencial })

// Plantillas de evento (modo fácil) — proveedores que suele llevar cada tipo.
// `esencial` = la plataforma lo recomienda fuertemente; el usuario puede desactivarlo.
export const PLANTILLAS = [
  // ── Boda ───────────────────────────────────────────────────────────────────
  { id: 'boda-clasica', tipo: 'Boda', nombre: 'Boda clásica', desc: 'Ceremonia y recepción tradicional con todos los servicios.', img: '1519741497674-611481863552', invitados: 200, presupuesto: 300000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Música / DJ', true), S('Decoración', true), S('Pastel', true), S('Video'), S('Flores'), S('Invitaciones'), S('Transporte')] },
  { id: 'boda-intima', tipo: 'Boda', nombre: 'Boda íntima', desc: 'Celebración pequeña y cálida para tus seres más cercanos.', img: '1606216794074-735e91aa2c92', invitados: 50, presupuesto: 120000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Flores', true), S('Pastel'), S('Música / DJ')] },
  { id: 'boda-destino', tipo: 'Boda', nombre: 'Boda destino', desc: 'En la playa o un lugar especial, con logística de viaje.', img: '1465495976277-4387d4b0b4c6', invitados: 80, presupuesto: 420000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Transporte', true), S('Decoración', true), S('Música / DJ'), S('Video'), S('Flores'), S('Pastel')] },
  { id: 'boda-jardin', tipo: 'Boda', nombre: 'Boda en jardín', desc: 'Al aire libre, con montaje y decoración natural.', img: '1583939003579-730e3918a45a', invitados: 150, presupuesto: 260000,
    servicios: [S('Locación', true), S('Catering', true), S('Decoración', true), S('Flores', true), S('Fotografía', true), S('Música / DJ'), S('Pastel'), S('Barra de bebidas')] },
  { id: 'boda-civil', tipo: 'Boda', nombre: 'Boda civil', desc: 'Ceremonia legal con brindis y comida posterior.', img: '1511285560929-80b456fea0bc', invitados: 40, presupuesto: 70000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Flores'), S('Pastel')] },
  { id: 'boda-votos', tipo: 'Boda', nombre: 'Renovación de votos', desc: 'Reafirma tu compromiso rodeado de los tuyos.', img: '1496843916299-590492c751f4', invitados: 60, presupuesto: 90000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Decoración'), S('Música / DJ'), S('Pastel')] },

  // ── Corporativo ──────────────────────────────────────────────────────────────
  { id: 'corp-conferencia', tipo: 'Corporativo', nombre: 'Conferencia / Convención', desc: 'Evento profesional con escenario, ponentes y catering.', img: '1505373877841-8d25f7d46678', invitados: 400, presupuesto: 700000,
    servicios: [S('Locación', true), S('Catering', true), S('Fotografía', true), S('Video', true), S('Música / DJ'), S('Transporte'), S('Decoración')] },
  { id: 'corp-gala', tipo: 'Corporativo', nombre: 'Cena de gala', desc: 'Velada formal de premiación o fin de año.', img: '1511795409834-ef04bbd61622', invitados: 150, presupuesto: 450000,
    servicios: [S('Locación', true), S('Catering', true), S('Decoración', true), S('Música / DJ', true), S('Fotografía'), S('Barra de bebidas')] },
  { id: 'corp-team', tipo: 'Corporativo', nombre: 'Team building', desc: 'Actividades de integración para tu equipo.', img: '1540575467063-178a50c2df87', invitados: 60, presupuesto: 120000,
    servicios: [S('Locación', true), S('Catering', true), S('Animación', true), S('Transporte'), S('Fotografía')] },
  { id: 'corp-lanzamiento', tipo: 'Corporativo', nombre: 'Lanzamiento de producto', desc: 'Presentación con prensa, demo y networking.', img: '1492684223066-81342ee5ff30', invitados: 120, presupuesto: 350000,
    servicios: [S('Locación', true), S('Catering', true), S('Video', true), S('Fotografía', true), S('Decoración'), S('Música / DJ'), S('Barra de bebidas')] },
  { id: 'corp-workshop', tipo: 'Corporativo', nombre: 'Capacitación / Workshop', desc: 'Sesión formativa con espacio y coffee break.', img: '1517245386807-bb43f82c33c4', invitados: 40, presupuesto: 60000,
    servicios: [S('Locación', true), S('Catering', true), S('Video')] },
  { id: 'corp-networking', tipo: 'Corporativo', nombre: 'Networking / Mixer', desc: 'Encuentro informal con bebidas y música.', img: '1556761175-5973dc0f32e7', invitados: 90, presupuesto: 110000,
    servicios: [S('Locación', true), S('Catering', true), S('Barra de bebidas', true), S('Música / DJ'), S('Fotografía')] },
  { id: 'corp-expo', tipo: 'Corporativo', nombre: 'Feria / Expo', desc: 'Stands, expositores y gran afluencia.', img: '1467810563316-b5476525c0f9', invitados: 500, presupuesto: 800000,
    servicios: [S('Locación', true), S('Catering', true), S('Decoración', true), S('Transporte'), S('Fotografía'), S('Video')] },

  // ── Fiesta ───────────────────────────────────────────────────────────────────
  { id: 'fiesta-xv', tipo: 'Fiesta', nombre: 'XV Años', desc: 'La gran celebración con vals, banquete y pista de baile.', img: '1530103862676-de8c9debad1d', invitados: 150, presupuesto: 110000,
    servicios: [S('Locación', true), S('Catering', true), S('Música / DJ', true), S('Fotografía', true), S('Decoración', true), S('Pastel', true), S('Animación'), S('Video'), S('Invitaciones')] },
  { id: 'fiesta-cumple', tipo: 'Fiesta', nombre: 'Cumpleaños', desc: 'Reunión festiva flexible para cualquier edad.', img: '1464349153735-7db50ed83c84', invitados: 60, presupuesto: 45000,
    servicios: [S('Locación', true), S('Catering', true), S('Música / DJ', true), S('Pastel', true), S('Decoración'), S('Animación')] },
  { id: 'fiesta-bautizo', tipo: 'Fiesta', nombre: 'Bautizo', desc: 'Celebración familiar tras la ceremonia.', img: '1533174072545-7a4b6ad7a6c3', invitados: 70, presupuesto: 55000,
    servicios: [S('Locación', true), S('Catering', true), S('Pastel', true), S('Fotografía'), S('Decoración')] },
  { id: 'fiesta-graduacion', tipo: 'Fiesta', nombre: 'Graduación', desc: 'Fin de etapa con cena y fiesta.', img: '1514525253161-7a46d19cd819', invitados: 120, presupuesto: 90000,
    servicios: [S('Locación', true), S('Catering', true), S('Música / DJ', true), S('Fotografía', true), S('Decoración'), S('Barra de bebidas')] },
  { id: 'fiesta-baby', tipo: 'Fiesta', nombre: 'Baby shower', desc: 'Tarde temática para recibir al bebé.', img: '1492725764893-90b379c2b6e7', invitados: 30, presupuesto: 25000,
    servicios: [S('Locación', true), S('Catering', true), S('Decoración', true), S('Pastel', true), S('Fotografía'), S('Animación')] },
  { id: 'fiesta-despedida', tipo: 'Fiesta', nombre: 'Despedida de soltero/a', desc: 'Una noche para recordar antes del gran día.', img: '1530023367847-a683933f4172', invitados: 25, presupuesto: 40000,
    servicios: [S('Locación', true), S('Barra de bebidas', true), S('Música / DJ', true), S('Transporte'), S('Animación')] },
  { id: 'fiesta-aniversario', tipo: 'Fiesta', nombre: 'Aniversario', desc: 'Conmemora una fecha especial con estilo.', img: '1527529482837-4698179dc6ce', invitados: 50, presupuesto: 60000,
    servicios: [S('Locación', true), S('Catering', true), S('Decoración', true), S('Música / DJ'), S('Pastel'), S('Fotografía')] },
  { id: 'fiesta-posada', tipo: 'Fiesta', nombre: 'Posada / Fin de año', desc: 'Fiesta de temporada con cena y baile.', img: '1514525253161-7a46d19cd819', invitados: 100, presupuesto: 80000,
    servicios: [S('Locación', true), S('Catering', true), S('Música / DJ', true), S('Decoración', true), S('Barra de bebidas'), S('Animación')] },
]
