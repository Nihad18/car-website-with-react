import React from 'react'
import Select from "react-select"
const Input = ({name,options,placeholder,value,onChange}) => {
  return (
    <div className='px-1 pt-2 pb-2 rounded flex items-center'>
          <div className='mr-5'>{name}</div>
          <div className='w-[250px]'>
          <Select
           isClearable
            options={options}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
          </div>
        </div>
  )
}

export default Input