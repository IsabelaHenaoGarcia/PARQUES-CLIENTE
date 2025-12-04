// Juego.jsx - versión corregida
import React from "react";
import Tablero from "./Tablero";

export default function Juego({ nombres, turno, onFichaSeleccionada }) {
  const colores = ["#0000FF", "#FF0000", "#00AA00", "#FFFF00"];

  const prisiones = {
    0: [
      { x: 192.5, y: 192.5 },
      { x: 227.5, y: 192.5 },
      { x: 192.5, y: 227.5 },
      { x: 227.5, y: 227.5 }
    ],
    1: [
      { x: 552.5, y: 192.5 },
      { x: 587.5, y: 192.5 },
      { x: 552.5, y: 227.5 },
      { x: 587.5, y: 227.5 }
    ],
    2: [
      { x: 192.5, y: 552.5 },
      { x: 227.5, y: 552.5 },
      { x: 192.5, y: 587.5 },
      { x: 227.5, y: 587.5 }
    ],
    3: [
      { x: 552.5, y: 552.5 },
      { x: 587.5, y: 552.5 },
      { x: 552.5, y: 587.5 },
      { x: 587.5, y: 587.5 }
    ]
  };

  // Formato para el Tablero
  const fichas = [];
  for (let j = 0; j < 4; j++) {
    for (let f = 0; f < 4; f++) {
      const pos = prisiones[j][f];
      fichas.push({
        x: pos.x,
        y: pos.y,
        color: colores[j]
      });
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* ELIMINA ESTE H2 - El turno ya se muestra en App.jsx */}
      {/* <h2 className="text-xl font-bold mt-4">
        Turno de: {nombres[turno]}
      </h2> */}
      
      <Tablero fichas={fichas} onFichaClick={onFichaSeleccionada} />
    </div>
  );
}