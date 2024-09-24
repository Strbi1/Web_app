import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

import logoImg from '../assets/logo.png';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const { logout, user } = useAuthStore();

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]);

  return (
    <nav className='navbar' id='navbar'>
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link
            to='/'
            className='navbar-brand flex'
            onClick={() => setToggleMenu(false)}
          >
            <img src={logoImg} alt='site logo' className='navbar-logo' />
            <span className='text-uppercase fw-7 fs-24 ls-1'>openlibrary</span>
          </Link>
          <button
            type='button'
            className='navbar-toggler-btn'
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{
                color: `${toggleMenu ? '#fff' : '#010101'}`,
              }}
            />
          </button>
        </div>

        <div
          className={
            toggleMenu
              ? 'navbar-collapse show-navbar-collapse'
              : 'navbar-collapse'
          }
        >
          <ul className='navbar-nav'>
            <li className='nav-item' onClick={handleNavbar}>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link text-uppercase text-white fs-22 fw-6 ls-1 link-active'
                    : 'nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                }
              >
                home
              </NavLink>
            </li>
            <li className='nav-item' onClick={handleNavbar}>
              <NavLink
                to='/books'
                className={({ isActive }) =>
                  isActive
                    ? 'nav-link text-uppercase text-white fs-22 fw-6 ls-1 link-active'
                    : 'nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                }
              >
                books
              </NavLink>
            </li>
            {isLoggedIn && (
              <li className='nav-item' onClick={handleNavbar}>
                <NavLink
                  to='/reservations'
                  className={({ isActive }) =>
                    isActive
                      ? 'nav-link text-uppercase text-white fs-22 fw-6 ls-1 link-active'
                      : 'nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                  }
                >
                  reservations
                </NavLink>
              </li>
            )}
            <li className='nav-item' onClick={handleNavbar}>
              {isLoggedIn ? (
                <Link
                  to='/login'
                  onClick={logout}
                  className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                >
                  Logout
                </Link>
              ) : (
                <NavLink
                  to='/login'
                  className={({ isActive }) =>
                    isActive
                      ? 'nav-link text-uppercase text-white fs-22 fw-6 ls-1 link-active'
                      : 'nav-link text-uppercase text-white fs-22 fw-6 ls-1'
                  }
                >
                  login
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
