import { useMemo, useState } from 'react';

const CINEMA_STORAGE_KEY = 'norman-cinema-mode';
const TEXT_SIZE_STORAGE_KEY = 'norman-text-size';
const textSizes = ['small', 'medium', 'large'];

function getStoredBoolean(key, fallback) {
  if (typeof window === 'undefined') {
    return fallback;
  }

  return window.localStorage.getItem(key) === 'true';
}

function getStoredTextSize() {
  if (typeof window === 'undefined') {
    return 'medium';
  }

  const storedSize = window.localStorage.getItem(TEXT_SIZE_STORAGE_KEY);
  return textSizes.includes(storedSize) ? storedSize : 'medium';
}

export function usePixelDesktopSettings() {
  const [cinemaMode, setCinemaModeState] = useState(() =>
    getStoredBoolean(CINEMA_STORAGE_KEY, false),
  );
  const [textSize, setTextSizeState] = useState(getStoredTextSize);

  const setCinemaMode = (nextValue) => {
    setCinemaModeState(nextValue);

    try {
      window.localStorage.setItem(CINEMA_STORAGE_KEY, String(nextValue));
    } catch {
      // Pixel Desktop still works without localStorage persistence.
    }
  };

  const setTextSize = (nextSize) => {
    if (!textSizes.includes(nextSize)) {
      return;
    }

    setTextSizeState(nextSize);

    try {
      window.localStorage.setItem(TEXT_SIZE_STORAGE_KEY, nextSize);
    } catch {
      // Pixel Desktop still works without localStorage persistence.
    }
  };

  return useMemo(
    () => ({
      cinemaMode,
      setCinemaMode,
      setTextSize,
      textSize,
      textSizes,
      toggleCinemaMode: () => setCinemaMode(!cinemaMode),
    }),
    [cinemaMode, textSize],
  );
}
