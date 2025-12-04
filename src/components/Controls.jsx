import React from "react";

export default function Controls({ onTirarDado, onSiguienteTurno }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <button
        className="bg-gradient-to-r from-sky-500 to-green-500 text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:scale-105 transition transform duration-200 flex items-center justify-center gap-3 text-lg w-full"
        onClick={onTirarDado}
      >
        <span className="text-2xl">🎲</span>
        Tirar Dado
      </button>
      <button
        className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold px-6 py-4 rounded-2xl shadow-lg hover:scale-105 transition transform duration-200 flex items-center justify-center gap-3 text-lg w-full"
        onClick={onSiguienteTurno}
      >
        <span className="text-2xl"></span>
        Siguiente Jugador
      </button>
    </div>
  );
}