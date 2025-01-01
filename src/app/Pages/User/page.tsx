"use client";

import { getRunBgColor } from "@/app/components/BallDisplay";
import axios from "axios";
import React, { useEffect, useState } from "react";

// Define Ball type
type Ball = number | "Out" | null;

const UserPage = () => {
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [balls, setBalls] = useState<Ball[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentBall, setCurrentBall] = useState(0);
  const [currentBallAPI, setCurrentBallAPI] = useState(0);
  const [overHistory, setOverHistory] = useState<Ball[][]>([]);
  const [, setLoading] = useState(false);

  useEffect(() => {
    fetchMatchData();
  }, []);

  async function fetchMatchData() {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://cricket-backend-i91d.onrender.com/api/match"
      );
      const {
        totalRuns,
        totalWickets,
        totalOvers,
        currentOver,
        currentBall,
        overHistory,
      } = res.data;

      // Update score
      setScore({ runs: totalRuns, wickets: totalWickets, overs: totalOvers });

      // Map currentOver to balls array
      const mappedBalls = currentOver.map(
        (ball: { runs: number; isOut: boolean }) =>
          ball.isOut ? "Out" : ball.runs
      );

      // Update balls and currentBall
      setBalls([...mappedBalls, ...Array(6 - mappedBalls.length).fill(null)]);
      setCurrentBall(mappedBalls.length);
      setCurrentBallAPI(currentBall);

      // Map overHistory to the required format
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedOverHistory = overHistory.map((over: any[]) =>
        over.map((ball) => (ball.isOut ? "Out" : ball.runs))
      );
      setOverHistory(mappedOverHistory);
    } catch (err) {
      console.error("Error fetching match data:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center mt-10 ">
      <div className="p-8 border-2 border-black w-[450px]">
        <h1 className="bg-green-50 w-full text-3xl flex justify-center mb-5 animate-pulse font-mono">
          User View
        </h1>

        {/* header */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold">{`${score?.runs ?? 0} /${
            score?.wickets ?? 0
          }`}</h1>
          <p className="text-xl font-medium">{`Overs: ${currentBallAPI}`}</p>
        </div>

        {/* Overs */}
        <div className="flex mb-4 border p-4 pt-2 w-full justify-center gap-2">
          {balls.map((ball, index) => (
            <div
              key={index}
              className={`relative w-10 h-10 flex items-center justify-center m-1 border rounded-full ${
                index === currentBall
                  ? "border-4 border-yellow-300 animate-pulse ease-in-out"
                  : "border-gray-800"
              } ${getRunBgColor(ball)}`}
            >
              {ball !== null ? ball : " "}
              <div className="absolute bottom-[-20px] text-xs text-center w-full">
                {`${index + 1}`}
              </div>
            </div>
          ))}
        </div>

        {/* Over Listings Section */}
        <div className="w-full mt-6">
          <p className="text-lg font-semibold mb-2">Over Listing</p>
          {overHistory.map((over, index) => (
            <div
              key={index}
              className="flex gap-10 justify-center items-center mb-4 border p-4 w-full "
            >
              <div className="font-medium text-xl flex "> {index + 1}</div>
              <div className="flex gap-2">
                {over.map((ball, ballIndex) => (
                  <div
                    key={ballIndex}
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${getRunBgColor(
                      ball
                    )}`}
                  >
                    {ball !== null ? ball : " "}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
