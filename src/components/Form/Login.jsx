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
      const url = `https://ayxan0314.pythonanywhere.com/api/account/token/`;
      const tkn = await axios.post(url, loginData);
      // localStorage.setItem("token", tkn.data.access);
      SetCookie("token", tkn.data.access)
     
      // dispatch(setAuth(localStorage.getItem("token"))); 
      dispatch(setAuth(GetCookie("token"))); 

      // localStorage.setItem("refreshToken", tkn.data.refresh);
      SetCookie("refreshToken", tkn.data.refresh)

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
    <>
      <div className='w-[352px] p-6 rounded-lg  bg-white'>
        <h1 className='header text-4xl font-semibold pb-2'>Login</h1>
        <p className='about'>Stay updated on your professional world</p>
        <form onSubmit={handleSubmit}>
          <Input
            type='text'
            label='Email'
            value={loginData.email}
            name='email'
            onChange={handleChange}
          />
          <Input
            type='password'
            label='Password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
          />
          <button
            disabled={!enabled}
            className='bg-[#0095F6] disabled:opacity-50 rounded-sm text-white w-full h-7 mt-2 mb-2'
          >
            Login
          </button>

          <div className='bg-sky-500 text-white'>
            <NavLink to='/register'> Go to {">"} register</NavLink>
          </div>
        </form>
      </div>
    </>
  );
};
