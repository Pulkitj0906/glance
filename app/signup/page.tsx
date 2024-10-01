"use client";
import { useState } from "react";
import Grid from "./_components/Grid";

export default function Home() {
  const [slug, setSlug] = useState("");
  return (
    <div className=" flex items-center justify-center flex-col lg:flex-row p-10 ">
      <div className="h-96 h-ful w-1/2 center flex-col ">
        <div className="">
          <h2 className="text-4xl font-bold">Present yourself in style</h2>
          <p className="text-text-secondary mt-4 text-xl">
            Claim your link now!
          </p>
          <form className=" mt-4">
            <div className="mt-20 flex bg-secondary rounded-xl p-2 text-text-secondary">
              <p>glance.vercel.app/</p>
              <input
                autoFocus
                type="text"
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
            <div className="h-10 mt-4">
              {slug && (
                <button className="w-full  h-10 bg-text-secondary text-white rounded-xl">
                  Grab
                </button>
              )}
            </div>
          </form>
          <p className="mt-6 text-sm text-text-secondary">
            or <a href="">login</a>{" "}
          </p>
        </div>
      </div>
      <div className="h-full lg:w-1/2 p-10 hiden">
        <Grid />
      </div>
    </div>
  );
}
