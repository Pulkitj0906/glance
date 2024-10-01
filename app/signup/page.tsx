"use client";
import { useState } from "react";
import Grid from "./_components/Grid";
import SlugForm from "./_components/SlugForm";
import SignUpForm from "./_components/SignUpForm";

export default function Home() {
  const [slug, setSlug] = useState("");
  const [page, setPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className=" flex items-center justify-center flex-col lg:flex-row p-10 ">
      <div className="h-96 h-ful w-1/2 center flex-col ">
        {page == 0 ? (
          <SlugForm slug={slug} setSlug={setSlug} setPage={setPage} />
        ) : (
          <SignUpForm
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
            slug={slug}
            setPage={setPage}
          />
        )}
      </div>
      <div className="h-full lg:w-1/2 p-10 hiden">
        <Grid />
      </div>
    </div>
  );
}
