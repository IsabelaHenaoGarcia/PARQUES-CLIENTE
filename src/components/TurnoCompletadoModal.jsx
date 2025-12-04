import React from "react";

export default function TurnoCompletadoModal({ 
  jugadorActual, 
  onSiguienteJugador,
  onCerrar
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center w-96 border-4 animate-bounce">
        <div className="text-4xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Turno Completado
        </h2>
        
        <div className="mb-6">
          <p className="text-lg">
            <span className="font-semibold" style={{ color: jugadorActual?.color }}>
              {jugadorActual?.nombre}
            </span> ha terminado su turno
          </p>
          <p className="text-gray-600 text-sm mt-1">
            Movimiento confirmado y enviado al servidor
          </p>
        </div>
        
        <div className="flex flex-col gap-3">
          <button
            onClick={onSiguienteJugador}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform duration-200"
          >
            Siguiente Jugador
          </button>
          <button
            onClick={onCerrar}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}