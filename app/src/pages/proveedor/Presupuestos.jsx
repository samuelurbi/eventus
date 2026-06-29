import { useState } from 'react'
import { FileText, Check, X, Clock, Plus } from 'lucide-react'
import { Card, Badge, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { PRESUPUESTOS, PRESUPUESTO_TONE, EUR } from '../../data/proveedorMock'

const CHIPS = ['Todos', 'Enviado', 'En negociación', 'Aceptado', 'Rechazado']

export default function Presupuestos() {
  const [chip, setChip] = useState('Todos')
  usePageHeader('Presupuestos', 'Gestiona las propuestas que has enviado')

  const lista = PRESUPUESTOS.filter((p) => chip === 'Todos' || p.estado === chip)
  const aceptados = PRESUPUESTOS.filter((p) => p.estado === 'Aceptado')
  const stats = [
    { label: 'Total enviados', value: PRESUPUESTOS.length, Icon: FileText },
    { label: 'Aceptados', value: aceptados.length, Icon: Check },
    { label: 'En negociación', value: PRESUPUESTOS.filter((p) => p.estado === 'En negociación').length, Icon: Clock },
    { label: 'Importe ganado', value: EUR.format(aceptados.reduce((a, b) => a + b.total, 0)), Icon: Check, wide: true },
  ]

  return (
    <div className="px-4 py-5 sm:px-7">
      {/* Stats */}
      <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <div className="mb-2 flex items-center justify-between"><p className="text-[11.5px] text-ink-muted">{s.label}</p><s.Icon size={15} className="text-ink-subtle" /></div>
            <p className={cls('font-bold leading-none text-ink-strong', s.wide ? 'text-[20px]' : 'text-[24px]')}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {CHIPS.map((c) => (
              <button key={c} onClick={() => setChip(c)} className={cls('rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors', chip === c ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{c}</button>
            ))}
          </div>
          <BtnPrimary to="/proveedor/solicitudes"><Plus size={15} /> Nuevo presupuesto</BtnPrimary>
        </div>

        {/* Cabecera (desktop) */}
        <div className="hidden grid-cols-[1.5fr_1fr_120px_110px_130px_90px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Evento</span><span>Cliente</span><span>Fecha</span><span>Conceptos</span><span>Estado</span><span className="text-right">Total</span>
        </div>
        <div className="divide-y divide-gray-100">
          {lista.map((p) => (
            <div key={p.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3.5 transition-colors hover:bg-gray-50 md:grid-cols-[1.5fr_1fr_120px_110px_130px_90px] md:gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy md:hidden"><FileText size={16} /></span>
                <span className="text-[13.5px] font-bold text-ink-strong">{p.evento}</span>
              </div>
              <span className="text-[12.5px] text-ink-body">{p.cliente}</span>
              <span className="text-[12px] text-ink-muted">{p.fecha}</span>
              <span className="text-[12px] text-ink-muted">{p.items} conceptos</span>
              <span><Badge tone={PRESUPUESTO_TONE[p.estado]}>{p.estado}</Badge></span>
              <span className="text-[13.5px] font-bold text-ink-strong md:text-right">{EUR.format(p.total)}</span>
            </div>
          ))}
          {lista.length === 0 && <p className="px-5 py-12 text-center text-[13px] text-ink-muted">No hay presupuestos en este estado.</p>}
        </div>
      </Card>
    </div>
  )
}
