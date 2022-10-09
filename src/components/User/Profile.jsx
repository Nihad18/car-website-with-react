import { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import axios from "axios";
// React Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// LODAER CSS
import "../../style/loader.css"
const Profile = () => {
  const url=process.env.REACT_APP_API_URL
  const [detail,setDetail]= useState({});
  const [error,setError] = useState(false);
  const [isLoading,setIsLoading]=useState(true)
  const [enabled,setEnabled]=useState(false);
  const token = useSelector((state) => state.auth.value)
  const handleChange =(e) => {
    e.preventDefault();
    axios.put(`${url}/api/account/detail/`,detail,{
      headers:{
        'Authorization':`Bearer ${token}`
      }
    }).then((res)=>{
      if(res.status===200){
        toast.success("Dəyişiklik uğurla edildi")
        setError(false)
      }
      else{
        toast.error("Bu email mövcud olduğu üçün onu seçə bilmərsiz!")
        setError(true)
      }
      setIsLoading(true)
    })
    setIsLoading(false)
  };
  const handleInputChange=({currentTarget:input})=>{
    setDetail({ ...detail, [input.name]: input.value })
  }
  /*The button is activated when you change your username or email address,
   otherwise the button is not activated and changes cannot be made */
  const handleNameChange=(e)=>{
    if(detail?.name===e.target.value){
      setEnabled(true)
    }
    else{
      setEnabled(false)
    } 
  }
  const handleEmailChange=(e)=>{
    if(detail?.email===e.target.value){
      setEnabled(true)
    }
    else{
      setEnabled(false)
    }
  }
  useEffect(() =>{
   async function fetchData(){
     try{
      const {data}= await axios.get(`${url}/api/account/detail/`,{
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
      <form className="flex flex-col w-full sm:w-3/5 mx-auto text-white" onSubmit={handleChange}>
        {/* NAME AND Email */}
          <input
            className='bg-[#1c1c1e] h-[34px] w-5/6 outline-none border-0 rounded mb-4 py-2 px-4'
            value={detail?.name}
            onChange={handleInputChange}
            onKeyUp={handleNameChange}
            name='name'
            type='text'
            placeholder='Ad'
          />

            <input
            className={`${error && 'outline-1 outline-red-500'} bg-[#1c1c1e] h-[34px]  w-5/6 outline-none border-0 rounded mb-4 py-2 px-4`}
            type='email'
            value={detail?.email}
            onChange={handleInputChange}
            onKeyUp={handleEmailChange}
            name='email'
            placeholder='E-mail'
          />
       {
        isLoading 
        ?<button disabled={!enabled}  className={`${
          !enabled
            ? "bg-green-300 dark:bg-green-400 pointer-events-none"
            : "bg-green-500" 
            } w-[150px] h-7  rounded text-black`}>
        Təsdiqlə
        </button> 
      : <div className="w-[150px] h-7 bg-green-500 flex justify-center items-center rounded">
          <div className="lds-ellipsis">
              <div></div><div></div><div></div><div></div>
          </div>
       </div>
       }
          <ToastContainer/>
      </form>
    </div>
    </div>
  );
};

export default Profile;
