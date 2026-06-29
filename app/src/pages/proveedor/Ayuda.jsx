import { useState } from 'react'
import { Search, ChevronDown, Inbox, FileText, Store, Crown, MessageSquare, ShieldCheck, LifeBuoy, Phone, Mail, BookOpen, ArrowRight } from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const CATEGORIAS = [
  { id: 'solicitudes', label: 'Solicitudes', Icon: Inbox, desc: 'Recibe y responde oportunidades' },
  { id: 'presupuestos', label: 'Presupuestos', Icon: FileText, desc: 'Cotiza y cierra negocios' },
  { id: 'perfil', label: 'Mi perfil', Icon: Store, desc: 'Servicios, galería y verificación' },
  { id: 'suscripcion', label: 'Suscripción', Icon: Crown, desc: 'Planes, pagos y facturación' },
]

const FAQS = [
  { cat: 'solicitudes', q: '¿Cómo recibo solicitudes de organizadores?', a: 'Cuando un organizador busca tu categoría en el marketplace y te contacta, la solicitud aparece en "Solicitudes". Mientras más completo esté tu perfil, más visibilidad tendrás.' },
  { cat: 'solicitudes', q: '¿Cómo respondo una oportunidad?', a: 'Abre la solicitud y pulsa "Responder". Podrás construir un presupuesto con conceptos y total, y enviarlo directamente al organizador.' },
  { cat: 'presupuestos', q: '¿Qué pasa cuando aceptan mi presupuesto?', a: 'Recibirás una notificación y la conversación pasará a "Aceptado". El evento se sumará a tu historial cuando se complete.' },
  { cat: 'presupuestos', q: '¿Puedo editar un presupuesto enviado?', a: 'Sí, mientras esté en negociación puedes enviar una versión actualizada desde el chat con el organizador.' },
  { cat: 'perfil', q: '¿Cómo consigo el sello "Verificado"?', a: 'Sube tus documentos legales en Mi Perfil → Documentos. Nuestro equipo los valida en 24-48 h y obtienes el badge de proveedor verificado.' },
  { cat: 'perfil', q: '¿Cómo gestiono mi catálogo de servicios?', a: 'En Mi Perfil → Servicios puedes añadir, editar, duplicar o desactivar servicios, y fijar precios por persona.' },
  { cat: 'suscripcion', q: '¿Qué incluye cada plan?', a: 'Básico es gratis con funciones esenciales; Profesional y Premium desbloquean perfil destacado, solicitudes ilimitadas y más visibilidad. Compáralos en Suscripción.' },
  { cat: 'suscripcion', q: '¿Puedo cancelar cuando quiera?', a: 'Sí, sin compromisos. Mantendrás el acceso hasta el final del período pagado.' },
]

const CONTACTO = [
  { Icon: MessageSquare, titulo: 'Chat en vivo', desc: 'Respuesta en minutos · Lun a Vie' },
  { Icon: Mail, titulo: 'Correo', desc: 'proveedores@eventus.mx · 24 h' },
  { Icon: Phone, titulo: 'Teléfono', desc: '+34 911 23 45 67 · Horario oficina' },
]

