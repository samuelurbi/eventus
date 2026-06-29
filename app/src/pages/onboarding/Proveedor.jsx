import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Utensils, Camera, Music, Flower2, MapPin, Car, Check, Upload, ShieldCheck, PartyPopper } from 'lucide-react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import SelectCard from '../../components/SelectCard'
import { Confetti } from '../../components/Confetti'
import { cls } from '../../components/ui'

const STEPS = [
  { label: 'Categoría', path: '/onboarding-proveedor/categoria' },
  { label: 'Servicios', path: '/onboarding-proveedor/servicios' },
  { label: 'Cobertura', path: '/onboarding-proveedor/cobertura' },
  { label: 'Documentos', path: '/onboarding-proveedor/documentos' },
]
const inputCls = 'h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-ink-strong placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-2 focus:ring-mint/50'

const CATS = [
  { id: 'catering', icon: <Utensils size={22} strokeWidth={1.8} />, title: 'Catering', desc: 'Banquetes, menús y servicio.' },
  { id: 'foto', icon: <Camera size={22} strokeWidth={1.8} />, title: 'Fotografía y vídeo', desc: 'Cobertura del evento.' },
  { id: 'musica', icon: <Music size={22} strokeWidth={1.8} />, title: 'Música / DJ', desc: 'Sonido y entretenimiento.' },
  { id: 'deco', icon: <Flower2 size={22} strokeWidth={1.8} />, title: 'Decoración y flores', desc: 'Ambientación y montaje.' },
  { id: 'locacion', icon: <MapPin size={22} strokeWidth={1.8} />, title: 'Locación', desc: 'Espacios para eventos.' },
  { id: 'transporte', icon: <Car size={22} strokeWidth={1.8} />, title: 'Transporte', desc: 'Traslados de invitados.' },
]

export function ProvCategoria() {
  const [sel, setSel] = useState(null)
  return (
    <OnboardingLayout steps={STEPS} current={0} title="¿Qué servicio ofreces?" subtitle="Elige tu categoría principal para mostrarte a los organizadores adecuados." backTo="/registro/proveedor" nextTo="/onboarding-proveedor/servicios" canContinue={!!sel}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CATS.map((c) => <SelectCard key={c.id} {...c} selected={sel === c.id} onClick={() => setSel(c.id)} />)}
      </div>
    </OnboardingLayout>
  )
}

const SERVICIOS = ['Bodas', 'Eventos corporativos', 'Cumpleaños', 'XV Años', 'Comuniones', 'Cócteles', 'Buffet', 'Coffee break']
export function ProvServicios() {
  const [sel, setSel] = useState(['Bodas', 'Eventos corporativos'])
  const toggle = (s) => setSel((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]))
  return (
    <OnboardingLayout steps={STEPS} current={1} title="¿Qué tipo de eventos cubres?" subtitle="Selecciona todos los que apliquen. Podrás detallar tu catálogo después." backTo="/onboarding-proveedor/categoria" nextTo="/onboarding-proveedor/cobertura" canContinue={sel.length > 0}>
      <div className="flex flex-wrap gap-2.5">
        {SERVICIOS.map((s) => {
          const on = sel.includes(s)
          return <button key={s} onClick={() => toggle(s)} className={cls('inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors', on ? 'border-navy bg-navy text-white' : 'border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{on && <Check size={13} strokeWidth={3} />}{s}</button>
        })}
      </div>
    </OnboardingLayout>
  )
}

export function ProvCobertura() {
  const [precio, setPrecio] = useState('')
  return (
    <OnboardingLayout steps={STEPS} current={2} title="Tu zona y tarifas" subtitle="Indícanos dónde trabajas y tu precio de referencia." backTo="/onboarding-proveedor/servicios" nextTo="/onboarding-proveedor/documentos">
      <div className="flex flex-col gap-5">
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink-strong">Ciudad base</span><input className={inputCls} placeholder="Ej. Barcelona" /></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink-strong">Radio de cobertura</span><select className={inputCls}><option>Solo mi ciudad</option><option>Mi provincia</option><option>Toda España</option></select></label>
        <label className="block"><span className="mb-1.5 block text-sm font-semibold text-ink-strong">Precio desde (€ / persona)</span><input type="number" value={precio} onChange={(e) => setPrecio(e.target.value)} className={inputCls} placeholder="Ej. 45" /></label>
      </div>
    </OnboardingLayout>
  )
}

const DOCS = ['CIF / NIF de empresa', 'Seguro de responsabilidad civil', 'Licencia de actividad']
export function ProvDocumentos() {
  const navigate = useNavigate()
  return (
    <OnboardingLayout steps={STEPS} current={3} title="Verifica tu negocio" subtitle="Sube tus documentos para obtener el sello verificado (puedes hacerlo más tarde)." backTo="/onboarding-proveedor/cobertura" nextLabel="Finalizar" onNext={() => navigate('/onboarding-proveedor/listo')}>
      <div className="flex flex-col gap-3">
        {DOCS.map((d) => (
          <div key={d} className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><Upload size={18} /></span>
            <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold text-ink-strong">{d}</p><p className="text-[11.5px] text-ink-muted">PDF · máx. 10 MB</p></div>
            <button className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-ink-strong transition-colors hover:border-navy/40">Subir</button>
          </div>
        ))}
        <div className="mt-1 flex items-start gap-2.5 rounded-lg bg-offwhite p-3 text-[12px] text-ink-muted"><ShieldCheck size={16} className="mt-0.5 shrink-0 text-navy" /> Los proveedores verificados reciben hasta 3× más solicitudes.</div>
      </div>
    </OnboardingLayout>
  )
}

export function ProvListo() {
  const navigate = useNavigate()
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-offwhite px-6 text-center">
      <Confetti />
      <div className="relative z-10 flex max-w-md flex-col items-center">
        <span className="t-pop flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-mint"><PartyPopper size={36} strokeWidth={2} /></span>
        <h1 className="mt-6 text-[24px] font-bold tracking-tight text-ink-strong">¡Tu perfil está listo!</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-ink-muted">Ya puedes empezar a recibir solicitudes de organizadores. Completa tu galería y servicios para destacar aún más.</p>
        <button onClick={() => navigate('/proveedor')} className="mt-7 inline-flex items-center gap-1.5 rounded-lg bg-mint px-5 py-2.5 text-[13px] font-bold text-navy transition hover:bg-[#aee584] active:scale-[0.97]">Ir a mi panel</button>
      </div>
    </div>
  )
}
