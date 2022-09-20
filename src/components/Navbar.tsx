import Logout from './entry/Logout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [menuStatus, toggleMenuStatus] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='bg-cyan-400 p-8'>
      <section className='MOBILE-MENU md:hidden'>
        <div className='flex justify-between'>
          <div>
            <span className='font-bold text-white hover:cursor-default'>Rx Mate</span>
          </div>
          <div className='HAMBURGER-ICON space-y-2 hover:cursor-pointer' onClick={() => toggleMenuStatus(!menuStatus)}>
            <span className='block h-0.5 w-8 animate-pulse bg-gray-600'></span>
            <span className='block h-0.5 w-8 animate-pulse bg-gray-600'></span>
            <span className='block h-0.5 w-8 animate-pulse bg-gray-600'></span>
          </div>
        </div>

        <div className={menuStatus ? 'showMenu' : 'hideMenu'}>
          <div className='CROSS-ICON absolute top-0 right-0 p-8' onClick={() => toggleMenuStatus(!menuStatus)}>
            <svg
              className='h-8 w-8 text-gray-600 hover:cursor-pointer'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
          <ul className='MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-between min-h-[250px]'>
            <li className='border-b border-gray-400 my-8 hover:border-white'>
              {
                location.pathname === '/dashboard'
                  ? <span
                      className='cursor-default font-bold text-white'
                    >
                      Dashboard
                    </span>
                  : <span
                      className='cursor-pointer hover:text-white'
                      onClick={() => { navigate('/dashboard') }}
                    >
                      Dashboard
                    </span>
              }
            </li>
            <li className='border-b border-gray-400 my-8 hover:border-white'>
              {
                location.pathname === '/history'
                  ? <span
                      className='cursor-default font-bold text-white'
                    >
                      History
                    </span>
                  : <span
                      className='cursor-pointer hover:text-white'
                      onClick={() => { navigate('/history') }}
                    >
                      History
                    </span>
              }
            </li>
            <li className='border-b border-gray-400 my-8 hover:border-white'>
              {
                location.pathname === '/profile'
                  ? <span
                      className='cursor-default font-bold text-white'
                    >
                      Profile
                    </span>
                  : <span
                      className='cursor-pointer hover:text-white'
                      onClick={() => { navigate('/profile') }}
                    >
                      Profile
                    </span>
              }
            </li>
            <li className='border-b border-gray-400 my-8 hover:border-white'>
              <Logout />
            </li>
          </ul>
        </div>
      </section>

      <ul className='DESKTOP-MENU hidden space-x-8 md:flex justify-between'>
        <li className='font-bold text-white hover:cursor-default'>Rx Mate</li>
        <li className='flex'>
          {
            location.pathname === '/dashboard'
              ? <span
                  className='cursor-default pr-8 font-bold text-white'
                >
                  Dashboard
                </span>
              : <span
                  className='cursor-pointer pr-8 hover:text-white'
                  onClick={() => { navigate('/dashboard') }}
                >
                  Dashboard
                </span>
          }
          {
            location.pathname === '/history'
              ? <span
                  className='cursor-default pr-8 font-bold text-white'
                >
                  History
                </span>
              : <span
                  className='cursor-pointer pr-8 hover:text-white'
                  onClick={() => { navigate('/history') }}
                >
                  History
                </span>
          }
          {
            location.pathname === '/profile'
              ? <span
                  className='cursor-default pr-8 font-bold text-white'
                >
                  Profile
                </span>
              : <span
                  className='cursor-pointer pr-8 hover:text-white'
                  onClick={() => { navigate('/profile') }}
                >
                  Profile
                </span>
          }
          <Logout />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;