import { useEffect } from "react"
import { NavLink } from "react-router-dom"

const quickActions = [
  {
    to: "/portal/featured-routes",
    icon: "star",
    title: "Featured Routes",
    description: "Add and manage the highlighted travel routes displayed on the homepage.",
    color: "bg-secondary",
    iconColor: "text-on-secondary",
  },
  {
    to: "/portal/transit-routes",
    icon: "directions_bus",
    title: "Transit Routes",
    description: "Create and manage scheduled transit routes with vehicle and fare details.",
    color: "bg-primary",
    iconColor: "text-on-primary",
  },
]

export default function PortalDashboard() {
  useEffect(() => {
    document.title = "Dashboard | KE Portal"
  }, [])

  return (
    <div className='px-lg md:px-xl py-xl mx-auto max-w-[960px]'>
      {/* Welcome Header */}
      <div className='mb-xl'>
        <h1 className='text-display-lg text-primary mb-2'>
          Welcome back
        </h1>
        <p className='text-body-lg text-on-surface-variant'>
          Manage Karakoram Express data from one place. Choose an action below to get started.
        </p>
      </div>

      {/* Quick Action Cards */}
      <div className='gap-lg grid grid-cols-1 md:grid-cols-2'>
        {quickActions.map((action) => (
          <NavLink
            key={action.to}
            to={action.to}
            className='bg-surface-container-lowest card-shadow hover:card-shadow-lg group flex flex-col rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1'
          >
            <div
              className={`${action.color} mb-md flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110`}
            >
              <span
                className={`material-symbols-outlined ${action.iconColor} text-[28px]`}
              >
                {action.icon}
              </span>
            </div>
            <h2 className='text-headline-lg-mobile text-on-surface mb-1'>
              {action.title}
            </h2>
            <p className='text-body-md text-on-surface-variant mb-4 flex-1'>
              {action.description}
            </p>
            <div className='text-secondary flex items-center gap-1 text-sm font-bold'>
              Manage
              <span className='material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:translate-x-1'>
                arrow_forward
              </span>
            </div>
          </NavLink>
        ))}
      </div>

      {/* Info Card */}
      <div className='bg-primary-container/30 border-primary-container mt-xl flex items-start gap-4 rounded-xl border p-5'>
        <span className='material-symbols-outlined text-primary text-[24px] shrink-0'>
          info
        </span>
        <div>
          <p className='text-body-md text-on-surface font-semibold'>
            Data is synced with the live website
          </p>
          <p className='text-body-md text-on-surface-variant mt-1'>
            Routes you add here will appear on the public-facing Karakoram Express website in real-time through the backend API.
          </p>
        </div>
      </div>
    </div>
  )
}
