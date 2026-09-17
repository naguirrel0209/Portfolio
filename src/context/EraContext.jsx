import { createContext, useContext, useMemo, useState } from 'react';

export const ERA_STORAGE_KEY = 'norman-selected-era';

export const eras = [
  { id: 'mainframe', label: 'MAINFRAME' },
  { id: 'pixel-desktop', label: 'PIXEL DESKTOP' },
  { id: 'classic-web', label: 'CLASSIC WEB' },
  { id: 'neon-system', label: 'NEON SYSTEM' },
];

const EraContext = createContext(null);

function isValidEra(eraId) {
  return eras.some((era) => era.id === eraId);
}

function getStoredEra() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedEra = window.localStorage.getItem(ERA_STORAGE_KEY);
    return isValidEra(storedEra) ? storedEra : null;
  } catch {
    return null;
  }
}

export function EraProvider({ children }) {
  const [selectedEra, setSelectedEraState] = useState(getStoredEra);

  const setSelectedEra = (eraId) => {
    if (!isValidEra(eraId)) {
      return;
    }

    setSelectedEraState(eraId);

    try {
      window.localStorage.setItem(ERA_STORAGE_KEY, eraId);
    } catch {
      // The app can continue without persistence when localStorage is unavailable.
    }
  };

  const resetSelectedEra = () => {
    setSelectedEraState(null);

    try {
      window.localStorage.removeItem(ERA_STORAGE_KEY);
    } catch {
      // The boot screen can still return even if localStorage is unavailable.
    }
  };

  const value = useMemo(
    () => ({
      eras,
      hasSelectedEra: Boolean(selectedEra),
      resetSelectedEra,
      selectedEra,
      setSelectedEra,
    }),
    [selectedEra],
  );

  return <EraContext.Provider value={value}>{children}</EraContext.Provider>;
}

export function useEra() {
  const context = useContext(EraContext);

  if (!context) {
    throw new Error('useEra debe utilizarse dentro de EraProvider.');
  }

  return context;
}
