import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setValues } from "../../redux/reducers/searchSlice";
const Select = ({ containerStyle, containerClassName, options, type }) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.search.values);
  const [toggle, setToggle] = useState(true);
  const [inputValue, setInputValue] = useState("AZN");
  const [idValue, setIdValue] = useState("");
  const container = useRef();
  const input = useRef();
  useEffect(() => {
    window.onclick = (e) => {
      setToggle(e.target !== container.current && e.target !== input?.current);
    };
  });
  useEffect(() => {
    dispatch(
      setValues({
        ...values,
        [type]: idValue,
      })
    );
  }, [dispatch, inputValue, idValue]);
  return (
    <div
      style={containerStyle}
      className={`${containerClassName ? containerClassName : "w-[240px]"}`}
    >
      <div className='relative w-full' ref={container}>
        <div className={`relative flex h-[46px] mb-2 cursor-pointer`}>
          <input
            type='text'
            ref={input}
            readOnly={true}
            required={true}
            id={idValue}
            value={inputValue}
            onClick={() => {
              setToggle(!toggle);
            }}
            className='cursor-pointer outline-none px-[7px] valid:pt-5 peer relative w-full h-full text-sm text-gray-900 dark:text-white bg-gray-50 rounded-md border border-gray-300 dark:bg-gray-600'
          />
          <label
            htmlFor='select'
            className='cursor-pointer text-xl absolute right-4 top-[14px] text-slate-400 dark:text-white'
          >
            {toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </label>
        </div>

        <div
          className={`${
            toggle === true ? "opacity-0 scale-y-0" : " opacity-1 scale-y-100"
          } 
          absolute z-10 w-full bg-white transition origin-top rounded shadow dark:bg-gray-700`}
        >
          <ul className='overflow-y-auto max-h-60 px-3 pb-3 text-sm text-gray-700 dark:text-gray-200'>
            {options?.map((option) => (
              <li
                onClick={() => {
                  setToggle(true);
                  setInputValue(option.label);
                  setIdValue(option.value);
                }}
                key={option.value}
                className={`${option.label===inputValue && "text-red-500"} cursor-pointer hover:bg-sky-400`}
              >
                <div className='p-2 cursor-pointer'>{option.label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Select;
