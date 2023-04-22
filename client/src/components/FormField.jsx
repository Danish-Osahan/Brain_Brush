import React from "react";

const FormField = ({
  LabelName,
  type,
  value,
  name,
  placeholder,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
          {LabelName}
        </label>
        {isSurpriseMe&& (
          <button type="button" onClick={handleSurpriseMe}
          className="font-semibold px-2 py-1 bg-[#ececf1] rounded-md text-black">
           SurpriseMe
          </button>
        )}
        <input className="bg-gray-100 mt-1 shadow-md border border-gray-300 text-gray-900 text-sm rounded-md p-3 focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full" type={type} name={name} id={name}  placeholder={placeholder} onChange={handleChange} value={value}/>
      </div>
    </div>
  );
};

export default FormField;
