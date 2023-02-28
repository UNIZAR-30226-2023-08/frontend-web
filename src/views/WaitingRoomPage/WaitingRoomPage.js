import { PlayerCard } from "../../components/Cards/PlayerCard";

export function WaitingRoomPage() {
  const players = ["Alonso", "Sainz", "Ocon", "Gasly"];
  return (
    <div className="grid grid-rows-[1fr_9fr] h-screen">
      <p className="row-start-1 flex justify-center items-end sm:my-[3%] font-semibold text-xl text-neutral-600 dark:text-neutral-200">Esperando jugadores</p>
      <div className="row-start-2 flex w-screen h-fit lg:h-[80%] sm:mt-2 justify-evenly items-center shrink-0">
        {players.map((player, i) => (
          <PlayerCard name={player} />
        ))}
      </div>
    </div>
  );
}
