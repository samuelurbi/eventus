import { useState } from 'react'
import { Search, SlidersHorizontal, CheckCircle2, Euro, TrendingUp, MoreVertical } from 'lucide-react'
import { Card, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { HISTORIAL, HISTORIAL_STATS, EUR } from '../../data/proveedorMock'

export default function Historial() {
  const [q, setQ] = useState('')
  usePageHeader('Historial de Eventos Cerrados', 'Seguimiento de negocios cerrados y rendimiento comercial')

  const lista = HISTORIAL.filter((h) => (h.evento + h.cliente + h.ciudad).toLowerCase().includes(q.toLowerCase()))
  const stats = [
    { label: 'Eventos Cerrados', value: HISTORIAL_STATS.cerrados, sub: 'Total histórico', Icon: CheckCircle2 },
    { label: 'Ingresos Generados', value: EUR.format(HISTORIAL_STATS.ingresos), sub: 'Acumulado total', Icon: Euro },
    { label: 'Promedio por Evento', value: EUR.format(HISTORIAL_STATS.promedio), sub: 'Media de ingresos', Icon: TrendingUp },
  ]

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="relative flex-1 sm:max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar evento…" className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
        </div>
        <BtnOutline><SlidersHorizontal size={14} /> Filtros</BtnOutline>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="mb-2 flex items-center justify-between"><p className="text-[12px] text-ink-muted">{s.label}</p><s.Icon size={16} className="text-ink-subtle" /></div>
            <p className="text-[26px] font-bold leading-none text-ink-strong">{s.value}</p>
            <p className="mt-1.5 text-[11.5px] text-ink-subtle">{s.sub}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="hidden grid-cols-[1.4fr_1.3fr_110px_110px_80px_100px_44px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Evento</span><span>Cliente</span><span>Fecha</span><span>Tipo</span><span>Personas</span><span className="text-right">Ingreso</span><span />
        </div>
        <div className="divide-y divide-gray-100">
          {lista.map((h) => (
            <div key={h.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3.5 transition-colors hover:bg-gray-50 md:grid-cols-[1.4fr_1.3fr_110px_110px_80px_100px_44px] md:gap-3">
              <div>
                <p className="text-[13.5px] font-bold text-ink-strong">{h.evento}</p>
                <p className="text-[11.5px] text-ink-subtle">{h.ciudad} · Finalizado</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-mint">{h.avatar}</span>
                <div className="min-w-0"><p className="truncate text-[12.5px] font-medium text-ink-body">{h.cliente}</p><p className="truncate text-[11px] text-ink-subtle">{h.email}</p></div>
              </div>
              <span className="text-[12px] text-ink-muted">{h.fecha}</span>
              <span className="text-[12px] text-ink-muted">{h.tipo}</span>
              <span className="text-[12.5px] text-ink-body">{h.personas}</span>
              <span className="text-[13.5px] font-bold text-ink-strong md:text-right">{EUR.format(h.ingreso)}</span>
              <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-navy md:flex"><MoreVertical size={15} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
