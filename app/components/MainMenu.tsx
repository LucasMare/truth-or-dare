"use client";

import React, { useState } from "react";
import TruthButton from "@/app/components/TruthButton";
import DareButton from "@/app/components/DareButton";
import OrComponent from "@/app/components/OrComponent";

export default function MainMenu() {
  const [truthReady, setTruthReady] = useState(false);
  const [dareReady, setDareReady] = useState(false);

  return (
    <main className="relative w-full h-screen">
      <TruthButton onReady={() => setTruthReady(true)} />
      <DareButton onReady={() => setDareReady(true)} />
      {truthReady && dareReady && <OrComponent />}
    </main>
  );
}



