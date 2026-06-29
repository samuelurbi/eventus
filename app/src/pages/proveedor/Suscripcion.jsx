import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Check, X, ChevronDown, Crown, Star, Mail } from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { PROV_PLANES, PROV_PLANES_COMPARATIVA, PROV_PLANES_FAQ } from '../../data/proveedorMock'

function Cell({ v }) {
  if (v === true) return <Check size={16} strokeWidth={2.6} className="mx-auto text-green-600" />
  if (v === false) return <X size={16} className="mx-auto text-ink-subtle/50" />
  return <span className="text-[12.5px] text-ink-body">{v}</span>
}

export default function Suscripcion() {
  const navigate = useNavigate()
  const [abierta, setAbierta] = useState(null)
  usePageHeader('Planes y Suscripción', 'Elige el plan que mejor se adapte a tu negocio')

  const suscribir = (plan) => navigate(`/proveedor/suscripcion/confirmar?plan=${plan.id}`)

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 text-center">
          <h1 className="text-[22px] font-bold tracking-tight text-ink-strong">Aumenta tu visibilidad en la plataforma</h1>
          <p className="mt-1 text-[13px] text-ink-muted">Más visibilidad, solicitudes ilimitadas y herramientas para cerrar más negocios.</p>
        </div>

        {/* Planes */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {PROV_PLANES.map((p) => (
            <div key={p.id} className={cls('flex flex-col rounded-xl border bg-white p-5', p.destacado ? 'border-navy' : 'border-gray-200')}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[15px] font-bold text-ink-strong">{p.nombre}</p>
                  <p className="text-[11.5px] text-ink-muted">{p.claim}</p>
                </div>
                {p.destacado && <Badge tone="mint">Popular</Badge>}
              </div>
              <p className="mt-4 text-[32px] font-bold leading-none text-ink-strong">{p.precio}€<span className="text-[13px] font-medium text-ink-subtle">/mes</span></p>
              {p.actual ? (
                <BtnOutline className="mt-4 w-full cursor-default">Plan actual</BtnOutline>
              ) : (
                <button onClick={() => suscribir(p)} className={cls('mt-4 w-full rounded-lg py-2.5 text-[13px] font-semibold transition-colors', p.destacado ? 'bg-navy text-white hover:bg-navy-light' : 'border border-gray-200 text-ink-strong hover:border-navy/40')}>Suscribirse</button>
              )}
              <div className="mt-5 flex flex-col gap-2.5 border-t border-gray-100 pt-4">
                {p.features.map((f) => (
                  <span key={f} className="flex items-start gap-2 text-[12px] text-ink-body"><Check size={14} strokeWidth={2.6} className="mt-0.5 shrink-0 text-navy" /> {f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Comparativa */}
        <Card className="mt-8 overflow-hidden">
          <CardHeader title="Comparativa detallada" />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead>
                <tr className="border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                  <th className="px-5 py-3 text-left">Característica</th>
                  <th className="px-3 py-3 text-center"><Star size={14} className="mx-auto mb-0.5" />Básico</th>
                  <th className="bg-navy/[0.03] px-3 py-3 text-center text-navy"><Star size={14} className="mx-auto mb-0.5" fill="currentColor" />Profesional</th>
                  <th className="px-3 py-3 text-center"><Crown size={14} className="mx-auto mb-0.5" />Premium</th>
                </tr>
              </thead>
              <tbody>
                {PROV_PLANES_COMPARATIVA.map((r) => (
                  <tr key={r.f} className="border-b border-gray-100 last:border-0">
                    <td className="px-5 py-3 text-[12.5px] font-medium text-ink-body">{r.f}</td>
                    <td className="px-3 py-3 text-center"><Cell v={r.basico} /></td>
                    <td className="bg-navy/[0.03] px-3 py-3 text-center"><Cell v={r.profesional} /></td>
                    <td className="px-3 py-3 text-center"><Cell v={r.premium} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* FAQ */}
        <div className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Preguntas frecuentes</h2>
          <Card className="px-5">
            {PROV_PLANES_FAQ.map((f) => (
              <div key={f.q} className="border-b border-gray-100 last:border-0">
                <button onClick={() => setAbierta(abierta === f.q ? null : f.q)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left">
                  <span className="text-[13.5px] font-semibold text-ink-strong">{f.q}</span>
                  <ChevronDown size={17} className={cls('shrink-0 text-ink-muted transition-transform', abierta === f.q && 'rotate-180 text-navy')} />
                </button>
                {abierta === f.q && <p className="pb-4 pr-8 text-[12.5px] leading-relaxed text-ink-muted">{f.a}</p>}
              </div>
            ))}
          </Card>
        </div>

        {/* CTA personalizado */}
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl p-7 text-center text-white" style={{ backgroundImage: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' }}>
          <h3 className="text-[18px] font-bold">¿Necesitas un plan personalizado?</h3>
          <p className="max-w-md text-[13px] text-herolight">Si gestionas múltiples negocios o necesitas características específicas, contacta con nuestro equipo comercial.</p>
          <button className="mt-1 inline-flex items-center gap-2 rounded-lg bg-mint px-5 py-2.5 text-[13px] font-bold text-navy transition-colors hover:bg-[#aee584]"><Mail size={15} /> Contactar ventas</button>
        </div>
      </div>
    </div>
  )
}
