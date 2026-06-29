import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, CornerDownLeft } from 'lucide-react'
import { cls } from './ui'

// Búsqueda global con dropdown de resultados agrupados.
// `items`: [{ group, label, sub, to, Icon }]
export function GlobalSearch({ items = [], placeholder = 'Buscar…' }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [shown, setShown] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    if (!open) { setShown(false); return }
    const r = requestAnimationFrame(() => setShown(true))
    return () => cancelAnimationFrame(r)
  }, [open])

  const query = q.trim().toLowerCase()
  const results = query
    ? items.filter((i) => `${i.label} ${i.sub || ''} ${i.group}`.toLowerCase().includes(query)).slice(0, 8)
    : []
  const grupos = [...new Set(results.map((r) => r.group))]

  const go = (to) => { navigate(to); setQ(''); setOpen(false) }
  const onKey = (e) => { if (e.key === 'Enter' && results[0]) go(results[0].to); if (e.key === 'Escape') setOpen(false) }

  return (
    <div ref={boxRef} className="relative w-full">
      <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
      <input
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder={placeholder}
        className="h-8 w-full rounded-lg border border-gray-200 bg-gray-100 pl-8 pr-10 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy-light focus:bg-white focus:outline-none focus:ring-1 focus:ring-mint/40"
      />
      <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded bg-gray-200 px-1 py-0.5 text-[10px] font-medium text-ink-subtle">⌘K</kbd>

      {open && query && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div data-origin="top-right" className={cls('t-dropdown absolute right-0 z-50 mt-2 max-h-[60vh] w-[340px] max-w-[calc(100vw-2rem)] overflow-y-auto rounded-xl border border-gray-200 bg-white', shown && 'is-open')}>
            {results.length === 0 ? (
              <p className="px-4 py-6 text-center text-[12.5px] text-ink-muted">Sin resultados para «{q}»</p>
            ) : (
              grupos.map((g) => (
                <div key={g} className="py-1">
                  <p className="px-4 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-widest text-ink-subtle">{g}</p>
                  {results.filter((r) => r.group === g).map((r, i) => (
                    <button key={i} onClick={() => go(r.to)} className="flex w-full items-center gap-3 px-4 py-2 text-left transition-colors hover:bg-gray-50">
                      {r.Icon && <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><r.Icon size={14} /></span>}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13px] font-medium text-ink-strong">{r.label}</span>
                        {r.sub && <span className="block truncate text-[11px] text-ink-subtle">{r.sub}</span>}
                      </span>
                    </button>
                  ))}
                </div>
              ))
            )}
            {results.length > 0 && (
              <div className="flex items-center gap-1.5 border-t border-gray-100 px-4 py-2 text-[10.5px] text-ink-subtle"><CornerDownLeft size={12} /> Enter para abrir el primero</div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
