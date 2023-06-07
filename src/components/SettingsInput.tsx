interface Props {
  text: string;
  value: string;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
} 

function SettingsInput(props: Props) {
  return (
    <div className="w-1/2 sm:w-1/4 grid grid-rows-2 sm:grid-rows-1 sm:grid-cols-2 my-4">
      <label className="block text-white text-lg font-bold mx-1 w-full">
        {props.text}
      </label>
      <input 
        className="w-full shadow border rounded py-1 px-2 mx-1 text-cyan-200 focus:outline-none focus:shadow-outline bg-gray-700" 
        type="text"
        onChange={(event) => props.action(event)}
        value={props.value}/>
    </div>
  );
}

export default SettingsInput;