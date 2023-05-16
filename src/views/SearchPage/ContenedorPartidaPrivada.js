import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BACKEND_URL, CREATE_PRIVATE_GAME_ENDPOINT, PROTOCOL } from "../../config";

export default function ContenedorPartidaPrivada({
  startNewGame,
  seleccion,
  setGameId,
  setUrl,
  username
}) {
  // const username = useContext(UserContext);
  const [cod, setCod] = useState(null);
  let BASE_URL = BACKEND_URL + "/partida" + seleccion + "/join/" + username + "/";
  return (
    <div className=" flex-1 mx-10 flex-col flex items-center justify-center py-10 px-10 w-320 border-violet-400 border-2">
      <h1 className="dark:text-white mb-6 text-xl font-bol text-center">
        {" "}
        Partida privada
      </h1>
      <Link to="/game">
        <button
          type="submit"
          className="block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
          onClick={() => {
            fetch(
              PROTOCOL + BACKEND_URL + CREATE_PRIVATE_GAME_ENDPOINT + seleccion,
              {
                method: "POST",
              }
            )
              .then((response) => response.json())
              .then((data) => {
                if (!data["codigo"]) {
                  return;
                }

                console.log("codigo" + data["codigo"]);
                setGameId(data["codigo"]);
                setUrl(BASE_URL + data["codigo"]);
                console.log("Start private");
                startNewGame();
              });
          }}
        >
          Crear partida
        </button>
      </Link>
      <div className="grid grid-cols-2 gap-4 max-w-sm h-10">
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-400 rounded-md"
          placeholder="Código de la partida"
          onChange={(e) => setCod(e.target.value)}
        />
        <Link to="/game">
          <button
            className="w-full bg-primary-500 py-2 px-4 rounded-md text-md font-medium leading-tight text-white shadow-md 
                   transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                   focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            onClick={() => {
              setUrl(BASE_URL + cod);
              setGameId(cod)
              startNewGame();
            }}
          >
            Unirse a la partida
          </button>
        </Link>
      </div>
    </div>
  );
}
