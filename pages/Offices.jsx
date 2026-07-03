import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"

export default function Offices() {
  useEffect(() => {
    document.title = "Offices | Karakoram Express"
  })
  return (
    <>
      <Navbar />
      <main className='flex-1'>
        {/* Header Section */}
        <section className='px-lg md:px-xl py-xl mx-auto max-w-[1280px]'>
          <h1 className='text-display-lg text-primary'>Terminal Location</h1>
          <p className='text-body-lg text-on-surface-variant mt-md max-w-2xl'>
            Find our operational hubs across Northern Pakistan. Each terminal is
            strategically positioned to connect communities along the Karakoram
            Highway corridor.
          </p>
        </section>

        {/* Bento Grid Section */}
        <section className='px-lg md:px-xl pb-xl mx-auto max-w-[1280px]'>
          <div className='gap-gutter grid grid-cols-1 md:grid-cols-12'>
            {/* Rawalpindi Hub — col-span-8 */}
            <div className='bg-surface-container-lowest border-outline-variant hover:card-shadow overflow-hidden rounded-lg border transition-shadow duration-300 md:col-span-8'>
              <div className='flex h-full flex-col md:flex-row'>
                {/* Image Left */}
                <div className='relative min-h-[240px] md:w-1/2'>
                  <div
                    className='absolute inset-0 bg-cover bg-center'
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBvA9AeeV4l_wTBb4554ne3KSzUMPvia9cwm7s79Qi6FyXVUnihizg8Sf6CaNGuLS2hQNEqH_KUHWHkRikkkIvDz5--Kq0-9LdfVsH8nxRhdA0O5dZT5VVnehVc__AuzjNtb9Q5ClAcimorQE3j1WOiwJP-4iveBIczAGMaEv2Ui8wxYnFD2DCcql2O3BmG2o6W74WVjo37vVt0lxmLrddMQj6rO2xAfQ1WKe49FqDd5kTm-4hfu803_9WGw5k3lUPWgMeD5CpJL8wH')",
                    }}
                  />
                </div>

                {/* Details Right */}
                <div className='p-lg gap-md flex flex-col justify-center md:w-1/2'>
                  <div className='gap-sm flex items-center'>
                    <h2 className='text-headline-lg text-primary'>
                      Rawalpindi Hub
                    </h2>
                    <span className='text-label-sm px-sm py-xs rounded bg-[#1b5e20] text-white'>
                      Main Terminal
                    </span>
                  </div>

                  <div className='gap-sm text-body-md text-on-surface-variant flex flex-col'>
                    <div className='gap-sm flex items-start'>
                      <span className='material-symbols-outlined fill text-primary shrink-0'>
                        location_on
                      </span>
                      <span>Pirwadhai General Bus Stand, Rawalpindi</span>
                    </div>
                    <div className='gap-sm flex items-center'>
                      <span className='material-symbols-outlined fill text-primary shrink-0'>
                        schedule
                      </span>
                      <span>Open 24/7</span>
                    </div>
                    <div className='gap-sm flex items-center'>
                      <span className='material-symbols-outlined fill text-primary shrink-0'>
                        call
                      </span>
                      <span>+92 51 111 222 333 / +92 51 444 555 666</span>
                    </div>
                  </div>

                  <a
                    href='https://maps.google.com'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='gap-sm bg-primary text-on-primary text-label-md px-md py-sm hover:bg-primary-container mt-sm inline-flex w-fit items-center rounded font-bold transition-colors'
                  >
                    <span className='material-symbols-outlined fill text-[18px]'>
                      map
                    </span>
                    View on Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Skardu Terminal — col-span-4 */}
            <div className='bg-surface-container-lowest border-outline-variant hover:card-shadow p-lg gap-md flex flex-col justify-between rounded-lg border transition-shadow duration-300 md:col-span-4'>
              <div className='gap-md flex flex-col'>
                <h2 className='text-headline-lg text-primary'>
                  Skardu Terminal
                </h2>

                <div className='gap-sm text-body-md text-on-surface-variant flex flex-col'>
                  <div className='gap-sm flex items-start'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      location_on
                    </span>
                    <span>Main Bazaar Transit Point, Skardu</span>
                  </div>
                  <div className='gap-sm flex items-center'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      schedule
                    </span>
                    <span>06:00 – 22:00</span>
                  </div>
                  <div className='gap-sm flex items-center'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      call
                    </span>
                    <span>+92 58 450 1234</span>
                  </div>
                </div>
              </div>

              <a
                href='https://maps.google.com'
                target='_blank'
                rel='noopener noreferrer'
                className='gap-sm border-outline text-primary text-label-md px-md py-sm hover:bg-surface-container inline-flex w-fit items-center rounded border font-bold transition-colors'
              >
                <span className='material-symbols-outlined fill text-[18px]'>
                  map
                </span>
                Directions
              </a>
            </div>

            {/* Gilgit Terminal — col-span-4 */}
            <div className='bg-surface-container-lowest border-outline-variant hover:card-shadow p-lg gap-md flex flex-col justify-between rounded-lg border transition-shadow duration-300 md:col-span-4'>
              <div className='gap-md flex flex-col'>
                <h2 className='text-headline-lg text-primary'>
                  Gilgit Terminal
                </h2>

                <div className='gap-sm text-body-md text-on-surface-variant flex flex-col'>
                  <div className='gap-sm flex items-start'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      location_on
                    </span>
                    <span>Jutial Bus Stand, Gilgit</span>
                  </div>
                  <div className='gap-sm flex items-center'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      schedule
                    </span>
                    <span>05:00 – 23:00</span>
                  </div>
                  <div className='gap-sm flex items-center'>
                    <span className='material-symbols-outlined fill text-primary shrink-0'>
                      call
                    </span>
                    <span>+92 58 920 5678</span>
                  </div>
                </div>
              </div>

              <a
                href='https://maps.google.com'
                target='_blank'
                rel='noopener noreferrer'
                className='gap-sm border-outline text-primary text-label-md px-md py-sm hover:bg-surface-container inline-flex w-fit items-center rounded border font-bold transition-colors'
              >
                <span className='material-symbols-outlined fill text-[18px]'>
                  map
                </span>
                Directions
              </a>
            </div>

            {/* Route Map — col-span-8 */}
            <div className='border-outline-variant relative min-h-[320px] overflow-hidden rounded-lg border md:col-span-8'>
              <div
                className='absolute inset-0 bg-cover bg-center'
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAG2gs6SgGDf6c42HmZTj_mN4-GYcYT9gm3F6AkZJ18VXsYhhvyb7yaTZxV-_gz9LFoeR26hNVu1SxSOk_wI0u8ksWvX1z2FhQ301s67he3kJWumFoPZmBgnXur1udCwtUuO8cYNStun9ko-7zEISp3IciQLWr8uh_GEeqoNe5sZnMTursXmspMvAyCQ2MXXTXzhDAOnmDLi-IocEcbX7idiZtu9JE3aHNlzmelTRgvB5TA6JmcUh2NckD9sofR1rgzVZ1Qn19mV3sk')",
                }}
              />
              <div className='absolute inset-0 flex items-center justify-center'>
                <div className='bg-surface/90 px-lg py-md rounded-lg text-center backdrop-blur-sm'>
                  <p className='text-headline-lg text-primary'>
                    Interactive Route Map
                  </p>
                  <p className='text-body-md text-on-surface-variant mt-xs'>
                    Showing active connections across N-35
                  </p>
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
