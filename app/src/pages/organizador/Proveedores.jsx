import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, Star, MapPin, Heart, BadgeCheck, ChevronDown,
  Camera, UtensilsCrossed, Music, Flower2, Building2, Car,
} from 'lucide-react'
import { PROVEEDORES, CATEGORIAS } from '../../data/mock'
import { FMT } from '../../data/theme'
import { Card, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

export const CAT = {
  Fotografía:  { Icon: Camera,          grad: 'linear-gradient(135deg,#34C3A6 0%,#0E7C66 100%)' },
  Catering:    { Icon: UtensilsCrossed, grad: 'linear-gradient(135deg,#F6A23B 0%,#E8730C 100%)' },
  Música:      { Icon: Music,           grad: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)' },
  Decoración:  { Icon: Flower2,         grad: 'linear-gradient(135deg,#FB7BA8 0%,#E84B8A 100%)' },
  Locación:    { Icon: Building2,       grad: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' },
  Transporte:  { Icon: Car,             grad: 'linear-gradient(135deg,#5B8DEF 0%,#2C5FD6 100%)' },
}
export const catFor = (c) => CAT[c] ?? CAT.Locación

function Stars({ rating }) {
  return (
    <span className="flex items-center gap-1 text-[12px] font-semibold text-ink-strong">
      <Star size={13} className="fill-amber-400 text-amber-400" /> {rating.toFixed(1)}
    </span>
  )
}

function ProveedorCard({ p }) {
  const c = catFor(p.categoria)
  return (
    <Link to={`/organizador/proveedores/${p.id}`} className="t-lift group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-navy/40">
      {/* Imagen (placeholder por categoría) */}
      <div className="relative h-32 overflow-hidden" style={{ backgroundImage: c.grad }}>
        <c.Icon size={64} strokeWidth={1.4} className="absolute -bottom-3 -right-2 text-white/20" />
        {p.destacado && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-navy">
            <BadgeCheck size={11} /> Verificado
          </span>
        )}
        <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-muted transition-colors hover:text-rose-500">
          <Heart size={14} />
        </span>
      </div>
      {/* Cuerpo */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[14px] font-bold text-ink-strong">{p.nombre}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-ink-muted"><c.Icon size={12} /> {p.categoria} · <MapPin size={11} /> {p.ubicacion}</p>
        <div className="mt-2 flex items-center gap-1.5"><Stars rating={p.rating} /><span className="text-[11px] text-ink-subtle">({p.reviews} reseñas)</span></div>
        <div className="mt-auto flex items-end justify-between pt-3">
          <span className="text-[11px] text-ink-muted">desde <span className="block text-[14px] font-bold text-ink-strong">{FMT.format(p.desde)}<span className="text-[11px] font-medium text-ink-subtle">{p.unidad || ''}</span></span></span>
          <span className="rounded-lg bg-navy px-3 py-1.5 text-[12px] font-semibold text-white transition-colors group-hover:bg-navy-light">Ver perfil</span>
        </div>
      </div>
    </Link>
  )
}

function Check({ label, count }) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-[12px] text-ink-body">
      <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-navy focus:ring-mint/40" />
      {label}{count != null && <span className="text-ink-subtle">({count})</span>}
    </label>
  )
}

const inputCls = 'h-9 w-full rounded-lg border border-gray-200 bg-white px-3 text-[12.5px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

export default function Proveedores() {
  const [cat, setCat] = useState('Todos')
  const [q, setQ] = useState('')
  usePageHeader('Marketplace de proveedores', 'Encuentra y compara proveedores verificados para tu evento')
  const lista = PROVEEDORES.filter((p) =>
    (cat === 'Todos' || p.categoria === cat) && p.nombre.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="px-7 py-5">
      {/* Buscador + chips */}
      <Card className="mb-5 p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar proveedores por nombre, servicio o ubicación…" className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
          </div>
          <button className="flex shrink-0 items-center gap-1.5 rounded-lg bg-navy px-4 text-[13px] font-semibold text-white hover:bg-navy-light"><Search size={15} /> Buscar</button>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {CATEGORIAS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={cls('rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors', cat === c ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{c}</button>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[240px_1fr] xl:items-start">
        {/* Filtros */}
        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[13px] font-bold text-ink-strong">Filtros</p>
            <button className="text-[11px] font-semibold text-navy hover:underline">Limpiar</button>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-ink-strong">Ubicación</p>
              <input className={inputCls} placeholder="Ciudad o estado" />
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-ink-strong">Rango de precio</p>
              <div className="flex items-center gap-2"><input className={inputCls} placeholder="Mín" /><span className="text-ink-subtle">–</span><input className={inputCls} placeholder="Máx" /></div>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-ink-strong">Valoración</p>
              <div className="flex flex-col gap-1.5"><Check label="5 estrellas" count={5} /><Check label="4 estrellas o más" count={4} /><Check label="3 estrellas o más" count={3} /></div>
            </div>
            <div>
              <p className="mb-1.5 text-[12px] font-semibold text-ink-strong">Verificado</p>
              <Check label="Solo verificados" />
            </div>
            <button className="rounded-lg bg-navy py-2 text-[13px] font-semibold text-white hover:bg-navy-light">Aplicar filtros</button>
          </div>
        </Card>

        {/* Resultados */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[12.5px] text-ink-muted">Mostrando <span className="font-semibold text-ink-strong">{lista.length}</span> proveedores</p>
            <div className="flex items-center gap-2 text-[12.5px] text-ink-muted">
              Ordenar por
              <button className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-[12.5px] font-semibold text-ink-strong">Más relevantes <ChevronDown size={13} /></button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3">
            {lista.map((p) => <ProveedorCard key={p.id} p={p} />)}
          </div>
          {lista.length === 0 && <p className="mt-10 text-center text-[13px] text-ink-muted">Sin proveedores en esta categoría.</p>}
        </div>
      </div>
    </div>
  )
}
