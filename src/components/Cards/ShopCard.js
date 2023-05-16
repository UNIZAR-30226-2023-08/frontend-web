import { BACKEND_URL, PROTOCOL, PURCHASE_SKIN_ENDPOINT } from "../../config";

export function ShopCard({
  name,
  username,
  purchased,
  setCurrentTheme,
  itemPurchased,
}) {
  return (
    <div className="flex flex-col min-w-[200px] py-4 px-4 rounded-lg border-violet-400 border-2">
      <p className="uppercase text-neutral-600 dark:text-neutral-200 text-center my-2">
        {name}
      </p>
      <button
        className="my-2 w-full bg-primary-500 py-2 px-4 rounded-md text-md font-medium leading-tight text-white shadow-md 
                   transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg 
                   focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
        onClick={() => {
          if (purchased) {
            console.log("Selecionado: " + name);
            setCurrentTheme(name);
          } else {
            fetch(
              PROTOCOL + BACKEND_URL + PURCHASE_SKIN_ENDPOINT + '?' + new URLSearchParams({username: username, baraja: name}),
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              }
            )
              .then((response) => {
                if (!response.ok) {
                  alert("No se puede comprar este item");
                  throw new Error();
                } else {
                  console.log("Compra ok!");
                  itemPurchased();
                }
              })
              .catch((e) => console.log(e));
          }
        }}
      >
        {purchased ? "Seleccionar" : "Comprar"}
      </button>
    </div>
  );
}
