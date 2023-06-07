interface Props {
  text: string;
  action: () => void;
}
  
function PrettyButton(props: Props) {
  return (
    <button onClick={props.action} className="mt-5 p-2 text-lg sm:text-2xl bg-cyan-200 rounded-md font-semibold hover:bg-cyan-100 transition-colors duration-300">{props.text}</button>
  );
}

export default PrettyButton;