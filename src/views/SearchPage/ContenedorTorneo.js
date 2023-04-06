import React from 'react';

export default function ContenedorTorneo() {
  return (
    <div class=" flex-1 mx-10 flex-col flex items-center justify-center py-10 px-10  border-violet-400 border-2">
      <h1 class="mb-6 text-xl font-bol text-center">  Torneo
      </h1>
      <button
        type="submit"
        className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
                  >
                    Buscar torneo
      </button>
      <button
        type="submit"
        className="block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                   transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                   focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
                  >
                    Crear torneo
      </button>
      <div className="grid grid-cols-2 gap-4 max-w-xs">
        <input type="text" className="w-full px-3 py-2 border border-gray-400 rounded-md" placeholder="Código del torneo" />
        <button className="w-full bg-primary-500 py-2 px-4 rounded-md text-md font-medium leading-tight text-white shadow-md 
                   transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                   focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                   >
                    Unirse al torneo
        </button>
      </div>

    </div>
    
  )
};

