import React from "react";
import Select from "react-select";
const Input = ({
  name,
  sup,
  options,
  placeholder,
  value,
  isDisabled,
  onChange,
}) => {
  return (
    <div className='pt-2 pb-2 w-[48%] flex items-center justify-between'>
      <div>
        {name}
        <sup>{sup}</sup>
      </div>
      <div className='w-[250px]'>
        <Select
          className='text-black'
          isClearable
          options={options}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          isDisabled={isDisabled}
          styles={{
            singleValue: (base) => ({ ...base, color: "white" }),
            valueContainer: (base) => ({
              ...base,
              background: "#1C1C1E",
            }),
            indicatorsContainer: (base) => ({
              ...base,
              background: "#1C1C1E",
              color: "#fff",
            }),
            option: (base) => ({
              ...base,
              background: "#1C1C1E",
              color: "#fff",
              "--custom-color":"#3C3F53",
              cursor: "pointer",
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
              ...theme.colors,
              primary25: "red",
              primary: "#212123",
            },
          })}
        />
      </div>
    </div>
  );
};

export default Input;
