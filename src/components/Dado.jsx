import React from "react";
const dot = (cx, cy, size) => (
  <circle cx={cx * size / 50} cy={cy * size / 50} r={size / 10} fill="#222" />
);
const dotsLayout = {
  1: [[25, 25]],
  2: [[13, 13], [37, 37]],
  3: [[13, 13], [25, 25], [37, 37]],
  4: [[13, 13], [13, 37], [37, 13], [37, 37]],
  5: [[13, 13], [13, 37], [25, 25], [37, 13], [37, 37]],
  6: [[13, 13], [13, 25], [13, 37], [37, 13], [37, 25], [37, 37]],
};

export default function Dado({ valor, size = 60, color = "#fff", borderColor = "#000000ff" }) {
  return (
    <svg width={size} height={size} className="rounded-xl shadow-xl">
      <rect width={size} height={size} rx={size / 5} fill={color} stroke={borderColor} strokeWidth="3" />
      {(dotsLayout[valor] || []).map(([cx, cy], i) => dot(cx, cy, size))}
    </svg>
  );
}