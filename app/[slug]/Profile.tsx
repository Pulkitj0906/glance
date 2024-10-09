import { MdOutlineExplore } from "react-icons/md";
import Shiny from "../_ui-components/Shiny";
import Grid from "./_profile-components/Grid";
import { useRouter } from "next/navigation";
import axios from "axios";
import Dashboard from "./_profile-components/Dashboard";
import { useState } from "react";
import ProfilePicture from "./_profile-components/ProfilePicture";
import { DataType } from "@/util/lib";

const Profile = ({
  data,
  userSlug,
}: {
  data: DataType;
  userSlug: string;
}) => {
  const [name, setName] = useState(data.name);
  const [bio, setBio] = useState(data.bio);
  const [links, setLinks] = useState(data.grids);

  const router = useRouter();
  const role =
    userSlug === undefined
      ? "anon"
      : userSlug === data.slug
      ? "self"
      : "visitor";

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/logout");
      if (res.status === 200) window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = () => {
    if (role == "anon") {
      router.push("/login");
    } else if (role == "visitor") {
      router.push("/" + userSlug);
    } else {
      handleLogout();
    }
  };

  const saveProfile = async (toUpdate: string) => {
    try {
      await axios.post("/api/update", {
        name,
        bio,
        toUpdate,
        pfp: null,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const addLink = async (link: string) => {
    try {
      const res = await axios.post("/api/addLink", { link });
      if (res.data.item) {
        setLinks((prevLinks) => [...prevLinks, res.data.item]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteGridItem = async (id: string) => {
    const filteredLinks = links.filter((l) => l.id !== id);
    setLinks(filteredLinks);
    try {
      await axios.post("/api/deleteLink", { id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:p-16 p-6 pb-44 lg:pb-6 min-h-screen h-fit flex justify-center items-center lg:items-start gap-40  gap- relative flex-col lg:flex-row">
      <div className="flex flex-col xl:fixed xl:left-16 h-full lg:h-[calc(100vh)] max-w-fit shrink-0 slide-up">
        <ProfilePicture
          self={role == "self"}
          pfp={data.pfp ? data.pfp : ""}
          deletePfp={saveProfile}
        />
        {role === "self" ? (
          <input
            value={name}
            onBlur={() => {
              if (name !== data.name) saveProfile("name");
            }}
            onChange={(e) => setName(e.target.value)}
            className="mt-8 pl-2 text-[32px] xl:text-[44px] tracking-[-1px] font-bold max-w-60 outline-none"
          />
        ) : (
          <p className="mt-8 pl-2 text-[32px] xl:text-[44px] tracking-[-1px] font-bold max-w-60">
            {data.name}
          </p>
        )}

        {role === "self" ? (
          <input
            value={bio}
            onBlur={() => {
              if (bio !== data.bio) saveProfile("bio");
            }}
            onChange={(e) => setBio(e.target.value)}
            className="text-text-secondary pl-2 text-[32px] tracking-[-1px] font-s max-w-60 outline-none"
          />
        ) : (
          <p className="text-text-secondary pl-2 text-[32px] tracking-[-1px] font-s max-w-60">
            {data.bio}
          </p>
        )}

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 lg:relative mt-auto text-xs tracking-tighter gap-4 center">
          {role == "anon" && (
            <button
              onClick={() => router.push("/signup")}
              className="relative active:scale-95 center px-2 py-3 bg-brand text-white font-semibold rounded-xl overflow-clip"
            >
              <Shiny />
              Create Your Glance
            </button>
          )}
          <button
            onClick={handleButtonClick}
            className="text-text-secondary h-fit p-2 hover:bg-secondary rounded-xl"
          >
            {role == "anon" && "Log in"}
            {role == "visitor" && "My bento"}
            {role == "self" && "Log out"}
          </button>
          <button className="rounded-full hover:bg-secondary p-2">
            <MdOutlineExplore size={16} color="#6c6c6c" />
          </button>
        </div>
      </div>
      <div className="h-full w-full max-w-[350px] lg:max-w-fit xl:w-[820px] lg:ml-auto">
        <Grid links={links} role={role} onDeleteGridItem={onDeleteGridItem} />
      </div>
      {role == "self" && <Dashboard addLink={addLink} />}
    </div>
  );
};

export default Profile;
