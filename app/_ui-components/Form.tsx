import { supabase } from "@/util/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";

import LoadingIcon from "@/public/loading.svg";

const Form = ({ slug, method }: { slug: string; method: string }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await supabase
        .from("Users")
        .select("email")
        .eq("email", email);

      if (error) console.log("Error signing up:", error.message);
      if (data?.length) {
        setError("Account with this email exists!");
        return;
      }
      const response = await axios.post("/api/user/signup", {
        email,
        password,
        slug,
      });
      if (response.status == 200) router.push("/" + slug);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlelogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error, data } = await supabase
        .from("Users")
        .select("email,password,slug")
        .eq("email", email);

      if (error) console.log("Error signing up:", error.message);
      if (!data?.length) {
        setError("This account does not exist. Sign up first.");
        return;
      }
      const response = await axios.post("/api/user/login", {
        email,
        password,
        actualPassword: data[0].password,
        slug: data[0].slug,
      });
      const redirectLink = response.data.redirect;
      if (redirectLink) router.push("/" + redirectLink);
    } catch (error:unknown) {
      if (typeof error === 'object' && error !== null && 'status' in error) {
        const err = error as { status: number; message: string };
        if (err.status === 401) {
          setError("Your email or password seems to be incorrect.");
        }
        console.log(err.message); 
      } else {
        console.log("An unknown error occurred:", error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      className="mt-4"
      onSubmit={method == "login" ? handlelogin : handleSignup}
    >
      <div className="text-red-600 text-xs h-4">{error}</div>
      <div className="mt-16 flex gap-4 *:bg-secondary *:rounded-xl *:p-2 text-text-secondary">
        <input
          autoFocus
          type="email"
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value); setError("");
          }}
          className="bg-transparent outline-none"
        />
        <div className="relative">
          <input
            required
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value); setError("");
            }}
            className="bg-transparent outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 active:scale-95 opacity-60"
          >
            {showPassword ? <LuEye /> : <LuEyeOff />}
          </button>
        </div>
      </div>
      <div className="h-10 mt-4">
        {email && (
          <button
            className={`w-full center h-10 text-white rounded-xl ${
              loading ? "bg-text-secondary" : "bg-black"
            }`}
          >
            {loading ? (
              <LoadingIcon />
            ) : method == "login" ? (
              "Log In"
            ) : (
              "Create account"
            )}
          </button>
        )}
      </div>
    </form>
  );
};
export default Form;
