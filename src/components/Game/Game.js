import { Deck, Hand, Played } from "./GameComponents";
import { Chat } from "../Chat/chat";
import { WaitingRoom } from "../WaitingRoom/WaitingRoom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";

let socket;
let playerLocation;
let state;

export function Game({ players, newGame, serverUrl, numJugadores }) {
  const theme = useContext(ThemeContext);
  const username = useContext(UserContext);
  const [turn, setTurn] = useState(-2);
  const [playedCards, setPlayedCards] = useState({
    j0: null,
    j1: null,
    j2: null,
    j3: null,
  });
  const [playerNames, setPlayernames] = useState({});
  const [triunfo, setTriunfo] = useState(null);
  const [arrastre, setArrastre] = useState(false);
  const [hand, setHand] = useState(Array(6).fill(null));
  const [allowed, setAllowed] = useState(Array(6).fill(null));
  const [desconexion, setDesconexion] = useState(false);
  const [trumpWinner, setTrumpWinner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(`serverUrl ${serverUrl}`)
    // var str = `ws://${BACKEND_URL}/partida4/${username}`;
    var str = `ws://${serverUrl}`
    socket = new WebSocket(str);
    state = "Espera";

    socket.onopen = () => {
      console.log(`connected to ${str}`);
    };

    socket.onmessage = (m) => {
      // console.log(m.data)
      handleMenssage(
        players,
        m.data,
        setPlayernames,
        setHand,
        setAllowed,
        setTriunfo,
        setPlayedCards,
        setTurn,
        setDesconexion,
        setTrumpWinner,
        numJugadores
      );
    };

    socket.onclose = () => {
      console.log("Connection closed");
      state = "Desconexion";
    };

    // console.log(`NumJ ${numJugadores}`)
    // const aux = {}
    // for (var i = 0; i < numJugadores; i++) {
    //   aux[`j${i}`] = null;
    //   setPlayernames(aux); 
    // }
  }, [newGame]);

  if (desconexion === true) {
    state = "Espera";
    setDesconexion(false);
    navigate("/disconnect");
  }

  console.log(`Turno:${turn}`);
  console.log(`Loc:${playerLocation}`);
  console.log(`Estado: ${state}`);
  if (state === "Espera") {
    return <WaitingRoom players={playerNames}/>;
  }

  // if (state === "Desconexion") {
  //   state = "Espera"
  //   console.log("Redirecting...")
  //   return <Navigate replace to="/disconnect"/>
  // }
  return (
    <div className="grid h-screen grid-rows-[1fr_3fr_1fr] grid-cols-[1fr_2fr_1fr]">
      <Deck triunfo={triunfo} show={!arrastre} />
      <Played
        playedCards={playedCards}
        playerNames={playerNames}
        trumpWinner={trumpWinner}
      />
      <Hand
        hand={hand}
        myTurn={playerLocation === turn}
        allowed={allowed}
        onPlay={playCard}
      />
      <Chat/>
    </div>
  );
}

function handleMenssage(
  players,
  raw_message,
  setPlayernames,
  setHand,
  setAllowed,
  setTriunfo,
  setPlayedCards,
  setTurn,
  setDesconexion,
  setTrumpWinner, 
  numJugadores
) {
  let message;
  try {
    message = JSON.parse(raw_message);
  } catch {
    message = raw_message;
  }

  if (state === "Espera") {
    handleEspera(message, setPlayernames, numJugadores);
    return;
  }

  if (message["Desconexion"]) {
    handleDesconexion(setDesconexion);
    return;
  }

  if (message["Jugador"] !== undefined) {
    playerLocation = message["Jugador"];
    console.log(message["Jugador"]);
  }

  if (message["Ganador"] !== undefined) {
    setTrumpWinner(message["Ganador"]);
  }

  if (message === "Arrastre") {
    state = "Arrastre";
  }

  if (message["Cartas"] !== undefined) {
    setTrumpWinner(null)
    setHand(message["Cartas"]);

    if (state === "Nuevas") {
      setAllowed(message["Cartas"]);
    }
  } else if (message["Triunfo"] !== undefined) {
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
      setAllowed(message["Cartas Posibles"]);
    }
  }
  //TODO mensaje ganador baza
}

function playCard(card) {
  socket.send(card.join("-"));
}

function handleEspera(message, setPlayerNames, numJugadores) {
  console.log("Handler espera");
  if (message === "Comienza partida") {
    state = "Nuevas";
    return;
  }

  const playerNames = {};
  for (var i = 0; i < numJugadores; i++) {
    if (message[i] !== undefined && message[i] !== null) {
      console.log(i);
      playerNames[`j${i}`] = message[i];
    } else {
      playerNames[`j${i}`] = null;
    }
  }
  setPlayerNames(playerNames);
}

function handleDesconexion(setDesconexion) {
  console.log("Desconexion");
  state = "Desconexion";
  if (socket.readyState === WebSocket.OPEN) {
    socket.close();
  }
  setDesconexion(true);
  return;
}
