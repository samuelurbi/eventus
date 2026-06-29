import { useState } from 'react'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft, Share2, ClipboardList, Users, CalendarClock, UserCheck,
  CheckCircle2, Clock, Plus, Search, Download, MoreVertical, Send, Paperclip,
  FileText, Image, Sheet, FileType2, MapPin, Wallet, BadgeCheck, PiggyBank, Phone,
  Calendar, Mail, Eye, Check, ArrowRight, MailCheck, Heart, PartyPopper, Sparkles,
} from 'lucide-react'
import {
  EVENTOS, EV_PROV_CATEGORIAS, EV_PARTIDAS, EV_PAGOS, EV_INVITADOS, DOCUMENTOS, CONVERSACIONES, TAREAS, ACTIVIDAD, PROVEEDORES, ESTADO_MSG,
} from '../../data/mock'
import { FMT, UNSPLASH, diasRestantes } from '../../data/theme'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, Modal, cls } from '../../components/ui'
import { ChatBubble } from '../../components/ChatBubble'
import { usePageHeader } from '../../layouts/pageHeader'

const PROV_ID = Object.fromEntries(PROVEEDORES.map((p) => [p.nombre, p.id]))

const TABS = [
  { id: 'resumen', label: 'Resumen' },
  { id: 'proveedores', label: 'Proveedores' },
  { id: 'presupuesto', label: 'Presupuesto' },
  { id: 'invitados', label: 'Invitados' },
  { id: 'documentos', label: 'Documentos' },
  { id: 'mensajes', label: 'Mensajes' },
]

const TONE = {
  Contratado: 'green', Confirmado: 'green', Completado: 'green',
  'En negociación': 'amber', Contactado: 'amber',
  Pendiente: 'gray', Declinado: 'red',
}

// ── KPI compacto ──────────────────────────────────────────────────────────────
function Kpi({ icon, label, value, sub, pct }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-offwhite text-navy">{icon}</span>
        <span className="text-[26px] font-bold leading-none tracking-tight text-ink-strong">{value}</span>
      </div>
      <p className="mt-3 text-[12px] font-semibold text-ink-strong">{label}</p>
      {sub && <p className="mt-0.5 text-[11px] text-ink-muted">{sub}</p>}
      {pct != null && (
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} /></div>
      )}
    </Card>
  )
}

