import React, { useState, useEffect } from "react";
import {AiOutlineEye,AiOutlineEyeInvisible} from 'react-icons/ai';
export default function Input({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const [inputType, setType] = useState(type);

  useEffect(() => {
    if (show) {
      setType("text");
    } else if (type === "password") {
      setType("password");
    }
  }, [show, type]);
  return (
    <div>
      <label
        for='name'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {label}
      </label>
      <div className="relative flex">
      <input
        {...props}
        required={""}
        type={inputType}
        className='bg-gray-50 border outline-none border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-600 focus:border-sky-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      />
      {type === "password" && props?.value && (
      <button
          type='button'
          onClick={() => setShow(!show)}
          className='absolute top-[50%] translate-y-[-50%] right-2 text-xl text-slate-700 dark:text-white font-semibold pr-2'
        >
          {show ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>}
        </button>
      )}
      </div>
    </div>
  );
}
