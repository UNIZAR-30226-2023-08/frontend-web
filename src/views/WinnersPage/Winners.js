import { useState } from "react";
import { PlayerCard } from "../../components/Cards/PlayerCard";
import { Link } from "react-router-dom";

export function Winners({ roomSize=4 }) {
  const [players, setPlayers] = useState(['Alonso', 'Sainz', null, null]);
  const points = 33; // El número de puntos obtenidos en la victoria

  return (
    <div className="grid grid-rows-[2fr_5fr_2fr] h-screen">
      <div className="row-start-1 ">
      <p className="flex justify-center items-end sm:my-[1.5%] lg:mb-[-1.5vh] font-semibold lg:text-4xl sm:text-3xl text-neutral-600 dark:text-neutral-200">
        Ganadores de la partida
      </p>
      </div>
      <div className="row-start-2 flex w-screen h-auto lg:h-[80%] sm:mt-2 justify-evenly items-center my-0">
        {players.slice(0, 2).map((player, i) => (
          <PlayerCard key={i} name={player} />
        ))}
      </div>
      <div className="row-start-3 text-center mb-4">
          <p className="text-lg font-semibold text-neutral-500 dark:text-neutral-300">
            Puntos obtenidos:
          </p>
          <p className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {points}
          </p>
          <div className="flex justify-center items-center space-x-4 mt-8 mb-8">
           <Link to="/game">
           <button className="py-2 px-4 bg-primary-500 hover:bg-primary-600 text-neutral-100 hover:text-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
           Jugar de nuevo
          </button>
            </Link>
          <Link to="/">  
          <button className="py-2 px-4 bg-primary-500 hover:bg-primary-600 text-neutral-100 hover:text-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
            Volver al menú
          </button>
          </Link>
        </div>
        </div>
    </div>
  );
}
