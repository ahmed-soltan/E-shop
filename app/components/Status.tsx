import { IconBaseProps, IconType } from "react-icons";

type StatusProps = {
  text: string;
  icon: IconType;
  color: string;
  bg: string;
};

const Status = ({ text, icon: Icon, color, bg }: StatusProps) => {
  return (
    <div
      className={`flex items-center gap-1 ${bg} ${color} p-1 rounded`}
    >
      {text}
      <Icon size={18} color={color} />
    </div>
  );
};

export default Status;
