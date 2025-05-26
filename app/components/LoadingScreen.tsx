"use client";

import React from "react";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <span className="text-white text-3xl font-semibold">Loading..</span>
    </div>
  );
}
