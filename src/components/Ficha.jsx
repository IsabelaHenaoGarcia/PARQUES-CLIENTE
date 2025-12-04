import React from "react";

export default function Ficha({ x, y, color, onClick }) {
  return (
    <circle
      cx={x + 10}
      cy={y + 10}
      r="10"
      fill={color}
      stroke="black"
      strokeWidth="2"
      onClick={onClick}
      className="cursor-pointer hover:opacity-80"
    />
  );
}
