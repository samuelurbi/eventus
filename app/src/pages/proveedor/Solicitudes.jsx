import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, ArrowUpDown, MapPin, Users, CalendarDays, Plus, X, Check } from 'lucide-react'
import { Card, Badge, BtnPrimary, BtnOutline, Modal, cls } from '../../components/ui'
import { SkeletonRow, useFakeLoad } from '../../components/Skeleton'
import { usePageHeader } from '../../layouts/pageHeader'
import { SOLICITUDES, SOLICITUD_TONE, EUR } from '../../data/proveedorMock'

const CHIPS = ['Todas', 'Nuevas', 'Respondidas', 'En negociación']
const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'
const mapChip = { Nuevas: 'Nueva', Respondidas: 'Respondida', 'En negociación': 'En negociación' }

export default function Solicitudes() {
  const [sp, setSp] = useSearchParams()
  const [q, setQ] = useState('')
  const [chip, setChip] = useState('Todas')
  const loading = useFakeLoad()
  const abierta = sp.get('id') ? SOLICITUDES.find((s) => String(s.id) === sp.get('id')) : null
  usePageHeader('Gestiona tus Oportunidades', 'Revisa y responde solicitudes de organizadores')

  const lista = SOLICITUDES.filter(
    (s) => (chip === 'Todas' || s.estado === mapChip[chip]) &&
      (s.evento + s.organizador + s.ubicacion).toLowerCase().includes(q.toLowerCase()),
  )
  const count = (c) => (c === 'Todas' ? SOLICITUDES.length : SOLICITUDES.filter((s) => s.estado === mapChip[c]).length)

  return (
    <div className="px-4 py-5 sm:px-7">
      {/* Barra de búsqueda + filtros */}
      <Card className="mb-5 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por evento, organizador o ubicación…" className={cls(inputCls, 'pl-9')} />
          </div>
          <div className="flex gap-2">
            <BtnOutline><SlidersHorizontal size={14} /> Filtros</BtnOutline>
            <BtnOutline><ArrowUpDown size={14} /> Ordenar</BtnOutline>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button key={c} onClick={() => setChip(c)} className={cls('rounded-full px-3 py-1.5 text-[12px] font-semibold transition-colors', chip === c ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>
              {c} ({count(c)})
            </button>
          ))}
        </div>
      </Card>

      {/* Lista de solicitudes */}
      <Card>
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5">
          <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Solicitudes</h2>
          <span className="text-[12px] text-ink-muted">{lista.length} de {SOLICITUDES.length}</span>
        </div>
        <div className="divide-y divide-gray-100">
          {loading && [0, 1, 2, 3].map((i) => <SkeletonRow key={`sk${i}`} />)}
          {!loading && lista.map((s) => (
            <div key={s.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-[12px] font-bold text-mint">{s.avatar}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-bold text-ink-strong">{s.evento}</p>
                  <Badge tone={SOLICITUD_TONE[s.estado]}>{s.estado}</Badge>
                </div>
                <p className="text-[12px] text-ink-muted">{s.organizador} · {s.hace}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11.5px] text-ink-subtle">
                  <span className="flex items-center gap-1"><CalendarDays size={12} /> {s.fecha}</span>
                  <span className="flex items-center gap-1"><Users size={12} /> {s.personas} personas</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {s.ubicacion}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {s.estado === 'Respondida' ? (
                  <BtnOutline to="/proveedor/mensajes">Ver chat</BtnOutline>
                ) : (
                  <BtnPrimary onClick={() => setSp({ id: String(s.id) })}>Responder</BtnPrimary>
                )}
              </div>
            </div>
          ))}
          {lista.length === 0 && <p className="px-5 py-12 text-center text-[13px] text-ink-muted">No hay solicitudes en este filtro.</p>}
        </div>
      </Card>

      <ResponderModal solicitud={abierta} onClose={() => setSp({})} />
    </div>
  )
}

function ResponderModal({ solicitud, onClose }) {
  const [enviado, setEnviado] = useState(false)
  const [items, setItems] = useState([{ label: 'Menú principal', monto: 3200 }, { label: 'Servicio de personal', monto: 600 }])
  const total = items.reduce((a, b) => a + (Number(b.monto) || 0), 0)
  const setItem = (i, k, v) => setItems((p) => p.map((it, j) => (j === i ? { ...it, [k]: v } : it)))
  const addItem = () => setItems((p) => [...p, { label: '', monto: 0 }])
  const close = () => { setEnviado(false); onClose() }

  return (
    <Modal open={!!solicitud} onClose={close} title={solicitud ? `Responder · ${solicitud.evento}` : ''}
      footer={!enviado && solicitud && (
        <div className="flex items-center justify-between gap-3">
          <span className="text-[13px] text-ink-muted">Total: <strong className="text-ink-strong">{EUR.format(total)}</strong></span>
          <div className="flex gap-2"><BtnOutline onClick={close}>Cancelar</BtnOutline><BtnPrimary onClick={() => setEnviado(true)}><Check size={15} /> Enviar presupuesto</BtnPrimary></div>
        </div>
      )}>
      {solicitud && !enviado && (
        <div className="flex flex-col gap-4 p-5">
          <div className="rounded-lg border border-gray-200 bg-offwhite p-3 text-[12.5px] text-ink-muted">
            <strong className="text-ink-strong">{solicitud.organizador}</strong> · {solicitud.personas} personas · {solicitud.ubicacion} · {solicitud.fecha}
          </div>
          <div>
            <p className="mb-1.5 text-[12px] font-semibold text-ink-strong">Conceptos del presupuesto</p>
            <div className="flex flex-col gap-2">
              {items.map((it, i) => (
                <div key={i} className="flex gap-2">
                  <input value={it.label} onChange={(e) => setItem(i, 'label', e.target.value)} placeholder="Concepto" className={cls(inputCls, 'h-9 flex-1')} />
                  <div className="relative w-32">
                    <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[12px] text-ink-subtle">€</span>
                    <input type="number" value={it.monto} onChange={(e) => setItem(i, 'monto', e.target.value)} className={cls(inputCls, 'h-9 pl-6 text-right')} />
                  </div>
                </div>
              ))}
            </div>
            <BtnOutline onClick={addItem} className="mt-2"><Plus size={14} /> Añadir concepto</BtnOutline>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Mensaje (opcional)</span>
            <textarea rows={2} className={cls(inputCls, 'h-auto resize-none py-2.5')} placeholder="Añade una nota para el organizador…" />
          </label>
        </div>
      )}
      {solicitud && enviado && (
        <div className="flex flex-col items-center gap-3 px-6 py-10 text-center">
          <span className="t-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-navy"><Check size={32} strokeWidth={2.4} /></span>
          <h3 className="text-[18px] font-bold text-ink-strong">¡Presupuesto enviado!</h3>
          <p className="max-w-sm text-[13px] leading-relaxed text-ink-muted">Tu propuesta de <strong className="text-ink-strong">{EUR.format(total)}</strong> para <strong className="text-ink-strong">{solicitud.evento}</strong> ya está en la bandeja de {solicitud.organizador}.</p>
          <div className="mt-2 flex gap-2"><BtnPrimary to="/proveedor/mensajes">Ir a mensajes</BtnPrimary><BtnOutline onClick={close}>Cerrar</BtnOutline></div>
        </div>
      )}
    </Modal>
  )
}
