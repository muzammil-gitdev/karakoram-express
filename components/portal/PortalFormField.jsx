export default function PortalFormField({
  label,
  icon,
  children,
  htmlFor,
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className='text-label-md text-on-surface-variant mb-2 flex items-center gap-1.5'
      >
        {icon && (
          <span className='material-symbols-outlined text-[18px]'>{icon}</span>
        )}
        {label}
      </label>
      {children}
    </div>
  )
}
