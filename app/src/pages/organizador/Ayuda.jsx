import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Search, ChevronDown, Rocket, CalendarDays, Users, Wallet, Mail, ShieldCheck,
  MessageSquare, Phone, BookOpen, PlayCircle, FileText, ArrowRight, LifeBuoy,
} from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const CATEGORIAS = [
  { id: 'inicio', label: 'Primeros pasos', Icon: Rocket, desc: 'Crea tu cuenta y tu primer evento' },
  { id: 'eventos', label: 'Eventos', Icon: CalendarDays, desc: 'Gestiona y edita tus eventos' },
  { id: 'proveedores', label: 'Proveedores', Icon: Users, desc: 'Marketplace, contacto y cotizaciones' },
  { id: 'presupuesto', label: 'Presupuesto y pagos', Icon: Wallet, desc: 'Controla gastos y pagos' },
  { id: 'invitados', label: 'Invitados', Icon: Mail, desc: 'Invitaciones y confirmaciones' },
  { id: 'cuenta', label: 'Cuenta y seguridad', Icon: ShieldCheck, desc: 'Acceso, datos y privacidad' },
]

const FAQS = [
  { cat: 'inicio', q: '¿Cómo creo mi primer evento?', a: 'Ve a "Mis eventos" y pulsa "Nuevo evento". Elige Modo fácil (parte de una plantilla con proveedores sugeridos) o Modo avanzado (configuras cada detalle por pasos). Completa los datos y listo.' },
  { cat: 'inicio', q: '¿Cuál es la diferencia entre el modo fácil y el avanzado?', a: 'El modo fácil arranca desde una plantilla según el tipo de evento y te sugiere los proveedores típicos, avisándote lo que falta. El modo avanzado es un asistente por pasos donde defines horario, modalidad, privacidad, presupuesto por categoría y servicios a medida.' },
  { cat: 'inicio', q: '¿Eventus es gratis?', a: 'Puedes empezar a planear gratis. Algunos planes desbloquean funciones avanzadas; revisa las opciones en Configuración → Facturación.' },
  { cat: 'eventos', q: '¿Puedo gestionar varios eventos a la vez?', a: 'Sí. Cada evento tiene su propio panel con pestañas de Resumen, Proveedores, Presupuesto, Documentos, Invitados y Mensajes. Cámbialos desde "Mis eventos".' },
  { cat: 'eventos', q: '¿Cómo edito la fecha o los datos de un evento?', a: 'Abre el evento y, en la pestaña Resumen, edita la información. Los cambios se reflejan al instante en el resto de pestañas.' },
  { cat: 'proveedores', q: '¿Cómo contacto a un proveedor?', a: 'En el Marketplace de proveedores abre su perfil y pulsa "Contactar" o "Solicitar presupuesto". La conversación aparecerá en tu bandeja de Mensajes.' },
  { cat: 'proveedores', q: '¿Qué significa el sello "Verificado"?', a: 'Indica que validamos la identidad y documentación del proveedor. Es una capa extra de confianza, pero te recomendamos revisar también sus reseñas.' },
  { cat: 'proveedores', q: '¿Cómo acepto o rechazo un presupuesto?', a: 'Cuando un proveedor te envía un presupuesto, llega a Mensajes como una tarjeta con el desglose y botones de Aceptar o Rechazar. Al aceptarlo, el proveedor pasa a "Contratado".' },
  { cat: 'presupuesto', q: '¿Cómo controlo el presupuesto de mi evento?', a: 'En la pestaña Presupuesto del evento ves, por categoría, lo estimado, lo confirmado y lo pagado, además de los próximos pagos pendientes.' },
  { cat: 'presupuesto', q: '¿Puedo asignar un monto por categoría?', a: 'Sí. Al crear el evento en modo avanzado puedes activar "Asignar presupuesto por categoría", o ajustarlo después dentro del evento.' },
  { cat: 'invitados', q: '¿Cómo envío invitaciones?', a: 'En la pestaña Invitados pulsa "Enviar invitaciones", elige una plantilla tipo email (Romántica, Clásica, Moderna o Festiva), previsualízala y envíala a tu lista.' },
  { cat: 'invitados', q: '¿Los invitados pueden confirmar asistencia (RSVP)?', a: 'Sí, si activas la confirmación de asistencia al crear el evento. Verás el conteo de confirmados, pendientes y declinados en la pestaña Invitados.' },
  { cat: 'cuenta', q: '¿Cómo cambio mi contraseña?', a: 'Entra a Configuración → Seguridad y actualiza tu contraseña. Te recomendamos usar una contraseña fuerte y única.' },
  { cat: 'cuenta', q: '¿Cómo activo la verificación en dos pasos?', a: 'En Configuración → Seguridad activa la verificación en dos pasos (2FA) por app, SMS o correo, y guarda tus códigos de recuperación.' },
  { cat: 'cuenta', q: '¿Cómo funciona el programa de referidos?', a: 'Comparte tu enlace desde la sección Referidos. Ganas créditos cuando alguien se registra y crea su primer evento con tu invitación.' },
]

const CONTACTO = [
  { Icon: MessageSquare, titulo: 'Chat en vivo', desc: 'Respuesta en minutos · Lun a Vie, 9–18h' },
  { Icon: Mail, titulo: 'Correo', desc: 'soporte@eventus.mx · Respondemos en 24h' },
  { Icon: Phone, titulo: 'Teléfono', desc: '+52 55 1234 5678 · Horario de oficina' },
]

