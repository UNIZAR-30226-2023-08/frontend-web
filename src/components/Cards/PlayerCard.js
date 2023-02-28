export function PlayerCard({ name }) {
  return (
    <div className="flex flex-col rounded xl:grow-[0.05]">
      <img className="w-full h-auto" src="https://via.placeholder.com/150x300"></img>
      <p className="self-center font-semibold text-neutral-600 dark:text-neutral-200 mt-6">{name}</p>
    </div>
  );
}
