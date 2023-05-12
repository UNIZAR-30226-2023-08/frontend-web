import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContenedorTorneo from "./ContenedorTorneo";
import ContenedorPartidaPublica from "./ContenedorPartidaPublica";
import ContenedorPartidaPrivada from "./ContenedorPartidaPrivada";
import { UserContext } from "../../context/UserContext";
import { BACKEND_URL, IA_ENDPOINT } from "../../config";

export function SearchPage({
  url,
  setUrl,
  startNewGame,
  numJugadores,
  setJugadores,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const username = useContext(UserContext);

  useEffect(() => {
    setUrl(BACKEND_URL + "/partida4/" + username);
    setJugadores(4);
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownClick = (seleccion) => {
    console.log("Dropdown");
    setUrl(BACKEND_URL + "/partida" + seleccion + "/" + username);
    console.log("***" + BACKEND_URL + "/partida" + seleccion + "/" + username);
    setIsDropdownOpen(false);
    setJugadores(seleccion);
  };

  return (
    <>
      <div className="flex flex-col justify-around">
        <h1 className="dark:text-white mt-20 mb-12 text-4xl font-bol text-center">
          Seleccione tipo de partida{" "}
        </h1>
        <div className="flex justify-center">
          <ContenedorPartidaPublica startNewGame={startNewGame} />
          <ContenedorPartidaPrivada />
          <ContenedorTorneo />
        </div>
      </div>
      <div className="w-screen flex align-center justify-center">
        <p className="dark:text-white mt-20 mb-12 text-2xl font-bol text-center">
          Selección {numJugadores} jugadores
        </p>
        <div className="relative ml-4 mt-20 mr-20">
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            // className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            className="flex align-center justify-center w-[100px] rounded bg-primary-500 py-2.5 text-md font-medium leading-tight text-white shadow-md 
            transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
            focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            type="button"
            onClick={toggleDropdown}
          >
            Cambiar
            <svg
              className="w-4 h-4 ml-2"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
          <div
            id="dropdown"
            className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
              isDropdownOpen ? "block" : "hidden"
            }`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefaultButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownClick("2")}
                >
                  Dos jugadores
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownClick("3")}
                >
                  Tres jugadores
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => handleDropdownClick("4")}
                >
                  Cuatro jugadores
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-screen flex align-center justify-center">
        <Link to="/game">
          <button
            type="submit"
            onClick={() => {
              setUrl(BACKEND_URL + IA_ENDPOINT + "/" + username);
              setJugadores(4);
              startNewGame();
            }}
            className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
          >
            Jugar contra IA (4 jugadores)
          </button>
        </Link>
      </div>
    </>
  );
}
