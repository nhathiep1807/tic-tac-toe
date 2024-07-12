import { TPlayer } from "@components/typesafe/type";

type TBoard = {
  squares: TPlayer[];
  onClick: (i: number) => void;
  winningSquares?: number[];
};

export default function Board({ squares, winningSquares, onClick }: TBoard) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {squares.map((square, index) => (
        <button
          key={index}
          className={`flex items-center justify-center text-2xl font-bold border-2 border-gray-300 w-20 h-20 ${
            square === "X" ? "text-blue-500" : "text-red-500"
          } ${winningSquares?.includes(index) ? "bg-green-400" : ""}`}
          onClick={() => onClick(index)}
        >
          {square}
        </button>
      ))}
    </div>
  );
}
