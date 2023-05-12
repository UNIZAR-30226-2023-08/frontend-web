import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";

function obtenerRankingUsuarios(limiteLista) {
  const url = BACKEND_URL + "/ranking?limite_lista=" + limiteLista;
  const options = {
    headers: `Authorization: Bearer ${localStorage.getItem("access_token")}`,
  };

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("La respuesta de la API no fue satisfactoria.");
      }
      return response.json();
    })
    .then((data) => data)
    .catch((error) => console.error(error));
}

export function RankingUsuarios() {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    obtenerRankingUsuarios(10)
      .then((response) => {
        setRanking(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <div>
      <h2>Ranking de usuarios:</h2>
      <ul>
        {ranking.map((usuario) => (
          <li key={usuario.id}>
            {usuario.nombre} - Puntos: {usuario.puntos}
          </li>
        ))}
      </ul>
    </div>
  );
}
