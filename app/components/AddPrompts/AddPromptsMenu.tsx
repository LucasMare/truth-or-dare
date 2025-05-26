"use client";

import React from "react";

type AddPromptsMenuProps = {
    onClose: () => void;
};

export default function AddPromptsMenu({ onClose }: AddPromptsMenuProps) {

    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "50vw",
                height: "80vh",
                transform: "translate(-50%, -50%)",
                background: "white",
                color: "black",
                borderRadius: "12px",
                padding: "1rem",
                overflowY: "auto",
                zIndex: 60,
            }}
        >
            <button
                onClick={onClose}
                className="text-gray-600 hover:text-black font-bold px-3 py-1 cursor-pointer absolute"
                style={{
                    top: "4px",      // adjust closer to 0 if needed
                    right: "3px",    // adjust closer to 0 if needed
                    fontSize: "1rem",
                    position: "absolute",
                }}
            >
                ✕
            </button>


        </div>
    );
}
