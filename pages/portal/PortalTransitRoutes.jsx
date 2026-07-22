import { useEffect, useState } from "react";
import PortalFormField from "../../components/portal/PortalFormField";
import PortalToast from "../../components/portal/PortalToast";
import EditTransitRoute from "../../components/portal/EditTransitRoute";

const LOCATIONS = [
  "Select Location from option",
  "Skardu",
  "Gilgit",
  "Rawalpindi",
  "Gahkuch",
];

const INITIAL_FORM = {
  from: "",
  to: "",
  departure: "",
  arrival: "",
  vehicleNumber: "",
  ticketPrice: 0,
  bookedSeats: "",
};

export default function PortalTransitRoutes() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seatsBooked, setSeatsBooked] = useState([]);
  const [editingRoute, setEditingRoute] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const BACKEND = import.meta.env.VITE_BACKEND_URL;

  // Fetch existing transit routes
  const fetchRoutes = async (signal) => {
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND}/api/transit/all`, { signal });
      const data = await res.json();
      console.log(data)
      if (data.success) setRoutes(data.data);
    } catch (err) {
      if (err.name !== "AbortError") console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  // Calling fetch
  useEffect(() => {
    document.title = "Transit Routes | KE Portal";
    const controller = new AbortController();
    fetchRoutes(controller.signal);
    return () => controller.abort();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.from === form.to) {
      setToast({
        message: "Origin and destination cannot be the same.",
        type: "error",
      });
      return;
    }

    const requiredFields = [
      "departure",
      "arrival",
      "vehicleNumber",
      "ticketPrice",
      "bookedSeats",
    ];
    const missing = requiredFields.some((f) => !form[f]);
    if (missing) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${BACKEND}/api/transit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          departure: form.departure,
          arrival: form.arrival,
          vehicleNumber: form.vehicleNumber,
          ticketPrice: Number(form.ticketPrice),
          bookedSeats: form.bookedSeats
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean)
            .map(Number),
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        setToast({
          message: "Transit route added successfully!",
          type: "success",
        });
        setForm(INITIAL_FORM);
        fetchRoutes();
      } else {
        setToast({
          message: data.message || "Failed to add route.",
          type: "error",
        });
      }
    } catch (err) {
      setToast({
        message: err.message,
        type: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Delete a transit route
  const handleDelete = async (routeId) => {
    setDeleting(routeId);
    try {
      const res = await fetch(`${BACKEND}/api/transit/${routeId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setToast({ message: "Transit route removed successfully!", type: "success" });
        fetchRoutes();
      } else {
        setToast({ message: data.message || "Failed to remove route.", type: "error" });
      }
    } catch (err) {
      setToast({ message: err.message, type: "error" });
    } finally {
      setDeleting(null);
    }
  };

  // Handle edit success
  const handleEditSuccess = (message) => {
    setToast({ message, type: "success" });
    setEditingRoute(null);
    fetchRoutes();
  };

  const inputClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none";
  const selectClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none";

  // Format datetime-local for table display
  const formatDateTime = (dtStr) => {
    if (!dtStr) return "—";
    try {
      const d = new Date(dtStr);
      return d.toLocaleDateString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dtStr;
    }
  };

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
        <div className='bg-primary flex h-11 w-11 items-center justify-center rounded-xl'>
          <span className='material-symbols-outlined text-on-primary text-[24px]'>
            directions_bus
          </span>
        </div>
        <div>
          <h1 className='text-headline-lg text-primary'>Transit Routes</h1>
          <p className='text-body-md text-on-surface-variant'>
            Manage scheduled transit routes with vehicle and fare details
          </p>
        </div>
      </div>

      {/* Add Form */}
      <div className='bg-surface-container-lowest card-shadow mb-xl rounded-2xl p-6 md:p-8'>
        <h2 className='text-headline-lg-mobile text-on-surface mb-lg flex items-center gap-2'>
          <span className='material-symbols-outlined text-secondary text-[22px]'>
            add_circle
          </span>
          Add New Transit Route
        </h2>

        <form onSubmit={handleSubmit} className='space-y-md'>
          {/* From / To */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            <PortalFormField label='From' icon='trip_origin' htmlFor='tr-from'>
              <select
                id='tr-from'
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

            <PortalFormField label='To' icon='location_on' htmlFor='tr-to'>
              <select
                id='tr-to'
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
              htmlFor='tr-departure'
            >
              <input
                id='tr-departure'
                type='datetime-local'
                value={form.departure}
                onChange={(e) => handleChange("departure", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>

            <PortalFormField
              label='Arrival (Date & Time)'
              icon='flight_land'
              htmlFor='tr-arrival'
            >
              <input
                id='tr-arrival'
                type='datetime-local'
                value={form.arrival}
                onChange={(e) => handleChange("arrival", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>
          </div>

          {/* Vehicle / Price / Booked Seats */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-3'>
            <PortalFormField
              label='Vehicle Number'
              icon='directions_bus'
              htmlFor='tr-vehicle'
            >
              <input
                id='tr-vehicle'
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
              htmlFor='tr-price'
            >
              <input
                id='tr-price'
                type='number'
                min='0'
                placeholder='e.g. 4500'
                value={form.ticketPrice}
                onChange={(e) => handleChange("ticketPrice", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>

            <PortalFormField
              label='Booked Seats'
              icon='event_seat'
              htmlFor='tr-booked'
            >
              <input
                id='tr-booked'
                type='text'
                min='0'
                placeholder='e.g. 12'
                value={form.bookedSeats}
                onChange={(e) => handleChange("bookedSeats", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>
          </div>

          {/* Submit */}
          <button
            type='submit'
            disabled={submitting}
            className='bg-secondary text-on-secondary text-label-md hover:bg-secondary-container mt-md flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold shadow-md transition-colors active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 md:w-auto md:px-8'
          >
            {submitting ? (
              <>
                <span className='material-symbols-outlined animate-spin text-[20px]'>
                  progress_activity
                </span>
                Submitting…
              </>
            ) : (
              <>
                <span className='material-symbols-outlined text-[20px]'>
                  add
                </span>
                Add Transit Route
              </>
            )}
          </button>
        </form>
      </div>

      {/* Edit Route Panel */}
      {editingRoute && (
        <EditTransitRoute
          key={editingRoute._id}
          route={editingRoute}
          onCancel={() => setEditingRoute(null)}
          onUpdated={handleEditSuccess}
          backendUrl={BACKEND}
        />
      )}

      {/* Existing Routes Table */}
      <div>
        <h2 className='text-headline-lg-mobile text-on-surface mb-md flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[22px]'>
            table_chart
          </span>
          Existing Transit Routes
        </h2>

        {loading ? (
          <div className='py-xl flex flex-col items-center justify-center'>
            <span className='material-symbols-outlined text-outline-variant animate-spin text-[40px]'>
              progress_activity
            </span>
            <p className='text-body-md text-on-surface-variant mt-3'>
              Loading routes…
            </p>
          </div>
        ) : routes.length === 0 ? (
          <div className='bg-surface-container-lowest card-shadow py-xl flex flex-col items-center justify-center rounded-2xl'>
            <span className='material-symbols-outlined text-outline-variant text-[56px]'>
              no_transfer
            </span>
            <p className='text-body-md text-on-surface-variant mt-3'>
              No transit routes found. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className='bg-surface-container-lowest card-shadow overflow-x-auto rounded-2xl'>
            <table className='portal-table w-full min-w-[800px] text-left'>
              <thead>
                <tr className='border-outline-variant/40 border-b'>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                    Route
                  </th>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                    Departure
                  </th>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                    Arrival
                  </th>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                    Vehicle
                  </th>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold'>
                    Price
                  </th>
                  <th className='text-label-md text-on-surface-variant px-5 py-3.5 font-semibold text-center'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {routes.map((route, idx) => (
                  <tr
                    key={route._id || idx}
                    className={`border-outline-variant/20 hover:bg-primary-fixed/5 border-b transition-colors last:border-b-0 ${idx % 2 === 0
                      ? "bg-surface-container-lowest"
                      : "bg-surface-container-low/40"
                      }`}
                  >
                    <td className='px-5 py-3.5'>
                      <div className='flex items-center gap-2'>
                        <span className='material-symbols-outlined text-primary text-[18px]'>
                          route
                        </span>
                        <span className='text-body-md text-on-surface font-semibold'>
                          {route.from} → {route.to}
                        </span>
                      </div>
                    </td>
                    <td className='text-body-md text-on-surface px-5 py-3.5 font-medium'>
                      {formatDateTime(route.departure)}
                    </td>
                    <td className='text-body-md text-on-surface px-5 py-3.5 font-medium'>
                      {formatDateTime(route.arrival)}
                    </td>
                    <td className='px-5 py-3.5'>
                      <span className='text-label-md bg-primary-container text-on-primary-container rounded-lg px-2.5 py-1'>
                        {route.vehicleNumber}
                      </span>
                    </td>
                    <td className='text-body-md text-primary px-5 py-3.5 font-bold'>
                      Rs. {Number(route.ticketPrice).toLocaleString()}
                    </td>
                    <td className='px-5 py-3.5'>
                      <div className='flex items-center justify-center gap-2'>
                        <button
                          type='button'
                          onClick={() => setEditingRoute(route)}
                          title='Edit route'
                          className='bg-primary/10 text-primary hover:bg-primary/20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors'
                        >
                          <span className='material-symbols-outlined text-[18px]'>edit</span>
                        </button>
                        <button
                          type='button'
                          onClick={() => handleDelete(route._id)}
                          disabled={deleting === route._id}
                          title='Remove route'
                          className='bg-error/10 text-error hover:bg-error/20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition-colors disabled:opacity-50'
                        >
                          <span className='material-symbols-outlined text-[18px]'>
                            {deleting === route._id ? "progress_activity" : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