const RECURSOS = [
  { Icon: PlayCircle, label: 'Tutorial: tu primer evento en 5 min' },
  { Icon: BookOpen, label: 'Guía del Marketplace de proveedores' },
  { Icon: FileText, label: 'Plantillas de invitación y RSVP' },
]

function CategoriaCard({ c, activa, count, onClick }) {
  return (
    <button onClick={onClick} className={cls('t-lift flex items-start gap-3 rounded-xl border p-4 text-left', activa ? 'border-navy bg-navy/[0.03]' : 'border-gray-200 bg-white hover:border-navy/40')}>
      <span className={cls('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', activa ? 'bg-navy text-mint' : 'bg-navy/8 text-navy')}><c.Icon size={19} strokeWidth={2} /></span>
      <span className="min-w-0">
        <span className="flex items-center gap-2 text-[13.5px] font-bold text-ink-strong">{c.label}<Badge tone="gray">{count}</Badge></span>
        <span className="mt-0.5 block text-[11.5px] leading-snug text-ink-muted">{c.desc}</span>
      </span>
    </button>
  )
}

function FaqItem({ f, abierta, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={onToggle} className="flex w-full items-center justify-between gap-4 py-3.5 text-left">
        <span className="text-[13.5px] font-semibold text-ink-strong">{f.q}</span>
        <ChevronDown size={17} className={cls('shrink-0 text-ink-muted transition-transform', abierta && 'rotate-180 text-navy')} />
      </button>
      {abierta && <p className="pb-4 pr-8 text-[12.5px] leading-relaxed text-ink-muted">{f.a}</p>}
    </div>
  )
}

export default function Ayuda() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('todos')
  const [abierta, setAbierta] = useState(null)
  usePageHeader('Centro de ayuda', 'Encuentra respuestas o contáctanos')

  const filtradas = FAQS.filter(
    (f) => (cat === 'todos' || f.cat === cat) && (f.q + ' ' + f.a).toLowerCase().includes(q.toLowerCase()),
  )
  const countCat = (id) => FAQS.filter((f) => f.cat === id).length

  return (
    <div className="px-7 py-5">
      {/* Hero con buscador */}
      <div className="relative overflow-hidden rounded-xl p-8 text-center" style={{ backgroundImage: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' }}>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-mint"><LifeBuoy size={24} strokeWidth={2} /></span>
        <h1 className="mt-4 text-[22px] font-bold tracking-tight text-white">¿En qué podemos ayudarte?</h1>
        <p className="mt-1 text-[13px] text-herolight">Busca en nuestras preguntas frecuentes o explora por categoría.</p>
        <div className="relative mx-auto mt-5 max-w-lg">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setCat('todos') }} placeholder="Buscar ayuda (invitaciones, presupuesto, proveedores…)" className="h-11 w-full rounded-lg border border-white/10 bg-white pl-11 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-mint/50" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        {/* Columna principal */}
        <div className="flex flex-col gap-6">
          {/* Categorías */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Explora por categoría</h2>
              {cat !== 'todos' && <button onClick={() => setCat('todos')} className="text-[12px] font-semibold text-navy hover:underline">Ver todas</button>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {CATEGORIAS.map((c) => (
                <CategoriaCard key={c.id} c={c} activa={cat === c.id} count={countCat(c.id)} onClick={() => setCat(cat === c.id ? 'todos' : c.id)} />
              ))}
            </div>
          </div>

          {/* FAQs */}
          <Card>
            <CardHeader
              title={cat === 'todos' ? 'Preguntas frecuentes' : `Preguntas · ${CATEGORIAS.find((c) => c.id === cat)?.label}`}
              action={<span className="text-[12px] text-ink-muted">{filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}</span>}
            />
            <div className="px-5">
              {filtradas.length > 0 ? (
                filtradas.map((f) => (
                  <FaqItem key={f.q} f={f} abierta={abierta === f.q} onToggle={() => setAbierta(abierta === f.q ? null : f.q)} />
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-[13px] font-semibold text-ink-strong">Sin resultados para “{q}”.</p>
                  <p className="mt-1 text-[12px] text-ink-muted">Prueba con otras palabras o contáctanos directamente.</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Columna lateral */}
        <div className="flex flex-col gap-5">
          {/* Contacto */}
          <Card>
            <CardHeader title="¿No encontraste respuesta?" />
            <div className="flex flex-col gap-2.5 p-4">
              {CONTACTO.map((c) => (
                <div key={c.titulo} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><c.Icon size={17} strokeWidth={2} /></span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-semibold text-ink-strong">{c.titulo}</p>
                    <p className="text-[11.5px] leading-snug text-ink-muted">{c.desc}</p>
                  </div>
                </div>
              ))}
              <BtnPrimary className="mt-1 w-full"><MessageSquare size={15} /> Iniciar chat con soporte</BtnPrimary>
            </div>
          </Card>

          {/* Recursos */}
          <Card>
            <CardHeader title="Guías y tutoriales" />
            <div className="flex flex-col p-2">
              {RECURSOS.map((r) => (
                <button key={r.label} className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint/25 text-navy"><r.Icon size={16} strokeWidth={2} /></span>
                  <span className="min-w-0 flex-1 text-[12.5px] font-medium text-ink-body">{r.label}</span>
                  <ArrowRight size={14} className="shrink-0 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:text-navy" />
                </button>
              ))}
            </div>
          </Card>

          <div className="rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-[12px] leading-relaxed text-ink-muted">
            Consulta también la sección <Link to="/organizador/configuracion" className="font-semibold text-navy hover:underline">Configuración</Link> para gestionar tu cuenta, seguridad y facturación.
          </div>
        </div>
      </div>
    </div>
  )
}
