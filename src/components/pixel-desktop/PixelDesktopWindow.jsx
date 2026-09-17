import { useEffect, useId, useRef } from 'react';

export default function PixelDesktopWindow({
  children,
  isMaximized,
  isMinimized,
  onClose,
  onMaximize,
  onMinimize,
  labels,
  title,
}) {
  const titleId = useId();
  const windowRef = useRef(null);
  const windowClassName = isMaximized
    ? 'fixed bottom-14 left-3 right-3 top-3 border-2 border-black bg-[#c0c0c0] shadow-[6px_6px_0_rgba(0,0,0,0.45)] sm:left-4 sm:right-4 sm:top-4'
    : 'absolute left-3 right-3 top-24 border-2 border-black bg-[#c0c0c0] shadow-[6px_6px_0_rgba(0,0,0,0.45)] sm:left-28 sm:right-auto sm:top-20 sm:w-[min(42rem,calc(100vw-9rem))]';

  useEffect(() => {
    if (!isMinimized) {
      windowRef.current?.focus();
    }
  }, [isMinimized, title]);

  if (isMinimized) {
    return null;
  }

  return (
    <section
      ref={windowRef}
      aria-labelledby={titleId}
      className={windowClassName}
      role="dialog"
      tabIndex={-1}
    >
      <div className="flex min-h-8 items-center justify-between border-b-2 border-black bg-[#000080] px-2 text-white">
        <h1 id={titleId} className="truncate text-sm font-bold">
          {title}
        </h1>
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

      <div className={isMaximized ? 'h-[calc(100%-2rem)] overflow-auto p-4 text-black' : 'max-h-[calc(100vh-12rem)] overflow-auto p-4 text-black sm:min-h-64'}>
        {children}
      </div>
    </section>
  );
}
