import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// React Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// LODAER CSS
import "../../style/loader.css"
const PasswordChange = () => {
  const url = process.env.REACT_APP_API_URL
  const [password, setPassword] = useState({});
  const [isLoading,setIsLoading]=useState(true)
  const token = useSelector((state) => state.auth.value);
  const handlePassword = ({ currentTarget: input }) => {
    setPassword({ ...password, [input.name]: input.value });
  };
  const handleChange = (e) => {
    e.preventDefault();
    axios.put(`${url}/api/account/change-password/`, password, {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        if (res.status === 204) {
          toast.success("Şifrəni uğurla dəyişdiniz!");
        } else {
          toast.error("Şifrəni dəyişə bilmədiniz");
        }
        setIsLoading(true)
      });
    setIsLoading(false)
    setPassword({ old_password: "", new_password: "" });
  };
  const enabled =
    password?.new_password?.length > 7 && password?.old_password?.length > 7;

  return (
    <div className='min-h-[300px] sm:min-h-[380px]'>
      <div className='p-2 lg:px-6 text-xl text-[#1c1c1e] dark:text-white'>
        Şifrəni yenilə
      </div>
      <div className=' min-h-[250px] sm:min-h-[330px] text-white flex flex-col justify-center items-center'>
        <form
          onSubmit={handleChange}
          className='flex flex-col w-full sm:w-3/5 mx-auto'
        >
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
         {
          isLoading 
          ?
          <button
          disabled={!enabled}
          className={`${
            !enabled
              ? "bg-green-300 dark:bg-green-400 pointer-events-none"
              : "bg-green-500"
          } w-[150px] h-7  rounded`}
        >
          Təsdiqlə
        </button>
       : 
        <div className="w-[150px] h-7 bg-green-500 flex justify-center items-center rounded">
          <div className="lds-ellipsis">
            <div></div><div></div><div></div><div></div>
          </div>
        </div>
         }
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default PasswordChange;
