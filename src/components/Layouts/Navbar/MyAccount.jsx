import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Popup from "reactjs-popup";
import { AiOutlineHome, AiOutlineClose } from "react-icons/ai";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import Photo from "../../../images/profileImg.png";
//**MODAL POP UP CSS-------------
import "../../../style/modal-popup.scss";

import {useSelector,useDispatch} from 'react-redux'
import { setAuth,setName } from "../../../redux/reducers/authSlice";
import axios from "axios"
import {useNavigate} from 'react-router-dom'

// Remove Cooike
import RemoveCookie from "../../../hooks/RemoveCookie"

export const MyAccount = () => {
  const url=process.env.REACT_APP_API_URL
  const name=useSelector((state)=>state.auth.name)
  // const token = localStorage.getItem("token");
  const token = useSelector((state)=>state.auth.value)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get(`${url}/api/account/detail/`,{
          headers: {Authorization: `Bearer ${token}`}
    }).then(response=>(dispatch(setName(response?.data?.name))))
    .catch(err=>console.error(err))}
    ,[])
 
  const logOut=()=>{  
    // dispatch(setAuth(localStorage.removeItem("token")))
    dispatch(setAuth(RemoveCookie("token")))
    // localStorage.removeItem("refreshToken")
    RemoveCookie("refreshToken")
    navigate("/")
    }  
  return (
    <>
      <div className='group bg-red-600 hover:bg-[#181A1B] text-white rounded px-3 relative'>
        <div className='flex items-center min-w-[110px] h-8 cursor-pointer'>
          <AiOutlineHome className='text-xl mr-1 ' />
          Profilim
          <RiArrowDownSLine className='group-hover:hidden text-xl mt-1 ml-2' />
          <RiArrowUpSLine className='hidden group-hover:block text-xl mt-1 ml-2 ' />
        </div>
        <div className='hidden group-hover:block hover:block bg-white text-black hover:text-red-600 dark:bg-[#181A1B] dark:text-white min-w-[250px] min-h-[150px] rounded absolute -ml-3 px-3 py-3 z-50'>
          <NavLink to='/user/profile' className='flex items-center'>
            <div className='w-12 h-12 mr-2'>
              <img
                style={{ borderRadius: "50%", objectFit: "cover" }}
                src={Photo}
                alt={Photo}
              />
            </div>
            <div>{name}</div>
          </NavLink>
          {/*-------POP UP----------*/}
        
         <Popup
            trigger={<button className='bg-red-500 text-white hover:bg-red-400 p-1 my-2 min-w-[50px] min-h-[20px] rounded flex items-center cursor-pointer'>Hesabdan çıx</button>}
            modal
          >
            {(close) => (
              <div className='modal bg-white dark:bg-[#181A1B]'>
                <button className='close' onClick={close}>
                  <AiOutlineClose className='close__icon fill-black dark:fill-white' />
                </button>
                <div className='mb-4 text-2xl font-bold text-[#263238] dark:text-white'>
                  Hesabdan çıxmaq istədiyinizə əminsiz ?
                </div>
                <button onClick={()=>{logOut();close()}} className='bg-red-500 text-white hover:bg-red-300 p-1 mx-auto min-w-[100px] min-h-[24px] rounded flex items-center justify-center'>
                  Əminəm
                </button>
              </div>
            )}
          </Popup>
          {/*--------------------------------------------------*/}
        </div>
      </div>
    </>
  );
};
