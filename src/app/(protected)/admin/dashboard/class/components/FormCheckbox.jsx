export default function FormCheckbox({
  id,
  name,
  label,
  description,
  checked,
  onChange,
  defaultChecked,
  required = false,
  disabled = false,
  className = "",
}) {
  const inputId = id || name;

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-start gap-3">
        <input
          id={inputId}
          name={name}
          type="checkbox"
          {...(checked !== undefined
            ? { checked, onChange }
            : { defaultChecked })}
          required={required}
          disabled={disabled}
          aria-describedby={description ? `${inputId}-desc` : undefined}
          className="mt-1 h-5 w-5 rounded border-gray-300 dark:border-gray-600
                     bg-white dark:bg-gray-700
                     accent-indigo-600
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400
                     disabled:opacity-50"
        />
        <div className="leading-tight">
          <label
            htmlFor={inputId}
            className="block text-gray-700 dark:text-gray-300 text-sm font-bold"
          >
            {label}
          </label>
          {description && (
            <p id={`${inputId}-desc`} className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
