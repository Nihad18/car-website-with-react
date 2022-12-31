import React from "react";
import { useState, useEffect, memo } from "react";
import { MdArrowBackIos } from "react-icons/md";
import { RiArrowDownSLine } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
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
const MobileViewSelect = ({
  placeholder,
  single = false,
  options,
  type,
  secondType,
  brand = false,
  model = false,
  postBrand = false,
  postModel = false,
  newPost = false,
  ID = false,
  isDisabled = false,
}) => {
  const [toggle, setToggle] = useState(false);
  const [secondToggle, setSecondToggle] = useState(false);
  const [thirdToggle, setThirdToggle] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [secondIdValue, setSecondIdValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [secondSelectedValue, setSecondSelectedValue] = useState("");
  const dispatch = useDispatch();
  const values = useSelector((state) => state.search.values);
  const postValues = useSelector((state) => state.search.values);
  const resetToggle = useSelector((state) => state.toggle.resetToggle);

  useEffect(() => {
    (brand === false || model === false) &&
      single &&
      dispatch(
        setValues({
          ...values,
          [type]: ID ? idValue : selectedValue,
        })
      );
    (brand === false || model === false) &&
      dispatch(
        setValues({
          ...values,
          [type]: ID ? idValue : selectedValue,
          [secondType]: ID ? secondIdValue : secondSelectedValue,
        })
      );
    newPost === true &&
      dispatch(
        setVals({
          ...postValues,
          [type]: ID ? idValue : selectedValue,
        })
      );
    brand === true && dispatch(setBrandValue(idValue));
    model === true && dispatch(setModelValue(idValue));

    postBrand === true && dispatch(setBrandVals(idValue));
    postModel === true && dispatch(setModelVals(idValue));
  }, [dispatch, selectedValue, idValue]);
  useEffect(() => {
    if (!resetToggle || isDisabled) {
      setSelectedValue("");
    }
  }, [selectedValue, resetToggle, isDisabled]);

  useEffect(() => {
    if (!toggle) {
      setSearchValue("");
    }
  }, [searchValue, toggle]);

  const filtered = options?.filter(
    (item) =>
      item.label.toString().toLowerCase().indexOf(searchValue.toLowerCase()) !==
      -1
  );
  return (
    <div
      className={`${
        isDisabled && "opacity-70 pointer-events-none"
      } w-[220px] h-[34px] bg-[#ECF2F9] text-[#081A3E] mb-3 mr-3 px-3 pt-2 pb-2 rounded flex`}
    >
      {/*---Preview */}
      <div className='text-sm flex justify-between items-center w-full'>
        <div onClick={() => setToggle(!toggle)} className='w-4/5'>
        {placeholder} {selectedValue && " : "}
            {selectedValue}{" "}
            <span className={`${!secondSelectedValue && 'hidden' }`}>
            {secondSelectedValue && selectedValue
              ? " - " + secondSelectedValue
              : (" : " + secondSelectedValue)}
            </span>
        </div>
        <div className='text-xl cursor-pointer'>
          {selectedValue ? (
            <AiOutlineClose
              onClick={() => {
                setSelectedValue("");
                setSecondSelectedValue("");
                setToggle(toggle);
              }}
            />
          ) : (
            <RiArrowDownSLine onClick={() => setToggle(!toggle)} />
          )}
        </div>
      </div>
      {/*------------------------------------------------------------------------------------*/}
      <div
        className={`${!toggle ? "hidden" : "block lg:hidden"}
          w-full h-full overflow-y-auto z-50 absolute top-0 left-0 text-[#081A3E] bg-white dark:text-white dark:bg-[#1C1C1E]`}
      >
        <div className='flex items-center justify-between mx-auto h-[60px] w-full sm:w-[540px] pl-6 pr-6 dark:bg-[#242426]'>
          <MdArrowBackIos
            className='w-[10%]'
            onClick={() => setToggle(!toggle)}
          />
          <div className='w-[90%] flex justify-center'>
            {placeholder} {selectedValue && " : "}
            {selectedValue}{" "}
            <span className={`${!secondSelectedValue && 'hidden' }`}>
            {secondSelectedValue && selectedValue
              ? " - " + secondSelectedValue
              : (" : " + secondSelectedValue)}
            </span>
          </div>
        </div>

        <div className='w-full border-b border-[#ecf2f9] mb-4'></div>

        {single ? (
          <div className='w-full sm:w-[540px] pl-6 pr-6 mx-auto'>
            <input
              type='text'
              value={searchValue}
              placeholder='Axtarın'
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              className='outline-none w-full h-[34px] px-[7px] mt-1 mb-4 text-sm text-gray-900 dark:text-white bg-[#ECF2F9] rounded-md dark:bg-gray-600'
            />
            <ul>
              {filtered?.map((option) => (
                <li
                  onClick={() => {
                    setToggle(!toggle);
                    setSelectedValue(option.label);
                    setIdValue(option.value);
                  }}
                  key={option.value}
                  className={`${
                    option.label === selectedValue && "text-red-500"
                  } cursor-pointer hover:bg-[#ecf2f3] border-t border-[#ecf2f9] `}
                >
                  <div className='p-2 cursor-pointer flex justify-between items-center'>
                    {option.label}{" "}
                    <AiOutlineCheck
                      className={`w-[22px] h-[22px] ${
                        option.label === selectedValue ? "block" : "hidden"
                      }`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className='w-full sm:w-[540px] pl-6 pr-6 mx-auto flex justify-center'>
            <div
              className={`${
                (secondToggle || thirdToggle) && "hidden"
              }  text-sm flex justify-between items-center w-full`}
            >
              <div
                onClick={() => setSecondToggle(!secondToggle)}
                className='w-4/5'
              >
                {selectedValue ? selectedValue : "min"}
              </div>
              <div className='text-xl cursor-pointer'>
                {selectedValue ? (
                  <AiOutlineClose
                    onClick={() => {
                      setSelectedValue("");
                      setSecondToggle(secondToggle);
                    }}
                  />
                ) : (
                  <RiArrowDownSLine
                    onClick={() => setSecondToggle(!secondToggle)}
                  />
                )}
              </div>
            </div>

            <ul
              className={`${
                !secondToggle ? "hidden" : "block lg:hidden"
              } w-full sm:w-[540px] pl-6 pr-6 mx-auto`}
            >
              {options?.map((option) => (
                <li
                  onClick={() => {
                    setSecondToggle(!secondToggle);
                    setSelectedValue(option.label);
                    setIdValue(option.value);
                  }}
                  key={option.value}
                  className={`${
                    option.label === selectedValue && "text-red-500"
                  } cursor-pointer hover:bg-[#ecf2f3] border-t border-[#ecf2f9] `}
                >
                  <div className='p-2 cursor-pointer flex justify-between items-center'>
                    {option.label}{" "}
                    <AiOutlineCheck
                      className={`w-[22px] h-[22px] ${
                        option.label === selectedValue ? "block" : "hidden"
                      }`}
                    />
                  </div>
                </li>
              ))}
            </ul>

            {/*================== SECOND SELECT =================================================== */}
            <div
              className={`${
                (secondToggle || thirdToggle) && "hidden"
              }  text-sm flex justify-between items-center w-full ml-4`}
            >
              <div
                onClick={() => setThirdToggle(!thirdToggle)}
                className='w-4/5'
              >
                {secondSelectedValue ? secondSelectedValue : "maks"}
              </div>
              <div className='text-xl cursor-pointer'>
                {secondSelectedValue ? (
                  <AiOutlineClose
                    onClick={() => {
                      setSecondSelectedValue("");
                      setThirdToggle(thirdToggle);
                    }}
                  />
                ) : (
                  <RiArrowDownSLine
                    onClick={() => setThirdToggle(!thirdToggle)}
                  />
                )}
              </div>
            </div>
            <ul
              className={`${
                !thirdToggle ? "hidden" : "block lg:hidden"
              } w-full sm:w-[540px] pl-6 pr-6 mx-auto`}
            >
              {options?.map((option) => (
                <li
                  onClick={() => {
                    // dispatch(setResetToggle(true));
                    setThirdToggle(!thirdToggle);
                    setSecondSelectedValue(option.label);
                    setSecondIdValue(option.value);
                  }}
                  key={option.value}
                  className={`${
                    option.label === secondSelectedValue && "text-red-500"
                  } cursor-pointer hover:bg-[#ecf2f3] border-t border-[#ecf2f9] `}
                >
                  <div className='p-2 cursor-pointer flex justify-between items-center'>
                    {option.label}{" "}
                    <AiOutlineCheck
                      className={`w-[22px] h-[22px] ${
                        option.label === secondSelectedValue
                          ? "block"
                          : "hidden"
                      }`}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MobileViewSelect);
