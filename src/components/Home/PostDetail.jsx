import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
const PostDetail = () => {
  const [detail,setDetail]=useState()
  const token=useSelector((state)=>state.auth.value)
  const postId=useSelector((state)=>state.post.postId)
  useEffect(() => {
    axios.get(`/api/post/detail/${postId}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },})
    .then((response) => {
      setDetail(response?.data);
      console.log(response?.data);
    })
    .catch((error) => console.log(error));
  },[])
  console.log(detail)
  
  return (
    <div className=''>
      {detail?.map((post,key) =>{
        return(
          <div key={key}>
            <div>{post.brand}{" > "}{post.auto_model}</div>
          </div>
        )})}
      <div className='text-4xl bg-red-500 text-blue-500'>PostDetail</div>
      </div>
  )
}

export default PostDetail