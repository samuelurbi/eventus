import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Wand2, SlidersHorizontal, Sparkles, AlertCircle, PartyPopper, CalendarCheck, Search, Plus, X } from 'lucide-react'
import { EVENT_THEME, themeFor, UNSPLASH, FMT } from '../../data/theme'
import { PLANTILLAS, SERVICIO_ICON, TODOS_SERVICIOS } from '../../data/plantillas'
import { Card, CardHeader, BtnPrimary, BtnOutline, Badge, Modal, cls } from '../../components/ui'
import { Confetti } from '../../components/Confetti'
import { usePageHeader } from '../../layouts/pageHeader'

const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11px] text-ink-subtle">{hint}</span>}
    </label>
  )
}

function Toggle({ on }) {
  return (
    <span className={cls('flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors', on ? 'justify-end bg-mint' : 'justify-start bg-gray-200')}>
      <span className="h-4 w-4 rounded-full bg-white" />
    </span>
  )
}

function SwitchRow({ label, hint, on, onToggle }) {
  return (
    <button type="button" onClick={onToggle} className="flex w-full items-center justify-between gap-3 rounded-lg border border-gray-200 px-3.5 py-3 text-left transition-colors hover:border-navy/40">
      <span className="min-w-0">
        <span className="block text-[13px] font-semibold text-ink-strong">{label}</span>
        {hint && <span className="block text-[11px] text-ink-subtle">{hint}</span>}
      </span>
      <Toggle on={on} />
    </button>
  )
}

function Segmented({ options, value, onChange }) {
  return (
    <div className="flex gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
      {options.map((o) => (
        <button type="button" key={o} onClick={() => onChange(o)} className={cls('flex-1 rounded-md px-3 py-1.5 text-[12.5px] font-semibold transition-colors', value === o ? 'border border-gray-200 bg-white text-navy' : 'text-ink-muted hover:text-navy')}>
          {o}
        </button>
      ))}
    </div>
  )
}

export default function CrearEvento() {
  const [modo, setModo] = useState(null) // null | 'facil' | 'avanzado'
  const [exito, setExito] = useState(null) // null | { nombre, tipo, servicios }
  usePageHeader('Crear evento', 'Elige cómo quieres planear tu evento')

  if (exito) return <ExitoCreado data={exito} />
  if (modo === 'facil') return <ModoFacil onBack={() => setModo(null)} onDone={setExito} />
  if (modo === 'avanzado') return <ModoAvanzado onBack={() => setModo(null)} onDone={setExito} />
  return <SeleccionModo onPick={setModo} />
}

