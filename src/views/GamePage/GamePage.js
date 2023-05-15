import { Game } from "../../components/Game/Game";

export function GamePage({
  url,
  newGame,
  numJugadores,
  gameId,
  setDisconnectMsg,
  username,
  setWinners,
  setPlayernames,
  playerNames
}) {
  return (
    <Game
      newGame={newGame}
      serverUrl={url}
      gameId={gameId}
      numJugadores={numJugadores}
      setDisconnectMsg={setDisconnectMsg}
      username={username}
      setWinners={setWinners}
      setPlayernames={setPlayernames}
      playerNames={playerNames}
    />
  );
}
