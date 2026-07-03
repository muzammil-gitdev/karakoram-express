import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useEffect } from "react"

const serviceCards = [
  {
    title: "Executive Sleeper",
    description:
      "Our flagship service offering the ultimate in overnight travel comfort. Fully flat beds, premium dining, and dedicated cabin crew ensure you arrive refreshed.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD3WbxhvvQD1clLtuF-bTuc164Uwx-ukic3CLjZPHUVO692SLe5rHr1hl_xzzuHRHz5rJnb5NwmIITCnoQ5qrHtw8IV97dCj1iNqpssQMaaepBWqr37s_SwDWt1pWI8rWfDWbncfkzAAUceM1XBPzLJjWU_4v1xh9Zubx-_Ao8r_rQDZ110wJ7h65H6fwgbM5L8v1HCja_XiL1c5qoph2HJDu6fxucAV9uhLRsXXY4duAP_2L4wYIY-qOzuqfbetl73suy0-bVxr0ST",
    features: [
      { icon: "airline_seat_flat", label: "180° Flatbed Seats" },
      { icon: "restaurant", label: "Premium Meals Included" },
    ],
  },
  {
    title: "Business Premium",
    description:
      "Enhanced comfort for the discerning traveller. Extra legroom, priority boarding, and complimentary hot beverages make every journey a pleasure.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDtnrDfhQbVV9dA4kI26sMyM9jNmBFi_W9HVpdt-V-8lV4hYAmP2ePuBVXjayjPLrLODkBNEw89PgIEboxxd4vnt-t4ceOpiedcQcIHpydBpZjozrPw-CfnMQ-lAGt6CRyPhNIM7o1tEGda5qp6GaGKcndzZEZ3FTcWBwW34_1DUtuNWr6suzCdNv2LX816V-06Hw290KR65eTmUKVoIxWekeTqEHXfmzGBrJVSHR8HIecCIePRNMbA6SihkQlXMiuh-97miFljthlQ",
    features: [
      { icon: "airline_seat_recline_extra", label: "Extra Legroom" },
      { icon: "coffee", label: "Hot Beverages" },
    ],
  },
  {
    title: "Standard Plus",
    description:
      "Reliable and comfortable travel at an accessible price. Generous recline, onboard charging, and our signature punctuality come standard.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvI_jZE8Qr6z-LAUBynw7wuQ33etkPT3LsneNsoUiwQ7cdpxgfLQ1a3eFrVFcfnxgs5u89aTt1Bvs0zOSyJMJ1g6SVbM_9tF5tUj5wnZUsM9DCkU0rpSi2z0iiigT7VaU5lD2xvUXNsUdOZphhRQlJG9TImbTNVL8fF0b0CXFqZzVEpKsVergblNs4t-jM7zW--AypKu3RQRZ0cBIlYeIBUvovTBmvjGJb__rSmRS8Uf8l0mo8pNPcvFt312TgkJUdY1ibQMFXdyJk",
    features: [
      { icon: "airline_seat_recline_normal", label: "Comfortable Recline" },
      { icon: "usb", label: "Charging Ports" },
    ],
  },
]

const amenities = [
  {
    icon: "wifi",
    title: "Free Wi-Fi",
    description:
      "Stay connected with complimentary high-speed internet on all premium routes.",
  },
  {
    icon: "movie",
    title: "Entertainment",
    description:
      "Personal screens with curated films, documentaries, and music playlists.",
  },
  {
    icon: "local_cafe",
    title: "Refreshments",
    description:
      "Complimentary tea, coffee, and water served throughout your journey.",
  },
  {
    icon: "ac_unit",
    title: "Climate Control",
    description:
      "Individually adjustable air conditioning for your personal comfort zone.",
  },
]

