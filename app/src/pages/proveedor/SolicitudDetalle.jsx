import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Users, CalendarDays, MapPin, Clock, MessageSquare, FileText, Sparkles, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { SOLICITUDES, SOLICITUD_TONE, EUR } from '../../data/proveedorMock'

const REQUISITOS = ['Menú adaptable con opciones vegetarianas', 'Servicio de personal incluido', 'Montaje y recogida', 'Presupuesto cerrado por persona']

export default function SolicitudDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const s = SOLICITUDES.find((x) => String(x.id) === id) ?? SOLICITUDES[0]
  usePageHeader(s.evento, `Solicitud de ${s.organizador}`)
  const estimado = s.personas * 45

  return (
    <div className="px-4 py-5 sm:px-7">
      <button onClick={() => navigate('/proveedor/solicitudes')} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Solicitudes
      </button>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px] xl:items-start">
        <div className="flex flex-col gap-5">
          {/* Cabecera */}
          <Card className="p-5">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-[18px] font-bold text-ink-strong">{s.evento}</h2>
              <Badge tone={SOLICITUD_TONE[s.estado]}>{s.estado}</Badge>
            </div>
            <p className="mt-1 text-[12.5px] text-ink-muted">Recibida {s.hace.toLowerCase()}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { Icon: CalendarDays, label: 'Fecha', val: s.fecha },
                { Icon: Users, label: 'Invitados', val: s.personas },
                { Icon: MapPin, label: 'Ubicación', val: s.ubicacion },
                { Icon: Clock, label: 'Tipo', val: s.tipo },
              ].map((k) => (
                <div key={k.label} className="rounded-lg border border-gray-200 p-3">
                  <k.Icon size={15} className="text-navy" />
                  <p className="mt-1.5 text-[11px] text-ink-subtle">{k.label}</p>
                  <p className="text-[13px] font-semibold text-ink-strong">{k.val}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Detalle */}
          <Card>
            <CardHeader title="Lo que necesita el organizador" />
            <div className="p-5">
              <p className="text-[13px] leading-relaxed text-ink-muted">{s.organizador} está organizando <strong className="text-ink-strong">{s.evento.toLowerCase()}</strong> para {s.personas} personas en {s.ubicacion}. Busca un servicio de {s.tipo === 'Boda' ? 'catering para boda' : 'catering'} completo, con atención cuidada y dentro de presupuesto.</p>
              <ul className="mt-4 flex flex-col gap-2">
                {REQUISITOS.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-[12.5px] text-ink-body"><CheckCircle2 size={15} className="shrink-0 text-green-500" /> {r}</li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Acciones */}
        <Card className="xl:sticky xl:top-5">
          <CardHeader title="Responder" />
          <div className="flex flex-col gap-4 p-5">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-mint">{s.avatar}</span>
              <div className="min-w-0"><p className="text-[13px] font-semibold text-ink-strong">{s.organizador}</p><p className="text-[11.5px] text-ink-muted">Organizador</p></div>
            </div>
            <div className="rounded-lg bg-offwhite p-3 text-center">
              <p className="text-[11px] text-ink-subtle">Presupuesto estimado</p>
              <p className="text-[20px] font-bold text-ink-strong">{EUR.format(estimado)}</p>
              <p className="text-[11px] text-ink-subtle">según tu tarifa media · {s.personas} pax</p>
            </div>
            {s.estado === 'Respondida' ? (
              <BtnPrimary to="/proveedor/mensajes" className="w-full"><MessageSquare size={15} /> Ver conversación</BtnPrimary>
            ) : (
              <>
                <BtnPrimary to={`/proveedor/solicitudes?id=${s.id}`} className="w-full"><FileText size={15} /> Responder con presupuesto</BtnPrimary>
                <BtnOutline to="/proveedor/mensajes" className="w-full"><MessageSquare size={15} /> Enviar mensaje</BtnOutline>
              </>
            )}
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-ink-subtle"><Sparkles size={12} className="text-mint" /> Responder rápido mejora tu nivel</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
