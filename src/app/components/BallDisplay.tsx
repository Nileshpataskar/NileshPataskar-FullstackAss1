type Ball = number | "Out" | null;

export default function BallDisplay({
  balls,
  currentBall,
  overs,
  overHistory,
}: {
  balls: Ball[];
  currentBall: number;
  overs: number;
  overHistory: Ball[][];
}) {
  const getOverLabel = (index: number) => {
    // Get over number with correct suffix (1st, 2nd, 3rd, etc.)
   
    return `${index + 1}`;
  };

  return (
    <div className="flex flex-col items-center mb-4">
      {/* Display the current over */}
      <div className="text-lg font-semibold mb-2 flex justify-start w-full">
        {getOverLabel(overs)} {/* Show the current over number */}
      </div>
      <div className="flex mb-4">
        {balls.map((ball, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center m-1 border rounded-full ${
              index === currentBall ? "border-black" : "border-gray-300"
            }`}
          >
            {/* Display '0' for zero runs, otherwise display the run value */}
            {ball !== null ? ball : " "}
          </div>
        ))}
      </div>

      {/* Display previous overs */}
      <div className="text-lg font-semibold mb-2">Over Listing</div>
      <div className="flex flex-col items-center">
        {overHistory.map((over, index) => (
          <div
            key={index}
            className="flex mb-1 mx-4 border p-2 w-full max-w-[300px] justify-between"
          >
            <div className="text-sm font-medium">
              {/* Display the over number with the correct suffix */}
              {getOverLabel(index)}
            </div>
            {over.map((ball, ballIndex) => (
              <div
                key={ballIndex}
                className="w-10 h-10 flex items-center justify-center border border-black gap-2 rounded-full "
              >
                {/* Display '0' for zero runs in previous overs */}
                {ball !== null ? ball : " "}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
