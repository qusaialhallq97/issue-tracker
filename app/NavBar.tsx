import Link from 'next/link';
import React from 'react';
import { AiFillBug } from 'react-icons/ai';

const NavBar = () => {
  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Issues', href: '/issues' },
  ];
  return (
    <>
      <nav className='flex space-x-6 border-b mb-5 px-5 h-14 items-center'>
        <Link href='/'>
          <AiFillBug className='text-blue-500' />
        </Link>

        <ul className=' flex space-x-6 '>
          {links.map((link) => (
            <Link
              href={link.href}
              className='text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors duration-300'
            >
              {link.name}
            </Link>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
