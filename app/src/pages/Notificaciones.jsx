import { useState } from 'react'
import { CheckCheck } from 'lucide-react'
import { Card, cls } from '../components/ui'
import { NOTIF_ICONO } from '../components/NotificationsBell'
import { usePageHeader } from '../layouts/pageHeader'

const FILTROS = ['Todas', 'No leídas']

export default function Notificaciones({ items = [] }) {
  const [notifs, setNotifs] = useState(items)
  const [filtro, setFiltro] = useState('Todas')
  const noLeidas = notifs.filter((n) => !n.leida).length
  usePageHeader('Notificaciones', `${noLeidas} sin leer`)

  const marcarTodas = () => setNotifs((p) => p.map((n) => ({ ...n, leida: true })))
  const marcarUna = (id) => setNotifs((p) => p.map((n) => (n.id === id ? { ...n, leida: true } : n)))
  const lista = notifs.filter((n) => filtro === 'Todas' || !n.leida)

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            {FILTROS.map((f) => (
              <button key={f} onClick={() => setFiltro(f)} className={cls('rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors', filtro === f ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>
                {f}{f === 'No leídas' && noLeidas > 0 ? ` (${noLeidas})` : ''}
              </button>
            ))}
          </div>
          {noLeidas > 0 && (
            <button onClick={marcarTodas} className="flex items-center gap-1.5 text-[12.5px] font-semibold text-navy transition-colors hover:underline"><CheckCheck size={14} /> Marcar todas como leídas</button>
          )}
        </div>

        <Card>
          <div className="divide-y divide-gray-100">
            {lista.map((n) => {
              const { Icon, tone } = NOTIF_ICONO[n.tipo] ?? NOTIF_ICONO.mensaje
              return (
                <button key={n.id} onClick={() => marcarUna(n.id)} className={cls('flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50', !n.leida && 'bg-mint/[0.05]')}>
                  <span className={cls('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', tone)}><Icon size={17} strokeWidth={2} /></span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[13.5px] font-bold text-ink-strong">{n.titulo}</p>
                      {!n.leida && <span className="h-2 w-2 shrink-0 rounded-full bg-mint" />}
                    </div>
                    <p className="text-[12.5px] leading-snug text-ink-muted">{n.texto}</p>
                    <p className="mt-0.5 text-[11px] text-ink-subtle">{n.tiempo}</p>
                  </div>
                </button>
              )
            })}
            {lista.length === 0 && <p className="px-5 py-12 text-center text-[13px] text-ink-muted">No tienes notificaciones sin leer.</p>}
          </div>
        </Card>
      </div>
    </div>
  )
}
