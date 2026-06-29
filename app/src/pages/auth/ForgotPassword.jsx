import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  return (
    <AuthLayout
      title={'Recupera el acceso\na tu cuenta.'}
      subtitle="Te enviamos un enlace para crear una nueva contraseña en segundos."
    >
      <div className="mb-4">
        <Link to="/login" className="text-[13px] font-medium text-ink-muted hover:text-ink-strong">
          ← Volver al login
        </Link>
      </div>

      {!sent ? (
        <>
          <h2 className="text-2xl font-semibold tracking-tight text-ink-strong">¿Olvidaste tu contraseña?</h2>
          <p className="mt-1.5 text-sm text-ink-muted">
            Ingresa tu correo y te enviaremos un enlace para restablecerla.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="mt-7 space-y-4"
          >
            <Input label="Correo electrónico" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
            <Button type="submit" fullWidth size="lg" className="mt-2">
              Enviar enlace
            </Button>
          </form>
        </>
      ) : (
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-mint/30 text-navy">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-ink-strong">Revisa tu correo</h2>
          <p className="mx-auto mt-2 max-w-xs text-sm text-ink-muted">
            Si existe una cuenta asociada, recibirás un enlace para restablecer tu contraseña.
          </p>
          <Button as={Link} to="/login" fullWidth size="lg" className="mt-7">
            Volver al login
          </Button>
          <button onClick={() => setSent(false)} className="mt-4 text-sm font-medium text-navy hover:underline">
            Reenviar enlace
          </button>
        </div>
      )}
    </AuthLayout>
  )
}
