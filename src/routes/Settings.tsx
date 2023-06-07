import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SettingsInput from '../components/SettingsInput';
import type { Settings } from '../controlers/settings';
import { Difficulty, defaultSettings, loadSettings, saveSettings } from '../controlers/settings';

function Settings() {
  const [settings, setSettings] = useState(loadSettings());
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col justify-center items-center py-10">
      <h1 className="text-4xl sm:text-7xl text-white font-bold my-9">Settings</h1>

      <SettingsInput 
        text='player one name' 
        value={settings.firstPlayerName} 
        action={(event) => setSettings({...settings, firstPlayerName: event.target.value})} />
      <SettingsInput 
        text='player two name' 
        value={settings.secondPlayerName} 
        action={(event) => setSettings({...settings, secondPlayerName: event.target.value})} />
      <SettingsInput 
        text='bot name'
        value={settings.botName} 
        action={(event) => setSettings({...settings, botName: event.target.value})} />

      <div className="w-1/2 sm:w-1/4 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 my-4">
        <label className="block text-white text-lg font-bold mx-1">
          difficulty
        </label>
        <select 
          className="w-full shadow border rounded py-1 px-2 mx-1 text-cyan-200 focus:outline-none focus:shadow-outline bg-gray-700" 
          onChange={(event) => setSettings({...settings, botDifficulty: parseInt(event.target.value)})}
          value={settings.botDifficulty}>
          <option value={Difficulty.Dumb}>dumb</option>
          <option value={Difficulty.Normal}>normal</option>
          <option value={Difficulty.Hard}>hard</option>
        </select>
      </div>

      <div className="w-1/2 sm:w-1/4 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 mt-4">
        <button 
          className="p-2 my-2 sm:mx-2 text-lg sm:text-xl bg-cyan-200 rounded-md font-semibold hover:bg-cyan-100 transition-colors duration-300"
          onClick={() => saveSettings(settings)}>
          save
        </button>
        <button 
          className="p-2 my-2 sm:mx-2 text-lg sm:text-xl text-cyan-200 border-2 border-cyan-200 bg-transparent rounded-md font-semibold hover:border-cyan-100 hover:text-cyan-100 transition duration-300"
          onClick={() => {
            saveSettings(defaultSettings);
            setSettings({...defaultSettings});
          }}>
          defaults
        </button>
      </div>
      <div className="w-1/2 sm:w-1/4 my-2">
        <button 
          className="w-full p-2 text-lg sm:text-xl text-red-400 border-2 border-red-400 bg-transparent rounded-md font-semibold hover:border-red-500 hover:text-red-500 transition-colors duration-300"
          onClick={() => navigate('/')}>
          back to menu
        </button>
      </div>
    </div>
  ); 
}

export default Settings;
export { defaultSettings };