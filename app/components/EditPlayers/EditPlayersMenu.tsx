"use client";

import React, { useState } from "react";

type EditPlayersMenuProps = {
    onClose: () => void;
};

export default function EditPlayersMenu({ onClose }: EditPlayersMenuProps) {
    const [players, setPlayers] = useState<string[]>(["Player 1", "Player 2"]);

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

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "30vw", // made narrower
                height: "65vh",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(to right, #3b82f6 0%, #ef4444 100%)",
                color: "black",
                borderRadius: "12px",
                padding: "1rem",
                overflow: "hidden", // hide overflow here, scroll in inner container
                zIndex: 60,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* ✖ Close button */}
            <button
                onClick={onClose}
                className="text-gray-600 hover:text-black font-bold px-3 py-1 cursor-pointer absolute"
                style={{
                    top: "4px",
                    right: "3px",
                    fontSize: "1rem",
                    position: "absolute",
                }}
            >
                ✕
            </button>

            <h2 className="text-2xl font-bold mb-4 text-white text-center">
                Edit Players
            </h2>

            <hr
                style={{
                    border: "none",
                    borderTop: "2px solid rgba(255, 255, 255, 0.6)",
                    marginBottom: "1rem",
                }}
            />

            {/* Scrollable players list with white border */}
            <div
                style={{
                    flexGrow: 1,
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.75rem",
                    padding: "1rem 1rem", // symmetric left/right padding
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
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            padding: "0.5rem",
                            marginLeft: "0.5rem",   // equal horizontal margins
                            marginRight: "0.5rem",
                            gap: "0.5rem",          // gap between input and button
                        }}
                    >
                        <input
                            className="flex-1 p-1 border border-gray-300 rounded"
                            type="text"
                            value={player}
                            onChange={(e) => updatePlayer(index, e.target.value)}
                        />
                        <button
                            onClick={() => removePlayer(index)}
                            className="text-red-600 hover:text-red-800 p-1"
                            aria-label="Remove player"
                            title="Remove player"
                        >
                            {/* Trashcan SVG */}
                            <svg
                                fill="white"
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


            {/* Add Player button fixed at bottom */}
            <button
                onClick={addPlayer}
                className="mt-4 px-4 py-2 bg-white text-black font-semibold rounded shadow hover:bg-gray-200"
                style={{ flexShrink: 0 }}
            >
                + Add Player
            </button>
        </div>
    );
}
