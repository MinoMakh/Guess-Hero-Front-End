import React, { useEffect, useRef } from "react";
import GameStats from "../../game-stats";

const MoreInformationContainer = ({ onClose }) => {
  // Local storage stats
  const gameStats = new GameStats(null, "classic");
  const modeStats = gameStats.getAllStats();
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

  return (
    <>
      <div className="dark-overlay"></div>
      <div className="popup-fix-container" ref={containerRef}>
        <div className="popup-container">
          <div className="close-icon" onClick={() => onClose()}></div>
          <p className="font-lg">Statistics</p>

          <p className="font-md">Classic:</p>
          <p className="font-sm">Wins: {modeStats["classic"].wins}</p>
          <p className="font-sm">
            Current Win Streak: {modeStats["classic"].winStreak}
          </p>
          <p className="font-sm">
            Maximum Win Streak: {modeStats["classic"].maxWinStreak}
          </p>

          <hr></hr>

          <p className="font-md">Emojis:</p>
          <p className="font-sm">Wins: {modeStats["emojis"].wins}</p>
          <p className="font-sm">
            Current Win Streak: {modeStats["emojis"].winStreak}
          </p>
          <p className="font-sm">
            Maximum Win Streak: {modeStats["emojis"].maxWinStreak}
          </p>

          <hr></hr>

          <p className="font-md">Art Style:</p>
          <p className="font-sm">Wins: {modeStats["art"].wins}</p>
          <p className="font-sm">
            Current Win Streak: {modeStats["art"].winStreak}
          </p>
          <p className="font-sm">
            Maximum Win Streak: {modeStats["art"].maxWinStreak}
          </p>

          <hr></hr>

          <p className="font-md">Quotes:</p>
          <p className="font-sm">Wins: {modeStats["quotes"].wins}</p>
          <p className="font-sm">
            Current Win Streak: {modeStats["quotes"].winStreak}
          </p>
          <p className="font-sm">
            Maximum Win Streak: {modeStats["quotes"].maxWinStreak}
          </p>

          <hr></hr>

          <p className="font-lg">About the Developer:</p>
          <p className="font-md">Contact: alimakhloufj@gmail.com</p>

          <div className="social-links">
            <a
              href="https://github.com/MinoMakh"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                height="48"
                width="48"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59 0.4 0.07 0.55-0.17 0.55-0.38 0-0.19-0.01-0.82-0.01-1.49-2.01 0.37-2.53-0.49-2.69-0.94-0.09-0.23-0.48-0.94-0.82-1.13-0.28-0.15-0.68-0.52-0.01-0.53 0.63-0.01 1.08 0.58 1.23 0.82 0.72 1.21 1.87 0.87 2.33 0.66 0.07-0.52 0.28-0.87 0.51-1.07-1.78-0.2-3.64-0.89-3.64-3.95 0-0.87 0.31-1.59 0.82-2.15-0.08-0.2-0.36-1.02 0.08-2.12 0 0 0.67-0.21 2.2 0.82 0.64-0.18 1.32-0.27 2-0.27s1.36 0.09 2 0.27c1.53-1.04 2.2-0.82 2.2-0.82 0.44 1.1 0.16 1.92 0.08 2.12 0.51 0.56 0.82 1.28 0.82 2.15 0 3.07-1.87 3.75-3.65 3.95 0.29 0.25 0.54 0.73 0.54 1.48 0 1.07-0.01 1.93-0.01 2.19 0 0.21 0.15 0.46 0.55 0.38 3.18-1.06 5.47-4.05 5.47-7.59 0-4.42-3.58-8-8-8z" />
              </svg>
              <span className="social-text">My Github</span>
            </a>

            <a
              href="https://www.linkedin.com/in/ali-makhlouf/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="48px"
                height="48px"
              >
                <path
                  fill="#0078d4"
                  d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5	V37z"
                />
                <path
                  d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364	c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274	L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479	C18,16.523,16.521,18,14.485,18H18v19H11z"
                  opacity=".05"
                />
                <path
                  d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677	c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638	c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001	c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z"
                  opacity=".07"
                />
                <path
                  fill="#fff"
                  d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12	c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698	c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19	c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"
                />
              </svg>
              <span className="social-text">My LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInformationContainer;
