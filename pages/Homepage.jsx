import { useEffect } from "react"
import FeaturedRoutesCard from "../components/FeaturedRoutesCard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

function Homepage() {
  useEffect(() => {
    document.title = "Karakoram Express"
  })
  return (
    <>
      <Navbar />

      <main className='flex-1'>
        {/* ===== HERO SECTION ===== */}
        <section className='relative flex min-h-[600px] flex-col items-center'>
          {/* Background Image */}
          <div
            className='absolute inset-0 bg-cover bg-center bg-no-repeat'
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBGC2mvhObxyInjkqUJz9IOvR9ZbHCO9fSe9PqoHzA1RIK0QXaBxpNkfoj5uChjfwRzRG8AflPN_xtejEOZwmcF6vFJrrE36uXVJ_XR2RqCo6e5k9EHhwHdWzkuprJg1jUxPLklJbHw7O-Ec0qOsLYmYz0RAEoD_BB-3BWHPhAhdEzsKmLrnTG5NFc4Kr-DOvVIqzVoEN215_kvXaq3tJiRZykV51T_LR2YRURuxfQKr-51_pdw7siZHotZwdqKTXtm0ecFPe29jSfA')",
            }}
          />
          {/* Gradient Overlay */}
          <div className='mountain-overlay absolute inset-0' />

          {/* Hero Content */}
          <div className='px-lg py-xl relative z-10 flex w-full max-w-[1280px] flex-col items-center text-center'>
            <div className='mt-12 mb-8 max-w-2xl'>
              <h1 className='text-display-lg text-on-primary-fixed mb-4'>
                Precision Transit Across the Roof of the World
              </h1>
              <p className='text-body-lg text-on-surface-variant'>
                Dependable, safe, and comfortable journeys through Northern
                Pakistan&apos;s majestic landscapes.
              </p>
            </div>

            {/* Booking Widget */}
            <div className='bg-surface-container-lowest p-lg booking-widget-shadow w-full max-w-3xl rounded-2xl'>
              <form className='gap-md flex flex-col items-end md:flex-row'>
                {/* From */}
                <div className='w-full flex-1'>
                  <label className='text-label-sm text-on-surface-variant mb-1 block text-left tracking-wider uppercase'>
                    From
                  </label>
                  <select className='px-md border-outline-variant bg-surface-container-low text-on-surface text-body-md focus:border-primary h-12 w-full rounded-lg border focus:outline-none'>
                    <option value='rawalpindi'>Rawalpindi</option>
                    <option value='skardu'>Skardu</option>
                    <option value='gilgit'>Gilgit</option>
                  </select>
                </div>

                {/* To */}
                <div className='w-full flex-1'>
                  <label className='text-label-sm text-on-surface-variant mb-1 block text-left tracking-wider uppercase'>
                    To
                  </label>
                  <select className='px-md border-outline-variant bg-surface-container-low text-on-surface text-body-md focus:border-primary h-12 w-full rounded-lg border focus:outline-none'>
                    <option value='skardu'>Skardu</option>
                    <option value='rawalpindi'>Rawalpindi</option>
                    <option value='gilgit'>Gilgit</option>
                  </select>
                </div>

                {/* Date */}
                <div className='w-full flex-1'>
                  <label className='text-label-sm text-on-surface-variant mb-1 block text-left tracking-wider uppercase'>
                    Date
                  </label>
                  <input
                    type='date'
                    className='px-md border-outline-variant bg-surface-container-low text-on-surface text-body-md focus:border-primary h-12 w-full rounded-lg border focus:outline-none'
                  />
                </div>

                {/* Search Button */}
                <a
                  href='/booking'
                  className='px-xl bg-secondary text-on-secondary text-label-md flex h-12 w-full items-center justify-center rounded-lg font-medium whitespace-nowrap transition-opacity hover:opacity-90 md:w-auto'
                >
                  Search Buses
                </a>
              </form>
            </div>
          </div>
        </section>

        {/* ===== FEATURED ROUTES SECTION ===== */}
        <section className='px-lg py-xl flex w-full justify-center'>
          <div className='w-full max-w-[1280px]'>
            <h2 className='text-headline-lg text-on-surface mb-lg'>
              Featured Routes
            </h2>

            <div className='gap-lg grid grid-cols-1 md:grid-cols-2'>
              {/* Route Card 1 — Rawalpindi → Skardu */}
              <div className='p-lg group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl'>
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105'
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuApO1M0nnZtLvu28d2kuBd-xLI8-Kf89gmwxMlZKmJ0X8Hs4UhNz0fxhuxMtotBZvt00zHMIyisfM0ozUNeh1QuKf4MlA7eCJGFDKEZvlPfnHrRjl4Sh-Vx3qilTl7JTsus2mQJ2uJCMn-_4AjP3L_wEu-I2k9nawJj0UU7o8uPeLsbceng3UnxhM6OF5K0n0hB3RfCe2Rbm9akk5m6Qb6uUGFfQWSxQhLKm_8g6CvB382nudb4kHaKvKTtA_MgmD0UgRJ5-NkiNY9A')",
                  }}
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />
                <div className='relative z-10'>
                  <h3 className='text-headline-lg-mobile text-on-primary mb-1'>
                    Rawalpindi &harr; Skardu
                  </h3>
                  <div className='gap-md text-on-primary/80 flex items-center'>
                    <span className='text-label-md gap-xs flex items-center'>
                      <span className='material-symbols-outlined text-[18px]'>
                        schedule
                      </span>
                      18 hrs
                    </span>
                    <span className='text-label-md'>Rs. 8,500</span>
                  </div>
                </div>
              </div>
              <FeaturedRoutesCard />

              {/* Route Card 2 — Skardu → Gilgit */}
              <div className='p-lg group relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-2xl'>
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105'
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCuegeugQC1PQJP_8nkqVe7rg-KVGYfBFOhFFj0UiGOHqfDn1WQmJyPFpWVZ7BeOToWYqpirSplxrslqTUGke0ntaq0tR-3iST8QPF_YHfto_YPNrDEg8GCXwBi9W0-22M3vknjIYRe51aC_xuvGVsZXVJ7uT9MtxQdREdMr67Fl_vYo23UWl2MxezVbuZ2EpEj2HEmmvKc4uYPmLiRyJ_ez8pyUCuPtw2KmsDzsdyrzfN6cigS-_FW9ebFloWAPLa3sj_eqqxgd8Qs')",
                  }}
                />
                <div className='absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent' />
                <div className='relative z-10'>
                  <h3 className='text-headline-lg-mobile text-on-primary mb-1'>
                    Skardu &harr; Gilgit
                  </h3>
                  <div className='gap-md text-on-primary/80 flex items-center'>
                    <span className='text-label-md gap-xs flex items-center'>
                      <span className='material-symbols-outlined text-[18px]'>
                        schedule
                      </span>
                      5 hrs
                    </span>
                    <span className='text-label-md'>Rs. 3,200</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== THE KARAKORAM STANDARD (WHY CHOOSE US) ===== */}
        <section className='px-lg py-xl bg-surface-container-low flex w-full justify-center'>
          <div className='w-full max-w-[1280px]'>
            <div className='mb-xl text-center'>
              <h2 className='text-headline-lg text-on-surface mb-2'>
                The Karakoram Standard
              </h2>
              <p className='text-body-lg text-on-surface-variant'>
                Built on pillars of safety, precision, and passenger comfort.
              </p>
            </div>

            <div className='gap-lg grid grid-cols-1 md:grid-cols-3'>
              {/* Feature 1 — Safety */}
              <div className='p-lg bg-surface-container-lowest card-shadow flex flex-col items-center rounded-2xl text-center'>
                <div className='bg-primary-fixed mb-md flex h-14 w-14 items-center justify-center rounded-full'>
                  <span className='material-symbols-outlined text-on-primary-fixed text-[28px]'>
                    verified_user
                  </span>
                </div>
                <h3 className='text-headline-lg-mobile text-on-surface mb-2'>
                  Verified Safety
                </h3>
                <p className='text-body-md text-on-surface-variant'>
                  Every vehicle undergoes rigorous multi-point inspections.
                  Certified drivers with decades of mountain road experience.
                </p>
              </div>

              {/* Feature 2 — Punctuality */}
              <div className='p-lg bg-surface-container-lowest card-shadow flex flex-col items-center rounded-2xl text-center'>
                <div className='bg-secondary-fixed mb-md flex h-14 w-14 items-center justify-center rounded-full'>
                  <span className='material-symbols-outlined text-on-secondary-fixed text-[28px]'>
                    schedule
                  </span>
                </div>
                <h3 className='text-headline-lg-mobile text-on-surface mb-2'>
                  Precision Timing
                </h3>
                <p className='text-body-md text-on-surface-variant'>
                  GPS-tracked fleet with real-time updates. Our 96% on-time
                  record speaks for itself.
                </p>
              </div>

              {/* Feature 3 — Comfort */}
              <div className='p-lg bg-surface-container-lowest card-shadow flex flex-col items-center rounded-2xl text-center'>
                <div className='bg-tertiary-fixed mb-md flex h-14 w-14 items-center justify-center rounded-full'>
                  <span className='material-symbols-outlined text-on-tertiary-fixed text-[28px]'>
                    airline_seat_recline_extra
                  </span>
                </div>
                <h3 className='text-headline-lg-mobile text-on-surface mb-2'>
                  Superior Comfort
                </h3>
                <p className='text-body-md text-on-surface-variant'>
                  Reclining seats, climate control, and onboard amenities
                  designed for long-haul mountain journeys.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Homepage
