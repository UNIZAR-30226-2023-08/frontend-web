import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShopCard } from "../../components/Cards/ShopCard";
import { BACKEND_URL, MY_STATS_ENDPOINT, PROTOCOL, SHOP_ENDPOINT } from "../../config";

export function ShopPage({ username, setCurrentTheme, currentTheme }) {
  const [items, setItems] = useState([]);
  const [coins, setCoins] = useState(0);
  const [purchased, setItemPurchased] = useState(0); // Para actualizar tras compra
  const newPurchase = () => setItemPurchased(purchased + 1);

  useEffect(() => {
    fetch(PROTOCOL + BACKEND_URL + SHOP_ENDPOINT + `?username=${username}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setItems(data));

    fetch(PROTOCOL + BACKEND_URL + MY_STATS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCoins(data["coins"] ?? 0));
  }, [username, purchased]);

  return (
    <div className="flex flex-col w-screen h-screen">
      <h1 className="dark:text-white mt-20 mb-12 text-4xl font-bol text-center">
        Tienda
      </h1>
      <h1 className="dark:text-white mt-4 mb-12 text-2xl font-bol text-center">
        Monedas: {coins} Selecciado: {currentTheme}
      </h1>
      <div className="flex w-screen justify-around">
        {items.map((item, i) => (
          <ShopCard
            username={username}
            name={item[0]}
            purchased={item[1]}
            itemPurchased={newPurchase}
            setCurrentTheme={setCurrentTheme}
          />
        ))}
      </div>
      <div className="flex mt-12 justify-center">
        <Link to="/">
          <button
            className="	block rounded bg-primary-500 px-6 py-2.5 text-md font-medium leading-tight text-white shadow-md 
                    transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg mb-6"
          >
            Volver al menú
          </button>
        </Link>
      </div>
    </div>
  );
}
