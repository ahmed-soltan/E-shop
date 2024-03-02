import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

type TextAreaProps = {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  value?: string;
};
const TextArea = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
  value,
}: TextAreaProps) => {
  return (
    <div className="w-full relative">
      <textarea
        id={id}
        required={required}
        disabled={disabled}
        {...register(id, {
          required: true,
         
        })}
        value={value}
        className={`
       peer 
       w-full 
       p-4
       pt-6 
       outline-none
       bg-white
       max-h-[150px]
       min-h-[150px]
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
    ${errors[id] ? "text-rose-500" : "text-slate-300"}
  `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
