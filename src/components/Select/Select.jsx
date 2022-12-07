import React, { useEffect, useState, useRef } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrandValue,
  setModelValue,
  setValues,
} from "../../redux/reducers/searchSlice";
const Select = ({
  containerStyle,
  containerClassName,
  options,
  isMulti = false,
  placeHolder,
  ID = false,
  type,
  brand = false,
  model = false,
  isDisabled = false,
}) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.search.values);
  const [toggle, setToggle] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [inputValue, setInputValue] = useState(isMulti ? [] : "");
  const [idValue, setIdValue] = useState(isMulti ? [] : "");
  const [currentValue, setCurrentValue] = useState("");
  const [currentIdValue, setCurrentIdValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const container = useRef();
  const input = useRef();
  useEffect(() => {
    window.onclick = (e) => {
      setToggle(e.target !== container.current && e.target !== input?.current);
    };
  });
  useEffect(() => {
    (brand === false || model === false) &&
      dispatch(
        setValues({
          ...values,
          [type]: isMulti
            ? [...new Set(ID ? idValue : inputValue)]
            : ID
            ? idValue
            : inputValue,
        })
      );
    brand === true && dispatch(setBrandValue(idValue));
    model === true &&
      dispatch(setModelValue(isMulti ? [...new Set(idValue)] : idValue));
  }, [dispatch, inputValue, idValue]);
  const filtered = options?.filter(
    (item) =>
      item.label.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );
  const handleChange = (event) => {
    if (event.target.checked) {
      setInputValue(isMulti ? [...inputValue, currentValue] : currentValue);
    } else {
      setInputValue(
        inputValue.filter((item) =>
          item !== ID ? currentIdValue : currentValue
        )
      );
    }
    setIsChecked((current) => !current);
  };
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
            required={true}
            id={ID ? currentIdValue : currentValue}
            // when we click input , input value will be reset , then if we click other place ,input value will be previous value
            value={
              !isDisabled
                ? toggle
                  ? inputValue && //when we click other place,then this value will be set to input value
                    isMulti
                    ? [...new Set(inputValue)] //for array
                    : inputValue //for single value
                  : searchValue
                : ""
            }
            disabled={isDisabled}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onClick={() => {
              setSearchValue("");
              setToggle(!toggle);
            }}
            className='outline-none px-[7px] valid:pt-5 peer relative w-full h-full text-sm text-gray-900 dark:text-white bg-gray-50 rounded-md border border-gray-300 dark:bg-gray-600'
          />
          <span className='text-[#8E8EA9] top-[14px] left-2 absolute text-sm cursor-text pointer-events-none peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2'>
            {placeHolder ? placeHolder : "text"}
          </span>
          <label
            htmlFor='select'
            className='cursor-pointer text-xl absolute right-4 top-[14px] text-slate-400 dark:text-white'
          >
            {toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </label>
        </div>

        <div
          className={`${isDisabled && "opacity-0"}
          ${
            toggle === true ? "opacity-0 scale-y-0" : " opacity-1 scale-y-100"
          } absolute z-10 w-full bg-white transition origin-top rounded shadow dark:bg-gray-700`}
        >
          <ul className='overflow-y-auto max-h-60 px-3 pb-3 text-sm text-gray-700 dark:text-gray-200'>
            <em
              onClick={() => {
                setToggle(true);
                setInputValue("");
                setIdValue("");
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
                //
                onClick={() => {
                  setToggle(isMulti ? false : true);
                  setCurrentValue(option.label);
                  setCurrentIdValue(option.value);
                  setInputValue(
                    isMulti ? [...inputValue, option.label] : option.label
                  );
                  setIdValue(
                    isMulti ? [...idValue, option.value] : option.value
                  );
                }}
                key={option.value}
                className={`${
                  (isMulti
                    ? [...new Set(inputValue)].find(
                        (item) => item === option.label
                      )
                    : option.label === inputValue) && "text-red-500"
                } cursor-pointer hover:bg-sky-400`}
              >
                {isMulti ? (
                  <label
                    htmlFor={option.label + "option"}
                    className='p-2 cursor-pointer flex justify-between'
                  >
                    {option.label}
                    <input
                      value={isChecked}
                      onChange={handleChange}
                      id={option.label + "option"}
                      type='checkbox'
                    />
                  </label>
                ) : (
                  <div className='p-2 cursor-pointer'>{option.label}</div>
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
