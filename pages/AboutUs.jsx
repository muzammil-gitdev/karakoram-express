import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"

export default function AboutUs() {
  useEffect(() => {
    document.title = "About Us | Karakoram Express"
  }, [])
  return (
    <>
      <Navbar />

      <main className='flex flex-1 flex-col'>
        {/* ===== HERO SECTION ===== */}
        <section className='relative h-[614px] w-full overflow-hidden'>
          {/* Hero Image with mask */}
          <div className='hero-mask absolute inset-0'>
            <img
              src='https://lh3.googleusercontent.com/aida-public/AB6AXuC9YSkO2yJizxsR9KdKMoBOEraHhPYOPKW9aQ3qsG3Rb_hR-4Lt199ZpALqv0xv9e2G1OVlEkiSPxRRXWD-6Yt59Mz7_vEuj1rNlpXFkl2ojOaAP3uLlJ6U7J_M5s4ls3UKST0GSIPonfe-PaTqyrKeroDeb8k29yh0HNBMthVIut6LPuUb0XkArQ7aOSyohIHdpefe7GUACROHkzLzUqDOnIeGUw6GREnQkhksc-bVY0O6Zk4dtBVRUUIUYD58BB17BFh6qrO20G5u'
              alt='Majestic Karakoram mountains'
              className='h-full w-full object-cover'
            />
          </div>

          {/* Dark Overlay */}
          <div className='bg-primary/40 absolute inset-0 mix-blend-multiply' />

          {/* Hero Content */}
          <div className='px-lg md:px-xl relative z-10 flex h-full flex-col items-center justify-center text-center'>
            <h1 className='text-display-lg text-on-primary max-w-[800px]'>
              Precision Transit Across Northern Pakistan
            </h1>
            <p className='text-body-lg text-primary-fixed mt-lg max-w-[600px]'>
              For over a decade, we&apos;ve connected communities across the
              world&apos;s most challenging terrain with unwavering safety and
              reliability.
            </p>
          </div>
        </section>

        {/* ===== OUR STORY & MISSION ===== */}
        <section className='bg-surface-container-lowest relative z-20 -mt-12 w-full'>
          <div className='px-lg md:px-xl py-xl mx-auto max-w-[1280px]'>
            <div className='gap-gutter grid grid-cols-1 md:grid-cols-12'>
              {/* Our Story Card — 7 cols */}
              <div className='bg-surface p-lg md:p-xl card-shadow rounded-2xl md:col-span-7'>
                <div className='gap-md mb-lg flex items-center'>
                  <span className='material-symbols-outlined text-primary text-[32px]'>
                    history_edu
                  </span>
                  <h2 className='text-headline-lg text-primary'>Our Story</h2>
                </div>
                <div className='space-y-md text-body-md text-on-surface-variant'>
                  <p>
                    Founded in the rugged valleys of Gilgit-Baltistan, Karakoram
                    Express was born from a simple need: reliable, safe passage
                    through some of the most breathtaking — and treacherous —
                    roads on earth.
                  </p>
                  <p>
                    What started as a single coaster bus navigating the
                    Karakoram Highway has grown into Northern Pakistan&apos;s
                    most trusted transit network, serving dozens of routes
                    connecting Islamabad, Gilgit, Skardu, Hunza, and beyond.
                  </p>
                  <p>
                    Our drivers are local experts, many with decades of
                    experience navigating hairpin turns at 4,000+ meters
                    elevation. We don&apos;t just operate buses — we provide
                    lifelines for communities separated by immense geography.
                  </p>
                </div>
              </div>

              {/* Right Side — 5 cols: Mission + Vision */}
              <div className='gap-gutter flex flex-col md:col-span-5'>
                {/* Mission Card */}
                <div className='bg-primary-container p-lg md:p-xl flex-1 rounded-2xl'>
                  <h3 className='text-headline-lg-mobile text-primary-fixed mb-md'>
                    Our Mission
                  </h3>
                  <p className='text-body-md text-on-primary-container'>
                    To deliver safe, dependable, and dignified transit across
                    Northern Pakistan&apos;s most demanding corridors — bridging
                    communities and enabling opportunity through world-class
                    mountain transport.
                  </p>
                </div>

                {/* Vision Card */}
                <div className='bg-surface-container-low p-lg md:p-xl flex-1 rounded-2xl'>
                  <h3 className='text-headline-lg-mobile text-primary mb-md'>
                    Our Vision
                  </h3>
                  <p className='text-body-md text-on-surface-variant'>
                    A connected Northern Pakistan where geography is no longer a
                    barrier — where every community has access to reliable,
                    modern transit that respects both people and landscape.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FLEET BENTO GRID ===== */}
        <section className='bg-surface-container-lowest w-full'>
          <div className='px-lg md:px-xl py-xl mx-auto max-w-[1280px]'>
            <h2 className='text-headline-lg text-primary mb-xl'>
              The Fleet Engineered for Altitude
            </h2>

            <div className='gap-gutter grid auto-rows-[220px] grid-cols-1 md:grid-cols-3'>
              {/* Luxury Cruisers — large card */}
              <div className='group relative overflow-hidden rounded-2xl md:col-span-2 md:row-span-2'>
                <img
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuCfX4DdkKHdyoTSn1-Pt_w5am2mMIpgYr_A0XrhD5GILg7KChb0J7ZVF3lJ_ZRbfFg-Tj8MX4XldhRUhvdWgW1WHlsHPtCk1YjP9t_UhkOKBj88Xjod83B5zzAGGXmaO7aPDDxuz9fCBqFN7OkZlDh9aXnbwFprRIbc9q8DUOhyPQqHlfUl_2U5SY_FrNd7_Lz2cB7OQHnN55WlqhgTjqjeNNN56GR3R5VKi30_WzN56i8xIIl8PXj5CT0AYw6MpJTiaU8XpVhYmw49'
                  alt='Luxury cruiser bus in Karakoram mountains'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='from-primary/80 via-primary/20 absolute inset-0 bg-linear-to-t to-transparent' />
                <div className='p-lg md:p-xl absolute bottom-0 left-0'>
                  <span className='text-label-sm text-secondary-fixed tracking-wider uppercase'>
                    Flagship
                  </span>
                  <h3 className='text-headline-lg text-on-primary mt-xs'>
                    Luxury Cruisers
                  </h3>
                  <p className='text-body-md text-primary-fixed mt-sm max-w-[400px]'>
                    Premium 40-seat coaches with climate control, reclining
                    seats, and onboard entertainment for the long-haul routes.
                  </p>
                </div>
              </div>

              {/* Executive Vans */}
              <div className='group relative overflow-hidden rounded-2xl'>
                <img
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuC97y1YJMmMymbIn7HzyO27NgrguqgPsRXfAYGaaWOlOK_D1lei4MeVlG8Xd4Kcg7LIjeusgJHqI-urSt_VoCO0Utzb0xYo8q9h3CETDXrESfYRKIqY4rjqurxuDKWMalXQWBfcs17KNbUYplmS2qukHVzbZUoLrBUmUGGIrcHU9ZQhaDkRhvCN7RIHoteLpNl-lmLu4bfy-DBotXik0AkfemFzgj4iGtTi-wq0k4qTliQLALr0N2xuJYRn8TZC0crXB_FsRA5ys2UM'
                  alt='Executive van for mountain routes'
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
                <div className='from-primary/80 via-primary/20 absolute inset-0 bg-linear-to-t to-transparent' />
                <div className='p-lg absolute bottom-0 left-0'>
                  <span className='text-label-sm text-secondary-fixed tracking-wider uppercase'>
                    Agile
                  </span>
                  <h3 className='text-headline-lg-mobile text-on-primary mt-xs'>
                    Executive Vans
                  </h3>
                </div>
              </div>

              {/* Standard Coasters — icon-based, no image */}
              <div className='bg-surface-container-low p-lg flex flex-col justify-between rounded-2xl'>
                <div>
                  <span className='material-symbols-outlined text-primary text-[40px]'>
                    directions_bus
                  </span>
                  <h3 className='text-headline-lg-mobile text-primary mt-md'>
                    Standard Coasters
                  </h3>
                </div>
                <p className='text-body-md text-on-surface-variant'>
                  Reliable 22-seat coasters purpose-built for narrow mountain
                  roads and high-altitude passes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== SAFETY & CERTIFICATIONS ===== */}
        <section className='bg-surface w-full'>
          <div className='px-lg md:px-xl py-xl mx-auto max-w-[1280px]'>
            <div className='gap-xl grid grid-cols-1 md:grid-cols-2'>
              {/* Left — Content */}
              <div className='flex flex-col justify-center'>
                <span className='text-label-md text-secondary mb-sm tracking-wider uppercase'>
                  Safety First
                </span>
                <h2 className='text-headline-lg text-primary mb-lg'>
                  Uncompromising Safety Standards
                </h2>
                <ul className='space-y-lg'>
                  <li className='gap-md flex items-start'>
                    <span className='material-symbols-outlined text-secondary mt-0.5 shrink-0 text-[28px]'>
                      verified_user
                    </span>
                    <div>
                      <h4 className='text-body-lg text-primary font-bold'>
                        Certified Drivers
                      </h4>
                      <p className='text-body-md text-on-surface-variant mt-xs'>
                        Every driver undergoes rigorous altitude-specific
                        training and holds advanced mountain driving
                        certifications.
                      </p>
                    </div>
                  </li>
                  <li className='gap-md flex items-start'>
                    <span className='material-symbols-outlined text-secondary mt-0.5 shrink-0 text-[28px]'>
                      settings
                    </span>
                    <div>
                      <h4 className='text-body-lg text-primary font-bold'>
                        Rigorous Maintenance
                      </h4>
                      <p className='text-body-md text-on-surface-variant mt-xs'>
                        Fleet-wide inspections before every departure. Engine,
                        brakes, and suspension systems are checked to exacting
                        standards.
                      </p>
                    </div>
                  </li>
                  <li className='gap-md flex items-start'>
                    <span className='material-symbols-outlined text-secondary mt-0.5 shrink-0 text-[28px]'>
                      satellite_alt
                    </span>
                    <div>
                      <h4 className='text-body-lg text-primary font-bold'>
                        Live GPS Tracking
                      </h4>
                      <p className='text-body-md text-on-surface-variant mt-xs'>
                        Real-time satellite tracking on every vehicle, with 24/7
                        monitoring from our operations center.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Right — Stats Grid */}
              <div className='gap-gutter grid grid-cols-2'>
                <div className='bg-primary-container p-lg flex flex-col items-center justify-center rounded-2xl text-center'>
                  <span className='text-display-lg text-primary-fixed'>
                    15+
                  </span>
                  <span className='text-label-md text-on-primary-container mt-sm'>
                    Years Experience
                  </span>
                </div>
                <div className='bg-surface-container-low p-lg flex flex-col items-center justify-center rounded-2xl text-center'>
                  <span className='text-display-lg text-primary'>0</span>
                  <span className='text-label-md text-on-surface-variant mt-sm'>
                    Major Incidents
                  </span>
                </div>
                <div className='bg-surface-container-low p-lg flex flex-col items-center justify-center rounded-2xl text-center'>
                  <span className='text-display-lg text-primary'>1M+</span>
                  <span className='text-label-md text-on-surface-variant mt-sm'>
                    Passengers Served
                  </span>
                </div>
                <div className='bg-primary-container p-lg flex flex-col items-center justify-center rounded-2xl text-center'>
                  <span className='material-symbols-outlined text-secondary-fixed text-[40px]'>
                    workspace_premium
                  </span>
                  <span className='text-label-md text-on-primary-container mt-sm'>
                    ISO 9001 Certified
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
