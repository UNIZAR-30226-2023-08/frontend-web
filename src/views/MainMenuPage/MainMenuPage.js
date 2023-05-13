import { Link } from "react-router-dom";

export function MainMenuPage() {
  return (
    <div className="flex h-[80vh] flex-col justify-center items-center">
      <img
        className="mb-4"
        src="https://via.placeholder.com/150 "
        alt="placeholder"
      />
      {localStorage.getItem("access_token") ? (
        <div className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <Link to="/search">
            <button
              className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Jugar
            </button>
          </Link>
          <Link to="/">
            <button
              className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Estadisticas
            </button>
          </Link>
          <button
            className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
            data-te-ripple-init
            data-te-ripple-color="light"
            onClick={() => {
              localStorage.removeItem("access_token");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      ) : (
        <div className="flex flex-col max-w-lg md:min-w-[50vw] sm:min-w-[80vw]">
          <Link to="/login">
            <button
              className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Iniciar sesión
            </button>
          </Link>
          <Link to="/register">
            <button
              className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Registrarse
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
