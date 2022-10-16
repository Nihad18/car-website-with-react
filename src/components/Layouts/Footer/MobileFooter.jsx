import React,{useState,useEffect} from "react";
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
  const [scrool, setScroll] =useState(true)

  useEffect(() =>{
    // window.onwheel = e => {
    //   if(e.deltaY >= 0){
    //     // Scrolling Down with mouse
    //     setScroll(false)
    //     console.log("down",scrool)
    //   } else {
    //     // Scrolling Up with mouse
    //     setScroll(true)
        
    //     console.log("up",scrool)
    //   }
    // }
    window.ontouchend=e=>{
      if(e.changedTouches[0].clientY>0){
        // Scrolling Down with mouse
        setScroll(true)
        // console.log("up",scrool,"--",e.changedTouches[0].clientY)
      } 
    window.ontouchmove = e => {
      if(e.touches[0].clientY >= 200){
        // Scrolling Down with mouse
        setScroll(false)
        // console.log("down",scrool,"--",e.touches[0].clientY)
      }
    }
    }
  },[scrool])
  return (
    <div className={`${scrool===false ? 'hidden' : 'block'} transition-all lg:hidden h-[60px] flex items-center justify-center`}>
      <div className='z-50 fixed bottom-0 dark:bg-[#242426] dark:text-white bg-white w-full'>
      <div className=' flex justify-between mx-auto w-full sm:w-[540px] pl-6 pr-6'>
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
        <NavLink to='/newpost'>
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
  </div>
  );
};

export default MobileFooter;
