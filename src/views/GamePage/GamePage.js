import { Deck, Hand, Played } from "../../components/Game/Game";
import { WaitingRoom } from "../../components/WaitingRoom/WaitingRoom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL } from "../../config";
import { Navigate } from "react-router";
import { useForceUpdate } from "../../utils/hooks"

let socket;
let playerLocation;
let state;

export function GamePage() {
  const theme = useContext(ThemeContext);
  const [basura, setBasura] = useState(false);
  const username = useContext(UserContext);
  const [turn, setTurn] = useState(-2);
  const [playedCards, setPlayedCards] = useState({
    j0: null,
    j1: null,
    j2: null,
    j3: null,
  });
  const [playerNames, setPlayernames] = useState({
    j0: null,
    j1: null,
    j2: null,
    j3: null,
  });
  const [triunfo, setTriunfo] = useState(null);
  const [arrastre, setArrastre] = useState(false);
  const [hand, setHand] = useState(Array(6).fill(null));
  const [allowed, setAllowed] = useState(Array(6).fill(null));

  useEffect(() => {
    var str = `ws://${BACKEND_URL}/partida2/${username}`;
    socket = new WebSocket(str);
    state = "Espera";

    socket.onopen = () => {
      console.log(`connected to ${str}`);
    };

    socket.onmessage = (m) => {
      // console.log(m.data)
      handleMenssage(
        m.data,
        setPlayernames,
        setHand,
        setAllowed,
        setTriunfo,
        setPlayedCards,
        setTurn,
        setBasura
      );
    };

    socket.onclose = () => {
      console.log("Connection closed");
      state = "Desconexion"
    };
  }, []);

  console.log(`Turno:${turn}`);
  console.log(`Loc:${playerLocation}`);
  console.log(`Estado: ${state}`)
  if (state === "Espera") {
    return <WaitingRoom players={playerNames}></WaitingRoom>;
  }

  if (state === "Desconexion") {
    state = "Espera"
    console.log(`LastState ${state}`)
    return <Navigate replace to="/disconnect"/>
  }
  return (
    <div className="grid h-screen grid-rows-[1fr_3fr_1fr] grid-cols-[1fr_2fr_1fr]">
      <Deck triunfo={triunfo} show={!arrastre} />
      <Played playedCards={playedCards} playerNames={playerNames} />
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
  setPlayernames,
  setHand,
  setAllowed,
  setTriunfo,
  setPlayedCards,
  setTurn,
  setBasura
) {
  let message;
  try {
    message = JSON.parse(raw_message);
  } catch {
    message = raw_message;
  }

  //TODO mensaje ganador baza

  if (state === "Espera") {
    handleEspera(message, setPlayernames);
    return;
  }

  if (message["Desconexion"]) {
    console.log("Desconexion");
    state = "Desconexion";
    setBasura(true)
    return;
  }

  if (message["Jugador"] !== undefined) {
    playerLocation = message["Jugador"];
    console.log(message["Jugador"]);
  }

  if (message["Cartas"] !== undefined) {
    setHand(message["Cartas"]);

    if (state === "Nuevas") {
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

    let played = { j0: null, j1: null, j2: null, j3: null };
    for (var i = 0; i < 4; i++) {
      if (message[i] !== undefined && message[i] !== null) {
        played[`j${i}`] = message[i].join("");
      }
    }
    setPlayedCards(played);
  } else if (message["Cartas Posibles"] !== undefined) {
    if (state === "Arrastre") {
      console.log(`allowed: ${message["Cartas Posibles"]}`);
      setAllowed(message["Cartas Posibles"]);
    }
  } else if (message === "Arrastre") {
    state = "Arrastre";
  }
}

function playCard(card) {
  socket.send(card.join("-"));
}

function handleEspera(message, setPlayerNames) {
  console.log("Handler espera")
  if (message === "Comienza partida") {
    state = "Nuevas";
    return;
  }

  let playerNames = { j0: null, j1: null, j2: null, j3: null };
  for (var i = 0; i < 4; i++) {
    if (message[i] !== undefined && message[i] !== null) {
      console.log(i);
      playerNames[`j${i}`] = message[i];
    }
  }
  setPlayerNames(playerNames);
  console.log(playerNames);
}
