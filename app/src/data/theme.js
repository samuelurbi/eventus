import { Heart, Briefcase, PartyPopper } from 'lucide-react'

// Formato de moneda (euros — moneda única de la plataforma)
export const FMT = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })

// Imágenes Unsplash (id = parte "photo-<id>")
export const UNSPLASH = (id, w = 800) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Identidad visual por tipo de evento
export const EVENT_THEME = {
  Boda:        { grad: 'linear-gradient(135deg,#FB7BA8 0%,#E84B8A 100%)', Icon: Heart,       chip: 'bg-rose-50 text-rose-600',     img: '1519741497674-611481863552' },
  Corporativo: { grad: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)', Icon: Briefcase,   chip: 'bg-navy/8 text-navy',          img: '1505373877841-8d25f7d46678' },
  Fiesta:      { grad: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)', Icon: PartyPopper, chip: 'bg-violet-50 text-violet-600', img: '1530103862676-de8c9debad1d' },
}
export const themeFor = (tipo) => EVENT_THEME[tipo] ?? EVENT_THEME.Corporativo

const MESES = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 }
export function diasRestantes(fechaStr) {
  const [d, m, y] = fechaStr.split(' ')
  const fecha = new Date(Number(y), MESES[(m || '').toLowerCase()] ?? 0, Number(d))
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0)
  return Math.max(0, Math.round((fecha - hoy) / 86_400_000))
}

// Estado de evento → tono de Badge
export const ESTADO_TONE = { 'En curso': 'mint', 'Planificación': 'navy', 'Completado': 'gray' }
