import { useState } from 'react';

let gameState = {
  emptySquare: '',
  boardSize: 9,

  inProgress: true,
  index: 0,
  turns: ['X'], // store turns for time-travel
  nextTurn: function () {
    this.turns
      .push(this.turns[this.index] === 'X' ? 'O' : 'X');
    this.index += 1;
  },
  currentMark: function () {
    return this.turns[this.index];
  }
}

function Square({ value, handleClick }) {
  return <button
    className="square"
    onClick={handleClick}>
    {value}
  </button>;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(gameState.boardSize)
    .fill(gameState.emptySquare));

  function handleClick(i) {
    gameState.inProgress = gameState.inProgress && !calculateWinner(squares);
    if (gameState.inProgress && squares[i] === gameState.emptySquare) {
      let nextSquares = squares.slice();
      nextSquares[i] = gameState.currentMark();
      setSquares(nextSquares);
      gameState.nextTurn();
    }
  }

  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} handleClick={() => { handleClick(0) }} />
        <Square value={squares[1]} handleClick={() => { handleClick(1) }} />
        <Square value={squares[2]} handleClick={() => { handleClick(2) }} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} handleClick={() => { handleClick(3) }} />
        <Square value={squares[4]} handleClick={() => { handleClick(4) }} />
        <Square value={squares[5]} handleClick={() => { handleClick(5) }} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} handleClick={() => { handleClick(6) }} />
        <Square value={squares[7]} handleClick={() => { handleClick(7) }} />
        <Square value={squares[8]} handleClick={() => { handleClick(8) }} />
      </div>
    </>
  );
}