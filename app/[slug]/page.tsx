"use client";
import { supabase } from "@/util/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./_components/Loading";
import Profile from "./Profile";
import { Available } from "./_components/Available";
import { fetchUserInfo } from "@/util/checkAccess";

const Page = () => {
  const router = usePathname().substring(1);
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState();
  const [userSlug, setUserSlug] = useState("")

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("Portfolio")
      .select(`*,Users(email)`)
      .eq("slug", router)
      .single();

    if (data) {
      setData(data);
      setStatus("found");
    } else {
      setStatus("Available");
    }
  };

  useEffect(() => {
    fetchData();
    fetchUserInfo().then(slug=>setUserSlug(slug))
  }, []);

  switch (status) {
    case "found":
      return <Profile data={data} userSlug={userSlug} />;

    case "Available":
      return <Available slug={router} userSlug={userSlug}/>;

    default:
      return <Loading />;
  }
};

export default Page;
