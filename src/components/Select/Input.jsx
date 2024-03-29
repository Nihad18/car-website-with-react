import React from "react";
import { useState, useEffect} from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import { setValues } from "../../redux/reducers/searchSlice";
import {setVals} from "../../redux/reducers/newPostSlice";
import { setResetToggle } from "../../redux/reducers/toggleSlice";
// Icons
import { RiCloseCircleFill } from "react-icons/ri";
const Input = ({ placeHolder, containerClassName, type,inputValueLength,newPost=false }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const values = useSelector((state) => state.search.values);
  const postValues = useSelector((state) => state.newPost.values);
  const resetToggle = useSelector((state) => state.toggle.resetToggle);
  useEffect(() => {
    newPost 
    ? dispatch(setVals({ ...postValues, [type]: inputValue }))
    : dispatch(setValues({ ...values, [type]: inputValue }));
  }, []);
  const resetInputValue = () => {
    setInputValue("");
  };
  useEffect(()=>{
        if(!isNaN(inputValue) || Number(inputValue)<0){
            if(inputValue[0]==="0"){
              setInputValue(inputValue.slice(0,1))
            }
        }
        else{
          setInputValue("");  
        }
        if(!resetToggle){
          setInputValue("");
        }
  },[inputValue,resetToggle]);
  return (
    <div className={`${containerClassName}`}>
      <div className={`relative flex h-[46px] w-full mb-2 cursor-pointer`}>
        <input
          maxLength={inputValueLength}
          size={inputValueLength}
          required={true}
          value={inputValue}
          id={placeHolder} // unique id
          onChange={(e) => {
            setInputValue(e.target.value);
            dispatch(setResetToggle(true));
          }}
          className='outline-none px-[7px] valid:pt-5 peer relative w-full h-full text-sm text-gray-900 dark:text-white bg-[#ECF2F9] rounded border border-gray-300 dark:bg-gray-600'
        />
        <span className='text-[#8E8EA9] dark:text-gray-300 top-[14px] left-2 absolute text-sm cursor-text pointer-events-none peer-valid:top-0.5 peer-valid:text-sm peer-valid:pb-2'>
          {placeHolder ? placeHolder : "text"}
        </span>
        <label
          onClick={resetInputValue}
          htmlFor={placeHolder}
          className={`${
            !inputValue && "hidden"
          } h-[20px] w-4 absolute right-2 bottom-2  bg-gray-50 dark:bg-gray-600`}
        >
          <RiCloseCircleFill className='text-slate-400 text-xl cursor-pointer' />
        </label>
      </div>
    </div>
  );
};

export default Input;
