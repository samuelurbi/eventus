import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'

// Auth
import Splash from './pages/Splash'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import RegisterOrganizador from './pages/auth/RegisterOrganizador'
import RegisterProveedor from './pages/auth/RegisterProveedor'
import ForgotPassword from './pages/auth/ForgotPassword'

// Onboarding
import Tipo from './pages/onboarding/Tipo'
import Eventos from './pages/onboarding/Eventos'
import Ubicacion from './pages/onboarding/Ubicacion'
import Presupuesto from './pages/onboarding/Presupuesto'
import Servicios from './pages/onboarding/Servicios'
import Listo from './pages/onboarding/Listo'
import { ProvCategoria, ProvServicios, ProvCobertura, ProvDocumentos, ProvListo } from './pages/onboarding/Proveedor'

// Layouts
import DashboardLayout from './layouts/DashboardLayout'
import ProviderLayout from './layouts/ProviderLayout'

// Compartido
import Notificaciones from './pages/Notificaciones'
import Rsvp from './pages/Rsvp'
import { NOTIF_ORG, NOTIF_PROV } from './components/NotificationsBell'

// Proveedor
import ProvDashboard from './pages/proveedor/Dashboard'
import ProvSolicitudes from './pages/proveedor/Solicitudes'
import ProvSolicitudDetalle from './pages/proveedor/SolicitudDetalle'
import ProvPresupuestos from './pages/proveedor/Presupuestos'
import ProvMensajes from './pages/proveedor/Mensajes'
import ProvMiPerfil from './pages/proveedor/MiPerfil'
import ProvHistorial from './pages/proveedor/Historial'
import ProvSuscripcion from './pages/proveedor/Suscripcion'
import ProvConfirmar from './pages/proveedor/ConfirmarSuscripcion'
import ProvConfiguracion from './pages/proveedor/Configuracion'
import ProvAyuda from './pages/proveedor/Ayuda'

// Organizador
import Home from './pages/organizador/Home'
import MisEventos from './pages/organizador/MisEventos'
import CrearEvento from './pages/organizador/CrearEvento'
import EventoDetalle from './pages/organizador/EventoDetalle'
import Proveedores from './pages/organizador/Proveedores'
import ProveedorDetalle from './pages/organizador/ProveedorDetalle'
import PresupuestoOrg from './pages/organizador/Presupuesto'
import Documentos from './pages/organizador/Documentos'
import Mensajes from './pages/organizador/Mensajes'
import Configuracion from './pages/organizador/Configuracion'
import Referidos from './pages/organizador/Referidos'
import Ayuda from './pages/organizador/Ayuda'
import Calendario from './pages/organizador/Calendario'
import Pagos from './pages/organizador/Pagos'

// Dev
import DevNav from './components/DevNav'
import NotFound from './pages/NotFound'

function Stub({ name }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <span className="rounded-full bg-mint/20 px-3 py-1 text-xs font-semibold text-navy">Próximamente</span>
      <h1 className="text-xl font-semibold text-ink-strong">{name}</h1>
      <p className="max-w-xs text-sm text-ink-muted">Esta pantalla se construirá en la siguiente fase.</p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/registro/organizador" element={<RegisterOrganizador />} />
        <Route path="/registro/proveedor" element={<RegisterProveedor />} />
        <Route path="/recuperar" element={<ForgotPassword />} />

        {/* Onboarding */}
        <Route path="/onboarding" element={<Navigate to="/onboarding/tipo" replace />} />
        <Route path="/onboarding/tipo" element={<Tipo />} />
        <Route path="/onboarding/eventos" element={<Eventos />} />
        <Route path="/onboarding/ubicacion" element={<Ubicacion />} />
        <Route path="/onboarding/presupuesto" element={<Presupuesto />} />
        <Route path="/onboarding/servicios" element={<Servicios />} />
        <Route path="/onboarding/listo" element={<Listo />} />

        {/* Onboarding Proveedor */}
        <Route path="/onboarding-proveedor" element={<Navigate to="/onboarding-proveedor/categoria" replace />} />
        <Route path="/onboarding-proveedor/categoria" element={<ProvCategoria />} />
        <Route path="/onboarding-proveedor/servicios" element={<ProvServicios />} />
        <Route path="/onboarding-proveedor/cobertura" element={<ProvCobertura />} />
        <Route path="/onboarding-proveedor/documentos" element={<ProvDocumentos />} />
        <Route path="/onboarding-proveedor/listo" element={<ProvListo />} />

        {/* RSVP público del invitado */}
        <Route path="/rsvp/:id" element={<Rsvp />} />

        {/* Dashboard Organizador */}
        <Route path="/organizador" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="eventos" element={<MisEventos />} />
          <Route path="eventos/nuevo" element={<CrearEvento />} />
          <Route path="eventos/:id" element={<EventoDetalle />} />
          <Route path="proveedores" element={<Proveedores />} />
          <Route path="proveedores/:id" element={<ProveedorDetalle />} />
          <Route path="presupuesto" element={<PresupuestoOrg />} />
          <Route path="documentos" element={<Documentos />} />
          <Route path="mensajes" element={<Mensajes />} />
          <Route path="referidos" element={<Referidos />} />
          <Route path="calendario" element={<Calendario />} />
          <Route path="pagos" element={<Pagos />} />
          <Route path="notificaciones" element={<Notificaciones items={NOTIF_ORG} />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="ayuda" element={<Ayuda />} />
        </Route>

        {/* Dashboard Proveedor */}
        <Route path="/proveedor" element={<ProviderLayout />}>
          <Route index element={<ProvDashboard />} />
          <Route path="solicitudes" element={<ProvSolicitudes />} />
          <Route path="solicitudes/:id" element={<ProvSolicitudDetalle />} />
          <Route path="presupuestos" element={<ProvPresupuestos />} />
          <Route path="mensajes" element={<ProvMensajes />} />
          <Route path="perfil" element={<ProvMiPerfil />} />
          <Route path="historial" element={<ProvHistorial />} />
          <Route path="suscripcion" element={<ProvSuscripcion />} />
          <Route path="suscripcion/confirmar" element={<ProvConfirmar />} />
          <Route path="notificaciones" element={<Notificaciones items={NOTIF_PROV} />} />
          <Route path="configuracion" element={<ProvConfiguracion />} />
          <Route path="ayuda" element={<ProvAyuda />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Panel de dev — siempre visible */}
      <DevNav />
    </BrowserRouter>
  )
}
