import { Deck, Hand, Played } from "../../components/Game/Game";
import { useState, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";

let socket;

export function GamePage() {
  const theme = useContext(ThemeContext)
  const username = useContext(UserContext)
  const [location, setLocation] = useState(-1)
  const [turn, setTurn] = useState(-2)
  const [playedCards, setPlayedCards] = useState({
    j0: "5copas",
    j1: "1copas",
    j2: "2bastos",
    j3: "2espadas",
  });
  const [triunfo, setTriunfo] = useState("1bastos");
  const [hand, setHand] = useState(Array(6).fill(null))
  
  useEffect(() => {
    var str = `ws://localhost:8000/partidaX/${username}`
    socket = new WebSocket(str)

    socket.onopen = () => {
      socket.send(`${username} entra`)
      console.log('ok')
    }

    socket.onmessage = (m) => {
      // console.log(m.data)
      handleMenssage(m.data, setHand, setTriunfo, setPlayedCards, setLocation, setTurn)
    }

    socket.onclose = () => {
      console.log('Connection closed')
    }
  }, [])


  function playCard(card) {
    console.log(card.join(""))
    console.log(socket)
    // socket.send(`N: ${card.join("-")}`)
  }

  console.log(`Turno:${turn}`)
  console.log(`Loc:${location}`)
  return (
    <div className="grid h-screen grid-rows-[1fr_3fr_1fr] grid-cols-[1fr_2fr_1fr]">
      <Deck triunfo={triunfo} />
      <Played playedCards={playedCards} />
      <Hand hand={hand} myTurn={location === turn} onPlay={playCard}/>
    </div>
  );
}


function handleMenssage(raw_message, setHand, setTriunfo, setPlayedCards, setLocation, setTurn) {
  let message;
  try {
    message = JSON.parse(raw_message)
  } catch {
    message = raw_message
  }

  if(message['Jugador'] != undefined) {
    setLocation(message['Jugador'])
    console.log(message['Jugador'])
  }

  if (message['Cartas'] != undefined) {
    console.log('cartas')
    console.log(message['Cartas'])
    setHand(message['Cartas'])

  } else if (message === 'espera') {
    console.log('espera')

  } else if (message['Triunfo'] != undefined) {
    console.log('mesa')
    console.log(message)
    setTriunfo(message['Triunfo'].join(""))
    setTurn(message['Turno'])

    for (var i = 0; i < 4; i++) {
      if (message[i] != null) {
        message[i].join("")
      }
    }

    setPlayedCards({
      j0: message['0'],
      j1: message['1'],
      j2: message['2'],
      j3: message['3'],
    })
  }
}

function playCard(card) {
  console.log(card)
}