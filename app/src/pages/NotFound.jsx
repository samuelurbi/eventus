import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Home, Compass } from 'lucide-react'
import Logo from '../components/Logo'

export default function NotFound() {
  const navigate = useNavigate()
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-offwhite px-6 text-center">
      <Logo size={26} className="text-navy" />
      <div className="t-rise mt-10 flex flex-col items-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-mint"><Compass size={38} strokeWidth={1.8} /></span>
        <p className="mt-6 text-[64px] font-bold leading-none tracking-tight text-navy">404</p>
        <h1 className="mt-3 text-[20px] font-bold text-ink-strong">Esta página no existe</h1>
        <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-ink-muted">La página que buscas no está disponible o se movió. Vuelve al inicio y sigue planeando tu evento.</p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <Link to="/organizador" className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-mint px-4 py-2.5 text-[13px] font-semibold text-navy transition hover:bg-[#aee584] active:scale-[0.97]"><Home size={16} /> Ir al inicio</Link>
          <button onClick={() => navigate(-1)} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-ink-strong transition hover:border-navy/40 active:scale-[0.97]"><ArrowLeft size={16} /> Volver atrás</button>
        </div>
      </div>
    </div>
  )
}
