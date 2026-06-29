import { useState } from 'react'
import { Search, UploadCloud, Download, MoreVertical, FileText, Image, Sheet, FileType2 } from 'lucide-react'
import { DOCUMENTOS } from '../../data/mock'
import { Card, CardHeader, cls } from '../../components/ui'
import { usePageHeader } from '../../layouts/pageHeader'

const TIPO = {
  pdf: { Icon: FileText,  wrap: 'bg-red-50 text-red-500',     label: 'PDF' },
  img: { Icon: Image,     wrap: 'bg-green-50 text-green-600', label: 'Imagen' },
  xls: { Icon: Sheet,     wrap: 'bg-emerald-50 text-emerald-600', label: 'Hoja' },
  doc: { Icon: FileType2, wrap: 'bg-blue-50 text-blue-600',   label: 'Documento' },
}
const tipoFor = (t) => TIPO[t] ?? TIPO.doc

export default function Documentos() {
  const [q, setQ] = useState('')
  usePageHeader('Documentos', `${DOCUMENTOS.length} archivos`)
  const docs = DOCUMENTOS.filter((d) =>
    d.nombre.toLowerCase().includes(q.toLowerCase()) || d.evento.toLowerCase().includes(q.toLowerCase()),
  )

  return (
    <div className="px-7 py-5">
      {/* Dropzone */}
      <button className="mb-5 flex w-full flex-col items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 bg-white py-8 text-ink-muted transition-colors hover:border-navy hover:text-navy">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-offwhite"><UploadCloud size={20} /></span>
        <span className="text-[13px] font-semibold">Arrastra archivos aquí o haz clic para subir</span>
        <span className="text-[11.5px] text-ink-subtle">PDF, imágenes, hojas de cálculo · hasta 25 MB</span>
      </button>

      <Card>
        <CardHeader
          title="Todos los documentos"
          action={
            <div className="relative w-56">
              <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-subtle" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar…"
                className="h-8 w-full rounded-lg border border-gray-200 bg-white pl-8 pr-3 text-[12.5px] text-ink-body placeholder:text-ink-subtle focus:border-navy focus:outline-none focus:ring-1 focus:ring-mint/40"
              />
            </div>
          }
        />
        {/* Encabezado de tabla */}
        <div className="hidden grid-cols-[1fr_180px_90px_110px_44px] items-center gap-3 border-b border-gray-100 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle md:grid">
          <span>Nombre</span><span>Evento</span><span>Tamaño</span><span>Fecha</span><span></span>
        </div>
        <div className="divide-y divide-gray-100">
          {docs.map((d) => {
            const t = tipoFor(d.tipo)
            return (
              <div key={d.id} className="grid grid-cols-1 items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50 md:grid-cols-[1fr_180px_90px_110px_44px]">
                <div className="flex min-w-0 items-center gap-3">
                  <span className={cls('flex h-9 w-9 shrink-0 items-center justify-center rounded-lg', t.wrap)}><t.Icon size={16} strokeWidth={1.9} /></span>
                  <span className="truncate text-[13px] font-semibold text-ink-strong">{d.nombre}</span>
                </div>
                <span className="truncate text-[12px] text-ink-muted">{d.evento}</span>
                <span className="text-[12px] text-ink-subtle">{d.tam}</span>
                <span className="text-[12px] text-ink-subtle">{d.fecha}</span>
                <div className="flex items-center justify-end gap-1">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100"><Download size={15} /></button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100"><MoreVertical size={15} /></button>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
