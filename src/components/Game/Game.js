import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import "./Game.css";

export function HandCard({ value, selected, onSelect }) {
  const theme = useContext(ThemeContext)
  return (
    <img
      className={`${
        selected && "m-[-1px] border-4 border-secondary-400"
      } bg-transparent transition ease-in hover:-translate-y-1 hover:scale-125 duration-300 sm:max-h-[160px] lg:max-h-[200px]`}
      onClick={() => onSelect(value)}
      src={theme[value]}
    ></img>
  );
}

export function Hand({ myTurn=false }) {
  const [hand, setHand] = useState(['1oros', '3oros', '5copas', '3espadas', '10espadas', '4bastos']);
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex justify-center items-end m-3 col-start-1 col-end-4 row-start-3">
      {hand.map((card, index) => {
        return (
          <HandCard
            key={index}
            selected={card === selected}
            value={card}
            onSelect={() => setSelected(card)}
          />
        );
      })}
      <button
        onClick={() =>
          setTimeout(() => {
            alert(JSON.stringify(selected, null, 2));
          }, 400)
        }
        className={`ml-5 bg-primary-500 text-neutral-100 font-bold py-2 px-4 rounded-full ${!(selected && myTurn) && 'opacity-50 cursor-not-allowed  hover:bg-primary-700'}`}
        >
        Jugar
      </button>
    </div>
  );
}

export function Played({ playedCards }) {
  let classname = "played-card played-card-";
  const img = Object.keys(playedCards).map((key, index) => (
    <div key={key} className={classname + key}>
      <img
        // className={classname + key}
        src={"https://via.placeholder.com/120x150?text=" + playedCards[key]}
      ></img>
    </div>
  ));

  return <div className="played-container">{img}</div>; //TODO refactor
}

export function Deck({ triunfo }) {
  return (
    <div className="deck-container">
      <img src={"https://via.placeholder.com/120x150/ffdfba?text=Deck"}></img>
      <img
        className="triunfo"
        src={"https://via.placeholder.com/120x150/ffb3ba?text=" + triunfo}
      ></img>
    </div>
  );
}
