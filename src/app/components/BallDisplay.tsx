type Ball = number | string | null;

export const getRunBgColor = (run: Ball) => {
  switch (run) {
    case 0:
      return "bg-transparent";
    case 1:
      return "bg-[#e6e6e6]";
    case 2:
      return "bg-[#e6e6e6]";
    case 3:
      return "bg-[#e6e6e6]";
    case 4:
      return "bg-[#a0ebee]";
    case 6:
      return "bg-[#0ca789] text-white";
    case "Out":
      return "bg-red-400 text-white";
    default:
      return "bg-white";
  }
};

export default function BallDisplay({
  balls,
  currentBall,
  overs,
  overHistory,
  addRun,
}: {
  balls: Ball[];
  currentBall: number;
  overs: number;
  overHistory: Ball[][];
  addRun: (run: Ball) => void;
}) {
  const getOverLabel = (index: number) => `${index + 1}`;

  return (
    <div className="flex w-full flex-col items-end mb-4">
      <div className="text-md font-semibold mb-2 flex justify-start w-full">
        This Over: {getOverLabel(overs)}
      </div>

      {/* Current Over */}
      <div className="flex mb-4 border w-full justify-center gap-2">
        {balls.map((ball, index) => (
          <div
            key={index}
            className={`w-10 h-10 flex items-center justify-center m-1 border rounded-full  ${
              index === currentBall
                ? "border-black animate-pulse"
                : "border-gray-800"
            } ${getRunBgColor(ball)}`}
          >
            {ball !== null ? ball : " "}
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap justify-end gap-2 p-1 border-2 border-[#f56e4f] border-dashed rounded-lg shadow-lg max-w-[250px]">
        {[0, 1, 2, 3, 4, 6, "Out"].map((run, index) => (
          <button
            key={index}
            onClick={() => addRun(run as Ball)}
            className={`px-4 w-10 h-10 py-2 m-1 rounded-full shadow flex justify-center items-center  ${getRunBgColor(
              run as Ball
            )}`}
          >
            {run}
          </button>
        ))}
      </div>

      {/* Over Listings */}
      <div className="w-full">
        <p className="text-lg font-semibold mb-2 mt-6 items-start">
          Over Listing
        </p>
      </div>
      <div className="flex flex-col items-center w-full">
        {overHistory.map((over, index) => (
          <div
            key={index}
            className="flex items-center mb-2 w-full justify-center gap-2"
          >
            <div className="flex flex-col">
              <p className="text-md font-medium">{getOverLabel(index)}</p>
            </div>
            <div className="flex mb-1 mx-4 border p-2 w-full max-w-[300px] justify-between">
              {over.map((ball, ballIndex) => (
                <div
                  key={ballIndex}
                  className={`w-10 h-10 flex items-center justify-center gap-2 rounded-full ${getRunBgColor(
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
  );
}
