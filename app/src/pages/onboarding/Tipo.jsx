import { useState } from 'react'
import { User, Building2, BriefcaseBusiness } from 'lucide-react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import SelectCard from '../../components/SelectCard'

const OPCIONES = [
  {
    id: 'particular',
    icon: <User size={22} strokeWidth={1.8} />,
    title: 'Particular',
    desc: 'Organizo eventos personales o familiares.',
  },
  {
    id: 'empresa',
    icon: <Building2 size={22} strokeWidth={1.8} />,
    title: 'Empresa',
    desc: 'Coordino eventos corporativos para mi organización.',
  },
  {
    id: 'profesional',
    icon: <BriefcaseBusiness size={22} strokeWidth={1.8} />,
    title: 'Profesional de eventos',
    desc: 'Me dedico a organizar eventos para clientes.',
  },
]

export default function Tipo() {
  const [sel, setSel] = useState(null)
  return (
    <OnboardingLayout
      current={0}
      title="¿Qué tipo de organizador eres?"
      subtitle="Así adaptamos las herramientas y proveedores que te mostramos."
      backTo="/registro/organizador"
      nextTo="/onboarding/eventos"
      canContinue={!!sel}
    >
      <div className="space-y-3">
        {OPCIONES.map((o) => (
          <SelectCard key={o.id} {...o} selected={sel === o.id} onClick={() => setSel(o.id)} />
        ))}
      </div>
    </OnboardingLayout>
  )
}
