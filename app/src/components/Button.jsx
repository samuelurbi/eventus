/**
 * Botón del design system Eventus.
 * variants: primary (mint), secondary (borde), ghost, dark (navy), link
 * sizes: sm, md, lg · fullWidth opcional
 */
const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-mint/60 disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-mint text-navy hover:bg-[#aee584]',
  secondary: 'bg-white text-ink-strong border border-gray-200 hover:bg-gray-100',
  dark: 'bg-navy text-white hover:bg-navy-light',
  ghost: 'bg-transparent text-ink-body hover:bg-gray-100',
  link: 'bg-transparent text-navy hover:underline px-0 h-auto',
}

const sizes = {
  sm: 'h-9 px-3.5 text-[13px]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

export default function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}) {
  return (
    <Tag
      className={`${base} ${variants[variant]} ${variant !== 'link' ? sizes[size] : ''} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
