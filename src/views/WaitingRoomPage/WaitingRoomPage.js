import { useState } from "react";
import { PlayerCard } from "../../components/Cards/PlayerCard";

export function WaitingRoomPage({ roomSize=4 }) {
  // const [players, setPlayers] = useState (Array(4).fill(null));
  const [players, setPlayers] = useState (['Alonso', 'Sainz', null, null]);

  return (
    <div className="grid grid-rows-[1fr_9fr] h-screen">
      <p className="row-start-1 flex justify-center items-end sm:my-[3%] lg:mb-[-3vh] font-semibold lg:text-4xl sm:text-3xl text-neutral-600 dark:text-neutral-200">Esperando jugadores</p>
      <div className="row-start-2 flex w-screen h-fit lg:h-[80%] sm:mt-2 justify-evenly items-center shrink-0">
        {players.map((player, i) => (
          <PlayerCard key={i} name={player} />
        ))}
      </div>
    </div>
  );
}
