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
    <div className="flex items-center   my-12">
      <span className="font-normal lg:w-52 text-base">{label}:</span>
      <div className="flex space-x-4">
        {options.map((option) => (
          <div key={option}>
            <label
              htmlFor={option}
              className={`p-4  cursor-pointer rounded ${
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
