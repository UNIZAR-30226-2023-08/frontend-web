import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export function HandCard({ value, selected, onSelect }) {
  const theme = useContext(ThemeContext);
  let src = "";

  if (value != null) {
    src = theme[value.join("")];
  }

  return (
    <img
      className={`${
        selected && "m-[-1px] border-4 border-secondary-400"
      } bg-transparent transition ease-in hover:-translate-y-1 hover:scale-125 duration-300 sm:max-h-[160px] lg:max-h-[180px]`}
      onClick={() => onSelect(value)}
      src={src}
    ></img>
  );
}

export function Hand({ hand, onPlay, myTurn = false }) {
  // const [hand, setHand] = useState(['1oros', '3oros', '5copas', '3espadas', '10espadas', '4bastos']);
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
        onClick={
          () => onPlay(selected)
          // () =>
          // setTimeout(() => {
          //   alert(JSON.stringify(selected, null, 2));
          // }, 400)
        }
        className={`ml-5 bg-primary-500 text-neutral-100 font-bold py-2 px-4 rounded-full ${
          !(selected && myTurn) &&
          "opacity-50 cursor-not-allowed  hover:bg-primary-700"
        }`}
        disabled={!(selected && myTurn)}
      >
        Jugar
      </button>
    </div>
  );
}

export function Played({ playedCards, playerNames }) {
  console.log(playedCards);
  function placeCard(key) {
    switch (key) {
      case "j0":
        return "row-start-3 row-end-3 col-start-2 col-end-2 flex-col";
      case "j1":
        return "row-start-2 row-end-2 col-start-3 col-end-3 -rotate-90 lg:flex-col";
      case "j2":
        return "row-start-1 row-end-1 col-start-2 col-end-2 flex-col";
      case "j3":
        return "row-start-2 row-end-2 col-start-1 col-end-1 rotate-90 flex-row-reverse lg:flex-col";
    }
  }

  function placeName(key) {
    switch (key) {
      case "j0":
        return "pt-[20px]";
      case "j1":
        return "rotate-90 lg:pl-[100px]";
      case "j2":
        return "-order-1 pb-[20px]";
      case "j3":
        return "-rotate-90 lg:pr-[100px]";
    }
  }

  const theme = useContext(ThemeContext);
  const cards = Object.keys(playedCards).map((key) => (
    <div
      key={key}
      className={`flex justify-center items-center ${placeCard(key)}`}
    >
      <img
        className="sm:max-h-[180px] lg:max-h-[200px]"
        src={theme[playedCards[key]]}
      ></img>
      <p className={`font-bold text-xl text-primary-400 ${placeName(key)}`}>{playerNames[key]}</p>
    </div>
  ));

  return (
    <div className="grid grid-rows-3 grid-cols-3 col-start-2 col-end-2 row-start-2">
      {cards}
    </div>
  ); //TODO refactor
}

export function Deck({ triunfo, show }) {
  const theme = useContext(ThemeContext);
  return (
    <div className={show ? "flex justify-center items-center xs:row-start-2 mt-4 lg:mt-0 lg:row-start-2" : "hidden"}>
      <img
        className="sm:max-h-[150px] lg:max-h-[200px]"
        src={theme.dorso}
      ></img>
      <img
        className="sm:max-h-[150px] lg:max-h-[200px] rotate-90 overflow-hidden ml-[-3em] -z-10"
        src={theme[triunfo]}
      ></img>
    </div>
  );
}
