import React, { useEffect, useState } from "react";
// import Select from "react-select";
import Select from "../../Select/Select";
import { useSelector, useDispatch } from "react-redux";
import { setValues } from "../../../redux/reducers/searchSlice";
const DetailedSearch = () => {
  const dispatch = useDispatch();
  const detailedSearchToggle = useSelector(
    (state) => state.search.detailedSearchToggle
  );
  const values = useSelector((state) => state.search.values);
  const data = useSelector((state) => state.search.data);
  console.log("values : "+values.minYearValue)
  return (
    <div className={`${!detailedSearchToggle && "hidden"}`}>
      <div className='flex justify-between lg:my-4'>
        <Select
          options={data?.year}
          isMulti={false}
          placeHolder='Il'
          Type={"eee"}
  // bele istifade elemek isteyirem
        // value={values?.year}
        />
        <Select
          options={data?.city}
          isMulti={true}
          placeHolder='Şəhər'
        />

        {/* <Select
          className='lg:w-[270px] xl:w-[300px] rounded '
          isClearable
          options={data?.year}
          placeholder='Ban növü'
          value={values?.minYearValue}
          onChange={(e) => dispatch(setValues({ ...values, minYearValue: e }))}
        />
        <Select
          className='lg:w-[270px] xl:w-[300px] rounded '
          isClearable
          options={data?.year}
          placeholder='Rəng'
          value={values?.minYearValue}
          onChange={(e) => dispatch(setValues({ ...values, minYearValue: e }))}
        />
        <Select
          className='lg:w-[270px] xl:w-[300px]  rounded '
          isClearable
          options={data?.year}
          placeholder='Yanacaq növü'
          value={values?.minYearValue}
          onChange={(e) => dispatch(setValues({ ...values, minYearValue: e }))}
        /> */}
      </div>
    </div>
  );
};

export default DetailedSearch;
