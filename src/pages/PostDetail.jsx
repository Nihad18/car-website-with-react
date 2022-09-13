import React, { useState,useEffect } from 'react'
// *ICONS----------------------------------
import { AiOutlineHome,AiOutlineEye ,AiOutlineCalendar} from "react-icons/ai";
import {RiArrowRightSLine,RiDeleteBin6Line} from "react-icons/ri"
import {FiPhone} from "react-icons/fi"
import {HiOutlinePencil} from "react-icons/hi"
// *Redux------------------------------------
import { useSelector,useDispatch } from 'react-redux'
import {setPostDetail,setPostDetailImages} from "../redux/reducers/postSlice"

import axios from 'axios'
import Slider from "../components/Slider/SwiperSlider"
import ProfileImg from "../images/profileImg.png"

const PostDetail = () => {
  const detail=useSelector((state)=>state.post.postDetail)
  const dispatch = useDispatch()
  const token=useSelector((state)=>state.auth.value)
  const postId=useSelector((state)=>state.post.postId)
  useEffect(() => {
    axios.get(`/api/post/detail/${postId}`,
    token && {
      headers: {
        Authorization: `Bearer ${token}`,
    }})
      .then((response) => {
        dispatch(setPostDetail(response?.data));
        dispatch(setPostDetailImages(response?.data[0].images))
      })
      .catch((error) => console.log(error));
    },[])
  return (
   <div className="w-full sm:w-[540px] pl-6 pr-6 mx-auto 
    dark:lg:text-[#a4a4a5] lg:text-[#081A3E] lg:min-w-[960px] xl:min-w-[1250px]">

      {detail?.map((post,key) =>{
        return(
         <>
          <div key={key} className="flex justify-between items-center text-base min-h-[60px]">
            <div className='flex items-center'>
              <AiOutlineHome className='text-xl mb-1'/>
              <RiArrowRightSLine/>
              {post.category}
              <RiArrowRightSLine/>
              {post.brand}
              <RiArrowRightSLine/>
              {post.auto_model}
              <RiArrowRightSLine/>
              #{postId}
            </div>
            <div className="flex items-center">
              <AiOutlineEye className='mx-2'/>
              <div>{post.views}</div>
              <AiOutlineCalendar className='mx-2'/>
              <div>{post.creation_date}</div>
            </div>
          </div>
          <div className='flex justify-between box-content'>
              <Slider />
              <div className= 'xl:w-[346px] bg-white dark:bg-[#202022] text-black dark:text-white text-xl break-words p-6'>
                <div>
                  {post.brand} {post.auto_model}
                </div>
                
                <div>
                  {post.price} {post.price_type}
                </div>

                <div className='w-[40px] h-[40px] flex text-base mt-4'>
                  <img className="rounded" src={ProfileImg} alt="" />
                  <div className="ml-2">
                    {post.user}
                  </div>
                </div>

                <button className="w-full text-base mt-4 flex justify-center items-center p-1 rounded bg-green-100 text-green-500 hover:bg-green-500 hover:text-white hover:dark:bg-green-600 dark:text-white dark:bg-green-500"><FiPhone/>{post.phone_number}</button>
               
                {/* EDIT AND DELETE BUTTONS */}
                {post.is_owner 
                && <div className='text-base flex justify-between mt-4'>
                    <button className="flex items-center bg-red-500 hover:bg-red-600 text-white py-1 px-7 rounded">
                    <RiDeleteBin6Line className='mr-1'/> Elanı Sil
                    </button>
                    <button className="flex items-center bg-slate-800 dark:bg-slate-600 dark:hover:bg-slate-700 text-white py-1 px-7 rounded">
                    <HiOutlinePencil className='mr-1'/> Düzəliş et
                    </button>
                  </div>
                }
              </div>       
          </div>
          </>
        )})}
   </div>
  )
}

export default PostDetail