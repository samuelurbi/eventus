/**
 * Campo de formulario Eventus: label + input (+ hint/error opcional).
 * Acepta un slot `trailing` (p.ej. botón mostrar contraseña).
 */
export default function Input({
  label,
  hint,
  error,
  trailing,
  className = '',
  id,
  ...props
}) {
  const inputId = id || props.name
  return (
    <label htmlFor={inputId} className={`block ${className}`}>
      {label && (
        <span className="mb-1.5 block text-[13px] font-medium text-ink-strong">{label}</span>
      )}
      <span className="relative block">
        <input
          id={inputId}
          className={`h-11 w-full rounded-lg border bg-white px-3.5 text-sm text-ink-strong placeholder:text-ink-subtle transition-colors focus:outline-none focus:ring-2 focus:ring-mint/50 ${
            error ? 'border-red-400' : 'border-gray-200 focus:border-navy-light'
          } ${trailing ? 'pr-11' : ''}`}
          {...props}
        />
        {trailing && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink-muted">
            {trailing}
          </span>
        )}
      </span>
      {error ? (
        <span className="mt-1 block text-xs text-red-500">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ink-muted">{hint}</span>
      ) : null}
    </label>
  )
}
