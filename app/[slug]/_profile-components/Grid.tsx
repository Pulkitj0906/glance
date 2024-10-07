import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import GridItem from "./GridItem";

const Grid = ({ links }: { links: Record<string, string>[] }) => {
  const progress = [
    [9, 4],
    [13, 2],
  ];
  console.log(links)
  return (
    <div className="lg: grid grid-flow-row-dense grid-flow-co flex-wrap flex-1 lg:grid-rows-4 lg:grid-cols-4 gap-10 min-h[640px] *:h-[175px] *:min-w-[175px] *:border-text-secondary/20 *:border-[0.1px]">
      {/* <GridItem
        link=""
        Icon={FaLinkedin}
        iconColor="#0e76a8"
        buttonClassName="border-linkedin text-linkedin"
        buttonTitle="Connect"
        className="bg-linkedin/10 "
        title="LinkedIn"
        username="@username"
      />
      <GridItem
        link=""
        Icon={FaXTwitter}
        buttonClassName="bg-black text-white"
        buttonTitle="Follow"
        className=""
        title="Twitter"
        username="@username"
      />
      <GridItem
        link=""
        Icon={FaGithub}
        buttonClassName="text-black"
        buttonTitle="Follow"
        className="col-span-2"
        title="Github"
        username="@username"
      />
      <GridItem
        // Icon={FaLinkedin}
        faviconLink=";"
        buttonClassName=""
        link=""
        buttonTitle="Connect"
        className=""
        title="LinkedIn"
        username="@username"
      /> */}
      {/* <div className="p-5 border-text-secondary/20 border-[0.1px] shadow-md flex flex-col rounded-xl font-semibold">
        <FaXTwitter size={24} />
        <p className="text-xs">Twitter</p>
        <button className=" border-2 text-xs w-fit p-1 px-2 rounded-xl mt-auto bg-black text-white">
          Follow <span className="opacity-75">1.1k</span>
        </button>
      </div> */}
        {links &&
          links.map((l, idx) => (
            <GridItem
              link={l.link}
              // Icon={FaGithub}
              faviconLink={l.favicon}
              title={l.title}
              username={l.username}
            />
          ))}
      {/* <div className="p-5  row-span- col-span-2 border-text-secondary/20 border-[0.1px] shadow-md flex f rounded-xl font-semibold">
        <div className="h-full  flex flex-col w-1/2">
          <FaGithub size={24} />
          <p className="text-xs">Github</p>
          <button className=" border-2 text-xs w-fit p-1 px-2 rounded-xl mt-auto text-black bg-white">
            Follow
          </button>
        </div>
        <div className="h-full w-1/2 center">
          <Month
            completed={progress}
            month="September"
            startError={4}
            totalDays={30}
          />
        </div>
      </div> */}
      {/* <div className="p-5  row-span-2 col-span- border-text-secondary/20 border-[0.1px] shadow-md flex flex-col rounded-xl font-semibold">
        <FaInstagram size={24} />
        <p className="text-xs">Instagram</p>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 mt-3">
          <Image alt="insta" src={insta1} height={70} className="rounded-xl" />
          <Image alt="insta" src={insta4} height={70} className="rounded-xl" />
          <Image alt="insta" src={insta3} height={70} className="rounded-xl" />
        </div>
        <button className=" border-2 text-xs w-fit p-1 px-2 rounded-xl mt-auto text-black bg-white">
          Follow
        </button>
      </div> */}
      {/* <div className="p-5  row-span-2 col-span-3 border-text-secondary/20 border-[0.1px] shadow-md flex flex-col rounded-xl font-semibold">
        <AiOutlineFundProjectionScreen size={24} />
        <p className="text-xs">Personal Project</p>
        <p className="text-xs text-text-secondary">
          A short description of the project
        </p>
        <div className="grid grid-cols-2 grid-rows-1 gap-2 mt-8">
          <Image alt="pp1" src={pp1} height={260} className="rounded-xl" />
          <Image alt="pp2" src={pp2} height={260} className="rounded-xl" />
        </div>
        <button className=" border-2 text-xs w-fit p-1 px-2 rounded-xl mt-auto text-black bg-white">
          Visit
        </button>
      </div> */}
    </div>
  );
};
export default Grid;
