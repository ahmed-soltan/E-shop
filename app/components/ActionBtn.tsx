import { IconType } from "react-icons";

type ActionBtnProps = {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
};
const ActionBtn = ({ icon: Icon, onClick, disabled }: ActionBtnProps) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[40px] text-slate-700 border border-slate-400 ${
        disabled && "opacity cursor-not-allowed"
      }`}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionBtn;
