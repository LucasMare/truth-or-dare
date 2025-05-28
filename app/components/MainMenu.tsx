"use client";

import React, { useState } from "react";
import TruthButton from "@/app/components/TruthButton";
import DareButton from "@/app/components/DareButton";
import OrComponent from "@/app/components/OrComponent";
import EditPromptsButton from "@/app/components/EditPrompts/EditPromptsButton";
import EditPlayersButton from "@/app/components/EditPlayers/EditPlayersButton";
import LoadingScreen from "@/app/components/LoadingScreen";
import { PromptsListsProvider } from "./EditPrompts/PromptsLists";



export default function MainMenu() {
  const [truthReady, setTruthReady] = useState(false);
  const [dareReady, setDareReady] = useState(false);

  const isReady = truthReady && dareReady;

  return (
    <main className="relative w-full h-screen">
      {!isReady && <LoadingScreen />}
      <PromptsListsProvider>
        <TruthButton onReady={() => setTruthReady(true)} />
        <DareButton onReady={() => setDareReady(true)} />
        {isReady && (
          <div className="fixed top-4 left-4 flex gap-4 z-50">
            <EditPromptsButton />
            <EditPlayersButton />
          </div>
        )}
        {isReady && <OrComponent />}
      </PromptsListsProvider>
    </main>
  );
}
