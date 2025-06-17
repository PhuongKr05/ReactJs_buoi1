import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState("idle");
  const [message, setMessage] = useState("");
  const [delay, setDelay] = useState(0);
  const [timeoutId, setTimeoutId] = useState(null);

  const startGame = () => {
    const randomDelay = Math.floor(Math.random() * 4000) + 1000; 
    setDelay(randomDelay);
    setGameState("waiting");
    setMessage("");

    const id = setTimeout(() => {
      setGameState("ready");
      setMessage("Bấm ngay!");
    }, randomDelay);

    setTimeoutId(id);
  };

  const handleClick = () => {
    if (gameState === "waiting") {
      clearTimeout(timeoutId);
      setGameState("tooSoon");
      setMessage("Bạn quá vội!");
    } else if (gameState === "ready") {
      setGameState("success");
      setMessage("Bạn phản xạ rất tốt!");
    }
  };

  return (
    <div className="container">
      <h1>Kiểm Tra Phản Xạ</h1>
      <button onClick={startGame}>Bắt đầu</button>

      <div className="play-area">
        <button className="click-btn" onClick={handleClick}>
          Nhấn
        </button>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default App;
