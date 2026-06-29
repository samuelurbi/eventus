import { useState } from 'react'
import { Share2, UserPlus, Gift, Copy, Check, TrendingUp, Sparkles } from 'lucide-react'
import { REFERIDOS, REFERIDOS_STATS as S } from '../../data/mock'
import { FMT } from '../../data/theme'
import { Card, CardHeader, Badge, BtnPrimary } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const PASOS = [
  { Icon: Share2,   titulo: '1. Comparte',     desc: 'Envía tu enlace único a amigos y colegas' },
  { Icon: UserPlus, titulo: '2. Se registran', desc: 'Tus contactos crean su cuenta en Eventus' },
  { Icon: Gift,     titulo: '3. Ganas',        desc: `Ambos reciben ${FMT.format(S.porReferido)} en créditos` },
]

export default function Referidos() {
  const [copiado, setCopiado] = useState(false)
  const copiar = () => {
    navigator.clipboard?.writeText(`https://${S.enlace}`)
    setCopiado(true); setTimeout(() => setCopiado(false), 1800)
  }
  const pctMeta = Math.round((S.total / S.meta) * 100)
  usePageHeader('Programa de referidos', 'Invita amigos y gana recompensas')

  return (
    <div className="px-7 py-5">
      {/* Cómo funciona */}
      <Card className="mb-5 p-5">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint/30 text-navy"><Gift size={20} /></span>
          <div>
            <h2 className="text-[15px] font-bold text-ink-strong">Comparte Eventus y obtén créditos</h2>
            <p className="mt-0.5 max-w-2xl text-[12.5px] text-ink-muted">
              Gana créditos cada vez que un contacto se registre y cree su primer evento. Ambos reciben beneficios.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {PASOS.map((p) => (
            <div key={p.titulo} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-offwhite p-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-navy"><p.Icon size={16} strokeWidth={1.9} /></span>
              <div>
                <p className="text-[13px] font-bold text-ink-strong">{p.titulo}</p>
                <p className="mt-0.5 text-[11.5px] text-ink-muted">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Enlace de referido (navy) */}
      <div className="mb-5 flex flex-col gap-3 overflow-hidden rounded-lg bg-navy p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-white/55">Tu enlace de referido</p>
          <p className="mt-1 truncate text-[16px] font-bold text-white">{S.enlace}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button onClick={copiar} className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-white/90">
            {copiado ? <Check size={15} strokeWidth={2.5} /> : <Copy size={15} />}{copiado ? 'Copiado' : 'Copiar enlace'}
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-mint px-3.5 py-2 text-[13px] font-semibold text-navy transition-colors hover:bg-[#aee584]">
            <Share2 size={15} /> Compartir
          </button>
        </div>
      </div>

      {/* Estadísticas + Créditos */}
      <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <Card className="p-5">
          <p className="text-[13px] font-bold text-ink-strong">Estadísticas</p>
          <div className="mt-3 flex items-end justify-between">
            <span className="text-[11px] font-medium text-ink-muted">Referidos totales</span>
            <span className="text-[26px] font-bold leading-none tracking-tight text-ink-strong">{S.total}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <div className="h-full rounded-full bg-navy" style={{ width: `${pctMeta}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] text-ink-subtle">{pctMeta}% de tu meta mensual ({S.meta} referidos)</p>
          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4">
            <div>
              <p className="text-[18px] font-bold text-ink-strong">{S.registrados}</p>
              <p className="text-[11px] text-ink-muted">Registrados</p>
            </div>
            <div>
              <p className="flex items-center gap-1 text-[18px] font-bold text-ink-strong">{S.conEvento}<TrendingUp size={13} className="text-green-600" /></p>
              <p className="text-[11px] text-ink-muted">Con evento creado</p>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col p-5">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-ink-strong">Créditos acumulados</p>
            <Badge tone="mint"><Sparkles size={11} className="mr-1" />Disponibles</Badge>
          </div>
          <p className="mt-3 text-[30px] font-bold leading-none tracking-tight text-ink-strong">{FMT.format(S.creditos)}</p>
          <p className="mt-1 text-[12px] text-ink-muted">Créditos disponibles para usar en la plataforma</p>
          <div className="mt-4 flex flex-col gap-2">
            {[{ t: 'Referido registrado', d: 'Hace 2 días' }, { t: 'Referido registrado', d: 'Hace 5 días' }].map((c, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 px-3 py-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-mint/25 text-navy"><Gift size={13} /></span>
                <div className="flex-1"><p className="text-[12px] font-semibold text-ink-strong">{c.t}</p><p className="text-[11px] text-ink-subtle">{c.d}</p></div>
                <span className="text-[12px] font-bold text-green-600">+{FMT.format(S.porReferido)}</span>
              </div>
            ))}
          </div>
          <BtnPrimary className="mt-4 w-full">Usar mis créditos</BtnPrimary>
        </Card>
      </div>

      {/* Tabla de referidos */}
      <Card>
        <CardHeader title="Tus referidos" action={<span className="text-[12px] font-medium text-ink-subtle">{REFERIDOS.length} de {S.total}</span>} />
        <div className="hidden grid-cols-[1fr_1fr_140px_120px_80px] gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Nombre</span><span>Email</span><span>Estado</span><span>Fecha</span><span className="text-right">Crédito</span>
        </div>
        <div className="divide-y divide-gray-100">
          {REFERIDOS.map((r) => (
            <div key={r.id} className="grid grid-cols-1 items-center gap-2 px-5 py-3 transition-colors hover:bg-gray-50 md:grid-cols-[1fr_1fr_140px_120px_80px] md:gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-mint">
                  {r.nombre.split(' ').map((x) => x[0]).slice(0, 2).join('')}
                </span>
                <span className="text-[13px] font-semibold text-ink-strong">{r.nombre}</span>
              </div>
              <span className="truncate text-[12px] text-ink-muted">{r.email}</span>
              <div><Badge tone={r.estado === 'Evento creado' ? 'green' : 'gray'}>{r.estado}</Badge></div>
              <span className="text-[12px] text-ink-subtle">{r.fecha}</span>
              <span className="text-right text-[12px] font-bold text-ink-strong md:text-right">
                {r.credito > 0 ? FMT.format(r.credito) : <span className="font-medium text-ink-subtle">Pendiente</span>}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Términos */}
      <Card className="mt-5 p-5">
        <p className="mb-3 text-[13px] font-bold text-ink-strong">Términos y condiciones del programa</p>
        <ul className="grid grid-cols-1 gap-1.5 text-[12px] text-ink-muted sm:grid-cols-2">
          <li>· Disponible para todos los usuarios registrados de Eventus.</li>
          <li>· Los créditos se otorgan cuando el referido crea su primer evento.</li>
          <li>· Cada usuario puede referir hasta 50 personas al mes.</li>
          <li>· Tanto el referido como tú reciben {FMT.format(S.porReferido)} en créditos.</li>
          <li>· Los créditos son válidos por 12 meses desde su emisión.</li>
          <li>· Los créditos no son transferibles ni canjeables por dinero.</li>
        </ul>
      </Card>
    </div>
  )
}
