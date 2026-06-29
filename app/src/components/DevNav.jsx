/**
 * Panel de navegación para desarrollo — accesible desde cualquier pantalla.
 * Abre/cierra con el botón flotante o con Ctrl+K.
 * Permite saltar a cualquier ruta sin pasar por el flujo de auth.
 */
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Map, X, ChevronRight } from 'lucide-react'

const SECTIONS = [
  {
    label: 'Auth & Onboarding',
    color: 'bg-purple-500',
    routes: [
      { label: 'Splash', path: '/' },
      { label: 'Login', path: '/login' },
      { label: 'Registro — Elegir rol', path: '/registro' },
      { label: 'Registro Organizador', path: '/registro/organizador' },
      { label: 'Registro Proveedor', path: '/registro/proveedor' },
      { label: 'Recuperar contraseña', path: '/recuperar' },
      { label: 'Onboarding — Tipo', path: '/onboarding/tipo' },
      { label: 'Onboarding — Eventos', path: '/onboarding/eventos' },
      { label: 'Onboarding — Ubicación', path: '/onboarding/ubicacion' },
      { label: 'Onboarding — Presupuesto', path: '/onboarding/presupuesto' },
      { label: 'Onboarding — Servicios', path: '/onboarding/servicios' },
      { label: 'Onboarding — Listo', path: '/onboarding/listo' },
      { label: 'Onboarding Proveedor — Categoría', path: '/onboarding-proveedor/categoria' },
      { label: 'Onboarding Proveedor — Servicios', path: '/onboarding-proveedor/servicios' },
      { label: 'Onboarding Proveedor — Cobertura', path: '/onboarding-proveedor/cobertura' },
      { label: 'Onboarding Proveedor — Documentos', path: '/onboarding-proveedor/documentos' },
      { label: 'Onboarding Proveedor — Listo', path: '/onboarding-proveedor/listo' },
      { label: 'RSVP del invitado', path: '/rsvp/1' },
      { label: '404 / No encontrado', path: '/ruta-inexistente' },
    ],
  },
  {
    label: 'Dashboard Organizador',
    color: 'bg-navy',
    routes: [
      { label: 'Home', path: '/organizador' },
      { label: 'Eventos', path: '/organizador/eventos' },
      { label: 'Nuevo evento', path: '/organizador/eventos/nuevo' },
      { label: 'Calendario', path: '/organizador/calendario' },
      { label: 'Proveedores', path: '/organizador/proveedores' },
      { label: 'Pagos', path: '/organizador/pagos' },
      { label: 'Mensajes', path: '/organizador/mensajes' },
      { label: 'Notificaciones', path: '/organizador/notificaciones' },
      { label: 'Referidos', path: '/organizador/referidos' },
      { label: 'Configuración', path: '/organizador/configuracion' },
      { label: 'Ayuda', path: '/organizador/ayuda' },
    ],
  },
  {
    label: 'Dashboard Proveedor',
    color: 'bg-teal-600',
    routes: [
      { label: 'Dashboard', path: '/proveedor' },
      { label: 'Solicitudes', path: '/proveedor/solicitudes' },
      { label: 'Presupuestos', path: '/proveedor/presupuestos' },
      { label: 'Mensajes', path: '/proveedor/mensajes' },
      { label: 'Mi Perfil', path: '/proveedor/perfil' },
      { label: 'Mi Perfil — Servicios', path: '/proveedor/perfil?tab=servicios' },
      { label: 'Mi Perfil — Documentos', path: '/proveedor/perfil?tab=documentos' },
      { label: 'Solicitud — Detalle', path: '/proveedor/solicitudes/1' },
      { label: 'Historial', path: '/proveedor/historial' },
      { label: 'Suscripción', path: '/proveedor/suscripcion' },
      { label: 'Confirmar Suscripción', path: '/proveedor/suscripcion/confirmar?plan=profesional' },
      { label: 'Notificaciones', path: '/proveedor/notificaciones' },
      { label: 'Configuración', path: '/proveedor/configuracion' },
      { label: 'Ayuda', path: '/proveedor/ayuda' },
    ],
  },
]

export default function DevNav() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggle = useCallback(() => setOpen((v) => !v), [])

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [toggle])

  function go(path) {
    navigate(path)
    setOpen(false)
  }

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={toggle}
        title="Panel de navegación (Ctrl+K)"
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-[12px] font-semibold text-white shadow-pop hover:bg-navy-light transition-colors"
      >
        <Map size={14} strokeWidth={2} />
        Dev Nav
        <kbd className="rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-medium text-white/70">⌘K</kbd>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div
            className="relative flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-pop"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <div>
                <p className="font-semibold text-ink-strong">Panel de navegación</p>
                <p className="text-[12px] text-ink-muted mt-0.5">Salta a cualquier pantalla · <kbd className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px]">Esc</kbd> para cerrar</p>
              </div>
              <button onClick={() => setOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-muted hover:bg-gray-100">
                <X size={16} />
              </button>
            </div>

            {/* Secciones */}
            <div className="overflow-y-auto p-4">
              <div className="space-y-5">
                {SECTIONS.map((s) => (
                  <div key={s.label}>
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${s.color}`} />
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">{s.label}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
                      {s.routes.map((r) => {
                        const active = location.pathname === r.path
                        return (
                          <button
                            key={r.path}
                            onClick={() => go(r.path)}
                            className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-[13px] transition-colors ${
                              active
                                ? 'bg-navy text-white font-semibold'
                                : 'text-ink-body hover:bg-gray-100'
                            }`}
                          >
                            <span className="truncate">{r.label}</span>
                            <ChevronRight size={13} className={`shrink-0 ${active ? 'text-white/60' : 'text-ink-subtle'}`} />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
