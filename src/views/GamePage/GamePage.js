import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Game } from "../../components/Game/Game";

export function GamePage() {
  const state = useLocation();
  console.log(`LocationState = ${state}`)
  return <Game newGame={true} />
}