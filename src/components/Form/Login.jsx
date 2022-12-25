import React, { useState } from "react";
import Input from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { setLoginData, setError } from "../../redux/reducers/loginSlice";
import { setAuth } from "../../redux/reducers/authSlice";
import { useSelector, useDispatch } from "react-redux";

// Cookie
import SetCookie from "../../hooks/SetCookie";
import GetCookie from "../../hooks/GetCookie";

export const Login = () => {
  const loginData = useSelector((state) => state.login.loginData);
  const dispatch = useDispatch();
  const handleChange = ({ currentTarget: input }) => {
    dispatch(setLoginData({ ...loginData, [input.name]: input.value }));
  };
  const enabled = loginData.email && loginData.password;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/account/token/`;
      const tkn = await axios.post(url, loginData);
      // localStorage.setItem("token", tkn.data.access);
      SetCookie("token", tkn.data.access);

      // dispatch(setAuth(localStorage.getItem("token")));
      dispatch(setAuth(GetCookie("token")));

      // localStorage.setItem("refreshToken", tkn.data.refresh);
      SetCookie("refreshToken", tkn.data.refresh);

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert(error.response.data.message);
        dispatch(setError(error.response.data.message));
        toast.error(error.response.data.message);
      }
    }
  };
  return (
    <div className='flex justify-center items-center h-[90vh]'>
      <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
            Daxil ol
          </h1>
          <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <Input
              label={"Email"}
              placeholder='example@.com'
              type='email'
              name='email'
              id='email'
              value={loginData.email}
              onChange={handleChange}
            />
            <Input
              label={"Password"}
              type='password'
              name='password'
              id='password'
              value={loginData.password}
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
              Daxil ol
            </button>
            <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
              Hesabınız yoxdur?
              <NavLink
                to='/register'
                className='pl-1 font-medium text-sky-600 hover:underline dark:text-sky-500'
              >
                Qeydiyyatdan keçin!
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
