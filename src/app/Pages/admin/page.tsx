"use client";

import { useState } from "react";
import Header from "../../components/Header";
import BallDisplay from "../../components/BallDisplay";

// Define types
type RunType = number | "Out";

export default function Admin() {
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [balls, setBalls] = useState<(RunType | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentBall, setCurrentBall] = useState(0);
  const [overHistory, setOverHistory] = useState<(number | "Out")[][]>([]);

  const addRun = (run: RunType) => {
    const updatedBalls = [...balls];
    updatedBalls[currentBall] = run;
    setBalls(updatedBalls);

    const newScore = {
      ...score,
      runs: score.runs + (run !== "Out" ? run : 0),
      wickets: score.wickets + (run === "Out" ? 1 : 0),
    };
    setScore(newScore);

    if (currentBall === 5) {
      // Replace null values with 0 for finalized balls
      const finalizedBalls = updatedBalls.map((ball) =>
        ball === null ? 0 : ball
      ) as (number | "Out")[];

      // Add the finalized over to the history
      setOverHistory([finalizedBalls, ...overHistory]);

      // Move to the next over
      setScore({ ...newScore, overs: score.overs + 1 });
      setCurrentBall(0);
      setBalls([null, null, null, null, null, null]);
    } else {
      setCurrentBall(currentBall + 1);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="p-8 border-2 border-black w-fit">
        {/* Pass currentBall to Header */}
        <Header score={score} currentBall={currentBall} />
        <BallDisplay
          balls={balls}
          currentBall={currentBall}
          overs={score.overs}
          overHistory={overHistory}
        />
        <div className="flex mt-4 w-full justify-center">
          {[0, 1, 2, 3, 4, 6, "Out"].map((run, index) => (
            <button
              key={index}
              onClick={() => addRun(run as RunType)}
              className="bg-gray-300 px-4 py-2 m-1 rounded"
            >
              {run}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
