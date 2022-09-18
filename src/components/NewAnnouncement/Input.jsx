import React from 'react'
import Select from "react-select"
const Input = ({name,sup,options,placeholder,value,isDisabled,onChange}) => {
  return (
    <div className='pt-2 pb-2 w-[48%] rounded flex items-center justify-between'>
          <div >{name}<sup>{sup}</sup></div>
          <div className='w-[250px]'>
          <Select
            className='text-black'
            isClearable
            options={options}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isDisabled={isDisabled}
          />
          </div>
        </div>
  )
}

export default Input