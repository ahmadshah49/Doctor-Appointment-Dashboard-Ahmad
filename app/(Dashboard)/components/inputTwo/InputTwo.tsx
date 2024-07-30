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
    <div className="flex items-center my-4 ">
      <label
        htmlFor={id}
        className="text-[18px] text-grayLight lg:w-52 gap-8 font-normal"
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
          w-[415px]
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
