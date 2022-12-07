import React from "react";
// import Select from "react-select";
import Select from "../../Select/Select";
import { useSelector} from "react-redux";
const DetailedSearch = () => {
  const detailedSearchToggle = useSelector(
    (state) => state.search.detailedSearchToggle
  );
  const data = useSelector((state) => state.search.data);
  return (
    <div className={`${!detailedSearchToggle && "hidden"}`}>
      <div className='flex justify-between lg:my-4'>
        <Select
          options={data?.gears}
          placeHolder='Gear'
          type={"minYearValue"}
          />
        <Select
          options={data?.fuels}
          placeHolder='Yanacaq növü'
          type={"fuelValue"}
          isMulti={true}
          ID={true}
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
