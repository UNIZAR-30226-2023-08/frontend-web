import React from 'react';
import ContenedorTorneo from './ContenedorTorneo';
import ContenedorPartidaPublica from './ContenedorPartidaPublica';
import ContenedorPartidaPrivada from './ContenedorPartidaPrivada';

export function SearchPage() {

    return (
        <div class= "flex flex-col flex-col justify-around">
            <h1 className="mt-20 mb-12 text-4xl font-bol text-center"> 
                Sleccione tipo de partida </h1>
            <div class="flex justify-center">
                <ContenedorPartidaPublica />
                <ContenedorPartidaPrivada />
                <ContenedorTorneo />
            </div>
        </div> 

    ); 
}