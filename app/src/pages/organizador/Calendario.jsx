import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import { EVENTOS } from '../../data/mock'
import { themeFor } from '../../data/theme'
import { Card, BtnPrimary, BtnOutline, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
const MES_LARGO = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
const DIAS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']

const EVS = EVENTOS.map((e) => {
  const [d, m, y] = e.fecha.split(' ')
  return { ...e, d: Number(d), m: MESES.indexOf((m || '').toLowerCase()), y: Number(y) }
})

export default function Calendario() {
  const [cursor, setCursor] = useState({ y: 2026, m: 8 }) // Sep 2026
  usePageHeader('Calendario', 'Tus eventos en el tiempo')

  const primero = new Date(cursor.y, cursor.m, 1)
  const offset = (primero.getDay() + 6) % 7 // Lun=0
  const totalDias = new Date(cursor.y, cursor.m + 1, 0).getDate()
  const celdas = [...Array(offset).fill(null), ...Array.from({ length: totalDias }, (_, i) => i + 1)]
  const evDe = (dia) => EVS.filter((e) => e.y === cursor.y && e.m === cursor.m && e.d === dia)
  const mover = (delta) => setCursor((c) => { const n = c.m + delta; return { y: c.y + Math.floor(n / 12), m: ((n % 12) + 12) % 12 } })
  const proximos = EVS.filter((e) => new Date(e.y, e.m, e.d) >= new Date(2026, 0, 1)).sort((a, b) => new Date(a.y, a.m, a.d) - new Date(b.y, b.m, b.d))

  return (
    <div className="px-4 py-5 sm:px-7">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_300px] xl:items-start">
        <Card className="p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-ink-strong">{MES_LARGO[cursor.m]} {cursor.y}</h2>
            <div className="flex items-center gap-1.5">
              <button onClick={() => mover(-1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-ink-muted transition-colors hover:border-navy/40 hover:text-navy"><ChevronLeft size={16} /></button>
              <button onClick={() => setCursor({ y: 2026, m: 8 })} className="rounded-lg border border-gray-200 px-3 py-1.5 text-[12px] font-semibold text-ink-muted transition-colors hover:border-navy/40">Hoy</button>
              <button onClick={() => mover(1)} className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-ink-muted transition-colors hover:border-navy/40 hover:text-navy"><ChevronRight size={16} /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {DIAS.map((d) => <div key={d} className="pb-1 text-center text-[10.5px] font-semibold uppercase tracking-wide text-ink-subtle">{d}</div>)}
            {celdas.map((dia, i) => (
              <div key={i} className={cls('min-h-[68px] rounded-lg border p-1.5 sm:min-h-[84px]', dia ? 'border-gray-100' : 'border-transparent')}>
                {dia && (
                  <>
                    <span className="text-[11px] font-semibold text-ink-muted">{dia}</span>
                    <div className="mt-1 flex flex-col gap-1">
                      {evDe(dia).map((e) => {
                        const t = themeFor(e.tipo)
                        return (
                          <Link key={e.id} to={`/organizador/eventos/${e.id}`} className="block truncate rounded px-1.5 py-1 text-[10px] font-semibold text-white" style={{ backgroundImage: t.grad }} title={e.nombre}>{e.nombre}</Link>
                        )
                      })}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Próximos eventos */}
        <Card className="xl:sticky xl:top-5">
          <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
            <h2 className="flex items-center gap-2 text-[14px] font-bold text-ink-strong"><span className="h-3.5 w-[3px] rounded-full bg-navy" />Próximos</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {proximos.map((e) => {
              const t = themeFor(e.tipo)
              return (
                <Link key={e.id} to={`/organizador/eventos/${e.id}`} className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-gray-50">
                  <span className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg text-white" style={{ backgroundImage: t.grad }}>
                    <span className="text-[15px] font-bold leading-none">{e.d}</span>
                    <span className="text-[9px] uppercase">{MESES[e.m]}</span>
                  </span>
                  <div className="min-w-0 flex-1"><p className="truncate text-[13px] font-semibold text-ink-strong">{e.nombre}</p><p className="truncate text-[11.5px] text-ink-muted">{e.lugar}</p></div>
                </Link>
              )
            })}
          </div>
          <div className="p-3"><BtnPrimary to="/organizador/eventos/nuevo" className="w-full"><Plus size={15} /> Nuevo evento</BtnPrimary></div>
        </Card>
      </div>
    </div>
  )
}
