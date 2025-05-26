"use client";

import React from "react";

export default function AddPromptsButton() {
  const handleClick = () => {
    alert("Add Prompts clicked!");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-4 left-4 px-4 py-2 rounded-xl bg-white text-black font-semibold shadow-md hover:bg-gray-100 transition duration-200"
      style={{
        zIndex: 50, // ensure it appears above other elements
      }}
    >
      + Add Prompts
    </button>
  );
}
