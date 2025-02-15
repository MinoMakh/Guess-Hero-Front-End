import React, { useState } from "react";
import GameContainer from "../game/GameContainer";
import GameStats from "../../game-stats";

const ArtStyleContainer = ({ heroNames, todayHero }) => {
  // Local storage stats
  const gameStats = new GameStats(todayHero.name, "art");
  const modeStats = gameStats.getModeStats();

  const initialZoomLevel = 3; // Start with a zoom level
  const zoomOutStep = 0.5; // Decrease zoom level per wrong try

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

  // Calculate the current zoom level
  const currentZoom = Math.max(initialZoomLevel - tries * zoomOutStep, 1);

  return (
    <GameContainer
      title={"Which Hero is Behind This Art?"}
      description={"Each try zooms out the splash art."}
      todayHero={todayHero}
      heroNames={heroNames}
      onWrongAnswer={addTry}
      winToday={winned}
      onWinned={updateWinned}
      mode={"art"}
    >
      <div className="art-style-container">
        <img
          className="hero-splash-art"
          src={`data:image/jpeg;base64,${
            todayHero.splashArts[todayHero.selectedSplashArtIndex]
          }`}
          alt={todayHero.name}
          style={{
            transform: `scale(${currentZoom})`,
          }}
        />
      </div>
    </GameContainer>
  );
};

export default ArtStyleContainer;
