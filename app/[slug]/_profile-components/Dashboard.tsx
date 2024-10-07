import Shiny from "@/app/_ui-components/Shiny";
import Image from "next/image";
import { useState } from "react";
import AddLink from "./AddLink";

const Dashboard = ({addLink}:{addLink:(link:string)=>void}) => {
  const [showAddLink,setShowAddLink]=useState(false)
  return (
    <div className="fixed p-3 bottom-10 custom-shadow2 center left-1/2 -translate-x-1/2 rounded-xl dashboard-anim">
      <button className="hidden lg:block bg-[#32ca5c] text-white shadow-md px-2 py-1 rounded-lg tracking-tighter">
        <Shiny/>
        Share my Glance
      </button>
      <div className=" hidden lg:block mx-4 h-4 w-[2px] bg-[#0000001f] rounded-3xl "></div>
      <button onClick={()=>setShowAddLink(!showAddLink)} className="p-1 mr-1 relative hover:bg-secondary rounded-md center active:scale-95">
        {showAddLink && <AddLink addLink={addLink} setShowAddLink={setShowAddLink}/>}
        <div className="custom-shadow2 p-1 rounded-md bg-white center">
          <Image alt="" src={"/link.svg"} width={14} height={10} />
        </div>
      </button>
      <button className="p-1 mr-1 hover:bg-secondary rounded-md center active:scale-95">
        <div className="custom-shadow2  rounded-md bg-white center ">
          <Image alt="" src={"/uploadImage.png"} width={20} height={10} className="rounded-md"/>
        </div>
      </button>
      <button className="p-1 mr-1 hover:bg-secondary rounded-md center active:scale-95">
        <div className="custom-shadow2  rounded-md bg-white center ">
          <Image alt="" src={"/uploadText.png"} width={22} height={10} className="rounded-md"/>
        </div>
      </button>
      <button className="p-1 mr-1 hover:bg-secondary rounded-md center active:scale-95">
        <div className="custom-shadow2  rounded-md bg-white center ">
          <Image alt="" src={"/sectionTile.svg"} width={22} height={10} className="rounded-md"/>
        </div>
      </button>
      <div className="hidden lg:block mx-4 h-4 w-[2px] bg-[#0000001f] rounded-3xl "></div>
      <button className="hidden lg:flex p-1 mr-1 hover:bg-secondary rounded-md active:scale-95">
        <div className="custom-shadow2  rounded-md bg-white center ">
          <Image alt="" src={"/pc.svg"} width={16} height={10} className="rounded-md"/>
        </div>
      </button>
      <button className="hidden lg:flex p-1 mr-1 hover:bg-secondary rounded-md  active:scale-95">
        <div className="custom-shadow2  rounded-md bg-white center ">
          <Image alt="" src={"/mobile.svg"} width={16} height={5} className="rounded-md"/>
        </div>
      </button>
    </div>
  );
};
export default Dashboard;
