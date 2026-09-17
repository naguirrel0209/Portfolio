import { createContext, useContext, useMemo, useState } from 'react';

const CINEMA_STORAGE_KEY = 'norman-mainframe-cinema';
const TEXT_SIZE_STORAGE_KEY = 'norman-mainframe-text-size';
const textSizes = ['small', 'medium', 'large'];

const MainframeSettingsContext = createContext(null);

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

export function MainframeSettingsProvider({ children }) {
  const [cinemaMode, setCinemaModeState] = useState(() =>
    getStoredBoolean(CINEMA_STORAGE_KEY, false),
  );
  const [textSize, setTextSizeState] = useState(getStoredTextSize);

  const setCinemaMode = (nextValue) => {
    setCinemaModeState(nextValue);
    window.localStorage.setItem(CINEMA_STORAGE_KEY, String(nextValue));
  };

  const setTextSize = (nextSize) => {
    if (!textSizes.includes(nextSize)) {
      return;
    }

    setTextSizeState(nextSize);
    window.localStorage.setItem(TEXT_SIZE_STORAGE_KEY, nextSize);
  };

  const value = useMemo(
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

  return (
    <MainframeSettingsContext.Provider value={value}>
      {children}
    </MainframeSettingsContext.Provider>
  );
}

export function useMainframeSettings() {
  const context = useContext(MainframeSettingsContext);

  if (!context) {
    throw new Error('useMainframeSettings debe utilizarse dentro de MainframeSettingsProvider.');
  }

  return context;
}
