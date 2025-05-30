import React, { useRef } from "react";
import SpinCircle from "./WheelOfNames";

type FullscreenWheelProps = {
  onClose: () => void;
};

export default function FullscreenWheel({ onClose }: FullscreenWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  function handleOverlayClick(event: React.MouseEvent<HTMLDivElement>) {
    // If click happened outside the wheel container, close
    if (wheelRef.current && !wheelRef.current.contains(event.target as Node)) {
      onClose();
    }
    // else do nothing, wheel handles clicks inside itself
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm pointer-events-auto"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      onClick={handleOverlayClick} // only fire if clicked outside wheel
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={wheelRef}
        className="relative w-[100vh] h-[100vh] max-w-[700px] max-h-[700px] flex items-center justify-center"
        style={{ clipPath: "circle(60% at 50% 50%)" }}
      >
        <SpinCircle />
      </div>
    </div>
  );
}
