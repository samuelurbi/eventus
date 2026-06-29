import { useState } from 'react'
import { Sprout, TrendingUp, BarChart3, Gem, HelpCircle } from 'lucide-react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import SelectCard from '../../components/SelectCard'

const RANGOS = [
  { id: 'r1', icon: <Sprout size={22} strokeWidth={1.8} />, title: 'Hasta $50,000 MXN', desc: 'Eventos íntimos o de bajo presupuesto.' },
  { id: 'r2', icon: <TrendingUp size={22} strokeWidth={1.8} />, title: '$50,000 – $150,000 MXN', desc: 'El rango más común para eventos medianos.' },
  { id: 'r3', icon: <BarChart3 size={22} strokeWidth={1.8} />, title: '$150,000 – $500,000 MXN', desc: 'Eventos grandes con varios proveedores.' },
  { id: 'r4', icon: <Gem size={22} strokeWidth={1.8} />, title: 'Más de $500,000 MXN', desc: 'Producciones premium a gran escala.' },
  { id: 'r5', icon: <HelpCircle size={22} strokeWidth={1.8} />, title: 'Aún no lo sé', desc: 'Te ayudamos a estimarlo más adelante.' },
]

export default function Presupuesto() {
  const [sel, setSel] = useState(null)
  return (
    <OnboardingLayout
      current={3}
      title="¿Cuál es tu presupuesto aproximado?"
      subtitle="Nos ayuda a recomendarte proveedores dentro de tu rango."
      backTo="/onboarding/ubicacion"
      nextTo="/onboarding/servicios"
      canContinue={!!sel}
    >
      <div className="space-y-3">
        {RANGOS.map((r) => (
          <SelectCard key={r.id} {...r} selected={sel === r.id} onClick={() => setSel(r.id)} />
        ))}
      </div>
    </OnboardingLayout>
  )
}
