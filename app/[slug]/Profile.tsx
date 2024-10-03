import Image from "next/image";
import pfp from "@/public/pic3.jpg";
import { MdOutlineExplore } from "react-icons/md";
import Shiny from "../_ui-components/Shiny";
import Grid from "./_profile-components/Grid";
import { useRouter } from "next/navigation";
import axios from "axios";
import Dashboard from "./_profile-components/Dashboard";

const Profile = ({ data, userSlug }: { data: any; userSlug: string }) => {
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
  return (
    <div className="lg:p-16 p-6 pb-44 lg:pb-6 min-h-screen h-fit flex justify-center items-center lg:items-start gap-40  gap- relative flex-col lg:flex-row">
      <div className="flex flex-col center h-full lg:h-[calc(100vh)] max-w-fit shrink-0">
        <Image
          alt="pfp"
          src={pfp}
          height={180}
          width={180}
          className="rounded-full"
        />
        <p className="mt-8 pl-2 text-[32px] xl:text-[44px] tracking-[-1px] font-bold">
          {data.name}asdf
        </p>

        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 lg:relative mt-auto text-xs tracking-tighter gap-4 center">
          {role == "anon" && (
            <button onClick={()=>router.push('/signup')} className="relative active:scale-95 center px-2 py-3 bg-brand text-white font-semibold rounded-xl overflow-clip">
              <Shiny />
              Create Your Glance
            </button>
          )}
          <button onClick={handleButtonClick} className="text-text-secondary h-fit p-2 hover:bg-secondary rounded-xl">
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
        <Grid />
      </div>
      {role=="self" && <Dashboard/>}
    </div>
  );
};
export default Profile;
