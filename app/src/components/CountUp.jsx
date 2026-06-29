import { useState, useEffect } from 'react'

// Cuenta de 0 → `to` al montar (easeOutCubic). Respeta prefers-reduced-motion.
export function CountUp({ to, duration = 750, decimals = 0, prefix = '', suffix = '', format }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setVal(to); return
    }
    let raf, start
    const tick = (t) => {
      if (start == null) start = t
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(to * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(to)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [to, duration])

  const out = format ? format(val) : `${prefix}${val.toFixed(decimals)}${suffix}`
  return <span>{out}</span>
}
