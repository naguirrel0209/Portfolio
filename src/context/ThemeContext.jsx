import { createContext, useContext, useLayoutEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'norman-visual-theme';

export const visualThemes = [
  {
    id: 'azul',
    label: 'Azul',
    icon: '🔵',
    swatch: '#00dce5',
    variables: {
      '--background': '#08112e',
      '--surface': '#151e3b',
      '--surface-high': '#202846',
      '--surface-highest': '#2b3352',
      '--primary': '#00dce5',
      '--primary-hover': '#63f7ff',
      '--glow': 'rgba(0,220,229,0.35)',
      '--border': '#3a494a',
      '--text': '#dce1ff',
      '--text-muted': '#b9caca',
    },
  },
  {
    id: 'rojo',
    label: 'Rojo',
    icon: '🔴',
    swatch: '#ff4d4d',
    variables: {
      '--background': '#140809',
      '--surface': '#241012',
      '--surface-high': '#351619',
      '--surface-highest': '#4a2025',
      '--primary': '#ff4d4d',
      '--primary-hover': '#ff8a8a',
      '--glow': 'rgba(255,77,77,0.35)',
      '--border': '#5b2a2f',
      '--text': '#ffe3e3',
      '--text-muted': '#d8b0b0',
    },
  },
  {
    id: 'naranja',
    label: 'Naranja',
    icon: '🟠',
    swatch: '#ff9f1c',
    variables: {
      '--background': '#1a1208',
      '--surface': '#2a1c0e',
      '--surface-high': '#3d2812',
      '--surface-highest': '#57391a',
      '--primary': '#ff9f1c',
      '--primary-hover': '#ffd166',
      '--glow': 'rgba(255,159,28,0.35)',
      '--border': '#60401d',
      '--text': '#ffe9d0',
      '--text-muted': '#d9bea0',
    },
  },
  {
    id: 'verde',
    label: 'Verde',
    icon: '🟢',
    swatch: '#22c55e',
    variables: {
      '--background': '#07120b',
      '--surface': '#102017',
      '--surface-high': '#183024',
      '--surface-highest': '#204532',
      '--primary': '#22c55e',
      '--primary-hover': '#86efac',
      '--glow': 'rgba(34,197,94,0.35)',
      '--border': '#2b5a42',
      '--text': '#dcffe9',
      '--text-muted': '#a9d5ba',
    },
  },
  {
    id: 'morado',
    label: 'Morado',
    icon: '🟣',
    swatch: '#8b5cf6',
    variables: {
      '--background': '#12091c',
      '--surface': '#1d1030',
      '--surface-high': '#281545',
      '--surface-highest': '#351c5d',
      '--primary': '#8b5cf6',
      '--primary-hover': '#c4b5fd',
      '--glow': 'rgba(139,92,246,0.35)',
      '--border': '#4a2f70',
      '--text': '#eee3ff',
      '--text-muted': '#c9b7df',
    },
  },
  {
    id: 'rosado',
    label: 'Rosado',
    icon: '🌸',
    swatch: '#ff4fa3',
    variables: {
      '--background': '#180914',
      '--surface': '#26111f',
      '--surface-high': '#35182b',
      '--surface-highest': '#4a213b',
      '--primary': '#ff4fa3',
      '--primary-hover': '#ff9bd0',
      '--glow': 'rgba(255,79,163,0.35)',
      '--border': '#60304d',
      '--text': '#ffe0f0',
      '--text-muted': '#ddb0c8',
    },
  },
  {
    id: 'plata',
    label: 'Plata',
    icon: '⚪',
    swatch: '#cfd3dc',
    variables: {
      '--background': '#0f1012',
      '--surface': '#191b1f',
      '--surface-high': '#23262b',
      '--surface-highest': '#30343b',
      '--primary': '#cfd3dc',
      '--primary-hover': '#ffffff',
      '--glow': 'rgba(207,211,220,0.30)',
      '--border': '#4a505a',
      '--text': '#edf1f8',
      '--text-muted': '#b7beca',
    },
  },
];

const defaultTheme = visualThemes[0];
const ThemeContext = createContext(null);

function getThemeById(themeId) {
  return visualThemes.find((theme) => theme.id === themeId) ?? defaultTheme;
}

function getInitialThemeId() {
  if (typeof window === 'undefined') {
    return defaultTheme.id;
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return getThemeById(storedTheme).id;
  } catch {
    return defaultTheme.id;
  }
}

function applyTheme(theme) {
  const root = document.documentElement;

  root.dataset.visualTheme = theme.id;
  Object.entries(theme.variables).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(getInitialThemeId);
  const theme = getThemeById(themeId);

  useLayoutEffect(() => {
    applyTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme.id);
    } catch {
      // El tema sigue funcionando aunque localStorage no esté disponible.
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      themeId: theme.id,
      themes: visualThemes,
      setTheme: setThemeId,
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme debe utilizarse dentro de ThemeProvider.');
  }

  return context;
}
