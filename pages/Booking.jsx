import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import PortalToast from "../components/portal/PortalToast"

const STEPS = [
  { id: 1, label: "Route" },
  { id: 2, label: "Select" },
  { id: 3, label: "Seats" },
  { id: 4, label: "Details" },
]

const ORIGINS = ["Rawalpindi", "Islamabad", "Skardu", "Gilgit"]
const DESTINATIONS = ["Skardu", "Gilgit", "Rawalpindi", "Hunza"]

const DATE_PILLS = ["Today", "Tomorrow", "Mon", "More"]

const MOCK_BUSES = [
  {
    id: "bus-1",
    name: "KE-201 Deluxe",
    departure: "06:00 AM",
    arrival: "06:30 PM",
    duration: "12h 30m",
    busClass: "Deluxe",
    price: 4500,
    seats: 18,
  },
  {
    id: "bus-2",
    name: "KE-305 Executive",
    departure: "08:30 AM",
    arrival: "08:00 PM",
    duration: "11h 30m",
    busClass: "Executive",
    price: 6200,
    seats: 12,
  },
  {
    id: "bus-3",
    name: "KE-112 Standard",
    departure: "10:00 AM",
    arrival: "11:00 PM",
    duration: "13h 00m",
    busClass: "Standard",
    price: 3200,
    seats: 24,
  },
]

// Generate initial seat map: 8 rows x 4 cols
// 'available', 'booked', or 'selected'

