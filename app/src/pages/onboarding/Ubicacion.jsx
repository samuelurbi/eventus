import { useState } from 'react'
import OnboardingLayout from '../../layouts/OnboardingLayout'
import Input from '../../components/Input'

const POPULARES = ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Bilbao', 'Málaga', 'Zaragoza', 'Granada']

export default function Ubicacion() {
  const [ciudad, setCiudad] = useState('')

  return (
    <OnboardingLayout
      current={2}
      title="¿Dónde organizas tus eventos?"
      subtitle="Te conectamos con proveedores disponibles en tu zona."
      backTo="/onboarding/eventos"
      nextTo="/onboarding/presupuesto"
      canContinue={ciudad.trim().length > 0}
    >
      <Input
        label="Ciudad principal"
        name="ciudad"
        placeholder="Escribe tu ciudad…"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />

      <p className="mb-3 mt-7 text-[13px] font-medium text-ink-strong">Ciudades populares</p>
      <div className="flex flex-wrap gap-2.5">
        {POPULARES.map((c) => {
          const active = ciudad === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCiudad(c)}
              className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors ${
                active
                  ? 'border-navy bg-navy text-white'
                  : 'border-gray-200 bg-white text-ink-body hover:border-gray-300 hover:bg-gray-100'
              }`}
            >
              {c}
            </button>
          )
        })}
      </div>
    </OnboardingLayout>
  )
}
