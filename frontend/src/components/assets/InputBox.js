import React from "react";

const InputBox = ({
  className,
  label,
  type,
  max,
  min,
  name,
  value,
  onChange,
}) => {
  return (
    <>
      <div className={className}>
        <label
          htmlFor="code"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          {label}
        </label>
        <input
          type={type}
          max={max}
          min={min}
          className="w-full h-12 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-lg focus:border-blue focus:outline-none focus:ring focus:ring-blue focus:ring-opacity-20 p-1"
          required
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </>
  );
};

export default InputBox;
