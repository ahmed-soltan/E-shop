"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type InputProps = {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
};
const Input = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  value,
}: InputProps) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return (
    <div className="w-full relative">
      <input
        type={type}
        autoComplete="off"
        id={id}
        required={required}
        disabled={disabled}
        {...register(id, {
            required: true,
            validate: (value) => {
              if (id === "email" && !emailRegex.test(value)) {
                return "Email is not Valid";
              }
              return true; // Indicates validation passed
            }
          })}
          
        value={value}
        className={`
           peer 
           w-full 
           p-4
           pt-6 
           outline-none
           bg-white
           font-light border-2
           rounded-md 
           transition
           disabled:opacity-70
           disabled:cursor-not-allowed
           ${
            errors[id]
               ? "border-rose-400 focus:border-rose-400"
               : "border-slate-300 focus:border-slate-300"
           }
        `}
      />
      <label
        htmlFor={id}
        className={`
        absolute
        cursor-text
        top-5
        left-4
        z-10
        origin-[0px]
        text-md
        font-medium
        text-slate-700
        transform
        -translate-y-3
        duration-150
        peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-4
        peer-focus:scale-75
        peer-focus:-translate-y-4
        ${ errors[id] ? "text-rose-500" : "text-slate-300"}
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
