import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X } from 'lucide-react'

export const cls = (...a) => a.filter(Boolean).join(' ')

// Modal centrado con backdrop (sin sombra: separación por backdrop + borde)
// Anima entrada/salida con .t-modal (scale-up al abrir, scale-down al cerrar).
export function Modal({ open, onClose, title, children, footer, wide }) {
  const [render, setRender] = useState(open)
  const [state, setState] = useState(open ? 'open' : 'closed') // 'open' | 'closing' | 'closed'

  useEffect(() => {
    if (open) {
      setRender(true)
      const r = requestAnimationFrame(() => requestAnimationFrame(() => setState('open')))
      return () => cancelAnimationFrame(r)
    }
    if (render) {
      setState('closing')
      const t = setTimeout(() => { setState('closed'); setRender(false) }, 160)
      return () => clearTimeout(t)
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!render) return null
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className={cls('absolute inset-0 bg-navy/40 backdrop-blur-[2px] transition-opacity duration-200', state === 'open' ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <div className={cls('t-modal relative z-10 flex max-h-[90vh] w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white', wide ? 'max-w-4xl' : 'max-w-lg', state === 'open' && 'is-open', state === 'closing' && 'is-closing')}>
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <h3 className="text-[15px] font-bold text-ink-strong">{title}</h3>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100"><X size={18} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">{children}</div>
        {footer && <div className="border-t border-gray-200 px-5 py-3">{footer}</div>}
      </div>
    </div>
  )
}

// Card blanca base (sin sombra, borde + radio interno)
export function Card({ className = '', children }) {
  return <section className={cls('rounded-lg border border-gray-200 bg-white', className)}>{children}</section>
}

// Encabezado de card con barrita de acento navy
export function CardHeader({ title, action, className = '' }) {
  return (
    <div className={cls('flex items-center justify-between border-b border-gray-200 px-5 py-4', className)}>
      <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong">
        <span className="h-3.5 w-[3px] rounded-full bg-navy" />{title}
      </h2>
      {action}
    </div>
  )
}

// Título de página (debajo del topbar)
export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-[20px] font-bold tracking-tight text-ink-strong">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-ink-muted">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

const TONES = {
  gray:   'bg-gray-100 text-ink-muted',
  mint:   'bg-mint/25 text-navy',
  navy:   'bg-navy/8 text-navy',
  green:  'bg-green-50 text-green-600',
  amber:  'bg-amber-50 text-amber-600',
  red:    'bg-red-50 text-red-500',
  rose:   'bg-rose-50 text-rose-600',
  violet: 'bg-violet-50 text-violet-600',
}
export function Badge({ children, tone = 'gray', className = '' }) {
  return (
    <span className={cls('inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold', TONES[tone] ?? TONES.gray, className)}>
      {children}
    </span>
  )
}

// Botón primario (mint) — Link si hay `to`, button si hay `onClick`
export function BtnPrimary({ children, to, onClick, type, className = '' }) {
  const cn = cls('inline-flex items-center justify-center gap-1.5 rounded-lg bg-mint px-3.5 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-[#aee584]', className)
  if (to) return <Link to={to} className={cn}>{children}</Link>
  return <button type={type || 'button'} onClick={onClick} className={cn}>{children}</button>
}

// Botón secundario (contorno)
export function BtnOutline({ children, to, onClick, className = '' }) {
  const cn = cls('inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-[13px] font-semibold text-ink-strong transition-colors hover:border-navy/40', className)
  if (to) return <Link to={to} className={cn}>{children}</Link>
  return <button type="button" onClick={onClick} className={cn}>{children}</button>
}

// Barra de progreso
export function Progress({ pct, grad, className = '' }) {
  return (
    <div className={cls('h-2 overflow-hidden rounded-full bg-gray-100', className)}>
      <div className="h-full rounded-full bg-navy" style={{ width: `${pct}%`, backgroundImage: grad }} />
    </div>
  )
}
