import GitHubContributions from "react-github-contributions";
const GithubContri = ({
  username,
  rowSpan,
  colSpan,
}: {
  rowSpan: number;
  colSpan: number;
  username:string;
}) => {
  let shownMonths = 3;
  if (rowSpan == 2) shownMonths = colSpan == 2 ? 5 : 2;
  const selectLastHalfYear = (
    contributions: { date: string; count: number; level: 0 | 1 | 2 | 3 | 4 }[]
  ) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return contributions.filter((activity: { date: string }) => {
      const date = new Date(activity.date);
      const monthOfDay = date.getMonth();

      return (
        date.getFullYear() === currentYear &&
        monthOfDay > currentMonth - shownMonths &&
        monthOfDay <= currentMonth
      );
    });
  };
  return (
    <div className="m-auto">
      <div
        className={` ${
          rowSpan * colSpan == 0
            ? colSpan == 0
              ? "max-w-[140px] "
              : "max-w-[210px] "
            : "max-w-[333px]"
        } overflow-clip `}
      >
        <GitHubContributions
          username={username}
          colorScheme="light"
          transformTotalCount={false}
          transformData={selectLastHalfYear}
          hideColorLegend={true}
          loading={false}
          hideTotalCount={rowSpan * colSpan != 4}
        />
      </div>
    </div>
  );
};
export default GithubContri;
