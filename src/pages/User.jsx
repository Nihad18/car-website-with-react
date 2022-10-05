import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const User = () => {
  return (
    <div
      className='lg:border flex flex-col w-full sm:w-[540px] mx-auto 
    bg-white text-black dark:bg-[#242426] dark:text-white lg:min-w-[910px] lg:min-h-[380px]'
    >
      {/*---- SIDEBAR--------- */}
      <div className="lg:flex">
      <div className='flex lg:flex-col lg:border-r'>
          <div className='w-32 lg:w-48 h-10 lg:border-b'> 
            <NavLink to='/user/profile' className={({isActive}) => isActive 
              ? "bg-red-500 text-white dark:bg-white dark:text-black flex px-4 py-[2px] lg:py-[8px]" 
              : "hover:bg-red-100 dark:hover:bg-slate-500 border lg:border-none flex px-4 py-[1px] lg:py-[8px]"}>
              Profil
            </NavLink>
          </div>
          <div className='w-32 lg:w-48  h-10'>
            <NavLink to='/user/passwordchange' className={({isActive}) => isActive 
              ? "bg-red-500 text-white dark:bg-white dark:text-black flex px-4 py-[2px] lg:py-[8px]" 
              : "hover:bg-red-100 dark:hover:bg-slate-500 border lg:border-none flex px-4 py-[1px] lg:py-[8px]"}>
              Şifrəni yenilə
          </NavLink>
          </div>
          <div className='w-32 lg:w-48 h-10 lg:border-b lg:border-t'>
            <NavLink to='/user/myposts' className={({isActive}) => isActive 
              ? "bg-red-500 text-white dark:bg-white dark:text-black flex px-4 py-[2px] lg:py-[8px]" 
              : "hover:bg-red-100 dark:hover:bg-slate-500 border lg:border-none flex px-4 py-[1px] lg:py-[8px]"}>
              Elanlarım
          </NavLink>
          </div>
      </div>
      {/*--------------------------*/}
      <div className="lg:w-full"><Outlet/></div>
      </div>
    </div>
  );
};

export default User;
