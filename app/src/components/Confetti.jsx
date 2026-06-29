import { useMemo } from 'react'

const COLORS = ['#BCEE95', '#0B334C', '#FB7BA8', '#A78BFA', '#FBBF24', '#34D399', '#60A5FA']

// Confeti ligero sin dependencias — piezas absolutas que caen con CSS keyframes
export function Confetti({ count = 90 }) {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 2.4 + Math.random() * 2,
        color: COLORS[i % COLORS.length],
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 8,
        rot: Math.random() * 360,
        round: Math.random() > 0.6,
      })),
    [count],
  )
  return (
    <div className="pointer-events-none fixed inset-0 z-[300] overflow-hidden">
      <style>{`@keyframes confetti-fall{0%{transform:translateY(-12vh) rotate(0deg);opacity:1}100%{transform:translateY(112vh) rotate(720deg);opacity:.9}}`}</style>
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            top: 0,
            left: `${p.left}%`,
            width: p.w,
            height: p.round ? p.w : p.h,
            background: p.color,
            borderRadius: p.round ? '50%' : 2,
            animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(.3,.6,.5,1) forwards`,
          }}
        />
      ))}
    </div>
  )
}
