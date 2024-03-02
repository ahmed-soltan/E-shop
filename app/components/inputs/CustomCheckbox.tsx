"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type CustomCheckbox = {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
};
const CustomCheckbox = ({ id, label, disabled, register }: CustomCheckbox) => {
  return (
    <div className="w-full flex flex-row gap-2 items-center">
      <input
        type="checkbox"
        autoComplete="off"
        id={id}
        disabled={disabled}
        {...register(id)}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="font-medium cursor-pointer">{label}</label>
    </div>
  );
};

export default CustomCheckbox;
