// app/components/TurnDisplay.tsx
"use client";

import React from "react";
import { usePlayers } from "@/app/components/EditPlayers/PlayerListProvider";

export default function TurnDisplay() {
    const { players, currentTurnIndex } = usePlayers();

    const currentPlayer = players[currentTurnIndex] || "Unknown";

    if (players.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 z-30 bg-white/80 text-black px-4 py-2 rounded-2xl shadow-xl border border-gray-300">
            <span className="font-semibold text-lg">🎯 {currentPlayer}'s turn</span>
        </div>
    );
}
