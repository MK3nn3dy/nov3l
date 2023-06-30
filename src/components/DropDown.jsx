import React from "react";

const DropDown = ({
  value,
  handleChange,
  options,
  labelName,
  styles,
  filter = "",
}) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName ? (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      ) : (
        ""
      )}
      <select
        className={`py-[17px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#383843] 
        bg-transparent font-epilogue text-white 
        rounded-[10px] ${styles ? styles : ""}`}
        onChange={handleChange}
        value={value}
      >
        {filter != "" && (
          <option className="text-white font-epilogue bg-[#1c1c24]" value="">
            All {filter}s
          </option>
        )}
        {options.map((option, i) => (
          <option
            className="text-white font-epilogue bg-[#1c1c24]"
            key={option + i.toString()}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default DropDown;
