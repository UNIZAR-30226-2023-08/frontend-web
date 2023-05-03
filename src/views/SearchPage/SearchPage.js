import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContenedorTorneo from './ContenedorTorneo';
import ContenedorPartidaPublica from './ContenedorPartidaPublica';
import ContenedorPartidaPrivada from './ContenedorPartidaPrivada';
import { UserContext } from '../../context/UserContext';
import { BACKEND_URL } from '../../config';

export function SearchPage({url, setUrl, startNewGame, numJugadores, setJugadores}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const username = useContext(UserContext)
    
    useEffect(() => {
        setUrl(BACKEND_URL + '/partida4/' + username)
        setJugadores(4);
    }, [])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClick = (seleccion) => {
        console.log("Dropdown")
        setUrl(BACKEND_URL + '/partida' + seleccion + '/' + username)
        console.log("***" + BACKEND_URL + '/partida' + seleccion + '/' + username)
        setIsDropdownOpen(false);
        setJugadores(seleccion);
    };

    return (
        <div className="flex flex-col justify-around">
            <div className="flex justify-end">
                <div className="relative mt-10 mr-20">
                    <button
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        type="button"
                        onClick={toggleDropdown}
                    >
                        Seleccione el número de jugadores
                        <svg
                            className="w-4 h-4 ml-2"
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </button>
                    <div
                        id="dropdown"
                        className={`absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${
                            isDropdownOpen ? "block" : "hidden"
                        }`}
                    >
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" 
                                   onClick={() => handleDropdownClick('2')}>
                                    Dos jugadores
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                   onClick={() => handleDropdownClick('3')}>
                                    Tres jugadores
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                   onClick={() => handleDropdownClick('4')}>
                                    Cuatro jugadores
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <h1 className="mt-20 mb-12 text-4xl font-bol text-center"> 
                Seleccione tipo de partida </h1>
            <div className="flex justify-center">
                <ContenedorPartidaPublica startNewGame={startNewGame}/>
                <ContenedorPartidaPrivada />
                <ContenedorTorneo />
            </div>
        </div>
    );
}
