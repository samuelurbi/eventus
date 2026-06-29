import { useState } from 'react'
import {
  Heart, Cake, Building2, Mic2, PartyPopper, GraduationCap, Flower2, Rocket, Star,
} from 'lucide-react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import SelectTile from '../../components/SelectTile'

const EVENTOS = [
  { id: 'boda', icon: <Heart size={26} strokeWidth={1.6} />, label: 'Boda' },
  { id: 'cumple', icon: <Cake size={26} strokeWidth={1.6} />, label: 'Cumpleaños' },
  { id: 'corporativo', icon: <Building2 size={26} strokeWidth={1.6} />, label: 'Corporativo' },
  { id: 'conferencia', icon: <Mic2 size={26} strokeWidth={1.6} />, label: 'Conferencia' },
  { id: 'fiesta', icon: <PartyPopper size={26} strokeWidth={1.6} />, label: 'Fiesta' },
  { id: 'graduacion', icon: <GraduationCap size={26} strokeWidth={1.6} />, label: 'Graduación' },
  { id: 'aniversario', icon: <Flower2 size={26} strokeWidth={1.6} />, label: 'Aniversario' },
  { id: 'lanzamiento', icon: <Rocket size={26} strokeWidth={1.6} />, label: 'Lanzamiento' },
  { id: 'otro', icon: <Star size={26} strokeWidth={1.6} />, label: 'Otro' },
]

export default function Eventos() {
  const [sel, setSel] = useState([])
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <OnboardingLayout
      current={1}
      title="¿Qué tipo de eventos organizas?"
      subtitle="Elige todos los que apliquen. Puedes seleccionar varios."
      backTo="/onboarding/tipo"
      nextTo="/onboarding/ubicacion"
      canContinue={sel.length > 0}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {EVENTOS.map((e) => (
          <SelectTile key={e.id} {...e} selected={sel.includes(e.id)} onClick={() => toggle(e.id)} />
        ))}
      </div>
    </OnboardingLayout>
  )
}
