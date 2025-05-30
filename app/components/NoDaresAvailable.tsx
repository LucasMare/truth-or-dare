'use client';

import React, { useEffect, useState, useRef } from 'react';

type Props = {
  triggerKey: number;
  onClose?: () => void;
};

export default function NoDaresNotification({ triggerKey, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const hasMounted = useRef(false);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return; // skip initial mount
    }

    setVisible(true);
    setProgress(0);

    let frame = 0;
    const interval = 50; // ms per frame
    const duration = 5000; // 5 seconds total
    const totalFrames = duration / interval;

    const progressTimer = setInterval(() => {
      frame++;
      setProgress((frame / totalFrames) * 100);

      if (frame >= totalFrames) {
        clearInterval(progressTimer);
        setVisible(false);
        if (onClose) onClose();
      }
    }, interval);

    return () => clearInterval(progressTimer);
  }, [triggerKey, onClose]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-19 right-4 w-80 bg-white text-black rounded-lg shadow-lg z-50 animate-slide-in"
      style={{ overflow: 'hidden', border: '1px solid #ddd' }}
    >
      <div
        className="h-1 bg-red-500"
        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
      />
      <div className="px-4 py-3 font-medium">No dares available</div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
