"use client";

import React, { useState } from "react";
import { usePlayers } from "@/app/components/EditPlayers/PlayerListProvider";

type EditPlayersMenuProps = {
  onClose: () => void;
};

export default function EditPlayersMenu({ onClose }: EditPlayersMenuProps) {
  const { players, setPlayers } = usePlayers();

  const updatePlayer = (index: number, newName: string) => {
    const updated = [...players];
    updated[index] = newName;
    setPlayers(updated);
  };

  const removePlayer = (index: number) => {
    setPlayers(players.filter((_, i) => i !== index));
  };

  const addPlayer = () => {
    setPlayers([...players, `Player ${players.length + 1}`]);
  };

  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false); // Add Player hover

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        width: "30vw",
        height: "65vh",
        transform: "translate(-50%, -50%)",
        background: "linear-gradient(to right, #3b82f6 0%, #ef4444 100%)",
        color: "black",
        borderRadius: "12px",
        padding: "1rem",
        overflow: "hidden",
        zIndex: 60,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <button
        onClick={onClose}
        className="text-white hover:text-black font-bold px-3 py-1 cursor-pointer absolute"
        style={{
          top: "4px",
          right: "3px",
          fontSize: "1rem",
          position: "absolute",
        }}
      >
        ✕
      </button>

      <h2
        style={{
          fontSize: "1.875rem",
          fontWeight: "bold",
          marginBottom: "1rem",
          color: "white",
          textAlign: "center",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
        }}
      >
        Edit Players
      </h2>

      <hr
        style={{
          border: "none",
          borderTop: "2px solid rgba(255, 255, 255, 0.6)",
          marginBottom: "1rem",
        }}
      />

      <div
        className="hide-scrollbar"
        style={{
          flexGrow: 1,
          minHeight: 0,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          padding: "1rem",
          border: "2px solid white",
          borderRadius: "8px",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {players.map((player, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded shadow"
            style={{
              backgroundColor:
                hoveredTrashIndex === index
                  ? "rgba(255, 255, 255, 0.4)" // translucent on trash hover
                  : "rgba(255, 255, 255, 0.6)",
              padding: "0.5rem",
              marginLeft: "0.2rem",
              marginRight: "0.2rem",
              gap: "0.5rem",
              transition: "background-color 0.2s ease",
            }}
          >
            <input
              className="flex-1 p-1 rounded focus:outline-none transition duration-150"
              type="text"
              value={player}
              onChange={(e) => updatePlayer(index, e.target.value)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={(e) => {
                if (e.target.value.trim() === "") {
                  removePlayer(index);
                }
                setFocusedIndex(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              style={{
                backgroundColor:
                  focusedIndex === index
                    ? "rgba(255, 255, 255, 0.35)"
                    : "rgba(255, 255, 255, 0)",
              }}
            />

            <button
              onClick={() => removePlayer(index)}
              onMouseEnter={() => setHoveredTrashIndex(index)}
              onMouseLeave={() => setHoveredTrashIndex(null)}
              className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
              aria-label="Remove player"
              title="Remove player"
            >
              <svg
                fill="crimson"
                width="20px"
                height="20px"
                viewBox="-6.7 0 122.88 122.88"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144
              c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633
              L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3
              c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314
              h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869
              V42.998L49.572,42.998z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addPlayer}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "white",
          color: isHovered ? "#3b82f6" : "black",
          fontWeight: "600",
          borderRadius: "0.5rem",
          boxShadow: "0 1px 2px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
          flexShrink: 0,
          transition: "color 0.3s ease",
        }}
      >
        + Add Player
      </button>
    </div>
  );
}
