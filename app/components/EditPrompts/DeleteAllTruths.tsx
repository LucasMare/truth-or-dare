'use client';

import React, { useState } from 'react';
import { usePromptsLists } from './PromptsLists'; // Adjust path as necessary

export default function DeleteAllTruths() {
  const [hovered, setHovered] = useState(false);
  const { setTruths } = usePromptsLists();

  const handleClick = () => {
    setTruths([]); // Clear all truths
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
        color: hovered ? '#cc1f1f' : 'white',
        transition: 'color 0.3s ease',
      }}
    >
      Delete All Truths
    </button>
  );
}
