import { MouseEvent } from "react";
import { FaRegSquare } from "react-icons/fa";
import { LuRectangleHorizontal } from "react-icons/lu";

const ChangeSpan = ({
  handleChangeSpan,
}: {
  handleChangeSpan: (e: MouseEvent<HTMLButtonElement>, x: number, y: number) => void;
}) => {
  return (
    <div onClick={(e)=>e.stopPropagation()} className="absolute  gap-1 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-1 rounded-md hidden group-hover:flex bg-black">
      <button
        onClick={(e) => handleChangeSpan(e, 1, 1)}
        className="text-white p-1 hover:bg-white hover:text-black rounded-xl"
      >
        <FaRegSquare size={10} />
      </button>
      <button
        onClick={(e) => handleChangeSpan(e, 0, 2)}
        className="text-white p-1 center hover:bg-white hover:text-black rounded-xl"
      >
        <LuRectangleHorizontal size={14} />
      </button>
      <button
        onClick={(e) => handleChangeSpan(e, 2, 0)}
        className="text-white p-1 center hover:bg-white hover:text-black rounded-xl rotate-90"
      >
        <LuRectangleHorizontal size={14} />
      </button>
      <button
        onClick={(e) => handleChangeSpan(e, 2, 2)}
        className="text-white p-1 hover:bg-white hover:text-black rounded-xl"
      >
        <FaRegSquare size={15} />
      </button>
    </div>
  );
};
export default ChangeSpan;
