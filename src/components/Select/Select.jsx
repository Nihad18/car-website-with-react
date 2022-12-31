import React, { useEffect, useState, useRef, memo } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { AiOutlineCheck } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import {
  setBrandValue,
  setModelValue,
  setValues,
} from "../../redux/reducers/searchSlice";
import {
  setBrandVals,
  setModelVals,
  setVals,
} from "../../redux/reducers/newPostSlice";
import { setResetToggle } from "../../redux/reducers/toggleSlice";

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
  postBrand = false,
  postModel = false,
  newPost = false,
  isDisabled = false,
}) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.search.values);
  const postValues = useSelector((state) => state.newPost.values);
  const resetToggle = useSelector((state) => state.toggle.resetToggle);
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
      setToggle(e.target !== container.current && e.target !== input.current);
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
    newPost === true &&
      dispatch(
        setVals({
          ...postValues,
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

    postBrand === true && dispatch(setBrandVals(idValue));
    postModel === true &&
      dispatch(setModelVals(isMulti ? [...new Set(idValue)] : idValue));
  }, [dispatch, inputValue, idValue]);
  useEffect(() => {
    if (!resetToggle) {
      setInputValue("");
    }
  }, [inputValue, resetToggle]);
  const filtered = options?.filter(
    (item) =>
      item.label.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );
  const handleChange = (event) => {
    if (event.target.checked) {
      setInputValue(isMulti ? [...inputValue, currentValue] : currentValue);
      setIdValue(isMulti ? [...idValue, currentIdValue] : currentIdValue);
    } else {
      setInputValue(inputValue.filter((item) => item !== currentValue));
      setIdValue(idValue.filter((item) => item !== currentIdValue));
    }
    setIsChecked((current) => !current);
  };
  return (
    <div
      style={containerStyle}
      className={`${
        containerClassName ? containerClassName : "w-[240px] select-none"
      }`}
    >
      <div className='relative w-full' ref={container}>
        {/* <div className={`relative flex h-[46px] mb-2 cursor-pointer`}> */}
        <div
          onClick={() => setToggle(!toggle)}
          className={`relative flex h-[46px] mb-2 cursor-pointer text-gray-900 dark:text-white bg-[#ECF2F9] rounded-md border border-gray-300 dark:bg-gray-600`}
        >
          <input
            type='text'
            ref={input}
            required={true}
            value={
              !isDisabled
                ? toggle
                  ? inputValue && isMulti
                    ? [...new Set(inputValue)]
                    : inputValue
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
            className={`${toggle && "cursor-pointer pt-4"} ${[type]}
             outline-none peer px-[7px] relative w-[80%] h-[90%] mt-1 text-sm text-gray-900 dark:text-white bg-[#ECF2F9] rounded-md dark:bg-gray-600`}
          />
          <span
            className={`${
              !toggle && (searchValue.length > 0 ? "hidden" : "block")
            }
           text-[#8E8EA9] dark:text-gray-300 top-3 left-2 absolute w-[80%] peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2 overflow-hidden text-ellipsis whitespace-nowrap text-base cursor-text pointer-events-none`}
          >
            {isDisabled
              ? placeHolder
              : !toggle
              ? inputValue.length > 0 && isMulti
                ? [...new Set(inputValue)] + ","
                : placeHolder + " axtarın..."
              : placeHolder}
          </span>
          <div
            onClick={() => setToggle(!toggle)}
            className='pointer-events-none text-xl absolute right-4 top-[14px] text-slate-400 dark:text-white'
          >
            {isDisabled ? (
              <IoIosArrowDown />
            ) : toggle ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowUp />
            )}
          </div>
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
                onClick={() => {
                  dispatch(setResetToggle(true));
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
                    {option.label}{" "}
                    <div className='border border-1 w-[22px] h-[22px] rounded'>
                      <AiOutlineCheck
                        className={`
                      w-full h-full
                      ${
                        [...new Set(inputValue)].find(
                          (item) => item === option.label
                        )
                          ? "block"
                          : "hidden"
                      }`}
                      />
                    </div>
                    <input
                      value={isChecked}
                      onChange={handleChange}
                      id={option.label + "option"}
                      type='checkbox'
                      className='hidden'
                    />
                  </label>
                ) : (
                  <div className='p-2 cursor-pointer flex justify-between items-center'>
                    {option.label}{" "}
                    <AiOutlineCheck
                      className={`w-[22px] h-[22px] ${
                        option.label === inputValue ? "block" : "hidden"
                      }`}
                    />
                  </div>
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

export default memo(Select);
