import { Plus, Minus } from "lucide-react";

const WatchlistButton = ({ isInWatchlist, onToggle }) => {
  return (
    <button
      className={`px-6 py-2 mt-8 flex items-center rounded-full transition ${
        isInWatchlist
          ? "bg-gray-800 border border-red-600 text-red-400"
          : "bg-red-600 text-white"
      }`}
      onClick={onToggle}
    >
      {isInWatchlist ? <Minus /> : <Plus />}
      <span className="ml-2">
        {isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
      </span>
    </button>
  );
};

export default WatchlistButton;
