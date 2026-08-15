import { useEffect, useState } from "react"
import PortalFormField from "../../components/portal/PortalFormField"
import PortalToast from "../../components/portal/PortalToast"

const LOCATIONS = [
  "Skardu",
  "Gilgit",
  "Rawalpindi",
  "Gahkuch",
  "Islamabad",
  "Hunza",
]

export default function PortalPassengers() {
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [vehicleNumber, setVehicleNumber] = useState("")
  const [passengers, setPassengers] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [toast, setToast] = useState(null)

  const BACKEND = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    document.title = "Passengers | KE Portal"
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!from || !to || !date || !vehicleNumber) {
      setToast({ message: "Please fill in all search fields.", type: "error" })
      return
    }
    if (from === to) {
      setToast({
        message: "Origin and destination cannot be the same.",
        type: "error",
      })
      return
    }

    setLoading(true)
    setSearched(false)
    setPassengers([])

    try {

      const convDat = new Date(date)
      const res = await fetch(`${BACKEND}/api/passengers/getPassengers?from=${from}&to=${to}&vehicleNo=${vehicleNumber}&transitDat=${convDat.toISOString()}`)
      const data = await res.json()
      console.log(data);

      if (data.success) {
        setPassengers(data.passenger || [])
      } else {
        setToast({
          message: data.message || "Failed to fetch passengers.",
          type: "error",
        })
      }
    } catch (err) {
      setToast({
        message: err.message,
        type: "error",
      })
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  const handleReset = () => {
    setFrom("")
    setTo("")
    setDate("")
    setVehicleNumber("")
    setPassengers([])
    setSearched(false)
  }

  const selectClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none"
  const inputClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none"

  return (
    <div className='px-lg md:px-xl py-xl mx-auto max-w-[1100px]'>
      {toast && (
        <PortalToast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Page Header */}
      <div className='mb-xl flex items-center gap-3'>
        <div className='bg-secondary flex h-11 w-11 items-center justify-center rounded-xl'>
          <span className='material-symbols-outlined text-on-secondary text-[24px]'>
            groups
          </span>
        </div>
        <div>
          <h1 className='text-headline-lg text-primary'>Bus Passengers</h1>
          <p className='text-body-md text-on-surface-variant'>
            Search and view passengers booked on a specific bus
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className='bg-surface-container-lowest card-shadow mb-xl rounded-2xl p-6 md:p-8'>
        <h2 className='text-headline-lg-mobile text-on-surface mb-lg flex items-center gap-2'>
          <span className='material-symbols-outlined text-secondary text-[22px]'>
            search
          </span>
          Search Passengers
        </h2>

        <form onSubmit={handleSearch} className='space-y-md'>
          {/* From / To Row */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            <PortalFormField label='From' icon='trip_origin' htmlFor='ps-from'>
              <select
                id='ps-from'
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className={selectClass}
              >
                <option value=''>Select Origin</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </PortalFormField>

            <PortalFormField label='To' icon='location_on' htmlFor='ps-to'>
              <select
                id='ps-to'
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className={selectClass}
              >
                <option value=''>Select Destination</option>
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </PortalFormField>
          </div>

          {/* Date / Vehicle Number Row */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            <PortalFormField
              label='Travel Date'
              icon='calendar_today'
              htmlFor='ps-date'
            >
              <input
                id='ps-date'
                type='date'
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => e.currentTarget.showPicker()}
                className={inputClass}
              />
            </PortalFormField>

            <PortalFormField
              label='Vehicle Number'
              icon='directions_bus'
              htmlFor='ps-vehicle'
            >
              <input
                id='ps-vehicle'
                type='text'
                placeholder='e.g. KE-201'
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className={inputClass}
              />
            </PortalFormField>
          </div>

          {/* Action Buttons */}
          <div className='flex flex-col gap-3 sm:flex-row'>
            <button
              type='submit'
              disabled={loading}
              className='bg-secondary text-on-secondary text-label-md hover:bg-secondary-container mt-md flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold shadow-md transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-8'
            >
              {loading ? (
                <>
                  <span className='material-symbols-outlined animate-spin text-[20px]'>
                    progress_activity
                  </span>
                  Searching…
                </>
              ) : (
                <>
                  <span className='material-symbols-outlined text-[20px]'>
                    search
                  </span>
                  Search Passengers
                </>
              )}
            </button>

            {searched && (
              <button
                type='button'
                onClick={handleReset}
                className='text-on-surface-variant hover:text-on-surface text-label-md mt-md flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-outline-variant py-3.5 font-medium transition-colors sm:w-auto sm:px-6'
              >
                <span className='material-symbols-outlined text-[20px]'>
                  restart_alt
                </span>
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Results Section */}
      {searched && (() => {
        // Flatten passengers into one entry per seat, sorted by seat number
        const seatEntries = passengers
          .flatMap((passenger) =>
            (passenger.seatsBooked || []).map((seat) => ({
              seat: Number(seat),
              name: passenger.name,
              cnicNo: passenger.cnicNo,
              phoneNo: passenger.phoneNo,
              _id: passenger._id,
            }))
          )
          .sort((a, b) => a.seat - b.seat)

        return (
        <div>
          {/* Results Header */}
          <div className='mb-md flex items-center justify-between'>
            <h2 className='text-headline-lg-mobile text-on-surface flex items-center gap-2'>
              <span className='material-symbols-outlined text-primary text-[22px]'>
                list
              </span>
              Passenger Register
            </h2>
            <div className='flex items-center gap-2'>
              <span className='text-label-md bg-primary-container text-on-primary-container rounded-lg px-3 py-1'>
                {vehicleNumber}
              </span>
              <span className='text-label-md text-on-surface-variant'>
                {from} → {to}
              </span>
              <span className='text-label-sm text-on-surface-variant/70'>
                · {new Date(date).toLocaleDateString("en-PK", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Results Count Badge */}
          <div className='mb-md flex flex-wrap gap-2'>
            <span
              className={`text-label-md inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-medium ${seatEntries.length > 0
                ? "bg-green-100 text-green-800"
                : "bg-surface-variant text-on-surface-variant"
                }`}
            >
              <span className='material-symbols-outlined text-[16px]'>
                {seatEntries.length > 0 ? "check_circle" : "info"}
              </span>
              {seatEntries.length} seat{seatEntries.length !== 1 ? "s" : ""}{" "}
              booked
            </span>
            {passengers.length > 0 && (
              <span className='text-label-md inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-800'>
                <span className='material-symbols-outlined text-[16px]'>
                  groups
                </span>
                {passengers.length} passenger{passengers.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading ? (
            <div className='py-xl flex flex-col items-center justify-center'>
              <span className='material-symbols-outlined text-outline-variant animate-spin text-[40px]'>
                progress_activity
              </span>
              <p className='text-body-md text-on-surface-variant mt-3'>
                Fetching passengers…
              </p>
            </div>
          ) : seatEntries.length === 0 ? (
            <div className='bg-surface-container-lowest card-shadow py-xl flex flex-col items-center justify-center rounded-2xl'>
              <span className='material-symbols-outlined text-outline-variant text-[56px]'>
                person_off
              </span>
              <p className='text-body-md text-on-surface-variant mt-3'>
                No passengers found for this bus on the selected date.
              </p>
              <p className='text-label-sm text-on-surface-variant/60 mt-1'>
                Check the vehicle number, route, and date and try again.
              </p>
            </div>
          ) : (
            <div className='bg-surface-container-lowest card-shadow overflow-x-auto rounded-2xl'>
              <table className='portal-table w-full min-w-[700px] text-left'>
                <thead>
                  <tr className='border-outline-variant/40 border-b'>
                    <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                      Seat No.
                    </th>
                    <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                      Passenger Name
                    </th>
                    <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                      CNIC
                    </th>
                    <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seatEntries.map((entry, idx) => (
                    <tr
                      key={`${entry._id}-seat-${entry.seat}`}
                      className={`border-outline-variant/20 hover:bg-primary-fixed/5 border-b transition-colors last:border-b-0 ${idx % 2 === 0
                        ? "bg-surface-container-lowest"
                        : "bg-surface-container-low/40"
                        }`}
                    >
                      <td className='text-body-md text-on-surface px-5 py-3.5 font-semibold'>
                        {entry.seat}
                      </td>
                      <td className='px-5 py-3.5'>
                        <div className='flex items-center gap-2'>
                          <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
                            <span className='material-symbols-outlined text-primary text-[16px]'>
                              person
                            </span>
                          </div>
                          <span className='text-body-md text-on-surface font-semibold'>
                            {entry.name}
                          </span>
                        </div>
                      </td>
                      <td className='text-body-md text-on-surface px-5 py-3.5 font-mono'>
                        {entry.cnicNo || "—"}
                      </td>
                      <td className='px-5 py-3.5'>
                        <div className='flex items-center gap-1.5'>
                          <span className='material-symbols-outlined text-on-surface-variant text-[16px]'>
                            phone
                          </span>
                          <span className='text-body-md text-on-surface'>
                            {entry.phoneNo || "—"}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Summary Footer */}
              <div className='border-outline-variant/40 flex items-center justify-between border-t px-5 py-3'>
                <span className='text-label-sm text-on-surface-variant'>
                  Total Passengers: {passengers.length}
                </span>
                <span className='text-label-sm text-on-surface-variant'>
                  Total Seats Booked: {seatEntries.length}
                </span>
              </div>
            </div>
          )}
        </div>
        )
      })()}
    </div>
  )
}
