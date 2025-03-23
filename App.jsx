import { useState, useEffect } from "react";

const TypingTest = () => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speed, setSpeed] = useState(null);

  useEffect(() => {
    if (isTyping && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setSpeed(text.length / 10);
      setIsTyping(false);
    }
  }, [isTyping, timeLeft]);

  const handleChange = (e) => {
    if (!isTyping) setIsTyping(true);
    setText(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Typing Speed Test</h2>
      <p>Time Left: {timeLeft} seconds</p>
      <textarea
        onChange={handleChange}
        value={text}
        disabled={timeLeft === 0}
        placeholder="Start typing..."
        rows="5"
        cols="40"
      />
      {timeLeft === 0 && <h3>Typing Speed: {speed.toFixed(2)} characters/sec</h3>}
    </div>
  );
};

export default TypingTest;