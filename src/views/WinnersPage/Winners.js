import { Link } from "react-router-dom";

export function Winners({ players, winners }) {
  const winnerNames = [];

  if (winners.constructor !== Array) {
    winnerNames = [players["j" + winners]]
  }

  for (var index in winners) {
    console.log("j" + index)
    winnerNames.push(players["j" + index]);
  }

  console.log(winnerNames, players, winners)

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      <p className="mb-12 dark:text-white mt-20 text-4xl font-bol text-center">{winnerNames.length > 1 ? "Ganadores" : "Ganador"}</p>
      <div className="flex w-screen items-center justify-center mb-20">
        {winnerNames.map((name) => (
          <p className="mx-12 text-2xl text-secondary-300 uppercase animate-pulse">{name}</p>
        ))}
      </div>
      <Link to="/">
        <button
          className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
        >
          Volver al menú
        </button>
      </Link>
    </div>
  );
}
