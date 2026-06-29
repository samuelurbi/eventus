import { useState } from 'react'
import { Search, Send, Paperclip, Phone, Video, ArrowLeft } from 'lucide-react'
import { PROV_CONVERSACIONES } from '../../data/proveedorMock'
import { ESTADO_MSG } from '../../data/mock'
import { Badge, cls } from '../../components/ui'
import { ChatBubble } from '../../components/ChatBubble'
import { usePageHeader } from '../../layouts/pageHeader'

const FILTROS = ['Todos', 'En negociación', 'Aceptado', 'Rechazado']

export default function Mensajes() {
  const [activa, setActiva] = useState(PROV_CONVERSACIONES[0].id)
  const [q, setQ] = useState('')
  const [filtro, setFiltro] = useState('Todos')
  const [vista, setVista] = useState('lista')
  usePageHeader('Mensajes', `${PROV_CONVERSACIONES.length} conversaciones`)
  const conv = PROV_CONVERSACIONES.find((c) => c.id === activa)
  const lista = PROV_CONVERSACIONES.filter((c) => (filtro === 'Todos' || c.estado === filtro) && c.de.toLowerCase().includes(q.toLowerCase()))

  return (
    <div className="flex h-full flex-col p-3 sm:p-5">
      <div className="flex min-h-0 flex-1 overflow-hidden rounded-lg border border-gray-200 bg-white">
        {/* Lista */}
        <aside className={cls('w-full shrink-0 flex-col border-r border-gray-200 lg:flex lg:w-80', vista === 'hilo' ? 'hidden lg:flex' : 'flex')}>
          <div className="border-b border-gray-200 p-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar conversaciones…" className="h-9 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {FILTROS.map((f) => (
                <button key={f} onClick={() => setFiltro(f)} className={cls('rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors', filtro === f ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{f}</button>
              ))}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto">
            {lista.map((c) => (
              <button key={c.id} onClick={() => { setActiva(c.id); setVista('hilo') }} className={cls('flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors', c.id === activa ? 'bg-mint/10' : 'hover:bg-gray-50')}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{c.avatar}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2"><p className="truncate text-[13px] font-semibold text-ink-strong">{c.de}</p><span className="shrink-0 text-[10px] text-ink-subtle">{c.hora}</span></div>
                  <div className="mt-1 flex items-center gap-1.5"><span className="truncate rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">{c.evento}</span><Badge tone={ESTADO_MSG[c.estado]}>{c.estado}</Badge></div>
                  <p className="mt-1 truncate text-[11.5px] text-ink-muted">{c.ultimo}</p>
                </div>
                {c.noLeidos > 0 && <span className="mt-1 flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">{c.noLeidos}</span>}
              </button>
            ))}
            {lista.length === 0 && <p className="px-4 py-8 text-center text-[12px] text-ink-muted">Sin conversaciones en este filtro.</p>}
          </div>
        </aside>

        {/* Hilo */}
        <section className={cls('min-w-0 flex-1 flex-col bg-offwhite lg:flex', vista === 'lista' ? 'hidden lg:flex' : 'flex')}>
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
            <div className="flex items-center gap-3">
              <button onClick={() => setVista('lista')} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden" aria-label="Volver"><ArrowLeft size={18} /></button>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{conv.avatar}</span>
              <div className="min-w-0">
                <div className="flex items-center gap-2"><p className="truncate text-[13px] font-bold text-ink-strong">{conv.de}</p><Badge tone={ESTADO_MSG[conv.estado]}>{conv.estado}</Badge></div>
                <p className="truncate text-[11px] text-ink-subtle">{conv.evento}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100"><Phone size={16} /></button>
              <button className="hidden h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 sm:flex"><Video size={16} /></button>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
            {conv.mensajes.map((m, i) => <ChatBubble key={i} m={m} />)}
          </div>
          <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3">
            <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100"><Paperclip size={17} /></button>
            <input placeholder="Escribe un mensaje…" className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3.5 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
            <button className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-mint px-4 text-[13px] font-semibold text-navy transition-colors hover:bg-[#aee584]"><Send size={15} strokeWidth={2.2} /> Enviar</button>
          </div>
        </section>
      </div>
    </div>
  )
}
