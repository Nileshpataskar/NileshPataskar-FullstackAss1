import axios from "axios";
import { useEffect, useState } from "react";

export default function Header({
  score,
}: {
  score: { runs: number; wickets: number; overs: number };
  // currentBall: number | null; // Ball number within the current over (0-5) or null if not available
}) {
  // Safely compute overs in the format "currentOver.currentBall"

  const [currentBall, setCurrentBall] = useState(0);
  useEffect(() => {
    async function getCurrentOver() {
      const res = await axios.get(
        "https://cricket-backend-i91d.onrender.com/api/match"
      );
      const { currentBall } = res.data;
      setCurrentBall(currentBall || 0);
    }

    getCurrentOver();
  }, [score]);

  return (
    <div className="text-center mb-4">
      <h1 className="text-4xl font-bold">{`${score?.runs ?? 0} /${
        score?.wickets ?? 0
      }`}</h1>
      <p className="text-xl font-medium">{`Overs: ${currentBall}`}</p>
    </div>
  );
}
