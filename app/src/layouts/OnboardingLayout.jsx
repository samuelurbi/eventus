import { Link, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import Button from '../components/Button'

export const ONBOARDING_STEPS = [
  { label: 'Tipo de organizador', path: '/onboarding/tipo' },
  { label: 'Tipos de eventos', path: '/onboarding/eventos' },
  { label: 'Ubicación', path: '/onboarding/ubicacion' },
  { label: 'Presupuesto', path: '/onboarding/presupuesto' },
  { label: 'Servicios', path: '/onboarding/servicios' },
]

/**
 * Layout de onboarding a dos columnas, coherente con el de Auth:
 *  - Izquierda (navy): logo + stepper vertical con progreso.
 *  - Derecha: encabezado de la pregunta + contenido (children) + footer (Atrás / Continuar).
 */
export default function OnboardingLayout({
  current = 0,
  title,
  subtitle,
  children,
  backTo,
  nextTo,
  nextLabel = 'Continuar',
  canContinue = true,
  onNext,
}) {
  const navigate = useNavigate()
  const total = ONBOARDING_STEPS.length

  function handleNext() {
    if (!canContinue) return
    if (onNext) onNext()
    else if (nextTo) navigate(nextTo)
  }

  return (
    <div className="flex min-h-screen">
      {/* Stepper — panel navy */}
      <aside className="relative hidden w-[38%] max-w-[420px] overflow-hidden bg-hero-gradient lg:flex lg:flex-col">
        <div className="absolute inset-0 hero-grid" />
        <div
          className="pointer-events-none absolute -left-28 bottom-10 h-[460px] w-[460px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(188,238,149,0.14) 0%, transparent 70%)' }}
        />
        <div className="relative flex h-full flex-col p-10 xl:p-12">
          <Logo size={28} className="text-white" />

          <div className="mt-14 flex-1">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-mint">Configura tu cuenta</p>
            <h2 className="mt-2 text-2xl font-semibold leading-snug text-white">
              Personalicemos tu experiencia
            </h2>

            <ol className="mt-9 space-y-1">
              {ONBOARDING_STEPS.map((step, i) => {
                const done = i < current
                const active = i === current
                return (
                  <li key={step.path} className="flex items-center gap-3.5 py-2">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                        done
                          ? 'bg-mint text-navy'
                          : active
                          ? 'bg-white text-navy'
                          : 'border border-white/25 text-white/50'
                      }`}
                    >
                      {done ? (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6.3L4.8 9L10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      ) : (
                        i + 1
                      )}
                    </span>
                    <span className={`text-sm ${active ? 'font-semibold text-white' : done ? 'text-herolight' : 'text-white/45'}`}>
                      {step.label}
                    </span>
                  </li>
                )
              })}
            </ol>
          </div>

          <p className="text-xs text-white/40">Podrás cambiar todo esto más tarde en tu configuración.</p>
        </div>
      </aside>

      {/* Pregunta — panel claro */}
      <main className="flex w-full flex-col bg-offwhite lg:w-[62%]">
        {/* topbar móvil */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:hidden">
          <Logo size={24} className="text-navy" />
          <span className="text-xs font-medium text-ink-muted">Paso {current + 1} de {total}</span>
        </div>

        <div className="flex flex-1 items-start justify-center overflow-y-auto px-6 py-10 sm:px-10 lg:py-14">
          <div className="w-full max-w-[560px]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy-light">
              Paso {current + 1} de {total}
            </p>
            <h1 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight text-ink-strong">{title}</h1>
            {subtitle && <p className="mt-2 text-[15px] text-ink-muted">{subtitle}</p>}

            <div className="mt-8">{children}</div>
          </div>
        </div>

        {/* footer de navegación */}
        <div className="border-t border-gray-200 bg-white px-6 py-4 sm:px-10">
          <div className="mx-auto flex max-w-[560px] items-center justify-between">
            {backTo ? (
              <Link to={backTo} className="text-sm font-medium text-ink-muted hover:text-ink-strong">
                ← Atrás
              </Link>
            ) : (
              <span />
            )}
            <Button onClick={handleNext} disabled={!canContinue} size="lg" className="px-8">
              {nextLabel}
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
