import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
const Select = ({ options, isMulti, placeHolder }) => {
  const [toggle, setToggle] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState(isMulti ? [] : "");
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : "");
  const [currentValue, setCurrentValue] = useState("");
  const [searchValue, setSearchValue] = useState(inputValue);

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
  const handleChange = (event) => {
    if (event.target.checked) {
      setSelectedValue(
        isMulti ? [...selectedValue, currentValue] : currentValue
      );
      setInputValue(isMulti ? [...inputValue, currentValue] : currentValue);
    } else {
      setInputValue(inputValue.filter((item) => item !== currentValue));
      setSelectedValue(inputValue.filter((item) => item !== currentValue));
    }
    setIsChecked((current) => !current);
  };
  console.log("inputValue : ", isMulti ? [...new Set(inputValue)] : inputValue);
  return (
    <div>
      <div className='relative ' ref={container}>
        <div className={`relative flex h-[46px] mb-2 cursor-pointer`}>
          <input
            type='text'
            ref={input}
            required={true}
            id='select'
            // when we click input , input value will be reset , then if we click other place ,input value will be previous value
            value={
              toggle
                ? inputValue //when we click other place,then this value will be set to input value
                  ? isMulti
                    ? [...new Set(inputValue)] //for array
                    : inputValue //for single value
                  : isMulti
                  ? [...new Set(selectedValue)] // for array
                  : selectedValue // for single value
                : searchValue
            }
            onChange={onSearch}
            onClick={() => {
              setSelectedValue("");
              setSearchValue("");
            }}
            className='outline-none px-[7px] valid:pt-5 peer relative w-full h-full text-sm text-gray-900 dark:text-white bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-600'
          />
          <span
            htmlFor='select'
            className='text-[#8E8EA9] top-[14px] left-2 absolute text-sm cursor-text pointer-events-none peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2'
          >
            {placeHolder ? placeHolder : "text"}
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
            toggle === true ? "opacity-0 scale-y-0" : " opacity-1 scale-y-100"
          } absolute z-10 w-60 bg-white transition origin-top rounded shadow dark:bg-gray-700`}
        >
          <ul className='overflow-y-auto max-h-60 px-3 pb-3 text-sm text-gray-700 dark:text-gray-200'>
            <em
              onClick={() => {
                setSelectedValue("");
                setInputValue("");
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
                onClick={() => {
                  // setSelectedValue(
                  //   isMulti ? [...selectedValue, option.label] : option.label
                  // );
                  // setInputValue(
                  //   isMulti ? [...inputValue, option.label] : option.label
                  // );
                  setCurrentValue(option.label);
                }}
                key={option.value}
                className='p-2 cursor-pointer hover:bg-sky-400'
              >
                {isMulti ? (
                  <label
                    htmlFor={option.label}
                    className='flex justify-between'
                  >
                    {option.label}
                    <input
                      value={isChecked}
                      onChange={handleChange}
                      id={option.label}
                      type='checkbox'
                    />
                  </label>
                ) : (
                  option.label
                )}
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
