'use client';

import { useState } from "react";
import Header from "../../components/Header";
import BallDisplay from "../../components/BallDisplay";

// Update the Ball type to match BallDisplay
type Ball = number | "Out" | null;

export default function Admin() {
  const [score, setScore] = useState({ runs: 0, wickets: 0, overs: 0 });
  const [balls, setBalls] = useState<Ball[]>([null, null, null, null, null, null]);
  const [currentBall, setCurrentBall] = useState(0);
  const [overHistory, setOverHistory] = useState<(number | "Out")[][]>([]);

  const addRun = (run: number | "Out") => {
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
      const finalizedBalls = updatedBalls.map((ball) => (ball === null ? 0 : ball)) as (number | "Out")[];
      setOverHistory([finalizedBalls, ...overHistory]);
      setScore({ ...newScore, overs: score.overs + 1 });
      setCurrentBall(0);
      setBalls([null, null, null, null, null, null]);
    } else {
      setCurrentBall(currentBall + 1);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">
      <div className="p-8 border-2 border-black w-[450px] ">
        <Header score={score} currentBall={currentBall} />
        <BallDisplay
          balls={balls}
          currentBall={currentBall}
          overs={score.overs}
          overHistory={overHistory}
          addRun={(run) => addRun(run)}
        />
      </div>
    </div>
  );
}
