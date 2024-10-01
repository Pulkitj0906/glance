"use client";
import Image from "next/image";
import eye from "@/public/eye1.gif";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import flower from "@/public/test.jpeg";
import insta1 from "@/public/insta1.jpg";
import insta3 from "@/public/insta3.jpg";
import insta4 from "@/public/insta4.jpg";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="center h-screen flex-col">
      <div className="p-5 h-36 w-32 overflow-hidden increase absolute top-[20%] left-[10%] border-text-secondary/20 border-[0.1px] bg-linkedin/10 shadow-xl flex flex-col rounded-xl font-semibold">
        <FaLinkedin size={24} color="#0e76a8" />
        <p className="text-xs">LinkedIn</p>
        <button className="text-linkedin border-2 px-2 text-xs w-fit p-1 rounded-xl mt-auto border-linkedin">
          Connect
        </button>
      </div>
      <div className=" size-40 absolute top-[37%] rotate-12 increase left-[6%] rounded-xl overflow-clip shadow-md ">
        <Image alt="flowers" src={flower} className="object-cover size-full" />
      </div>
      <div className="p-5 absolute right-[10%] h-72 top-[20%]  increase -rotate-12 border-text-secondary/20 border-[0.1px] shadow-md flex flex-col rounded-xl font-semibold">
        <FaInstagram size={24} />
        <p className="text-xs">Instagram</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
          <Image alt="insta" src={insta1} height={70} className="rounded-xl" />
          <Image alt="insta" src={insta4} height={70} className="rounded-xl" />
          <Image alt="insta" src={insta3} height={70} className="rounded-xl" />
        </div>
        <button className=" border-2 text-xs w-fit p-1 px-2 rounded-xl mt-auto text-black bg-white">
          Follow
        </button>
      </div>

      <h2 className="font- text-xl text-text-secondary fade-in text-center backdrop-blur-xl">
        Show what you are and create <br /> in a
      </h2>
      <h1 className="text-5xl font-bold fade-in backdrop-blur-xl">Glance</h1>
      <div className="center flex-col fade-delay backdrop-blur-xl">
        <button
          onClick={() => router.push("/signup")}
          className="bg-brand mt-16 p-2 text-white rounded-xl"
        >
          Create your own glance
        </button>
        <p className="mt-4 text-xs opacity-40">Log in</p>
      </div>
      <Image
        src={eye}
        alt="eye"
        className="size absolute top-5 mt-2 fade-in"
        height={50}
      />
    </div>
  );
}
