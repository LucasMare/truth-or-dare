'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { usePromptsLists } from './EditPrompts/PromptsLists';
import NoDaresNotification from './NoDaresAvailable';

type DareButtonProps = {
  onReady?: () => void;
};

export default function DareButton({ onReady }: DareButtonProps) {
  const { dares, setDares } = usePromptsLists();

  const [angleDeg, setAngleDeg] = useState<number | null>(null);
  const [translate, setTranslate] = useState<{ x: number; y: number } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dare, setDare] = useState('');

  const [notificationKey, setNotificationKey] = useState(0);
  const [showNotification, setShowNotification] = useState(false);


  // Calculate angle from bottom-left (0, screenHeight) to top-right (screenWidth, 0)
  const calculateBottomLeftToTopRightAngle = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return Math.atan2(0 - screenHeight, screenWidth - 0);
  };

  useEffect(() => {
    const updateDiagonalPosition = () => {
      const angleRad = calculateBottomLeftToTopRightAngle();
      const angleDegrees = angleRad * (180 / Math.PI);
      setAngleDeg(angleDegrees);

      const distance = window.innerWidth * 0.1;
      const dx = Math.cos(angleRad) * distance;
      const dy = Math.sin(angleRad) * distance;

      setTranslate({ x: dx, y: -dy });

      if (onReady) onReady();
    };

    updateDiagonalPosition();
    window.addEventListener('resize', updateDiagonalPosition);
    return () => window.removeEventListener('resize', updateDiagonalPosition);
  }, [onReady]);

  const handleClick = () => {
    const unusedDares = dares.filter((d) => !d.used);

    if (unusedDares.length === 0) {
      setNotificationKey((prev) => prev + 1);
      setShowNotification(true);
      return; 
    }

    const randomIndex = Math.floor(Math.random() * unusedDares.length);
    const chosenDare = unusedDares[randomIndex];

    setDare(chosenDare.text);
    setIsModalOpen(true);

    const updatedDares = dares.map((d) =>
      d.text === chosenDare.text ? { ...d, used: true } : d
    );
    setDares(updatedDares);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {showNotification && (
        <NoDaresNotification
          key={notificationKey}         // React's internal key, must be here for reconciliation
          triggerKey={notificationKey} // your component's prop, needed for the timer logic
          onClose={() => setShowNotification(false)}
        />
      )}

      {angleDeg !== null && translate !== null && (
        <div
          onClick={handleClick}
          className="fixed top-0 left-0 w-full h-screen flex items-center justify-center cursor-pointer"
          style={{
            clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            background:
              'radial-gradient(circle at top right, #ef4444 0%, #b91c1c 40%, #7f1d1d 80%)',
          }}
        >
          <span
            className="text-white font-semibold select-none"
            style={{
              fontSize: '14rem',
              transform: `translate(${translate.x}px, ${translate.y}px) rotate(${angleDeg}deg)`,
              display: 'inline-block',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
            }}
          >
            DARE
          </span>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} type="dare" question={dare} />
    </>
  );
}
