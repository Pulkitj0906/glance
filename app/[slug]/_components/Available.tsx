import Image from "next/image";
import eye from "@/public/eye1.gif";
import illus1 from "@/public/claimillustration-mobile.png";
import illus2 from "@/public/pulkit3.png";

export const Available = ({ slug }: { slug: string }) => {
  return (
    <div className="center flex-col gap-16 text-text-secondary h-screen overflow-clip pt-24">
      <Image alt="eye" src={eye} className="w-20 mt-20 " />
      <div className="bg-secondary px-7 py-6 text-xl lg:text-[40px] font-semibold rounded-xl relative">
        <div className="absolute -right-6 top-0 rotate-2 -translate-y-1/2 bg-[#4edd76] text-xs lg:text-base shadow-md rounded-xl text-white px-3 py-2">
          Available!
        </div>
        <p className="">
          glance.vercel.app/
          <span className="text-black">
            {slug}
          </span>
        </p>
      </div>
      <p className="text-xs lg:text-base">Glance is the only link you need.</p>
      <button className="px-5 py-4 bg-brand rounded-xl text-white lg:text-lg active:scale-95">
        Claim handle now
      </button>
      <div className="enter max-w-[75%] lg:flex hidden  rounded-xl">
        <Image
          alt=""
          src={illus2}
          className="border-[0.1px]  border-text-secondary/20 rounded-xl -rotate-2 custom-shadow"
        />
      </div>
      <Image alt="" src={illus1} className="lg:hidden block max-w-[75%]" />
    </div>
  );
};
