class GameStats {
  static STORAGE_KEY = "gameStats";

  constructor(todayHeroName, mode) {
    const savedStats = localStorage.getItem(GameStats.STORAGE_KEY);
    this.stats = savedStats ? JSON.parse(savedStats) : this.getDefaultStats();
    this.mode = mode;

    if (!this.stats[mode] || this.stats[mode].lastHero !== todayHeroName) {
      this.resetStats(todayHeroName);
    }
  }

  getDefaultStats() {
    return {
      classic: {
        tries: 1,
        winToday: false,
        wins: 0,
        winStreak: 0,
        maxWinStreak: 0,
        lastHero: null,
        selectedHeroes: [],
      },
      quotes: {
        tries: 1,
        winToday: false,
        wins: 0,
        winStreak: 0,
        maxWinStreak: 0,
        lastHero: null,
        selectedHeroes: [],
      },
      emojis: {
        tries: 1,
        winToday: false,
        wins: 0,
        winStreak: 0,
        maxWinStreak: 0,
        lastHero: null,
        selectedHeroes: [],
      },
      art: {
        tries: 1,
        winToday: false,
        wins: 0,
        winStreak: 0,
        maxWinStreak: 0,
        lastHero: null,
        selectedHeroes: [],
      },
    };
  }

  // Get total wins across all gamemodes
  getTotalWins = () => {
    return Object.values(this.stats).reduce(
      (total, modeStats) => total + modeStats.wins,
      0
    );
  };

  // Need to restart the stats for each mode every 24h (When a new hero comes)
  resetStats(newHero) {
    // Restart the winstreak if the user didnt win last time
    if (!this.stats[this.mode].winToday) {
      this.stats[this.mode].winStreak = 0;
    }

    // Restart all stats
    this.stats[this.mode].tries = 1;
    this.stats[this.mode].winToday = false;
    this.stats[this.mode].lastHero = newHero;
    this.stats[this.mode].selectedHeroes = [];

    this.save();
  }

  // Save to local storage
  save() {
    localStorage.setItem(GameStats.STORAGE_KEY, JSON.stringify(this.stats));
  }

  getModeStats() {
    return this.stats[this.mode] || {};
  }

  getAllStats() {
    return this.stats || {};
  }

  updateStat(key) {
    if (this.stats[this.mode]) {
      this.stats[this.mode][key] += 1;
      this.save();
    }
  }

  addHero(hero) {
    if (this.stats[this.mode]) {
      this.stats[this.mode].selectedHeroes.push(hero);
      this.save();
    }
  }

  addWin() {
    if (this.stats[this.mode]) {
      this.stats[this.mode].wins += 1;
      this.stats[this.mode].winStreak += 1;
      this.stats[this.mode].winToday = true;
      this.stats[this.mode].maxWinStreak = Math.max(
        this.stats[this.mode].winStreak,
        this.stats[this.mode].maxWinStreak
      );

      this.save();
    }
  }
}

export default GameStats;
