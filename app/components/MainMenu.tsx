"use client";

import React, { useState } from "react";
import TruthButton from "@/app/components/TruthButton";
import DareButton from "@/app/components/DareButton";
import OrComponent from "@/app/components/OrComponent";
import AddPromptsButton from "@/app/components/EditPrompts/EditPromptsButton";
import LoadingScreen from "@/app/components/LoadingScreen";

export default function MainMenu() {
  const [truthReady, setTruthReady] = useState(false);
  const [dareReady, setDareReady] = useState(false);

  const isReady = truthReady && dareReady;

  return (
    <main className="relative w-full h-screen">
      {!isReady && <LoadingScreen />}
      
      <TruthButton onReady={() => setTruthReady(true)} />
      <DareButton onReady={() => setDareReady(true)} />
      {isReady && <AddPromptsButton />}
      {isReady && <OrComponent />}
    </main>
  );
}
