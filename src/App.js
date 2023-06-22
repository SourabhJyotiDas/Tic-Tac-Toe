import './App.css';
import { useEffect, useState } from "react";



function App() {

  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [box, setBox] = useState(Array(9).fill(null));
  const [status, setStatus] = useState("");

  const winnnerLine = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]

  const handleClick = (index) => {
    let newBox = [...box];
    newBox[index] = currentPlayer;
    setBox(newBox)
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X")
  }

  const chooseWinner = (box) => {
    for (let i = 0; i < winnnerLine.length; i++) {
      // console.log([winnnerLine[i]]);
      const [x, y, z] = winnnerLine[i];
      if (box[x] !== null && box[x] === box[y] && box[y] === box[z]) {
        return box[x];
      }
    }
    return null;
  }

  const handleReset = () => {
    setBox(Array(9).fill(null));
    setCurrentPlayer("X");
  }

  const getStatus = () => {
    if (winner !== null) {
      setStatus(`Player ${winner} Wins`)
    }
    else if (!box.includes(null)) {
      setStatus(`Draw`)
    }
    else {
      setStatus(`Player ${currentPlayer} turns`)
    }
  }

  const winner = chooseWinner(box)

  useEffect(() => {
    chooseWinner(box)
    // eslint-disable-next-line
    getStatus()
    // eslint-disable-next-line
  }, [box])


  return (
    <div className='App'>
      <p>{status}</p>
      <div className='board'>
        {
          box.map((empty, index) => {
            return <button className="cell" key={index}
              disabled={box[index] || winner}
              onClick={() => { handleClick(index) }} >
              {box[index]}
            </button>
          })
        }
      </div>
      <button className='btn'
        onClick={handleReset}
      >Reset</button>
    </div >
  );
}

export default App;
