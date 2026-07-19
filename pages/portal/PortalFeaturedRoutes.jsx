import { useEffect, useState } from "react"
import PortalFormField from "../../components/portal/PortalFormField"
import PortalToast from "../../components/portal/PortalToast"

const LOCATIONS = ["Skardu", "Gilgit", "Rawalpindi", "Gahkuch"]

const INITIAL_FORM = {
  from: "Skardu",
  to: "Gilgit",
  price: "",
  image: "",
}

export default function PortalFeaturedRoutes() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitting, setSubmitting] = useState(false)
  const [toast, setToast] = useState(null)
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)

  const BACKEND = import.meta.env.VITE_BACKEND_URL

  // Fetch existing featured routes
  const fetchRoutes = async (signal) => {
    setLoading(true)
    try {
      const res = await fetch(`${BACKEND}/api/featuredRoutes`, { signal })
      const data = await res.json()
      if (data.status === "success") setRoutes(data.data)
    } catch (err) {
      if (err.name !== "AbortError") console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    document.title = "Featured Routes | KE Portal"
    const controller = new AbortController()
    fetchRoutes(controller.signal)
    return () => controller.abort()
  }, [])

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.from === form.to) {
      setToast({ message: "Origin and destination cannot be the same.", type: "error" })
      return
    }
    if (!form.price || !form.image) {
      setToast({ message: "Please fill in all fields.", type: "error" })
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(`${BACKEND}/api/featuredRoutes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          from: form.from,
          to: form.to,
          price: Number(form.price),
          image: form.image,
        }),
      })
      const data = await res.json()
      if (data.status === "success") {
        setToast({ message: "Featured route added successfully!", type: "success" })
        setForm(INITIAL_FORM)
        // Refresh list
        fetchRoutes()
      } else {
        setToast({ message: data.message || "Failed to add route.", type: "error" })
      }
    } catch (err) {
      setToast({ message: "Network error. Is the backend running?", type: "error" })
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none"
  const selectClass =
    "bg-surface-container-lowest border-outline-variant text-on-surface text-body-md focus:ring-primary/30 focus:border-primary w-full cursor-pointer appearance-none rounded-xl border py-3 px-4 transition-all focus:ring-2 focus:outline-none"

  return (
    <div className='px-lg md:px-xl py-xl mx-auto max-w-[960px]'>
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
            star
          </span>
        </div>
        <div>
          <h1 className='text-headline-lg text-primary'>Featured Routes</h1>
          <p className='text-body-md text-on-surface-variant'>
            Add routes that appear on the homepage hero section
          </p>
        </div>
      </div>

      {/* Add Form */}
      <div className='bg-surface-container-lowest card-shadow mb-xl rounded-2xl p-6 md:p-8'>
        <h2 className='text-headline-lg-mobile text-on-surface mb-lg flex items-center gap-2'>
          <span className='material-symbols-outlined text-secondary text-[22px]'>
            add_circle
          </span>
          Add New Featured Route
        </h2>

        <form onSubmit={handleSubmit} className='space-y-md'>
          {/* From / To Row */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            <PortalFormField label='From' icon='trip_origin' htmlFor='fr-from'>
              <select
                id='fr-from'
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

            <PortalFormField label='To' icon='location_on' htmlFor='fr-to'>
              <select
                id='fr-to'
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

          {/* Price / Image Row */}
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            <PortalFormField label='Ticket Price (Rs.)' icon='payments' htmlFor='fr-price'>
              <input
                id='fr-price'
                type='number'
                min='0'
                placeholder='e.g. 8500'
                value={form.price}
                onChange={(e) => handleChange("price", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>

            <PortalFormField label='Image URL' icon='image' htmlFor='fr-image'>
              <input
                id='fr-image'
                type='url'
                placeholder='https://example.com/photo.jpg'
                value={form.image}
                onChange={(e) => handleChange("image", e.target.value)}
                className={inputClass}
              />
            </PortalFormField>
          </div>

          {/* Image Preview */}
          {form.image && (
            <div className='border-outline-variant/50 mt-sm h-40 overflow-hidden rounded-xl border'>
              <img
                src={form.image}
                alt='Preview'
                className='h-full w-full object-cover'
                onError={(e) => {
                  e.target.style.display = "none"
                }}
              />
            </div>
          )}

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
                Add Featured Route
              </>
            )}
          </button>
        </form>
      </div>

      {/* Existing Routes List */}
      <div>
        <h2 className='text-headline-lg-mobile text-on-surface mb-md flex items-center gap-2'>
          <span className='material-symbols-outlined text-primary text-[22px]'>
            list
          </span>
          Existing Featured Routes
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
              explore_off
            </span>
            <p className='text-body-md text-on-surface-variant mt-3'>
              No featured routes found. Add one above to get started.
            </p>
          </div>
        ) : (
          <div className='gap-md grid grid-cols-1 md:grid-cols-2'>
            {routes.map((route) => (
              <div
                key={route._id}
                className='bg-surface-container-lowest card-shadow group relative flex min-h-[160px] flex-col justify-end overflow-hidden rounded-2xl'
              >
                {/* Background Image */}
                <div
                  className='absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-105'
                  style={{ backgroundImage: `url(${route.image})` }}
                />
                <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent' />

                {/* Content */}
                <div className='relative z-10 p-5'>
                  <h3 className='text-headline-lg-mobile text-on-primary mb-1'>
                    {route.from} ↔ {route.to}
                  </h3>
                  <span className='text-label-md text-on-primary/80'>
                    Rs. {Number(route.price).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
