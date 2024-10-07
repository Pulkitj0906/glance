import Loading from "@/public/loading.svg";
import { supabase } from "@/util/client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { IoIosClose } from "react-icons/io";
const SlugForm = ({
  slug,
  setSlug,
  setPage,
}: {
  slug: String;
  setSlug: (s: string) => void;
  setPage: (n: number) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  const checkAvailablity = async (toCheck: string) => {
    if (!toCheck) return;
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("Portfolio")
        .select("slug")
        .eq("slug", toCheck);
      if (data) setIsAvailable(data?.length > 0 ? false : true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="slide-right">
      <h2 className="text-4xl font-bold">Present yourself in style</h2>
      <p className="text-text-secondary mt-4 text-xl">Claim your link now!</p>
      <form className=" mt-4" onSubmit={() => {isAvailable && setPage(2)}}>
        <div className="mt-20 flex bg-secondary rounded-xl p-2 text-text-secondary items-center">
          <p>glance.vercel.app/</p>
          <input
            autoFocus
            type="text"
            placeholder="your-name"
            value={slug.toString()}
            onChange={(e) => {
              setSlug(e.target.value), checkAvailablity(e.target.value);
            }}
            className="bg-transparent outline-none"
          />
          {slug && (
            <div className="ml-auto">
              {isLoading ? (
                <Loading />
              ) : isAvailable ? (
                <FaCheck color="4edd76" size={16} />
              ) : (
                <button onClick={()=>setSlug("")} className="center">
                  <IoIosClose size={24} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="h-10 mt-4">
          {slug &&
            (isLoading ? (
              <button className="w-full  h-10 bg-text-secondary text-white rounded-xl">
                Grab
              </button>
            ) : isAvailable ? (
              <button className="w-full  h-10 bg-black text-white rounded-xl">
                Grab
              </button>
            ) : (
              <div className="text-red-500 text-sm">
                This username seems to be taken already... <br />
                Try something similar.
              </div>
            ))}
        </div>
      </form>
      <p className="mt-6 text-sm text-text-secondary">
        or <a href="/login">login</a>{" "}
      </p>
    </div>
  );
};
export default SlugForm;
