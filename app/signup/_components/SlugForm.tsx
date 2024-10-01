const SlugForm = ({
  slug,
  setSlug,
  setPage,
}: {
  slug: String;
  setSlug: (s: string) => void;
  setPage: (n: number) => void;
}) => {
  return (
    <div className="">
      <h2 className="text-4xl font-bold">Present yourself in style</h2>
      <p className="text-text-secondary mt-4 text-xl">Claim your link now!</p>
      <form className=" mt-4" onSubmit={() => setPage(2)}>
        <div className="mt-20 flex bg-secondary rounded-xl p-2 text-text-secondary">
          <p>glance.vercel.app/</p>
          <input
            autoFocus
            type="text"
            value={slug.toString()}
            onChange={(e) => setSlug(e.target.value)}
            className="bg-transparent outline-none"
          />
        </div>
        <div className="h-10 mt-4">
          {slug && (
            <button className="w-full  h-10 bg-text-secondary text-white rounded-xl">
              Grab
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
export default SlugForm;
