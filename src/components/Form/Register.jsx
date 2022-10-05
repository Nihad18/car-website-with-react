import React from "react";
import Input from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
// REDUX
import { setRegisterData, setError } from "../../redux/reducers/registerSlice";
import { useSelector, useDispatch } from "react-redux";

export const Register = () => {
  const data = useSelector((state) => state.register.registerData);
  const dispatch = useDispatch();
  const enabled = data.name && data.email && data.password 
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    dispatch(setRegisterData({ ...data, [input.name]: input.value }));
  };
  console.log("data",data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "https://ayxan0314.pythonanywhere.com/api/account/register/";
      const { data: res } = await axios.post(url, data);
      // localStorage.setItem("name", data.name);
      // localStorage.setItem("USER_DATA", JSON.stringify(res));
      navigate("/login");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className='card-layoutv w-[352px] p-6 rounded-lg mx-auto bg-white '>
      <h1 className='header text-4xl font-semibold pb-2'>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type='text'
          label='Name'
          name='name'
          value={data.name}
          onChange={handleChange}
        />
        <Input
          type='text'
          label='Phone number or email'
          name='email'
          value={data.email}
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
          Agree & Join
        </button>
        <div className='bg-sky-500 text-white'>
          <NavLink to='/login'>Go to {">"} login</NavLink>
        </div>
      </form>
    </div>
  );
};
