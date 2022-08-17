import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Layouts/Navbar/Navbar";
import MobileNavbar from "../components/Layouts/Navbar/MobileNavbar";
import MobileFooter from "../components/Layouts/Footer/MobileFooter";
import Footer from "../components/Layouts/Footer/Footer"
import { useSelector } from "react-redux";
const MainLayout = () => {
    const toggle = useSelector((state) => state.toggle.value);
  return (
    <>
    <MobileNavbar /> 
    <div className={`h-screen w-screen overflow-x-hidden dark:bg-[#1C1C1E]  ${!toggle ? 'blur-sm lg:blur-0': ''} `}>
      <Navbar />
      <div className='h-4/5 bg-[#F3F7FC] dark:bg-[#1C1C1E] flex justify-center items-center'>
        <Outlet/>
      </div>
    <MobileFooter/>
    <Footer/>
    </div>
     </>
  );
};

export default MainLayout;
