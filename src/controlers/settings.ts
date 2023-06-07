interface Settings {
  firstPlayerName: string;
  secondPlayerName: string;
  botName: string;
  botDifficulty: Difficulty;
}
  
enum Difficulty {
  Dumb,
  Normal,
  Hard
}
  
const defaultSettings: Settings = {
  firstPlayerName: 'player one',
  secondPlayerName: 'player two',
  botName: 'player',
  botDifficulty: Difficulty.Normal
};

function loadSettings(): Settings {
  const dataString = localStorage.getItem("settings");
  
  if (dataString === null) {
    return defaultSettings;
  }
  
  try {
    return JSON.parse(dataString) ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
}
  
function saveSettings(settings: Settings) {
  localStorage.setItem("settings", JSON.stringify(settings));
}

export type { Settings };
export { Difficulty, defaultSettings, loadSettings, saveSettings}