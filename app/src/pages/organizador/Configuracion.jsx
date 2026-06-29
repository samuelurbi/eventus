import { useState } from 'react'
import {
  User, Lock, Bell, CreditCard, Check, Smartphone, Mail, MessageSquare,
  Key, Monitor, Download, Trash2, FileText, Shield, Clock,
} from 'lucide-react'
import { Card, CardHeader, BtnPrimary, BtnOutline, Badge, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { FMT } from '../../data/theme'

const TABS = [
  { id: 'datos', label: 'Datos personales', Icon: User },
  { id: 'seguridad', label: 'Seguridad', Icon: Lock },
  { id: 'notif', label: 'Notificaciones', Icon: Bell },
  { id: 'facturacion', label: 'Facturación', Icon: CreditCard },
]

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

function Toggle({ on, onClick }) {
  return (
    <button onClick={onClick} className={cls('relative h-5 w-9 shrink-0 rounded-full transition-colors', on ? 'bg-navy' : 'bg-gray-300')}>
      <span className={cls('absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all', on ? 'left-[18px]' : 'left-0.5')} />
    </button>
  )
}

function SwitchRow({ titulo, desc, on, onClick }) {
  return (
    <div className="flex items-center justify-between gap-4 px-5 py-3.5">
      <div className="min-w-0"><p className="text-[13px] font-semibold text-ink-strong">{titulo}</p><p className="mt-0.5 text-[11.5px] text-ink-muted">{desc}</p></div>
      <Toggle on={on} onClick={onClick} />
    </div>
  )
}

// ── Datos personales ──────────────────────────────────────────────────────────
function TabDatos() {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader title="Datos personales" />
        <div className="flex flex-col gap-5 p-5">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-navy text-[20px] font-bold text-mint">SU</span>
            <div className="flex items-center gap-2">
              <BtnOutline className="!py-1.5">Cambiar foto</BtnOutline>
              <button className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-ink-muted hover:text-red-500">Eliminar</button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Nombre"><input className={inputCls} defaultValue="Samuel" /></Field>
            <Field label="Apellidos"><input className={inputCls} defaultValue="Urbina" /></Field>
          </div>
          <Field label="Correo electrónico" hint="Se usará para iniciar sesión y recibir notificaciones."><input className={inputCls} defaultValue="samuel@eventus.mx" /></Field>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Teléfono"><input className={inputCls} defaultValue="+52 55 1234 5678" /></Field>
            <Field label="Tipo de organizador"><select className={inputCls}><option>Particular</option><option>Empresa</option></select></Field>
          </div>
          <Field label="Dirección"><input className={inputCls} defaultValue="Av. Reforma 123" /></Field>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <input className={inputCls} defaultValue="Ciudad de México" /><input className={inputCls} defaultValue="06600" /><input className={inputCls} defaultValue="México" />
          </div>
          <Field label="Sobre mí" hint="Máximo 500 caracteres."><textarea rows={3} className={cls(inputCls, 'h-auto py-2')} placeholder="Cuéntanos sobre ti y tu experiencia organizando eventos…" /></Field>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Idioma"><select className={inputCls}><option>Español</option><option>English</option></select></Field>
            <Field label="Zona horaria"><select className={inputCls}><option>GMT-6 (Ciudad de México)</option><option>GMT-5 (Cancún)</option></select></Field>
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5"><BtnOutline>Cancelar</BtnOutline><BtnPrimary>Guardar cambios</BtnPrimary></div>
        </div>
      </Card>

      <Card className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div><p className="text-[13px] font-bold text-ink-strong">Eliminar cuenta</p><p className="mt-0.5 text-[11.5px] text-ink-muted">Una vez eliminada, no podrás recuperar tus datos. Esta acción es permanente.</p></div>
          <button className="shrink-0 rounded-lg border border-red-200 px-3.5 py-2 text-[13px] font-semibold text-red-500 transition-colors hover:bg-red-50">Eliminar cuenta</button>
        </div>
      </Card>
    </div>
  )
}

