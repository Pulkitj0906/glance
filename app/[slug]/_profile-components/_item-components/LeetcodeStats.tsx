import axios from "axios";
import { useMemo, useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface LeetcodeStatsProps {
  rowSpan: number;
  colSpan: number;
  username: string;
}

const LeetcodeStats: React.FC<LeetcodeStatsProps> = ({
  rowSpan,
  colSpan,
  username,
}) => {
  const [totalCount, setTotalCount] = useState([3313, 828, 1733, 752]);
  const [submittedCount, setSubmittedCount] = useState([0, 0, 0, 0]);

  useMemo(async () => {
    const req=await axios.post("/api/getLeetcodeStats",{username})
    setTotalCount(req.data.allQuestionsCount)
    setSubmittedCount(req.data.acSubmissionCounts)
  }, []);

  const getStrokeDasharray = (
    solved: number,
    total: number,
    parentSize: number
  ) => {
    const circumference = 2 * Math.PI * 42;
    const solvedDash = (solved / total) * parentSize;
    return `${solvedDash}, ${circumference - solvedDash}`;
  };

  return (
    <div className="relative flex items-center m-auto justify-center bg-gray-80 p- rounded-2xl w-fit gap-5">
      <div className="size-32 relative flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
          <g clipPath="url(#bar-mask)">
            {/* Easy Difficulty */}
            <g
              className="transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)] origin-center translate-x-0"
              style={{ transform: "rotate(225deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-blue-200 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: "46.516, 217.484",
                  strokeDashoffset: 66,
                }}
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-blue-500 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: getStrokeDasharray(
                    submittedCount[1],
                    totalCount[1],
                    46.516
                  ),
                  strokeDashoffset: 66,
                }}
              />
            </g>

            {/* Medium Difficulty */}
            <g
              className="transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)] origin-center translate-x-0"
              style={{ transform: "rotate(296.53deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-yellow-200 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: "97.3577, 166.642",
                  strokeDashoffset: 66,
                }}
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-yellow-500 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: getStrokeDasharray(
                    submittedCount[2],
                    totalCount[2],
                    97.3577
                  ),
                  strokeDashoffset: 66,
                }}
              />
            </g>

            {/* Hard Difficulty */}
            <g
              className="transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)] origin-center translate-x-0"
              style={{ transform: "rotate(437.39deg)" }}
            >
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-red-200 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: "42.2464, 221.754",
                  strokeDashoffset: 66,
                }}
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                className="fill-transparent stroke-red-500 transition-all duration-400 ease-[cubic-bezier(.6,1.37,.81,.97)]"
                style={{
                  strokeWidth: 3,
                  strokeLinecap: "round",
                  strokeDasharray: getStrokeDasharray(
                    submittedCount[3],
                    totalCount[3],
                    42.2464
                  ),
                  strokeDashoffset: 66,
                }}
              />
            </g>
          </g>
        </svg>
        <div className="absolute">
          <p className="text-xl">
            {submittedCount[0]}
            <span className="text-xs">/{totalCount[0]}</span>
          </p>
          <div className="text-xs flex items-center justify-center">
            <FaCheck color="#029327" /> Solved
          </div>
        </div>
      </div>
      {rowSpan * colSpan == 4 && (
        <div className="flex flex-col gap-4">
          <DifficultyButton
            color="text-blue-500"
            label="Easy"
            solved={submittedCount[1]}
            total={totalCount[1]}
          />
          <DifficultyButton
            color="text-yellow-500"
            label="Med."
            solved={submittedCount[2]}
            total={totalCount[2]}
          />
          <DifficultyButton
            color="text-red-500"
            label="Hard"
            solved={submittedCount[3]}
            total={totalCount[3]}
          />
        </div>
      )}
    </div>
  );
};

interface DifficultyButtonProps {
  label: string;
  solved: number;
  total: number;
  color: string;
}

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  label,
  solved,
  total,
  color,
}) => (
  <div
    className={`flex flex-col bg-gray-200 text-xs items-center justify-between px-3 py-1 rounded-md`}
  >
    <span className={`${color}`}>{label}</span>
    <span>
      {solved}/{total}
    </span>
  </div>
);

export default LeetcodeStats;
