"use client";

import React from "react";
import TruthsPromptsTable from "./TruthsPromptsTable";
import DaresPromptsTable from "./DaresPromptsTable";
import AddPromptsBox from "./AddPromptsBox";
import RefreshAllButton from "./RefreshAllButton";
import DeleteAllTruths from "./DeleteAllTruths";
import DeleteAllDares from "./DeleteAllDares";

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
            {/* ❌ Close Button */}
            <button
                onClick={onClose}
                className="text-white hover:text-black font-bold px-3 py-1 cursor-pointer absolute"
                style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "transparent",
                    border: "none",
                    fontSize: "1rem", // Match visual size of the ✕
                    fontWeight: "bold",
                    cursor: "pointer",
                    lineHeight: "1",
                    padding: "0.25rem", // Optional: gives a larger hit area without affecting layout
                    display: "inline-block", // Prevents collapse, ensures the area wraps around content
                    zIndex: 1000,
                    
                }}
            >
                ✕
            </button>


            {/* Centered heading */}
            <h2
                style={{
                    position: "absolute",
                    top: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    margin: 0,
                    fontSize: "2rem",
                    color: "white",
                    fontWeight: "bold",
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
                }}
            >
                Edit Prompts
            </h2>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    paddingTop: "1rem",
                    boxSizing: "border-box",
                }}
            >
                {/* top container: tables */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "1rem",
                        height: "63%",
                    }}
                >
                    <TruthsPromptsTable />
                    <DaresPromptsTable />
                </div>

                {/* bottom container: add prompts */}
                <div style={{ height: "30%" }}>
                    <AddPromptsBox />
                </div>
                <div style={{ height: "7%" }}>
                    <RefreshAllButton />
                    <DeleteAllTruths />
                    <DeleteAllDares />
                </div>
            </div>
        </div>
    );
}
