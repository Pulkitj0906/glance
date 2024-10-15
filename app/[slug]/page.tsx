"use client";
import { supabase } from "@/util/client";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import Loading from "./_components/Loading";
import Profile from "./Profile";
import { Available } from "./_components/Available";
import { fetchUserInfo } from "@/util/checkAccess";
import { DataType } from "@/util/lib";

const Page = () => {
  const router = usePathname().substring(1);
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState<DataType>();
  const [userSlug, setUserSlug] = useState("")

  const fetchData = async () => {
    const { data } = await supabase
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

  useMemo(() => {
    fetchData();
    fetchUserInfo().then(slug=>setUserSlug(slug))
  }, []);

  switch (status) {
    case "found":
      return <Profile data={data!} userSlug={userSlug}/>;

    case "Available":
      return <Available slug={router} userSlug={userSlug}/>;

    default:
      return <Loading />;
  }
};

export default Page;
