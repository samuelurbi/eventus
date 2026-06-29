import { Link } from 'react-router-dom'
import {
  CalendarDays, Users, Wallet, MessageSquare, ArrowRight,
  TrendingUp, TrendingDown, MessageCircle, UserCheck, CreditCard, Calendar, FileText,
  Heart, Briefcase, PartyPopper, MapPin, ChevronRight,
  Plus, Search, Upload,
} from 'lucide-react'
import { EVENTOS, MENSAJES, TAREAS, ACTIVIDAD, SPARKLINES } from '../../data/mock'
import { usePageHeader } from '../../layouts/pageHeader'

const FMT = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 })

// ── Identidad visual por tipo de evento ──────────────────────────────────────
const UNSPLASH = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
const EVENT_THEME = {
  Boda:        { grad: 'linear-gradient(135deg,#FB7BA8 0%,#E84B8A 100%)', Icon: Heart,       chip: 'bg-rose-50 text-rose-600',     img: '1519741497674-611481863552' },
  Corporativo: { grad: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)', Icon: Briefcase,   chip: 'bg-navy/8 text-navy',          img: '1505373877841-8d25f7d46678' },
  Fiesta:      { grad: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)', Icon: PartyPopper, chip: 'bg-violet-50 text-violet-600', img: '1530103862676-de8c9debad1d' },
}
const themeFor = (tipo) => EVENT_THEME[tipo] ?? EVENT_THEME.Corporativo

const MESES = { ene: 0, feb: 1, mar: 2, abr: 3, may: 4, jun: 5, jul: 6, ago: 7, sep: 8, oct: 9, nov: 10, dic: 11 }
function diasRestantes(fechaStr) {
  const [d, m, y] = fechaStr.split(' ')
  const fecha = new Date(Number(y), MESES[(m || '').toLowerCase()] ?? 0, Number(d))
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0)
  return Math.max(0, Math.round((fecha - hoy) / 86_400_000))
}

// ── Sparkline SVG a ancho completo (se estira al contenedor) ─────────────────
function Sparkline({ data, color = '#BCEE95', h = 44 }) {
  const w = 100 // unidades del viewBox; el SVG se estira con preserveAspectRatio=none
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const step = w / (data.length - 1)
  const pts = data.map((v, i) => `${i * step},${h - ((v - min) / range) * (h - 8) - 4}`)
  const area = `M${pts[0]} ` + pts.slice(1).map((p) => `L${p}`).join(' ') + ` L${w},${h} L0,${h} Z`
  const line = `M${pts[0]} ` + pts.slice(1).map((p) => `L${p}`).join(' ')
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" fill="none" aria-hidden="true" className="block">
      <path d={area} fill={color} fillOpacity="0.16" />
      <path d={line} stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
    </svg>
  )
}

