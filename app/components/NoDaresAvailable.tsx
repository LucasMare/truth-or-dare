'use client';

import { useEffect, useState } from 'react';

type Props = {
  triggerKey: number; // add this prop
  onClose: () => void;
};

export default function NoQuestionsNotification({ triggerKey, onClose }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const interval = 50; // ms
    const duration = 5000; // total 5 seconds
    const totalFrames = duration / interval;

    const timer = setInterval(() => {
      frame++;
      setProgress((frame / totalFrames) * 100);
      if (frame >= totalFrames) {
        clearInterval(timer);
        onClose();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [triggerKey, onClose]); // <-- watch triggerKey here

  return (
    <div
      className="fixed top-20 right-4 w-80 bg-white text-black rounded-lg shadow-lg z-50 animate-slide-in"
      style={{ overflow: 'hidden', border: '1px solid #ddd' }}
    >
      <div
        className="h-1 bg-red-500"
        style={{ width: `${progress}%`, transition: 'width 50ms linear' }}
      />
      <div className="px-4 py-3 font-medium">No dares available!</div>

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
