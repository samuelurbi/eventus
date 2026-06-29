import { Wallet, TrendingDown, PiggyBank, AlertTriangle } from 'lucide-react'
import { PRESUPUESTO_CATEGORIAS } from '../../data/mock'
import { FMT } from '../../data/theme'
import { Card, CardHeader, Badge } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

function KpiCard({ icon, label, value, sub, tone = 'navy' }) {
  const wrap = { navy: 'bg-navy/8 text-navy', amber: 'bg-amber-50 text-amber-600', green: 'bg-green-50 text-green-600' }[tone]
  return (
    <Card className="p-5">
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${wrap}`}>{icon}</span>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-ink-muted">{label}</p>
      <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-ink-strong">{value}</p>
      {sub && <p className="mt-1.5 text-[11.5px] text-ink-subtle">{sub}</p>}
    </Card>
  )
}

export default function Presupuesto() {
  const asignado = PRESUPUESTO_CATEGORIAS.reduce((s, c) => s + c.asignado, 0)
  const gastado = PRESUPUESTO_CATEGORIAS.reduce((s, c) => s + c.gastado, 0)
  const restante = asignado - gastado
  const pct = Math.round((gastado / asignado) * 100)
  usePageHeader('Presupuesto', 'Boda Martínez & López · resumen de gastos')

  return (
    <div className="px-7 py-5">
      {/* KPIs */}
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiCard icon={<Wallet size={17} strokeWidth={1.9} />} label="Presupuesto asignado" value={FMT.format(asignado)} sub="Total del evento" tone="navy" />
        <KpiCard icon={<TrendingDown size={17} strokeWidth={1.9} />} label="Gastado" value={FMT.format(gastado)} sub={`${pct}% del total`} tone="amber" />
        <KpiCard icon={<PiggyBank size={17} strokeWidth={1.9} />} label="Restante" value={FMT.format(restante)} sub={`${100 - pct}% disponible`} tone="green" />
      </div>

      {/* Barra global */}
      <Card className="mb-5 p-5">
        <div className="mb-2 flex items-center justify-between text-[13px]">
          <span className="font-semibold text-ink-strong">Ejecución global</span>
          <span className="text-ink-muted">{FMT.format(gastado)} <span className="text-ink-subtle">/ {FMT.format(asignado)}</span></span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
          <div className="h-full rounded-full bg-navy" style={{ width: `${pct}%` }} />
        </div>
      </Card>

      {/* Categorías */}
      <Card>
        <CardHeader title="Gasto por categoría" action={<span className="text-[12px] font-medium text-ink-subtle">{PRESUPUESTO_CATEGORIAS.length} categorías</span>} />
        <div className="divide-y divide-gray-100">
          {PRESUPUESTO_CATEGORIAS.map((c) => {
            const p = Math.round((c.gastado / c.asignado) * 100) || 0
            const alto = p >= 90
            return (
              <div key={c.categoria} className="px-5 py-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-ink-strong">
                    {c.categoria}
                    {alto && <Badge tone="amber"><AlertTriangle size={11} className="mr-1" />{p}%</Badge>}
                  </span>
                  <span className="text-[12px] text-ink-muted">
                    {FMT.format(c.gastado)} <span className="text-ink-subtle">/ {FMT.format(c.asignado)}</span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div className={`h-full rounded-full ${alto ? 'bg-amber-500' : 'bg-navy'}`} style={{ width: `${Math.min(p, 100)}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
