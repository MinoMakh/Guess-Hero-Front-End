import React, { useState } from "react";
import GameContainer from "../game/GameContainer";
import GameStats from "../../game-stats";

const EmojisContainer = ({ heroNames, todayHero }) => {
  // Local storage stats
  const gameStats = new GameStats(todayHero.name, "emojis");
  const modeStats = gameStats.getModeStats();

  // Hooks
  const [tries, setTries] = useState(modeStats.tries || 1);
  const [winned, setWinned] = useState(modeStats.winToday);

  // Updates hint count & game stats
  const addTry = (hero) => {
    gameStats.updateStat("tries");
    gameStats.addHero(hero);
    setTries((prev) => prev + 1);
  };

  const updateWinned = (winnerHero) => {
    gameStats.addHero(winnerHero);
    gameStats.addWin();
    setWinned(true);
  };

  return (
    <GameContainer
      title={"Which Hero do these Emojis describe?"}
      description={"Each try unlocks an emoji."}
      todayHero={todayHero}
      heroNames={heroNames}
      onWrongAnswer={addTry}
      winToday={winned}
      onWinned={updateWinned}
      mode={"emojis"}
    >
      <div className="emojis-container">
        <p className="emoji">{todayHero.emojis[0]}</p>
        <p className="emoji">{tries > 1 ? todayHero.emojis[1] : " ? "}</p>
        <p className="emoji">{tries > 2 ? todayHero.emojis[2] : " ? "}</p>
        <p className="emoji">{tries > 3 ? todayHero.emojis[3] : " ? "}</p>
      </div>
    </GameContainer>
  );
};

export default EmojisContainer;
