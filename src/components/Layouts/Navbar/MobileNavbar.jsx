import React from "react";
import "../../../style/darkmodeAnimate.scss";
// REDUX
import { setToggle } from "../../../redux/reducers/toggleSlice";
import { useDispatch, useSelector } from "react-redux";
// REACT ROUTER
import { NavLink } from "react-router-dom";
// HOOK
import useDarkMode from "../../../hooks/UseDarkMode";
// -------
// ICONS
import { IoMdClose } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineStar } from "react-icons/ai";
import { GiScales } from "react-icons/gi";
import { RiGuideFill } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";

// Language
import { useTranslation } from "react-i18next";
const MobileNavbar = () => {
  const dispatch = useDispatch();
  const toggle = useSelector((state) => state.toggle.value);
  const name = useSelector((state) => state.auth.name);
  const [setTheme, colorTheme] = useDarkMode();

  const { t, i18n } = useTranslation();
  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div
      className={` lg:hidden absolute z-50 w-[90%] sm:w-4/5 h-full  bg-red-500 dark:bg-[#232325] text-white transition-all
      ${toggle ? "hidden" : ""}  `}
    >
      <div className='w-3/4 mx-auto'>
        <div className='flex justify-between mt-8'>
          <div className="overflow-auto">
            <button
              onClick={() => clickLanguage("en")}
              className='w-12 h-10 mr-2 mb-2 border'
            >
              en
            </button>
            <button
              onClick={() => clickLanguage("az")}
              className='w-12 h-10 mr-2 mb-2 border'
            >
              az
            </button>
            <button
              onClick={() => clickLanguage("ru")}
              className='w-12 h-10 mr-2 border'
            >
              ru
            </button>
          </div>
          {/* DARK MODE ICON */}
          <div className='dark-mode-Icon '>
            <input
              id='toggle'
              className='toggle'
              type='checkbox'
              onClick={() => setTheme(colorTheme)}
            />
          </div>
          {/* CLOSE ICON */}
          <button className="flex items-start dark:text-white" onClick={() => dispatch(setToggle())}>
            <IoMdClose className='w-8 h-8 dark:fill-white' />
          </button>
        </div>
        {/* --------------------------------------------------------------------- */}
        <ul className='mt-10'>
          <li className='flex items-center'>
            <CgProfile className='w-8 h-8 mr-2' />

            {name ? 
            <NavLink to="/user/profile">
              {name}
            </NavLink>
            :<div>
            <NavLink to='/login' className={"mx-2"}>
              {t("Login.1")}
            </NavLink>
            <span>/</span>
            <NavLink to='/register' className={"mx-2"}>
              {t("Register.1")}
            </NavLink>
          </div>}

          </li>
          <li>
            <AiOutlineStar />
            <NavLink to="favourites">Sevimlilər</NavLink>
          </li>
          {/* favourites */}
          <li>
            <GiScales />
            Müqayisələr
          </li>
          <li>
            <RiGuideFill />
            Bələdçi
          </li>
          <li>
            <FiPhone />
            Əlaqə
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNavbar;
