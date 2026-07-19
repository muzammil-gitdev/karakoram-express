import { useState } from "react";
import PortalFormField from "./PortalFormField";

const LOCATIONS = [
  "Select Location from option",
  "Skardu",
  "Gilgit",
  "Rawalpindi",
  "Gahkuch",
];

// Convert ISO / Date string to datetime-local input value
const toLocalDatetime = (dtStr) => {
  if (!dtStr) return "";
  try {
    const d = new Date(dtStr);
    const pad = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch {
    return "";
  }
};

export default function EditTransitRoute({ route, onCancel, onUpdated, backendUrl }) {
  const [form, setForm] = useState({
    from: route.from || "",
    to: route.to || "",
    departure: toLocalDatetime(route.departure),
    arrival: toLocalDatetime(route.arrival),
    vehicleNumber: route.vehicleNumber || "",
    ticketPrice: route.ticketPrice || 0,
  });

  const [bookedSeats, setBookedSeats] = useState(
    Array.isArray(route.bookedSeats) ? [...route.bookedSeats] : []
  );

  // Seats that were already booked — these cannot be toggled off
  const originalBookedSeats = Array.isArray(route.bookedSeats) ? route.bookedSeats : [];
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const TOTAL_SEATS = 44;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSeat = (seatNumber) => {
    setBookedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((s) => s !== seatNumber)
        : [...prev, seatNumber].sort((a, b) => a - b)
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError(null);

    if (form.from === form.to) {
      setError("Origin and destination cannot be the same.");
      return;
    }

    const requiredFields = ["departure", "arrival", "vehicleNumber", "ticketPrice"];
    const missing = requiredFields.some((f) => !form[f]);
    if (missing) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    const payload = {
      id: route._id,
      from: form.from,
      to: form.to,
      departure: form.departure,
      arrival: form.arrival,
      vehicleNumber: form.vehicleNumber,
      ticketPrice: Number(form.ticketPrice),
      bookedSeats: bookedSeats,
    };
    console.log("Update Transit Route Data:", payload);
    try {
      // const res = await fetch(`${backendUrl}/api/transit/${route._id}`, {
      const res = await fetch(`${backendUrl}/api/transit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: route._id,
          from: form.from,
          to: form.to,
          departure: form.departure,
          arrival: form.arrival,
          vehicleNumber: form.vehicleNumber,
          ticketPrice: Number(form.ticketPrice),
          bookedSeats: bookedSeats,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onUpdated("Transit route updated successfully!");
      } else {
        setError(data.message || "Failed to update route.");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none";
  const selectClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none";

  return (
    <div className='bg-surface-container-lowest card-shadow mb-xl rounded-2xl p-6 md:p-8 animate-in'>
      {/* Header with Cancel */}
      <div className='mb-lg flex items-center justify-between'>
        <h2 className='text-headline-lg-mobile text-on-surface flex items-center gap-2'>
          <span className='material-symbols-outlined text-secondary text-[22px]'>
            edit_note
          </span>
          Edit Transit Route
        </h2>
        <button
          type='button'
          onClick={onCancel}
          className='bg-error/10 text-error hover:bg-error/20 text-label-md flex cursor-pointer items-center gap-1.5 rounded-xl px-5 py-2.5 font-semibold transition-colors'
        >
          <span className='material-symbols-outlined text-[18px]'>close</span>
          Cancel
        </button>
      </div>

      {/* Error banner */}
      {error && (
        <div className='bg-error-container text-on-error-container mb-md flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium'>
          <span className='material-symbols-outlined text-[18px]'>error</span>
          {error}
        </div>
      )}

      <form onSubmit={handleUpdate} className='space-y-md'>
        {/* From / To */}
        <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
          <PortalFormField label='From' icon='trip_origin' htmlFor='edit-from'>
            <select
              id='edit-from'
              value={form.from}
              onChange={(e) => handleChange("from", e.target.value)}
              className={selectClass}
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </PortalFormField>

          <PortalFormField label='To' icon='location_on' htmlFor='edit-to'>
            <select
              id='edit-to'
              value={form.to}
              onChange={(e) => handleChange("to", e.target.value)}
              className={selectClass}
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </PortalFormField>
        </div>

        {/* Departure / Arrival */}
        <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
          <PortalFormField
            label='Departure (Date & Time)'
            icon='flight_takeoff'
            htmlFor='edit-departure'
          >
            <input
              id='edit-departure'
              type='datetime-local'
              value={form.departure}
              onChange={(e) => handleChange("departure", e.target.value)}
              className={inputClass}
            />
          </PortalFormField>

          <PortalFormField
            label='Arrival (Date & Time)'
            icon='flight_land'
            htmlFor='edit-arrival'
          >
            <input
              id='edit-arrival'
              type='datetime-local'
              value={form.arrival}
              onChange={(e) => handleChange("arrival", e.target.value)}
              className={inputClass}
            />
          </PortalFormField>
        </div>

        {/* Vehicle / Price */}
        <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
          <PortalFormField
            label='Vehicle Number'
            icon='directions_bus'
            htmlFor='edit-vehicle'
          >
            <input
              id='edit-vehicle'
              type='text'
              placeholder='e.g. KE-201'
              value={form.vehicleNumber}
              onChange={(e) => handleChange("vehicleNumber", e.target.value)}
              className={inputClass}
            />
          </PortalFormField>

          <PortalFormField
            label='Ticket Price (Rs.)'
            icon='payments'
            htmlFor='edit-price'
          >
            <input
              id='edit-price'
              type='number'
              min='0'
              placeholder='e.g. 4500'
              value={form.ticketPrice}
              onChange={(e) => handleChange("ticketPrice", e.target.value)}
              className={inputClass}
            />
          </PortalFormField>
        </div>

        {/* Booked Seats — 44 toggle buttons */}
        <div>
          <label className='text-label-md text-on-surface-variant mb-3 flex items-center gap-1.5'>
            <span className='material-symbols-outlined text-[18px]'>event_seat</span>
            Booked Seats
            <span className='text-on-surface-variant/60 ml-1 text-xs'>
              ({bookedSeats.length} / {TOTAL_SEATS} booked)
            </span>
          </label>
          <div className='grid grid-cols-11 gap-1.5 sm:grid-cols-11 md:gap-2'>
            {Array.from({ length: TOTAL_SEATS }, (_, i) => i + 1).map((seat) => {
              const isBooked = bookedSeats.includes(seat);
              const isOriginallyBooked = originalBookedSeats.includes(seat);
              return (
                <button
                  key={seat}
                  type='button'
                  onClick={() => !isOriginallyBooked && toggleSeat(seat)}
                  disabled={isOriginallyBooked}
                  title={`Seat ${seat} — ${isOriginallyBooked ? "Already Booked (locked)" : isBooked ? "Booked" : "Available"}`}
                  className={`flex h-9 w-full items-center justify-center rounded-lg text-xs font-bold transition-all ${isOriginallyBooked
                    ? "bg-on-surface/15 text-on-surface/40 cursor-not-allowed ring-1 ring-on-surface/10"
                    : isBooked
                      ? "bg-primary text-on-primary shadow-md ring-2 ring-primary/30 cursor-pointer active:scale-95"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container border-outline-variant/30 border cursor-pointer active:scale-95"
                    }`}
                >
                  {isOriginallyBooked && (
                    <span className='material-symbols-outlined mr-0.5 text-[12px]'>lock</span>
                  )}
                  {seat}
                </button>
              );
            })}
          </div>
          <div className='mt-3 flex items-center gap-4 text-xs'>
            <div className='flex items-center gap-1.5'>
              <span className='bg-on-surface/15 ring-on-surface/10 inline-block h-3 w-3 rounded ring-1'></span>
              <span className='text-on-surface-variant'>Already Booked</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='bg-primary inline-block h-3 w-3 rounded'></span>
              <span className='text-on-surface-variant'>Newly Booked</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <span className='bg-surface-container-low border-outline-variant/30 inline-block h-3 w-3 rounded border'></span>
              <span className='text-on-surface-variant'>Available</span>
            </div>
          </div>
        </div>

        {/* Update button */}
        <button
          type='submit'
          disabled={submitting}
          className='bg-primary text-on-primary text-label-md hover:bg-primary/90 mt-md flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold shadow-md transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:px-8'
        >
          {submitting ? (
            <>
              <span className='material-symbols-outlined animate-spin text-[20px]'>
                progress_activity
              </span>
              Updating…
            </>
          ) : (
            <>
              <span className='material-symbols-outlined text-[20px]'>
                check_circle
              </span>
              Update Transit Route
            </>
          )}
        </button>
      </form>
    </div>
  );
}
