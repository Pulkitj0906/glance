import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { username } = await req.json();
    const response = await axios.post(
      "https://leetcode.com/graphql",
      {
        query: `#graphql
                query userProblemsSolved($username: String!) {
                  allQuestionsCount {
                    difficulty
                    count
                  }
                  matchedUser(username: $username) {
                    problemsSolvedBeatsStats {
                      difficulty
                      percentage
                    }
                    submitStatsGlobal {
                      acSubmissionNum {
                        difficulty
                        count
                      }
                    }
                  }
                }`,
        variables: {
          username,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
        },
      }
    );

    const allQuestionsCount = response.data.data.allQuestionsCount.map(
      (item: { count: number }) => item.count
    );
    const acSubmissionCounts =
      response.data.data.matchedUser.submitStatsGlobal.acSubmissionNum.map(
        (item: { count: number }) => item.count
      );
    return NextResponse.json({
      success: true,
      allQuestionsCount,
      acSubmissionCounts,
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      success: false,
    });
  }
}
