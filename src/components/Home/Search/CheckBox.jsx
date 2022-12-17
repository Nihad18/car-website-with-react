import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setValues,
  setExtraBooleanFieldsValue,
} from "../../../redux/reducers/searchSlice";

const CheckBox = ({
  placeHolder,
  containerClassName,
  inputClassName,
  index,
  type,
  onChangeType = false,
}) => {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.search.values);
  const extraBooleanFieldsValue = useSelector(
    (state) => state.search.extraBooleanFieldsValue
  );
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = (e) => {
    // Destructuring
    const { value, checked } = e.target;
    // Case 1 : The user checks the box

    if (checked) {
      dispatch(setExtraBooleanFieldsValue([...extraBooleanFieldsValue, value]));
    }

    // Case 2  : The user unchecks the box
    else {
      dispatch(
        setExtraBooleanFieldsValue(
          extraBooleanFieldsValue.filter((e) => e !== value)
        )
      );
    }
  };
  return (
    <div className={`${containerClassName} select-none`}>
      <input
        className='hidden'
        onClick={() => setIsChecked(!isChecked)}
        onChange={
          onChangeType
            ? (e) => {
                dispatch(setValues({ ...values, [type]: e.target.checked }));
              }
            : handleChange
        }
        value={index}
        type='checkbox'
        id={placeHolder}
      />
      <label
        htmlFor={placeHolder}
        className={`
        ${inputClassName}
        ${
          isChecked
            ? "bg-red-300 dark:text-black border-red-500"
            : "dark:text-white"
        } w-full h-full flex justify-center items-center border rounded cursor-pointer`}
      >
        {placeHolder}
      </label>
    </div>
  );
};

export default CheckBox;
