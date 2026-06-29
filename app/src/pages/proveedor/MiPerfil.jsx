import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  Star, MapPin, Mail, Phone, ShieldCheck, Pencil, Copy, Trash2, Eye, Download, Upload, Plus, Search,
  FileText, CheckCircle2, Clock, Info,
} from 'lucide-react'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { PROVEEDOR, PROV_SERVICIOS, PROV_SERVICIOS_STATS, PROV_DOCUMENTOS, EUR } from '../../data/proveedorMock'

const TABS = [
  { id: 'perfil', label: 'Perfil público' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'documentos', label: 'Documentos' },
]

export default function MiPerfil() {
  const [sp, setSp] = useSearchParams()
  const tab = sp.get('tab') || 'perfil'
  usePageHeader('Mi Perfil', 'Gestiona tu perfil, servicios y documentación')

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="mb-5 flex gap-1 overflow-x-auto border-b border-gray-200">
        {TABS.map((t) => (
          <button key={t.id} onClick={() => setSp({ tab: t.id })} className={cls('relative shrink-0 px-3.5 py-2.5 text-[13px] font-semibold transition-colors', tab === t.id ? 'text-navy' : 'text-ink-muted hover:text-ink-strong')}>
            {t.label}
            {tab === t.id && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-navy" />}
          </button>
        ))}
      </div>

      {tab === 'perfil' && <TabPerfil />}
      {tab === 'servicios' && <TabServicios />}
      {tab === 'documentos' && <TabDocumentos />}
    </div>
  )
}

/* ── Perfil público ──────────────────────────────────────────────────────── */
function TabPerfil() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px] xl:items-start">
      <div className="flex flex-col gap-5">
        {/* Cabecera del perfil */}
        <Card>
          <div className="h-24 w-full rounded-t-lg" style={{ backgroundImage: 'linear-gradient(135deg,#1A4A63 0%,#0B334C 100%)' }} />
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-end">
            <div className="-mt-14 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-mint text-[24px] font-bold text-navy">{PROVEEDOR.iniciales}</div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-[18px] font-bold text-ink-strong">{PROVEEDOR.nombre}</h2>
                {PROVEEDOR.verificado && <Badge tone="mint"><ShieldCheck size={12} className="mr-1" /> Verificado</Badge>}
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-muted">
                <span>{PROVEEDOR.categoria}</span>
                <span className="flex items-center gap-1 text-ink-body"><Star size={13} className="text-amber-400" fill="currentColor" /> {PROVEEDOR.rating} ({PROVEEDOR.reviews} reseñas)</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {PROVEEDOR.ubicacion}</span>
              </div>
            </div>
            <BtnPrimary className="shrink-0"><Pencil size={14} /> Editar perfil</BtnPrimary>
          </div>
        </Card>

        {/* Sobre nosotros */}
        <Card>
          <CardHeader title="Sobre nosotros" />
          <p className="p-5 text-[13px] leading-relaxed text-ink-muted">
            En {PROVEEDOR.nombre} llevamos más de 10 años creando experiencias gastronómicas memorables para bodas, eventos corporativos y celebraciones. Nuestro equipo combina cocina mediterránea de autor con un servicio impecable, adaptándonos a cada presupuesto y número de invitados.
          </p>
        </Card>

        {/* Galería */}
        <Card>
          <CardHeader title="Galería" action={<span className="text-[12px] text-ink-muted">5 / 20 imágenes</span>} />
          <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="aspect-[4/3] rounded-lg" style={{ backgroundImage: 'linear-gradient(135deg,#E8ECF0,#cfd8e0)' }} />
            ))}
            <button className="flex aspect-[4/3] flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed border-gray-200 text-ink-subtle transition-colors hover:border-navy/40 hover:text-navy">
              <Plus size={20} /><span className="text-[12px] font-semibold">Añadir</span>
            </button>
          </div>
        </Card>
      </div>

      {/* Info de contacto */}
      <Card className="xl:sticky xl:top-5">
        <CardHeader title="Información de contacto" />
        <div className="flex flex-col gap-3 p-5">
          {[
            { Icon: Mail, label: 'Correo', value: PROVEEDOR.email },
            { Icon: Phone, label: 'Teléfono', value: PROVEEDOR.telefono },
            { Icon: MapPin, label: 'Ubicación', value: PROVEEDOR.ubicacion },
          ].map((c) => (
            <div key={c.label} className="flex items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><c.Icon size={16} /></span>
              <div className="min-w-0"><p className="text-[11px] text-ink-subtle">{c.label}</p><p className="truncate text-[13px] font-medium text-ink-strong">{c.value}</p></div>
            </div>
          ))}
          <BtnOutline className="mt-1 w-full"><Pencil size={14} /> Editar contacto</BtnOutline>
        </div>
      </Card>
    </div>
  )
}

