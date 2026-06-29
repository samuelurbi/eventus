import { useState } from 'react'
import { Check, X, FileText } from 'lucide-react'
import { FMT } from '../data/theme'
import { cls } from './ui'

// Renderiza un mensaje de chat: burbuja de texto o tarjeta de presupuesto con aceptar/rechazar
export function ChatBubble({ m }) {
  if (m.tipo === 'presupuesto') return <PresupuestoCard m={m} />
  return (
    <div className={cls('flex flex-col', m.mio ? 'items-end' : 'items-start')}>
      <div className={cls('max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug', m.mio ? 'rounded-br-md bg-navy text-white' : 'rounded-bl-md border border-gray-200 bg-white text-ink-body')}>{m.texto}</div>
      <span className="mt-1 px-1 text-[10px] text-ink-subtle">{m.hora}</span>
    </div>
  )
}

function PresupuestoCard({ m }) {
  const [estado, setEstado] = useState(m.estado || 'pendiente')
  const mio = !!m.mio // presupuesto enviado por mí (vista proveedor) → solo lectura
  return (
    <div className={cls('flex flex-col', mio ? 'items-end' : 'items-start')}>
      <div className={cls('w-[300px] max-w-[88%] overflow-hidden rounded-2xl border border-gray-200 bg-white', mio ? 'rounded-br-md' : 'rounded-bl-md')}>
        <div className="flex items-center gap-2 border-b border-gray-100 bg-offwhite px-3.5 py-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><FileText size={14} /></span>
          <div className="min-w-0"><p className="truncate text-[12.5px] font-bold text-ink-strong">{m.concepto}</p><p className="text-[10.5px] text-ink-subtle">Presupuesto recibido</p></div>
        </div>
        <div className="flex flex-col gap-1.5 px-3.5 py-3">
          {m.items.map((it, i) => (
            <div key={i} className="flex justify-between text-[12px]"><span className="text-ink-muted">{it.label}</span><span className="text-ink-body">{FMT.format(it.monto)}</span></div>
          ))}
          <div className="mt-1 flex justify-between border-t border-gray-100 pt-2 text-[13px] font-bold text-ink-strong"><span>Total</span><span>{FMT.format(m.total)}</span></div>
        </div>
        <div className="border-t border-gray-100 p-2.5">
          {estado === 'pendiente' && mio ? (
            <div className="flex items-center justify-center gap-1.5 rounded-lg bg-gray-50 py-2 text-[12.5px] font-semibold text-ink-muted">Enviado · Esperando respuesta</div>
          ) : estado === 'pendiente' ? (
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setEstado('aceptado')} className="flex items-center justify-center gap-1.5 rounded-lg bg-mint py-2 text-[12.5px] font-semibold text-navy transition-colors hover:bg-[#aee584]"><Check size={14} strokeWidth={2.5} /> Aceptar</button>
              <button onClick={() => setEstado('rechazado')} className="flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[12.5px] font-semibold text-ink-muted transition-colors hover:border-red-300 hover:text-red-500"><X size={14} strokeWidth={2.5} /> Rechazar</button>
            </div>
          ) : (
            <div className={cls('flex items-center justify-center gap-1.5 rounded-lg py-2 text-[12.5px] font-semibold', estado === 'aceptado' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500')}>
              {estado === 'aceptado' ? <><Check size={14} /> Presupuesto aceptado</> : <><X size={14} /> Presupuesto rechazado</>}
            </div>
          )}
        </div>
      </div>
      <span className="mt-1 px-1 text-[10px] text-ink-subtle">{m.hora}</span>
    </div>
  )
}
