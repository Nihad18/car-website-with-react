import { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import axios from "axios";
// React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile = () => {
  const [detail,setDetail]= useState({});
  const token = useSelector((state) => state.auth.value)
  const notify = () => toast.success("Dəyişiklik uğurla edildi")
  const handleChange = async(e) => {
    e.preventDefault();
    try{
      await axios.put('/api/account/detail/',detail,{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      }) 
    }catch(err){console.error(err);}
  };
  const handleInputChange=({currentTarget:input})=>{
    setDetail({ ...detail, [input.name]: input.value })
  }
  
  useEffect(() =>{
   async function fetchData(){
     try{
      const {data}= await axios.get(`/api/account/detail/`,{
        headers: {Authorization: `Bearer ${token}`}
      })
      setDetail(data);
     }catch(err){
      console.error(err);
     }
    }
    fetchData();
  },[token])
  return (
    <div className="min-h-[300px] sm:min-h-[380px]  ">
    <div className="p-2 lg:px-6 text-xl text-[#1c1c1e] dark:text-white">Şəxsi məlumatlar</div>
    <div className='min-h-[250px] sm:min-h-[330px] flex flex-col justify-center'>
      <form className="flex flex-col w-full sm:w-3/5 mx-auto" onSubmit={handleChange}>
        {/* NAME AND Email */}
          <input
            className='bg-[#1c1c1e] h-[34px] w-5/6 outline-none border-0 rounded mb-4 py-2 px-4'
            value={detail.name}
            onChange={handleInputChange}
            name='name'
            type='text'
            placeholder='Ad'
          />

            <input
            className='bg-[#1c1c1e] h-[34px]  w-5/6 outline-none border-0 rounded mb-4 py-2 px-4'
            type='email'
            value={detail.email}
            onChange={handleInputChange}
            name='email'
            placeholder='E-mail'
          />
        <button onClick={()=>notify()} className='w-[150px] h-7 bg-green-500 rounded'>
          Təsdiqlə
        </button>
          <ToastContainer/>
      </form>
    </div>
    </div>
  );
};

export default Profile;
