import { Deck, Hand, Played } from "../../components/Game/Game";
import { useState, useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";


export function GamePage() {
  const theme = useContext(ThemeContext)
  const [playedCards, setPlayedCards] = useState({
    j1: "c1",
    j2: "c2",
    j3: "c3",
    j4: "c4",
  });
  const [triunfo, setTriunfo] = useState("copeta");
  console.log(theme)

  return (
    <div className="table">
      <Deck triunfo={triunfo} />
      <Played playedCards={playedCards} />
      <Hand />
    </div>
  );
}
