export default function Header({
  score,
  currentBall,
}: {
  score: { runs: number; wickets: number; overs: number };
  currentBall: number;
}) {
  // Calculate the formatted current over
  const currentOver = `${score.overs}.${currentBall + 1}`;

  return (
    <div className="text-center mb-4 ">
      <h1 className="text-4xl font-bold">{`${score.runs}/${score.wickets}`}</h1>
      <p>Current Over: {currentOver}</p>
    </div>
  );
}
