'use client';

import React from 'react';
import { Theme } from '@radix-ui/themes';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

const storageKey = 'theme';
const cookieMaxAge = 60 * 60 * 24 * 365;

const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const readCookieTheme = (): ThemeMode | null => {
  const match = document.cookie.match(/(?:^|; )theme=(dark|light)/);
  return match ? (match[1] as ThemeMode) : null;
};

const writeThemeCookie = (theme: ThemeMode) => {
  document.cookie = `${storageKey}=${theme}; path=/; max-age=${cookieMaxAge}; samesite=lax`;
};

const applyThemeToDocument = (theme: ThemeMode) => {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
};

const resolveInitialTheme = (): ThemeMode => {
  const stored = window.localStorage.getItem(storageKey);
  if (stored === 'light' || stored === 'dark') return stored;
  const cookieTheme = readCookieTheme();
  if (cookieTheme) return cookieTheme;
  return getSystemTheme();
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = React.useState<ThemeMode>('light');

  React.useEffect(() => {
    const initialTheme = resolveInitialTheme();
    setThemeState(initialTheme);
  }, []);

  React.useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const setTheme = React.useCallback((nextTheme: ThemeMode) => {
    setThemeState(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    writeThemeCookie(nextTheme);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      <Theme appearance={theme} accentColor='violet'>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
