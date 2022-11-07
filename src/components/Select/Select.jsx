import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const Select = ({ options }) => {
  const [animationParent] = useAutoAnimate();
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [searchValue, setSearchValue] = useState(selectedValue);
  const container = useRef();
  const input = useRef();
  useEffect(() => {
    window.onclick = (e) => {
      setToggle(e.target !== container.current && e.target !== input.current);
    };
  });
  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const filtered = options?.filter(
    (item) => item.label.toString().indexOf(searchValue) !== -1
  );
  console.log("value : ",inputValue)
  return (
    <div ref={animationParent}>
      <div className='relative ' ref={container}>
        <div className={`relative flex h-[46px] mb-2 cursor-pointer`}>
          <input
            type='text'
            ref={input}
            required={true}
            id='select'
            value={toggle ? (selectedValue ? selectedValue : inputValue) : searchValue}
            onChange={onSearch}
            onClick={() => {
              setSelectedValue("");
              setSearchValue("");
            }}
            className='outline-none px-[7px] valid:pt-5 peer relative w-full h-full text-sm text-gray-900 dark:text-white bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600'
          />
          <span
            htmlFor='select'
            className='text-[#8E8EA9] top-3 left-2 absolute text-sm cursor-text pointer-events-none peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2'
          >
            Marka
          </span>
          <label
            htmlFor='select'
            className='cursor-pointer text-xl absolute right-4 top-[14px] text-white'
          >
            {toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </label>
        </div>

        <div
          className={`${
            toggle === true ? "hidden" : "block"
          } absolute z-10 w-60 bg-white rounded shadow dark:bg-gray-700`}
        >
          <ul className='overflow-y-auto px-3 pb-3 max-h-60 text-sm text-gray-700 dark:text-gray-200'>
            <em
              onClick={() => {
                setSelectedValue("");
                setInputValue("")
                setSearchValue("");
              }}
              className={`${
                filtered?.length === 0 && "hidden"
              } mt-2 p-2 cursor-pointer hover:bg-red-300 flex items-center`}
            >
              <IoMdClose className='mr-2 text-lg fill-red-500' />
              Sifirla
            </em>
            {filtered?.map((option) => (
              <li
                key={option.value}
                onClick={() => {
                  setSelectedValue(option.label);
                  setInputValue(option.label);
                }}
                className='p-2 cursor-pointer hover:bg-red-300'
              >
                {option.label}
              </li>
            ))}
            <em
              className={`${
                filtered?.length !== 0 && "hidden"
              } mt-2 p-2 cursor-pointer hover:bg-red-300 flex`}
            >
              Hecne tapilmadi!
            </em>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
