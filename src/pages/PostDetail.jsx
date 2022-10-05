import React, { useState, useEffect } from "react";
// *ICONS----------------------------------
import { AiOutlineHome, AiOutlineEye, AiOutlineCalendar,AiOutlineClose} from "react-icons/ai";
import { RiArrowRightSLine, RiDeleteBin6Line } from "react-icons/ri";
import { FiPhone } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
// *Redux------------------------------------
import { useSelector, useDispatch } from "react-redux";
import {
  setPostDetail,
  setPostDetailImages,
} from "../redux/reducers/postSlice";

import axios from "axios";
import Slider from "../components/Slider/SwiperSlider";
import ProfileImg from "../images/profileImg.png";

import Popup from "reactjs-popup";
import "../style/modal-popup.scss";
import {useNavigate} from "react-router";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const PostDetail = () => {
  const url=`https://ayxan0314.pythonanywhere.com`
  const detail = useSelector((state) => state.post.postDetail);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.value);
  const postId = useSelector((state) => state.post.postId);
  const navigate=useNavigate()
  useEffect(() => {
    axios.get(`${url}/api/post/detail/${postId}`,
        token && {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      .then((response) => {
        dispatch(setPostDetail(response?.data));
        dispatch(setPostDetailImages(response?.data[0].images));
      })
      .catch((error) => console.log(error));
  }, []);
  const deletePost =async () => {
   await axios.delete(`${url}/api/post/update-delete/${postId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    // toast.success("Elan uğurla silindi!")
    // navigate("/")
  }
  const deleteNotify=()=>toast.success("Elan uğurla silindi!")
  return (
    <div
      className='w-full sm:w-[540px] pl-6 pr-6 mx-auto 
    dark:lg:text-[#a4a4a5] lg:text-[#081A3E] lg:min-w-[960px] xl:min-w-[1250px]'
    >
      {detail?.map((post, key) => {
        return (
          <div key={key}>
            <div className='hidden lg:flex justify-between items-center text-base min-h-[60px]'>
              <div className='flex items-center'>
                <AiOutlineHome className='text-xl mb-1' />
                <RiArrowRightSLine />
                {post.category}
                <RiArrowRightSLine />
                {post.brand}
                <RiArrowRightSLine />
                {post.auto_model}
                <RiArrowRightSLine />#{postId}
              </div>
              <div className='flex items-center'>
                <AiOutlineEye className='mx-2' />
                <div>{post.views}</div>
                <AiOutlineCalendar className='mx-2' />
                <div>{post.creation_date}</div>
              </div>
            </div>
            <div className='lg:flex lg:justify-between box-content mt-5 lg:mt-0'>
              
              <div>
              <Slider />
              {/* DESCRIPTION AND EXTRA FIELDS ---------------------- */}
                <div className="hidden lg:block bg-white dark:bg-[#202022] pt-4 px-5 lg:w-[544px] xl:w-[830px]">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-base sm:text-lg w-[150px]">Satıcının rəyi</div>
                    <div className="w-full h-[2px] bg-gray-500 dark:bg-gray-200"></div>
                  </div>
                  {/* -------- */}
                  <div className="text-base pt-2">{post.description}</div>
                  <div className="w-full h-[1px] bg-gray-500 dark:bg-gray-200 my-3"></div>
                  {/* -------- */}
                  {post.extra_boolean_fields?.length!==0 &&
                  <>
                  <div className="flex justify-between items-center pt-3">
                    <div className="text-base sm:text-lg w-[120px]">Təhcizat</div>
                    <div className="w-full h-[2px] bg-gray-500 dark:bg-gray-200"></div>
                  </div>
                  <div className="flex flex-wrap mt-3">
                 {post?.extra_boolean_fields?.map((item,index)=>{
                  return(
                      <div key={index} 
                      className="flex items-center text-sm min-h-[34px] px-4 mr-4 mb-4 text-[#646e95] dark:text-[#f2eabd] border border-[#646e95] dark:border-[#f2eabd] rounded-2xl">
                          {item}
                      </div>
                 )})}
                  </div>
                  </>
                  }
                </div>
                {/* --------------------------------------------------------------------- */}
              </div>

              <div className='lg:w-[346px] h-full text-black dark:text-white break-words'>
                <div className='bg-white dark:bg-[#202022] p-6 text-xl '>
                  <div>
                    {post.brand} {post.auto_model}
                  </div>

                  <div>
                    {post.price} {post.price_type}
                  </div>
                  {/* -------------------------------------------------------------------------------- */}
                  <div className='lg:hidden flex justify-between items-center text-base min-h-[40px] text-slate-500 dark:text-slate-200'>
                    <div className='flex items-center '>№ {postId}</div>
                    <div className='flex items-center'>
                      <AiOutlineEye className='mx-2' />
                      <div>{post.views}</div>
                      <AiOutlineCalendar className='mx-2' />
                      <div>{post.creation_date.substring(0,10)}</div>
                    </div>
                  </div>
                  {/* ----------------------------------------------------------------------------------------------- */}
                  <div className='w-[40px] h-[40px] flex text-base mt-4'>
                    <img className='rounded' src={ProfileImg} alt='' />
                    <div className='ml-2'>{post.user}</div>
                  </div>

                  <button className='w-full text-base mt-4 flex justify-center items-center p-1 rounded bg-green-100 text-green-500 hover:bg-green-500 hover:text-white hover:dark:bg-green-600 dark:text-white dark:bg-green-500'>
                    <FiPhone />
                    {post.phone_number}
                  </button>

                  {/* EDIT AND DELETE BUTTONS */}
                  {post.is_owner && (
                    <div className='text-base flex justify-between mt-4'>
            {/*-------POP UP------------------------------------------------------------------------*/}
                <Popup
                trigger={<button className='flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-3 sm:px-7 rounded'>
                          <RiDeleteBin6Line className='mr-1' /> Elanı Sil
                      </button>}
                modal>
                {(close) => (
                  <div className='modal bg-white dark:bg-[#181A1B]'>
                    <button className='close' onClick={close}>
                      <AiOutlineClose className='close__icon fill-black dark:fill-white' />
                    </button>
                    <div className='mb-4 text-2xl font-bold text-[#263238] dark:text-white'>
                      Elanı silmək istədiyinizə əminsiz ?
                    </div>
                    <button onClick={()=>{deletePost();deleteNotify();navigate("/")}} className='bg-red-500 text-white hover:bg-red-300 p-1 mx-auto min-w-[100px] min-h-[24px] rounded flex items-center justify-center'>
                      Əminəm
                    </button>
                    <ToastContainer/>
                  </div>)}
                </Popup>
          {/*------------------------------------------------------------------------------------------------------*/}
                      <NavLink to="/updatepostpage">
                      <button className='flex items-center bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white py-1 px-3 sm:px-7 rounded'>
                        <HiOutlinePencil className='mr-1' /> Düzəliş et
                      </button>
                      </NavLink>
                      
                    </div>
                  )}
                  {/* ----------------------------- */}
                </div>
                {/*---DEATIL-------------------------------------- */}
                <div className='h-full bg-white dark:bg-[#202022] text-slate-500 dark:text-slate-200 p-6 lg:mt-6'>
                  <div className='flex justify-between border-b pb-2'>
                    <div>Buraxılış ili</div>
                    <div>{post.year}</div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Satış şəhəri</div>
                    <div>{post.city}</div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Yürüş</div>
                    <div>{post.mileage}</div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Ban növü</div>
                    <div>{post.category}</div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Rəng</div>
                    <div>{post.color}</div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Mühərrik</div>
                    <div>
                      {post.engine_volume}l{" / "}
                      {post.engine_power}a.g{" / "}
                      {post.fuel_type}
                    </div>
                  </div>

                  <div className='flex justify-between border-b py-2'>
                    <div>Sürətlər qutusu</div>
                    <div>{post.transmission}</div>
                  </div>

                  <div className='flex justify-between py-2'>
                    <div>Ötürücü</div>
                    <div>{post.gear}</div>
                  </div>
                </div>
                {/* -------------------------------------------------- */}
                {/*MOBILE VIEW--- DESCRIPTION AND EXTRA FIELDS ---------------------- */}
                <div className="block lg:hidden bg-white dark:bg-[#202022] pb-4 px-5 lg:w-[544px] xl:w-[830px]">
                  <div className="w-full flex justify-between items-center">
                    <div className="text-base sm:text-lg w-[150px]">Satıcının rəyi</div>
                    <div className="w-full h-[2px] bg-gray-500 dark:bg-gray-200"></div>
                  </div>
                  {/* -------- */}
                  <div className="text-base pt-2">{post.description}</div>
                  <div className="w-full h-[1px] bg-gray-500 dark:bg-gray-200 my-3"></div>
                  {/* -------- */}
                  {post.extra_boolean_fields &&
                  <>
                  <div className="flex justify-between items-center pt-3">
                    <div className="text-base sm:text-lg w-[120px]">Təhcizat</div>
                    <div className="w-full h-[2px] bg-gray-500 dark:bg-gray-200"></div>
                  </div>
                  <div className="flex flex-wrap mt-3">
                 {post?.extra_boolean_fields?.map((item,index)=>{
                  return(
                      <div key={index} 
                      className="flex items-center text-sm min-h-[34px] px-3 mr-3 mb-3 text-[#646e95] dark:text-[#f2eabd] border border-[#646e95] dark:border-[#f2eabd] rounded-2xl">
                          {item}
                      </div>
                 )})}
                  </div>
                  </>
                  }
                </div>
                {/* --------------------------------------------------------------------- */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostDetail;
