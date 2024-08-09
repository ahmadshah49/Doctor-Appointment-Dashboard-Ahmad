import { InputTwoTypes } from "@/app/types/Type";

const InputTwo: React.FC<InputTwoTypes> = ({
  id,
  label,
  name,
  placeHolder,
  value,
  disabled,
  onChange,
  required,
  type,
}) => {
  return (
    <div className="flex lg:gap-4 gap-2   items-center my-4 ">
      <label
        htmlFor={id}
        className="md:text-[18px] text-sm text-grayLight lg:w-52 sm:w-40 w-28  font-normal"
      >
        {label}
      </label>
      <input
        type={type}
        placeholder={placeHolder}
        disabled={disabled}
        id={id}
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        required={required}
        className=" border-[1px] 
          border-gray-400
          outline-none
          focus:border-black
          p-2
          md:w-[415px]
          w-full
          rounded-[5px]
          primary:text-[22px]
          md:text-[18px]
          font-medium

          
          disabled:cursor-not-allowed"
      />
    </div>
  );
};

export default InputTwo;
