"use client";
import { IconType } from "react-icons";

type CategoryInputProps = {
  selected?: boolean;
  label: string;
  onClick: (value: string) => void;
  icon: IconType;
};

const CategoryInput = ({
  selected,
  label,
  onClick,
  icon: Icon,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-4 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer ${
        selected ? "border-slate-500" : "border-slate-200"
      }`}
    >
      <Icon size={20} />
      <div className="font-medium text-sm text-center break-normal">
        {label}
      </div>
    </div>
  );
};

export default CategoryInput;
