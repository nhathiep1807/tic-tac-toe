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
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!board.includes(null)) {
      return "Draw!";
    } else {
      return `Next player: ${xIsNext ? "X" : "O"}`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-4">{renderStatus()}</h1>
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
