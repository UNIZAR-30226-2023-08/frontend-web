import {
  Deck,
  Hand,
  Played,
  Played2Players,
  Played3Players,
} from "./GameComponents";
import { Chat } from "../Chat/chat";
import { WaitingRoom } from "../WaitingRoom/WaitingRoom";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { useNavigate } from "react-router";
import { BACKEND_URL, CHAT_ENDPOINT } from "../../config";

let socket;
let playerLocation;
let state;

export function Game({ newGame, serverUrl, numJugadores, gameId,
   setDisconnectMsg, username, setWinners, playerNames, setPlayernames }) {
  const theme = useContext(ThemeContext);
  // const username = useContext(UserContext);
  const [chatUrl, setChatUrl] = useState(null);
  const [turn, setTurn] = useState(-2);
  const [playedCards, setPlayedCards] = useState({
    j0: null,
    j1: null,
    j2: null,
    j3: null,
  });
  const [triunfo, setTriunfo] = useState(null);
  const [arrastre, setArrastre] = useState(false);
  const [hand, setHand] = useState(Array(6).fill(null));
  const [allowed, setAllowed] = useState(Array(6).fill(null));
  const [desconexion, setDesconexion] = useState(false);
  const [trumpWinner, setTrumpWinner] = useState(null);
  const [cambiar7Permitido, setCambiar7Permitido] = useState(false);
  const [mensajeCanta, setMensajeCanta] = useState(null);
  const navigate = useNavigate();

  const [msgH, setMsgH] = useState([]);

  useEffect(() => {
    console.log(`serverUrl ${serverUrl}`);
    // var str = `ws://${BACKEND_URL}/partida4/${username}`;
    var str = `ws://${serverUrl}`;
    socket = new WebSocket(str);
    state = "Espera";
    console.log("Esperando");

    socket.onopen = () => {
      console.log(`GAME WS: connected to ${str}`);
    };

    socket.onmessage = (m) => {
      console.log(m.data);
      handleMenssage(
        playerNames,
        m.data,
        setPlayernames,
        setHand,
        setAllowed,
        setTriunfo,
        setPlayedCards,
        setTurn,
        setDesconexion,
        setTrumpWinner,
        setChatUrl,
        setDisconnectMsg,
        navigate,
        username,
        numJugadores,
        setWinners,
        setMensajeCanta
      );
    };

    socket.onclose = () => {
      console.log("Connection closed");
      // state = "Desconexion";
    };
  }, [newGame]);


  if (desconexion === true) {
    state = "Espera";
    setDesconexion(false);
    setDisconnectMsg("Partida abortada: jugador desconectado");
    navigate("/disconnect");
  }

  console.log(`Turno:${turn}`);
  console.log(`Loc:${playerLocation}`);
  console.log(`Estado: ${state}`);
  if (state === "Espera") {
    return <WaitingRoom players={playerNames} gameId={gameId} />;
  }

    return (
      <div className="grid h-screen grid-rows-[1fr_3fr_1fr] grid-cols-[1fr 1fr 1fr 1fr]">
        <Deck triunfo={triunfo} show={!arrastre} />
        <Played
          playedCards={playedCards}
          playerNames={playerNames}
          trumpWinner={trumpWinner}
          mensajeCanta={mensajeCanta}
          setMensajeCanta={setMensajeCanta}
        />
        <Hand
          hand={hand}
          myTurn={playerLocation === turn}
          allowed={allowed}
          onPlay={playCard}
          cambiar7Permitido={cambiar7Permitido}
          onChange7={change7}
        />
        <Chat url={chatUrl} msgHistory={msgH} setMsgHistory={setMsgH} username={username}/>
      </div>
    );
}

function handleMenssage(
  playerNames,
  raw_message,
  setPlayernames,
  setHand,
  setAllowed,
  setTriunfo,
  setPlayedCards,
  setTurn,
  setDesconexion,
  setTrumpWinner,
  setChatUrl,
  setDisconnectMsg,
  navigate,
  username,
  numJugadores,
  setWinners,
  setMensajeCanta
) {
  let message;
  try {
    message = JSON.parse(raw_message);
  } catch {
    message = raw_message;
  }

  if (state === "Espera") {
    handleEspera(message, setPlayernames, numJugadores, setDisconnectMsg, navigate);
    return;
  }

  if (message["Desconexion"]) {
    handleDesconexion(setDesconexion);
    return;
  }

  if (message["chat"]) {
    setChatUrl(BACKEND_URL + CHAT_ENDPOINT + message["chat"] + "/" + username);
    return;
  }

  if(message["Ganador Partida"] === null) {
    state = "Vueltas"
  } else if (message["Ganador Partida"] !== undefined){ 
    console.log("Winners")
    setWinners([0]) // TODO comprobar que viene un array
    navigate("/winners")
  }

  if (message["Jugador"] !== undefined && message["Canta"] === undefined) {
    playerLocation = message["Jugador"];
    console.log(message["Jugador"]);
  }

  if (message["Ganador"] !== undefined) {
    setTrumpWinner(message["Ganador"]);
  }

  if (message["Canta"] !== undefined && ["20", "40"].includes(message["Canta"]) && ["oro", "basto", "espada", "copa"].includes(message["Palo"]) && [0, 1, 2, 3].includes(message["Jugador"])) {
    setMensajeCanta("canta " + message["Canta"] + " en " + message["Palo"] + "s")
  }

  if (message === "Arrastre") {
    state = "Arrastre";
  }

  if (message["Cambiar7"] !== undefined && message["Cambiar7"] === true) {
      console.log("Cambiar7 message received with value true");
      setCambiar7Permitido(true);
      return
    }
    
    if (message["Cambiado"] !== undefined && [1, 2, 3, 4].includes(message["Cambiado"])) {
      setCambiar7Permitido(false);
      console.log("Cambiado message received with value " + message["Cambiado"]);
      return;
      }

  if (message["Cartas"] !== undefined) {
    console.log("Cartas " + state);
    setTrumpWinner(null);
    setHand(message["Cartas"]);

    if (state === "Nuevas" || state === "Vueltas") {
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

function change7(){
  socket.send("True");
}

function handleEspera(message, setPlayerNames, numJugadores, setDisconnectMsg, navigate) {
  console.log("Handler espera");
  if (message === "Partida Llena.") {
    console.log("Partida llena")
    setDisconnectMsg("Partida llena, no se admiten más jugadores")
    navigate("/disconnect")
    return;
  }

  if (message === "Partida no encontrada.") {
    console.log("Partida no encontrada")
    setDisconnectMsg("Partida no encontrada ¿Has especificado el número de jugadores correcto?")
    navigate("/disconnect")
    return;
  }

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
