import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import pfp1 from "@/public/pic3.jpg";
import eye from "@/public/eye2.gif";
import { useRef, useState } from "react";
import axios from "axios";

const ProfilePicture = ({
  self,
  pfp,
  deletePfp,
}: {
  self: boolean;
  pfp: any;
  deletePfp: (method: string) => void;
}) => {
  const [link, setLink] = useState(pfp ? pfp : pfp1);
  const [pfpLoading, setPfpLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setPfpLoading(true)
    try {
      const res = await axios.post("/api/update/pfp", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setLink(res.data.url);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }finally{
        setPfpLoading(false)
    }
  };
  return (
    <div className="relative rounded-full w-fit group">
      {pfpLoading && <div className="absolute size-full center bg-white/70 ">
        <Image alt="eye" src={eye} className="w-10" />
      </div>}
      {self && (
        <>
          <input
            onChange={handleFileChange}
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="absolute size-full rounded-full opacity-0 cursor-pointer "
          />
          <button
            onClick={handleUploadClick}
            className="absolute bottom-[10%] custom-shadow3 left-3 bg-white p-2 rounded-full hidden group-hover:block slide-up"
          >
            <FiUpload />
          </button>
          <button
            onClick={() => {
              deletePfp("pfp"), setLink(pfp1);
            }}
            className="absolute bottom-[10%] custom-shadow3 right-3 bg-white p-2 rounded-full hidden group-hover:block slide-up"
          >
            <FaTrash size={14} />
          </button>
        </>
      )}
      <Image
        alt="pfp"
        src={link}
        height={180}
        width={180}
        className="rounded-full size-40"
      />
    </div>
  );
};
export default ProfilePicture;
