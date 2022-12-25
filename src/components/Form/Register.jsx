import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Input from "./Input";
import axios from "axios";
// React Toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// LODAER CSS
import "../../style/loader.css";
// REDUX
import { setRegisterData } from "../../redux/reducers/registerSlice";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
export const Register = () => {
  const data = useSelector((state) => state.register.registerData);
  const dispatch = useDispatch();
  const enabled = data.name && data.email && data.password;
  const navigate = useNavigate();
  const [response, setResponse] = useState(true);
  const [toggle, setToggle] = useState(false);
  const handleChange = ({ currentTarget: input }) => {
    dispatch(setRegisterData({ ...data, [input.name]: input.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API_URL}/api/account/register/`;
    await axios.post(url, data).then((res) => {
      if (res.status === 201) {
        setResponse(true);
        setToggle(false);
        toast.success("Qeydiyyatdan uğurla keçdiniz!");
        dispatch(setRegisterData({ email: "", name: "", password: "" }));
        navigate("/login");
      } else {
        setToggle(true);
        setResponse(false);
        toast.error("Qeydiyyatdan keçə bilmədiniz");
      }
    });
  };
  return (
    <div className='flex justify-center items-center h-[85vh] my-5'>
      <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Qeydiyyatdan keç
          </h1>
          <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <Input
              label={"Istifadəçi adı"}
              placeholder='istifadəçi adı'
              type='name'
              name='name'
              id='name'
              value={data.name}
              onChange={handleChange}
            />
            <Input
              label={"Email"}
              placeholder='example@.com'
              type='email'
              name='email'
              id='email'
              value={data.email}
              onChange={handleChange}
            />
            {!response && (
              <div className={`${!toggle && 'hidden'} flex items-center justify-around font-medium w-full text-red-800 bg-red-200 rounded-md shadow `}>
                <div className="text-sm py-2">Mövcud olan email ile qeydiyyatdan keçə bilmərsiz!</div>
                <div onClick={()=>setToggle(false)} className="cursor-pointer text-lg">
                  <AiOutlineClose />
                </div>
              </div>
            )}
            <Input
              label={"Password"}
              type='password'
              name='password'
              id='password'
              value={data.password}
              onChange={handleChange}
              placeholder='••••••••'
            />
            <button
              disabled={!enabled}
              className={`${
                !enabled
                  ? "bg-sky-400 dark:bg-sky-800"
                  : "bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700"
              } w-full text-white focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-sky-800`}
            >
              Qeydiyyatdan keç
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Hesabınız var?
              <NavLink
                to='/login'
                className='pl-1 font-medium text-sky-600 hover:underline dark:text-sky-500'
              >
                Daxil olun!
              </NavLink>
            </p>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};
