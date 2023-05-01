import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ContenedorTorneo from './ContenedorTorneo';
import ContenedorPartidaPublica from './ContenedorPartidaPublica';
import ContenedorPartidaPrivada from './ContenedorPartidaPrivada';

export function SearchPage() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleDropdownClick = (path) => {
        navigate(path);
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
                            xmlns="http://www.w3.org/2000/svg"
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
                                   onClick={() => handleDropdownClick('/game2')}>
                                    Dos jugadores
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                   onClick={() => handleDropdownClick('/game3')}>
                                    Tres jugadores
                                </a>
                            </li>
                            <li>
                                <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                   onClick={() => handleDropdownClick('/game')}>
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
                <ContenedorPartidaPublica />
                <ContenedorPartidaPrivada />
                <ContenedorTorneo />
            </div>
        </div>
    );
}
