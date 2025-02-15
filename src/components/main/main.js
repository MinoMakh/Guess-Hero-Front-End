import React, { useEffect, useState } from "react";
import DotGrid from "./dot-grid/DotGrid.js";
import EmojisContainer from "../emojis/EmojisContainer.js";
import ArtStyleContainer from "../art-style/Art-Style.js";
import QuotesContainer from "../quotes/Quotes.js";
import "./main.css";
// Icons
import quotesIcon from "../../assets/icons/quotes.png";
import superheroEmoji from "../../assets/icons/superhero-emoji.png";
import superheroMask from "../../assets/icons/superhero-mask.png";
import superhero from "../../assets/icons/superhero.png";
import ClassicContainer from "../classic/ClassicContainer.js";
import MoreInformationContainer from "../more-information/more-information.js";

const Main = () => {
  // Hooks
  const [heroNames, setHeroNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  // Today's heros for each gamemode
  const [classicTodayHero, setClassicTodayHero] = useState(null);
  const [emojisTodayHero, setEmojisTodayHero] = useState(null);
  const [quotesTodayHero, setQuotesTodayHero] = useState(null);
  const [artStyleTodayHero, setArtStyleTodayHero] = useState(null);

  // Map each option to its container
  const containerMap = {
    0: <ClassicContainer heroNames={heroNames} todayHero={classicTodayHero} />,
    1: <EmojisContainer heroNames={heroNames} todayHero={emojisTodayHero} />,
    3: <QuotesContainer heroNames={heroNames} todayHero={quotesTodayHero} />,
    2: (
      <ArtStyleContainer heroNames={heroNames} todayHero={artStyleTodayHero} />
    ),
  };

  // Fetch today's heroes
  useEffect(() => {
    const fetchTodayHeroes = async () => {
      try {
        const response = await fetch("https://api.guessthesuperhero.com/getHeros");
        const heroes = await response.json();

        setClassicTodayHero(heroes.classic[0]);
        setQuotesTodayHero(heroes.quotes[0]);
        setArtStyleTodayHero(heroes.arts[0]);
        setEmojisTodayHero(heroes.emojis[0]);
      } catch (error) {
        console.error("Error while fetching today's heroes:", error);
      }
    };
    fetchTodayHeroes();
  }, []);

  // Fetch names
  useEffect(() => {
    const fetchHeroNames = async () => {
      try {
        const response = await fetch("https://api.guessthesuperhero.com/getNames");
        const data = await response.json();

        setHeroNames(data);
      } catch (error) {
        console.error("Error fetching hero names:", error);
      }
    };

    fetchHeroNames();
  }, []);

  return (
    <div className="red-container">
      {/* More information bubble on top right corner */}
      <div
        className="more-information-container"
        onClick={() => setShowPopup(true)}
      >
        !<span className="option-text">More Information</span>
      </div>

      {/* More information container when bubble is clicked */}
      {showPopup && (
        <MoreInformationContainer
          onClose={() => setShowPopup(false)}
        ></MoreInformationContainer>
      )}

      <h1 className="title">Guess The Hero</h1>
      <div className="options-container">
        <div className="option" onClick={() => setSelectedOption(0)}>
          <img src={superhero} className="option-icon" alt="Superhero Icon" />
          <span className="option-text">Classic</span>
        </div>

        <div className="option" onClick={() => setSelectedOption(1)}>
          <img
            src={superheroEmoji}
            className="option-icon"
            alt="Superhero Emoji Icon"
          />
          <span className="option-text">Emojis</span>
        </div>

        <div className="option" onClick={() => setSelectedOption(2)}>
          <img
            src={superheroMask}
            className="option-icon"
            alt="Superhero Mask Icon"
          />
          <span className="option-text">Art Style</span>
        </div>

        <div className="option" onClick={() => setSelectedOption(3)}>
          <img src={quotesIcon} className="option-icon" alt="Quotes Icon" />
          <span className="option-text">Quotes</span>
        </div>
      </div>
      {classicTodayHero && containerMap[selectedOption]}
      <DotGrid></DotGrid>
    </div>
  );
};

export default Main;
