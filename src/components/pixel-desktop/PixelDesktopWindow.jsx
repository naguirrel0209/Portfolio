export default function PixelDesktopWindow({
  children,
  isMinimized,
  onClose,
  onMaximize,
  onMinimize,
  labels,
  title,
}) {
  if (isMinimized) {
    return null;
  }

  return (
    <section className="absolute left-3 right-3 top-24 border-2 border-black bg-[#c0c0c0] shadow-[6px_6px_0_rgba(0,0,0,0.45)] sm:left-28 sm:right-auto sm:top-20 sm:w-[min(42rem,calc(100vw-9rem))]">
      <div className="flex min-h-8 items-center justify-between border-b-2 border-black bg-[#000080] px-2 text-white">
        <h1 className="truncate text-sm font-bold">{title}</h1>
        <div className="flex gap-1">
          <button
            type="button"
            className="h-5 w-5 border border-black bg-[#c0c0c0] text-xs leading-none text-black"
            aria-label={labels.minimize}
            onClick={onMinimize}
          >
            _
          </button>
          <button
            type="button"
            className="h-5 w-5 border border-black bg-[#c0c0c0] text-xs leading-none text-black"
            aria-label={labels.maximize}
            onClick={onMaximize}
          >
            □
          </button>
          <button
            type="button"
            className="h-5 w-5 border border-black bg-[#c0c0c0] text-xs leading-none text-black"
            aria-label={labels.close}
            onClick={onClose}
          >
            x
          </button>
        </div>
      </div>

      <div className="max-h-[calc(100vh-12rem)] overflow-auto p-4 text-black sm:min-h-64">
        {children}
      </div>
    </section>
  );
}
