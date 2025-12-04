import React from "react";
import Ficha from "./Ficha";

// Componente auxiliar para dibujar mallas
const DibujarMalla = ({ x, y, ancho, alto, filas, columnas }) => {
  const lineas = [];
  
  // Líneas horizontales
  for (let i = 0; i <= filas; i++) {
    const yPos = y + (alto / filas) * i;
    lineas.push(
      <line 
        key={`h${i}`} 
        x1={x} 
        y1={yPos} 
        x2={x + ancho} 
        y2={yPos} 
        stroke="black" 
        strokeWidth="1" 
      />
    );
  }
  
  // Líneas verticales
  for (let i = 0; i <= columnas; i++) {
    const xPos = x + (ancho / columnas) * i;
    lineas.push(
      <line 
        key={`v${i}`} 
        x1={xPos} 
        y1={y} 
        x2={xPos} 
        y2={y + alto} 
        stroke="black" 
        strokeWidth="1" 
      />
    );
  }
  
  return <g>{lineas}</g>;
};

export default function Tablero({ fichas, onFichaClick }) {
  return (
    <svg width="800" height="800" className="border-4 border-gray-900 bg-white">
      {/* Tablero general y zona central */}
      <rect x="150" y="150" width="500" height="500" fill="lightblue" stroke="black" strokeWidth="2" />
      <rect x="340" y="340" width="120" height="120" fill="white" stroke="black" strokeWidth="2" />
      
      {/* Zonas de prisión/inicio de cada jugador */}
      <rect x="150" y="150" width="140" height="140" fill="#4682B4" stroke="black" strokeWidth="2" />
      <rect x="510" y="150" width="140" height="140" fill="#FF6666" stroke="black" strokeWidth="2" />
      <rect x="150" y="510" width="140" height="140" fill="#50C878" stroke="black" strokeWidth="2" />
      <rect x="510" y="510" width="140" height="140" fill="#FFFFCC" stroke="black" strokeWidth="2" />

      {/* Polígonos de las áreas de llegada (triángulos) */}
      <polygon 
        points="290,150 436.6,150 436.6,340 340,340 340,363.3 150,363.3 150,290 290,290" 
        fill="#0000FF" 
        stroke="black" 
        strokeWidth="1" 
      />
      <polygon 
        points="340,363.3 340,460 363.3,460 363.3,650 290,650 290,510 150,510 150,363.3" 
        fill="#00AA00" 
        stroke="black" 
        strokeWidth="1" 
      />
      <polygon 
        points="363.3,650 363.3,460 460,460 460,436.6 650,436.6 650,510 510,510 510,650" 
        fill="#FFFF00" 
        stroke="black" 
        strokeWidth="1" 
      />
      <polygon 
        points="460,436.6 460,340 436.6,340 436.6,150 510,150 510,290 650,290 650,436.6" 
        fill="#FF0000" 
        stroke="black" 
        strokeWidth="1" 
      />

      {/* Mallas (grillas de casillas) */}
      <DibujarMalla x={290} y={150} ancho={220} alto={140} filas={7} columnas={3} />
      <DibujarMalla x={150} y={290} ancho={140} alto={220} filas={3} columnas={7} />
      <DibujarMalla x={510} y={290} ancho={140} alto={220} filas={3} columnas={7} />
      <DibujarMalla x={290} y={510} ancho={220} alto={140} filas={7} columnas={3} />

      {/* LÍNEAS DEL CENTRO - Conectando las áreas */}
      {/* Líneas verticales entre triángulos y zona central */}
      <line x1="363.3" y1="290" x2="363.3" y2="340" stroke="black" strokeWidth="1.5" />
      <line x1="436.6" y1="290" x2="436.6" y2="340" stroke="black" strokeWidth="1.5" />
      <line x1="363.3" y1="460" x2="363.3" y2="510" stroke="black" strokeWidth="1.5" />
      <line x1="436.6" y1="460" x2="436.6" y2="510" stroke="black" strokeWidth="1.5" />
      
      {/* Líneas horizontales entre triángulos y zona central */}
      <line x1="290" y1="363.3" x2="340" y2="363.3" stroke="black" strokeWidth="1.5" />
      <line x1="290" y1="436.6" x2="340" y2="436.6" stroke="black" strokeWidth="1.5" />
      <line x1="460" y1="363.3" x2="510" y2="363.3" stroke="black" strokeWidth="1.5" />
      <line x1="460" y1="436.6" x2="510" y2="436.6" stroke="black" strokeWidth="1.5" />
      
      {/* Líneas diagonales en las esquinas del cuadrado central */}
      <line x1="290" y1="290" x2="340" y2="340" stroke="black" strokeWidth="1.5" />
      <line x1="460" y1="340" x2="510" y2="290" stroke="black" strokeWidth="1.5" />
      <line x1="290" y1="510" x2="340" y2="460" stroke="black" strokeWidth="1.5" />
      <line x1="460" y1="460" x2="510" y2="510" stroke="black" strokeWidth="1.5" />

      {/* Triángulos centrales */}
      <polygon points="340,340 400,400 460,340" fill="#0000FF" stroke="black" strokeWidth="1.5" />
      <polygon points="340,340 400,400 340,460" fill="#00AA00" stroke="black" strokeWidth="1.5" />
      <polygon points="340,460 400,400 460,460" fill="#FFFF00" stroke="black" strokeWidth="1.5" />
      <polygon points="460,460 400,400 460,340" fill="#FF0000" stroke="black" strokeWidth="1.5" />
      
      {/* Líneas diagonales dentro del cuadrado central */}
      <line x1="340" y1="340" x2="460" y2="460" stroke="black" strokeWidth="1" strokeDasharray="5,5" />
      <line x1="340" y1="460" x2="460" y2="340" stroke="black" strokeWidth="1" strokeDasharray="5,5" />
      
      {/* Punto central */}
      <circle cx="400" cy="400" r="4" fill="black" />
      

      {/* Textos de etiquetas */}
      {/* SALIDAS - en las casillas de salida de cada color */}
      <text x="322" y="244" fontSize="10" fill="black" fontWeight="bold" textAnchor="middle">SALIDA</text>
      <text x="580" y="353" fontSize="10" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(90 580 333)">SALIDA</text>
      <text x="230" y="479" fontSize="10" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(270 240 479)">SALIDA</text>
      <text x="478" y="555" fontSize="10" fill="black" fontWeight="bold" textAnchor="middle">SALIDA</text>

      {/* SEGUROS - en las casillas marrones/seguras */}
      <text x="400" y="163" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle">SEGURO</text>
      <text x="580" y="499" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(90 580 479)">SEGURO</text>
      <text x="645" y="403" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(90 645 403)">SEGURO</text>
      <text x="220" y="353" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(270 220 333)">SEGURO</text>
      <text x="155" y="403" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(270 155 403)">SEGURO</text>
      <text x="400" y="637" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle">SEGURO</text>
      <text x="330" y="555" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle">SEGURO</text>
      <text x="478" y="243" fontSize="9" fill="black" fontWeight="bold" textAnchor="middle">SEGURO</text>

      {/* LLEGADAS - en los triángulos centrales */}
      <text x="400" y="365" fontSize="11" fill="black" fontWeight="bold" textAnchor="middle">LLEGADA</text>
      <text x="435" y="403" fontSize="11" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(90 435 403)">LLEGADA</text>
      <text x="400" y="440" fontSize="11" fill="black" fontWeight="bold" textAnchor="middle">LLEGADA</text>
      <text x="365" y="403" fontSize="11" fill="black" fontWeight="bold" textAnchor="middle" transform="rotate(270 365 403)">LLEGADA</text>

      {/* FICHAS */}
      {fichas.map((f, i) => (
        <Ficha
          key={i}
          x={f.x}
          y={f.y}
          color={f.color}
          onClick={() => onFichaClick(i)}
        />
      ))}
    </svg>
  );
}