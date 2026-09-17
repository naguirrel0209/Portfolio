import { useEffect, useRef } from 'react';
import PixelDesktopStartMenu from './PixelDesktopStartMenu.jsx';

export default function PixelDesktopTaskbar({
  activeTitle,
  clockLabel,
  isStartOpen,
  items,
  menuTitle,
  onCloseStart,
  onOpenItem,
  onRestoreWindow,
  onToggleStart,
  showWindowButton,
  startLabel,
}) {
  const startMenuRef = useRef(null);

  useEffect(() => {
    if (!isStartOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      if (!startMenuRef.current?.contains(event.target)) {
        onCloseStart();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCloseStart();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isStartOpen, onCloseStart]);

  return (
    <footer className="fixed inset-x-0 bottom-0 z-40 flex h-11 items-center gap-2 border-t-2 border-white bg-[#c0c0c0] px-2 text-sm text-black">
      <div ref={startMenuRef} className="relative">
        <button
          type="button"
          className="border-2 border-black bg-[#d8d8d8] px-3 py-1 font-bold shadow-[2px_2px_0_rgba(0,0,0,0.35)] active:translate-x-0.5 active:translate-y-0.5"
          onClick={onToggleStart}
        >
          {startLabel}
        </button>
        {isStartOpen ? (
          <PixelDesktopStartMenu items={items} menuTitle={menuTitle} onOpenItem={onOpenItem} />
        ) : null}
      </div>

      <div className="flex min-w-0 flex-1 gap-2">
        {showWindowButton ? (
          <button
            type="button"
            className="min-w-0 max-w-56 truncate border-2 border-black bg-[#e6e6e6] px-3 py-1 text-left"
            onClick={onRestoreWindow}
          >
            {activeTitle}
          </button>
        ) : null}
      </div>

      <div className="shrink-0 border-2 border-[#808080] bg-[#d8d8d8] px-2 py-1">{clockLabel}</div>
    </footer>
  );
}
