import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft, Star, MapPin, BadgeCheck, Heart, Mail, Phone, Check,
  Clock, CalendarCheck, Users, Globe, Image as ImageIcon,
} from 'lucide-react'
import { PROVEEDORES, PROVEEDOR_SERVICIOS, PROVEEDOR_PAQUETES, PROVEEDOR_RESENAS } from '../../data/mock'
import { FMT } from '../../data/theme'
import { Card, CardHeader, Badge, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'
import { catFor } from './Proveedores'

const inputCls = 'h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40'

function Stars({ rating, size = 13 }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} className={i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
      ))}
    </span>
  )
}

const INFO = [
  { Icon: Clock, label: 'Tiempo de respuesta', val: 'Menos de 24 h' },
  { Icon: CalendarCheck, label: 'Disponibilidad', val: 'Todo el año' },
  { Icon: MapPin, label: 'Zona de servicio', val: 'Madrid y alrededores' },
  { Icon: Users, label: 'Capacidad', val: '20 a 500 personas' },
  { Icon: Globe, label: 'Idiomas', val: 'Español, Inglés' },
]

export default function ProveedorDetalle() {
  const { id } = useParams()
  const p = PROVEEDORES.find((x) => String(x.id) === id) ?? PROVEEDORES[0]
  const c = catFor(p.categoria)
  usePageHeader(p.nombre, `${p.categoria} · ${p.ubicacion}`)

  return (
    <div className="px-7 py-5">
      <Link to="/organizador/proveedores" className="mb-4 flex items-center gap-1.5 text-[13px] font-semibold text-ink-muted transition-colors hover:text-navy">
        <ArrowLeft size={15} /> Marketplace
      </Link>

      {/* Cabecera */}
      <Card className="mb-5 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-[20px] font-bold text-white" style={{ backgroundImage: c.grad }}>{p.avatar}</span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-bold text-ink-strong">{p.nombre}</h2>
                {p.destacado && <span className="inline-flex items-center gap-1 rounded-full bg-navy/8 px-2 py-0.5 text-[10px] font-bold text-navy"><BadgeCheck size={11} /> Verificado</span>}
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-ink-muted">
                <span className="flex items-center gap-1"><MapPin size={12} /> {p.ubicacion}</span>
                <span className="flex items-center gap-1"><c.Icon size={12} /> {p.categoria}</span>
                <span className="flex items-center gap-1"><CalendarCheck size={12} /> +160 eventos</span>
              </p>
              <div className="mt-2 flex items-center gap-2">
                <Stars rating={p.rating} /><span className="text-[12px] font-semibold text-ink-strong">{p.rating.toFixed(1)}</span>
                <span className="text-[11.5px] text-ink-subtle">({p.reviews} reseñas)</span>
                <span className="text-[11.5px] text-ink-muted">· desde <span className="font-bold text-ink-strong">{FMT.format(p.desde)}{p.unidad || ''}</span></span>
              </div>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <BtnOutline><Heart size={14} /> Guardar</BtnOutline>
            <BtnPrimary className="bg-navy text-white hover:bg-navy-light"><Mail size={14} /> Contactar</BtnPrimary>
          </div>
        </div>
      </Card>

      {/* Galería */}
      <Card className="mb-5 p-4">
        <p className="mb-3 flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Galería</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="relative col-span-2 row-span-2 flex h-44 items-center justify-center overflow-hidden rounded-lg sm:h-full" style={{ backgroundImage: c.grad }}>
            <c.Icon size={56} strokeWidth={1.3} className="text-white/30" />
          </div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex h-24 items-center justify-center rounded-lg bg-gray-100 text-ink-subtle"><ImageIcon size={20} /></div>
          ))}
          <div className="flex h-24 items-center justify-center rounded-lg bg-navy text-[13px] font-bold text-white">+12 fotos</div>
        </div>
      </Card>

      {/* Cuerpo 2 columnas */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_320px] xl:items-start">
        {/* Izquierda */}
        <div className="flex flex-col gap-5">
          <Card className="p-5">
            <p className="mb-2 flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Sobre nosotros</p>
            <p className="text-[13px] leading-relaxed text-ink-body">
              {p.nombre} es una empresa con más de 15 años de experiencia en {p.categoria.toLowerCase()} para eventos. Ofrecemos un servicio completamente personalizado, adaptándonos a las necesidades y preferencias de cada cliente para crear experiencias memorables en bodas, eventos corporativos y celebraciones privadas.
            </p>
          </Card>

          <Card>
            <CardHeader title="Servicios ofrecidos" />
            <div className="grid grid-cols-1 gap-px bg-gray-100 sm:grid-cols-2">
              {PROVEEDOR_SERVICIOS.map((s) => (
                <div key={s.titulo} className="flex items-start gap-3 bg-white p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mint/25 text-navy"><Check size={15} strokeWidth={2.4} /></span>
                  <div><p className="text-[13px] font-semibold text-ink-strong">{s.titulo}</p><p className="mt-0.5 text-[11.5px] text-ink-muted">{s.desc}</p></div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Paquetes y precios" />
            <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-3">
              {PROVEEDOR_PAQUETES.map((pk) => (
                <div key={pk.nombre} className={cls('relative flex flex-col rounded-lg border p-4', pk.popular ? 'border-navy bg-navy/[0.03]' : 'border-gray-200')}>
                  {pk.popular && <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-navy px-2.5 py-0.5 text-[10px] font-bold text-white">Más popular</span>}
                  <p className="text-[14px] font-bold text-ink-strong">{pk.nombre}</p>
                  <p className="text-[11.5px] text-ink-muted">{pk.desc}</p>
                  <p className="mt-2 text-[22px] font-bold tracking-tight text-ink-strong">{FMT.format(pk.precio)}</p>
                  <ul className="mt-3 flex flex-1 flex-col gap-1.5">
                    {pk.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-[12px] text-ink-body"><Check size={13} className="shrink-0 text-green-600" />{f}</li>
                    ))}
                  </ul>
                  <button className={cls('mt-4 rounded-lg py-2 text-[12.5px] font-semibold transition-colors', pk.popular ? 'bg-mint text-navy hover:bg-[#aee584]' : 'border border-gray-200 text-ink-strong hover:border-navy/40')}>Solicitar presupuesto</button>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Valoraciones" action={<span className="flex items-center gap-1 text-[12px] font-semibold text-ink-strong"><Star size={12} className="fill-amber-400 text-amber-400" />{p.rating.toFixed(1)} ({p.reviews})</span>} />
            <div className="divide-y divide-gray-100">
              {PROVEEDOR_RESENAS.map((r) => (
                <div key={r.nombre} className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-mint">{r.avatar}</span>
                    <div className="flex-1"><p className="text-[13px] font-semibold text-ink-strong">{r.nombre}</p><Stars rating={r.rating} size={12} /></div>
                    <span className="text-[11px] text-ink-subtle">{r.fecha}</span>
                  </div>
                  <p className="mt-2 text-[12.5px] leading-relaxed text-ink-body">{r.texto}</p>
                  <p className="mt-1 text-[11px] text-ink-subtle">{r.evento}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 p-3">
              <button className="w-full rounded-lg border border-gray-200 py-2 text-[12.5px] font-semibold text-ink-strong transition-colors hover:border-navy/40">Ver todas las valoraciones</button>
            </div>
          </Card>
        </div>

        {/* Sidebar derecho */}
        <div className="flex flex-col gap-5">
          <Card className="p-5">
            <p className="text-[14px] font-bold text-ink-strong">Solicitar presupuesto</p>
            <div className="mt-3 flex flex-col gap-3">
              <label className="block"><span className="mb-1 block text-[12px] font-semibold text-ink-strong">Tipo de evento</span>
                <select className={inputCls}><option>Selecciona tipo</option><option>Boda</option><option>Corporativo</option><option>Fiesta</option></select>
              </label>
              <label className="block"><span className="mb-1 block text-[12px] font-semibold text-ink-strong">Fecha del evento</span><input type="date" className={inputCls} /></label>
              <label className="block"><span className="mb-1 block text-[12px] font-semibold text-ink-strong">Número de invitados</span><input type="number" className={inputCls} placeholder="Ej. 250" /></label>
              <label className="block"><span className="mb-1 block text-[12px] font-semibold text-ink-strong">Mensaje (opcional)</span>
                <textarea rows={3} className={cls(inputCls, 'h-auto py-2')} placeholder="Cuéntanos más sobre tu evento…" />
              </label>
              <BtnPrimary className="w-full">Enviar solicitud</BtnPrimary>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <BtnOutline><Phone size={14} /> Llamar</BtnOutline>
              <BtnOutline><Mail size={14} /> Email</BtnOutline>
            </div>
          </Card>

          <Card className="p-5">
            <p className="mb-3 text-[13px] font-bold text-ink-strong">Información adicional</p>
            <div className="flex flex-col gap-3">
              {INFO.map((it) => (
                <div key={it.label} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-offwhite text-navy"><it.Icon size={15} strokeWidth={1.9} /></span>
                  <div><p className="text-[11px] text-ink-muted">{it.label}</p><p className="text-[12.5px] font-semibold text-ink-strong">{it.val}</p></div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
