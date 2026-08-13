import { NavLink, Outlet, replace, useNavigate } from "react-router-dom"
import { useState } from "react"

const sidebarLinks = [
  { to: "/portal", label: "Dashboard", icon: "dashboard", end: true },
  {
    to: "/portal/featured-routes",
    label: "Featured Routes",
    icon: "star",
    end: false,
  },
  {
    to: "/portal/transit-routes",
    label: "Transit Routes",
    icon: "directions_bus",
    end: false,
  },
  {
    to: "/portal/passengers",
    label: "Passengers",
    icon: "groups",
    end: false,
  },
]

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 z-40 bg-black/40 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`portal-sidebar bg-primary fixed z-50 flex h-full w-[260px] flex-col transition-transform duration-300 md:relative md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Brand */}
        <div className='border-on-primary/10 flex items-center gap-3 border-b px-6 py-5'>
          <div className='bg-secondary flex h-10 w-10 items-center justify-center rounded-xl'>
            <span className='material-symbols-outlined text-on-secondary text-[22px]'>
              admin_panel_settings
            </span>
          </div>
          <div>
            <h1 className='text-body-lg text-on-primary font-bold'>
              KE Portal
            </h1>
            <p className='text-label-sm text-on-primary/50'>Admin Console</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex flex-1 flex-col gap-1 px-3 py-4'>
          <span className='text-label-sm text-on-primary/40 mb-2 px-3 tracking-widest uppercase'>
            Management
          </span>
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${isActive
                  ? "bg-secondary text-on-secondary shadow-sm"
                  : "text-on-primary/70 hover:bg-primary-container hover:text-on-primary"
                }`
              }
            >
              <span className='material-symbols-outlined text-[20px]'>
                {link.icon}
              </span>
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className='border-on-primary/10 border-t px-3 py-4'>
          <button
            onClick={() => navigate('/portal/login', { replace: true })}
            className='text-on-primary/60 hover:text-secondary-fixed-dim flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors cursor-pointer'
          >
            <span className='material-symbols-outlined text-[20px]'>
              logout
            </span>
            Logout
          </button>
        </div>
      </aside >

      {/* Main Content */}
      < div className='flex flex-1 flex-col overflow-hidden' >
        {/* Top Bar */}
        < header className='bg-surface-container-lowest border-outline-variant/30 flex items-center gap-4 border-b px-6 py-3.5' >
          <button
            className='text-primary cursor-pointer md:hidden'
            onClick={() => setSidebarOpen(true)}
          >
            <span className='material-symbols-outlined'>menu</span>
          </button>
          <div className='flex items-center gap-2'>
            <span className='material-symbols-outlined text-secondary text-[20px]'>
              shield_person
            </span>
            <span className='text-label-md text-on-surface-variant'>
              Admin Portal
            </span>
          </div>
        </header >

        {/* Scrollable Page Content */}
        < main className='bg-surface-container-low flex-1 overflow-y-auto' >
          <Outlet />
        </main >
      </div >
    </div >
  )
}
