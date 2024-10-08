import GitHubContributions from "react-github-contributions";
const GithubContri = ({
  rowSpan,
  colSpan,
}: {
  rowSpan: number;
  colSpan: number;
}) => {
  let shownMonths = 3;
  if (rowSpan == 2) shownMonths = colSpan == 2 ? 5 : 2;
  const selectLastHalfYear = (contributions: any) => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    return contributions.filter((activity: any) => {
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
            : "max-w-[320px]"
        } overflow-clip `}
      >
        <GitHubContributions
          username="Pulkitj0906"
          colorScheme="light"
          transformTotalCount={false}
          transformData={selectLastHalfYear}
          hideColorLegend={true}
          loading={false}
          hideTotalCount={rowSpan == 2 && colSpan != 2}
        />
      </div>
    </div>
  );
};
export default GithubContri;
