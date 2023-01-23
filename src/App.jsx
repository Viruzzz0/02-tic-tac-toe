import { useState } from "react";
import "./App.css";
import "./index.css";

const TURN = {
  X: "x",
  O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
  const clsName = `square ${isSelected ? "is-selected" : ""}`;
  const handleClick = () => {
    updateBoard(index);
  };
  return (
    <div onClick={handleClick} className={clsName}>
      {children}
    </div>
  );
};

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURN.X);
  const [winner, setWinner] = useState(null);
  console.log(board);

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURN.X)
    setWinner(null)
  }

  const checkWinner = (boardCheck) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardCheck[a] &&
        boardCheck[a] === boardCheck[b] &&
        boardCheck[b] === boardCheck[c]
      ) {
        return boardCheck[a];
      }
    }
    return null;
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURN.X ? TURN.O : TURN.X;
    setTurn(newTurn);

    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>reset</button>
      <section className="game">
        {board.map((_, index) => {
          return (
            <Square key={index} index={index} updateBoard={updateBoard}>
              {board[index]}
            </Square>
          );
        })}
      </section>
      <section>
        <Square isSelected={turn === TURN.X}>{TURN.X}</Square>
        <Square isSelected={turn === TURN.O}>{TURN.O}</Square>
      </section>

      {
      winner !== null && (
        <section className="winner">
          <div className="text">
            <h2>
              {
               winner === false 
               ? "Empate" 
               : "Gano:"
              }
            </h2>
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
          </div>
        </section>
      )
      }
    </main>
  );
}

export default App;
