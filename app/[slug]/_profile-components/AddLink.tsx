import { useState } from "react";

const AddLink = ({
  addLink,
  setShowAddLink,
}: {
  addLink: (link: string) => void;
  setShowAddLink: (f: boolean) => void;
}) => {
  const [link, setLink] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (link) {
      addLink(link);
      setShowAddLink(false)
      setLink("");
    }
  };
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="absolute bottom-[175%] p-2 rounded-xl custom-shadow2 bg-white active:scale-100"
    >
      <form onSubmit={handleSubmit} className="flex">
        <input
          type="text"
          autoFocus
          onChange={(e) => setLink(e.target.value)}
          placeholder="Enter link"
          className="outline-none"
        />
        <button className="bg-[#32ca5c] text-white text-xs p-1 rounded-md">
          Add
        </button>
      </form>
    </div>
  );
};
export default AddLink;
