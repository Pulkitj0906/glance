"use client";
import { supabase } from "@/util/client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./_components/Loading";
import Profile from "./Profile";
import { Available } from "./_components/Available";

const Page = () => {
  const router = usePathname().substring(1);
  const [status, setStatus] = useState("loading");
  const [data, setData] = useState();

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("Portfolio")
      .select("*")
      .eq("slug", router)
      .single();
    
    if (data) {
      setData(data)
      setStatus("found");
    } else {
      setStatus("Available");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  switch (status) {
    case "found":
      return <Profile data={data}/>;
      
    case "Available":
      return <Available slug={router}/>;
      
    default:
      return <Loading />;
  }
};

export default Page;
