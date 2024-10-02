"use client";
import { useState } from "react";
import Grid from "../signup/_components/GridFalse";

export default function Home() {
  const [slug, setSlug] = useState("");
  return (
    <div className=" flex items-center justify-center flex-col lg:flex-row p-10 ">
      <div className="h-96 h-ful w-1/2 center flex-col ">
        <div className="">
          <h2 className="text-4xl font-bold">Log in to your Glance</h2>
          <p className="text-text-secondary mt-4 text-xl">
            Good to see you again!
          </p>
          <form className=" mt-4">
            <div className="mt-20 flex gap-4 *:bg-secondary *:rounded-xl *:p-2 text-text-secondary">
              <input
                autoFocus
                type="text"
                placeholder="Email address"
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none"
              />
              <input
                autoFocus
                type="text"
                placeholder="Password"
                onChange={(e) => setSlug(e.target.value)}
                className="bg-transparent outline-none"
              />
            </div>
            <div className="h-10 mt-4">
              {slug && (
                <button className="w-full  h-10 bg-black text-white rounded-xl">
                  Login
                </button>
              )}
            </div>
          </form>
          <p className="mt-6 text-sm text-text-secondary">
            or <a href="/signup">signup</a>{" "}
          </p>
        </div>
      </div>
      <div className="h-full lg:w-1/2 p-10 hiden">
        <Grid />
      </div>
    </div>
  );
}