/* ── Paso 0: elegir modo ─────────────────────────────────────────────────── */
function SeleccionModo({ onPick }) {
  const navigate = useNavigate()
  const MODOS = [
    { id: 'facil', Icon: Wand2, etiqueta: 'Recomendado', titulo: 'Modo fácil',
      desc: 'Parte de una plantilla según el tipo de evento. Te sugerimos los proveedores que sueles necesitar y te avisamos lo que falta. Solo desactiva lo que no quieras.',
      bullets: ['Plantillas por tipo de evento', 'Proveedores sugeridos automáticamente', 'La plataforma te dice qué falta'],
      panelGrad: 'linear-gradient(155deg,#CDF3A8 0%,#9FE070 100%)', iconWrap: 'bg-navy text-mint', badge: 'bg-navy/12 text-navy' },
    { id: 'avanzado', Icon: SlidersHorizontal, etiqueta: 'Control total', titulo: 'Modo avanzado',
      desc: 'Tú defines cada detalle desde cero: horario, modalidad, privacidad, presupuesto por categoría y servicios. Más completo, para quien sabe lo que quiere.',
      bullets: ['Asistente guiado por pasos', 'Presupuesto por categoría', 'Privacidad, RSVP y servicios a medida'],
      panelGrad: 'linear-gradient(155deg,#1A4A63 0%,#0B334C 100%)', iconWrap: 'bg-white/12 text-mint', badge: 'bg-white/15 text-white' },
  ]
  return (
    <div className="px-7 py-5">
      <button onClick={() => navigate('/organizador/eventos')} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Volver a Mis eventos
      </button>
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-[22px] font-bold tracking-tight text-ink-strong">¿Cómo quieres crear tu evento?</h1>
          <p className="mt-1 text-[13px] text-ink-muted">Puedes empezar guiado o tomar el control de cada detalle.</p>
        </div>
        <div className="flex flex-col gap-4">
          {MODOS.map((m) => (
            <button key={m.id} onClick={() => onPick(m.id)} className="group flex overflow-hidden rounded-xl border border-gray-200 bg-white text-left transition-colors hover:border-navy">
              {/* Panel de color */}
              <div className="flex w-[168px] shrink-0 flex-col justify-between p-5" style={{ backgroundImage: m.panelGrad }}>
                <span className={cls('flex h-12 w-12 items-center justify-center rounded-xl', m.iconWrap)}><m.Icon size={24} strokeWidth={2} /></span>
                <span className={cls('inline-flex w-fit items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10.5px] font-semibold', m.badge)}>{m.etiqueta}</span>
              </div>
              {/* Zona blanca */}
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-[17px] font-bold text-ink-strong">{m.titulo}</h2>
                <p className="mt-1.5 text-[12.5px] leading-relaxed text-ink-muted">{m.desc}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <ul className="flex flex-col gap-2">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[12px] text-ink-body"><Check size={14} strokeWidth={2.6} className="shrink-0 text-navy" /> {b}</li>
                    ))}
                  </ul>
                  <span className="flex items-center gap-1.5 self-end text-[13px] font-semibold text-navy">Empezar <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" /></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Modo fácil ──────────────────────────────────────────────────────────── */
function ModoFacil({ onBack, onDone }) {
  const [plantilla, setPlantilla] = useState(null)
  if (!plantilla) return <ElegirPlantilla onBack={onBack} onPick={setPlantilla} />
  return <ConfigFacil plantilla={plantilla} onBack={() => setPlantilla(null)} onDone={onDone} />
}

function ServicioChip({ cat }) {
  const Icon = SERVICIO_ICON[cat] ?? Sparkles
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[11px] font-medium text-ink-muted">
      <Icon size={11} strokeWidth={2.1} /> {cat}
    </span>
  )
}

function ElegirPlantilla({ onBack, onPick }) {
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [detalle, setDetalle] = useState(null) // plantilla en modal "ver todos"
  const tipos = ['Todos', ...Object.keys(EVENT_THEME)]
  const lista = PLANTILLAS.filter((p) => (filtro === 'Todos' || p.tipo === filtro) && p.nombre.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="px-7 py-5">
      <button onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Cambiar de modo
      </button>
      <div className="mx-auto max-w-6xl">
        <div className="mb-5 text-center">
          <h1 className="text-[20px] font-bold tracking-tight text-ink-strong">Elige una plantilla</h1>
          <p className="mt-0.5 text-[13px] text-ink-muted">Cargamos los proveedores típicos de ese evento. Podrás ajustarlos después.</p>
        </div>

        {/* Búsqueda + filtros por tipo */}
        <div className="mb-6 flex flex-col items-center gap-3">
          <div className="relative w-full max-w-md">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar plantilla (boda, gala, XV…)" className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {tipos.map((t) => (
              <button key={t} onClick={() => setFiltro(t)} className={cls('rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-colors', filtro === t ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{t}</button>
            ))}
          </div>
        </div>

        {/* Grid de plantillas */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((p) => {
            const t = themeFor(p.tipo)
            const visibles = p.servicios.slice(0, 3)
            const resto = p.servicios.length - visibles.length
            return (
              <div key={p.id} className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-colors hover:border-navy/50">
                <button onClick={() => onPick(p)} className="relative block h-32 w-full overflow-hidden text-left">
                  <img src={UNSPLASH(p.img, 600)} alt={p.nombre} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg,transparent 38%,rgba(11,51,76,.62))' }} />
                  <span className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-md text-white" style={{ backgroundImage: t.grad }}><t.Icon size={13} strokeWidth={2.3} /></span>
                  <span className="absolute bottom-2.5 left-3 text-[14px] font-bold text-white">{p.nombre}</span>
                </button>
                <div className="flex flex-1 flex-col p-3.5">
                  <p className="text-[12px] leading-snug text-ink-muted">{p.desc}</p>
                  <div className="mt-2.5 flex items-center gap-3 text-[11px] text-ink-subtle">
                    <span>{p.invitados} invitados</span>
                    <span className="h-1 w-1 rounded-full bg-gray-300" />
                    <span>{FMT.format(p.presupuesto)}</span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {visibles.map((s) => <ServicioChip key={s.cat} cat={s.cat} />)}
                    {resto > 0 && (
                      <button onClick={() => setDetalle(p)} className="inline-flex items-center rounded-full bg-navy/8 px-2 py-0.5 text-[11px] font-semibold text-navy transition-colors hover:bg-navy/15">+{resto} más</button>
                    )}
                  </div>
                  <div className="mt-auto flex items-center gap-2 pt-3.5">
                    <BtnPrimary onClick={() => onPick(p)} className="flex-1">Usar plantilla</BtnPrimary>
                    <BtnOutline onClick={() => setDetalle(p)} className="px-3">Ver todos</BtnOutline>
                  </div>
                </div>
              </div>
            )
          })}
          {lista.length === 0 && <p className="col-span-full py-12 text-center text-[13px] text-ink-muted">No hay plantillas que coincidan con tu búsqueda.</p>}
        </div>
      </div>

      {/* Modal: todos los proveedores de la plantilla */}
      <Modal open={!!detalle} onClose={() => setDetalle(null)} title={detalle ? `${detalle.nombre} · ${detalle.servicios.length} proveedores` : ''}
        footer={detalle && <div className="flex justify-end gap-2"><BtnOutline onClick={() => setDetalle(null)}>Cerrar</BtnOutline><BtnPrimary onClick={() => { onPick(detalle); setDetalle(null) }}><Sparkles size={15} /> Usar plantilla</BtnPrimary></div>}>
        {detalle && (
          <div className="grid grid-cols-1 gap-2 p-5 sm:grid-cols-2">
            {detalle.servicios.map((s) => {
              const Icon = SERVICIO_ICON[s.cat] ?? Sparkles
              return (
                <div key={s.cat} className="flex items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-navy text-mint"><Icon size={15} strokeWidth={2.1} /></span>
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-strong">{s.cat}{s.esencial && <Badge tone="mint">Esencial</Badge>}</span>
                </div>
              )
            })}
          </div>
        )}
      </Modal>
    </div>
  )
}