/* ── Servicios ───────────────────────────────────────────────────────────── */
function TabServicios() {
  const [q, setQ] = useState('')
  const lista = PROV_SERVICIOS.filter((s) => s.nombre.toLowerCase().includes(q.toLowerCase()))
  const stats = [
    { label: 'Total Servicios', value: PROV_SERVICIOS_STATS.total, sub: `${PROV_SERVICIOS_STATS.activos} activos, ${PROV_SERVICIOS_STATS.inactivos} inactivo` },
    { label: 'Solicitudes Totales', value: PROV_SERVICIOS_STATS.solicitudesTotales, sub: '+12% vs mes anterior' },
    { label: 'Más Solicitado', value: PROV_SERVICIOS_STATS.masSolicitado, sub: '24 solicitudes este mes', small: true },
    { label: 'Precio Promedio', value: EUR.format(PROV_SERVICIOS_STATS.precioPromedio), sub: 'Por persona' },
  ]
  return (
    <div className="flex flex-col gap-5">
      <Card>
        <div className="flex flex-col gap-3 border-b border-gray-200 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar servicios…" className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40" />
          </div>
          <BtnPrimary><Plus size={15} /> Agregar servicio</BtnPrimary>
        </div>
        <div className="hidden grid-cols-[1.6fr_120px_120px_110px_110px_90px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Servicio</span><span>Categoría</span><span>Precio</span><span>Estado</span><span>Solicitudes</span><span className="text-right">Acciones</span>
        </div>
        <div className="divide-y divide-gray-100">
          {lista.map((s) => (
            <div key={s.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3.5 transition-colors hover:bg-gray-50 md:grid-cols-[1.6fr_120px_120px_110px_110px_90px] md:gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-navy/8 text-navy"><s.Icon size={16} /></span>
                <div><p className="text-[13.5px] font-bold text-ink-strong">{s.nombre}</p><p className="text-[11.5px] text-ink-subtle">{s.desc}</p></div>
              </div>
              <span><Badge tone="navy">{PROVEEDOR.categoria}</Badge></span>
              <span className="text-[12.5px] text-ink-body">{EUR.format(s.precio)}<span className="text-ink-subtle">/persona</span></span>
              <span className="flex items-center gap-1.5 text-[12px] font-medium"><span className={cls('h-1.5 w-1.5 rounded-full', s.estado === 'Activo' ? 'bg-green-500' : 'bg-gray-300')} />{s.estado}</span>
              <span className="text-[12px] text-ink-muted">{s.solicitudes} este mes</span>
              <div className="flex items-center gap-1 md:justify-end">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-navy"><Pencil size={14} /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-navy"><Copy size={14} /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-[11.5px] text-ink-muted">{s.label}</p>
            <p className={cls('mt-1.5 font-bold leading-none text-ink-strong', s.small ? 'text-[15px]' : 'text-[24px]')}>{s.value}</p>
            <p className="mt-1.5 text-[11px] text-ink-subtle">{s.sub}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}

/* ── Documentos (verificación) ───────────────────────────────────────────── */
function TabDocumentos() {
  const aprobados = PROV_DOCUMENTOS.filter((d) => d.estado === 'Aprobado').length
  const pendientes = PROV_DOCUMENTOS.length - aprobados
  const kpis = [
    { label: 'Total Documentos', value: PROV_DOCUMENTOS.length, sub: 'Documentos registrados', Icon: FileText },
    { label: 'Aprobados', value: aprobados, sub: 'Verificación completa', Icon: CheckCircle2 },
    { label: 'Pendientes', value: pendientes, sub: 'En revisión', Icon: Clock },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end">
        <BtnPrimary><Upload size={15} /> Subir documento</BtnPrimary>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {kpis.map((k) => (
          <Card key={k.label} className="p-5">
            <div className="mb-2 flex items-center justify-between"><p className="text-[12px] text-ink-muted">{k.label}</p><k.Icon size={16} className="text-ink-subtle" /></div>
            <p className="text-[26px] font-bold leading-none text-ink-strong">{k.value}</p>
            <p className="mt-1.5 text-[11.5px] text-ink-subtle">{k.sub}</p>
          </Card>
        ))}
      </div>
      <Card>
        <div className="hidden grid-cols-[1.6fr_1.1fr_120px_120px_120px_70px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Documento</span><span>Tipo</span><span>Fecha</span><span>Estado</span><span>Validez</span><span className="text-right">Acciones</span>
        </div>
        <div className="divide-y divide-gray-100">
          {PROV_DOCUMENTOS.map((d) => (
            <div key={d.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3 transition-colors hover:bg-gray-50 md:grid-cols-[1.6fr_1.1fr_120px_120px_120px_70px] md:gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-50 text-[9px] font-bold text-red-500">PDF</span>
                <div><p className="text-[13px] font-semibold text-ink-strong">{d.nombre}</p><p className="text-[11px] text-ink-subtle">{d.tam}</p></div>
              </div>
              <span className="text-[12.5px] text-ink-body">{d.tipo}</span>
              <span className="text-[12px] text-ink-muted">{d.fecha}</span>
              <span><Badge tone={d.estado === 'Aprobado' ? 'green' : 'amber'}>{d.estado}</Badge></span>
              <span className="text-[12px] text-ink-muted">{d.validez}</span>
              <div className="flex items-center gap-1 md:justify-end">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-navy"><Eye size={15} /></button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-subtle transition-colors hover:bg-gray-100 hover:text-navy"><Download size={15} /></button>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <div className="flex items-start gap-3 rounded-xl border border-gray-200 bg-offwhite p-4">
        <Info size={18} className="mt-0.5 shrink-0 text-navy" />
        <div>
          <p className="text-[13px] font-bold text-ink-strong">Requisitos para subir documentos</p>
          <ul className="mt-2 flex flex-col gap-1.5 text-[12px] text-ink-muted">
            {['Formato PDF únicamente, tamaño máximo 10 MB por archivo', 'Los documentos deben estar vigentes y ser legibles', 'El tiempo de verificación es de 24-48 horas laborables', 'Recibirás una notificación cuando el documento sea validado'].map((r) => (
              <li key={r} className="flex items-center gap-2"><CheckCircle2 size={13} className="shrink-0 text-green-500" /> {r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
