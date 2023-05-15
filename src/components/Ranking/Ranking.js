import { useState, useEffect } from "react";
import { BACKEND_URL } from "../../config";
import { Link } from "react-router-dom";


async function obtenerRankingUsuarios(limiteLista) {
  const url = `http://${BACKEND_URL}/ranking?limite_lista=${limiteLista}`;
  console.log("El url es --> " + url);
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    }
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("La respuesta de la API no fue satisfactoria.");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function RankingUsuarios({rankingChecked}) {
  const [ranking, setRanking] = useState([]);

  useEffect(() => {
    obtenerRankingUsuarios(10)
      .then((response) => {
        setRanking(response);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [rankingChecked]);
  
  return (
    <div style={{ width: "80%", margin: "0 auto" }}>
      <h1  class="text-center text-3xl mt-8 text-neutral-600 dark:text-neutral-200">
        RANKING DE JUGADORES
      </h1>
      <Link to="/">
      <button
        className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6" >
                    Volver al menú
      </button>
      </Link>
      <ul style={{ listStyleType: "none", padding: 0, marginTop: "32px" }}>
        {ranking &&
          ranking.map((usuario, index) => (
          <li
            key={index}
            className={`border-b ${index === ranking.length - 1 ? 'border-primary-400 border-b-2' : 'border-primary-400 border-b-1'} border-t ${index === 0 ? 'border-primary-400 border-t-2' : 'border-primary-400 border-t-1'} text-neutral-600 dark:text-neutral-200 text-base py-4 flex justify-between items-center mx-4 min-w-100`}


          >
              <span style={{ marginRight: "32px", width: "150px" ,maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{usuario.username}</span>
              <span style={{ marginRight: "32px", width: "150px" ,maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> Puntos: {usuario.lp}</span>
              <span style={{ marginRight: "32px", width: "150px" ,maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}> Victorias: {usuario.wonMatches}</span>
              <span>Derrotas: {usuario.lostMatches}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