const generateSeatMap = () => {
  return Array.from({ length: 32 }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: i + 1,
    status: "available"
  }))
}
export default function Booking() {
  const [currentStep, setCurrentStep] = useState(1)
  const [busData, setBusData] = useState([]);
  const [origin, setOrigin] = useState("Rawalpindi")
  const [destination, setDestination] = useState("Skardu")
  const [selectedDate, setSelectedDate] = useState("Today")
  const [selectedBus, setSelectedBus] = useState(null)
  const [seats, setSeats] = useState(generateSeatMap)
  const [selectedSeats, setSelectedSeats] = useState([])
  const [passengerName, setPassengerName] = useState("")
  const [passengerPhone, setPassengerPhone] = useState("")
  const [passengerEmail, setPassengerEmail] = useState("")
  const [passengerCnic, setPassengerCnic] = useState("")
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [loadingBus, setLoadingBus] = useState(false);
  const [toast, setToast] = useState(null);
  const today = new Date(Date.now());
  const minDate = today.toISOString().split("T")[0];

  const handleSwap = () => {
    setOrigin(destination)
    setDestination(origin)
  }

  const handleFindBuses = async () => {
    try {
      setLoadingBus(true);
      const startOfDay = new Date(selectedDate);
      startOfDay.setUTCHours(0, 0, 0, 0);
      const endOfDay = new Date(selectedDate);
      endOfDay.setUTCHours(23, 59, 59, 999);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/transit?from=${origin}&to=${destination}&start=${startOfDay.toISOString()}&end=${endOfDay.toISOString()}`);
      const payload = await response.json()
      setBusData(payload.data);
      // console.log(busData)
      if (!payload.success) throw new Error("Something went wrong")
      if (payload.data.length === 0) {
        throw new Error("No buses available for the selected route and date")
      }
      setCurrentStep(2)
    } catch (error) {
      setToast({ message: error.message, type: "error" });
    } finally {
      setLoadingBus(false);
    }

  }

  const handleSelectBus = (bus) => {
    setSelectedBus(bus)
    setCurrentStep(3)
  }

  const handleSeatClick = (seatIndex) => {
    const seat = seats[seatIndex]

    const updatedSeats = [...seats]
    if (seat.status === "available") {
      updatedSeats[seatIndex] = { ...seat, status: "selected" }
      setSelectedSeats([...selectedSeats, seat.number])
    } else {
      updatedSeats[seatIndex] = { ...seat, status: "available" }
      setSelectedSeats(selectedSeats.filter((n) => n !== seat.number))
    }
    setSeats(updatedSeats)
  }

  const handleProceedToDetails = () => {
    if (selectedSeats.length > 0) {
      setCurrentStep(4)
    }
  }

  const handleConfirmBooking = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!passengerName) {
      setToast({ message: "Please enter your name", type: "error" });
      return
    }
    if (!passengerPhone || passengerPhone.length !== 11) {
      setToast({ message: "Enter Correct Mobile Number", type: "error" });
      return
    }
    if (!passengerEmail || !emailRegex.test(passengerEmail)) {
      setToast({ message: "Please enter your valid email", type: "error" });
      return
    }
    if (!passengerCnic || passengerCnic.length !== 13) {
      setToast({ message: "Please enter your CNIC", type: "error" });
      return
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/booking`, {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify({
          vehicleNo: selectedBus.vehicleNumber,
          name: passengerName,
          cnicNo: passengerCnic,
          phoneNo: passengerPhone,
          transitDat: selectedBus.departure,
          seatsBooked: selectedSeats,
          ticketPrice: selectedBus.ticketPrice,
          noOfSeatsBooked: selectedSeats.length,
          totalAmount: selectedSeats.length * selectedBus.ticketPrice,
          to: destination,
          from: origin
        })
      })
      const data = await res.json()
      if (!data.success) {
        setToast({ message: data.err, type: "error" })
        throw new Error(data.err)
      }
      setBookingConfirmed(true)
    } catch (error) {
      console.log(error)
    }


  }

  const handleStepClick = (stepId) => {
    if (stepId < currentStep) {
      setCurrentStep(stepId)
    }
  }

  const totalPrice = selectedBus ? selectedBus.price * selectedSeats.length : 0

  return (
    <>
      <main className='flex-1'>
        {/* Hero Background */}
        {toast && <PortalToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <div className='relative h-[300px] overflow-hidden'>
          <div
            className='absolute inset-0 bg-cover bg-center opacity-20'
            style={{
              backgroundImage:
                "url(https://lh3.googleusercontent.com/aida-public/AB6AXuAzaL7JG44h_7PbwJoqgg-fKspUC6gAqImsufxubEYEkXBCMDSERsmJymXDBojeXFwgMF6rGmaGgoGsPh5LggjBYT_kHSKIZwOnH1Tj4lhH8pFKWbo3G6bYjNzZ48NmbkF18JZUgRIn3Ilz7kVq-BplVUY0c6tAlg6x4hIOURD5iCKsA4DrTgMI-4uvVQqmdI-PGZZ1ueWc7y4ebr09Gymfpn5bdOOaq-o8tYm7h4O8DCCGTWcbKM0E5G53EpT5LSmGgQDcoQEzjtIj)",
            }}
          />
          <div className='mountain-overlay absolute inset-0' />
          <div className='px-md relative z-10 flex h-full flex-col items-center justify-center text-center'>
            <h1
              id='booking-heading'
              className='text-display-lg text-primary mb-2'
            >
              Book Your Journey
            </h1>
            <p
              id='booking-subtitle'
              className='text-body-lg text-on-surface-variant'
            >
              Precision transit across Northern Pakistan
            </p>
          </div>
        </div>

        {/* Content */}
        <div className='px-lg md:px-xl pb-xl relative z-20 mx-auto -mt-16 max-w-[1280px]'>
          {/* Stepper */}
          <div
            id='booking-stepper'
            className='mb-xl flex items-center justify-center gap-2 md:gap-4'
          >
            {STEPS.map((step, index) => (
              <div key={step.id} className='flex items-center gap-2 md:gap-4'>
                <button
                  disabled={bookingConfirmed}
                  id={`step-${step.id}`}
                  onClick={() => handleStepClick(step.id)}
                  className={`flex cursor-pointer items-center gap-2 transition-all duration-200 ${step.id <= currentStep ? "opacity-100" : "opacity-50"
                    } ${bookingConfirmed ? "cursor-not-allowed" : ""}`}
                >
                  <span
                    className={`text-label-md flex h-9 w-9 items-center justify-center rounded-full font-bold transition-colors duration-200 ${step.id === currentStep
                      ? "bg-primary text-on-primary"
                      : step.id < currentStep
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-surface-variant border-outline-variant text-on-surface-variant border-2"
                      }`}
                  >
                    {step.id < currentStep ? (
                      <span className='material-symbols-outlined text-[18px]'>
                        check
                      </span>
                    ) : (
                      step.id
                    )}
                  </span>
                  <span
                    className={`text-label-md hidden md:inline ${step.id === currentStep
                      ? "text-primary font-bold"
                      : "text-on-surface-variant"
                      }`}
                  >
                    {step.label}
                  </span>
                </button>
                {index < STEPS.length - 1 && (
                  <div
                    className={`h-0.5 w-8 transition-colors duration-200 md:w-16 ${step.id < currentStep
                      ? "bg-primary-container"
                      : "bg-outline-variant"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Grid: Main + Sidebar */}
          <div className='gap-lg grid grid-cols-1 lg:grid-cols-12'>
            {/* Main Area (8 cols) */}
            <div className='lg:col-span-8'>
              {/* Step 1: Route & Date */}
              {currentStep === 1 && (
                <div
                  id='step-route'
                  className='bg-surface-container-lowest card-shadow p-lg md:p-xl rounded-xl'
                >
                  <h2 className='text-headline-lg text-primary mb-lg'>
                    Choose Your Route
                  </h2>

                  {/* Origin / Destination */}
                  <div className='gap-md mb-lg relative flex flex-col md:flex-row'>
                    {/* Origin */}
                    <div className='flex-1'>
                      <label
                        htmlFor='origin-select'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        Origin
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          trip_origin
                        </span>
                        <select
                          id='origin-select'
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        >
                          {ORIGINS.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Swap Button */}
                    <button
                      id='swap-button'
                      onClick={handleSwap}
                      className='bg-primary text-on-primary hover:bg-primary-container absolute top-1/2 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full shadow-md transition-colors md:relative md:top-auto md:left-auto md:mb-1 md:translate-x-0 md:translate-y-0 md:self-end'
                    >
                      <span className='material-symbols-outlined text-[20px]'>
                        swap_horiz
                      </span>
                    </button>

                    {/* Destination */}
                    <div className='flex-1'>
                      <label
                        htmlFor='destination-select'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        Destination
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          location_on
                        </span>
                        <select
                          id='destination-select'
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        >
                          {DESTINATIONS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Date Pills */}
                  <div className='mb-lg'>
                    <label className='text-label-md text-on-surface-variant mb-3 block'>
                      Travel Date
                    </label>
                    <div className='w-full flex-1'>
                      <label className='text-label-sm text-on-surface-variant mb-1 block text-left tracking-wider uppercase'>
                        Date
                      </label>
                      <input
                        type='date'
                        min={minDate}
                        className='px-md border-outline-variant bg-surface-container-low text-on-surface text-body-md focus:border-primary h-12 w-full rounded-lg border focus:outline-none'
                        onChange={(e) => { setSelectedDate(e.target.value) }}
                      />
                    </div>
                  </div>

                  {/* Find Buses Button */}
                  <button
                    id='find-buses-btn'
                    disabled={loadingBus}
                    onClick={handleFindBuses}
                    className={`bg-secondary text-on-secondary text-label-md px-lg hover:bg-secondary-container flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 font-bold shadow-md transition-colors active:scale-[0.98] md:w-auto ${loadingBus ? "opacity-50" : ""
                      }`}
                  >
                    {loadingBus ? "Loading..." : "Find Buses"}
                    <span className='material-symbols-outlined text-[20px]'>
                      arrow_forward
                    </span>
                  </button>
                </div>
              )}

              {/* Step 2: Select Bus */}
              {currentStep === 2 && (
                <div id='step-select-bus' className='space-y-md'>
                  <div className='mb-md flex items-center justify-between'>
                    <h2 className='text-headline-lg text-primary'>
                      Available Buses
                    </h2>
                    <span className='text-label-md text-on-surface-variant'>
                      {origin} → {destination} · {selectedDate}
                    </span>
                  </div>

                  {busData?.map((bus) => (
                    <div
                      key={bus._id}
                      id={bus._id}
                      className='bg-surface-container-lowest card-shadow p-lg gap-md flex flex-col rounded-xl transition-shadow hover:shadow-lg md:flex-row md:items-center'
                    >
                      {/* Time & Route */}
                      <div className='flex-1'>
                        <div className='mb-2 flex items-center gap-3'>
                          <span className='material-symbols-outlined text-primary text-[28px]'>
                            directions_bus
                          </span>
                          <div>
                            <h3 className='text-body-lg text-on-surface font-bold'>
                              {bus.vehicleNumber}
                            </h3>
                            <p className='text-label-sm text-on-surface-variant'>
                              Executive Class
                            </p>
                          </div>
                        </div>
                        <div className='text-body-md text-on-surface-variant mt-2 flex items-center gap-4'>
                          <span className='text-on-surface font-semibold'>
                            {new Date(bus.departure).toLocaleTimeString()}
                          </span>
                          <div className='flex items-center gap-1'>
                            <div className='bg-primary h-2 w-2 rounded-full' />
                            <div className='bg-outline-variant h-0.5 w-16' />
                            <span className='text-label-sm text-surface-tint'>
                              {bus.duration}
                            </span>
                            <div className='bg-outline-variant h-0.5 w-16' />
                            <div className='bg-secondary h-2 w-2 rounded-full' />
                          </div>
                          <span className='text-on-surface font-semibold'>
                            {new Date(bus.arrival).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>

                      {/* Price & Select */}
                      <div className='gap-lg flex items-center md:flex-col md:items-end'>
                        <div className='text-right'>
                          <p className='text-headline-lg text-primary font-bold'>
                            Rs. {bus.ticketPrice}
                          </p>
                          <p className='text-label-sm text-on-surface-variant'>
                            {bus.totalSeats - bus.bookedSeats.length} seats left
                          </p>
                        </div>
                        <button
                          id={`select-${bus.id}`}
                          onClick={() => handleSelectBus(bus)}
                          className='bg-secondary text-on-secondary text-label-md px-lg hover:bg-secondary-container cursor-pointer rounded-xl py-2.5 font-bold shadow-sm transition-colors active:scale-[0.98]'
                        >
                          Select
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Seat Selection */}
              {currentStep === 3 && (
                <div
                  id='step-seats'
                  className='bg-surface-container-lowest card-shadow p-lg md:p-xl rounded-xl'
                >
                  <h2 className='text-headline-lg text-primary mb-2'>
                    Select Your Seats
                  </h2>
                  <p className='text-body-md text-on-surface-variant mb-lg'>
                    {selectedBus?.vehicleNumber} · {origin} → {destination}
                  </p>

                  {/* Legend */}
                  <div
                    id='seat-legend'
                    className='gap-lg mb-lg flex items-center'
                  >
                    <div className='flex items-center gap-2'>
                      <div className='bg-surface-container-low border-outline-variant h-6 w-6 rounded border' />
                      <span className='text-label-sm text-on-surface-variant'>
                        Available
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='bg-primary-container h-6 w-6 rounded' />
                      <span className='text-label-sm text-on-surface-variant'>
                        Selected
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <div className='bg-surface-variant h-6 w-6 rounded opacity-50' />
                      <span className='text-label-sm text-on-surface-variant'>
                        Booked
                      </span>
                    </div>
                  </div>

                  {/* Bus layout */}
                  <div className='mx-auto max-w-[320px]'>
                    {/* Front of bus */}
                    <div className='mb-md flex items-center justify-center'>
                      <div className='bg-surface-container-low border-outline-variant px-lg text-label-sm text-on-surface-variant flex items-center gap-2 rounded-t-2xl border py-2'>
                        <span className='material-symbols-outlined text-[18px]'>
                          airline_seat_recline_extra
                        </span>
                        Driver
                      </div>
                    </div>

                    {/* Seat Grid */}
                    <div
                      id='seat-grid'
                      className='mb-lg grid grid-cols-4 gap-3'
                    >
                      {seats.map((seat, index) => {
                        // Add aisle gap after 2nd column
                        const col = index % 4
                        return (
                          <button
                            key={seat.id}
                            id={seat.id}
                            onClick={() => handleSeatClick(index)}
                            disabled={selectedBus.bookedSeats.includes(seat.number)}
                            className={`text-label-md relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg font-bold transition-all duration-200 ${col === 1 ? "mr-4" : ""
                              } ${!selectedBus.bookedSeats.includes(seat.number) && seat.status === "available"
                                ? "bg-surface-container-low border-outline-variant text-on-surface-variant hover:border-primary hover:bg-primary-fixed/20 border-2"
                                : seat.status === 'selected'
                                  ? "bg-primary-container text-on-primary-container border-primary scale-105 border-2 shadow-md"
                                  : "bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-50"
                              }`}
                          >
                            {seat.number}
                            {selectedBus.bookedSeats.includes(seat.number) && seat.status === "booked" && (
                              <span className='material-symbols-outlined text-on-surface-variant/50 absolute text-[14px]'>
                                close
                              </span>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Proceed */}
                  <div className='mt-lg pt-lg border-outline-variant flex items-center justify-between border-t'>
                    <p className='text-body-md text-on-surface-variant'>
                      {selectedSeats.length > 0
                        ? `${selectedSeats.length} seat${selectedSeats.length > 1 ? "s" : ""} selected: ${selectedSeats.join(", ")}`
                        : "Tap seats to select them"}
                    </p>
                    <button
                      id='proceed-to-details-btn'
                      onClick={handleProceedToDetails}
                      disabled={selectedSeats.length === 0}
                      className={`text-label-md px-lg flex cursor-pointer items-center gap-2 rounded-xl py-2.5 font-bold transition-all ${selectedSeats.length > 0
                        ? "bg-secondary text-on-secondary hover:bg-secondary-container shadow-sm active:scale-[0.98]"
                        : "bg-surface-variant text-on-surface-variant cursor-not-allowed opacity-60"
                        }`}
                    >
                      Continue
                      <span className='material-symbols-outlined text-[20px]'>
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Passenger Details */}
              {currentStep === 4 && !bookingConfirmed && (
                <div
                  id='step-details'
                  className='bg-surface-container-lowest card-shadow p-lg md:p-xl rounded-xl'
                >
                  <h2 className='text-headline-lg text-primary mb-lg'>
                    Passenger Details
                  </h2>

                  <div className='space-y-md'>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor='passenger-name'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        Full Name
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          person
                        </span>
                        <input
                          id='passenger-name'
                          type='text'
                          placeholder='Enter your full name'
                          value={passengerName}
                          onChange={(e) => setPassengerName(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary placeholder:text-on-surface-variant/50 w-full rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        />
                      </div>
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor='passenger-phone'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        Phone Number
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          phone
                        </span>
                        <input
                          id='passenger-phone'
                          type='tel'
                          placeholder='03XXXXXXXXX'
                          value={passengerPhone}
                          onChange={(e) => setPassengerPhone(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary placeholder:text-on-surface-variant/50 w-full rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor='passenger-email'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        Email Address
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          mail
                        </span>
                        <input
                          id='passenger-email'
                          type='email'
                          placeholder='your@email.com'
                          value={passengerEmail}
                          onChange={(e) => setPassengerEmail(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary placeholder:text-on-surface-variant/50 w-full rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        />
                      </div>
                    </div>

                    {/* CNIC */}
                    <div>
                      <label
                        htmlFor='passenger-cnic'
                        className='text-label-md text-on-surface-variant mb-2 block'
                      >
                        CNIC Number <span className='text-body-sm text-on-surface-variant/50'>(Without Dashes)</span>
                      </label>
                      <div className='relative'>
                        <span className='material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-[20px]'>
                          id_card
                        </span>
                        <input
                          id='passenger-cnic'
                          type='text'
                          placeholder='XXXXXXXXXXXXX'
                          value={passengerCnic}
                          onChange={(e) => setPassengerCnic(e.target.value)}
                          className='bg-surface-container-low border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary placeholder:text-on-surface-variant/50 w-full rounded-xl border py-3 pr-4 pl-10 transition-all focus:ring-2 focus:outline-none'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Confirm Button */}
                  <button
                    id='confirm-booking-btn'
                    onClick={handleConfirmBooking}
                    className={`mt-xl text-label-md flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-bold transition-all ${"bg-secondary text-on-secondary hover:bg-secondary-container shadow-md active:scale-[0.98] cursor-pointer"

                      }`}
                  >
                    <span className='material-symbols-outlined text-[20px]'>
                      check_circle
                    </span>
                    Confirm Booking
                  </button>
                </div>
              )}

              {/* Booking Confirmed */}
              {bookingConfirmed && (
                <div
                  id='booking-confirmed'
                  className='bg-surface-container-lowest card-shadow p-xl rounded-xl text-center'
                >
                  <div className='bg-primary/10 mb-lg mx-auto flex h-20 w-20 items-center justify-center rounded-full'>
                    <span className='material-symbols-outlined text-primary text-[48px]'>
                      check_circle
                    </span>
                  </div>
                  <h2 className='text-headline-lg text-primary mb-2'>
                    Booking Confirmed!
                  </h2>
                  <p className='text-body-lg text-on-surface-variant mb-lg'>
                    Your journey from {origin} to {destination} has been booked
                    successfully.
                  </p>
                  <div className='bg-surface-container-low p-lg inline-block rounded-xl text-left'>
                    <div className='gap-x-xl gap-y-sm text-body-md grid grid-cols-2'>
                      <span className='text-on-surface-variant'>Route</span>
                      <span className='text-on-surface font-semibold'>
                        {origin} → {destination}
                      </span>
                      <span className='text-on-surface-variant'>Bus</span>
                      <span className='text-on-surface font-semibold'>
                        {selectedBus?.vehicleNumber}
                      </span>
                      <span className='text-on-surface-variant'>Seats</span>
                      <span className='text-on-surface font-semibold'>
                        {selectedSeats.join(", ")}
                      </span>
                      <span className='text-on-surface-variant'>Passenger</span>
                      <span className='text-on-surface font-semibold'>
                        {passengerName}
                      </span>
                      <span className='text-on-surface-variant'>Total</span>
                      <span className='text-green-700 font-bold'>
                        Rs. {(selectedSeats.length * selectedBus.ticketPrice).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Done Button */}
                  <button
                    id='done-btn'
                    onClick={() => window.location.reload()}
                    className='mt-lg text-label-md flex cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 text-white px-8 py-2.5 font-bold shadow-md transition-all hover:bg-green-700 active:scale-[0.98] mx-auto'
                  >
                    <span className='material-symbols-outlined text-[20px]'>
                      done_all
                    </span>
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar (4 cols) */}
            <div className='lg:col-span-4'>
              <div className='space-y-md lg:sticky lg:top-24'>
                {/* Booking Summary */}
                <div
                  id='booking-summary'
                  className='bg-surface-container-lowest card-shadow p-lg rounded-xl'
                >
                  <h3 className='text-body-lg text-primary mb-lg flex items-center gap-2 font-bold'>
                    <span className='material-symbols-outlined text-[22px]'>
                      receipt_long
                    </span>
                    Booking Summary
                  </h3>

                  {currentStep === 1 && !selectedBus ? (
                    /* Empty state */
                    <div
                      id='summary-empty'
                      className='py-xl flex flex-col items-center justify-center text-center'
                    >
                      <span className='material-symbols-outlined text-outline-variant mb-md text-[56px]'>
                        directions_bus
                      </span>
                      <p className='text-body-md text-on-surface-variant'>
                        Select your route and bus to see your booking summary
                        here.
                      </p>
                    </div>
                  ) : (
                    /* Summary content */
                    <div id='summary-content' className='space-y-md'>
                      {/* Route */}
                      <div className='flex items-start gap-3'>
                        <span className='material-symbols-outlined text-surface-tint mt-0.5 text-[20px]'>
                          route
                        </span>
                        <div>
                          <p className='text-label-sm text-on-surface-variant'>
                            Route
                          </p>
                          <p className='text-body-md text-on-surface font-semibold'>
                            {origin} → {destination}
                          </p>
                          <p className='text-label-sm text-on-surface-variant'>
                            {selectedDate}
                          </p>
                        </div>
                      </div>

                      {/* Bus */}
                      {selectedBus && (
                        <div className='flex items-start gap-3'>
                          <span className='material-symbols-outlined text-surface-tint mt-0.5 text-[20px]'>
                            directions_bus
                          </span>
                          <div>
                            <p className='text-label-sm text-on-surface-variant'>
                              Bus
                            </p>
                            <p className='text-body-md text-on-surface font-semibold'>
                              {selectedBus.name}
                            </p>
                            <p className='text-label-sm text-on-surface-variant'>
                              {selectedBus.vehicleNumber}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Seats */}
                      {selectedSeats.length > 0 && (
                        <div className='flex items-start gap-3'>
                          <span className='material-symbols-outlined text-surface-tint mt-0.5 text-[20px]'>
                            event_seat
                          </span>
                          <div>
                            <p className='text-label-sm text-on-surface-variant'>
                              Seats
                            </p>
                            <p className='text-body-md text-on-surface font-semibold'>
                              {selectedSeats.join(", ")}
                            </p>
                            <p className='text-label-sm text-on-surface-variant'>
                              {selectedSeats.length} seat
                              {selectedSeats.length > 1 ? "s" : ""}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Divider + Price */}
                      {selectedBus && (
                        <div className='pt-md border-outline-variant border-t'>
                          <div className='flex items-center justify-between'>
                            <span className='text-body-md text-on-surface-variant'>
                              {selectedSeats.length > 0
                                ? `${selectedSeats.length} × Rs. ${selectedBus.ticketPrice.toLocaleString()}`
                                : "Per seat"}
                            </span>
                            <span className='text-headline-lg text-primary font-bold'>
                              {selectedSeats.length > 0
                                ? `Rs. ${(selectedSeats.length * selectedBus.ticketPrice).toLocaleString()}`
                                : `Rs. ${(selectedBus.ticketPrice).toLocaleString()}`}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Support Widget */}
                <div
                  id='support-widget'
                  className='bg-surface-container-low p-lg rounded-xl'
                >
                  <div className='flex items-center gap-3'>
                    <div className='bg-primary/10 flex h-11 w-11 items-center justify-center rounded-full'>
                      <span className='material-symbols-outlined text-primary text-[24px]'>
                        support_agent
                      </span>
                    </div>
                    <div>
                      <p className='text-body-md text-on-surface font-bold'>
                        24/7 Support
                      </p>
                      <p className='text-label-sm text-on-surface-variant'>
                        Need help with your booking?
                      </p>
                    </div>
                  </div>
                  <div className='text-primary mt-3 flex items-center gap-2'>
                    <span className='material-symbols-outlined text-[18px]'>
                      phone
                    </span>
                    <a
                      id='support-phone'
                      href='tel:+925811234567'
                      className='text-label-md hover:text-secondary font-bold transition-colors'
                    >
                      +92 581 123 4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
