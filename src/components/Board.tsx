import { TPlayer } from "@components/typesafe/type";

type TBoard = {
  squares: TPlayer[];
  onClick: (i: number) => void;
};

export default function Board({ squares, onClick }: TBoard) {
  return (
    <div className="grid grid-cols-3 gap-1 w-64 h-64">
      {squares.map((square, index) => (
        <button
          key={index}
          className="w-full h-full flex items-center justify-center text-2xl font-bold border-2 border-gray-300"
          onClick={() => onClick(index)}
        >
          {square}
        </button>
      ))}
    </div>
  );
}