export default function Services() {
  useEffect(() => {
    document.title = "Services | Karakoram Express"
  })
  return (
    <>
      <main className='flex-1'>
        {/* ====== HERO SECTION ====== */}
        <section className='bg-background py-xl relative overflow-hidden md:py-[96px]'>
          {/* Subtle background image */}
          <div
            className='absolute inset-0 bg-cover bg-center opacity-10'
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuDHFFQcHpUi58uPYQF7Ek-d5f162-46MzfKir36davBm1Zgmt8UNq5VCTXpDO4jjRMQtBGjZtQggNBnuFbGEDJ6zBZWM2QSa_8WkBy7DaM1rbTCQ--afrIjBG9dAjbwspNVb86UfhVyEgL5Awnb2p31_yu40EpwG5DXz8w44JTHl7fBENpJMYllMoW9gQ8I-JKllUqmKxb29dma9X06EKqPrnft-wrZwdFpX1ZPCzBfLlLgM9WZLlxP75_QmhXXVnQamLPwuZ-GOwA9)",
            }}
            aria-hidden='true'
          />
          <div className='px-lg md:px-xl relative z-10 mx-auto max-w-[1280px] text-center'>
            <h1 className='text-display-lg text-primary mb-md'>Our Services</h1>
            <p className='text-body-lg text-on-surface-variant mx-auto max-w-2xl'>
              From executive sleeper coaches to reliable standard transit,
              Karakoram Express delivers precision-engineered journeys across
              Northern Pakistan. Every service class is built around safety,
              punctuality, and passenger comfort.
            </p>
          </div>
        </section>

        {/* ====== PASSENGER TRANSIT SECTION ====== */}
        <section className='bg-background py-xl md:py-[80px]'>
          <div className='px-lg md:px-xl mx-auto max-w-[1280px]'>
            {/* Section Header */}
            <div className='gap-sm mb-sm flex items-center'>
              <span
                className='material-symbols-outlined text-secondary'
                style={{ fontSize: 28 }}
              >
                directions_bus
              </span>
              <span className='text-label-md text-secondary tracking-widest uppercase'>
                Passenger Transit
              </span>
            </div>
            <h2 className='text-headline-lg text-primary mb-xl'>
              Choose Your Class of Travel
            </h2>

            {/* Service Cards Grid */}
            <div className='gap-lg grid grid-cols-1 md:grid-cols-3'>
              {serviceCards.map((card) => (
                <div
                  key={card.title}
                  className='bg-surface border-outline-variant/30 card-shadow flex flex-col overflow-hidden rounded-xl border transition-transform duration-300 hover:-translate-y-1'
                >
                  {/* Card Image */}
                  <div className='relative h-48 overflow-hidden'>
                    <img
                      src={card.image}
                      alt={card.title}
                      className='w-full object-fill object-bottom'
                    />
                    <div className='mountain-overlay absolute inset-0' />
                  </div>

                  {/* Card Content */}
                  <div className='p-lg flex flex-1 flex-col'>
                    <h3 className='text-headline-lg-mobile text-primary mb-sm'>
                      {card.title}
                    </h3>
                    <p className='text-body-md text-on-surface-variant mb-lg flex-1'>
                      {card.description}
                    </p>

                    {/* Features */}
                    <ul className='gap-sm flex flex-col'>
                      {card.features.map((feature) => (
                        <li
                          key={feature.label}
                          className='gap-sm flex items-center'
                        >
                          <span
                            className='material-symbols-outlined text-secondary'
                            style={{ fontSize: 20 }}
                          >
                            {feature.icon}
                          </span>
                          <span className='text-label-md text-on-surface'>
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ====== AMENITIES & LUGGAGE SECTION ====== */}
        <section className='bg-surface-dim/30 py-xl md:py-[80px]'>
          <div className='px-lg md:px-xl mx-auto max-w-[1280px]'>
            <div className='gap-lg grid grid-cols-1 md:grid-cols-12'>
              {/* On-Board Amenities — 7 cols */}
              <div className='bg-surface-container-low p-lg md:p-xl rounded-xl md:col-span-7'>
                <div className='gap-sm mb-sm flex items-center'>
                  <span
                    className='material-symbols-outlined text-secondary'
                    style={{ fontSize: 24 }}
                  >
                    star
                  </span>
                  <span className='text-label-md text-secondary tracking-widest uppercase'>
                    On-Board
                  </span>
                </div>
                <h2 className='text-headline-lg text-primary mb-lg'>
                  On-Board Amenities
                </h2>

                <div className='gap-lg grid grid-cols-1 sm:grid-cols-2'>
                  {amenities.map((item) => (
                    <div key={item.title} className='gap-md flex'>
                      <div className='bg-primary-container flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg'>
                        <span
                          className='material-symbols-outlined text-on-primary-container'
                          style={{ fontSize: 20 }}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className='text-label-md text-on-surface mb-xs font-bold'>
                          {item.title}
                        </h4>
                        <p className='text-body-md text-on-surface-variant'>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Luggage Policy — 5 cols */}
              <div className='bg-primary p-lg md:p-xl relative overflow-hidden rounded-xl md:col-span-5'>
                <h2 className='text-headline-lg text-on-primary mb-sm'>
                  Travel Light, Travel Right
                </h2>
                <p className='text-body-md text-on-primary/80 mb-lg'>
                  Our generous luggage allowances mean you can pack everything
                  you need for your journey through the mountains.
                </p>

                {/* Luggage Details */}
                <div className='gap-md relative z-10 flex flex-col'>
                  <div className='bg-primary-container/20 p-md rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div className='gap-sm flex items-center'>
                        <span
                          className='material-symbols-outlined text-on-primary'
                          style={{ fontSize: 20 }}
                        >
                          work
                        </span>
                        <span className='text-label-md text-on-primary'>
                          Checked Baggage
                        </span>
                      </div>
                      <span className='text-headline-lg-mobile text-on-primary font-bold'>
                        30kg
                      </span>
                    </div>
                  </div>

                  <div className='bg-primary-container/20 p-md rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div className='gap-sm flex items-center'>
                        <span
                          className='material-symbols-outlined text-on-primary'
                          style={{ fontSize: 20 }}
                        >
                          backpack
                        </span>
                        <span className='text-label-md text-on-primary'>
                          Carry-on
                        </span>
                      </div>
                      <span className='text-headline-lg-mobile text-on-primary font-bold'>
                        7kg
                      </span>
                    </div>
                  </div>
                </div>

                {/* Large decorative luggage icon */}
                <span
                  className='material-symbols-outlined text-on-primary pointer-events-none absolute right-4 bottom-4 opacity-20'
                  style={{ fontSize: 120 }}
                  aria-hidden='true'
                >
                  luggage
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
