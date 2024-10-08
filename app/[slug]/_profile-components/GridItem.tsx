import Image from "next/image";
import { IconType } from "react-icons";
import GithubContri from "./_item-components/GithubContri";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import ChangeSpan from "./_item-components/ChangeSpan";

const GridItem = ({
  Icon,
  faviconLink,
  title,
  username,
  link,
  className,
  buttonClassName,
  buttonTitle,
  iconColor,
  type,
}: {
  link: string;
  Icon?: IconType;
  title?: string;
  username?: string;
  className?: string;
  buttonClassName?: string;
  buttonTitle?: string;
  iconColor?: string;
  faviconLink?: string;
  type?: string;
}) => {
  if (type == "github") {
    buttonClassName = "text-black";
    buttonTitle = "Follow";
  }
  const [rowSpan, setRowSpan] = useState(0);
  const [colSpan, setColSpan] = useState(0);

  const handleChangeSpan = (e: any, x: number, y: number) => {
    e.stopPropagation();
    e.preventDefault();
    setRowSpan(x);
    setColSpan(y);
  };
  return (
    <a
      href={link}
      target="__blank__"
      className={`p-6 relative shadow-md group flex rounded-3xl active:scale-95 slide-up ${
        rowSpan == 2 && "row-span-2 flex-col"
      } ${colSpan == 2 && "col-span-2"} row-span- col-span- ${className}`}
    >
      <div className={`flex h-full ${rowSpan != 2 && "flex-col"}`}>
        <div className="">
          <div className="size-10 rounded-xl center shadow-sm border-text-secondary/20 border-[0.1px]">
            {Icon && <Icon size={40} color={iconColor} />}
            {faviconLink && (
              <Image
                alt="favicon"
                src={faviconLink}
                width={999}
                height={999}
                className="size-6"
              />
            )}
          </div>
          <p className="text-sm [font-weight:500] mt-1 line-clamp-3">{title}</p>
          <p className="text-xs text-text-secondary ">
            {username
              ? "@" + username
              : link.substring(link.indexOf("https://") + 8)}
          </p>
        </div>
        {buttonTitle && (
          <button
            className={`${buttonClassName}  border-2 px-2 text-xs w-fit p-1 rounded-xl ${
              rowSpan == 2 ? "mb-auto ml-auto " : "mt-auto mr-auto"
            } `}
          >
            {buttonTitle}
          </button>
        )}
      </div>
      <button className="absolute custom-shadow3 left-0 top-0 -translate-x-1/2 -translate-y-[40%] bg-white p-2 rounded-full hidden group-hover:block slide-u">
        <FaTrash size={14} />
      </button>
      <ChangeSpan handleChangeSpan={handleChangeSpan} />
      {type == "github" && (rowSpan == 2 || colSpan == 2) && <GithubContri rowSpan={rowSpan} colSpan={colSpan}/>}
    </a>
  );
};
export default GridItem;
