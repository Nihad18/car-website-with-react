import React from "react";
import { NavLink, Outlet } from "react-router-dom";
const User = () => {
  return (
    <div
      className='lg:border flex flex-col w-full sm:w-[540px] mx-auto px-6
    bg-white text-black dark:bg-[#242426] dark:text-white lg:min-w-[910px] lg:min-h-[380px]'
    >
      {/*---- SIDEBAR--------- */}
      <div className='lg:border-b flex'>
          <div className='w-48 h-7 border-r'> 
        <NavLink to='/user/profile' 
        className={({isActive}) =>
        isActive 
        ? "bg-red-500 text-white dark:bg-white dark:text-black flex px-4 py-[2px]" 
        : "hover:bg-red-100 dark:hover:bg-slate-500 flex px-4 py-[2px]"}>
            Profil
         </NavLink>
        </div>
         <div className='w-48 h-7 ml-5'>
          <NavLink to='/user/advertisements' className={({isActive}) => isActive 
          ? "bg-red-500 text-white dark:bg-white dark:text-black flex px-4 py-[2px]" 
          : "hover:bg-red-100 dark:hover:bg-slate-500 flex px-4 py-[2px]"}>Elanlarım
          </NavLink>
        </div>
      </div>
      {/*--------------------------*/}
      <Outlet/>
    </div>
  );
};

export default User;