// ── Seguridad ──────────────────────────────────────────────────────────────
const PW_CHECKS = ['Al menos 8 caracteres', 'Mayúsculas y minúsculas', 'Incluye números', 'Caracteres especiales (opcional)']
const SESIONES = [
  { disp: 'Windows · Chrome', lugar: 'CDMX, México', cuando: 'Actividad ahora', actual: true },
  { disp: 'iPhone · Safari', lugar: 'CDMX, México', cuando: 'Hace 2 horas', actual: false },
  { disp: 'iPad · Safari', lugar: 'CDMX, México', cuando: 'Hace 1 día', actual: false },
]
const DOSFA = [
  { Icon: Smartphone, titulo: 'Aplicación de autenticación', desc: 'Usa Google Authenticator o Authy', cta: 'Configurar' },
  { Icon: Mail, titulo: 'Verificación por correo', desc: 'Recibe códigos en tu correo', cta: 'Activar' },
  { Icon: MessageSquare, titulo: 'Verificación por SMS', desc: 'Recibe códigos por mensaje de texto', cta: 'Configurar' },
]
function TabSeguridad() {
  const [dosfa, setDosfa] = useState(false)
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader title="Cambiar contraseña" />
        <div className="flex flex-col gap-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:max-w-md">
            <Field label="Contraseña actual"><input type="password" className={inputCls} placeholder="••••••••" /></Field>
            <Field label="Nueva contraseña"><input type="password" className={inputCls} placeholder="••••••••" /></Field>
            <Field label="Confirmar nueva contraseña"><input type="password" className={inputCls} placeholder="••••••••" /></Field>
          </div>
          <div className="rounded-lg border border-gray-200 bg-offwhite p-3">
            <p className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-ink-strong"><Shield size={13} className="text-navy" /> Seguridad de la contraseña</p>
            <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
              {PW_CHECKS.map((c) => <span key={c} className="flex items-center gap-1.5 text-[12px] text-ink-muted"><Check size={13} className="text-green-600" />{c}</span>)}
            </div>
          </div>
          <div className="flex justify-end"><BtnPrimary>Actualizar contraseña</BtnPrimary></div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Autenticación de dos factores" action={<Badge tone={dosfa ? 'green' : 'gray'}>{dosfa ? 'Activado' : 'Desactivado'}</Badge>} />
        <div className="flex items-center justify-between gap-4 border-b border-gray-100 px-5 py-3.5">
          <p className="text-[12.5px] text-ink-muted">Añade una capa extra de seguridad solicitando un código de verificación al iniciar sesión.</p>
          <Toggle on={dosfa} onClick={() => setDosfa((v) => !v)} />
        </div>
        <div className="divide-y divide-gray-100">
          {DOSFA.map((m) => (
            <div key={m.titulo} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-offwhite text-navy"><m.Icon size={16} strokeWidth={1.9} /></span>
              <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold text-ink-strong">{m.titulo}</p><p className="text-[11.5px] text-ink-muted">{m.desc}</p></div>
              <BtnOutline className="!py-1.5">{m.cta}</BtnOutline>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Códigos de recuperación" action={<BtnOutline className="!py-1.5"><Download size={14} /> Descargar</BtnOutline>} />
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-navy"><Key size={16} /></span>
          <div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">10 códigos disponibles</p><p className="text-[11.5px] text-ink-muted">Úsalos si pierdes el acceso a tu método de 2FA.</p></div>
          <button className="text-[12.5px] font-semibold text-navy hover:underline">Generar nuevos</button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Sesiones activas" action={<button className="text-[12px] font-semibold text-red-500 hover:underline">Cerrar todas</button>} />
        <div className="divide-y divide-gray-100">
          {SESIONES.map((s) => (
            <div key={s.disp} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-offwhite text-navy"><Monitor size={16} strokeWidth={1.9} /></span>
              <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold text-ink-strong">{s.disp}</p><p className="text-[11.5px] text-ink-muted">{s.lugar} · {s.cuando}</p></div>
              {s.actual ? <Badge tone="green">Actual</Badge> : <button className="text-[12px] font-semibold text-ink-muted hover:text-red-500">Cerrar sesión</button>}
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <CardHeader title="Opciones avanzadas" />
        <div className="divide-y divide-gray-100">
          <div className="flex items-center gap-3 px-5 py-3.5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-navy"><Clock size={16} /></span><div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">Historial de actividad</p><p className="text-[11.5px] text-ink-muted">Revisa accesos y cambios en tu cuenta.</p></div><button className="text-[12.5px] font-semibold text-navy hover:underline">Ver historial</button></div>
          <div className="flex items-center gap-3 px-5 py-3.5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-navy"><Download size={16} /></span><div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">Descargar datos de la cuenta</p><p className="text-[11.5px] text-ink-muted">Solicita una copia de toda tu información.</p></div><button className="text-[12.5px] font-semibold text-navy hover:underline">Solicitar</button></div>
          <div className="flex items-center gap-3 px-5 py-3.5"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500"><Trash2 size={16} /></span><div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">Eliminar cuenta</p><p className="text-[11.5px] text-ink-muted">Elimina permanentemente tu cuenta y datos.</p></div><button className="text-[12.5px] font-semibold text-red-500 hover:underline">Eliminar</button></div>
        </div>
      </Card>
    </div>
  )
}

// ── Notificaciones ──────────────────────────────────────────────────────────
function TabNotif() {
  const [n, setN] = useState({ act: true, presup: true, msg: true, record: true, asist: false, boletin: false, push1: true, push2: true, pausar: false, perfil: true, directos: false })
  const f = (k) => setN((p) => ({ ...p, [k]: !p[k] }))
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader title="Notificaciones por correo" />
        <div className="divide-y divide-gray-100">
          <SwitchRow titulo="Actualizaciones de eventos" desc="Cuando haya cambios en tus eventos" on={n.act} onClick={() => f('act')} />
          <SwitchRow titulo="Nuevos presupuestos" desc="Cuando recibas una cotización de un proveedor" on={n.presup} onClick={() => f('presup')} />
          <SwitchRow titulo="Mensajes de proveedores" desc="Cuando recibas un mensaje" on={n.msg} onClick={() => f('msg')} />
          <SwitchRow titulo="Recordatorios de eventos" desc="Antes de la fecha de tu evento" on={n.record} onClick={() => f('record')} />
          <SwitchRow titulo="Confirmación de asistentes" desc="Cuando un invitado confirme o rechace" on={n.asist} onClick={() => f('asist')} />
          <SwitchRow titulo="Boletín semanal" desc="Resumen semanal de tus eventos y actividad" on={n.boletin} onClick={() => f('boletin')} />
        </div>
      </Card>
      <Card>
        <CardHeader title="Notificaciones push" />
        <div className="divide-y divide-gray-100">
          <SwitchRow titulo="Mensajes instantáneos" desc="Push cuando recibas un mensaje" on={n.push1} onClick={() => f('push1')} />
          <SwitchRow titulo="Recordatorios urgentes" desc="Alertas importantes sobre eventos próximos" on={n.push2} onClick={() => f('push2')} />
        </div>
      </Card>
      <Card>
        <CardHeader title="Configuración general" />
        <div className="flex flex-col gap-4 p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Frecuencia de resumen"><select className={inputCls}><option>Diario</option><option>Semanal</option><option>Mensual</option></select></Field>
            <Field label="Hora preferida para recordatorios"><select className={inputCls}><option>08:00</option><option>12:00</option><option>18:00</option></select></Field>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"><div><p className="text-[13px] font-semibold text-ink-strong">Pausar todas las notificaciones</p><p className="text-[11.5px] text-ink-muted">Desactiva temporalmente todas las notificaciones</p></div><Toggle on={n.pausar} onClick={() => f('pausar')} /></div>
        </div>
      </Card>
      <Card>
        <CardHeader title="Privacidad y visibilidad" />
        <div className="divide-y divide-gray-100">
          <SwitchRow titulo="Mostrar mi perfil a proveedores" desc="Permite que los proveedores vean tu perfil y eventos públicos" on={n.perfil} onClick={() => f('perfil')} />
          <SwitchRow titulo="Permitir mensajes directos" desc="Los proveedores podrán escribirte sin solicitud previa" on={n.directos} onClick={() => f('directos')} />
        </div>
      </Card>
    </div>
  )
}

// ── Facturación ──────────────────────────────────────────────────────────────
const FEATURES = ['Eventos ilimitados', 'Hasta 50 proveedores por evento', 'Documentos y contratos', 'Soporte prioritario']
const FACTURAS = [
  { fecha: '1 jun 2026', concepto: 'Plan Profesional — junio', monto: 499, estado: 'Pagada' },
  { fecha: '1 may 2026', concepto: 'Plan Profesional — mayo', monto: 499, estado: 'Pagada' },
  { fecha: '1 abr 2026', concepto: 'Plan Profesional — abril', monto: 499, estado: 'Pagada' },
]
function TabFacturacion() {
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <CardHeader title="Plan y suscripción" action={<Badge tone="mint">Plan actual</Badge>} />
        <div className="p-5">
          <div className="rounded-lg border border-navy/15 bg-navy/5 p-5">
            <div className="flex items-start justify-between">
              <div><p className="text-[16px] font-bold text-ink-strong">Profesional</p><p className="mt-0.5 text-[12px] text-ink-muted">Facturado mensualmente · próximo cargo 1 jul 2026</p></div>
              <p className="text-[22px] font-bold tracking-tight text-ink-strong">{FMT.format(499)}<span className="text-[12px] font-medium text-ink-subtle"> /mes</span></p>
            </div>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FEATURES.map((ftr) => <li key={ftr} className="flex items-center gap-2 text-[12.5px] text-ink-body"><span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint/30 text-navy"><Check size={11} strokeWidth={3} /></span>{ftr}</li>)}
            </ul>
          </div>
          <div className="mt-4 flex items-center justify-between"><button className="text-[13px] font-semibold text-ink-muted hover:text-navy">Cancelar suscripción</button><BtnPrimary>Mejorar a Elite</BtnPrimary></div>
        </div>
      </Card>

      <Card>
        <CardHeader title="Método de pago" action={<BtnOutline className="!py-1.5">Añadir método</BtnOutline>} />
        <div className="flex items-center gap-3 px-5 py-4">
          <span className="flex h-9 w-12 items-center justify-center rounded-md bg-navy text-[10px] font-bold text-white">VISA</span>
          <div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">•••• •••• •••• 4242</p><p className="text-[11.5px] text-ink-muted">Expira 08/27</p></div>
          <button className="text-[12.5px] font-semibold text-navy hover:underline">Editar</button>
        </div>
      </Card>

      <Card>
        <CardHeader title="Historial de facturas" />
        <div className="hidden grid-cols-[1fr_1fr_100px_100px_44px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Fecha</span><span>Concepto</span><span className="text-right">Monto</span><span className="text-center">Estado</span><span></span>
        </div>
        <div className="divide-y divide-gray-100">
          {FACTURAS.map((f, i) => (
            <div key={i} className="grid grid-cols-1 items-center gap-2 px-5 py-3 hover:bg-gray-50 md:grid-cols-[1fr_1fr_100px_100px_44px] md:gap-3">
              <span className="text-[12.5px] font-medium text-ink-strong">{f.fecha}</span>
              <span className="text-[12.5px] text-ink-muted">{f.concepto}</span>
              <span className="text-[12.5px] font-semibold text-ink-strong md:text-right">{FMT.format(f.monto)}</span>
              <div className="md:text-center"><Badge tone="green">{f.estado}</Badge></div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100 md:justify-self-end"><FileText size={15} /></button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function Configuracion() {
  const [tab, setTab] = useState('datos')
  usePageHeader('Configuración', 'Administra tu cuenta y preferencias')
  return (
    <div className="px-7 py-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr] lg:items-start">
        <nav className="flex gap-1.5 overflow-x-auto rounded-lg border border-gray-200 bg-white p-1.5 lg:flex-col lg:overflow-visible">
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)} className={cls('flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-[13px] font-semibold transition-colors lg:w-full', tab === id ? 'bg-navy text-white' : 'text-ink-muted hover:bg-gray-50')}>
              <Icon size={15} strokeWidth={1.9} /> {label}
            </button>
          ))}
        </nav>
        <div>
          {tab === 'datos' && <TabDatos />}
          {tab === 'seguridad' && <TabSeguridad />}
          {tab === 'notif' && <TabNotif />}
          {tab === 'facturacion' && <TabFacturacion />}
        </div>
      </div>
    </div>
  )
}
