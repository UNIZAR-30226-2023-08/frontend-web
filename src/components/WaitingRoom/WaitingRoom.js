import { PlayerCard } from "../../components/Cards/PlayerCard";
export function WaitingRoom({ players, gameId }) {
  console.log(players);
  return (
    <div className="grid grid-rows-[1fr_9fr] h-screen">
      <p className="row-start-1 flex justify-center items-end sm:my-[3%] lg:mb-[-3vh] font-semibold lg:text-4xl sm:text-3xl text-neutral-600 dark:text-neutral-200">
        Esperando jugadores
      </p>
      <div className="row-start-2 flex w-screen h-fit lg:h-[80%] sm:mt-2 justify-evenly items-center shrink-0">
        {Object.values(players).map((player, i) => (
          <PlayerCard key={i} style={i} name={player} />
        ))}

        {/* {Object.keys(players).forEach((key) => {
          console.log(key)
          return <PlayerCard key={key} name={players[key]} />
        })} */}
      </div>
      
      <p className={gameId ? "row-start-3 flex justify-center items-end sm:my-[3%] lg:mb-[-3vh] font-semibold lg:text-4xl sm:text-3xl text-neutral-600 dark:text-neutral-200" : "hidden"}>
        ID de la partida: {gameId}
      </p>
    </div>
  );
}
