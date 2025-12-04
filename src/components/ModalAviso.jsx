import React from "react";

export default function ModalAviso({ 
  tipo = "info", // "comida", "ganador", "error", "info"
  titulo, 
  mensaje,
  jugador,
  fichaComida,
  onClose 
}) {
  
  // Iconos según el tipo de aviso
  const iconos = {
    comida: "🍽️",
    ganador: "🏆",
    error: "❌",
    info: "ℹ️",
    alerta: "⚠️"
  };
  
  // Colores según el tipo
  const colores = {
    comida: "border-red-400 bg-red-50",
    ganador: "border-yellow-400 bg-yellow-50",
    error: "border-red-500 bg-red-50",
    info: "border-blue-400 bg-blue-50",
    alerta: "border-orange-400 bg-orange-50"
  };
  
  // Textos automáticos según el tipo
  const textosAutomaticos = {
    comida: (jugador, ficha) => `¡${jugador?.nombre || "Jugador"} comió una ficha!`,
    ganador: (jugador) => `¡${jugador?.nombre || "Jugador"} ha ganado el juego!`,
    error: () => "Ha ocurrido un error",
    info: () => "Información importante",
    alerta: () => "¡Atención!"
  };

  const icono = iconos[tipo] || iconos.info;
  const colorClase = colores[tipo] || colores.info;
  const tituloFinal = titulo || (tipo === "comida" ? "¡Ficha comida!" : "Aviso");
  const mensajeFinal = mensaje || (textosAutomaticos[tipo]?.(jugador, fichaComida) || "Mensaje del sistema");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className={`bg-white p-6 rounded-2xl shadow-2xl text-center w-96 border-4 ${colorClase}`}>
        
        {/* Icono grande */}
        <div className="text-5xl mb-4 animate-bounce">{icono}</div>
        
        {/* Título */}
        <h2 className="text-2xl font-bold mb-3 text-gray-800">{tituloFinal}</h2>
        
        {/* Mensaje principal */}
        <div className="mb-6">
          <p className="text-lg text-gray-700">{mensajeFinal}</p>
          
          {/* Información adicional si hay jugador */}
          {jugador && (
            <div className="mt-3 p-3 bg-white rounded-lg border">
              <div className="flex items-center justify-center gap-3">
                <div 
                  className="w-8 h-8 rounded-full border-2 border-black"
                  style={{ backgroundColor: jugador.color }}
                />
                <span className="font-bold" style={{ color: jugador.color }}>
                  {jugador.nombre}
                </span>
              </div>
            </div>
          )}
          
          {/* Información de ficha comida */}
          {fichaComida && (
            <div className="mt-3 p-3 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-600">
                Ficha afectada: <span className="font-bold">#{fichaComida.id + 1}</span>
              </p>
            </div>
          )}
        </div>
        
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform duration-200 w-full"
        >
          Entendido
        </button>
        
        {/* Footer informativo */}
        <p className="text-xs text-gray-500 mt-4">
          {tipo === "comida" ? "La ficha regresa a su prisión" : 
           tipo === "ganador" ? "¡Felicidades!" : 
           "El juego continúa"}
        </p>
      </div>
    </div>
  );
}