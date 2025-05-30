import React from "react";
import SpinCircle from "./WheelOfNames";

type FullscreenWheelProps = {
  onClose: () => void;
};

export default function FullscreenWheel({ onClose }: FullscreenWheelProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm pointer-events-auto"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-[100vh] h-[100vh] max-w-[700px] max-h-[700px] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside wheel
      >
        <SpinCircle />
      </div>
      <button
        aria-label="Close Wheel"
        onClick={onClose}
        className="absolute top-5 right-5 text-white text-3xl font-bold z-60 cursor-pointer"
      >
        &times;
      </button>
    </div>
  );
}
