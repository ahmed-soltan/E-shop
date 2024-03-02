import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  disabled?: boolean;
  outlined?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
const Button = ({
  label,
  disabled,
  outlined,
  small,
  custom,
  icon: Icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:opacity:70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${
        outlined ? "bg-white text-slate-700" : "bg-slate-700 text-white"}
        ${small ? "text-sm py-1 px-2 font-light border-[1px]" : 'text-md py-3 px-4 font-semibold border-2'}
        ${custom? custom : ''}
        `}
        onClick={onClick}
    >
        {Icon&&<Icon size={24}/>}
        {label}
    </button>
  );
};

export default Button;
