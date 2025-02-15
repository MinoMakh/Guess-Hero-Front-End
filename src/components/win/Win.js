import React, { useEffect, useRef } from "react";
import GameStats from "../../game-stats";

const Win = ({ todayHero, tries, onClose, mode }) => {
  // Local storage stats
  const gameStats = new GameStats(todayHero.name, mode);
  const modeStats = gameStats.getModeStats();

  // Hooks
  const [timeLeft, setTimeLeft] = React.useState(timeUntilMidnightUTC2());
  const containerRef = useRef(null);

  // Escape button event listener to close container
  useEffect(() => {
    const handleEscapeButton = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscapeButton);

    return () => window.removeEventListener("keydown", handleEscapeButton);
  }, [onClose]);

  // Click outside the container to close container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target))
        onClose();
    };

    document.addEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(timeUntilMidnightUTC2());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fix-win-container">
      <div className="win-container" onKeyDown={onClose} ref={containerRef}>
        <div className="close-icon" onClick={onClose}></div>
        <p className="font-lg">You Won!</p>
        <div className="hero-container">
          <img
            className="hero-image"
            src={`data:image/jpeg;base64,${todayHero.image}`}
            alt={todayHero.image}
          />
          <p className="font-lg">You guessed {todayHero.name} correctly!</p>
        </div>
        <p className="font-md">Number of tries: {tries}</p>

        <hr></hr>

        <p className="font-md">
          <b>{mode.charAt(0).toUpperCase() + mode.slice(1)} Stats:</b>
        </p>
        <p className="font-sm">Wins: {modeStats.wins}</p>
        <p className="font-sm">Current Win streak: {modeStats.winStreak}</p>
        <p className="font-sm">Maximum Win streak: {modeStats.maxWinStreak}</p>

        <hr></hr>

        <p className="font-md">
          <b>General Stats:</b>
        </p>
        <p className="font-sm">Total wins: {gameStats.getTotalWins()}</p>
        <p className="font-lg">
          Next Hero in: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}
          s
        </p>
      </div>
    </div>
  );
};

// Calculate time for next hero
const timeUntilMidnightUTC2 = () => {
  const now = new Date(); // Current time
  const utcOffset = 2; // UTC+2 offset
  const currentUTC2 = new Date(now.getTime() + utcOffset * 60 * 60 * 1000); // Convert to UTC+2

  // Calculate the next midnight at UTC+2
  const nextMidnightUTC2 = new Date(
    currentUTC2.getFullYear(),
    currentUTC2.getMonth(),
    currentUTC2.getDate() + 1, // Tomorrow's date
    0,
    0,
    0,
    0
  );

  const timeRemainingMs = nextMidnightUTC2 - currentUTC2; // Time difference in milliseconds

  // Convert to a readable format
  const hours = Math.floor(timeRemainingMs / (1000 * 60 * 60));
  const minutes = Math.floor(
    (timeRemainingMs % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((timeRemainingMs % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};

export default Win;
