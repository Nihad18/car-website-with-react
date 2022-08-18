import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaTelegramPlane,
} from "react-icons/fa";

const Footer = () => {
  const year=new Date().getFullYear();
  return (
    <div className='hidden lg:flex items-center lg:bg-[#081A3E] dark:bg-[#242426] lg:text-white w-full h-64'>
      <div className='flex justify-between items-start pl-6 pr-6 mx-auto w-[960px] xl:min-w-[1250px]'>
        {/*---ABOUT---------------- ----------------------------------------------------------------------------- */}
        <div className='grid-cols-7'>
          <div className='text-4xl mb-4'>
            <NavLink to='/'>Car.az</NavLink>
          </div>
          <div className='max-w-[400px] text-sm mb-3'>
            Avtomobil dünyası və car.az platforması haqqında xəbərlərə abunə ol
          </div>
          <form onSubmit={(e)=>e.preventDefault()} className="mb-3 max-w-[420px]">
            <input className="bg-[#181A1B] h-[34px] mr-5 placeholder:pl-3" type='email' placeholder='E-mail' />
            <button className="h-[34px] bg-green-500 px-3">Abunə ol</button>
          </form>
          <div> © {year} Car.az Developed by{" "}
            <a className="border-b pb-1 hover:text-blue-600" href='https://nihadbalakisiyev.netlify.app/ '  target='_blank' rel='noreferrer noopener'>Nihad</a>{" "}
            and{" "}
            <a className="border-b pb-1 hover:text-blue-600" href='https://github.com/Ayxan-z '  target='_blank' rel='noreferrer noopener'>Ayxan</a>
          </div>
        </div>
        {/* ---USEFUL LINKS----------------------------------------------------------------------------------------- */}
        <div className='grid-cols-3'>
          <div className="text-xl mb-4">Faydalı linklər</div>
          <div className="mb-3">Qaydalar</div>
          <div className="mb-3">İstifadəçi razılaşması</div>
          <div className="mb-3">Məxfilik siyasəti</div>
        </div>
        {/*--SOSIAL MEDIA ACCOUNTS -------------------------------------------------------------------------------------------*/}
        <div className='grid-cols-2'>
          <div className="text-xl mb-4">Sosial media hesabları</div>
          <div className='flex'>
            <a className="w-[34px] h-[34px] border rounded-[4px] hover:bg-blue-500 mr-3 flex items-center justify-center" href='https://www.facebook.com/ ' target='_blank' rel='noreferrer noopener' >
              <FaFacebookF />
            </a>
            <a className="w-[34px] h-[34px] border rounded-[4px] hover:bg-blue-500 mr-3 flex items-center justify-center" href='https://www.instagram.com/ ' target='_blank' rel='noreferrer noopener' >
              <FaInstagram />
            </a>
            <a className="w-[34px] h-[34px] border rounded-[4px] hover:bg-blue-500 mr-3 flex items-center justify-center" href='https://www.tiktok.com/ ' target='_blank' rel='noreferrer noopener' >
              <FaTiktok   />
            </a>
            <a className="w-[34px] h-[34px] border rounded-[4px] hover:bg-blue-500 flex items-center justify-center" href='https://web.telegram.org/k/'  target='_blank' rel='noreferrer noopener'>
              <FaTelegramPlane  />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
