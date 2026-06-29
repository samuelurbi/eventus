import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CalendarDays, Store } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout'
import Button from '../../components/Button'
import SelectCard from '../../components/SelectCard'

const ROLES = [
  {
    id: 'organizador',
    icon: <CalendarDays size={22} strokeWidth={1.8} />,
    title: 'Soy Organizador',
    desc: 'Quiero planear eventos y contratar proveedores.',
  },
  {
    id: 'proveedor',
    icon: <Store size={22} strokeWidth={1.8} />,
    title: 'Soy Proveedor',
    desc: 'Ofrezco servicios y quiero recibir solicitudes.',
  },
]

export default function Register() {
  const navigate = useNavigate()
  const [role, setRole] = useState('organizador')

  return (
    <AuthLayout
      title={'Empieza a organizar\ncomo un profesional.'}
      subtitle="Crea tu cuenta gratis. Elige cómo quieres usar Eventus y personalizamos el resto."
    >
      <h2 className="text-2xl font-semibold tracking-tight text-ink-strong">Crea tu cuenta</h2>
      <p className="mt-1.5 text-sm text-ink-muted">¿Cómo vas a usar Eventus?</p>

      <div className="mt-7 space-y-3">
        {ROLES.map((r) => (
          <SelectCard key={r.id} {...r} selected={role === r.id} onClick={() => setRole(r.id)} />
        ))}
      </div>

      <Button
        fullWidth
        size="lg"
        className="mt-7"
        onClick={() => navigate(role === 'organizador' ? '/registro/organizador' : '/registro/proveedor')}
      >
        Continuar
      </Button>

      <p className="mt-8 text-center text-sm text-ink-muted">
        ¿Ya tienes cuenta?{' '}
        <Link to="/login" className="font-semibold text-navy hover:underline">
          Inicia sesión
        </Link>
      </p>
    </AuthLayout>
  )
}
