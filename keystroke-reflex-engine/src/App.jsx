import { useEffect, useRef, useState } from "react";

const DEFAULT_WORDS = [
  "javascript",
  "react",
  "keyboard",
  "developer",
  "browser",
  "function",
  "testing",
  "frontend",
];

const TOTAL_ROUNDS = 10;
const ROUND_TIME = 3;

export default function App() {
  const [wordsInput, setWordsInput] = useState(
    DEFAULT_WORDS.join(", ")
  );

  const [words, setWords] = useState(DEFAULT_WORDS);

  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  const [currentCharacter, setCurrentCharacter] = useState("");
  const [currentRound, setCurrentRound] = useState(1);

  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [missedCount, setMissedCount] = useState(0);

  const [timeLeft, setTimeLeft] = useState(ROUND_TIME);
  const [message, setMessage] = useState("");

  const hasAnswered = useRef(false);

  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  // Generate random character
  const generateCharacter = () => {
    const randomWord =
      words[Math.floor(Math.random() * words.length)];

    const randomChar =
      randomWord[
        Math.floor(Math.random() * randomWord.length)
      ];

    return randomChar;
  };

  // Start a round
  const startRound = () => {
    hasAnswered.current = false;

    setMessage("");

    const char = generateCharacter();

    setCurrentCharacter(char);

    setTimeLeft(ROUND_TIME);

    // Countdown
    countdownRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(countdownRef.current);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    // Main timer
    timerRef.current = setTimeout(() => {
      if (!hasAnswered.current) {
        setScore((prev) => prev - 1);

        setMissedCount((prev) => prev + 1);

        setMessage("Time Out ❌");
      }

      moveToNextRound();
    }, ROUND_TIME * 1000);
  };

  // Next round
  const moveToNextRound = () => {
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);

    setTimeout(() => {
      if (currentRound >= TOTAL_ROUNDS) {
        endGame();
      } else {
        setCurrentRound((prev) => prev + 1);
      }
    }, 700);
  };

  // End game
  const endGame = () => {
    setGameEnded(true);
    setGameStarted(false);
  };

  // Start game
  const startGame = () => {
    const processedWords = wordsInput
      .split(",")
      .map((word) => word.trim().toLowerCase())
      .filter((word) => word.length > 0);

    if (processedWords.length === 0) {
      alert("Please enter at least one valid word.");
      return;
    }

    setWords(processedWords);

    // Reset
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setMissedCount(0);

    setCurrentRound(1);

    setGameEnded(false);
    setGameStarted(true);
  };

  // Restart
  const playAgain = () => {
    startGame();
  };

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!gameStarted) return;

      // Ignore held keys
      if (event.repeat) return;

      // Only first key counts
      if (hasAnswered.current) return;

      // Ignore special keys
      if (event.key.length !== 1) return;

      hasAnswered.current = true;

      const pressedKey = event.key.toLowerCase();

      const expectedKey =
        currentCharacter.toLowerCase();

      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);

      if (pressedKey === expectedKey) {
        setScore((prev) => prev + 1);

        setCorrectCount((prev) => prev + 1);

        setMessage("Correct ✅");
      } else {
        setScore((prev) => prev - 1);

        setWrongCount((prev) => prev + 1);

        setMessage(`Wrong ❌ (${pressedKey})`);
      }

      moveToNextRound();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [gameStarted, currentCharacter]);

  // Start rounds
  useEffect(() => {
    if (gameStarted) {
      startRound();
    }

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [currentRound, gameStarted]);

  return (
    <div className="container">
      <div className="card">
        <h1>⚡ Keystroke Reflex Engine</h1>

        {!gameStarted && !gameEnded && (
          <div className="setup-section">
            <label>
              Word Set (comma separated)
            </label>

            <textarea
              value={wordsInput}
              onChange={(e) =>
                setWordsInput(e.target.value)
              }
              rows="5"
            />

            <button onClick={startGame}>
              START GAME
            </button>
          </div>
        )}

        {gameStarted && (
          <div className="game-section">
            <div className="top-bar">
              <div>
                Round: {currentRound} /{" "}
                {TOTAL_ROUNDS}
              </div>

              <div>Score: {score}</div>

              <div>Time: {timeLeft}s</div>
            </div>

            <div className="character-box">
              {currentCharacter}
            </div>

            <p className="instruction">
              Press the matching key before
              time runs out.
            </p>

            <div className="message">
              {message}
            </div>
          </div>
        )}

        {gameEnded && (
          <div className="results-section">
            <h2>Game Summary</h2>

            <div className="result-grid">
              <div className="result-card">
                <span>Final Score</span>
                <h3>{score}</h3>
              </div>

              <div className="result-card">
                <span>Correct</span>
                <h3>{correctCount}</h3>
              </div>

              <div className="result-card">
                <span>Wrong</span>
                <h3>{wrongCount}</h3>
              </div>

              <div className="result-card">
                <span>Missed</span>
                <h3>{missedCount}</h3>
              </div>
            </div>

            <div className="button-group">
              <button onClick={playAgain}>
                Play Again
              </button>

              <button
                className="secondary"
                onClick={() =>
                  setGameEnded(false)
                }
              >
                Edit Words
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}