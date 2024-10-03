import { IoIosArrowRoundBack } from "react-icons/io";
import Form from "@/app/_ui-components/Form";

const SignUpForm = ({
  slug,
  setPage,
}: {
  setPage: (n: number) => void;
  slug: string;
}) => {
  return (
    <div className="">
      <button onClick={() => setPage(0)}>
        <IoIosArrowRoundBack size={28} />
      </button>
      <p className="text-text-secondary mt-4 text-balance">
        glance.vercel.app/{slug} is yours!
      </p>
      <h2 className="text-4xl font-bold mt-4">Now, create your account</h2>
      <Form method="signup" slug={slug} />
      <p className="mt-6 text-sm text-text-secondary">
        or <a href="/login">login</a>{" "}
      </p>
    </div>
  );
};
export default SignUpForm;
