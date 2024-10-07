import Image from "next/image";
import { IconType } from "react-icons";

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
}) => {
  return (
    <a
      href={link}
      target="__blank__"
      className={`p-6 shadow-md flex flex-col rounded-3xl active:scale-95 slide-up ${className}`}
    >
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
      {buttonTitle && (
        <button
          className={`${buttonClassName}  border-2 px-2 text-xs w-fit p-1 rounded-xl mt-auto `}
        >
          {buttonTitle}
        </button>
      )}
    </a>
  );
};
export default GridItem;
