import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Plus, MapPin, Users, ArrowRight } from 'lucide-react'
import { EVENTOS } from '../../data/mock'
import { themeFor, UNSPLASH, FMT, diasRestantes } from '../../data/theme'
import { Badge } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const ESTADOS = ['Todos', 'En curso', 'Planificación', 'Completado']
const ESTADO_TONE = { 'En curso': 'mint', 'Planificación': 'navy', 'Completado': 'gray' }

function EventCard({ e }) {
  const t = themeFor(e.tipo)
  const dias = diasRestantes(e.fecha)
  const pct = Math.round((e.gastado / e.presupuesto) * 100)
  return (
    <Link to={`/organizador/eventos/${e.id}`} className="t-lift group flex flex-col rounded-lg border border-gray-200 bg-white p-1.5 hover:border-navy/40">
      {/* Portada */}
      <div className="relative h-36 overflow-hidden rounded-lg px-4 pt-3" style={{ backgroundImage: t.grad }}>
        <img src={UNSPLASH(t.img, 700)} alt={e.tipo} onError={(ev) => { ev.currentTarget.style.display = 'none' }} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(11,51,76,0.32) 0%,rgba(11,51,76,0) 42%,rgba(11,51,76,0.72) 100%)' }} />
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <t.Icon size={12} strokeWidth={2.4} /> {e.tipo}
          </span>
          <Badge tone={ESTADO_TONE[e.estado]}>{e.estado}</Badge>
        </div>
        <div className="absolute bottom-3 left-4 z-10 text-white drop-shadow">
          <p className="text-[15px] font-bold leading-tight">{e.nombre}</p>
          <p className="mt-0.5 flex items-center gap-1 text-[11px] text-white/85"><MapPin size={11} /> {e.lugar}</p>
        </div>
      </div>
      {/* Cuerpo */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center justify-between text-[12px]">
          <span className="font-semibold text-ink-strong">{e.fecha}</span>
          <span className="text-ink-muted">{dias} días · {e.proveedores} prov.</span>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[11px]">
            <span className="font-medium text-ink-muted">Presupuesto ejecutado</span>
            <span className="font-semibold text-ink-strong">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundImage: t.grad }} />
          </div>
          <p className="mt-1.5 text-[11px] text-ink-subtle">{FMT.format(e.gastado)} de {FMT.format(e.presupuesto)}</p>
        </div>
        <div className="mt-auto flex items-center justify-end pt-0.5">
          <span className="flex items-center gap-1 text-[13px] font-semibold text-navy transition-all group-hover:gap-2">Ver evento <ArrowRight size={14} /></span>
        </div>
      </div>
    </Link>
  )
}

export default function MisEventos() {
  const [estado, setEstado] = useState('Todos')
  const [q, setQ] = useState('')
  usePageHeader('Mis eventos', `${EVENTOS.length} eventos en total`)
  const eventos = EVENTOS.filter((e) =>
    (estado === 'Todos' || e.estado === estado) &&
    (e.nombre.toLowerCase().includes(q.toLowerCase()) || e.lugar.toLowerCase().includes(q.toLowerCase())),
  )

  return (
    <div className="px-7 py-5">
      {/* Toolbar */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar evento o lugar…"
            className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40"
          />
        </div>
        <div className="flex items-center gap-1.5">
          {ESTADOS.map((s) => (
            <button
              key={s}
              onClick={() => setEstado(s)}
              className={`rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                estado === s ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
        {eventos.map((e) => <EventCard key={e.id} e={e} />)}
        <Link
          to="/organizador/eventos/nuevo"
          className="flex min-h-[260px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white text-ink-muted transition-colors hover:border-navy hover:text-navy"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-offwhite"><Plus size={20} /></span>
          <span className="text-[13px] font-semibold">Crear nuevo evento</span>
        </Link>
      </div>

      {eventos.length === 0 && (
        <p className="mt-10 text-center text-[13px] text-ink-muted">No hay eventos que coincidan con tu búsqueda.</p>
      )}
    </div>
  )
}
