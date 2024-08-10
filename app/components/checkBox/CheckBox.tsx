import { CheckBoxProps } from "@/app/types/Type";

const CheckBox = <T extends string>({
  options,
  selectedOption,
  setSelectedOption,
  label,
}: CheckBoxProps<T>) => {
  const handleOptionChange = (value: T) => {
    setSelectedOption(value);
  };

  return (
    <div className="flex  max-sm:justify-between items-center gap-4  my-12">
      <p className="md:text-[18px] text-sm text-grayLight lg:w-52 sm:w-40 w-28  font-normal">
        {label}
      </p>

      <div className="flex md:flex-row flex-col md:space-y-0 max-sm:w-full space-y-6 md:space-x-4">
        {options.map((option) => (
          <div key={option}>
            <label
              htmlFor={option}
              className={`md:p-4 p-2  cursor-pointer rounded ${
                selectedOption === option
                  ? "bg-primary text-white"
                  : "border border-gray-400 text-black"
              }`}
            >
              {option}
            </label>
            <input
              type="radio"
              id={option}
              name={label}
              className="hidden"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionChange(option)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckBox;
