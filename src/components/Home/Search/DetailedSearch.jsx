import React, { useEffect } from "react";
// import Select from "react-select";
import Select from "../../Select/Select"
import { useSelector, useDispatch } from "react-redux";
import { setValues } from "../../../redux/reducers/searchSlice";
const DetailedSearch = () => {
  const dispatch = useDispatch();
  const detailedSearchToggle = useSelector(
    (state) => state.search.detailedSearchToggle
  );
  const values = useSelector((state) => state.search.values);
  const data = useSelector((state) => state.search.data);
  
  
  return (
    <div className={`${!detailedSearchToggle && "hidden"}`}>
      <div className='flex justify-between lg:my-4'>
        <Select options={data?.year}/>
        {/* <div className='max-h-[150px]'>
          <select
            onChange={(e) =>
              dispatch(setValues({ ...values, minYearValue: e.target.value }))
            }
            class='h-full w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value='' selected>
              Year
            </option>
            {data?.year?.map((item) => {
              return (
                <option
                  value={item?.label}
                  key={item.label}
                  className={`${
                    item.label === Number(values.minYearValue) && "text-red-500"
                  }`}
                >
                  {item?.label}
                </option>
              );
            })}
          </select>
        </div> */}

        
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
