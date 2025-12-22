'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';
import classNames from 'classnames';
import ThemeToggle from './ThemeToggle';

const NavBar = () => {
  const pathname = usePathname();

  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues' },
  ];
  return (
    <>
      <nav className='flex h-14 items-center justify-between border-b mb-5 px-5'>
        <div className='flex items-center space-x-6'>
          <Link href='/'>
            <AiFillBug className='text-blue-500' />
          </Link>

          <ul className='flex space-x-6'>
            {links.map((link) => (
              <Link
                href={link.href}
                className={classNames({
                  'text-zinc-900 font-semibold dark:text-zinc-100':
                    pathname === link.href,
                  'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100':
                    pathname !== link.href,
                  'hover:text-zinc-900 dark:hover:text-zinc-100': true,
                })}
                key={link.href}
              >
                {link.name}
              </Link>
            ))}
          </ul>
        </div>
        <ThemeToggle />
      </nav>
    </>
  );
};

export default NavBar;