// ── TAB: Resumen ────────────────────────────────────────────────────────────
function TabResumen({ evento, onGoTab }) {
  const [act, setAct] = useState(null)
  const pct = Math.round((evento.gastado / evento.presupuesto) * 100)
  const contratados = EV_PROV_CATEGORIAS.filter((c) => c.estado === 'Contratado').length
  const conf = EV_INVITADOS.confirmados
  const pendientes = TAREAS.filter((t) => !t.hecho)
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <Kpi icon={<ClipboardList size={17} strokeWidth={1.9} />} value="67%" label="Progreso general" sub="8 de 12 categorías" pct={67} />
        <Kpi icon={<Users size={17} strokeWidth={1.9} />} value={EV_PROV_CATEGORIAS.length} label="Proveedores" sub={`${contratados} contratados`} />
        <Kpi icon={<CalendarClock size={17} strokeWidth={1.9} />} value={`${diasRestantes(evento.fecha)}d`} label="Días restantes" sub={evento.fecha} />
        <Kpi icon={<UserCheck size={17} strokeWidth={1.9} />} value={conf} label="Confirmaciones" sub={`de ${EV_INVITADOS.total} invitados`} pct={Math.round((conf / EV_INVITADOS.total) * 100)} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr] xl:items-start">
        {/* Estado del evento */}
        <Card>
          <CardHeader title="Estado del evento" action={<button onClick={() => onGoTab('proveedores')} className="text-[12px] font-semibold text-navy hover:underline">Ver categorías</button>} />
          <div className="divide-y divide-gray-100">
            {EV_PROV_CATEGORIAS.slice(0, 5).map((c) => {
              const hecho = c.estado === 'Contratado'
              return (
                <button key={c.cat} onClick={() => onGoTab('proveedores')} className="flex w-full items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50">
                  <span className={cls('flex h-7 w-7 shrink-0 items-center justify-center rounded-full', hecho ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-ink-subtle')}>
                    {hecho ? <CheckCircle2 size={15} /> : <Clock size={15} />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold text-ink-strong">{c.cat}</p>
                    <p className="truncate text-[11.5px] text-ink-muted">{c.proveedor || 'Buscar proveedores'}{c.monto ? ` · ${FMT.format(c.monto)}` : ''}</p>
                  </div>
                  <Badge tone={TONE[c.estado]}>{c.estado}</Badge>
                </button>
              )
            })}
          </div>
        </Card>

        {/* Resumen financiero */}
        <Card className="p-5">
          <p className="text-[13px] font-bold text-ink-strong">Resumen financiero</p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-[12px] text-ink-muted">Gastado</span>
            <span className="text-[22px] font-bold tracking-tight text-ink-strong">{FMT.format(evento.gastado)}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} /></div>
          <p className="mt-1.5 text-[11px] text-ink-subtle">{pct}% de {FMT.format(evento.presupuesto)} · {FMT.format(evento.presupuesto - evento.gastado)} restante</p>
          <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
            {EV_PARTIDAS.filter((p) => p.confirmado > 0).slice(0, 4).map((p) => (
              <div key={p.cat} className="flex items-center justify-between text-[12.5px]"><span className="text-ink-body">{p.cat}</span><span className="font-semibold text-ink-strong">{FMT.format(p.confirmado)}</span></div>
            ))}
          </div>
          <BtnPrimary onClick={() => onGoTab('presupuesto')} className="mt-4 w-full">Ver presupuesto detallado</BtnPrimary>
        </Card>
      </div>

      {/* Próximas tareas + actividad */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2 xl:items-start">
        <Card>
          <CardHeader title="Próximas tareas" action={<Badge tone="mint">{pendientes.length}</Badge>} />
          <div className="divide-y divide-gray-100 px-5">
            {pendientes.map((t) => (
              <div key={t.id} className="flex items-center gap-3 py-3">
                <span className="h-4 w-4 shrink-0 rounded border-[1.5px] border-gray-300" />
                <div className="min-w-0 flex-1"><p className="text-[12.5px] font-medium text-ink-body">{t.texto}</p><p className="text-[11px] text-ink-subtle">Vence {t.fecha}</p></div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardHeader title="Actividad reciente" />
          <div className="divide-y divide-gray-100">
            {ACTIVIDAD.slice(0, 4).map((a) => (
              <button key={a.id} onClick={() => setAct(a)} className="flex w-full items-start gap-3 px-5 py-3 text-left transition-colors hover:bg-gray-50">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                <div className="flex-1"><p className="text-[12.5px] text-ink-body">{a.texto}</p><p className="text-[11px] text-ink-subtle">{a.tiempo}</p></div>
                <ArrowRight size={14} className="mt-0.5 shrink-0 text-gray-300" />
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* Modal detalle de actividad */}
      <Modal open={!!act} onClose={() => setAct(null)} title="Detalle de actividad"
        footer={<div className="flex justify-end"><BtnPrimary onClick={() => setAct(null)}>Entendido</BtnPrimary></div>}>
        {act && (
          <div className="p-5">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/25 text-navy"><CheckCircle2 size={18} /></span>
              <div><p className="text-[14px] font-semibold text-ink-strong">{act.texto}</p><p className="mt-0.5 text-[12px] text-ink-muted">{act.tiempo}</p></div>
            </div>
            <p className="mt-4 text-[12.5px] leading-relaxed text-ink-body">Esta actividad forma parte del historial del evento. Puedes revisar el detalle completo en la sección correspondiente.</p>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ── TAB: Proveedores ──────────────────────────────────────────────────────────
function TabProveedores() {
  const contratados = EV_PROV_CATEGORIAS.filter((c) => c.estado === 'Contratado')
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={<ClipboardList size={17} strokeWidth={1.9} />} value={EV_PROV_CATEGORIAS.length} label="Categorías" />
        <Kpi icon={<Users size={17} strokeWidth={1.9} />} value="18" label="Contactados" />
        <Kpi icon={<BadgeCheck size={17} strokeWidth={1.9} />} value={contratados.length} label="Contratados" />
        <Kpi icon={<Clock size={17} strokeWidth={1.9} />} value={EV_PROV_CATEGORIAS.filter((c) => c.estado === 'Pendiente').length} label="Pendientes" />
      </div>

      <Card>
        <CardHeader title="Categorías de proveedores" action={<BtnPrimary to="/organizador/proveedores" className="!py-1.5"><Plus size={14} strokeWidth={2.5} /> Buscar</BtnPrimary>} />
        <div className="grid grid-cols-1 gap-px bg-gray-100 sm:grid-cols-2 xl:grid-cols-3">
          {EV_PROV_CATEGORIAS.map((c) => {
            const hecho = c.estado === 'Contratado'
            const destino = hecho && PROV_ID[c.proveedor] ? `/organizador/proveedores/${PROV_ID[c.proveedor]}` : '/organizador/proveedores'
            return (
              <Link key={c.cat} to={destino} className="group block bg-white p-4 transition-colors hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <p className="text-[13px] font-bold text-ink-strong">{c.cat}</p>
                  {hecho ? <CheckCircle2 size={16} className="text-green-600" /> : <Clock size={16} className="text-ink-subtle" />}
                </div>
                <div className="mt-1"><Badge tone={TONE[c.estado]}>{c.estado}</Badge></div>
                {c.proveedor ? (
                  <p className="mt-2 flex items-center gap-1 text-[12px] text-ink-muted">{c.proveedor}{c.monto ? ` · ${FMT.format(c.monto)}` : ''}<ArrowRight size={12} className="text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-navy" /></p>
                ) : (
                  <span className="mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-1.5 text-[12px] font-semibold text-ink-muted transition-colors group-hover:border-navy/40 group-hover:text-navy"><Search size={12} /> Buscar proveedores</span>
                )}
              </Link>
            )
          })}
        </div>
      </Card>
    </div>
  )
}

// ── TAB: Presupuesto ──────────────────────────────────────────────────────────
const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

function TabPresupuesto({ evento }) {
  const [partida, setPartida] = useState(null)
  const [add, setAdd] = useState(false)
  const confirmado = EV_PARTIDAS.reduce((s, p) => s + p.confirmado, 0)
  const pagado = EV_PARTIDAS.reduce((s, p) => s + p.pagado, 0)
  const estimado = EV_PARTIDAS.reduce((s, p) => s + p.estimado, 0)
  const pct = Math.round((confirmado / evento.presupuesto) * 100)
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi icon={<Wallet size={17} strokeWidth={1.9} />} value={FMT.format(evento.presupuesto)} label="Presupuesto inicial" />
        <Kpi icon={<BadgeCheck size={17} strokeWidth={1.9} />} value={FMT.format(confirmado)} label="Total confirmado" sub={`${pct}% del presupuesto`} pct={pct} />
        <Kpi icon={<PiggyBank size={17} strokeWidth={1.9} />} value={FMT.format(evento.presupuesto - confirmado)} label="Disponible" />
      </div>

      <Card>
        <CardHeader title="Desglose de presupuesto" action={<div className="flex gap-2"><BtnOutline className="!py-1.5"><Download size={14} /> Exportar</BtnOutline><BtnPrimary onClick={() => setAdd(true)} className="!py-1.5"><Plus size={14} strokeWidth={2.5} /> Añadir</BtnPrimary></div>} />
        <div className="overflow-x-auto">
          <table className="w-full text-[12.5px]">
            <thead>
              <tr className="border-b border-gray-100 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                <th className="px-5 py-2.5 text-left">Categoría</th><th className="px-3 py-2.5 text-left">Proveedor</th><th className="px-3 py-2.5 text-center">Estado</th>
                <th className="px-3 py-2.5 text-right">Estimado</th><th className="px-3 py-2.5 text-right">Confirmado</th><th className="px-5 py-2.5 text-right">Pagado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {EV_PARTIDAS.map((p) => (
                <tr key={p.cat} onClick={() => setPartida(p)} className="cursor-pointer hover:bg-gray-50">
                  <td className="px-5 py-3 font-semibold text-ink-strong">{p.cat}</td>
                  <td className="px-3 py-3 text-ink-muted">{p.proveedor}</td>
                  <td className="px-3 py-3 text-center"><Badge tone={TONE[p.estado]}>{p.estado}</Badge></td>
                  <td className="px-3 py-3 text-right text-ink-body">{FMT.format(p.estimado)}</td>
                  <td className="px-3 py-3 text-right font-medium text-ink-strong">{p.confirmado ? FMT.format(p.confirmado) : '—'}</td>
                  <td className="px-5 py-3 text-right text-ink-body">{p.pagado ? FMT.format(p.pagado) : '—'}</td>
                </tr>
              ))}
              <tr className="bg-offwhite font-bold text-ink-strong">
                <td className="px-5 py-3" colSpan={3}>Total</td>
                <td className="px-3 py-3 text-right">{FMT.format(estimado)}</td>
                <td className="px-3 py-3 text-right">{FMT.format(confirmado)}</td>
                <td className="px-5 py-3 text-right">{FMT.format(pagado)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <CardHeader title="Calendario de pagos" action={<span className="text-[12px] text-ink-subtle">Próximos pagos programados</span>} />
        <div className="divide-y divide-gray-100">
          {EV_PAGOS.map((p, i) => (
            <div key={i} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-offwhite text-navy"><CalendarClock size={16} /></span>
              <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold text-ink-strong">{p.titulo}</p><p className="text-[11.5px] text-ink-muted">{p.cat} · vence {p.vence}</p></div>
              <Badge tone="amber">Pendiente</Badge>
              <span className="w-24 text-right text-[13px] font-bold text-ink-strong">{FMT.format(p.monto)}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal: detalle de partida */}
      <Modal open={!!partida} onClose={() => setPartida(null)} title="Detalle de partida"
        footer={<div className="flex justify-end gap-2"><BtnOutline onClick={() => setPartida(null)}>Cerrar</BtnOutline><BtnPrimary>Editar partida</BtnPrimary></div>}>
        {partida && (
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-[16px] font-bold text-ink-strong">{partida.cat}</p><p className="text-[12px] text-ink-muted">{partida.proveedor}</p></div>
              <Badge tone={TONE[partida.estado]}>{partida.estado}</Badge>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3 text-center">
              {[['Estimado', partida.estimado], ['Confirmado', partida.confirmado], ['Pagado', partida.pagado]].map(([l, v]) => (
                <div key={l} className="rounded-lg border border-gray-200 p-3"><p className="text-[11px] text-ink-muted">{l}</p><p className="mt-1 text-[15px] font-bold text-ink-strong">{v ? FMT.format(v) : '—'}</p></div>
              ))}
            </div>
            <p className="mb-2 mt-5 text-[12px] font-semibold text-ink-strong">Pagos relacionados</p>
            <div className="flex flex-col gap-2">
              {EV_PAGOS.filter((p) => p.cat === partida.cat).map((p, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2 text-[12.5px]"><span className="text-ink-body">{p.titulo}<span className="text-ink-subtle"> · {p.vence}</span></span><span className="font-semibold text-ink-strong">{FMT.format(p.monto)}</span></div>
              ))}
              {EV_PAGOS.filter((p) => p.cat === partida.cat).length === 0 && <p className="text-[12px] text-ink-subtle">Sin pagos programados.</p>}
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: añadir partida */}
      <Modal open={add} onClose={() => setAdd(false)} title="Añadir partida"
        footer={<div className="flex justify-end gap-2"><BtnOutline onClick={() => setAdd(false)}>Cancelar</BtnOutline><BtnPrimary onClick={() => setAdd(false)}>Añadir partida</BtnPrimary></div>}>
        <div className="flex flex-col gap-4 p-5">
          <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Categoría</span><input className={inputCls} placeholder="Ej. Iluminación" /></label>
          <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Proveedor (opcional)</span><input className={inputCls} placeholder="Nombre del proveedor" /></label>
          <label className="block"><span className="mb-1.5 block text-[12px] font-semibold text-ink-strong">Monto estimado (€)</span><input type="number" className={inputCls} placeholder="Ej. 15000" /></label>
        </div>
      </Modal>
    </div>
  )
}

// ── TAB: Invitados ──────────────────────────────────────────────────────────
const PLANTILLAS = [
  { id: 'romantica', nombre: 'Romántica', sub: 'Ideal para bodas',  grad: 'linear-gradient(135deg,#FB7BA8 0%,#E84B8A 100%)', light: false },
  { id: 'clasica',   nombre: 'Clásica',   sub: 'Elegante y formal', grad: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)', light: false },
  { id: 'moderna',   nombre: 'Moderna',   sub: 'Minimalista',       grad: 'linear-gradient(135deg,#BCEE95 0%,#86D05F 100%)', light: true },
  { id: 'festiva',   nombre: 'Festiva',   sub: 'Para fiestas',      grad: 'linear-gradient(135deg,#A78BFA 0%,#7C3AED 100%)', light: false },
]

function parseFecha(f) {
  const [d, m, a] = (f || '14 sep 2026').split(' ')
  return { d, m: (m || '').toUpperCase(), a }
}
function monograma(titulo) {
  return titulo.split(/&| /).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join(' & ')
}
// Bloque de fecha estilo invitación: MES | día | año
function FechaInvite({ d, m, a, color = 'text-navy', rule = 'border-navy/20' }) {
  return (
    <div className={cls('flex items-center justify-center gap-3', color)}>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{m}</span>
      <span className={cls('border-x px-3 font-serif text-[26px] leading-none', rule)}>{d}</span>
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">{a}</span>
    </div>
  )
}

function InvitePreview({ evento, plantilla }) {
  const { d, m, a } = parseFecha(evento.fecha)
  const hora = '19:00 h'
  const titulo = evento.nombre.replace(/^Boda\s+/i, '')
  const [, ciudad] = (evento.lugar || '').split(',').map((s) => s.trim())
  const venue = (evento.lugar || '').split(',')[0]

  // ── Clásica: papel navy con marco dorado, serif, monograma ──
  if (plantilla === 'clasica') {
    const gold = '#C9A24B'
    return (
      <div className="mx-auto w-[300px] rounded-xl bg-[#0B334C] p-2">
        <div className="flex flex-col items-center rounded-lg border px-6 py-7 text-center" style={{ borderColor: 'rgba(201,162,75,0.45)' }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full border font-serif text-[15px] tracking-wide text-white" style={{ borderColor: gold, color: gold }}>{monograma(titulo)}</span>
          <p className="mt-4 text-[9.5px] font-semibold uppercase tracking-[0.3em]" style={{ color: gold }}>Tienen el honor de invitarle</p>
          <h3 className="mt-2 font-serif text-[23px] leading-tight text-white">{titulo}</h3>
          <span className="my-4 flex items-center gap-2"><span className="h-px w-10" style={{ background: gold }} /><span className="h-1.5 w-1.5 rotate-45" style={{ background: gold }} /><span className="h-px w-10" style={{ background: gold }} /></span>
          <FechaInvite d={d} m={m} a={a} color="text-white" rule="border-white/25" />
          <p className="mt-3 text-[12px] text-white/85">{venue}</p>
          <p className="text-[11px] text-white/55">{ciudad} · {hora}</p>
          <button className="mt-5 w-full rounded-md border py-2 text-[12px] font-semibold" style={{ borderColor: gold, color: gold }}>Confirmar asistencia</button>
          <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-white/35">Enviado con Eventus</p>
        </div>
      </div>
    )
  }

  // ── Moderna: blanco minimalista, acento mint, tipografía grande ──
  if (plantilla === 'moderna') {
    return (
      <div className="mx-auto w-[300px] overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="h-1.5 w-full bg-mint" />
        <div className="px-6 py-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-ink-subtle">Save the date</p>
          <h3 className="mt-3 text-[27px] font-extrabold leading-[1.05] tracking-tight text-navy">{evento.nombre}</h3>
          <p className="mt-4 text-[34px] font-extrabold leading-none tracking-tight text-navy">{d}<span className="text-mint">.</span>{String(['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'].indexOf(m) + 1).padStart(2, '0')}<span className="text-mint">.</span>{a?.slice(2)}</p>
          <div className="mt-5 flex flex-col gap-2 border-t border-gray-100 pt-4 text-[12.5px] text-ink-body">
            <p className="flex items-center gap-2"><MapPin size={14} className="text-mint" /> {venue}, {ciudad}</p>
            <p className="flex items-center gap-2"><Clock size={14} className="text-mint" /> {hora}</p>
          </div>
          <button className="mt-5 w-full rounded-lg bg-navy py-2.5 text-[13px] font-semibold text-white">Confirmar asistencia →</button>
          <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-ink-subtle">Enviado con Eventus</p>
        </div>
      </div>
    )
  }

  // ── Festiva: foto de fiesta + confeti + violeta ──
  if (plantilla === 'festiva') {
    const confeti = ['#BCEE95', '#FB7BA8', '#FBBF24', '#60A5FA', '#A78BFA', '#34D399']
    return (
      <div className="mx-auto w-[300px] overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="relative h-32 overflow-hidden">
          <img src={UNSPLASH('1530103862676-de8c9debad1d', 600)} alt="" className="h-full w-full object-cover" />
          <span className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(135deg,rgba(124,58,237,0.85),rgba(167,139,250,0.7))' }} />
          {confeti.map((c, i) => (
            <span key={i} className="absolute h-2 w-1.5 rounded-[1px]" style={{ background: c, left: `${8 + i * 15}%`, top: `${15 + (i % 3) * 22}%`, transform: `rotate(${i * 40}deg)` }} />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <PartyPopper size={26} strokeWidth={2} />
            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.25em]">¡Estás invitado!</p>
          </div>
        </div>
        <div className="px-6 py-5 text-center">
          <h3 className="text-[21px] font-extrabold leading-tight text-violet-600">{evento.nombre}</h3>
          <div className="mt-3 flex justify-center gap-2">
            <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-600">{d} {m}</span>
            <span className="rounded-full bg-violet-50 px-3 py-1 text-[11px] font-bold text-violet-600">{hora}</span>
          </div>
          <p className="mt-3 flex items-center justify-center gap-1.5 text-[12px] text-ink-muted"><MapPin size={13} className="text-violet-500" /> {venue}, {ciudad}</p>
          <button className="mt-4 w-full rounded-lg bg-violet-600 py-2.5 text-[13px] font-semibold text-white">¡Allí estaré!</button>
          <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-ink-subtle">Enviado con Eventus</p>
        </div>
      </div>
    )
  }

  // ── Romántica (default): foto de boda + papel crema + serif + corazón ──
  return (
    <div className="mx-auto w-[300px] overflow-hidden rounded-xl border border-rose-100 bg-[#FFF9F7]">
      <div className="relative h-32">
        <img src={UNSPLASH('1519741497674-611481863552', 600)} alt="" className="h-full w-full object-cover" />
        <span className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(180deg,rgba(255,249,247,0) 35%,#FFF9F7)' }} />
      </div>
      <div className="relative -mt-7 px-6 pb-6 text-center">
        <span className="mx-auto flex h-13 w-13 items-center justify-center rounded-full border border-rose-200 bg-white text-rose-500" style={{ height: 52, width: 52 }}><Heart size={20} fill="currentColor" /></span>
        <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose-400">Nos casamos</p>
        <h3 className="mt-1.5 font-serif text-[24px] leading-tight text-navy">{titulo}</h3>
        <span className="my-4 flex items-center justify-center gap-2 text-rose-300"><span className="h-px w-10 bg-rose-200" /><Heart size={11} fill="currentColor" /><span className="h-px w-10 bg-rose-200" /></span>
        <FechaInvite d={d} m={m} a={a} color="text-navy" rule="border-rose-200" />
        <p className="mt-3 text-[12.5px] text-ink-body">{venue}</p>
        <p className="text-[11px] text-ink-subtle">{ciudad} · {hora}</p>
        <button className="mt-5 w-full rounded-lg py-2.5 text-[13px] font-semibold text-white" style={{ backgroundImage: 'linear-gradient(135deg,#FB7BA8,#E84B8A)' }}>Confirmar asistencia</button>
        <p className="mt-3 text-[9px] uppercase tracking-[0.2em] text-ink-subtle">Enviado con Eventus</p>
      </div>
    </div>
  )
}

function TabInvitados({ evento }) {
  const I = EV_INVITADOS
  const [open, setOpen] = useState(false)
  const [plantilla, setPlantilla] = useState('romantica')
  const [enviado, setEnviado] = useState(false)
  const cerrar = () => { setOpen(false); setTimeout(() => setEnviado(false), 200) }
  const pNombre = PLANTILLAS.find((p) => p.id === plantilla)?.nombre

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Kpi icon={<Users size={17} strokeWidth={1.9} />} value={I.total} label="Total invitados" />
        <Kpi icon={<CheckCircle2 size={17} strokeWidth={1.9} />} value={I.confirmados} label="Confirmados" pct={Math.round((I.confirmados / I.total) * 100)} />
        <Kpi icon={<Clock size={17} strokeWidth={1.9} />} value={I.pendientes} label="Pendientes" />
        <Kpi icon={<UserCheck size={17} strokeWidth={1.9} />} value={I.declinados} label="Declinados" />
      </div>
      <Card>
        <CardHeader title="Grupos de invitados" action={
          <div className="flex gap-2">
            <BtnOutline className="!py-1.5"><Plus size={14} strokeWidth={2.5} /> Añadir grupo</BtnOutline>
            <BtnPrimary onClick={() => setOpen(true)} className="!py-1.5"><Mail size={14} /> Enviar invitaciones</BtnPrimary>
          </div>
        } />
        <div className="divide-y divide-gray-100">
          {I.grupos.map((g) => (
            <div key={g.nombre} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{g.personas}</span>
              <div className="min-w-0 flex-1"><p className="text-[13px] font-semibold text-ink-strong">{g.nombre}</p><p className="text-[11.5px] text-ink-muted">{g.grupo} · {g.personas} personas</p></div>
              <Badge tone={TONE[g.estado]}>{g.estado}</Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Modal: enviar invitaciones */}
      <Modal open={open} onClose={cerrar} title="Enviar invitaciones" wide
        footer={enviado ? null : (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-[12px] text-ink-muted">Se enviará a <b className="text-ink-strong">{I.total}</b> invitados por correo</p>
            <div className="flex gap-2"><BtnOutline onClick={cerrar}>Cancelar</BtnOutline><BtnPrimary onClick={() => setEnviado(true)}><Send size={14} /> Enviar invitaciones</BtnPrimary></div>
          </div>
        )}>
        {enviado ? (
          <div className="flex flex-col items-center justify-center gap-3 px-6 py-14 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-mint/25 text-navy"><MailCheck size={26} /></span>
            <p className="text-[16px] font-bold text-ink-strong">¡Invitaciones enviadas!</p>
            <p className="max-w-sm text-[13px] text-ink-muted">Se enviaron {I.total} invitaciones con la plantilla <b>{pNombre}</b>. Te avisaremos a medida que confirmen su asistencia.</p>
            <BtnPrimary onClick={cerrar} className="mt-1">Listo</BtnPrimary>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 p-5 md:grid-cols-[230px_1fr]">
            <div>
              <p className="mb-2 text-[12px] font-semibold text-ink-strong">Elige una plantilla</p>
              <div className="flex flex-col gap-2">
                {PLANTILLAS.map((t) => (
                  <button key={t.id} onClick={() => setPlantilla(t.id)} className={cls('flex items-center gap-3 rounded-lg border p-2.5 text-left transition-colors', plantilla === t.id ? 'border-navy bg-navy/5' : 'border-gray-200 hover:border-navy/40')}>
                    <span className="h-10 w-10 shrink-0 rounded-md" style={{ backgroundImage: t.grad }} />
                    <div className="min-w-0 flex-1"><p className="text-[12.5px] font-semibold text-ink-strong">{t.nombre}</p><p className="text-[11px] text-ink-muted">{t.sub}</p></div>
                    {plantilla === t.id && <Check size={15} className="shrink-0 text-navy" />}
                  </button>
                ))}
              </div>
              <p className="mb-1.5 mt-4 text-[12px] font-semibold text-ink-strong">Destinatarios</p>
              <select className={inputCls}><option>Todos los invitados ({I.total})</option><option>Solo pendientes ({I.pendientes})</option></select>
            </div>
            <div className="rounded-lg bg-offwhite p-5">
              <p className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink-subtle"><Eye size={12} /> Vista previa del correo</p>
              <InvitePreview evento={evento} plantilla={plantilla} />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

// ── TAB: Documentos ──────────────────────────────────────────────────────────
const DOC_TIPO = {
  pdf: { Icon: FileText, wrap: 'bg-red-50 text-red-500' }, img: { Icon: Image, wrap: 'bg-green-50 text-green-600' },
  xls: { Icon: Sheet, wrap: 'bg-emerald-50 text-emerald-600' }, doc: { Icon: FileType2, wrap: 'bg-blue-50 text-blue-600' },
}
function TabDocumentos({ evento }) {
  const docs = DOCUMENTOS.filter((d) => d.evento === evento.nombre)
  return (
    <Card>
      <CardHeader title="Documentos del evento" action={<BtnPrimary className="!py-1.5">Subir documento</BtnPrimary>} />
      <div className="divide-y divide-gray-100">
        {docs.map((d) => {
          const t = DOC_TIPO[d.tipo] ?? DOC_TIPO.doc
          return (
            <div key={d.id} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50">
              <span className={cls('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', t.wrap)}><t.Icon size={16} strokeWidth={1.9} /></span>
              <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-ink-strong">{d.nombre}</p><p className="text-[11.5px] text-ink-subtle">{d.tam} · {d.fecha}</p></div>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"><Download size={15} /></button>
              <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"><MoreVertical size={15} /></button>
            </div>
          )
        })}
        {docs.length === 0 && <p className="px-5 py-8 text-center text-[13px] text-ink-muted">Aún no hay documentos para este evento.</p>}
      </div>
    </Card>
  )
}

// ── TAB: Mensajes ──────────────────────────────────────────────────────────
const MSG_FILTROS = ['Todos', 'En negociación', 'Aceptado', 'Rechazado']
function TabMensajes() {
  const [activa, setActiva] = useState(CONVERSACIONES[0].id)
  const [filtro, setFiltro] = useState('Todos')
  const [vista, setVista] = useState('lista') // móvil: 'lista' | 'hilo'
  const conv = CONVERSACIONES.find((c) => c.id === activa)
  const lista = CONVERSACIONES.filter((c) => filtro === 'Todos' || c.estado === filtro)
  return (
    <Card className="flex h-[620px] overflow-hidden p-0">
      <aside className={cls('w-full shrink-0 flex-col border-r border-gray-200 lg:flex lg:w-80', vista === 'hilo' ? 'hidden lg:flex' : 'flex')}>
        <div className="flex flex-wrap gap-1.5 border-b border-gray-200 p-3">
          {MSG_FILTROS.map((f) => (
            <button key={f} onClick={() => setFiltro(f)} className={cls('rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors', filtro === f ? 'bg-navy text-white' : 'border border-gray-200 bg-white text-ink-muted hover:border-navy/40')}>{f}</button>
          ))}
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          {lista.map((c) => (
            <button key={c.id} onClick={() => { setActiva(c.id); setVista('hilo') }} className={cls('flex w-full items-start gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors', c.id === activa ? 'bg-mint/10' : 'hover:bg-gray-50')}>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{c.avatar}</span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2"><p className="truncate text-[13px] font-semibold text-ink-strong">{c.de}</p><span className="shrink-0 text-[10px] text-ink-subtle">{c.hora}</span></div>
                <div className="mt-1 flex items-center gap-1.5"><span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-semibold text-ink-muted">{c.categoria}</span><Badge tone={ESTADO_MSG[c.estado]}>{c.estado}</Badge></div>
                <p className="mt-1 truncate text-[11.5px] text-ink-muted">{c.ultimo}</p>
              </div>
            </button>
          ))}
          {lista.length === 0 && <p className="px-4 py-8 text-center text-[12px] text-ink-muted">Sin conversaciones en este filtro.</p>}
        </div>
      </aside>
      <section className={cls('min-w-0 flex-1 flex-col bg-offwhite lg:flex', vista === 'lista' ? 'hidden lg:flex' : 'flex')}>
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 sm:px-5">
          <div className="flex items-center gap-3"><button onClick={() => setVista('lista')} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden" aria-label="Volver"><ArrowLeft size={18} /></button><span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{conv.avatar}</span><div><div className="flex items-center gap-2"><p className="text-[13px] font-bold text-ink-strong">{conv.de}</p><Badge tone={ESTADO_MSG[conv.estado]}>{conv.estado}</Badge></div><p className="text-[11px] text-ink-subtle">{conv.categoria} · En línea</p></div></div>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"><Phone size={16} /></button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-5">
          {conv.mensajes.map((m, i) => <ChatBubble key={i} m={m} />)}
        </div>
        <div className="flex items-center gap-2 border-t border-gray-200 bg-white px-4 py-3">
          <button className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100"><Paperclip size={17} /></button>
          <input placeholder="Escribe un mensaje…" className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3.5 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
          <button className="flex h-10 shrink-0 items-center gap-1.5 rounded-lg bg-mint px-4 text-[13px] font-semibold text-navy hover:bg-[#aee584]"><Send size={15} strokeWidth={2.2} /> Enviar</button>
        </div>
      </section>
    </Card>
  )
}

// ── Main ────────────────────────────────────────────────────────────────────
export default function EventoDetalle() {
  const { id } = useParams()
  const evento = EVENTOS.find((e) => String(e.id) === id) ?? EVENTOS[0]
  const [sp] = useSearchParams()
  const [tab, setTab] = useState(sp.get('tab') || 'resumen')
  const estadoTone = { 'En curso': 'mint', 'Planificación': 'navy', 'Completado': 'gray' }[evento.estado] ?? 'gray'
  usePageHeader(evento.nombre, `${evento.fecha} · ${evento.lugar} · ${evento.proveedores} proveedores`)

  return (
    <div className="px-7 py-5">
      {/* Volver + acciones */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <Link to="/organizador/eventos" className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
          <ArrowLeft size={15} /> Mis eventos
        </Link>
        <div className="flex items-center gap-2">
          <Badge tone={estadoTone}>{evento.estado}</Badge>
          <BtnOutline className="!py-1.5"><Share2 size={14} /> Compartir</BtnOutline>
        </div>
      </div>

      {/* Tab nav */}
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-gray-200">
        {TABS.map((tb) => (
          <button
            key={tb.id}
            onClick={() => setTab(tb.id)}
            className={cls(
              'relative shrink-0 px-3.5 py-2.5 text-[13px] font-semibold transition-colors',
              tab === tb.id ? 'text-navy' : 'text-ink-muted hover:text-ink-strong',
            )}
          >
            {tb.label}
            {tab === tb.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-navy" />}
          </button>
        ))}
      </div>

      {/* Contenido */}
      {tab === 'resumen' && <TabResumen evento={evento} onGoTab={setTab} />}
      {tab === 'proveedores' && <TabProveedores />}
      {tab === 'presupuesto' && <TabPresupuesto evento={evento} />}
      {tab === 'invitados' && <TabInvitados evento={evento} />}
      {tab === 'documentos' && <TabDocumentos evento={evento} />}
      {tab === 'mensajes' && <TabMensajes />}
    </div>
  )
}
