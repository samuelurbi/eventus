import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { GoogleIcon, AppleIcon } from '../../components/BrandIcons'

export default function Login() {
  const navigate = useNavigate()
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    // Prototipo: cualquier credencial entra al dashboard del organizador
    navigate('/organizador')
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-semibold tracking-tight text-ink-strong">Bienvenido de nuevo</h2>
      <p className="mt-1.5 text-sm text-ink-muted">Ingresa a tu espacio de eventos.</p>

      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <Input
          label="Correo electrónico"
          name="email"
          type="email"
          placeholder="tucorreo@ejemplo.com"
          defaultValue="samuel@eventus.com"
          required
        />
        <Input
          label="Contraseña"
          name="password"
          type={showPw ? 'text' : 'password'}
          placeholder="••••••••"
          defaultValue="demo1234"
          required
          trailing={
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="text-xs font-medium hover:text-ink-strong"
            >
              {showPw ? 'Ocultar' : 'Ver'}
            </button>
          }
        />

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 text-[13px] text-ink-body">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300 accent-navy" defaultChecked />
            Recordarme
          </label>
          <Link to="/recuperar" className="text-[13px] font-medium text-navy hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" className="mt-2">
          Iniciar sesión
        </Button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <span className="h-px flex-1 bg-gray-200" />
        <span className="text-xs text-ink-subtle">o continúa con</span>
        <span className="h-px flex-1 bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="secondary" size="md"><GoogleIcon /> Google</Button>
        <Button variant="secondary" size="md"><AppleIcon /> Apple</Button>
      </div>

      <p className="mt-8 text-center text-sm text-ink-muted">
        ¿No tienes cuenta?{' '}
        <Link to="/registro" className="font-semibold text-navy hover:underline">
          Crear cuenta
        </Link>
      </p>
    </AuthLayout>
  )
}
