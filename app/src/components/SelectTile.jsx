/**
 * Tile compacto seleccionable para grids (tipos de evento, servicios).
 * icon: nodo SVG (nunca emoji). label: texto corto.
 */
export default function SelectTile({ selected, onClick, icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 px-3 py-5 text-center transition-all duration-150 ${
        selected
          ? 'border-navy bg-navy/5 shadow-card'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-card'
      }`}
    >
      <span
        className={`absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full transition-all ${
          selected ? 'bg-navy text-white scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
          <path d="M2 6.3L4.8 9L10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`transition-colors ${selected ? 'text-navy' : 'text-ink-muted'}`}>
        {icon}
      </span>
      <span className={`text-[13px] font-semibold transition-colors ${selected ? 'text-navy' : 'text-ink-strong'}`}>
        {label}
      </span>
    </button>
  )
}
