'use client';
import { useTheme } from 'next-themes';
import { FC } from 'react';
import { FaMoon, FaRegSun } from 'react-icons/fa';

interface ThemeButtonProps {
  className?: string;
}

const ThemeButton: FC<ThemeButtonProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      {theme === 'light' && <FaMoon className={`${className}`} onClick={() => setTheme('dark')} />}
      {theme === 'dark' && <FaRegSun className={`${className}`} onClick={() => setTheme('light')} />}
    </>
  );
};

export default ThemeButton;