// ── Próximo evento — card ancla ──────────────────────────────────────────────
function FeaturedEvent({ evento }) {
  const t = themeFor(evento.tipo)
  const dias = diasRestantes(evento.fecha)
  const pct = Math.round((evento.gastado / evento.presupuesto) * 100)
  return (
    <Link
      to={`/organizador/eventos/${evento.id}`}
      className="group flex rounded-xl border border-gray-200 bg-white p-1.5 hover:border-navy/40 transition-colors"
    >
      {/* Imagen a la izquierda — llena la altura, 34% de ancho */}
      <div className="relative w-[34%] shrink-0 overflow-hidden rounded-lg" style={{ backgroundImage: t.grad }}>
        <img
          src={UNSPLASH(t.img, 700)}
          alt={evento.tipo}
          onError={(e) => { e.currentTarget.style.display = 'none' }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Overlay para legibilidad del texto */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg,rgba(11,51,76,0.30) 0%,rgba(11,51,76,0) 42%,rgba(11,51,76,0.74) 100%)' }} />
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
          <t.Icon size={12} strokeWidth={2.4} /> {evento.tipo}
        </span>
        <div className="absolute bottom-3 left-3 z-10 text-white drop-shadow">
          <p className="text-[34px] font-bold leading-none">{dias}</p>
          <p className="mt-0.5 text-[12px] font-semibold">días restantes</p>
        </div>
      </div>

      {/* Contenido a la derecha */}
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 px-4 py-3.5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy">Próximo evento</span>
          <h3 className="mt-1 text-[18px] font-bold leading-tight text-ink-strong">{evento.nombre}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-[12px] text-ink-muted">
            <MapPin size={13} strokeWidth={1.9} /> {evento.lugar}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-muted">
            <CalendarDays size={13} strokeWidth={1.9} /> {evento.fecha}
          </p>
        </div>
        <div>
          <div className="mb-1.5 flex items-center justify-between text-[12px]">
            <span className="font-medium text-ink-muted">Presupuesto ejecutado</span>
            <span className="font-semibold text-ink-strong">{pct}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-ink-subtle">
            {FMT.format(evento.gastado)} de {FMT.format(evento.presupuesto)} · {evento.proveedores} proveedores
          </p>
        </div>
        <div className="flex items-center justify-end">
          <span className="flex items-center gap-1 text-[13px] font-semibold text-navy transition-all group-hover:gap-2">
            Ver evento <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── KPI ──────────────────────────────────────────────────────────────────────
function MiniStat({ icon, label, value, trend, trendUp = true, sparkKey, to }) {
  return (
    <Link
      to={to}
      className="group relative flex min-h-[124px] flex-col overflow-hidden rounded-lg border border-gray-200 bg-white hover:border-navy/40 transition-colors"
    >
      <div className="flex items-start justify-between p-4 pb-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-navy">{icon}</span>
        {trend && (
          <span className={`flex items-center gap-0.5 text-[11px] font-semibold ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
            {trendUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}{trend}
          </span>
        )}
      </div>
      <div className="px-4 pt-2.5">
        <p className="text-[30px] font-bold leading-none tracking-tight text-ink-strong">{value}</p>
        <p className="mt-1.5 text-[11.5px] font-medium text-ink-muted">{label}</p>
      </div>
      {sparkKey && (
        <div className="mt-auto h-11 w-full">
          <Sparkline data={SPARKLINES[sparkKey]} />
        </div>
      )}
    </Link>
  )
}

// ── Badge de estado ──────────────────────────────────────────────────────────
function EstadoBadge({ estado }) {
  const styles = {
    'En curso':      'bg-mint/25 text-navy',
    'Planificación': 'bg-navy/8 text-navy',
    'Completado':    'bg-gray-100 text-ink-muted',
  }
  return (
    <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${styles[estado] ?? 'bg-gray-100 text-ink-muted'}`}>
      {estado}
    </span>
  )
}

// ── Fila de evento con identidad de color ────────────────────────────────────
function EventRow({ e }) {
  const t = themeFor(e.tipo)
  const pct = Math.round((e.gastado / e.presupuesto) * 100)
  return (
    <Link to={`/organizador/eventos/${e.id}`} className="group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50">
      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg transition-transform group-hover:scale-105" style={{ backgroundImage: t.grad }}>
        <img
          src={UNSPLASH(t.img, 200)}
          alt={e.tipo}
          onError={(e2) => { e2.currentTarget.style.display = 'none' }}
          className="h-full w-full object-cover"
        />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="truncate text-[13.5px] font-semibold text-ink-strong">{e.nombre}</p>
          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.chip}`}>{e.tipo}</span>
        </div>
        <p className="mt-0.5 flex items-center gap-1 truncate text-[11.5px] text-ink-subtle">
          <MapPin size={11} strokeWidth={1.9} /> {e.lugar} · {e.fecha}
        </p>
      </div>
      <div className="hidden w-36 shrink-0 lg:block">
        <div className="mb-1 flex items-baseline justify-between text-[11px]">
          <span className="font-semibold text-ink-body">{pct}%</span>
          <span className="text-ink-subtle">{e.proveedores} prov.</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundImage: t.grad }} />
        </div>
      </div>
      <EstadoBadge estado={e.estado} />
      <ChevronRight size={16} className="shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-ink-muted" />
    </Link>
  )
}

// ── Presupuesto por evento — barras horizontales ─────────────────────────────
function BudgetChart({ eventos }) {
  const maxVal = Math.max(...eventos.map((e) => e.presupuesto))
  const totalPresupuesto = eventos.reduce((s, e) => s + e.presupuesto, 0)
  const totalGastado = eventos.reduce((s, e) => s + e.gastado, 0)
  const pctTotal = Math.round((totalGastado / totalPresupuesto) * 100)

  return (
    <div>
      {/* Resumen */}
      <div className="mb-4 flex items-end justify-between rounded-lg bg-offwhite px-4 py-3">
        <div>
          <p className="text-[11px] font-medium text-ink-muted">Total ejecutado</p>
          <p className="text-[20px] font-bold leading-tight tracking-tight text-ink-strong">
            {FMT.format(totalGastado)} <span className="text-[12px] font-medium text-ink-subtle">/ {FMT.format(totalPresupuesto)}</span>
          </p>
        </div>
        <span className="rounded-full bg-navy/8 px-2.5 py-1 text-[12px] font-bold text-navy">{pctTotal}%</span>
      </div>

      {/* Barras por evento */}
      <div className="flex flex-col gap-3.5">
        {eventos.map((e) => {
          const t = themeFor(e.tipo)
          const widthTotal = (e.presupuesto / maxVal) * 100
          const pctGastado = Math.round((e.gastado / e.presupuesto) * 100)
          return (
            <div key={e.id}>
              <div className="mb-1.5 flex items-center justify-between text-[12px]">
                <span className="flex items-center gap-2 font-medium text-ink-body">
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundImage: t.grad }} />
                  <span className="truncate">{e.nombre}</span>
                </span>
                <span className="shrink-0 whitespace-nowrap text-ink-muted">
                  {FMT.format(e.gastado)} <span className="text-ink-subtle">/ {FMT.format(e.presupuesto)}</span>
                </span>
              </div>
              {/* el largo de la barra = presupuesto relativo al mayor; relleno = ejecutado */}
              <div className="h-2.5 w-full">
                <div className="h-full overflow-hidden rounded-full bg-gray-200" style={{ width: `${widthTotal}%` }}>
                  <div className="h-full rounded-full" style={{ width: `${pctGastado}%`, backgroundImage: t.grad }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex items-center gap-5 border-t border-gray-100 pt-3 text-[11.5px] text-ink-muted">
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-navy" />Ejecutado</span>
        <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-gray-200" />Presupuesto asignado</span>
        <span className="ml-auto text-ink-subtle">El ancho refleja el tamaño del presupuesto</span>
      </div>
    </div>
  )
}

// ── Icono de actividad ───────────────────────────────────────────────────────
const ACTIVITY_ICONS = {
  msg:    <MessageCircle size={14} strokeWidth={1.8} />,
  user:   <UserCheck size={14} strokeWidth={1.8} />,
  wallet: <CreditCard size={14} strokeWidth={1.8} />,
  cal:    <Calendar size={14} strokeWidth={1.8} />,
  file:   <FileText size={14} strokeWidth={1.8} />,
}

// ── Título de sección con acento ─────────────────────────────────────────────
function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
      <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong">
        <span className="h-3.5 w-[3px] rounded-full bg-navy" />{children}
      </h2>
      {action}
    </div>
  )
}

// ── Acciones rápidas (rail sticky) ───────────────────────────────────────────
const QUICK_ACTIONS = [
  { icon: Search, label: 'Buscar proveedor', to: '/organizador/proveedores' },
  { icon: CreditCard, label: 'Registrar pago', to: '/organizador/presupuesto' },
  { icon: Upload, label: 'Subir documento', to: '/organizador/documentos' },
  { icon: MessageSquare, label: 'Enviar mensaje', to: '/organizador/mensajes' },
]
function QuickActions() {
  return (
    <div className="sticky top-5">
      <section className="rounded-lg border border-gray-200 bg-white p-3">
        <p className="mb-2.5 flex items-center gap-2 px-1 text-[14px] font-bold text-ink-strong">
          <span className="h-3.5 w-[3px] rounded-full bg-navy" />Acciones rápidas
        </p>
        <Link
          to="/organizador/eventos/nuevo"
          className="mb-2 flex items-center justify-center gap-2 rounded-lg bg-mint px-3 py-2.5 text-[13px] font-semibold text-navy transition-colors hover:bg-[#aee584]"
        >
          <Plus size={15} strokeWidth={2.6} /> Nuevo evento
        </Link>
        <div className="flex flex-col gap-0.5">
          {QUICK_ACTIONS.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="group flex items-center gap-2.5 rounded-lg px-2 py-2 text-[13px] font-medium text-ink-body transition-colors hover:bg-gray-50"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-offwhite text-navy transition-colors group-hover:bg-mint/20">
                <a.icon size={15} strokeWidth={1.9} />
              </span>
              <span className="whitespace-nowrap">{a.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

// ── Main ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const pendientes = TAREAS.filter((t) => !t.hecho)
  const noLeidos = MENSAJES.filter((m) => !m.leido).length
  const proximo = EVENTOS.find((e) => e.estado === 'En curso') ?? EVENTOS[0]
  usePageHeader('Buenos días, Samuel', `${pendientes.length} tareas pendientes · ${noLeidos} mensajes sin leer`)

  return (
    <div className="px-7 py-5">
      {/* Zona superior: evento destacado + KPIs */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_minmax(360px,38%)]">
        <FeaturedEvent evento={proximo} />
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <MiniStat icon={<CalendarDays size={17} strokeWidth={1.8} />} label="Eventos activos" value="3" trend="+1" trendUp sparkKey="eventos" to="/organizador/eventos" />
          <MiniStat icon={<Users size={17} strokeWidth={1.8} />} label="Proveedores" value="16" trend="+2" trendUp sparkKey="proveedores" to="/organizador/proveedores" />
          <MiniStat icon={<Wallet size={17} strokeWidth={1.8} />} label="Presupuesto" value="$358K" trend="32%" trendUp sparkKey="presupuesto" to="/organizador/presupuesto" />
          <MiniStat icon={<MessageSquare size={17} strokeWidth={1.8} />} label="Sin leer" value={`${noLeidos}`} trend="2 urgentes" trendUp={false} sparkKey="mensajes" to="/organizador/mensajes" />
        </div>
      </div>

      {/* Cuerpo principal — tres columnas (contenido + listas + acciones sticky) */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr_300px]">

        {/* Columna izquierda */}
        <div className="flex flex-col gap-5">
          {/* Lista de eventos */}
          <section className="rounded-lg border border-gray-200 bg-white">
            <SectionTitle action={
              <Link to="/organizador/eventos" className="flex items-center gap-1 text-[12px] font-semibold text-navy hover:underline">
                Ver todos <ArrowRight size={13} />
              </Link>
            }>Mis eventos</SectionTitle>
            <div className="divide-y divide-gray-100">
              {EVENTOS.map((e) => <EventRow key={e.id} e={e} />)}
            </div>
          </section>

          {/* Bar chart */}
          <section className="flex-1 rounded-lg border border-gray-200 bg-white p-5">
            <div className="mb-4">
              <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong">
                <span className="h-3.5 w-[3px] rounded-full bg-navy" />Presupuesto por evento
              </h2>
              <p className="mt-1 pl-[11px] text-[12px] text-ink-muted">Comparación de gasto vs total asignado</p>
            </div>
            <BudgetChart eventos={EVENTOS} />
          </section>
        </div>

        {/* Columna derecha */}
        <div className="flex flex-col gap-5">
          {/* Actividad reciente */}
          <section className="rounded-lg border border-gray-200 bg-white">
            <SectionTitle>Actividad reciente</SectionTitle>
            <div className="divide-y divide-gray-100">
              {ACTIVIDAD.map((a) => (
                <div key={a.id} className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-offwhite text-ink-muted">
                    {ACTIVITY_ICONS[a.icon]}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] leading-snug text-ink-body">{a.texto}</p>
                    <p className="mt-0.5 text-[11px] text-ink-subtle">{a.tiempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Próximas tareas */}
          <section className="flex-1 rounded-lg border border-gray-200 bg-white">
            <SectionTitle action={
              <span className="rounded-full bg-mint/25 px-2 py-0.5 text-[10px] font-bold text-navy">{pendientes.length}</span>
            }>Próximas tareas</SectionTitle>
            <div className="divide-y divide-gray-100 px-5">
              {pendientes.map((t) => (
                <div key={t.id} className="flex items-center gap-3 py-3">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-medium leading-snug text-ink-body">{t.texto}</p>
                    <p className="text-[11px] text-ink-subtle">{t.evento}</p>
                  </div>
                  <span className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-ink-muted">{t.fecha}</span>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Columna 3: acciones rápidas (sticky) + mensajes */}
        <div className="flex flex-col gap-5">
          <QuickActions />

          {/* Mensajes sin leer */}
          <section className="flex-1 rounded-lg border border-gray-200 bg-white">
            <SectionTitle action={
              <Link to="/organizador/mensajes" className="flex items-center gap-1 text-[12px] font-semibold text-navy hover:underline">
                Ver todos <ArrowRight size={13} />
              </Link>
            }>Mensajes</SectionTitle>
            <div className="divide-y divide-gray-100">
              {MENSAJES.filter((m) => !m.leido).map((m) => (
                <div key={m.id} className="flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50 cursor-pointer">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                    {m.de.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-ink-strong">{m.de}</p>
                    <p className="mt-0.5 truncate text-[11px] text-ink-muted">{m.preview}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-ink-subtle">{m.tiempo}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}
