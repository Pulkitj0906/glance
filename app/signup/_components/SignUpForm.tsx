import { supabase } from "@/util/client";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const SignUpForm = ({
  setEmail,
  email,
  password,
  setPassword,
  slug,
  setPage,
}: {
  email: string;
  password: string;
  setEmail: (s: string) => void;
  setPassword: (s: string) => void;
  setPage: (n: number) => void;
  slug: String;
}) => {
    const [error, setError] = useState("");
  const handleSignup = async (e: any) => {
    e.preventDefault();
    const { error, data } = await supabase
      .from("Users")
      .select("email")
      .eq("email", email);

    if (error) console.log("Error signing up:", error.message);
    console.log(data);
  };
  return (
    <div className="">
      <button onClick={() => setPage(0)}>
        <IoIosArrowRoundBack size={28} />
      </button>
      <p className="text-text-secondary mt-4 text-balance">
        glance.vercel.app/{slug} is yours!
      </p>
      <h2 className="text-4xl font-bold mt-4">Now, create your account</h2>
      <form className=" mt-4" onSubmit={handleSignup}>
        <p className="text-red-600 text-xs">Account with this email exists!</p>
        <div className="mt-16 flex gap-4 *:bg-secondary *:rounded-xl *:p-2 text-text-secondary">
          <input
            autoFocus
            type="text"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none"
          />
          <input
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none"
          />
        </div>
        <div className="h-10 mt-4">
          {slug && (
            <button className="w-full  h-10 bg-black text-white rounded-xl">
              Create account
            </button>
          )}
        </div>
      </form>
      <p className="mt-6 text-sm text-text-secondary">
        or <a href="/login">login</a>{" "}
      </p>
    </div>
  );
};
export default SignUpForm;
