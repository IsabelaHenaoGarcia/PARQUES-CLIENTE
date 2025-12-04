import React from "react";
import Dado from "./Dado";

export default function DiceModal({ valores }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center flex flex-col items-center w-80 border-2 border-blue-400">
        {(!valores || valores.length !== 2 || valores[0] === null || valores[1] === null) ? (
          <p className="mb-6 text-lg font-semibold animate-pulse text-blue-700">
            Esperando dados del servidor...
          </p>
        ) : (
          <>
            <p className="mb-3 text-xl font-bold text-green-700">¡Dados lanzados!</p>
            <div className="flex flex-row gap-7 justify-center items-center mt-1 mb-3">
              <Dado valor={valores[0]} size={70} />
              <Dado valor={valores[1]} size={70} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}