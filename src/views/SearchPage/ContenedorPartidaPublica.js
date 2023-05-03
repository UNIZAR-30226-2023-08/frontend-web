import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ContenedorPartidaPublica({startNewGame}) {
  const [gameId, setGameId] = useState(-1);
  
  // fetch("http://localhost:8000/gameid")
  //   .then(response => response.json())
  //   .then(id => {
  //     setGameId(id)
  //     console.log(`GameID antes: ${gameId}`)
  //   })

  return (
    <div class=" flex-1 mx-10 flex-col flex items-center justify-center py-10 px-10 border-violet-400 border-2">
      <h1 class="mb-6 text-xl font-bol text-center">  Partida pública
      </h1>
      <Link to="/game" state={{gameId: gameId}}>
      <button
        type="submit"
        onClick={() => {
          startNewGame();
        }}
        className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
                  >
                    Buscar partida
      </button>
      </Link>
    </div>
    
  )
};
