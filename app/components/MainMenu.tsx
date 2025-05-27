"use client";

import React, { useState } from "react";
import TruthButton from "@/app/components/TruthButton";
import DareButton from "@/app/components/DareButton";
import OrComponent from "@/app/components/OrComponent";
import AddPromptsButton from "@/app/components/EditPrompts/EditPromptsButton";
import LoadingScreen from "@/app/components/LoadingScreen";
import Leaderboard from "@/app/components/Leaderboard";


export default function MainMenu() {
  const [truthReady, setTruthReady] = useState(false);
  const [dareReady, setDareReady] = useState(false);
   const [showLeaderboard, setShowLeaderboard] = useState(false);

  const isReady = truthReady && dareReady;

   const leaderboardData = [
    { rank: 1, name: "Alice", score: 120 },
    { rank: 2, name: "Bob", score: 110 },
    { rank: 3, name: "Charlie", score: 90 },
  ];

  return (
    <main className="relative w-full h-screen">
      {!isReady && <LoadingScreen />}
      
      <TruthButton onReady={() => setTruthReady(true)} />
      <DareButton onReady={() => setDareReady(true)} />
      {isReady && <AddPromptsButton />}
      {isReady && <OrComponent />}
      <button
        onClick={() => setShowLeaderboard(true)}
        className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 z-40"
      >
        Show Leaderboard
      </button>

      {showLeaderboard && (
        <Leaderboard data={leaderboardData} onClose={() => setShowLeaderboard(false)} />
      )}
    </main>
  );
}
