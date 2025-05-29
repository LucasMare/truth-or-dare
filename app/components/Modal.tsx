"use client";

import React, { useEffect, useRef } from "react";
import { usePlayers, PlayersProvider } from "@/app/components/EditPlayers/PlayerListProvider";
import WheelOfNames from "@/app/components/EditPlayers/WheelOfNames"; // adjust path if needed

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "truth" | "dare";
  question: string;
};

export default function Modal({ isOpen, onClose, type, question }: ModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { nextTurn } = usePlayers();

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: any[] = [];
    let animationFrameId: number;
    let fireworkInterval: ReturnType<typeof setInterval>;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ["#ffffff", "#facc15", "#ef4444", "#3b82f6", "#10b981", "#e879f9", "#f472b6"];

    const createFirework = () => {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height * 0.5;
      const count = 30 + Math.random() * 30;
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = Math.random() * 4 + 2;
        particles.push({
          x,
          y,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 2,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(animate);
    };

    fireworkInterval = setInterval(createFirework, 600);
    animate();

    const stopTimeout = setTimeout(() => {
      clearInterval(fireworkInterval);
    }, 10000);

    return () => {
      clearInterval(fireworkInterval);
      clearTimeout(stopTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeColor = type === "truth" ? "text-blue-600" : "text-red-600";
  const bgColor = type === "truth" ? "bg-blue-100" : "bg-red-100";
  const promptColor = type === "truth" ? "text-blue-800" : "text-red-800";

  const handleClose = () => {
    onClose();
    nextTurn();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm pointer-events-auto"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      <div
        className={`relative p-10 rounded-2xl shadow-2xl max-w-2xl w-full mx-4 z-10 ${bgColor} fade-in-up`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-4 text-gray-600 hover:text-gray-800 text-3xl font-bold cursor-pointer"
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className={`text-4xl font-bold text-center uppercase ${typeColor} mb-4`}>
          {type}
        </h2>
        <hr className="border-t border-gray-300 mb-6" />
        <p className={`text-center text-3xl ${promptColor}`}>{question}</p>
      </div>

      {/* Wheel of Names fixed at bottom-right */}
      <PlayersProvider>
        <WheelOfNames />
      </PlayersProvider>
    </div>
  );
}
