import { useState } from 'react'
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, CalendarDays, Users, Gift, LifeBuoy,
  MessageSquare, Settings, LogOut, Plus, Menu, CalendarRange, Wallet,
} from 'lucide-react'
import Logo from '../components/Logo'
import { cls } from '../components/ui'
import { NotificationsBell, NOTIF_ORG } from '../components/NotificationsBell'
import { GlobalSearch } from '../components/GlobalSearch'
import { EVENTOS, PROVEEDORES } from '../data/mock'
import { PageHeaderContext } from './pageHeader'

const SEARCH_ITEMS = [
  ...EVENTOS.map((e) => ({ group: 'Eventos', label: e.nombre, sub: e.lugar, to: `/organizador/eventos/${e.id}`, Icon: CalendarDays })),
  ...PROVEEDORES.map((p) => ({ group: 'Proveedores', label: p.nombre, sub: p.categoria, to: `/organizador/proveedores/${p.id}`, Icon: Users })),
  { group: 'Secciones', label: 'Dashboard', to: '/organizador', Icon: LayoutDashboard },
  { group: 'Secciones', label: 'Mis Eventos', to: '/organizador/eventos', Icon: CalendarDays },
  { group: 'Secciones', label: 'Calendario', to: '/organizador/calendario', Icon: CalendarRange },
  { group: 'Secciones', label: 'Marketplace de proveedores', to: '/organizador/proveedores', Icon: Users },
  { group: 'Secciones', label: 'Mensajes', to: '/organizador/mensajes', Icon: MessageSquare },
  { group: 'Secciones', label: 'Pagos', to: '/organizador/pagos', Icon: Wallet },
  { group: 'Secciones', label: 'Referidos', to: '/organizador/referidos', Icon: Gift },
  { group: 'Secciones', label: 'Configuración', to: '/organizador/configuracion', Icon: Settings },
  { group: 'Secciones', label: 'Ayuda', to: '/organizador/ayuda', Icon: LifeBuoy },
]

const NAV_GROUPS = [
  {
    label: 'Gestión',
    items: [
      { to: '/organizador', icon: LayoutDashboard, label: 'Dashboard', end: true },
      { to: '/organizador/eventos', icon: CalendarDays, label: 'Mis Eventos' },
      { to: '/organizador/calendario', icon: CalendarRange, label: 'Calendario' },
      { to: '/organizador/proveedores', icon: Users, label: 'Proveedores' },
      { to: '/organizador/pagos', icon: Wallet, label: 'Pagos' },
    ],
  },
  {
    label: 'Comunicación',
    items: [
      { to: '/organizador/mensajes', icon: MessageSquare, label: 'Mensajes', badge: 3 },
    ],
  },
  {
    label: 'Crecimiento',
    items: [
      { to: '/organizador/referidos', icon: Gift, label: 'Referidos' },
    ],
  },
]

// Utilidades de cuenta — ancladas al fondo del sidebar
const BOTTOM_ITEMS = [
  { to: '/organizador/configuracion', icon: Settings, label: 'Configuración' },
  { to: '/organizador/ayuda', icon: LifeBuoy, label: 'Ayuda' },
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
          {badge && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-mint px-1 text-[10px] font-bold text-navy">
              {badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [header, setHeader] = useState({ title: '', subtitle: '' })
  const [navOpen, setNavOpen] = useState(false)

  return (
    // Lienzo gris — el padding aquí es lo que hace "flotar" las cajas
    <div className="flex h-screen overflow-hidden gap-3 bg-[#E8ECF0] p-2 sm:p-3">

      {/* Backdrop del drawer en móvil */}
      {navOpen && <div className="fixed inset-0 z-40 bg-navy/50 lg:hidden" onClick={() => setNavOpen(false)} />}

      {/* ── Sidebar flotante (drawer en móvil) ───── */}
      <aside
        onClick={() => setNavOpen(false)}
        className={cls(
          'flex w-[210px] shrink-0 flex-col overflow-hidden bg-navy transition-transform duration-200',
          'max-lg:fixed max-lg:inset-y-2 max-lg:left-2 max-lg:z-50 max-lg:rounded-xl',
          'lg:translate-x-0 lg:rounded-xl',
          navOpen ? 'max-lg:translate-x-0' : 'max-lg:-translate-x-[120%]',
        )}
      >
        {/* Logo */}
        <div className="flex h-14 items-center px-4">
          <Logo size={20} className="text-white" />
        </div>

        {/* Nav groups */}
        <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.label}>
              <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-white/25">
                {group.label}
              </p>
              {group.items.map((item) => (
                <NavItem key={item.to} {...item} />
              ))}
            </div>
          ))}
        </nav>

        {/* Utilidades de cuenta — ancladas al fondo */}
        <nav className="px-2 py-2">
          {BOTTOM_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* User chip — al fondo, separado del resto */}
        <div className="border-t border-white/[0.06] p-2">
          <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 hover:bg-white/6 cursor-pointer transition-colors">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 text-[11px] font-bold text-white">
              SU
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-white">Samuel Urbina</p>
              <p className="text-[10px] text-white/35">Organizador</p>
            </div>
            <button
              onClick={() => navigate('/login')}
              title="Cerrar sesión"
              className="text-white/25 hover:text-white/70 transition-colors"
            >
              <LogOut size={14} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Contenido flotante ──────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl bg-white">
        {/* Topbar */}
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-gray-200 px-4 sm:px-6">
          {/* Hamburguesa (móvil) + título + info contextual (lo publica cada página) */}
          <div className="flex min-w-0 items-center gap-2.5">
            <button onClick={() => setNavOpen(true)} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-muted transition-colors hover:bg-gray-100 lg:hidden" aria-label="Abrir menú">
              <Menu size={20} />
            </button>
            <div className="min-w-0 leading-tight">
              <h1 className="truncate text-[15px] font-bold text-ink-strong">{header.title}</h1>
              {header.subtitle && <p className="truncate text-[11.5px] text-ink-muted">{header.subtitle}</p>}
            </div>
          </div>

          {/* Search + actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <div className="hidden w-56 sm:block"><GlobalSearch items={SEARCH_ITEMS} placeholder="Buscar eventos, proveedores…" /></div>

            <NotificationsBell items={NOTIF_ORG} verTodasTo="/organizador/notificaciones" />

            <div className="hidden h-7 w-7 items-center justify-center rounded-full bg-navy text-[11px] font-bold text-white sm:flex">
              SU
            </div>

            <button
              onClick={() => navigate('/organizador/eventos/nuevo')}
              className="flex items-center gap-1.5 rounded-lg bg-mint px-2.5 py-1.5 text-[13px] font-semibold text-navy transition-colors hover:bg-[#aee584] sm:px-3.5"
            >
              <Plus size={14} strokeWidth={2.5} />
              <span className="hidden sm:inline">Nuevo evento</span>
            </button>
          </div>
        </header>

        {/* Page content */}
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
