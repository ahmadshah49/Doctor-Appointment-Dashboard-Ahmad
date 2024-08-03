import React from "react";

interface inputProps {
  label: string;
  placeHolder?: string;
  type?: string;
  name: string;
  id: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  sup?: boolean;
}
const Input: React.FC<inputProps> = ({
  label,
  placeHolder,
  type,
  name,
  id,
  value,
  onChange,
  disabled,
  required,
  sup,
}) => {
  return (
    <div className="w-full my-6">
      <label
        className="
      text-sm
    "
        htmlFor={id}
      >
        {label}
        <sup className="text-red-600 text-base">*</sup>
      </label>
      <div>
        <input
          type={type}
          placeholder={placeHolder}
          disabled={disabled}
          id={id}
          name={name}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          required={required}
          className="
          border-b 
          border-gray-400
          outline-none
          focus:border-black
          pt-2
          primary:text-[22px]
          md:text-[18px]
          font-medium
          w-full
          disabled:cursor-not-allowed
          "
        />
      </div>
    </div>
  );
};

export default Input;
