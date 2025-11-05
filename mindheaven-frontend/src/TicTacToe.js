import React, { useState } from "react";
import "./TicTacToe.css";
import Navbar from "./navbar";

const TicTacToe = ({
  goToHome,
  goToLogin,
  goToSignup,
  goToGames,
  goToContact,
  goToWellness,
  goToBlogs,
  currentPage,
  userEmail,userName,userRole
}) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [status, setStatus] = useState("Your move: X");

  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (newBoard) => {
    for (const [a, b, c] of winningCombos) {
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return newBoard[a];
      }
    }
    if (newBoard.every(Boolean)) return "Draw";
    return null;
  };

  const makeAIMove = (newBoard) => {
    const emptyIndices = newBoard
      .map((val, idx) => (val === null ? idx : null))
      .filter((i) => i !== null);
    if (emptyIndices.length === 0) return;

    const move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    newBoard[move] = "O";
    setBoard([...newBoard]);

    const result = checkWinner(newBoard);
    if (result) {
      setStatus(result === "Draw" ? "It's a Draw!" : `Winner: ${result}`);
    } else {
      setIsPlayerTurn(true);
      setStatus("Your move: X");
    }
  };

  const handleClick = (index) => {
    if (!isPlayerTurn || board[index] || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    const result = checkWinner(newBoard);
    if (result) {
      setStatus(result === "Draw" ? "It's a Draw!" : `Winner: ${result}`);
    } else {
      setIsPlayerTurn(false);
      setStatus("AI thinking...");
      setTimeout(() => makeAIMove(newBoard), 500);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setStatus("Your move: X");
  };

  return (
    <div className="tictactoe-page">
      {/* Keep the top blue Navbar */}
      <Navbar
        currentPage="tictactoe"
        goToHome={goToHome}
        goToLogin={goToLogin}
        goToSignup={goToSignup}
        goToGames={goToGames}
        goToContact={goToContact}
        goToWellness={goToWellness}
        goToBlogs={goToBlogs}
        userName={userName}    // ✅ show logged in name
        userRole={userRole}
        userEmail={userEmail}
      />

      <div className="tictactoe-content">
        <h1 className="tictactoe-title">Tic Tac Toe 🤖</h1>
        <div className="tictactoe-status">{status}</div>

        <div className="tictactoe-board">
          {board.map((val, idx) => (
            <div
              key={idx}
              className={`cell ${val ? "disabled" : ""}`}
              onClick={() => handleClick(idx)}
            >
              {val}
            </div>
          ))}
        </div>

        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>
    </div>
  );
};

export default TicTacToe;
