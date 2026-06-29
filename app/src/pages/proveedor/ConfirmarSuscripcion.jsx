import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { CreditCard, Landmark, Lock, Check, ShieldCheck, RotateCcw, Headphones, ArrowLeft, Crown } from 'lucide-react'
import { Card, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { PROV_PLANES } from '../../data/proveedorMock'
import { Confetti } from '../../components/Confetti'

const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

function Field({ label, children }) {
  return <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">{label}</span>{children}</label>
}

export default function ConfirmarSuscripcion() {
  const navigate = useNavigate()
  const [sp] = useSearchParams()
  const plan = PROV_PLANES.find((p) => p.id === sp.get('plan')) || PROV_PLANES[1]
  const [metodo, setMetodo] = useState('tarjeta')
  const [pagado, setPagado] = useState(false)
  usePageHeader('Confirmar Suscripción', 'Revisa tu selección y completa el pago')

  const subtotal = plan.precio
  const iva = +(subtotal * 0.21).toFixed(2)
  const total = +(subtotal + iva).toFixed(2)

  if (pagado) {
    return (
      <div className="relative flex min-h-[78vh] items-center justify-center px-6 py-10">
        <Confetti />
        <div className="relative z-10 flex max-w-md flex-col items-center text-center">
          <span className="t-pop mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-mint"><Crown size={36} strokeWidth={2} /></span>
          <h1 className="text-[24px] font-bold tracking-tight text-ink-strong">¡Bienvenido al plan {plan.nombre}!</h1>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">Tu suscripción está activa. Ya disfrutas de mayor visibilidad, solicitudes ilimitadas y todas las ventajas {plan.nombre}.</p>
          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
            <BtnPrimary onClick={() => navigate('/proveedor')}>Ir al panel</BtnPrimary>
            <BtnOutline onClick={() => navigate('/proveedor/suscripcion')}>Ver mi plan</BtnOutline>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-5 sm:px-7">
      <button onClick={() => navigate('/proveedor/suscripcion')} className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Volver a planes
      </button>

      {/* Stepper */}
      <div className="mx-auto mb-6 flex max-w-xs items-center justify-center">
        {[1, 2, 3].map((n, i) => (
          <div key={n} className="flex items-center">
            <span className={cls('flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-bold', n <= 2 ? 'bg-navy text-white' : 'border border-gray-300 bg-white text-ink-subtle')}>{n < 2 ? <Check size={14} strokeWidth={3} /> : n}</span>
            {i < 2 && <span className={cls('mx-2 h-px w-10', n < 2 ? 'bg-navy' : 'bg-gray-200')} />}
          </div>
        ))}
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 lg:grid-cols-[1fr_320px] lg:items-start">
        {/* Formulario */}
        <div className="flex flex-col gap-5">
          <Card>
            <div className="flex items-center gap-2 border-b border-gray-200 px-5 py-3.5"><CreditCard size={16} className="text-navy" /><h2 className="text-[14px] font-bold text-ink-strong">Método de pago</h2></div>
            <div className="flex flex-col gap-3 p-5">
              <button onClick={() => setMetodo('tarjeta')} className={cls('flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors', metodo === 'tarjeta' ? 'border-navy bg-navy/[0.03]' : 'border-gray-200 hover:border-navy/40')}>
                <span className="flex items-center gap-2.5"><span className={cls('flex h-4 w-4 items-center justify-center rounded-full border-2', metodo === 'tarjeta' ? 'border-navy' : 'border-gray-300')}>{metodo === 'tarjeta' && <span className="h-2 w-2 rounded-full bg-navy" />}</span><span><span className="block text-[13px] font-semibold text-ink-strong">Tarjeta de Crédito / Débito</span><span className="block text-[11px] text-ink-subtle">Pago seguro procesado por Stripe</span></span></span>
                <CreditCard size={18} className="text-ink-subtle" />
              </button>
              <button onClick={() => setMetodo('transferencia')} className={cls('flex items-center justify-between rounded-lg border px-4 py-3 text-left transition-colors', metodo === 'transferencia' ? 'border-navy bg-navy/[0.03]' : 'border-gray-200 hover:border-navy/40')}>
                <span className="flex items-center gap-2.5"><span className={cls('flex h-4 w-4 items-center justify-center rounded-full border-2', metodo === 'transferencia' ? 'border-navy' : 'border-gray-300')}>{metodo === 'transferencia' && <span className="h-2 w-2 rounded-full bg-navy" />}</span><span><span className="block text-[13px] font-semibold text-ink-strong">Transferencia Bancaria</span><span className="block text-[11px] text-ink-subtle">Solo disponible para planes anuales</span></span></span>
                <Landmark size={18} className="text-ink-subtle" />
              </button>

              {metodo === 'tarjeta' && (
                <div className="mt-1 flex flex-col gap-4">
                  <Field label="Número de tarjeta"><input className={inputCls} placeholder="1234 5678 9012 3456" /></Field>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Fecha de expiración"><input className={inputCls} placeholder="MM / AA" /></Field>
                    <Field label="CVV"><input className={inputCls} placeholder="123" /></Field>
                  </div>
                  <Field label="Nombre del titular"><input className={inputCls} placeholder="Como aparece en la tarjeta" /></Field>
                </div>
              )}
            </div>
          </Card>

          <Card>
            <div className="border-b border-gray-200 px-5 py-3.5"><h2 className="text-[14px] font-bold text-ink-strong">Información de facturación</h2></div>
            <div className="flex flex-col gap-4 p-5">
              <Field label="Nombre o razón social"><input className={inputCls} placeholder="Nombre completo o empresa" /></Field>
              <Field label="NIF / CIF"><input className={inputCls} placeholder="Número de identificación fiscal" /></Field>
              <Field label="Dirección"><input className={inputCls} placeholder="Calle, número, piso" /></Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Ciudad"><input className={inputCls} placeholder="Ciudad" /></Field>
                <Field label="Código postal"><input className={inputCls} placeholder="28001" /></Field>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-3 rounded-xl border border-gray-200 bg-offwhite p-4 sm:grid-cols-3">
            {[{ Icon: ShieldCheck, t: 'Pago seguro', s: 'Encriptación SSL 256-bit' }, { Icon: RotateCcw, t: 'Cancela cuando quieras', s: 'Sin compromisos' }, { Icon: Headphones, t: 'Soporte 24/7', s: 'Siempre disponibles' }].map((b) => (
              <div key={b.t} className="flex items-center gap-2.5"><b.Icon size={18} className="shrink-0 text-navy" /><div><p className="text-[12px] font-semibold text-ink-strong">{b.t}</p><p className="text-[11px] text-ink-subtle">{b.s}</p></div></div>
            ))}
          </div>
        </div>

        {/* Resumen */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-5">
          <Card className="p-5">
            <p className="text-[14px] font-bold text-ink-strong">Plan {plan.nombre}</p>
            <p className="text-[11.5px] text-ink-muted">Facturación mensual</p>
            <div className="mt-3 flex flex-col gap-2 border-y border-gray-100 py-3">
              {plan.features.slice(0, 5).map((f) => (
                <span key={f} className="flex items-start gap-2 text-[12px] text-ink-body"><Check size={13} strokeWidth={2.6} className="mt-0.5 shrink-0 text-navy" /> {f}</span>
              ))}
            </div>
            <div className="mt-3 flex flex-col gap-1.5 text-[12.5px]">
              <div className="flex justify-between text-ink-muted"><span>Subtotal</span><span>{subtotal.toFixed(2)}€</span></div>
              <div className="flex justify-between text-ink-muted"><span>IVA (21%)</span><span>{iva.toFixed(2)}€</span></div>
              <div className="mt-1 flex justify-between border-t border-gray-100 pt-2 text-[15px] font-bold text-ink-strong"><span>Total</span><span>{total.toFixed(2)}€</span></div>
            </div>
            <p className="mt-2 text-[10.5px] text-ink-subtle">Próximo cobro: 25 de marzo de 2025</p>
            <button onClick={() => setPagado(true)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-navy py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-navy-light"><Lock size={14} /> Confirmar y pagar</button>
            <p className="mt-2 text-center text-[10.5px] text-ink-subtle">Al confirmar aceptas nuestros <span className="font-semibold text-navy">términos de servicio</span></p>
          </Card>
          <div className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-offwhite p-4">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-navy" />
            <p className="text-[11.5px] leading-relaxed text-ink-muted"><strong className="text-ink-strong">Garantía de reembolso.</strong> Si no estás satisfecho, te devolvemos el 100% los primeros 14 días.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
