import { IconType } from "react-icons";

const GridItem = ({
  Icon,
  title,
  username,
  className,
  buttonClassName,
  buttonTitle,
  iconColor,
}: {
  Icon: IconType;
  title: string;
  username?: string;
  className: string;
  buttonClassName: string;
  buttonTitle: string;
  iconColor?:string,
}) => {
  return (
    <div
      className={`p-6 shadow-md max-w-[175px flex flex-col rounded-3xl ${className}`}
    >
      <Icon size={40} color={iconColor}/>
      <p className="text-sm font-semibold mt-1">{title}</p>
      <p className="text-xs text-text-secondary ">{username}</p>
      <button
        className={`${buttonClassName}  border-2 px-2 text-xs w-fit p-1 rounded-xl mt-auto `}
      >
        {buttonTitle}
      </button>
    </div>
  );
};
export default GridItem;
