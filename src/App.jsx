import fondo from "./fondo.jpg";
import React, { useState } from "react";
import NombreModal from "./components/NombreModal";
import JugadoresPanel from "./components/JugadoresPanel";
import Juego from "./components/Juego";
import Dado from "./components/Dado";
import DiceModal from "./components/DiceModal";
import Controls from "./components/Controls";
import ConfirmModal from "./components/ConfirmModal";
import TurnoCompletadoModal from "./components/TurnoCompletadoModal";
import TurnModal from "./components/TurnModal";
import ModalAviso from "./components/ModalAviso";
import AlertModal from "./components/AlertModal";
import { enviarTablero } from "./backend";

const coloresBase = [
  { color: "#0000FF", colorName: "Azul", icon: "🔵" },
  { color: "#FF0000", colorName: "Rojo", icon: "🔴" },
  { color: "#00AA00", colorName: "Verde", icon: "🟢" },
  { color: "#FFFF00", colorName: "Amarillo", icon: "🟡" }
];

export default function App() {
  // Estados globales
  const [nombres, setNombres] = useState([]);
  const [nombreModalOpen, setNombreModalOpen] = useState(true);
  const [dadoValores, setDadoValores] = useState([1, 1]);
  const [diceModalOpen, setDiceModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [turnModalOpen, setTurnModalOpen] = useState(false);
  const [turnoCompletadoModalOpen, setTurnoCompletadoModalOpen] = useState(false);
  const [avisoModalOpen, setAvisoModalOpen] = useState(false);
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [turno, setTurno] = useState(0);
  const [fichaInfo, setFichaInfo] = useState(null);
  
  // Estados para información de modals
  const [alertMessage, setAlertMessage] = useState("");
  const [avisoInfo, setAvisoInfo] = useState({
    tipo: "info",
    titulo: "",
    mensaje: "",
    jugador: null,
    fichaComida: null
  });

  // Ingresa nombre
  const agregarNombre = (nombre) => {
    if (nombre) {
      const nuevosNombres = [...nombres, nombre];
      setNombres(nuevosNombres);
      if (nuevosNombres.length >= 4) {
        setNombreModalOpen(false);
        // Mostrar alerta de bienvenida
        mostrarAlerta("¡Juego listo! Comienza el jugador 1");
      }
    }
  };

  // Datos de jugadores
  const jugadores = (nombres.length > 0 ? nombres : ["Jugador 1", "Jugador 2", "Jugador 3", "Jugador 4"])
    .map((nombre, i) => ({
      nombre,
      color: coloresBase[i].color,
      colorName: coloresBase[i].colorName,
      icon: coloresBase[i].icon,
      estado: "Jugando"
    }));

  // Función para mostrar avisos especiales
  const mostrarAviso = (tipo, titulo, mensaje, jugador = null, fichaComida = null) => {
    setAvisoInfo({
      tipo,
      titulo,
      mensaje,
      jugador,
      fichaComida
    });
    setAvisoModalOpen(true);
  };

  // Función para mostrar alertas simples
  const mostrarAlerta = (mensaje) => {
    setAlertMessage(mensaje);
    setAlertModalOpen(true);
  };

  // Tirar dos dados CON MODAL DE ESPERA
  const handleTirarDado = () => {
    setDiceModalOpen(true); // Mostrar modal de espera
    setDadoValores([null, null]); // Reset para mostrar "Esperando..."
    
    // Simular espera del servidor (900ms)
    setTimeout(() => {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      setDadoValores([d1, d2]);
      
      // Cerrar modal después de mostrar resultados (1200ms)
      setTimeout(() => {
        setDiceModalOpen(false);
        
        // Mostrar avisos especiales según el resultado
        if (d1 === d2) {
          // Dobles
          mostrarAviso(
            "alerta",
            "¡Dados iguales!",
            `¡Sacaste doble ${d1}! Obtienes otro turno`,
            jugadores[turno]
          );
        } else if (d1 === 5 || d2 === 5) {
          // Con 5 para sacar fichas
          mostrarAviso(
            "info",
            "¡Puedes sacar fichas!",
            "Con un 5 puedes sacar fichas de la cárcel",
            jugadores[turno]
          );
        } else if ((d1 + d2) === 7) {
          // Suma 7 (número especial)
          mostrarAviso(
            "alerta",
            "¡Suma 7!",
            "Con 7 puedes partir tu movimiento entre fichas",
            jugadores[turno]
          );
        } else {
          // Resultado normal - mostrar alerta simple
          mostrarAlerta(`🎲 Resultado: ${d1} y ${d2}`);
        }
      }, 1200);
    }, 900);
  };

  // Seleccionar ficha
  const handleFichaSeleccionada = (index) => {
    const jugadorIndex = Math.floor(index / 4);
    const jugador = jugadores[jugadorIndex];
    
    setFichaInfo({
      id: index,
      color: jugador.color,
      colorName: jugador.colorName,
      jugadorNombre: jugador.nombre
    });
    
    setConfirmModalOpen(true);
  };

  // Confirmar movimiento
  const handleConfirmMovimiento = () => {
    // Tu compañero enviará el movimiento al backend
    enviarTablero();
    
    setConfirmModalOpen(false);
    
    // Simular diferentes situaciones del juego (20% de chance de evento especial)
    const eventosEspeciales = Math.random() < 0.2;
    
    if (eventosEspeciales) {
      // Evento especial: comer ficha
      const fichaComidaId = Math.floor(Math.random() * 16);
      mostrarAviso(
        "comida",
        "¡Ficha Comida!",
        `${jugadores[turno].nombre} ha comido una ficha rival`,
        jugadores[turno],
        { id: fichaComidaId }
      );
    } else {
      // Movimiento normal
      setTurnoCompletadoModalOpen(true);
    }
  };

  // Ir al siguiente jugador
  const handleSiguienteJugador = () => {
    setTurnoCompletadoModalOpen(false);
    setAvisoModalOpen(false);
    
    const nuevoTurno = (turno + 1) % jugadores.length;
    setTurno(nuevoTurno);
    
    // Mostrar modal de cambio de turno
    setTurnModalOpen(true);
    setTimeout(() => setTurnModalOpen(false), 1500);
    
    // Resetear valores
    setFichaInfo(null);
    setDadoValores([1, 1]);
    
    // Mostrar alerta informativa del nuevo turno
    setTimeout(() => {
      mostrarAlerta(`Ahora es el turno de ${jugadores[nuevoTurno].nombre}`);
    }, 1600);
  };

  // Cerrar modal de turno completado
  const handleCerrarTurnoCompletado = () => {
    setTurnoCompletadoModalOpen(false);
  };

  // Cerrar aviso
  const handleCerrarAviso = () => {
    setAvisoModalOpen(false);
  };

  // Cerrar alerta
  const handleCerrarAlerta = () => {
    setAlertModalOpen(false);
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="bg-white bg-opacity-90 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-center p-8 gap-12 max-w-6xl border-2 border-blue-200">
        
        {/* LADO IZQUIERDO: Tablero y controles */}
        <div className="flex flex-col items-center w-full max-w-3xl">
          
          {/* DADOS y TURNO */}
          <div className="w-full mb-6">
            {/* Sección del Turno */}
            <div className="text-center mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Turno de: <span style={{ color: jugadores[turno]?.color }} className="font-extrabold">
                  {jugadores[turno]?.nombre}
                </span>
              </h2>
              <p className="text-lg text-gray-600">
                Jugador {turno + 1} de {jugadores.length}
              </p>
            </div>
            
            {/* Sección de Dados */}
            <div className="flex flex-col items-center bg-white bg-opacity-90 rounded-2xl shadow-xl border-2 border-blue-300 p-6">
              <h3 className="text-xl font-bold text-gray-700 mb-4">Dados</h3>
              <div className="flex flex-row gap-8 justify-center items-center">
                <Dado valor={dadoValores[0]} size={80} color="#e0e7ff" borderColor="#3b82f6" />
                <Dado valor={dadoValores[1]} size={80} color="#e0e7ff" borderColor="#3b82f6" />
              </div>
            </div>
          </div>
          
          {/* TABLERO */}
          <div className="mb-6">
            <Juego
              nombres={jugadores.map(j => j.nombre)}
              turno={turno}
              onFichaSeleccionada={handleFichaSeleccionada}
            />
          </div>
          
          {/* CONTROLES */}
          <div className="mt-4">
            <Controls
              onTirarDado={handleTirarDado}
              onSiguienteTurno={handleSiguienteJugador}
            />
          </div>
          
        </div>
        
        {/* LADO DERECHO: Panel de jugadores */}
        <div className="flex flex-col items-center w-full max-w-sm">
          <JugadoresPanel jugadores={jugadores} />
        </div>
      </div>
      
      {/* TODOS LOS MODALS */}
      
      {/* 1. Modal para ingresar nombre */}
      {nombreModalOpen && <NombreModal onSubmit={agregarNombre} />}
      
      {/* 2. Modal para tirar dados (con espera) */}
      {diceModalOpen && <DiceModal valores={dadoValores} />}
      
      {/* 3. Modal para confirmar movimientos */}
      {confirmModalOpen && fichaInfo && (
        <ConfirmModal
          mensaje={`¿Mover ficha ${fichaInfo.id + 1} (${fichaInfo.colorName})?`}
          fichaInfo={fichaInfo}
          onConfirm={handleConfirmMovimiento}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
      
      {/* 4. Modal para turno completado */}
      {turnoCompletadoModalOpen && (
        <TurnoCompletadoModal
          jugadorActual={jugadores[turno]}
          onSiguienteJugador={handleSiguienteJugador}
          onCerrar={handleCerrarTurnoCompletado}
        />
      )}
      
      {/* 5. Modal para siguiente turno */}
      {turnModalOpen && (
        <TurnModal
          nombre={jugadores[turno]?.nombre}
          colorName={jugadores[turno]?.colorName}
          color={jugadores[turno]?.color}
        />
      )}
      
      {/* 6. Modal para avisos especiales (comer ficha, ganar, etc.) */}
      {avisoModalOpen && (
        <ModalAviso
          tipo={avisoInfo.tipo}
          titulo={avisoInfo.titulo}
          mensaje={avisoInfo.mensaje}
          jugador={avisoInfo.jugador}
          fichaComida={avisoInfo.fichaComida}
          onClose={handleCerrarAviso}
        />
      )}
      
      {/* 7. Modal para alertas simples */}
      {alertModalOpen && (
        <AlertModal 
          mensaje={alertMessage} 
          onClose={handleCerrarAlerta} 
        />
      )}
    </div>
  );
}