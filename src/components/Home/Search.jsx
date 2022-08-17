import { useState, useEffect } from "react";
import Select from "react-select";
import { MdArrowBackIos } from "react-icons/md";
const Search = () => {
  const types = [" Bütün", "Yeni", "İşlənmiş"];
  const [active, setActive] = useState(types[0]);
  const [brandValue, setBrandValue] = useState(null);
  const [modelValue, setModelValue] = useState(null);
  const [generationValue, setgenerationValue] = useState(null);
  const [toggle, setToggle] = useState(false);
  const brands = [
    { value: "BMW", label: "BMW" },
    { value: "Mercedes", label: "Mercedes" },
    { value: "AUDI", label: "AUDI" },
  ];
  const models = [
    { value: "gle 450", label: "gle 450" },
    { value: "m5", label: "gle m5" },
    { value: "m6", label: "gle m6" },
  ];
  const generation = [
    { value: "1gle 450", label: "gle 450" },
    { value: "2gle 450", label: "gle 450" },
    { value: "3gle 450", label: "gle 450" },
  ];
  useEffect(() => {
    setModelValue(null);
  }, [brandValue]);
  useEffect(() => {
    setgenerationValue(null);
  }, [brandValue, modelValue]);
  return (
    <div
      className='h-[60px] w-full sm:w-[540px] pl-6 pr-6 mx-auto //mobile
    lg:bg-[#081A3E] dark:bg-red-500 lg:text-white lg:h-[90px]  lg:min-w-[960px] mt-8'
    >
      <div className='text-red-500 flex w-full'>
        {types.map((type) => (
          <button
            className={`w-full h-[34px] px-3 pt-2 pb-2  mr-2 rounded hover:bg-red-100 dark:hover:bg-slate-500 border border-red-500  dark:border-slate-500 dark:text-white flex justify-center items-center
        ${
          active === type &&
          "!bg-red-500 !text-white hover:!bg-red-500 dark:!bg-white dark:!text-black dark:hover:!bg-white"
        } `}
            key={type}
            active={active === type}
            onClick={() => setActive(type)}
          >
            {type}
          </button>
        ))}
      </div>

      <div className='text-black dark:text-white flex w-full'>
        <div className='w-full h-[34px] px-1 pt-2 pb-2 rounded '>
          <Select
            isClearable
            options={brands}
            placeholder='Marka'
            value={brandValue}
            onChange={setBrandValue}
          />
        </div>
        <div className='w-full h-[34px] px-1 pt-2 pb-2 rounded'>
          <Select
            isClearable
            options={models}
            placeholder='Model'
            value={modelValue}
            onChange={setModelValue}
            isDisabled={!brandValue}
          />
        </div>
      </div>
      <div className='text-black dark:text-white flex w-full'>
        <div className='w-full h-[34px] px-1 pt-2 pb-2 rounded'>
          <Select
            isClearable
            options={generation}
            placeholder='Nəsil'
            value={generationValue}
            onChange={setgenerationValue}
            isDisabled={!brandValue || !modelValue}
          />
        </div>

        <div className='w-full h-[34px] px-1 pt-2 pb-2 rounded flex'>
          {/*---MOBILE - BREAK POINTS (1024PX) */}
          <div className='text-sm' onClick={() => setToggle(!toggle)}>
            Buraxılış ili
          </div>
          <div
            className={`${!toggle ? "hidden" : "block lg:hidden"}
          w-full h-full z-50 absolute top-0 left-0 bg-white dark:bg-black`}
          >
            <div className='flex items-center justify-between mx-auto h-[60px] w-full sm:w-[540px] pl-6 pr-6 '>
              <MdArrowBackIos
                className='w-[5%]'
                onClick={() => setToggle(!toggle)}
              />
              <div className='w-[95%] flex justify-center'>Buraxılış ili</div>
            </div>

            <div className='w-full border-b-[2px] border-black dark:border-white'></div>

            <div className='w-full flex justify-center'>
              <div className='w-[40%] h-[34px] px-1 pt-2 pb-2 rounded'>
                <Select isClearable placeholder='min' />
              </div>
              <div className='w-[40%] h-[34px] px-1 pt-2 pb-2 rounded'>
                <Select isClearable placeholder='max' />
              </div>
            </div>
          </div>
          {/* ---------------------------------- */}
        </div>
      </div>
    </div>
  );
};

export default Search;
