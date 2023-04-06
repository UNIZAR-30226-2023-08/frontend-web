export function PlayerCard({ name }) {
  return (
    <div className="flex flex-col rounded xl:grow-[0.05]">
      <img
        className={`w-full h-auto rounded-lg ${name ? "border-yellow-300 border-4" : "animate-pulse"}`}
        src="https://via.placeholder.com/150x300"
      ></img>
      <p
        className={`self-center text-neutral-600 dark:text-neutral-200 mt-6 ${
          name ? "font-semibold" : "animate-pulse"
        }`}
      >
        {name ? name : "Esperando . . ."}
      </p>
    </div>
  );
}
