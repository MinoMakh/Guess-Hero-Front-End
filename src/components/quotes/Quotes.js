import React, { useState, useRef, useEffect } from "react";
import GameContainer from "../game/GameContainer";
import GameStats from "../../game-stats";

const QuotesContainer = ({ heroNames, todayHero }) => {
  // Local storage stats
  const gameStats = new GameStats(todayHero.name, "quotes");
  const modeStats = gameStats.getModeStats();

  // Hooks
  const [usedTries, setUsedTries] = useState(modeStats.tries || 1);
  const [winned, setWinned] = useState(modeStats.winToday);
  const quotesListRef = useRef(null);

  // Scroll to top when a new hint is added
  useEffect(() => {
    if (quotesListRef.current) {
      quotesListRef.current.scrollTop = 0;
    }
  }, [usedTries]);

  // Updates hint count & game stats
  const addHint = (hero) => {
    gameStats.updateStat("tries");
    gameStats.addHero(hero);
    setUsedTries((prev) => prev + 1);
  };

  const updateWinned = (winnerHero) => {
    gameStats.addHero(winnerHero);
    gameStats.addWin();
    setWinned(true);
  };

  return (
    <GameContainer
      title="Guess the Hero Behind the Words"
      description="Each try unlocks a quote."
      todayHero={todayHero}
      heroNames={heroNames}
      onWrongAnswer={addHint}
      winToday={winned}
      onWinned={updateWinned}
      mode={"quotes"}
    >
      <div className="quotes-list" ref={quotesListRef}>
        {todayHero.quotes
          ?.slice(0, usedTries)
          .map((hint, index) => (
            <p key={index} className="quote">
              {hint}
            </p>
          ))
          .reverse()}
      </div>
    </GameContainer>
  );
};

export default QuotesContainer;
