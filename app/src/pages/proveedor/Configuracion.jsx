import { useState } from 'react'
import { Store, ShieldCheck, Bell, CreditCard, Check } from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { PROVEEDOR } from '../../data/proveedorMock'

const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'
const TABS = [
  { id: 'negocio', label: 'Datos del negocio', Icon: Store },
  { id: 'seguridad', label: 'Seguridad', Icon: ShieldCheck },
  { id: 'notif', label: 'Notificaciones', Icon: Bell },
  { id: 'facturacion', label: 'Facturación', Icon: CreditCard },
]
function Field({ label, children, hint }) {
  return <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">{label}</span>{children}{hint && <span className="mt-1 block text-[11px] text-ink-subtle">{hint}</span>}</label>
}
function Toggle({ on, onClick }) {
  return <button type="button" onClick={onClick} className={cls('flex h-5 w-9 shrink-0 items-center rounded-full px-0.5 transition-colors', on ? 'justify-end bg-mint' : 'justify-start bg-gray-200')}><span className="h-4 w-4 rounded-full bg-white" /></button>
}

export default function Configuracion() {
  const [tab, setTab] = useState('negocio')
  const [notifs, setNotifs] = useState({ solicitudes: true, mensajes: true, presupuestos: true, marketing: false })
  usePageHeader('Configuración', 'Administra tu cuenta de proveedor')

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr] lg:items-start">
        {/* Sub-nav */}
        <div className="flex gap-1 overflow-x-auto lg:flex-col">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={cls('flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] font-semibold transition-colors', tab === t.id ? 'bg-navy text-white' : 'text-ink-muted hover:bg-gray-100')}>
              <t.Icon size={16} strokeWidth={2} className={tab === t.id ? 'text-mint' : ''} /> {t.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {tab === 'negocio' && (
            <Card>
              <CardHeader title="Datos del negocio" />
              <div className="flex flex-col gap-5 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-[20px] font-bold text-navy">{PROVEEDOR.iniciales}</div>
                  <div className="flex gap-2"><BtnOutline>Cambiar logo</BtnOutline><BtnOutline className="text-red-500">Eliminar</BtnOutline></div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Nombre comercial"><input className={inputCls} defaultValue={PROVEEDOR.nombre} /></Field>
                  <Field label="Categoría"><select className={inputCls}><option>Catering</option><option>Fotografía</option><option>Música</option><option>Decoración</option><option>Locación</option></select></Field>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Correo"><input className={inputCls} defaultValue={PROVEEDOR.email} /></Field>
                  <Field label="Teléfono"><input className={inputCls} defaultValue={PROVEEDOR.telefono} /></Field>
                </div>
                <Field label="Ubicación / zona de servicio"><input className={inputCls} defaultValue={PROVEEDOR.ubicacion} /></Field>
                <Field label="Descripción" hint="Aparece en tu perfil público."><textarea rows={3} className={cls(inputCls, 'h-auto resize-none py-2.5')} defaultValue="Catering de autor con cocina mediterránea para bodas y eventos corporativos." /></Field>
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5"><BtnOutline>Cancelar</BtnOutline><BtnPrimary>Guardar cambios</BtnPrimary></div>
              </div>
            </Card>
          )}

          {tab === 'seguridad' && (
            <Card>
              <CardHeader title="Seguridad" />
              <div className="flex flex-col gap-5 p-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="Contraseña actual"><input type="password" className={inputCls} placeholder="••••••••" /></Field>
                  <Field label="Nueva contraseña"><input type="password" className={inputCls} placeholder="••••••••" /></Field>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div><p className="text-[13px] font-semibold text-ink-strong">Verificación en dos pasos (2FA)</p><p className="text-[11.5px] text-ink-muted">Añade una capa extra de seguridad a tu cuenta.</p></div>
                    <Badge tone="green">Activa</Badge>
                  </div>
                </div>
                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5"><BtnPrimary>Actualizar seguridad</BtnPrimary></div>
              </div>
            </Card>
          )}

          {tab === 'notif' && (
            <Card>
              <CardHeader title="Notificaciones" />
              <div className="flex flex-col gap-2.5 p-5">
                {[
                  { k: 'solicitudes', label: 'Nuevas solicitudes', desc: 'Cuando un organizador te contacta.' },
                  { k: 'mensajes', label: 'Mensajes', desc: 'Respuestas en tus conversaciones.' },
                  { k: 'presupuestos', label: 'Presupuestos aceptados/rechazados', desc: 'Cambios de estado en tus propuestas.' },
                  { k: 'marketing', label: 'Novedades y promociones', desc: 'Consejos y ofertas de Eventus.' },
                ].map((n) => (
                  <div key={n.k} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 px-3.5 py-3">
                    <div><p className="text-[13px] font-semibold text-ink-strong">{n.label}</p><p className="text-[11.5px] text-ink-muted">{n.desc}</p></div>
                    <Toggle on={notifs[n.k]} onClick={() => setNotifs((p) => ({ ...p, [n.k]: !p[n.k] }))} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === 'facturacion' && (
            <Card>
              <CardHeader title="Facturación" action={<Badge tone="mint">Plan {PROVEEDOR.plan}</Badge>} />
              <div className="flex flex-col gap-5 p-5">
                <div className="flex items-center justify-between rounded-lg border border-navy/30 bg-navy/[0.03] p-4">
                  <div><p className="text-[14px] font-bold text-ink-strong">Plan {PROVEEDOR.plan}</p><p className="text-[12px] text-ink-muted">49 €/mes · próxima factura 25 mar 2026</p></div>
                  <BtnOutline to="/proveedor/suscripcion">Cambiar plan</BtnOutline>
                </div>
                <div>
                  <p className="mb-2 text-[12px] font-semibold text-ink-strong">Método de pago</p>
                  <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-3"><span className="flex h-9 w-12 items-center justify-center rounded bg-navy/8 text-[11px] font-bold text-navy">VISA</span><p className="text-[13px] text-ink-body">•••• 4242</p><span className="ml-auto"><BtnOutline>Actualizar</BtnOutline></span></div>
                </div>
                <div>
                  <p className="mb-2 text-[12px] font-semibold text-ink-strong">Facturas recientes</p>
                  <div className="divide-y divide-gray-100 rounded-lg border border-gray-200">
                    {['Feb 2026', 'Ene 2026', 'Dic 2025'].map((m) => (
                      <div key={m} className="flex items-center justify-between px-4 py-2.5 text-[12.5px]"><span className="flex items-center gap-2 text-ink-body"><Check size={14} className="text-green-600" /> {m}</span><span className="text-ink-muted">59,29 €</span><button className="text-[12px] font-semibold text-navy hover:underline">Descargar</button></div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
