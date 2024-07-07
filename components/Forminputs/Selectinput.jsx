import React from "react";

const Selectinput = ({ label, name, register, errors, options, className}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-sm font-medium text-white-700">{label}</label>
      <select
        name={name}
        {...register(name)}
        className="mt-1 block ww-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-xs">{errors[name].message}</span>
      )}  
    </div>
  );
};

export default Selectinput;