import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Bell, MessageSquare, FileText, Inbox, Wallet, CheckCircle2, CalendarDays, CheckCheck,
} from 'lucide-react'
import { cls } from './ui'

export const NOTIF_ICONO = {
  mensaje: { Icon: MessageSquare, tone: 'bg-navy/8 text-navy' },
  presupuesto: { Icon: FileText, tone: 'bg-amber-50 text-amber-600' },
  solicitud: { Icon: Inbox, tone: 'bg-mint/25 text-navy' },
  pago: { Icon: Wallet, tone: 'bg-green-50 text-green-600' },
  confirmacion: { Icon: CheckCircle2, tone: 'bg-green-50 text-green-600' },
  evento: { Icon: CalendarDays, tone: 'bg-violet-50 text-violet-600' },
}

// Notificaciones del organizador
export const NOTIF_ORG = [
  { id: 1, tipo: 'mensaje', titulo: 'Estudio Lumière', texto: 'Te envió una propuesta de álbum.', tiempo: 'Hace 10 min', leida: false },
  { id: 2, tipo: 'presupuesto', titulo: 'Banquetes Díaz', texto: 'Nuevo presupuesto de menú · 64.000 €.', tiempo: 'Hace 2 h', leida: false },
  { id: 3, tipo: 'confirmacion', titulo: 'DJ Soundtrack', texto: 'Confirmó disponibilidad para el 14 sep.', tiempo: 'Hace 3 h', leida: false },
  { id: 4, tipo: 'pago', titulo: 'Pago registrado', texto: 'Anticipo de 25.000 € — Boda Martínez.', tiempo: 'Ayer', leida: true },
  { id: 5, tipo: 'evento', titulo: 'Convención TechES', texto: 'Se añadió al calendario.', tiempo: 'Ayer', leida: true },
]

// Notificaciones del proveedor
export const NOTIF_PROV = [
  { id: 1, tipo: 'solicitud', titulo: 'Nueva solicitud', texto: 'Boda en Barcelona · 120 personas.', tiempo: 'Hace 2 h', leida: false },
  { id: 2, tipo: 'solicitud', titulo: 'Nueva solicitud', texto: 'Evento Corporativo · Tech Solutions SL.', tiempo: 'Hace 5 h', leida: false },
  { id: 3, tipo: 'mensaje', titulo: 'Ana García', texto: '¿Podríais enviarme el menú completo?', tiempo: 'Hace 10 min', leida: false },
  { id: 4, tipo: 'presupuesto', titulo: 'Presupuesto aceptado', texto: 'Tech Solutions SL aceptó tu propuesta.', tiempo: 'Ayer', leida: true },
  { id: 5, tipo: 'confirmacion', titulo: 'Documento aprobado', texto: 'Tu CIF fue verificado correctamente.', tiempo: 'Ayer', leida: true },
]

export function NotificationsBell({ items = NOTIF_ORG, verTodasTo = '#' }) {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const [notifs, setNotifs] = useState(items)

  useEffect(() => {
    if (!open) { setShown(false); return }
    const r = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(r)
  }, [open])

  const noLeidas = notifs.filter((n) => !n.leida).length
  const marcarTodas = () => setNotifs((p) => p.map((n) => ({ ...n, leida: true })))
  const marcarUna = (id) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, leida: true } : n)))

  return (
    <div className="relative">
      <button onClick={() => setOpen((o) => !o)} className={cls('relative flex h-8 w-8 items-center justify-center rounded-lg transition-colors', open ? 'bg-gray-100 text-navy' : 'text-ink-muted hover:bg-gray-100')} aria-label="Notificaciones">
        <Bell size={16} strokeWidth={1.8} />
        {noLeidas > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[9px] font-bold text-navy">{noLeidas}</span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div data-origin="top-right" className={cls('t-dropdown absolute right-0 z-50 mt-2 flex max-h-[70vh] w-[340px] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white', shown && 'is-open')}>
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <h3 className="text-[14px] font-bold text-ink-strong">Notificaciones</h3>
                {noLeidas > 0 && <span className="rounded-full bg-mint/25 px-2 py-0.5 text-[10px] font-bold text-navy">{noLeidas} nuevas</span>}
              </div>
              {noLeidas > 0 && (
                <button onClick={marcarTodas} className="flex items-center gap-1 text-[11.5px] font-semibold text-navy transition-colors hover:underline"><CheckCheck size={13} /> Marcar leídas</button>
              )}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {notifs.length === 0 && <p className="px-4 py-10 text-center text-[12.5px] text-ink-muted">No tienes notificaciones.</p>}
              {notifs.map((n) => {
                const { Icon, tone } = NOTIF_ICONO[n.tipo] ?? NOTIF_ICONO.mensaje
                return (
                  <button key={n.id} onClick={() => marcarUna(n.id)} className={cls('flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-0 hover:bg-gray-50', !n.leida && 'bg-mint/[0.06]')}>
                    <span className={cls('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', tone)}><Icon size={16} strokeWidth={2} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-[13px] font-bold text-ink-strong">{n.titulo}</p>
                        {!n.leida && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint" />}
                      </div>
                      <p className="text-[12px] leading-snug text-ink-muted">{n.texto}</p>
                      <p className="mt-0.5 text-[10.5px] text-ink-subtle">{n.tiempo}</p>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="border-t border-gray-200 px-4 py-2.5 text-center">
              <button onClick={() => { setOpen(false); navigate(verTodasTo) }} className="text-[12.5px] font-semibold text-navy transition-colors hover:underline">Ver todas las notificaciones</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
