import axios from 'axios';
import React from 'react'
import {useState} from 'react'
import {useSelector} from "react-redux"

// React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const PasswordChange = () => {
  const [password,setPassword]= useState({});
  const [notify,setNotify]=useState(false)
  const token = useSelector((state) => state.auth.value)
  const successNotify = () => toast.success("Dəyişiklik uğurla edildi")
  const errorNotify = () => toast.error("Şifrəni dəyişə bilmədiniz!")
  const handlePassword=({currentTarget:input})=>{
    setPassword({...password,[input.name]: input.value});
  }
  const handleChange=async(e)=>{
    e.preventDefault()
    try{
      await axios.put(`/api/account/change-password/`,password,{
        headers: {Authorization: `Bearer ${token}`}
      })
      console.log("Successful change password")
      // setNotify(true)
    }
    catch(error){
      console.error(error);
      if( error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500 ){
          // setNotify(false);
          console.error("Unsuccessful change password")
          console.error('error :', error.response.status)
        }
      }
      setPassword({old_password:"",new_password:""})
    }
  const enabled= password?.new_password?.length>7 && password?.old_password?.length>7
  // console.log("notify :",notify)
  return (
    <div className='min-h-[300px] sm:min-h-[380px]'>
        <div className="p-2 lg:px-6 text-xl text-[#1c1c1e] dark:text-white">Şifrəni yenilə</div>
        <div className=' min-h-[250px] sm:min-h-[330px] text-white flex flex-col justify-center items-center'>
          <form onSubmit={handleChange} className='flex flex-col w-full sm:w-3/5 mx-auto'>
              {/*-----OLD PASSWORD-------  */}
              <input
              className='bg-[#1c1c1e] h-[34px] w-5/6 outline-none border-0 rounded mb-4 py-2 px-4'
              placeholder='Şifrə'
              name='old_password'
              value={password.old_password}
              onChange={handlePassword}
              />

              {/* ----NEW PASSWORD-------- */}
              <input
              className='bg-[#1c1c1e] h-[34px] w-5/6 outline-none border-0 rounded mb-4 py-2 px-4'
              placeholder='Yeni şifrə'
              name='new_password'
              value={password.new_password}
              onChange={handlePassword}
              />
              <button disabled={!enabled} onClick={()=>{notify ? successNotify() : errorNotify()}} 
              className={`${!enabled ? 'bg-green-300 dark:bg-green-400 pointer-events-none' : 'bg-green-500'} w-[150px] h-7  rounded`}>
              Təsdiqlə
              </button>
              <ToastContainer/>
          </form>
      </div>
    </div>
  )
}

export default PasswordChange