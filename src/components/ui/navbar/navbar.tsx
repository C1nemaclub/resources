'use client';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { Button } from '../button';
import ThemeButton from '../theme-button/theme-button';

type Link = {
  href: string;
  title: string;
};

type Route = {
  title: string;
  links: Link[];
};

const routes: Route[] = [
  {
    title: 'Models',
    links: [
      { title: 'All Models', href: '/models' },
      { title: 'Categories', href: '/models/categories' },
    ],
  },
  {
    title: 'Materials',
    links: [
      { title: 'All Materials', href: '/materials' },
      { title: 'Categories', href: '/materials/categories' },
    ],
  },
  {
    title: 'HDRIS',
    links: [
      { title: 'All HDRIS', href: '/hdris' },
      { title: 'Categories', href: '/hdris/categories' },
    ],
  },
];

const isHidden = (index: number, activeIndex: number) => {
  return activeIndex === index;
};

const Navbar = () => {
  const [activeLink, setActiveLink] = useState(NaN);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleActiveLink = (index: number) => {
    if (index === activeLink) return setActiveLink(NaN);
    setActiveLink(index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveLink(NaN);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className='w-full shadow-md'>
      <ul className='w-[60%] m-auto flex gap-8 py-6 relative items-center'>
        {routes.map((route, i) => {
          return (
            <li key={route.title}>
              <div>
                <div
                  className='flex justify-between items-center gap-3 cursor-pointer'
                  onMouseOver={() => handleActiveLink(i)}
                  ref={containerRef}>
                  <p>{route.title}</p>
                  <FaAngleDown />
                </div>
                <AnimatePresence>
                  {isHidden(i, activeLink) && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className='absolute flex flex-col gap-4 py-2 pl-4 pr-10 top-16 shadow-2xl bg-secondary rounded '>
                      {route.links.map((link) => {
                        return (
                          <Link href={link.href} key={link.href}>
                            {link.title}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
        <ThemeButton className='ml-auto cursor-pointer text-xl' />
        <Link href='/login'>
          <Button>Sign In</Button>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
