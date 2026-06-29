import { Link } from 'react-router-dom'
import Logo, { Isotipo } from '../../components/Logo'
import Button from '../../components/Button'

export default function Listo() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-hero-gradient px-6">
      <div className="absolute inset-0 hero-grid" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(188,238,149,0.16) 0%, transparent 65%)' }}
      />

      <div className="absolute left-0 top-0 p-8">
        <Logo size={26} className="text-white" />
      </div>

      <div className="relative w-full max-w-md text-center">
        <div
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/5 ring-1 ring-mint/30"
          style={{ animation: 'markIn 0.7s cubic-bezier(0.34,1.56,0.64,1) both' }}
        >
          <Isotipo size={56} />
        </div>

        <h1
          className="mt-8 text-[34px] font-semibold leading-tight tracking-tight text-white"
          style={{ animation: 'fadeUp 0.6s 0.25s ease-out both' }}
        >
          ¡Todo listo, Samuel!
        </h1>
        <p
          className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-herolight"
          style={{ animation: 'fadeUp 0.6s 0.4s ease-out both' }}
        >
          Configuramos tu espacio según tus respuestas. Ya puedes empezar a organizar tu evento y encontrar
          proveedores ideales para ti.
        </p>

        <div className="mt-9 flex flex-col items-center gap-3" style={{ animation: 'fadeUp 0.6s 0.55s ease-out both' }}>
          <Button as={Link} to="/organizador" size="lg" className="px-10">
            Ir a mi panel →
          </Button>
          <Link to="/onboarding/servicios" className="text-sm font-medium text-herolight hover:text-white">
            Volver atrás
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes markIn{from{opacity:0;transform:scale(0.7)}to{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
      `}</style>
    </div>
  )
}
