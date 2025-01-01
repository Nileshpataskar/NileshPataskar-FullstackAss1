"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import BallDisplay from "../../components/BallDisplay";
import axios from "axios";

type Ball = number | "Out" | null;

export default function Admin() {
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
  const [
    , setCurrentBallAPI] = useState(0);
  const [overHistory, setOverHistory] = useState<Ball[][]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchMatchData() {
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
      }
    }

    fetchMatchData();
  }, []);

  const addRun = async (run: Ball) => {
    if (loading) return;

    setLoading(true);

    try {
      // Update the backend with the new run
      await axios.post("https://cricket-backend-i91d.onrender.com/api/match", {
        runs: run !== "Out" ? run : 0,
        isOut: run === "Out",
      });

      // Fetch the latest match data to sync frontend with backend
      const res = await axios.get(
        "https://cricket-backend-i91d.onrender.com/api/match"
      );
      const { totalRuns, totalWickets, totalOvers, currentOver, overHistory } =
        res.data;

      // Update score
      setScore({ runs: totalRuns, wickets: totalWickets, overs: totalOvers });

      // Update balls and currentBall
      const mappedBalls = currentOver.map(
        (ball: { runs: number; isOut: boolean }) =>
          ball.isOut ? "Out" : ball.runs
      );
      setBalls([...mappedBalls, ...Array(6 - mappedBalls.length).fill(null)]);
      setCurrentBall(mappedBalls.length);

      
      // Update over history
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedOverHistory = overHistory.map((over: any[]) =>
        over.map((ball) => (ball.isOut ? "Out" : ball.runs))
      );
      setOverHistory(mappedOverHistory);
    } catch (err) {
      console.error("Error posting run:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center mt-10">

      <div className="p-8 border-2 border-black w-[450px]">

        <h1 className="bg-green-50 w-full text-3xl flex justify-center mb-5 animate-pulse font-mono">Admin View</h1>
        <Header score={score} />
        <BallDisplay
          balls={balls}
          currentBall={currentBall}
          overs={score.overs}
          overHistory={overHistory}

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-expect-error
          addRun={(run) => addRun(run)}
        />
      </div>
    </div>
  );
}
