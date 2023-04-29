import { Deck, Hand, Played3Players } from "../../components/Game/Game";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL, PLAYER_POS } from "../../config";

let socket;
let playerLocation;
let state;

export function GamePage3P() {
  const theme = useContext(ThemeContext);
  const username = useContext(UserContext);
  const [turn, setTurn] = useState(-2);
  const [playedCards, setPlayedCards] = useState({
    j0: "copa5",
    j1: "copa1",
    j2: "basto5",
  });
  const [playerNames, setPlayernames] = useState({
    j0: "Amigas",
    j1: "ALO",
    j2: "#33",
  });
  const [triunfo, setTriunfo] = useState("1bastos");
  const [arrastre, setArrastre] = useState(false);
  const [hand, setHand] = useState(Array(6).fill(null));
  const [allowed, setAllowed] = useState(Array(6).fill(null));

  useEffect(() => {
    var str = `ws://${BACKEND_URL}/partida3/${username}`;
    socket = new WebSocket(str);
    state = "Nuevas";

    socket.onopen = () => {
      console.log(`connected to ${str}`);
    };

    socket.onmessage = (m) => {
      // console.log(m.data)
      handleMenssage(m.data, setHand, setTriunfo, setPlayedCards, setTurn);
    };

    socket.onclose = () => {
      console.log("Connection closed");
    };
  }, []);

  console.log(`Turno:${turn}`);
  console.log(`Loc:${playerLocation}`);
  return (
    <div className="grid h-screen grid-rows-[1fr_3fr_1fr] grid-cols-[1fr_2fr_1fr]">
      <Played3Players playedCards={playedCards} playerNames={playerNames} />
      <Deck triunfo={triunfo} show={!arrastre} />
      <Hand
        hand={hand}
        myTurn={playerLocation === turn}
        allowed={allowed}
        onPlay={playCard}
      />
    </div>
  );
}

function handleMenssage(
  raw_message,
  setHand,
  setAllowed,
  setTriunfo,
  setPlayedCards,
  setTurn
) {
  let message;
  try {
    message = JSON.parse(raw_message);
  } catch {
    message = raw_message;
  }

  //TODO GANADOR BAZA

  if (message["Jugador"] !== undefined) {
    playerLocation = message["Jugador"];
    console.log(message["Jugador"]);
  }

  if (message["Cartas"] !== undefined) {
    setHand(message["Cartas"]);
    if(state === "Nuevas"){
      console.log("allowed: all");
      setAllowed(message["Cartas"]);
    }
  } else if (message["Triunfo"] !== undefined) {
    console.log("mesa");
    console.log(message);

    if (message["Triunfo"] !== null) {
      setTriunfo(message["Triunfo"].join(""));
    } else {
      setTriunfo(null);
    }
    setTurn(message["Turno"]);

    let played = { j0: null, j1: null, j2: null };
    for (var i = 0; i < 3; i++) {
      if (message[i] !== undefined && message[i] !== null) {
        played[`j${i}`] = message[i].join("");
      }
    }
    setPlayedCards(played);
  } else if(message["Cartas Posibles"] !== undefined){
    if (state === "Arrastre") {
      console.log(`allowed: ${message["Cartas Posibles"]}`)
      setAllowed(message["Cartas Posibles"]);
    }
  } else if (message === "Arrastre") {
    state = "Arrastre";
  }
}
  function playCard(card) {
    socket.send(card.join("-"));
  }
  
