import Image from "next/image";
import pfp from "@/public/pic3.jpg";
import { MdOutlineExplore } from "react-icons/md";
import Shiny from "../_ui-components/Shiny";
import Grid from "./_profile-components/Grid";

const Profile = ({data}:{data:any}) => {
  console.log(data)
  return (
    <div className="p-16 h-screen flex gap-40">
      <div className="flex flex-col h-full max-w-fit shrink-0">
        <Image
          alt="pfp"
          src={pfp}
          height={180}
          width={180}
          className="rounded-full"
        />
        <p className="mt-8 pl-2 text-[32px] xl:text-[44px] tracking-[-1px] font-bold">
          {data.name}
        </p>

        <div className="mt-auto text-xs tracking-tighter flex gap-4 center">
          <button className="relative center px-2 py-3 bg-brand text-white font-semibold rounded-xl overflow-clip">
            <Shiny/>
            Create Your Glance
          </button>
          <button className="text-text-secondary h-fit p-2 hover:bg-secondary rounded-xl">
            Log in
          </button>
          <button className="rounded-full hover:bg-secondary p-1">
            <MdOutlineExplore size={16} />
          </button>
        </div>
      </div>
      <div className=" h-full w-[820px] ml-auto">
        <Grid/>
      </div>
    </div>
  );
};
export default Profile;
