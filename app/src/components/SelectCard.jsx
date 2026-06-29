/**
 * Tarjeta seleccionable para onboarding y selección de rol.
 * Props: selected, onClick, icon (nodo SVG), title, desc, multi (checkbox vs radio).
 * NUNCA emojis — siempre pasar un SVG como prop `icon`.
 */
export default function SelectCard({ selected, onClick, icon, title, desc, multi = false, className = '' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all duration-150 ${
        selected
          ? 'border-navy bg-navy/5 shadow-card'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-card'
      } ${className}`}
    >
      {icon && (
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors ${
            selected ? 'bg-navy text-white' : 'bg-gray-100 text-ink-muted group-hover:bg-gray-200'
          }`}
        >
          {icon}
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className={`block text-[15px] font-semibold transition-colors ${selected ? 'text-navy' : 'text-ink-strong'}`}>
          {title}
        </span>
        {desc && (
          <span className="mt-0.5 block text-sm leading-snug text-ink-muted">{desc}</span>
        )}
      </span>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 transition-all ${
          multi ? 'rounded-md' : 'rounded-full'
        } ${selected ? 'border-navy bg-navy text-white' : 'border-gray-300 text-transparent'}`}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6.3L4.8 9L10 3" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  )
}
