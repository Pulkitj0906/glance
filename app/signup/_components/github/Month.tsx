const Month = ({
  completed,
  totalDays,
  startError,
}: {
  totalDays: number;
  startError: number;
  completed: number[][];
}) => {
  const cols = startError + totalDays > 35 ? 6 : 5;

  return (
    <table
      border={1}
      style={{
        borderSpacing: "6px",
        borderCollapse: "separate",
      }}
    >
      <tbody>
        {Array.from({ length: 7 }, (_, dayIndex) => (
          <tr key={dayIndex}>
            {Array.from({ length: cols }, (_, weekIndex) => (
              <td
                className={` size-[8px] rounded-sm group m-2 relative text-xs ${
                  (dayIndex + weekIndex * 7 - startError < 0 ||
                    dayIndex + weekIndex * 7 - startError > totalDays - 1) &&
                  "invisible"
                }
                ${
                  completed &&
                  completed
                    .map(
                      (q) => q[0] == dayIndex + weekIndex * 7 - startError + 1
                    )
                    .includes(true)
                    ? "bg-github-green"
                    : "bg-gray-200 "
                }
                `}
                key={weekIndex}
              ></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default Month;
