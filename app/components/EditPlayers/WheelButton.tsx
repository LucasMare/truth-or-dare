import React, { useState } from "react";
import FullscreenWheel from "./FullScreenWheel";

const sliceColors = [
  "#8f7f8f", "#f97066", "#2e90fa", "#fdb022", "#ee46bc",
  "#854CFF", "#22c55e", "#f97316", "#0ea5e9", "#a855f7",
];

export default function OpenWheelButton() {
  const [isOpen, setIsOpen] = useState(false);
  const slicesCount = 10;
  const sliceAngle = 360 / slicesCount;

  return (
    <>
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="flex flex-col items-center cursor-pointer select-none"
          aria-label="Open Wheel of Names"
        >
          {/* Mini Wheel */}
          <svg
            width={80}
            height={80}
            viewBox="0 0 100 100"
            className="rounded-full border-2 border-black"
            role="img"
            aria-hidden="true"
          >
            {Array.from({ length: slicesCount }).map((_, i) => {
              const startAngle = i * sliceAngle;
              const endAngle = startAngle + sliceAngle;
              const largeArcFlag = sliceAngle > 180 ? 1 : 0;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);

              const path = `
                M 50 50
                L ${x1} ${y1}
                A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2}
                Z
              `;

              return (
                <path
                  key={i}
                  d={path}
                  fill={sliceColors[i % sliceColors.length]}
                  stroke="black"
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {/* Label below the wheel */}
          <div className="mt-2 text-center font-semibold text-sm">
            Wheel of names
          </div>
        </div>
      )}

      {isOpen && <FullscreenWheel onClose={() => setIsOpen(false)} />}
    </>
  );
}
