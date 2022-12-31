import React from "react";
//custom components
import Select from "../../Select/Select";
import Input from "../../Select/Input";
import CheckBox from "../../Select/CheckBox";
//---------------------
import { useSelector } from "react-redux";
const DetailedSearch = () => {
  const detailedSearchToggle = useSelector(
    (state) => state.search.detailedSearchToggle
  );
  const data = useSelector((state) => state.data.data);

  return (
    <div className={`${!detailedSearchToggle && "hidden"}`}>
      <div className='flex justify-between md:grid lg:grid-cols-3 xl:grid-cols-4 '>
        <Select
          options={data?.fuels}
          placeHolder='Yanacaq növü'
          type={"fuelValue"}
          isMulti={true}
          ID={true}
        />
        <Select
          options={data?.gears}
          placeHolder='Ötürücü'
          type={"gearValue"}
          isMulti={true}
          ID={true}
        />
        <Select
          options={data?.transmission}
          placeHolder='Sürətlər qutusu'
          type={"transmissionValue"}
          isMulti={true}
          ID={true}
        />
        <div className='flex'>
          <Select
            options={data?.engineVolume}
            placeHolder='Həcm ,min.'
            type={"minEngineVolumeValue"}
            containerClassName={"w-[120px] mr-2"}
          />
          <Select
            options={data?.engineVolume}
            placeHolder='maks'
            type={"maxEngineVolumeValue"}
            containerClassName={"w-[120px]"}
          />
        </div>

        <div className='flex'>
          <Input
            placeHolder={"Güc (a.g) min."}
            type={"minEnginePowerValue"}
            inputValueLength={4}
            containerClassName={"w-[116px] mr-2"}
          />
          <Input
            placeHolder={"maks"}
            type={"maxEnginePowerValue"}
            inputValueLength={4}
            containerClassName={"w-[116px]"}
          />
        </div>

        <div className='flex'>
          <Input
            placeHolder={"Yürüş (km), min."}
            type={"minMileageValue"}
            inputValueLength={7}
            containerClassName={"w-[116px] mr-2"}
          />
          <Input
            placeHolder={"maks"}
            type={"maxMileageValue"}
            inputValueLength={7}
            containerClassName={"w-[116px]"}
          />
        </div>

        <Select
          options={data?.priorOwnerCount}
          placeHolder='Sahiblərin sayı'
          type={"priorOwnerCountValue"}
          isMulti={true}
          ID={true}
        />
        <Select
          options={data?.seatsCount}
          placeHolder='Yerlərin sayı'
          type={"seatsCountValue"}
          isMulti={true}
          ID={true}
        />
        <div className='flex'>
          <CheckBox
            placeHolder={"Vuruğu yoxdur"}
            containerClassName={"w-[120px] h-[48px]"}
            onChangeType={true}
            type={"crashedValue"}
          />
          <CheckBox
            placeHolder={"Rənglənməyib"}
            containerClassName={"w-[120px] h-[48px] ml-2"}
            onChangeType={true}
            type={"paintedValue"}
          />
        </div>
        <Select
          options={data?.market}
          placeHolder='Hansı bazar üçün yığılıb?'
          type={"marketValue"}
          isMulti={true}
          ID={true}
        />
      </div>

      <div>
        <div className='my-2 flex items-center justify-between'>
          <div className='dark:text-white mr-4'>Avtomobilin təhcizatı</div>
          <div className="bg-[#dfe3e9] w-[85%] h-[1px]"></div>
        </div>
        <div className='flex flex-wrap'>
          {data?.extraBooleanFields.map((item, index) => {
            return (
              <CheckBox
                key={index+1}
                placeHolder={item}
                containerClassName={"mr-2 my-2"}
                inputClassName={"p-2"}
                index={index + 1}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DetailedSearch;
