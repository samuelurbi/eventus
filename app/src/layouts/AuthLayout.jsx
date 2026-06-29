import Logo from '../components/Logo'

/**
 * Layout de autenticación a dos columnas 50 / 50:
 *  - Izquierda: panel de marca navy (gradiente + grid + glow + propuesta de valor),
 *    con el contenido centrado verticalmente.
 *  - Derecha: el formulario (children), centrado.
 * El panel de marca se oculta en pantallas pequeñas.
 */
export default function AuthLayout({
  title = 'Todo tu evento,\nen un solo lugar.',
  subtitle = 'Reemplaza WhatsApp, hojas de cálculo y correos por un único espacio para organizar, contratar y coordinar.',
  bullets = [
    'Encuentra y compara proveedores verificados',
    'Controla presupuesto, documentos y mensajes',
    'Coordina cada detalle sin perder el hilo',
  ],
  children,
}) {
  return (
    <div className="flex min-h-screen">
      {/* Panel de marca — 50% */}
      <aside className="relative hidden w-1/2 items-center overflow-hidden bg-hero-gradient lg:flex">
        <div className="absolute inset-0 hero-grid" />
        <div
          className="pointer-events-none absolute -left-32 top-1/4 h-[520px] w-[520px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(188,238,149,0.16) 0%, transparent 70%)' }}
        />
        <div className="relative mx-auto w-full max-w-[520px] px-12">
          <Logo size={30} className="text-white" />
          <h1 className="mt-10 whitespace-pre-line text-balance text-[38px] font-semibold leading-[1.16] tracking-tight text-white">
            {title}
          </h1>
          <p className="mt-6 text-[15px] leading-relaxed text-herolight">{subtitle}</p>
          <ul className="mt-8 space-y-3.5">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-herolight">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint/20 text-mint">
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6.3L4.8 9L10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Panel de formulario — 50% */}
      <main className="flex w-full items-center justify-center bg-offwhite px-6 py-12 lg:w-1/2">
        <div className="w-full max-w-[380px]">
          <div className="mb-8 lg:hidden">
            <Logo size={28} className="text-navy" />
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}
