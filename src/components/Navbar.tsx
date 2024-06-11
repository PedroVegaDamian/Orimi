import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import Logo from '@/assets/logo.svg';
import IconBag from '@/assets/icons/icon_bag.svg';
import IconHamburger from '@/assets/icons/icon_burger_black.svg';
import IconArrow from '@/assets/icons/icon_arrow_right_black.svg';
import IconArrowColor from '@/assets/icons/icon_arrow_right_color.svg';

import { RenderLinkUser } from '@/components/RenderLinkUser';

import { useCartStore } from '@/store/cartStore'; 
import { useUserStore } from '@/store/userStore';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const cartItemsCount = useCartStore((state) => state.cart.length);
  const { user } = useUserStore();

  useEffect(() => {
    const userId = user?.id;
    if (userId) {
      useCartStore.getState().loadCart(userId);
    } else {
      useCartStore.getState().clearCart();
    }
  }, [user]);

  const isActiveLink = (path : string) => location.pathname === path;

  return (
    <header className="bg-white_color flex justify-between items-center h-[107px] p-6 font-nunito sticky z-10 top-0 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)] ">
      {/* mobile */}
      <div className="flex items-center lg:hidden justify-between w-full">
        <img
          src={IconHamburger}
          alt="Hamburger Icon"
          className="cursor-pointer w-[30px] h-[30px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <Link 
          to="/" 
          className="mx-4 text-center" 
          onClick={() => setIsMenuOpen(false)}>
          <img src={Logo} alt="Oromi Logo" />
        </Link>
        <Link 
          to="/cart" 
          className="text-right w-[30px] h-[30px] relative"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={IconBag} alt="Bag Icon" />
          {cartItemsCount > 0 && (
            <span className="bg-primary_800_color text-white_color rounded-full w-3 h-3 text-[9px] pt-[2px] flex items-center justify-center absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>

      <Link to="/" className="hidden lg:block">
        <img src={Logo} alt="Oromi Logo" />
      </Link>

      <nav className={`lg:flex lg:gap-[20px] lg:items-center lg:ml-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 shadow-[0_4px_4px_0_rgba(0,0,0,0.15)]' : 'hidden lg:opacity-100 lg:shadow-none'} absolute lg:static top-[107px] left-0 right-0 bg-white_color lg:bg-transparent w-full pl-[50px] pt-[24px] pb-[24px] pr-[20px]`}>
        <div className="lg:flex lg:justify-end lg:w-full">
          <Link to="/" className={`flex items-center justify-between mb-[15px] lg:mb-0 lg:mr-[30px] ${isActiveLink('/') ? 'text-primary_800_color font-bold' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Home <img className={`lg:hidden ${isActiveLink('/') ? '_color' : ''}`} src={isActiveLink('/') ? IconArrowColor : IconArrow} alt="Arrow Right Icon" />
          </Link>
          <Link to="/products" className={`flex items-center justify-between mb-[15px] lg:mb-0 lg:mr-[30px] ${isActiveLink('/products') ? 'text-primary_800_color font-bold' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Products <img className={`lg:hidden ${isActiveLink('/products') ? '_color' : ''}`} src={isActiveLink('/products') ? IconArrowColor : IconArrow} alt="Arrow Right Icon" />
          </Link>
          <Link to="/about" className={`flex items-center justify-between mb-[15px] lg:mb-0 lg:mr-[30px] ${isActiveLink('/about') ? 'text-primary_800_color font-bold' : ''}`} onClick={() => setIsMenuOpen(false)}>
            About <img className={`lg:hidden ${isActiveLink('/about') ? 'IconArrowColor' : ''}`} src={isActiveLink('/about') ? IconArrowColor : IconArrow} alt="Arrow Right Icon" />
          </Link>
          <Link to="/contact" className={`flex items-center justify-between mb-[15px] lg:mb-0 lg:mr-[30px] ${isActiveLink('/contact') ? 'text-primary_800_color font-bold' : ''}`} onClick={() => setIsMenuOpen(false)}>
            Contact <img className={`lg:hidden ${isActiveLink('/contact') ? '_color' : ''}`} src={isActiveLink('/contact') ? IconArrowColor : IconArrow} alt="Arrow Right Icon" />
          </Link>
          <RenderLinkUser className="flex items-center justify-between mb-[15px] lg:mb-0" onClick={() => setIsMenuOpen(false)} />
        </div>
      </nav>

      {/* Cart icon for desktop only */}
      <Link to="/cart" className="hidden lg:flex items-center justify-between mb-[15px] mt-[10px] relative" onClick={() => setIsMenuOpen(false)}>
        <img src={IconBag} alt="Carrito Icon" />
        {cartItemsCount > 0 && (
          <span className="bg-primary_800_color text-white_color rounded-full w-3 h-3 text-[9px] pt-[2px] flex items-center justify-center absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 ">
            {cartItemsCount}
          </span>
        )}
      </Link>
    </header>
  );
};

export default Navbar;
