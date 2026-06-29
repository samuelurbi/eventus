import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'

/**
 * Pantalla de arranque: reveal del logo oficial sobre navy.
 * Tras ~2.4s navega a /login. Clic para saltar.
 */
export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const t = setTimeout(() => navigate('/login'), 2400)
    return () => clearTimeout(t)
  }, [navigate])

  return (
    <div
      onClick={() => navigate('/login')}
      className="relative flex h-screen cursor-pointer items-center justify-center overflow-hidden bg-hero-gradient"
    >
      <div className="absolute inset-0 hero-grid" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(188,238,149,0.16) 0%, transparent 65%)',
          animation: 'glowPulse 2.4s ease-in-out infinite',
        }}
      />
      <div className="relative flex flex-col items-center">
        <div style={{ animation: 'markIn 0.8s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          <Logo size={52} showText className="text-white" />
        </div>
        <p
          className="mt-6 text-[11px] tracking-[0.3em] text-herolight"
          style={{ animation: 'fadeUp 0.6s 0.7s ease-out both' }}
        >
          ORGANIZA · CONTRATA · COORDINA
        </p>
      </div>
      <style>{`
        @keyframes markIn{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:scale(1)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes glowPulse{0%,100%{opacity:0.7}50%{opacity:1}}
      `}</style>
    </div>
  )
}
