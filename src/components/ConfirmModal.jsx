import React from "react";

export default function ConfirmModal({ 
  mensaje, 
  fichaInfo, 
  onConfirm, 
  onCancel 
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-2xl w-96 text-center border-2 border-blue-300">
        <h3 className="text-xl font-bold mb-3 text-gray-800">Confirmar Movimiento</h3>
        
        {/* Información de la ficha */}
        {fichaInfo && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-center gap-3">
              <div 
                className="w-6 h-6 rounded-full border-2 border-black"
                style={{ backgroundColor: fichaInfo.color }}
              />
              <span className="font-semibold">Ficha {fichaInfo.id + 1}</span>
              <span className="font-medium text-gray-700">({fichaInfo.colorName})</span>
            </div>
          </div>
        )}
        
        <p className="text-lg mb-6">{mensaje}</p>
        
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform duration-200"
          >
            ✅ Confirmar
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition transform duration-200"
          >
            ❌ Cancelar
          </button>
        </div>
        
        <p className="text-sm text-gray-500 mt-4">
          El backend procesará este movimiento
        </p>
      </div>
    </div>
  );
}