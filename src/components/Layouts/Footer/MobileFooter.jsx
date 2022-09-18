import React from "react";
import { NavLink } from "react-router-dom";
import {
  AiOutlineHome,
  AiFillHeart,
  AiOutlineHeart,
  AiFillPlusCircle,
} from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { FiPhone } from "react-icons/fi";
const MobileFooter = () => {
  return (
    // First div container for footer
    <div className='bg-white dark:bg-[#242426] lg:hidden sticky bottom-0 z-50 w-full h-[60px] flex items-center '>
      <div className=' flex justify-between mx-auto w-full sm:w-[540px] pl-6 pr-6 dark:bg-[#242426] dark:text-white'>
        {/* HOME */}
        <NavLink to='/'>
          <div className='flex flex-col items-center justify-end pb-2 text-xs font-medium text-center cursor-pointer'>
            <AiOutlineHome className='mb-1 text-xl' />
            Əsas
          </div>
        </NavLink>
        {/* SELECTED ADDS */}
        <NavLink to='/favourites'>
          <div className='flex flex-col items-center justify-end pb-2 text-xs font-medium text-center cursor-pointer'>
            <AiOutlineHeart className='mb-1 text-xl hover:fill-red-500' />
            Seçilmişlər
          </div>
        </NavLink>
        {/* NEW ADD */}
        <NavLink to='/newannouncement'>
          <div className='flex flex-col items-center justify-end pb-2 text-xs font-medium text-center cursor-pointer'>
            <AiFillPlusCircle className='mb-1 text-5xl border-4 border-[#f3f7fc] dark:border-[#1c1c1e] rounded-full -mt-7 text-green-500' />
            <div className='text-green-500'>Yeni Elan</div>
          </div>
        </NavLink>
        {/* PROFILE */}
        <NavLink to='/user/profile'>
          <div className='flex flex-col items-center justify-end pb-2 text-xs font-medium text-center cursor-pointer'>
            <CgProfile className='mb-1 text-xl' />
            Profil
          </div>
        </NavLink>
        {/* CONTACT */}
        <NavLink to='/contact'>
          <div className='flex flex-col items-center justify-end pb-2 text-xs font-medium text-center cursor-pointer'>
            <FiPhone className='mb-1 text-xl' />
            Əlaqə
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default MobileFooter;
