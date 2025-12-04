import React from "react";

export default function JugadoresPanel({ jugadores }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-xl w-full">
      <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">Jugadores</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="py-2 px-1 text-center">Color</th>
            <th className="py-2 px-1 text-center">Nombre</th>
            <th className="py-2 px-1 text-center">Estado</th>
          </tr>
        </thead>
        <tbody>
          {jugadores.map((j, i) => (
            <tr key={i} className="border-b hover:bg-gray-50 transition">
              <td className="py-2 px-1 text-center font-bold text-lg" style={{ color: j.color }}>
                {j.icon}
              </td>
              <td className="py-2 px-1 text-center font-medium">{j.nombre}</td>
              <td className="py-2 px-1 text-center text-green-600 font-medium">{j.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}