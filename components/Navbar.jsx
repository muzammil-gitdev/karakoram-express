import { NavLink } from "react-router-dom"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/aboutus", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/offices", label: "Offices" },
]

export default function Navbar() {
  return (
    <nav className='bg-surface/90 border-outline-variant/30 sticky top-0 z-50 w-full border-b shadow-sm backdrop-blur-md transition-all duration-300'>
      <div className='px-lg md:px-xl py-md mx-auto flex w-full max-w-9/12 items-center justify-between'>
        {/* Logo */}
        <a
          href='/'
          className='text-headline-lg-mobile md:text-headline-lg text-primary font-extrabold tracking-tight transition-opacity hover:opacity-80'
        >
          Karakoram Express
        </a>

        {/* Desktop Navigation */}
        <div className='gap-lg hidden items-center md:flex'>
          {navLinks.map((link) => {
            return (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  isActive
                    ? "text-secondary border-secondary text-label-md scale-95 border-b-2 pb-1 font-bold duration-150 ease-in-out"
                    : "text-on-surface-variant hover:text-primary text-label-md hover:bg-surface-container-low rounded px-3 py-2 transition-all duration-300"
                }
              >
                {link.label}
              </NavLink>
            )
          })}
        </div>

        {/* Book Now Button + Mobile Menu */}
        <div className='gap-md flex items-center'>
          <a
            href='/booking'
            className='bg-secondary text-on-secondary text-label-md px-md hover:bg-secondary-container rounded py-2 font-bold shadow-sm transition-colors active:scale-95'
          >
            Book Now
          </a>
          <button className='text-primary p-1 md:hidden'>
            <span className='material-symbols-outlined'>menu</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
