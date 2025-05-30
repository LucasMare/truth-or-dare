'use client';

import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import { usePromptsLists } from './EditPrompts/PromptsLists';
import NoQuestionsNotification from './NoQuestionsAvailable';

type TruthButtonProps = {
  onReady?: () => void;
};

export default function TruthButton({ onReady }: TruthButtonProps) {
  const { truths, setTruths } = usePromptsLists();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [truth, setTruth] = useState('');

  const [notificationKey, setNotificationKey] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // Your existing diagonal angle stuff (if you want to keep it, otherwise remove)
  const [angleDeg, setAngleDeg] = useState<number | null>(null);
  const [translate, setTranslate] = useState<{ x: number; y: number } | null>(null);

  const calculateTopLeftToBottomRightAngle = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    return Math.atan2(screenHeight, screenWidth);
  };

  useEffect(() => {
    const updateDiagonalPosition = () => {
      const angleRad = calculateTopLeftToBottomRightAngle();
      const angleDegrees = angleRad * (180 / Math.PI);
      setAngleDeg(-angleDegrees);

      const distance = window.innerWidth * 0.1;
      const dx = Math.cos(angleRad) * distance;
      const dy = Math.sin(angleRad) * distance;

      setTranslate({ x: -dx, y: -dy });

      if (onReady) onReady();
    };

    updateDiagonalPosition();
    window.addEventListener('resize', updateDiagonalPosition);
    return () => window.removeEventListener('resize', updateDiagonalPosition);
  }, [onReady]);

  const handleClick = () => {
    const unusedTruths = truths.filter((d) => !d.used);

    if (unusedTruths.length === 0) {
      // Show the notification and reset timer by incrementing the key
      setNotificationKey((prev) => prev + 1);
      setShowNotification(true);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unusedTruths.length);
    const chosenTruth = unusedTruths[randomIndex];

    setTruth(chosenTruth.text);
    setIsModalOpen(true);

    setTruths(
      truths.map((d) =>
        d.text === chosenTruth.text ? { ...d, used: true } : d
      )
    );
  };

  const closeModal = () => setIsModalOpen(false);

  if (angleDeg === null || translate === null) return null;

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <NoQuestionsNotification
          key={notificationKey} // important for resetting timer
          triggerKey={notificationKey}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Your fancy diagonal blue background with "TRUTH" text */}
      <div
        onClick={handleClick}
        className="fixed top-0 left-0 w-full h-screen flex items-center justify-center cursor-pointer"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 0 100%)',
          background:
            'radial-gradient(circle at top left, #3b82f6 0%, #2563eb 40%, #1e40af 80%)',
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
          TRUTH
        </span>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        type="truth"
        question={truth}
      />
    </>
  );
}
