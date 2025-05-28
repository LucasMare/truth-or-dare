"use client";

import React from "react";
import TruthsPromptsTable from "./TruthsPromptsTable";
import DaresPromptsTable from "./DaresPromptsTable";
import ResetLocalStorageButton from "../ResetPromptsLocalStorage";

type EditPromptsMenuProps = {
    onClose: () => void;
};

export default function EditPromptsMenu({ onClose }: EditPromptsMenuProps) {
    return (
        <div
            style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                width: "55vw",
                height: "80vh",
                transform: "translate(-50%, -50%)",
                background: "linear-gradient(to right, #3b82f6 0%, #ef4444 100%)",
                color: "black",
                borderRadius: "12px",
                padding: "0rem 1rem 1rem 1rem",
                overflow: "hidden",
                zIndex: 60,
                display: "flex",
                flexDirection: "column",
            }}
        >
            <button
                onClick={onClose}
                className="text-white hover:text-black font-bold px-3 py-1 cursor-pointer absolute"
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

            {/* Side-by-side container */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    height: "100%",
                    marginTop: "1rem",
                }}
            >
                <TruthsPromptsTable />
                <DaresPromptsTable />
            </div>
        </div>
    );
}
