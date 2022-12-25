import {useEffect} from "react"
import { NavLink } from "react-router-dom";
import { AiOutlineMenu, AiFillHeart} from "react-icons/ai";
import { VscSettings } from "react-icons/vsc";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { MyAccount } from "./MyAccount";
// import Select from "react-select";
import SimpleSelect from "../../Select/SimpleSelect";
// Redux
import { setToggle} from "../../../redux/reducers/toggleSlice";
import { useSelector,useDispatch } from "react-redux";

//**DARK MODE ANIMATION ICON CSS------------
import "../../../style/darkmodeAnimate.scss";

//------Hook----------------
import useDarkMode from "../../../hooks/UseDarkMode";

// Language
import { useTranslation } from "react-i18next";
import { changeLanguage } from "i18next";
const Navbar = () => {
  const dispatch = useDispatch();
  const options = [
    { value: "az", label: "az" },
    { value: "en", label: "en" },
    { value: "ru", label: "ru" },
  ];
  const [setTheme, colorTheme] = useDarkMode();

  const { t, i18n } = useTranslation();
  const token = useSelector(state=>state.auth.value);
  const language = useSelector(state=>state.toggle.language);
  useEffect(()=>{
    changeLanguage(language);
  },[language])
  return (
    <>
      <div
        className='flex justify-between items-center h-[60px] w-full sm:w-[540px] pl-6 pr-6 mx-auto 
         lg:bg-[#081A3E] dark:bg-[#242426] lg:text-white lg:h-[90px] lg:min-w-[960px] xl:min-w-[1250px] z-50'>{/*desktop*/}

        {/* ------MOBILE MENU--------------------------------------- */}
        <button onClick={() => dispatch(setToggle())}>
          <AiOutlineMenu className='text-xl lg:hidden dark:text-white' />
        </button>

        <div className='text-3xl lg:text-4xl dark:text-white'>
          <NavLink to='/'>Car.az</NavLink>
        </div>

        <button>
          <VscSettings className='text-xl lg:hidden dark:text-white' />
        </button>

        {/*---------DEKSTOP MENU---------------------- */}
        {/*!---FAVORITES---------- */}
        <div className='container hidden items-center justify-end lg:flex'>
          <NavLink to={`/favourites`}>
          <Tooltip title='Hearts' className='mx-4'>
            <IconButton>
              <AiFillHeart className='fill-white hover:fill-red-500' />
            </IconButton>
          </Tooltip>
          </NavLink>
          {/*----------NEW ANNOUNCEMENT */}
          <div className='mx-4 bg-green-500 w-20 h-8 rounded flex items-center justify-center'>
            <NavLink to='/newpost'>Yeni elan</NavLink>
          </div>
          
          {
            token ? <MyAccount/>
            : <div className='register mx-4 bg-red-500 w-20 h-8 rounded flex items-center justify-center'>
              <NavLink to='/login'>{t("Login.1")}</NavLink>
              </div>
          }

          {/* -------LANGUAGE SELECT------------ */}
          <SimpleSelect
            options={options}
            defaultValue={"az"}
            lang={true}
            containerClassName={"w-[85px]"}
            inputClassName={"h-[40px] bg-[#081A3E] text-white dark:text-white"}
          />

          {/* DARK MODE ICON */}
          <div className='dark-mode-Icon mx-4'>
            <input
              id='toggle'
              className='toggle'
              type='checkbox'
              onClick={() => setTheme(colorTheme)}
            />
          </div>
          {/* --------------------- */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
