"use client";
import { useState } from "react";
import Board from "./Board";
import { TPlayer } from "@components/typesafe/type";

export default function Game() {
  const [board, setBoard] = useState<TPlayer[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [winner, setWinner] = useState<TPlayer>(null);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = board.slice();
    console.log({ board, newBoard });

    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext((prev) => !prev);
    setWinner(calculateWinner(newBoard));
  };

  const calculateWinner = (squares: TPlayer[]): TPlayer => {
    const checkWinner = (a: number, b: number, c: number) => {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
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
  };

  const gameStatus = () => {
    if (winner) {
      return `Winner: ${winner} 👏`;
    } else if (!board.includes(null)) {
      return "Draw! 🤝";
    } else {
      return (
        <p>
          Next player: 👉{" "}
          <span
            className={`font-bold ${
              xIsNext ? "text-blue-500" : "text-red-500"
            }`}
          >
            {xIsNext ? "X" : "O"}
          </span>
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">{gameStatus()}</h1>
      <Board squares={board} onClick={handleClick} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={restartGame}
      >
        Restart Game
      </button>
    </div>
  );
}
