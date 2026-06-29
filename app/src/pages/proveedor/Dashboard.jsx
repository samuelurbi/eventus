import { Link } from 'react-router-dom'
import { Inbox, MessageSquare, FileText, Trophy, Target, TrendingUp, Star, CheckCircle2, MapPin, Users, CalendarDays, ArrowRight } from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, Progress, cls } from '../../components/ui'
import { CountUp } from '../../components/CountUp'
import { usePageHeader } from '../../layouts/pageHeader'
import { PROV_KPIS, PROV_NIVEL, PROV_METAS, PROV_STATS, SOLICITUDES, SOLICITUD_TONE } from '../../data/proveedorMock'

const KPIS = [
  { Icon: Inbox, value: PROV_KPIS.solicitudesPendientes, label: 'Solicitudes pendientes', cta: 'Ver solicitudes', to: '/proveedor/solicitudes' },
  { Icon: MessageSquare, value: PROV_KPIS.conversacionesActivas, label: 'Conversaciones activas', tag: `${PROV_KPIS.conversacionesSinLeer} sin leer`, cta: 'Ir a mensajes', to: '/proveedor/mensajes' },
  { Icon: FileText, value: PROV_KPIS.presupuestosEnviados, label: 'Presupuestos enviados', tag: 'Activos', cta: 'Ver presupuestos', to: '/proveedor/presupuestos' },
]

function SectionTitle({ children, action }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
      <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />{children}</h2>
      {action}
    </div>
  )
}

export default function Dashboard() {
  usePageHeader('Bienvenido de nuevo', 'Resumen de tu actividad comercial')

  return (
    <div className="px-4 py-5 sm:px-7">
      {/* KPIs */}
      <div className="t-stagger-grid mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {KPIS.map((k) => (
          <Card key={k.label} className="t-lift p-5">
            <div className="mb-3 flex items-start justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-navy/8 text-navy"><k.Icon size={19} strokeWidth={2} /></span>
              {k.tag && <span className="text-[11px] font-semibold text-ink-subtle">{k.tag}</span>}
            </div>
            <p className="text-[30px] font-bold leading-none text-ink-strong"><CountUp to={k.value} /></p>
            <p className="mt-1.5 text-[12.5px] text-ink-muted">{k.label}</p>
            <BtnPrimary to={k.to} className="mt-4 w-full">{k.cta}</BtnPrimary>
          </Card>
        ))}
      </div>

      {/* Nivel + Metas */}
      <div className="mb-5 grid grid-cols-1 gap-5 xl:grid-cols-2">
        {/* Nivel actual */}
        <Card>
          <SectionTitle action={<Trophy size={18} className="text-mint" />}>Nivel Actual</SectionTitle>
          <div className="p-5">
            <div className="flex items-end justify-between">
              <p className="text-[22px] font-bold text-ink-strong">{PROV_NIVEL.nombre}</p>
              <span className="text-[12px] font-semibold text-ink-muted">Nivel {PROV_NIVEL.nivel}/{PROV_NIVEL.totalNiveles}</span>
            </div>
            <Progress className="mt-2" pct={(PROV_NIVEL.cerrados / PROV_NIVEL.meta) * 100} grad="linear-gradient(90deg,#BCEE95,#0B334C)" />
            <p className="mt-1.5 text-[11.5px] text-ink-subtle">{PROV_NIVEL.cerrados} de {PROV_NIVEL.meta} negocios cerrados</p>
            <div className="mt-4 flex flex-col divide-y divide-gray-100 border-t border-gray-100">
              {PROV_NIVEL.logros.map((l) => (
                <div key={l.label} className="flex items-center justify-between py-3">
                  <span className="flex items-center gap-2.5 text-[13px] font-medium text-ink-body">
                    {l.label === '5+ valoraciones' ? <Star size={16} className="text-amber-400" fill="currentColor" /> : <CheckCircle2 size={16} className="text-green-500" />}
                    {l.label}
                  </span>
                  <span className="text-[12px] font-semibold text-ink-muted">{l.estado}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Próximas metas */}
        <Card>
          <SectionTitle action={<Target size={18} className="text-navy" />}>Próximas Metas</SectionTitle>
          <div className="flex flex-col gap-3 p-5">
            {PROV_METAS.map((m) => (
              <div key={m.titulo} className="rounded-lg border border-gray-200 p-3.5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[13px] font-bold text-ink-strong">{m.titulo}</p>
                    <p className="text-[11.5px] text-ink-muted">{m.desc}</p>
                  </div>
                  <span className="shrink-0 text-[11px] font-semibold text-navy">{m.extra}</span>
                </div>
                <Progress className="mt-2.5" pct={m.pct} grad="linear-gradient(90deg,#BCEE95,#0B334C)" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Stats rápidas */}
      <div className="t-stagger-grid mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {PROV_STATS.map((s, i) => (
          <Card key={s.label} className="t-lift p-5">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[12px] text-ink-muted">{s.label}</p>
              {[<TrendingUp key="t" size={15} className="text-ink-subtle" />, <TrendingUp key="c" size={15} className="text-ink-subtle" />, <Star key="s" size={15} className="text-amber-400" fill="currentColor" />][i]}
            </div>
            <p className="text-[26px] font-bold leading-none text-ink-strong">{s.value}</p>
            <p className={cls('mt-2 flex items-center gap-1 text-[11.5px] font-medium', s.up ? 'text-green-600' : 'text-ink-muted')}>{s.up && <TrendingUp size={12} />}{s.sub}</p>
          </Card>
        ))}
      </div>

      {/* Solicitudes recientes */}
      <Card>
        <SectionTitle action={<Link to="/proveedor/solicitudes" className="flex items-center gap-1 text-[12px] font-semibold text-navy hover:underline">Ver todas <ArrowRight size={13} /></Link>}>Solicitudes Recientes</SectionTitle>
        <div className="divide-y divide-gray-100">
          {SOLICITUDES.slice(0, 3).map((s) => (
            <div key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-mint">{s.avatar}</span>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-bold text-ink-strong">{s.evento}</p>
                <p className="text-[12px] text-ink-muted">Solicitado por {s.organizador}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-subtle">
                  <span className="flex items-center gap-1"><CalendarDays size={12} /> {s.fecha}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {s.personas} personas</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {s.ubicacion}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {s.estado === 'Respondida' ? (
                  <BtnOutline to="/proveedor/mensajes">Ver conversación</BtnOutline>
                ) : (
                  <>
                    <BtnPrimary to={`/proveedor/solicitudes?id=${s.id}`}>Responder</BtnPrimary>
                    <BtnOutline to={`/proveedor/solicitudes?id=${s.id}`}>Ver detalles</BtnOutline>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