export default function Ayuda() {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('todos')
  const [abierta, setAbierta] = useState(null)
  usePageHeader('Centro de ayuda', 'Encuentra respuestas o contáctanos')

  const filtradas = FAQS.filter((f) => (cat === 'todos' || f.cat === cat) && (f.q + ' ' + f.a).toLowerCase().includes(q.toLowerCase()))
  const countCat = (id) => FAQS.filter((f) => f.cat === id).length

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="relative overflow-hidden rounded-xl p-8 text-center" style={{ backgroundImage: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' }}>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-mint"><LifeBuoy size={24} strokeWidth={2} /></span>
        <h1 className="mt-4 text-[22px] font-bold tracking-tight text-white">¿Cómo podemos ayudarte?</h1>
        <p className="mt-1 text-[13px] text-herolight">Resuelve tus dudas sobre solicitudes, presupuestos y tu cuenta de proveedor.</p>
        <div className="relative mx-auto mt-5 max-w-lg">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setCat('todos') }} placeholder="Buscar ayuda (solicitudes, verificación, planes…)" className="h-11 w-full rounded-lg border border-white/10 bg-white pl-11 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:outline-none focus:ring-2 focus:ring-mint/50" />
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="flex flex-col gap-6">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Explora por categoría</h2>
              {cat !== 'todos' && <button onClick={() => setCat('todos')} className="text-[12px] font-semibold text-navy hover:underline">Ver todas</button>}
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {CATEGORIAS.map((c) => (
                <button key={c.id} onClick={() => setCat(cat === c.id ? 'todos' : c.id)} className={cls('t-lift flex items-start gap-3 rounded-xl border p-4 text-left', cat === c.id ? 'border-navy bg-navy/[0.03]' : 'border-gray-200 bg-white hover:border-navy/40')}>
                  <span className={cls('flex h-10 w-10 shrink-0 items-center justify-center rounded-lg', cat === c.id ? 'bg-navy text-mint' : 'bg-navy/8 text-navy')}><c.Icon size={19} strokeWidth={2} /></span>
                  <span className="min-w-0"><span className="flex items-center gap-2 text-[13.5px] font-bold text-ink-strong">{c.label}<Badge tone="gray">{countCat(c.id)}</Badge></span><span className="mt-0.5 block text-[11.5px] leading-snug text-ink-muted">{c.desc}</span></span>
                </button>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader title={cat === 'todos' ? 'Preguntas frecuentes' : `Preguntas · ${CATEGORIAS.find((c) => c.id === cat)?.label}`} action={<span className="text-[12px] text-ink-muted">{filtradas.length} resultado{filtradas.length !== 1 ? 's' : ''}</span>} />
            <div className="px-5">
              {filtradas.length > 0 ? filtradas.map((f) => (
                <div key={f.q} className="border-b border-gray-100 last:border-0">
                  <button onClick={() => setAbierta(abierta === f.q ? null : f.q)} className="flex w-full items-center justify-between gap-4 py-3.5 text-left">
                    <span className="text-[13.5px] font-semibold text-ink-strong">{f.q}</span>
                    <ChevronDown size={17} className={cls('shrink-0 text-ink-muted transition-transform', abierta === f.q && 'rotate-180 text-navy')} />
                  </button>
                  {abierta === f.q && <p className="pb-4 pr-8 text-[12.5px] leading-relaxed text-ink-muted">{f.a}</p>}
                </div>
              )) : (
                <div className="py-12 text-center"><p className="text-[13px] font-semibold text-ink-strong">Sin resultados para “{q}”.</p><p className="mt-1 text-[12px] text-ink-muted">Prueba con otras palabras o contáctanos.</p></div>
              )}
            </div>
          </Card>
        </div>

        <div className="flex flex-col gap-5">
          <Card>
            <CardHeader title="¿No encontraste respuesta?" />
            <div className="flex flex-col gap-2.5 p-4">
              {CONTACTO.map((c) => (
                <div key={c.titulo} className="flex items-start gap-3 rounded-lg border border-gray-200 p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><c.Icon size={17} strokeWidth={2} /></span>
                  <div className="min-w-0"><p className="text-[13px] font-semibold text-ink-strong">{c.titulo}</p><p className="text-[11.5px] leading-snug text-ink-muted">{c.desc}</p></div>
                </div>
              ))}
              <BtnPrimary className="mt-1 w-full"><MessageSquare size={15} /> Iniciar chat con soporte</BtnPrimary>
            </div>
          </Card>
          <div className="rounded-xl border border-gray-200 bg-offwhite px-4 py-3 text-[12px] leading-relaxed text-ink-muted">
            Mejora tu visibilidad completando tu <strong className="text-ink-strong">perfil</strong> y verificando tus <strong className="text-ink-strong">documentos</strong>.
          </div>
        </div>
      </div>
    </div>
  )
}
