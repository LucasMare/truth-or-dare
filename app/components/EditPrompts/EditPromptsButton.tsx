"use client";

import React, { useState } from "react";
import EditPromptsMenu from "./EditPromptsMenu";

export default function EditPromptsButton() {
  const [menuVisible, setMenuVisible] = useState(false);

  const handleClick = () => {
    setMenuVisible(true);
  };

  const handleClose = () => {
    setMenuVisible(false);
  };

  return (
    <>
      {/* 👇 Only show the button when the menu is hidden */}
      {!menuVisible && (
        <button
          onClick={handleClick}
          className=" cursor-pointer top-4 left-4 px-4 py-2 rounded-xl bg-white text-black font-semibold shadow-md transition duration-200 hover:bg-gray-200 hover:text-blue-600"
          style={{
            textShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)",
            zIndex: 50,
          }}
        >
          + Edit Prompts
        </button>
      )}

      {menuVisible && (
        <>
          {/* ⛱️ Backdrop */}
          <div
            className="fixed inset-0 z-60 pointer-events-auto backdrop-blur-sm"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent black
            }}
          />

          {/* ✉️ Menu */}
              <EditPromptsMenu onClose={handleClose} />
        </>
      )}
    </>
  );
}
