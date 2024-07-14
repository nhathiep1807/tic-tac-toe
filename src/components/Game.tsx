"use client";
import { useEffect, useState } from "react";
import Board from "./Board";
import { TPlayer } from "@components/typesafe/type";
export default function AdvancedGame() {
  const [board, setBoard] = useState<TPlayer[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<TPlayer>(null);
  const [winningSquares, setWinningSquares] = useState<number[]>([]);
  const [scores, setScores] = useState<{ X: number; O: number }>({
    X: 0,
    O: 0,
  });

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    console.log({ board, newBoard });

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext((prev) => !prev);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner.winner);
      setWinningSquares(gameWinner.winningSquares);
      setScores((prev) => ({
        ...prev,
        [gameWinner.winner as string]:
          prev[gameWinner.winner as keyof typeof scores] + 1,
      }));
    }
  };

  const calculateWinner = (
    squares: TPlayer[]
  ): { winner: TPlayer; winningSquares: number[] } | null => {
    const checkWinner = (a: number, b: number, c: number) => {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
      return null;
    };

    for (let i = 0; i < 3; i++) {
      // Check rows
      const isRowWinner = checkWinner(i * 3, i * 3 + 1, i * 3 + 2);
      if (isRowWinner) return isRowWinner;

      // Check columns
      const isColumnWinner = checkWinner(i, i + 3, i + 6);
      if (isColumnWinner) return isColumnWinner;
    }

    // Check diagonals
    const isDiagonalWinner1 = checkWinner(0, 4, 8);
    if (isDiagonalWinner1) return isDiagonalWinner1;

    const isDiagonalWinner2 = checkWinner(2, 4, 6);
    if (isDiagonalWinner2) return isDiagonalWinner2;

    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningSquares([]);
  };

  const gameStatus = () => {
    if (winner) {
      return <span className="text-green-500">Winner: Player {winner} 👏</span>;
    } else if (!board.includes(null)) {
      return <span className="text-red-400">Draw! 🤝</span>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-52">
      {(winner || !board.includes(null)) && (
        <p className="text-2xl mb-6 font-bold animate-tada">{gameStatus()}</p>
      )}
      <div className="flex gap-4 mb-4">
        <p
          className={`px-4 py-2 border border-slate-400 rounded-lg transition-all duration-300 ${
            (winner === "X" || (!winner && board.includes(null) && xIsNext)) &&
            "bg-green-500 text-white font-bold"
          }`}
        >
          Player X
        </p>
        <p
          className={`px-4 py-2 border border-slate-400 rounded-lg transition-all duration-300 ${
            (winner === "O" || (!winner && board.includes(null) && !xIsNext)) &&
            "bg-green-500 text-white font-bold"
          }`}
        >
          Player O
        </p>
      </div>

      <div className="relative">
        <Board
          squares={board}
          onClick={handleClick}
          winningSquares={winningSquares}
          xIsNext={xIsNext}
        />
        <div className="absolute top-1/2 -translate-y-1/2 -right-40">
          <p className="text-lg font-bold">Score:</p>
          <p className="text-lg font-semibold text-blue-500">
            Player X{" "}
            {scores.X > scores.O ? "🥳" : scores.X === scores.O ? "🫡" : "🥹"}:{" "}
            {scores.X}
          </p>
          <p className="text-lg font-semibold text-red-500">
            Player O{" "}
            {scores.X < scores.O ? "🥳" : scores.X === scores.O ? "🫡" : "🥹"}:{" "}
            {scores.O}
          </p>
        </div>
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={restartGame}
      >
        Restart Game
      </button>
    </div>
  );
}
