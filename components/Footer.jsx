const footerLinks = [
  { href: "/services", label: "Schedules" },
  { href: "/services", label: "Cargo Services" },
  { href: "/services", label: "Private Tours" },
  { href: "/offices", label: "Terminal Locations" },
  { href: "/about", label: "Contact Support" },
  { href: "/about", label: "Privacy Policy" },
]

export default function Footer() {
  return (
    <footer className='bg-primary mt-auto w-full'>
      <div className='gap-xl px-lg md:px-xl py-xl text-on-primary mx-auto grid max-w-[1280px] grid-cols-1 md:grid-cols-4'>
        {/* Brand */}
        <div className='md:col-span-1'>
          <span className='text-headline-lg text-surface-bright mb-4 block'>
            Karakoram Express
          </span>
          <p className='text-body-md text-surface-variant mt-2'>
            Precision transit across Northern Pakistan. Connecting communities
            with safety and reliability.
          </p>
        </div>

        {/* Links */}
        <div className='gap-lg flex flex-wrap md:col-span-3 md:justify-end'>
          <div className='flex min-w-[150px] flex-col gap-2'>
            {footerLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-label-sm text-surface-variant hover:text-secondary-fixed-dim transition-transform duration-200 hover:translate-x-1'
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className='flex min-w-[150px] flex-col gap-2'>
            {footerLinks.slice(3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className='text-label-sm text-surface-variant hover:text-secondary-fixed-dim transition-transform duration-200 hover:translate-x-1'
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright + Portal Link */}
        <div className='border-outline-variant/20 col-span-1 mt-8 flex flex-col items-center justify-between gap-4 border-t pt-8 md:col-span-4 md:flex-row'>
          <p className='text-body-md text-surface-variant'>
            © 2024 Karakoram Express. Precision transit across Northern
            Pakistan.
          </p>
          <a
            href='/portal'
            className='text-label-sm text-surface-variant/60 hover:text-secondary-fixed-dim flex items-center gap-1.5 transition-colors'
          >
            <span className='material-symbols-outlined text-[16px]'>
              admin_panel_settings
            </span>
            Management Portal
          </a>
        </div>
      </div>
    </footer>
  )
}
