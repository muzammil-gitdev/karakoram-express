import { useEffect } from "react"

export default function PortalToast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 2000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={`portal-toast fixed top-6 right-6 z-[100] flex items-center gap-3 rounded-xl px-5 py-3.5 shadow-lg ${type === "success"
        ? "bg-primary-container text-on-primary-container"
        : "bg-error-container text-on-error-container"
        }`}
    >
      <span className='material-symbols-outlined text-[22px]'>
        {type === "success" ? "check_circle" : "error"}
      </span>
      <span className='text-body-md font-medium'>{message}</span>
      <button
        onClick={onClose}
        className='ml-2 cursor-pointer opacity-60 transition-opacity hover:opacity-100'
      >
        <span className='material-symbols-outlined text-[18px]'>close</span>
      </button>
    </div>
  )
}
