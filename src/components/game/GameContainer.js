import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import confetti from "canvas-confetti";
import Win from "../win/Win";
import GameStats from "../../game-stats";

const GameContainer = ({
  heroNames,
  todayHero,
  title,
  description,
  children,
  onWrongAnswer,
  winToday,
  onWinned,
  mode,
}) => {
  const gameStats = new GameStats(todayHero.name, mode);
  const modeStats = gameStats.getModeStats();

  // Hooks
  const [inputValue, setInputValue] = useState(""); // Input of the user
  const [filteredNames, setFilteredNames] = useState([]); // Current displayed heroes to the user
  const [winned, setWinned] = useState(winToday); // Track game status
  const [tries, setTries] = useState(modeStats.tries); // Track number of tries
  const [selectedHeroes, setSelectedHeroes] = useState(
    modeStats.selectedHeroes || []
  ); // Track selected heroes from the user
  const [showModal, setShowModal] = useState(true);
  const heroListRef = useRef(null);
  // To check if the dropdown is above the input
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const handleOnClose = () => {
    setShowModal(!showModal);
  };

  // Check if the dropdown is above the input
  useEffect(() => {
    const handlePosition = () => {
      if (inputRef.current && listRef.current) {
        const inputRect = inputRef.current.getBoundingClientRect();
        const listRect = listRef.current.getBoundingClientRect();
        const spaceBelow = window.innerHeight - inputRect.bottom;
        const spaceAbove = inputRect.top;
        if (spaceBelow < listRect.height && spaceAbove > listRect.height) {
          listRef.current.style.bottom = "30px";
        }
      }
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);
    return () => window.removeEventListener("resize", handlePosition);
  }, [filteredNames]);

  // Animation for newly added hero
  useEffect(() => {
    if (selectedHeroes.length > 0) {
      // Get the last added hero
      const newHero = selectedHeroes[selectedHeroes.length - 1];

      // Get the newly added hero element
      const newHeroElement = heroListRef.current.querySelector(
        `[data-hero-name="${newHero.name}"]`
      );

      if (newHeroElement) {
        // Animate the newly added hero: scale-up effect (pop)
        gsap.fromTo(
          newHeroElement,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5 }
        );
      }
    }
  }, [selectedHeroes]); // Trigger animation whenever a new hero is added

  // Confetti effect when user wins
  useEffect(() => {
    if (winned) {
      // Trigger the confetti animation
      confetti({
        particleCount: 200,
        spread: 360,
        origin: { x: 0.5, y: 0.5 }, // Center of the screen
        colors: ["#ff0", "#0f0", "#00f", "#f0f", "#0ff"],
      });
    }
  }, [winned]);

  // Filter heroNames whenever inputValue changes
  useEffect(() => {
    if (inputValue === "") {
      setFilteredNames([]);
    } else {
      setFilteredNames(
        heroNames.filter(
          (hero) =>
            hero.name
              .replace(/[^a-z0-9]/gi, "")
              .toLowerCase()
              .includes(inputValue.replace(/[^a-z0-9]/gi, "").toLowerCase()) &&
            !selectedHeroes.some(
              (selectedHero) => selectedHero.name === hero.name
            )
        )
      );
    }
  }, [inputValue, heroNames, selectedHeroes]);

  // Callback function when an option is selected
  const chooseHero = (hero) => {
    setSelectedHeroes((selectedHeroes) => [...selectedHeroes, hero]);
    setInputValue("");

    if (hero.name === todayHero.name) {
      setWinned(true);
      onWinned(hero);
    } else {
      setTries(tries + 1);
      onWrongAnswer(hero);
    }
  };

  return (
    <div className="container">
      {/* Winner container */}
      {winned && showModal && (
        <>
          <div className="dark-overlay"></div>
          <Win
            todayHero={todayHero}
            tries={tries}
            onClose={handleOnClose}
            mode={mode}
          ></Win>
        </>
      )}

      <h2>{title}</h2>
      {description && <p>{description}</p>}

      {/* Container for the specific game mode */}
      <div>{children}</div>

      {/* Input to search for heroes */}
      {!winned && (
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input
            className="input"
            placeholder="Search for a hero"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            ref={inputRef}
          />
        </div>
      )}

      {/* Autocompletion for the user input */}
      {filteredNames.length > 0 && (
        <ul className="hero-option-list" ref={listRef}>
          {filteredNames.map((hero, index) => (
            <div key={index} className="hero-option">
              <img
                className="hero-image"
                src={`data:image/jpeg;base64,${hero.image}`}
                alt={hero.image}
                onClick={() => chooseHero(hero)}
              />
              <span className="hero-name" onClick={() => chooseHero(hero)}>
                {hero.name}
              </span>
            </div>
          ))}
        </ul>
      )}

      {winned && <p className="win-message">You Won!</p>}
      {winned && (
        <p className="win-description" onClick={() => handleOnClose()}>
          See statistics
        </p>
      )}

      {/* Dropdown of selected heroes by the user */}
      {selectedHeroes.length > 0 && (
        <ul ref={heroListRef} className="hero-option-list-selected">
          {selectedHeroes
            .slice()
            .reverse()
            .map((hero, index) => {
              const isCorrect = hero.name === todayHero.name;
              const dynamicClassName = `hero-option ${
                isCorrect ? "hero-option-right" : "hero-option-wrong"
              }`;

              return (
                <div
                  key={index}
                  className={dynamicClassName}
                  data-hero-name={hero.name}
                >
                  <img
                    className="hero-image"
                    src={`data:image/jpeg;base64,${hero.image}`}
                    alt={hero.name}
                  />
                  <li className="hero-name">{hero.name}</li>
                </div>
              );
            })}
        </ul>
      )}
    </div>
  );
};

export default GameContainer;
