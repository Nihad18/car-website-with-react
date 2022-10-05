import React from 'react'
import { useState } from 'react'
import Select from "react-select";
import { MdArrowBackIos } from "react-icons/md";
import { RiArrowDownSLine} from "react-icons/ri";
const MobileViewSelect = ({name}) => {
    const [toggle, setToggle] = useState(false);
  return (
    <div className='w-full h-[34px] px-1 pt-2 pb-2 rounded flex'>
          {/*---MOBILE - BREAK POINTS (1024PX) */}
          <div className='text-sm flex justify-between items-center w-full' onClick={() => setToggle(!toggle)}>
            <div>{name}</div>
            <div className='text-lg'><RiArrowDownSLine/></div>
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
              <div className='w-[95%] flex justify-center'>{name}</div>
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
  )
}

export default MobileViewSelect