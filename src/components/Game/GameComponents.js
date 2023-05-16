import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";


export function HandCard({ value, selected, allowed, onSelect }) {
  const theme = useContext(ThemeContext);
  let src = "";

  if (value != null) {
    src = theme[value.join("")];
  }

  return (
    <img
      className={`${selected && "m-[-1px] border-4 border-secondary-400"} ${
        allowed ? "opacity-100" : "opacity-20 hover:cursor-not-allowed"
      } bg-transparent transition ease-in hover:-translate-y-1 hover:scale-125 duration-300 sm:max-h-[160px] lg:max-h-[180px]`}
      onClick={() => onSelect(value)}
      src={src}
    ></img>
  );
}

export function Hand({ hand, onPlay, allowed, myTurn = false, cambiar7Permitido, onChange7}) {
  // const [hand, setHand] = useState(['1oros', '3oros', '5copas', '3espadas', '10espadas', '4bastos']);
  const [selected, setSelected] = useState(null);

  let allowed_aux = allowed.map((item) =>
    item !== null ? item.join("") : null
  );

  console.log(hand);
  console.log(allowed);
  console.log(allowed_aux);

  return (
    <div className="flex justify-center items-end m-3 col-start-1 col-end-4 row-start-3">
      {hand.map((card, index) => {
        let card_allowed = card && allowed_aux.includes(card.join(""));
        return card !== null ? (
          <HandCard
            key={index}
            selected={card === selected}
            allowed={card_allowed}
            value={card}
            onSelect={card_allowed ? () => setSelected(card) : () => {}}
          />
        ) : null;
      })}
      <button
        onClick={() => onPlay(selected)}
        className={`ml-5 bg-primary-500 text-neutral-100 font-bold py-2 px-4 rounded-full
         ${!(selected && myTurn) && "opacity-50 cursor-not-allowed  hover:bg-primary-700"
        } ${myTurn && "border-secondary-300 border-4"}`}
        disabled={!(selected && myTurn)}
      >
        Jugar
      </button>
      <button
        onClick={() => onChange7()}
        className={`ml-5 bg-primary-500 text-neutral-100 font-bold py-2 px-4 rounded-full ${
          !(cambiar7Permitido) &&
          "opacity-50 cursor-not-allowed  hover:bg-primary-700"
        }`}
        disabled={!(cambiar7Permitido)}
      >
        Cambiar 7
      </button>
    </div>
  );
}

export function Played({ playedCards, playerNames, trumpWinner, mensajeCantar }) {
  console.log(`TW: ${trumpWinner}`)
  function placeCard(key) {
    switch (key) {
      case "j0":
        return "row-start-3 row-end-3 col-start-2 col-end-2 flex-col"
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
      <p className={`font-bold text-xl text-primary-400 ${placeName(key)}`}>
        {playerNames[key]}
      </p>
    </div>
  ));

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (trumpWinner !== null) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [trumpWinner]);

  const[showAlertCanta, setShowAlertCanta] = useState(false);
  const [nuevoMensajeCantar, setNuevoMensajeCantar] = useState("");  
  
  useEffect(() => {
    if(mensajeCantar !== ""){
      setShowAlertCanta(true);const jugadores = [0, 1, 2, 3];

      // Variable para almacenar el nuevo mensaje
      let nuevoMensajeCantar = mensajeCantar;
      
      // Iteramos sobre cada número de jugador y realizamos la sustitución
      for (let i = 0; i < jugadores.length; i++) {
        const jugadorActual = jugadores[i];
        // Verificamos si el número de jugador está presente en la cadena
        if (nuevoMensajeCantar.includes("jugador " + jugadorActual)) {
          nuevoMensajeCantar = nuevoMensajeCantar.replace(
            "jugador " + jugadorActual,
            playerNames["j" + trumpWinner]
          );   
          // Salimos del bucle una vez que se ha realizado la sustitución
          break;
        }
      }
      // Actualizamos el estado con el nuevo mensaje
      setNuevoMensajeCantar(nuevoMensajeCantar);
      setTimeout(() => {
        setShowAlertCanta(false);
      }, 3000);
    }
  }, [mensajeCantar]);
  

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 col-start-2 col-end-2 row-start-2">
        {cards}
      </div>
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg p-4">
          <p className="text-lg font-semibold">
            {playerNames["j" + trumpWinner]} ganó la baza.
          </p>
        </div>
       )}
      {showAlertCanta && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg p-4">
          <p className="text-lg font-semibold">
           {nuevoMensajeCantar} y {playerNames["j" + trumpWinner]} ganó la baza.
          </p>
        </div>
      )}
    </>
  ); 
}

export function Deck({ triunfo, show }) {
  const theme = useContext(ThemeContext);
  return (
    <div
      className={
        show
          ? "flex justify-center items-center xs:row-start-2 mt-4 lg:mt-0 lg:row-start-2"
          : "hidden"
      }
    >
      <img
        className={`sm:max-h-[150px] lg:max-h-[200px] ${triunfo || "hidden"}`}
        src={theme.dorso}
      ></img>
      <img
        className="sm:max-h-[150px] lg:max-h-[200px] rotate-90 overflow-hidden ml-[-3em] -z-10"
        src={theme[triunfo]}
      ></img>
    </div>
  );
}

export function Played2Players({ playedCards, playerNames, trumpWinner }) {
  console.log(playedCards);
  function placeCard(key) {
    switch (key) {
      case "j0":
        return "row-start-3 row-end-3 col-start-2 col-end-2 flex-col";
      case "j1":
        return "row-start-1 row-end-1 col-start-2 col-end-2 flex-col";
      default:
        return "flex-col";
    }
  }

  function placeName(key) {
    switch (key) {
      case "j0":
        return "pt-[20px]";
      case "j1":
        return "-order-1 pb-[20px]";
      default:
        return "";
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
      <p className={`font-bold text-xl text-primary-400 ${placeName(key)}`}>
        {playerNames[key]}
      </p>
    </div>
  ));

  const [showAlert, setShowAlert] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (trumpWinner !== "") {
      setCount((prevCount) => prevCount + 1); 
      if (count % 2 !== 1) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    }
  }, [trumpWinner]);
  

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 col-start-2 col-end-2 row-start-2">
        {cards}
      </div>
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg p-4">
        <p className="text-lg font-semibold">
          Ganador de la baza: {trumpWinner}</p>
        </div>
       )}
    </>
  );
}

export function Played3Players({ playedCards, playerNames, trumpWinner}) {
  console.log(playedCards);
  function placeCard(key) {
    switch (key) {
      case "j0":
        return "row-start-3 row-end-3 col-start-2 col-end-2 flex-col";
      case "j1":
        return "row-start-2 row-end-2 col-start-3 col-end-3 -rotate-90 lg:flex-col";
      case "j2":
        return "row-start-1 row-end-1 col-start-2 col-end-2 flex-col";
      default:
        return "flex-col";
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
      default:
        return "";
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
      <p className={`font-bold text-xl text-primary-400 ${placeName(key)}`}>
        {playerNames[key]}
      </p>
    </div>
  ));

  const [showAlert, setShowAlert] = useState(false);
  useEffect(() => {
    if (trumpWinner !== "") {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [trumpWinner]);
  

  return (
    <>
      <div className="grid grid-rows-3 grid-cols-3 col-start-2 col-end-2 row-start-2">
        {cards}
      </div>
      {showAlert && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white rounded-lg p-4">
        <p className="text-lg font-semibold">
          Ganador de la baza: {trumpWinner}</p>
        </div>
       )}
    </>
  );
}
