import React, { useState, useRef, useEffect } from "react";
import GameContainer from "../game/GameContainer";
import GameStats from "../../game-stats";

const ClassicContainer = ({ heroNames, todayHero }) => {
  // Local storage stats
  const gameStats = new GameStats(todayHero.name, "classic");
  const modeStats = gameStats.getModeStats();

  // Hooks
  const [usedHints, setUsedHints] = useState(modeStats.tries || 1);
  const [winned, setWinned] = useState(modeStats.winToday);
  const quotesListRef = useRef(null);

  // Scroll to top when a new hint is added
  useEffect(() => {
    if (quotesListRef.current) {
      quotesListRef.current.scrollTop = 0;
    }
  }, [usedHints]);

  // Updates hint count & game stats
  const addHint = (hero) => {
    gameStats.updateStat("tries");
    gameStats.addHero(hero);
    setUsedHints((prev) => prev + 1);
  };

  const updateWinned = (winnerHero) => {
    gameStats.addHero(winnerHero);
    gameStats.addWin();
    setWinned(true);
  };

  return (
    <GameContainer
      title="Guess Today's Hero"
      description="Each try unlocks a hint."
      todayHero={todayHero}
      heroNames={heroNames}
      onWrongAnswer={addHint}
      winToday={winned}
      onWinned={updateWinned}
      mode={"classic"}
    >
      <div className="quotes-list" ref={quotesListRef}>
        {todayHero.hints
          ?.slice(0, usedHints)
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

export default ClassicContainer;
