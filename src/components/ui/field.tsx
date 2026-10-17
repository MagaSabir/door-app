export function Field({
  label,
  name,
  error,
  idPrefix = "order",
  ...props
}: { label: string; name: string; error?: string; idPrefix?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const id = `${idPrefix}-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-ink-muted">
        {label}
      </label>
      <input
        id={id}
        name={name}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-[16px] outline-none focus:border-ink/40 ${
          error ? "border-[#e5484d]" : "border-black/10"
        }`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}
