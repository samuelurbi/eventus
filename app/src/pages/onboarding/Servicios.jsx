import { useState } from 'react'
import {
  UtensilsCrossed, Camera, Music4, Palette, MapPin, Armchair,
  Theater, Bus, Wine, Cake, Mail, ShieldCheck,
} from 'lucide-react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import SelectTile from '../../components/SelectTile'

const SERVICIOS = [
  { id: 'banquete', icon: <UtensilsCrossed size={26} strokeWidth={1.6} />, label: 'Banquete' },
  { id: 'foto', icon: <Camera size={26} strokeWidth={1.6} />, label: 'Fotografía' },
  { id: 'musica', icon: <Music4 size={26} strokeWidth={1.6} />, label: 'Música / DJ' },
  { id: 'deco', icon: <Palette size={26} strokeWidth={1.6} />, label: 'Decoración' },
  { id: 'locacion', icon: <MapPin size={26} strokeWidth={1.6} />, label: 'Locación' },
  { id: 'mobiliario', icon: <Armchair size={26} strokeWidth={1.6} />, label: 'Mobiliario' },
  { id: 'animacion', icon: <Theater size={26} strokeWidth={1.6} />, label: 'Animación' },
  { id: 'transporte', icon: <Bus size={26} strokeWidth={1.6} />, label: 'Transporte' },
  { id: 'bebidas', icon: <Wine size={26} strokeWidth={1.6} />, label: 'Bebidas' },
  { id: 'pasteleria', icon: <Cake size={26} strokeWidth={1.6} />, label: 'Pastelería' },
  { id: 'invitaciones', icon: <Mail size={26} strokeWidth={1.6} />, label: 'Invitaciones' },
  { id: 'seguridad', icon: <ShieldCheck size={26} strokeWidth={1.6} />, label: 'Seguridad' },
]

export default function Servicios() {
  const [sel, setSel] = useState([])
  const toggle = (id) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  return (
    <OnboardingLayout
      current={4}
      title="¿Qué servicios sueles necesitar?"
      subtitle="Elige los que te interesen para empezar a explorar proveedores."
      backTo="/onboarding/presupuesto"
      nextTo="/onboarding/listo"
      nextLabel="Finalizar"
      canContinue={sel.length > 0}
    >
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {SERVICIOS.map((s) => (
          <SelectTile key={s.id} {...s} selected={sel.includes(s.id)} onClick={() => toggle(s.id)} />
        ))}
      </div>
    </OnboardingLayout>
  )
}
