import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Game } from "../../components/Game/Game";

export function GamePage({url, newGame, numJugadores}) {
  return <Game newGame={newGame} serverUrl={url} numJugadores={numJugadores}/>
}