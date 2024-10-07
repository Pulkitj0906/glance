import { MdOutlineExplore } from "react-icons/md";
import Shiny from "../_ui-components/Shiny";
import Grid from "./_profile-components/Grid";
import { useRouter } from "next/navigation";
import axios from "axios";
import Dashboard from "./_profile-components/Dashboard";
import { useState } from "react";
import ProfilePicture from "./_profile-components/ProfilePicture";

const Profile = ({
  data,
  userSlug,
  setData,
}: {
  data: any;
  userSlug: string;
  setData: (newdata: any) => void;
}) => {
  const [name, setName] = useState(data.name);
  const [bio, setBio] = useState(data.bio);

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
      const res = await axios.post("/api/update", {
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
        setData((prv: any) => ({
          ...prv,
          grids: [...prv.grids, res.data.item],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="lg:p-16 p-6 pb-44 lg:pb-6 min-h-screen h-fit flex justify-center items-center lg:items-start gap-40  gap- relative flex-col lg:flex-row">
      <div className="flex flex-col centr h-full lg:h-[calc(100vh)] max-w-fit shrink-0 slide-up">
        <ProfilePicture
          self={role == "self"}
          pfp={data.pfp}
          deletePfp={saveProfile}
        />
        <p
          contentEditable={role == "self"}
          onBlur={() => {
            name !== data.name && saveProfile("name");
          }}
          onInput={(e) => setName(e.currentTarget.textContent)}
          className="mt-8 pl-2 text-[32px] xl:text-[44px] tracking-[-1px] font-bold max-w-60 outline-none"
        >
          {data.name}
        </p>
        <p
          contentEditable={role == "self"}
          onBlur={() => {
            bio !== data.bio && saveProfile("bio");
          }}
          onInput={(e) => setBio(e.currentTarget.textContent)}
          className="text-text-secondary pl-2 text-[32px] tracking-[-1px] font-s max-w-60 outline-none"
        >
          {data.bio}
        </p>
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
        <Grid links={data.grids} />
      </div>
      {role == "self" && <Dashboard addLink={addLink} />}
    </div>
  );
};
export default Profile;
