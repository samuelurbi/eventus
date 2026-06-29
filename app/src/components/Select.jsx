/**
 * Select del design system Eventus: label + <select> nativo estilizado.
 * options: [{ value, label }] · placeholder opcional.
 */
export default function Select({ label, hint, options = [], placeholder, className = '', id, ...props }) {
  const selId = id || props.name
  return (
    <label htmlFor={selId} className={`block ${className}`}>
      {label && <span className="mb-1.5 block text-[13px] font-medium text-ink-strong">{label}</span>}
      <span className="relative block">
        <select
          id={selId}
          className="h-11 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3.5 pr-10 text-sm text-ink-strong transition-colors focus:border-navy-light focus:outline-none focus:ring-2 focus:ring-mint/50"
          defaultValue=""
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-ink-muted">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
      {hint && <span className="mt-1 block text-xs text-ink-muted">{hint}</span>}
    </label>
  )
}
