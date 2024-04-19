import { Link } from 'react-router-dom'

import Logo from '@/assets/logo.svg'
import IconBag from '@/assets/icons/icon_bag.svg'
import IconUser from '@/assets/icons/icon_user.svg'
import IconHeart from '@/assets/icons/icon_heart.svg'
import IconSearch from '@/assets/icons/icon_search.svg'
import IconFlagSpain from '@/assets/icons/icon_flag_spain.svg'

export const Navbar = () => {
  return (
    <header className="bg-white_color flex justify-between items-center h-[107px] px-16 font-nunito shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sticky z-10">
      <Link to="/">
        <img src={Logo} alt="Oromi Logo" />
      </Link>

      <nav className="flex gap-[46px]">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        <img className="cursor-pointer" src={IconSearch} alt="Search Icon" />

        <Link className="inline-flex" to="/login">
          <img src={IconUser} alt="User Icon" />
        </Link>
        <Link className="inline-flex" to="/favorites">
          <img src={IconHeart} alt="Heart Icon" />
        </Link>
        <Link className="inline-flex" to="/cart">
          <img src={IconBag} alt="Bag Icon" />
        </Link>

        <img
          src={IconFlagSpain}
          alt="Spain Flag Icon"
          className="cursor-pointer"
        />
      </nav>
    </header>
  )
}
