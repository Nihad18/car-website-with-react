import React, { useState, useEffect } from "react";

export default function Input({ label, type = "text", ...props }) {
  const [show, setShow] = useState(false);
  const [inputType, setType] = useState(type);

  useEffect(() => {
    if (show) {
      setType("text");
    } else if (type === "password") {
      setType("password");
    }
  }, [show,type]);
  return (
    <div className='relative flex h-[52px] font-normal focus-within:border-gray-400 rounded-sm border focus:border-[#a7a7c5] mb-2'>
      <input
      {...props}
        required={true}
        type={inputType}
        className='bg-[#FAFAFA] w-full h-full outline-none relative px-[7px] text-lg peer valid:pt-5'
      />
      <span className='text-[#8E8EA9] top-3 left-2 absolute text-lg cursor-text pointer-events-none peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2'>
        {label}
      </span>
      {type === 'password' && props?.value &&(
        <button
        type="button"
          onClick={() => setShow(!show)}
          className='h-full flex items-center text-sm font-semibold pr-2'
        >
          {show ? "Hide" : "Show"}
        </button>
      )}
    </div>
  );
}
