import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Calendar, MapPin, Clock, Check, X, Heart, PartyPopper } from 'lucide-react'
import { EVENTOS } from '../data/mock'
import { cls } from '../components/ui'
import Logo from '../components/Logo'

const inputCls = 'h-11 w-full rounded-lg border border-gray-200 bg-white px-3.5 text-sm text-ink-strong placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-2 focus:ring-mint/50'

export default function Rsvp() {
  const { id } = useParams()
  const evento = EVENTOS.find((e) => String(e.id) === id) ?? EVENTOS[0]
  const [asiste, setAsiste] = useState(null) // true | false
  const [done, setDone] = useState(false)
  const [nombre, setNombre] = useState('')
  const titulo = evento.nombre.replace(/^Boda\s+/i, '')

  return (
    <div className="flex min-h-screen items-center justify-center bg-offwhite px-4 py-10">
      <div className="t-rise w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white">
        {/* Cabecera */}
        <div className="relative px-6 py-8 text-center text-white" style={{ backgroundImage: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' }}>
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-mint"><Heart size={22} fill="currentColor" /></span>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-mint">Estás invitado/a</p>
          <h1 className="mt-1.5 font-serif text-[26px] leading-tight">{titulo}</h1>
          <div className="mt-4 flex flex-col items-center gap-1 text-[12.5px] text-herolight">
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {evento.fecha}</span>
            <span className="flex items-center gap-1.5"><MapPin size={13} /> {evento.lugar}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> 19:00 h</span>
          </div>
        </div>

        {/* Cuerpo */}
        {done ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <span className="t-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-navy">{asiste ? <PartyPopper size={30} /> : <Check size={30} strokeWidth={2.4} />}</span>
            <h2 className="text-[18px] font-bold text-ink-strong">{asiste ? `¡Gracias, ${nombre || 'nos vemos allí'}!` : 'Respuesta registrada'}</h2>
            <p className="max-w-xs text-[13px] leading-relaxed text-ink-muted">{asiste ? 'Tu asistencia quedó confirmada. El organizador ya lo sabe. ¡Te esperamos!' : 'Gracias por avisar. Sentimos que no puedas acompañarnos.'}</p>
          </div>
        ) : (
          <div className="px-6 py-6">
            <p className="text-center text-[13px] font-semibold text-ink-strong">¿Podrás acompañarnos?</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button onClick={() => setAsiste(true)} className={cls('flex items-center justify-center gap-2 rounded-lg border py-3 text-[13px] font-semibold transition-colors', asiste === true ? 'border-navy bg-navy text-white' : 'border-gray-200 text-ink-strong hover:border-navy/40')}><Check size={16} /> Sí, asistiré</button>
              <button onClick={() => setAsiste(false)} className={cls('flex items-center justify-center gap-2 rounded-lg border py-3 text-[13px] font-semibold transition-colors', asiste === false ? 'border-red-300 bg-red-50 text-red-600' : 'border-gray-200 text-ink-strong hover:border-red-300')}><X size={16} /> No podré</button>
            </div>

            {asiste !== null && (
              <div className="mt-5 flex flex-col gap-3">
                <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Tu nombre</span><input value={nombre} onChange={(e) => setNombre(e.target.value)} className={inputCls} placeholder="Nombre y apellidos" /></label>
                {asiste && (
                  <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Acompañantes</span><select className={inputCls}><option>Solo yo</option><option>+1</option><option>+2</option></select></label>
                )}
                <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Mensaje para los anfitriones (opcional)</span><textarea rows={2} className={cls(inputCls, 'h-auto resize-none py-2.5')} placeholder="Escribe algo bonito…" /></label>
                <button onClick={() => setDone(true)} className="mt-1 w-full rounded-lg bg-mint py-3 text-[14px] font-bold text-navy transition hover:bg-[#aee584] active:scale-[0.98]">Enviar respuesta</button>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 bg-offwhite py-3 text-[10px] uppercase tracking-[0.2em] text-ink-subtle">
          <Logo size={14} className="text-navy" />
        </div>
      </div>
    </div>
  )
}
