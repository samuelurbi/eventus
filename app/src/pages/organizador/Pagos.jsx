import { useState } from 'react'
import { Wallet, Clock, CalendarClock, Plus, Check } from 'lucide-react'
import { EVENTOS } from '../../data/mock'
import { FMT } from '../../data/theme'
import { Card, Badge, BtnPrimary, BtnOutline, Modal, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

const PAGOS = [
  { id: 1, evento: 'Boda Martínez & López', concepto: 'Anticipo — Hacienda San Juan', metodo: 'Transferencia', fecha: '20 jun 2026', monto: 40000, estado: 'Pagado' },
  { id: 2, evento: 'Boda Martínez & López', concepto: 'Anticipo — Banquetes Díaz', metodo: 'Tarjeta', fecha: '24 jun 2026', monto: 30000, estado: 'Pagado' },
  { id: 3, evento: 'XV Años Sofía Ramírez', concepto: 'Reserva salón', metodo: 'Transferencia', fecha: '02 jul 2026', monto: 12000, estado: 'Pagado' },
  { id: 4, evento: 'Boda Martínez & López', concepto: '2º pago — Hacienda San Juan', metodo: 'Pendiente', fecha: '15 jul 2026', monto: 45000, estado: 'Pendiente' },
  { id: 5, evento: 'Boda Martínez & López', concepto: '2º pago — Banquetes Díaz', metodo: 'Pendiente', fecha: '01 ago 2026', monto: 34000, estado: 'Pendiente' },
  { id: 6, evento: 'Convención Anual TechES', concepto: 'Anticipo locación', metodo: 'Tarjeta', fecha: '18 jun 2026', monto: 60000, estado: 'Pagado' },
]
const CHIPS = ['Todos', 'Pagados', 'Pendientes']

export default function Pagos() {
  const [chip, setChip] = useState('Todos')
  const [open, setOpen] = useState(false)
  const [hecho, setHecho] = useState(false)
  usePageHeader('Pagos', 'Controla los pagos de tus eventos')

  const pagados = PAGOS.filter((p) => p.estado === 'Pagado')
  const pendientes = PAGOS.filter((p) => p.estado === 'Pendiente')
  const lista = PAGOS.filter((p) => chip === 'Todos' || (chip === 'Pagados' ? p.estado === 'Pagado' : p.estado === 'Pendiente'))
  const stats = [
    { label: 'Total pagado', value: FMT.format(pagados.reduce((a, b) => a + b.monto, 0)), Icon: Wallet },
    { label: 'Pendiente', value: FMT.format(pendientes.reduce((a, b) => a + b.monto, 0)), Icon: Clock },
    { label: 'Próximo pago', value: '15 jul', sub: FMT.format(45000), Icon: CalendarClock },
  ]
  const cerrar = () => { setOpen(false); setTimeout(() => setHecho(false), 200) }

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="t-stagger-grid mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Card key={s.label} className="t-lift p-5">
            <div className="mb-2 flex items-center justify-between"><p className="text-[12px] text-ink-muted">{s.label}</p><s.Icon size={16} className="text-ink-subtle" /></div>
            <p className="text-[24px] font-bold leading-none text-ink-strong">{s.value}</p>
            {s.sub && <p className="mt-1.5 text-[11.5px] text-ink-subtle">{s.sub}</p>}
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
          <BtnPrimary onClick={() => setOpen(true)}><Plus size={15} /> Registrar pago</BtnPrimary>
        </div>
        <div className="hidden grid-cols-[1.4fr_1fr_120px_120px_110px_90px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Concepto</span><span>Evento</span><span>Método</span><span>Fecha</span><span>Estado</span><span className="text-right">Monto</span>
        </div>
        <div className="divide-y divide-gray-100">
          {lista.map((p) => (
            <div key={p.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3.5 transition-colors hover:bg-gray-50 md:grid-cols-[1.4fr_1fr_120px_120px_110px_90px] md:gap-3">
              <span className="text-[13px] font-semibold text-ink-strong">{p.concepto}</span>
              <span className="text-[12px] text-ink-muted">{p.evento}</span>
              <span className="text-[12px] text-ink-muted">{p.estado === 'Pagado' ? p.metodo : '—'}</span>
              <span className="text-[12px] text-ink-muted">{p.fecha}</span>
              <span><Badge tone={p.estado === 'Pagado' ? 'green' : 'amber'}>{p.estado}</Badge></span>
              <span className="text-[13.5px] font-bold text-ink-strong md:text-right">{FMT.format(p.monto)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Modal open={open} onClose={cerrar} title="Registrar pago"
        footer={hecho ? null : <div className="flex justify-end gap-2"><BtnOutline onClick={cerrar}>Cancelar</BtnOutline><BtnPrimary onClick={() => setHecho(true)}><Check size={15} /> Registrar</BtnPrimary></div>}>
        {hecho ? (
          <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
            <span className="t-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-navy"><Check size={32} strokeWidth={2.4} /></span>
            <h3 className="text-[17px] font-bold text-ink-strong">¡Pago registrado!</h3>
            <p className="max-w-sm text-[13px] text-ink-muted">El pago quedó guardado en el historial y se descontó del presupuesto del evento.</p>
            <BtnPrimary onClick={cerrar} className="mt-1">Listo</BtnPrimary>
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-5">
            <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Evento</span><select className={inputCls}>{EVENTOS.map((e) => <option key={e.id}>{e.nombre}</option>)}</select></label>
            <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Concepto</span><input className={inputCls} placeholder="Ej. Anticipo fotografía" /></label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Monto (€)</span><input type="number" className={inputCls} placeholder="0" /></label>
              <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Método</span><select className={inputCls}><option>Transferencia</option><option>Tarjeta</option><option>Efectivo</option></select></label>
            </div>
            <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Fecha</span><input type="date" className={inputCls} /></label>
          </div>
        )}
      </Modal>
    </div>
  )
}
