"use client";

import React, { useState } from "react";
import TruthButton from "./TruthButton";
import DareButton from "./DareButton";
import OrComponent from "./OrComponent";
import AddPromptsButton from "./AddPrompts/AddPromptsButton";

export default function MainMenu() {
  const [truthReady, setTruthReady] = useState(false);
  const [dareReady, setDareReady] = useState(false);

  return (
    <main className="relative w-full h-screen">
      <TruthButton onReady={() => setTruthReady(true)} />
      <DareButton onReady={() => setDareReady(true)} />
      {truthReady && dareReady && <AddPromptsButton />}
      {truthReady && dareReady && <OrComponent />}
    </main>
  );
}



