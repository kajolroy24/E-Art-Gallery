import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='sticky top-0 left-0 right-0 z-20 bg-white shadow-md'>
      <div className='flex items-center justify-between py-3 px-4 sm:py-5 sm:px-8 font-bold'>
        <Link to='/'>
          <img src={assets.logo} className='w-32 sm:w-40' alt="brand logo" />
        </Link>

        {/* Responsive UL Navigation */}
        <ul className='hidden sm:flex gap-4 md:gap-6 lg:gap-8 text-sm md:text-base text-gray-800'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              isActive
                ? 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-full font-bold shadow-lg'
                : 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-teal-500 text-white rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-yellow-500 shadow-lg'
            }
          >
            <span>HOME</span>
          </NavLink>
          <NavLink
            to='/collection'
            className={({ isActive }) =>
              isActive
                ? 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-full font-bold shadow-lg'
                : 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-teal-500 text-white rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-yellow-500 shadow-lg'
            }
          >
            <span>COLLECTION</span>
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) =>
              isActive
                ? 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-full font-bold shadow-lg'
                : 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-teal-500 text-white rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-yellow-500 shadow-lg'
            }
          >
            <span>ABOUT US</span>
          </NavLink>
          <NavLink
            to='/contact'
            className={({ isActive }) =>
              isActive
                ? 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-yellow-500 text-black rounded-full font-bold shadow-lg'
                : 'relative flex items-center justify-center px-3 py-2 md:px-4 md:py-2 bg-teal-500 text-white rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:bg-yellow-500 shadow-lg'
            }
          >
            <span>CONTACT US</span>
          </NavLink>
        </ul>

        <div className='flex items-center gap-4 md:gap-6'>
          <NavLink
            to='/community'
            className={({ isActive }) =>
              isActive
                ? 'relative flex items-center justify-center px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-black rounded-full font-bold shadow-lg'
                : 'relative flex items-center justify-center px-2 py-1 md:px-3 md:py-1 bg-yellow-500 text-white rounded-full hover:bg-teal-500 shadow-lg'
            }
          >
            <span>Join</span>
          </NavLink>

          <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-4 md:w-5 cursor-pointer' alt="search icon" />

          <div className='relative group'>
            <img onClick={() => token ? null : navigate('/login')} src={assets.profile_icon} className='w-4 md:w-5 cursor-pointer' alt="profile icon" />
            {token && (
              <div className='group-hover:block hidden absolute right-0 px-4 pt-4'>
                <div className='flex flex-col gap-1 md:gap-2 w-28 md:w-36 py-2 md:py-3 px-3 md:px-5 bg-yellow-500 text-white rounded'>
                  {/* <p onClick={() => navigate('/profile')} className='cursor-pointer hover:text-black'>My Profile</p> */}
                  <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                  <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
                </div>
              </div>
            )}
          </div>

          <Link to='/cart' className='relative'>
            <img src={assets.cart_icon} className='w-4 md:w-5 min-w-4 md:min-w-5' alt="cart icon" />
            <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-teal-600 text-white aspect-square rounded-full text-[8px]'>
              {getCartCount()}
            </p>
          </Link>

          <img onClick={() => setVisible(true)} src={assets.menu_icon} className='w-4 md:w-5 cursor-pointer sm:hidden mx-3 md:mx-5' alt="menu bar icon" />
        </div>
      </div>

      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all duration-300 overflow-hidden ${visible ? 'w-full' : 'w-0'} z-30`}>
        <div className='flex flex-col text-gray-600 h-full'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
            <img src={assets.dropdown_icon} className='h-4 rotate-180' alt="dropdown icon" />
            <p>Back</p>
          </div>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/'>HOME</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/collection'>COLLECTION</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/about'>ABOUT US</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/contact'>CONTACT US</NavLink>
          <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border' to='/community'>Join</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