function ConfigFacil({ plantilla, onBack, onDone }) {
  const t = themeFor(plantilla.tipo)
  const [nombre, setNombre] = useState('')
  const [activos, setActivos] = useState(() => Object.fromEntries(plantilla.servicios.map((s) => [s.cat, true])))
  const toggle = (cat) => setActivos((p) => ({ ...p, [cat]: !p[cat] }))

  const total = plantilla.servicios.length
  const seleccionados = plantilla.servicios.filter((s) => activos[s.cat])
  const faltantes = plantilla.servicios.filter((s) => s.esencial && !activos[s.cat])

  const submit = (e) => { e.preventDefault(); onDone({ nombre: nombre || plantilla.nombre, tipo: plantilla.tipo, servicios: seleccionados.length }) }

  return (
    <form onSubmit={submit} className="flex min-h-full flex-col px-7 py-5">
      <button type="button" onClick={onBack} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Elegir otra plantilla
      </button>
      <div className="mx-auto grid w-full max-w-4xl flex-1 items-stretch gap-5 lg:grid-cols-2">
        {/* Columna: datos del evento */}
        <div className="flex flex-col gap-5">
          <Card className="flex flex-1 flex-col">
            <div className="relative h-28 w-full overflow-hidden rounded-t-lg">
              <img src={UNSPLASH(plantilla.img, 800)} alt={plantilla.nombre} className="h-full w-full object-cover" />
              <span className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg,transparent 30%,rgba(11,51,76,.7))' }} />
              <div className="absolute bottom-3 left-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-md text-white" style={{ backgroundImage: t.grad }}><t.Icon size={13} strokeWidth={2.3} /></span>
                <span className="text-[13px] font-bold text-white">Plantilla: {plantilla.nombre}</span>
              </div>
            </div>
            <div className="flex flex-col gap-5 p-5">
              <Field label="Nombre del evento"><input className={inputCls} value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={`Ej. ${plantilla.nombre} de Ana`} /></Field>
              <div className="grid grid-cols-2 gap-5">
                <Field label="Fecha"><input type="date" className={inputCls} /></Field>
                <Field label="Invitados"><input type="number" className={inputCls} defaultValue={plantilla.invitados} /></Field>
              </div>
              <Field label="Ubicación"><input className={inputCls} placeholder="Ciudad o lugar del evento" /></Field>
              <Field label="Presupuesto estimado (MXN)" hint="Lo ajustarás por categoría más adelante."><input type="number" className={inputCls} defaultValue={plantilla.presupuesto} /></Field>
            </div>
          </Card>
          <div className="rounded-lg border border-gray-200 bg-offwhite px-4 py-3 text-[12px] text-ink-muted">
            Plan basado en <strong className="text-ink-strong">{plantilla.nombre}</strong> · {seleccionados.length} de {total} proveedores activos.
          </div>
        </div>

        {/* Columna: proveedores sugeridos */}
        <div className="flex flex-col gap-5">
          <Card className="flex flex-1 flex-col">
            <CardHeader title="Proveedores sugeridos" action={<span className="text-[12px] font-semibold text-navy">{seleccionados.length}/{total} activos</span>} />
            <div className="flex flex-col gap-2 p-4">
              {plantilla.servicios.map((s) => {
                const Icon = SERVICIO_ICON[s.cat] ?? Sparkles
                const on = activos[s.cat]
                return (
                  <button type="button" key={s.cat} onClick={() => toggle(s.cat)} className={cls('flex items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition-colors', on ? 'border-navy/30 bg-navy/[0.03]' : 'border-gray-200 bg-white opacity-60')}>
                    <span className={cls('flex h-8 w-8 shrink-0 items-center justify-center rounded-lg', on ? 'bg-navy text-mint' : 'bg-gray-100 text-ink-subtle')}><Icon size={15} strokeWidth={2.1} /></span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5"><span className="text-[13px] font-semibold text-ink-strong">{s.cat}</span>{s.esencial && <Badge tone="mint">Esencial</Badge>}</span>
                      <span className="text-[11px] text-ink-subtle">{on ? 'Incluido en tu plan' : 'Desactivado'}</span>
                    </span>
                    <Toggle on={on} />
                  </button>
                )
              })}
            </div>
          </Card>

          {faltantes.length > 0 ? (
            <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3">
              <AlertCircle size={17} className="mt-0.5 shrink-0 text-amber-500" />
              <p className="text-[12px] leading-relaxed text-amber-700">Desactivaste {faltantes.length} servicio{faltantes.length > 1 ? 's' : ''} que solemos recomendar: <strong>{faltantes.map((f) => f.cat).join(', ')}</strong>. Puedes seguir igual, pero quizás los necesites.</p>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
              <Check size={17} className="mt-0.5 shrink-0 text-green-600" strokeWidth={2.6} />
              <p className="text-[12px] leading-relaxed text-green-700">Tu plan cubre todos los proveedores esenciales para una {plantilla.nombre.toLowerCase()}. ¡Listo para crear!</p>
            </div>
          )}
        </div>
      </div>

      {/* Barra de acción fija — CTA destacado */}
      <div className="sticky bottom-0 z-20 -mx-7 mt-6 border-t border-gray-200 bg-white/95 px-7 py-3.5 backdrop-blur">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[13px]">
            {faltantes.length > 0 ? (
              <><AlertCircle size={16} className="text-amber-500" /><span className="text-ink-muted">Faltan <strong className="text-ink-strong">{faltantes.length}</strong> esencial{faltantes.length > 1 ? 'es' : ''} · {seleccionados.length} proveedores activos</span></>
            ) : (
              <><Check size={16} strokeWidth={2.6} className="text-green-600" /><span className="text-ink-muted"><strong className="text-ink-strong">{seleccionados.length} proveedores</strong> listos en tu plan</span></>
            )}
          </div>
          <div className="flex items-center gap-3">
            <BtnOutline onClick={onBack}>Atrás</BtnOutline>
            <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-mint px-7 text-[15px] font-bold text-navy transition-colors hover:bg-[#aee584]">
              <Sparkles size={17} strokeWidth={2.3} /> Crear evento
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

/* ── Modo avanzado (asistente por pasos) ─────────────────────────────────── */
const STEPS = [
  { n: 1, label: 'General' },
  { n: 2, label: 'Fecha y lugar' },
  { n: 3, label: 'Invitados' },
  { n: 4, label: 'Presupuesto y servicios' },
]

function ModoAvanzado({ onBack, onDone }) {
  const [paso, setPaso] = useState(1)
  const [f, setF] = useState({
    nombre: '', tipo: 'Boda', descripcion: '', privado: false,
    fecha: '', horaInicio: '', horaFin: '', variosDias: false, fechaFin: '',
    ubicacion: '', modalidad: 'Presencial',
    invitados: '', rsvp: true, acompanantes: false, listaEspera: false, vestimenta: '',
    presupuesto: '', servicios: ['Locación', 'Catering'], porCategoria: false, montos: {},
  })
  const set = (k, v) => setF((p) => ({ ...p, [k]: v }))
  const [nuevoServicio, setNuevoServicio] = useState('')

  const toggleServicio = (s) => set('servicios', f.servicios.includes(s) ? f.servicios.filter((x) => x !== s) : [...f.servicios, s])
  const addServicio = () => { const v = nuevoServicio.trim(); if (v && !f.servicios.includes(v)) set('servicios', [...f.servicios, v]); setNuevoServicio('') }
  const setMonto = (s, v) => set('montos', { ...f.montos, [s]: v })
  const sumaCategorias = Object.values(f.montos).reduce((a, b) => a + (Number(b) || 0), 0)

  const next = () => setPaso((p) => Math.min(4, p + 1))
  const prev = () => (paso === 1 ? onBack() : setPaso((p) => p - 1))
  const submit = () => onDone({ nombre: f.nombre || `Nuevo evento ${f.tipo}`, tipo: f.tipo, servicios: f.servicios.length })

  return (
    <div className="px-7 py-5">
      <button onClick={prev} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> {paso === 1 ? 'Cambiar de modo' : 'Paso anterior'}
      </button>
      <div className="mx-auto max-w-2xl">
        {/* Stepper */}
        <div className="mb-6 flex items-center">
          {STEPS.map((s, i) => {
            const done = paso > s.n
            const activo = paso === s.n
            return (
              <div key={s.n} className="flex flex-1 items-center last:flex-none">
                <div className="flex items-center gap-2">
                  <span className={cls('flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold transition-colors', done ? 'bg-navy text-mint' : activo ? 'bg-navy text-white' : 'border border-gray-300 bg-white text-ink-subtle')}>
                    {done ? <Check size={14} strokeWidth={3} /> : s.n}
                  </span>
                  <span className={cls('hidden text-[12px] font-semibold sm:block', activo || done ? 'text-ink-strong' : 'text-ink-subtle')}>{s.label}</span>
                </div>
                {i < STEPS.length - 1 && <span className={cls('mx-2 h-px flex-1', paso > s.n ? 'bg-navy' : 'bg-gray-200')} />}
              </div>
            )
          })}
        </div>

        <Card>
          <CardHeader title={`Paso ${paso} de 4 · ${STEPS[paso - 1].label}`} />
          <div className="flex flex-col gap-5 p-5">
            {paso === 1 && (
              <>
                <Field label="Nombre del evento"><input className={inputCls} value={f.nombre} onChange={(e) => set('nombre', e.target.value)} placeholder="Ej. Boda Martínez & López" /></Field>
                <Field label="Tipo de evento">
                  <div className="grid grid-cols-3 gap-2.5">
                    {Object.entries(EVENT_THEME).map(([n, th]) => (
                      <button type="button" key={n} onClick={() => set('tipo', n)} className={cls('flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[13px] font-semibold transition-colors', f.tipo === n ? 'border-navy bg-navy/5 text-navy' : 'border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>
                        <span className="flex h-7 w-7 items-center justify-center rounded-md text-white" style={{ backgroundImage: th.grad }}><th.Icon size={14} strokeWidth={2.2} /></span>{n}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Descripción" hint="Una breve nota sobre el evento (opcional).">
                  <textarea rows={3} className={cls(inputCls, 'h-auto resize-none py-2.5')} value={f.descripcion} onChange={(e) => set('descripcion', e.target.value)} placeholder="Detalles, tema o cualquier indicación relevante…" />
                </Field>
                <SwitchRow label="Evento privado" hint="Solo visible para ti y tus invitados con enlace." on={f.privado} onToggle={() => set('privado', !f.privado)} />
              </>
            )}

            {paso === 2 && (
              <>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  <Field label="Fecha"><input type="date" className={inputCls} value={f.fecha} onChange={(e) => set('fecha', e.target.value)} /></Field>
                  <Field label="Hora inicio"><input type="time" className={inputCls} value={f.horaInicio} onChange={(e) => set('horaInicio', e.target.value)} /></Field>
                  <Field label="Hora fin"><input type="time" className={inputCls} value={f.horaFin} onChange={(e) => set('horaFin', e.target.value)} /></Field>
                </div>
                <SwitchRow label="Evento de varios días" hint="Activa si abarca más de una jornada." on={f.variosDias} onToggle={() => set('variosDias', !f.variosDias)} />
                {f.variosDias && <Field label="Fecha de fin"><input type="date" className={inputCls} value={f.fechaFin} onChange={(e) => set('fechaFin', e.target.value)} /></Field>}
                <Field label="Modalidad"><Segmented options={['Presencial', 'Híbrido', 'Virtual']} value={f.modalidad} onChange={(v) => set('modalidad', v)} /></Field>
                {f.modalidad !== 'Virtual' && <Field label="Ubicación"><input className={inputCls} value={f.ubicacion} onChange={(e) => set('ubicacion', e.target.value)} placeholder="Ciudad o lugar del evento" /></Field>}
              </>
            )}

            {paso === 3 && (
              <>
                <Field label="Número de invitados"><input type="number" className={inputCls} value={f.invitados} onChange={(e) => set('invitados', e.target.value)} placeholder="Ej. 250" /></Field>
                <Field label="Código de vestimenta" hint="Opcional — aparecerá en las invitaciones."><input className={inputCls} value={f.vestimenta} onChange={(e) => set('vestimenta', e.target.value)} placeholder="Ej. Formal, Coctel, Temático…" /></Field>
                <div className="flex flex-col gap-2.5">
                  <SwitchRow label="Confirmación de asistencia (RSVP)" hint="Pide a los invitados confirmar si asistirán." on={f.rsvp} onToggle={() => set('rsvp', !f.rsvp)} />
                  <SwitchRow label="Permitir acompañantes" hint="Los invitados pueden traer un +1." on={f.acompanantes} onToggle={() => set('acompanantes', !f.acompanantes)} />
                  <SwitchRow label="Lista de espera" hint="Acepta invitados extra si se liberan lugares." on={f.listaEspera} onToggle={() => set('listaEspera', !f.listaEspera)} />
                </div>
              </>
            )}

            {paso === 4 && (
              <>
                <Field label="Presupuesto total (MXN)"><input type="number" className={inputCls} value={f.presupuesto} onChange={(e) => set('presupuesto', e.target.value)} placeholder="Ej. 280000" /></Field>
                <Field label="Servicios que necesitas" hint="Selecciona todos los que apliquen.">
                  <div className="flex flex-wrap gap-2">
                    {f.servicios.filter((s) => !TODOS_SERVICIOS.includes(s)).map((s) => (
                      <span key={s} className="inline-flex items-center gap-1.5 rounded-full border border-navy bg-navy px-3 py-1.5 text-[12px] font-semibold text-white">
                        {s}<button type="button" onClick={() => toggleServicio(s)} className="opacity-80 hover:opacity-100"><X size={12} strokeWidth={3} /></button>
                      </span>
                    ))}
                    {TODOS_SERVICIOS.map((s) => {
                      const on = f.servicios.includes(s)
                      const Icon = SERVICIO_ICON[s] ?? Sparkles
                      return (
                        <button type="button" key={s} onClick={() => toggleServicio(s)} className={cls('inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors', on ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>
                          {on ? <Check size={12} strokeWidth={3} /> : <Icon size={13} strokeWidth={2.1} />}{s}
                        </button>
                      )
                    })}
                  </div>
                  <div className="mt-2.5 flex gap-2">
                    <input value={nuevoServicio} onChange={(e) => setNuevoServicio(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addServicio() } }} placeholder="Añadir servicio personalizado…" className={cls(inputCls, 'h-9')} />
                    <BtnOutline onClick={addServicio} className="shrink-0 px-3"><Plus size={14} /> Añadir</BtnOutline>
                  </div>
                </Field>

                <SwitchRow label="Asignar presupuesto por categoría" hint="Reparte el total entre cada servicio para controlar gastos." on={f.porCategoria} onToggle={() => set('porCategoria', !f.porCategoria)} />
                {f.porCategoria && (
                  <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-3">
                    {f.servicios.map((s) => {
                      const Icon = SERVICIO_ICON[s] ?? Sparkles
                      return (
                        <div key={s} className="flex items-center gap-3">
                          <span className="flex min-w-0 flex-1 items-center gap-2 text-[12.5px] font-semibold text-ink-strong"><Icon size={14} strokeWidth={2.1} className="shrink-0 text-navy" /> {s}</span>
                          <div className="relative w-36">
                            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-subtle">$</span>
                            <input type="number" value={f.montos[s] || ''} onChange={(e) => setMonto(s, e.target.value)} placeholder="0" className={cls(inputCls, 'h-9 pl-5 text-right')} />
                          </div>
                        </div>
                      )
                    })}
                    <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-2 text-[12.5px]">
                      <span className="font-semibold text-ink-strong">Asignado</span>
                      <span className={cls('font-bold', f.presupuesto && sumaCategorias > Number(f.presupuesto) ? 'text-red-500' : 'text-navy')}>
                        {FMT.format(sumaCategorias)}{f.presupuesto ? ` / ${FMT.format(Number(f.presupuesto))}` : ''}
                      </span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div className="flex items-center justify-between border-t border-gray-100 px-5 py-4">
            <BtnOutline onClick={prev}>{paso === 1 ? 'Cancelar' : 'Atrás'}</BtnOutline>
            {paso < 4 ? <BtnPrimary onClick={next}>Siguiente <ArrowRight size={15} /></BtnPrimary> : <BtnPrimary onClick={submit}><Sparkles size={15} /> Crear evento</BtnPrimary>}
          </div>
        </Card>
      </div>
    </div>
  )
}

/* ── Pantalla de éxito (con confeti) ─────────────────────────────────────── */
function ExitoCreado({ data }) {
  const navigate = useNavigate()
  const t = themeFor(data.tipo)
  return (
    <div className="relative flex min-h-[78vh] items-center justify-center px-6 py-10">
      <Confetti />
      <div className="relative z-10 mx-auto flex max-w-md flex-col items-center text-center">
        <span className="t-pop mb-5 flex h-20 w-20 items-center justify-center rounded-2xl text-white" style={{ backgroundImage: t.grad }}><PartyPopper size={38} strokeWidth={2} /></span>
        <h1 className="text-[24px] font-bold tracking-tight text-ink-strong">¡Evento creado!</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">
          <strong className="text-ink-strong">{data.nombre}</strong> ya está en tu panel con {data.servicios} proveedor{data.servicios !== 1 ? 'es' : ''} por gestionar. Empieza a contactar proveedores y a cuadrar tu presupuesto.
        </p>
        <div className="mt-6 flex flex-col items-stretch gap-2.5 sm:flex-row">
          <BtnPrimary onClick={() => navigate('/organizador/eventos/1')}><CalendarCheck size={16} /> Ir al evento</BtnPrimary>
          <BtnOutline onClick={() => navigate('/organizador/eventos')}>Ver mis eventos</BtnOutline>
        </div>
      </div>
    </div>
  )
}
