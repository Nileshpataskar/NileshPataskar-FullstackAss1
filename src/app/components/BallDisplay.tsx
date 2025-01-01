type Ball = number | string | null;

export const getRunBgColor = (run: Ball) => {
  switch (run) {
    case 0:
      return "bg-transparent";
    case 1:
    case 2:
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


  // const getBallSuffix = (index: number) => {
  //   if (index === 0) return "st";
  //   if (index === 1) return "nd";
  //   if (index === 2) return "rd";
  //   return "th";
  // };

  return (
    <div className="flex flex-col w-full items-end mb-4">
      {/* Current Over Section */}
      <div className="text-md font-semibold mb-2 flex justify-start w-full">
        This Over: {overs}
      </div>

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

      {/* Buttons */}
      <div className="flex flex-wrap justify-end gap-2 p-1 border-2 border-[#f56e4f] border-dashed rounded-lg shadow-lg max-w-[250px]">
        {[0, 1, 2, 3, 4, 6, "Out"].map((run, index) => (
          <button
            key={index}
            onClick={() => addRun(run as Ball)}
            className={`px-4 w-10 h-10 py-2 m-1 rounded-full shadow flex justify-center items-center ${getRunBgColor(
              run as Ball
            )}`}
          >
            {run}
          </button>
        ))}
      </div>

      {/* Over Listings Section */}
      <div className="w-full mt-6">
        <p className="text-lg font-semibold mb-2">Over Listing</p>
        {overHistory.map((over, index) => (
          <div
            key={index}
            className="flex gap-10 justify-center  items-center mb-4 border p-4 w-full "
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
  );
}
