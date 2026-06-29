import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Inbox, FileText, MessageSquare, Store, History, Crown,
  LogOut, Menu, Settings, LifeBuoy,
} from 'lucide-react'
import Logo from '../components/Logo'
import { cls } from '../components/ui'
import { NotificationsBell, NOTIF_PROV } from '../components/NotificationsBell'
import { GlobalSearch } from '../components/GlobalSearch'
import { PageHeaderContext } from './pageHeader'
import { PROVEEDOR, PROV_KPIS, SOLICITUDES } from '../data/proveedorMock'

const SEARCH_ITEMS = [
  ...SOLICITUDES.map((s) => ({ group: 'Solicitudes', label: s.evento, sub: `${s.organizador} · ${s.ubicacion}`, to: `/proveedor/solicitudes/${s.id}`, Icon: Inbox })),
  { group: 'Secciones', label: 'Dashboard', to: '/proveedor', Icon: LayoutDashboard },
  { group: 'Secciones', label: 'Solicitudes', to: '/proveedor/solicitudes', Icon: Inbox },
  { group: 'Secciones', label: 'Presupuestos', to: '/proveedor/presupuestos', Icon: FileText },
  { group: 'Secciones', label: 'Mensajes', to: '/proveedor/mensajes', Icon: MessageSquare },
  { group: 'Secciones', label: 'Mi Perfil', to: '/proveedor/perfil', Icon: Store },
  { group: 'Secciones', label: 'Historial', to: '/proveedor/historial', Icon: History },
  { group: 'Secciones', label: 'Suscripción', to: '/proveedor/suscripcion', Icon: Crown },
  { group: 'Secciones', label: 'Configuración', to: '/proveedor/configuracion', Icon: Settings },
  { group: 'Secciones', label: 'Ayuda', to: '/proveedor/ayuda', Icon: LifeBuoy },
]

const NAV_GROUPS = [
  {
    label: 'Gestión',
    items: [
      { to: '/proveedor', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/proveedor/solicitudes', icon: Inbox, label: 'Solicitudes', badge: PROV_KPIS.solicitudesPendientes },
      { to: '/proveedor/presupuestos', icon: FileText, label: 'Presupuestos' },
      { to: '/proveedor/mensajes', icon: MessageSquare, label: 'Mensajes', badge: PROV_KPIS.conversacionesSinLeer },
    ],
  },
  {
    label: 'Negocio',
    items: [
      { to: '/proveedor/perfil', icon: Store, label: 'Mi Perfil' },
      { to: '/proveedor/historial', icon: History, label: 'Historial' },
      { to: '/proveedor/suscripcion', icon: Crown, label: 'Suscripción' },
    ],
  },
]

function NavItem({ to, icon: Icon, label, badge, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `relative flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-[13px] font-medium transition-colors ${
          isActive ? 'bg-white/10 text-white' : 'text-white/45 hover:bg-white/6 hover:text-white/80'
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && <span className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full bg-mint" />}
          <Icon size={16} strokeWidth={isActive ? 2 : 1.7} className={isActive ? 'text-mint' : ''} />
          <span className="flex-1">{label}</span>
          {badge ? <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">{badge}</span> : null}
        </>
      )}
    </NavLink>
  )
}

export default function ProviderLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [header, setHeader] = useState({ title: '', subtitle: '' })
  const [navOpen, setNavOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden gap-3 bg-[#E8ECF0] p-2 sm:p-3">
      {navOpen && <div className="fixed inset-0 z-40 bg-navy/50 lg:hidden" onClick={() => setNavOpen(false)} />}

      {/* Sidebar (drawer en móvil) */}
      <aside
        onClick={() => setNavOpen(false)}
        className={cls(
          'flex w-[210px] shrink-0 flex-col overflow-hidden bg-navy transition-transform duration-200',
          'max-lg:fixed max-lg:inset-y-2 max-lg:left-2 max-lg:z-50 max-lg:rounded-xl',
          'lg:translate-x-0 lg:rounded-xl',
          navOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[120%]',
        )}
      >
        <div className="flex h-14 items-center px-4"><Logo size={20} className="text-white" /></div>

        <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-2">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">{group.label}</p>
              {group.items.map((item) => <NavItem key={item.to} {...item} />)}
            </div>
          ))}
        </nav>

        {/* Utilidades de cuenta */}
        <nav className="px-2 py-2">
          <NavItem to="/proveedor/configuracion" icon={Settings} label="Configuración" />
          <NavItem to="/proveedor/ayuda" icon={LifeBuoy} label="Ayuda" />
        </nav>

        {/* Chip de proveedor */}
        <div className="border-t border-white/[0.06] p-2">
          <div className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2.5 transition-colors hover:bg-white/6">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-navy">{PROVEEDOR.iniciales}</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-white">{PROVEEDOR.nombre}</p>
              <p className="text-[10px] text-white/35">{PROVEEDOR.rol}</p>
            </div>
            <button onClick={() => navigate('/login')} title="Cerrar sesión" className="text-white/25 transition-colors hover:text-white/70"><LogOut size={14} strokeWidth={1.8} /></button>
          </div>
        </div>
      </aside>

      {/* Contenido */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-white">
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-2.5">
            <button onClick={() => setNavOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden" aria-label="Abrir menú"><Menu size={20} /></button>
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-[15px] font-bold text-ink-strong">{header.title}</h1>
              {header.subtitle && <p className="truncate text-[11.5px] text-ink-muted">{header.subtitle}</p>}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden w-56 sm:block"><GlobalSearch items={SEARCH_ITEMS} placeholder="Buscar solicitudes…" /></div>
            <NotificationsBell items={NOTIF_PROV} verTodasTo="/proveedor/notificaciones" />
            <div className="hidden h-7 w-7 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-navy sm:flex">{PROVEEDOR.iniciales}</div>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-offwhite">
          <PageHeaderContext.Provider value={setHeader}>
            <div key={pathname} className="t-rise h-full">
              <Outlet />
            </div>
          </PageHeaderContext.Provider>
        </main>
      </div>
    </div>
  )
}
