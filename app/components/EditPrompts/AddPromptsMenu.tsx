"use client";

import React from "react";
import TruthsPromptsTable from "./TruthsPromptsTable"; // adjust path as needed
import ResetLocalStorageButton from "../ResetPromptsLocalStorage";

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
                    top: "4px",
                    right: "3px",
                    fontSize: "1rem",
                    position: "absolute",
                }}
            >
                ✕
            </button>
            <ResetLocalStorageButton />
            {/* Prompts Table below the close button */}
            <TruthsPromptsTable />
        </div>
    );
}
