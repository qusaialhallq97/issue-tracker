'use client';

import React from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type='button'
      onClick={toggleTheme}
      className='inline-flex items-center justify-center rounded-md border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-700 dark:hover:text-white'
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? (
        <BsFillSunFill className='h-4 w-4' />
      ) : (
        <BsFillMoonFill className='h-4 w-4' />
      )}
    </button>
  );
};

export default ThemeToggle;
