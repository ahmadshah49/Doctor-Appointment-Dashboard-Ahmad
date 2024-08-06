"use client";
import { ProfileInputProps } from "@/app/types/Type";
import clsx from "clsx";

const ProfileInput: React.FC<ProfileInputProps> = ({
  htmlFor,
  id,
  label,
  name,
  onChange,
  type,
  value,
  readonly,
  required,
  hidden,
}) => {
  return (
    <div className={clsx(`flex flex-col  gap-2 my-4`, hidden && "hidden")}>
      <label
        htmlFor={htmlFor}
        className="
        font-semibold
                  "
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={id}
        value={value}
        readOnly={readonly}
        required={required}
        className="
        md:w-[50%]
        w-full
        py-4
        px-4
        rounded-xl
        active:outline-none
        active:border-1 
        border
      border-primary
      focus:border-primary
                
                  "
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default ProfileInput;
