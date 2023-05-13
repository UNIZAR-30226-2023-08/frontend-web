import { Link } from "react-router-dom";

export function DisconnectPage({ message }) {
  return (
    <p className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="font-semibold lg:text-4xl sm:text-3xl text-neutral-600 dark:text-neutral-200">
        {message}
      </h1>
      <Link to="/">
        <button
          className="mt-4 w-full rounded bg-primary-500 px-6 py-2.5 text-md font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          Volver
        </button>
      </Link>
    </p>
  );
}
