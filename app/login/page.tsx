"use client";
import { useEffect } from "react";
import Grid from "../signup/_components/GridFalse";
import { useRouter } from "next/navigation";
import { fetchUserInfo } from "@/util/checkAccess";
import Form from "../_ui-components/Form";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo().then((slug) => {
      if (slug) router.push("/" + slug);
    });
  }, []);

  return (
    <div className=" flex items-center justify-center flex-col lg:flex-row p-10 ">
      <div className="h-96 h-ful w-1/2 center flex-col ">
        <div className="">
          <h2 className="text-4xl font-bold">Log in to your Glance</h2>
          <p className="text-text-secondary mt-4 text-xl">
            Good to see you again!
          </p>
          <Form method="login" slug="" />
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
