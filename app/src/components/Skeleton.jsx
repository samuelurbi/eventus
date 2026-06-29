import { useState, useEffect } from 'react'
import { cls } from './ui'

// Bloque skeleton con pulso (usa la animación pulse de Tailwind)
export function Skeleton({ className = '' }) {
  return <span className={cls('block animate-pulse rounded-md bg-gray-200/80 motion-reduce:animate-none', className)} />
}

// Simula una carga breve la primera vez que se monta (para demostrar skeletons)
export function useFakeLoad(ms = 650) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), ms)
    return () => clearTimeout(t)
  }, [ms])
  return loading
}

// Fila skeleton genérica (avatar + dos líneas)
export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 px-5 py-3.5">
      <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-2.5 w-1/2" />
      </div>
      <Skeleton className="h-7 w-20 rounded-lg" />
    </div>
  )
}

// Tarjeta skeleton (portada + texto)
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      <Skeleton className="h-32 w-full rounded-none" />
      <div className="space-y-2.5 p-4">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-2.5 w-1/2" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  )
}
