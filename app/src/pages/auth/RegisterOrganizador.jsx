import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { GoogleIcon, AppleIcon } from '../../components/BrandIcons'

export default function RegisterOrganizador() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/onboarding/tipo')
  }

  return (
    <AuthLayout
      title={'Tu primer evento\nempieza aquí.'}
      subtitle="Crea tu cuenta de organizador y en unos pasos tendrás tu espacio listo."
    >
      <div className="mb-4">
        <Link to="/registro" className="text-[13px] font-medium text-ink-muted hover:text-ink-strong">
          ← Cambiar tipo de cuenta
        </Link>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-ink-strong">Crear cuenta · Organizador</h2>
      <p className="mt-1.5 text-sm text-ink-muted">Empieza gratis, sin tarjeta.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <Input label="Nombre completo" name="nombre" placeholder="Samuel Urbina" required />
        <Input label="Correo electrónico" name="email" type="email" placeholder="tucorreo@ejemplo.com" required />
        <Input
          label="Contraseña"
          name="password"
          type={showPw ? 'text' : 'password'}
          placeholder="Mínimo 8 caracteres"
          hint="Usa al menos 8 caracteres."
          required
          trailing={
            <button type="button" onClick={() => setShowPw((v) => !v)} className="text-xs font-medium hover:text-ink-strong">
              {showPw ? 'Ocultar' : 'Ver'}
            </button>
          }
        />

        <label className="flex items-start gap-2.5 pt-1 text-[13px] text-ink-body">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 accent-navy" />
          <span>
            Acepto los <a className="font-medium text-navy hover:underline">Términos</a> y la{' '}
            <a className="font-medium text-navy hover:underline">Política de privacidad</a>.
          </span>
        </label>

        <Button type="submit" fullWidth size="lg" className="mt-2">
          Crear cuenta
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-ink-subtle">o regístrate con</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" size="md"><GoogleIcon /> Google</Button>
        <Button variant="secondary" size="md"><AppleIcon /> Apple</Button>
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-navy hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
