"use client";

import React from "react";

type AddPromptsMenuProps = {
    onClose: () => void;
};

export default function AddPromptsMenu({ onClose }: AddPromptsMenuProps) {
    return (
        <div
            className="fixed top-1/2 left-1/2 bg-white text-black rounded-xl shadow-2xl flex items-center justify-center"
            style={{
                width: "50vw",
                height: "80vh",
                transform: "translate(-50%, -50%)",
                zIndex: 60,
            }}
        >
            <div className="text-2xl font-bold">
                Add Prompts Menu
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-black text-sm bg-gray-200 rounded px-2 py-1 hover:bg-gray-300 cursor-pointer"
                    style={{
                        fontSize: "1rem",
                        textShadow: "4px 4px 8px rgba(0, 0, 0, 0.2)", // adds a subtle drop shadow
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
