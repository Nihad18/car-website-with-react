import React, { useState } from "react";
import Input from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

import { setData, setError } from "../../redux/reducers/loginSlice";
import { useSelector,useDispatch } from "react-redux";
export const Login = () => {
  const data = useSelector((state) => state.login.data);
  const dispatch=useDispatch()
  const handleChange = ({ currentTarget: input }) => {
    dispatch(setData({ ...data, [input.name]: input.value }));
  };
  const enabled = data.email && data.password;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://207.154.251.70/api/account/token/";
      const tkn = await axios.post(url, data);
      console.log("token",tkn.data)
      localStorage.setItem("USER_DATA", JSON.stringify(tkn.data));
      // localStorage.setItem("token", JSON.stringify(tkn.data.token));
      // localStorage.setItem("email", JSON.stringify(tkn.data.email));

      navigate("/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        alert('email ve ya sifre yanlisdir!');
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
          value={data.email}
          name='email'
          onChange={handleChange}
        />
        <Input
          type='password'
          label='Password'
          name='password'
          value={data.password}
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
