'use client';

import React, { useState } from 'react';
import { usePromptsLists } from './PromptsLists'; // Adjust path as necessary

export default function RefreshAllButton() {
  const [hovered, setHovered] = useState(false);
  const { truths, setTruths, dares, setDares } = usePromptsLists();

  const handleClick = () => {
    // Reset all prompts' used property to false
    const resetTruths = truths.map(prompt => ({ ...prompt, used: false }));
    const resetDares = dares.map(prompt => ({ ...prompt, used: false }));

    setTruths(resetTruths);
    setDares(resetDares);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'transparent',
        textShadow: '4px 4px 8px rgba(0, 0, 0, 0.6)',
        padding: '1rem 1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        cursor: 'pointer',
        boxSizing: 'border-box',
        outline: 'none',
        userSelect: 'none',
        color: hovered ? '#12b33f' : 'white',
        transition: 'color 0.3s ease',
      }}
    >
      Refresh All
    </button>
  );
}
