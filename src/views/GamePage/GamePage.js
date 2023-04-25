import { Deck, Hand, Played } from "../../components/Game/Game";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL, PLAYER_POS } from "../../config"

let socket;
let playerLocation;

export function GamePage() {
  const theme = useContext(ThemeContext);
  const username = useContext(UserContext);
  const [turn, setTurn] = useState(-2);
  const [playedCards, setPlayedCards] = useState({
    j0: "copa5",
    j1: "copa1",
    j2: "basto2",
    j3: "oro1",
  });
  const [playerNames, setPlayernames] = useState({
    j0: "Pedro",
    j1: "Juan",
    j2: "Pepe",
    j3: "Miguel",
  });
  const [triunfo, setTriunfo] = useState("1bastos");
  const [arrastre, setArrastre] = useState(false);
  const [hand, setHand] = useState(Array(6).fill(null));

  useEffect(() => {
    var str = `ws://${BACKEND_URL}/socket/1/${username}`;
    socket = new WebSocket(str);

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
      <Deck triunfo={triunfo} show={!arrastre} />
      <Played playedCards={playedCards} playerNames={playerNames} />
      <Hand hand={hand} myTurn={playerLocation === turn} onPlay={playCard} />
    </div>
  );
}

function handleMenssage(
  raw_message,
  setHand,
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

  if (message["Jugador"] !== undefined) {
    playerLocation = message["Jugador"];
    console.log(message["Jugador"]);
  }

  if (message["Cartas"] !== undefined) {
    console.log("cartas");
    console.log(message["Cartas"]);
    setHand(message["Cartas"]);

  } else if (message === "espera") {
    console.log("espera");
  
  } else if (message["Triunfo"] !== undefined) {
    console.log("mesa");
    console.log(message);
    setTriunfo(message["Triunfo"].join(""));
    setTurn(message["Turno"]);

    let played = {"j0" : null, "j1": null, "j2" : null, "j3" : null};
    for (var i = 0; i < 4; i++) {
      if (message[i] !== undefined && message[i] !== null) {
        console.log(i)
        played[`j${i}`] = message[i].join("");
      }
    }

    setPlayedCards(played);
  }
}

function playCard(card) {
  console.log(`N: ${card.join("-")} ${playerLocation} `);
  socket.send(`N: ${card.join("-")} ${playerLocation} `);
  console.log("ok");
}
