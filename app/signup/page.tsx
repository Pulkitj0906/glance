"use client";
import { useEffect, useState } from "react";
import SlugForm from "./_components/SlugForm";
import SignUpForm from "./_components/SignUpForm";
import GridFalse from "./_components/GridFalse";
import { fetchUserInfo } from "@/util/checkAccess";
import { useRouter } from "next/navigation";

export default function Home() {
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState(0);
  const router = useRouter();
  useEffect(() => {
    fetchUserInfo().then((slug) => {
      if (slug) router.push("/" + slug);
    });
  }, []);
  return (
    <div className=" flex items-center justify-center flex-col lg:flex-row p-10 ">
      <div className="h-96 h-ful w-1/2 center flex-col ">
        {page == 0 ? (
          <SlugForm slug={slug} setSlug={setSlug} setPage={setPage} />
        ) : (
          <SignUpForm slug={slug} setPage={setPage} />
        )}
      </div>
      <div className="h-full lg:w-1/2 p-10">
        <GridFalse />
      </div>
    </div>
  );
}
