"use client";

import React, { useEffect, useState } from "react";
import Modal from "./Modal";

type DareButtonProps = {
  onReady?: () => void;
};

export default function DareButton({onReady}: DareButtonProps) {
  const [angleDeg, setAngleDeg] = useState<number | null>(null);
  const [translate, setTranslate] = useState<{ x: number; y: number } | null>(
    null
  );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dare, setDare] = useState<string>("");

  // Calculate angle from bottom-left (0, screenHeight) to top-right (screenWidth, 0)
  const calculateBottomLeftToTopRightAngle = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    const x1 = 0;
    const y1 = screenHeight;
    const x2 = screenWidth;
    const y2 = 0;

    const angle = Math.atan2(y2 - y1, x2 - x1);
    return angle;
  };

  useEffect(() => {
    const updateDiagonalPosition = () => {
      const angleRad = calculateBottomLeftToTopRightAngle();
      const angleDegrees = angleRad * (180 / Math.PI);
      setAngleDeg(angleDegrees); // positive rotation

      const distance = window.innerWidth * 0.1;
      const dx = Math.cos(angleRad) * distance;
      const dy = Math.sin(angleRad) * distance;

      setTranslate({ x: dx, y: -dy }); // move along that diagonal
      
      if (onReady) {
      onReady();
    }
    };

    updateDiagonalPosition();
    window.addEventListener("resize", updateDiagonalPosition);
    return () => window.removeEventListener("resize", updateDiagonalPosition);
  }, [onReady]);

  const handleClick = () => {
    setDare("Fa schimb de haine cu alta persoana aleasa la intamplare");
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  if (angleDeg === null || translate === null) return null;

  return (
    <>
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 w-full h-screen flex items-center justify-center cursor-pointer"
      style={{
        clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
        background:
          "radial-gradient(circle at top right, #ef4444 0%, #b91c1c 40%, #7f1d1d 80%)",
      }}
    >
      <span
        className="text-white font-semibold select-none"
        style={{
          fontSize: "14rem",
          transform: `translate(${translate.x}px, ${translate.y}px) rotate(${angleDeg}deg)`,
          display: "inline-block",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)", // adds a subtle drop shadow
        }}
      >
        DARE
      </span>
    </div>
    <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        type="dare"
        question={dare}
      />
    </>
  );
}
