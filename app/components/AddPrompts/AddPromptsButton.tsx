"use client";

import React, { useState } from "react";
import AddPromptsMenu from "./AddPromptsMenu";

export default function AddPromptsButton() {
    const [menuVisible, setMenuVisible] = useState(false);

    const handleClick = () => {
        setMenuVisible(true);
    };

    const handleClose = () => {
        setMenuVisible(false);
    };

    return (
        <>
            <button
                onClick={handleClick}
                className="fixed cursor-pointer top-4 left-4 px-4 py-2 rounded-xl bg-white text-black font-semibold shadow-md hover:bg-gray-100 transition duration-200 hover:bg-gray-200 hover:text-blue-600"
                style={{
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.4)", // adds a subtle drop shadow
                    zIndex: 50, // ensure it appears above other elements
                }}
            >
                + Add Prompts
            </button>
            {menuVisible && <AddPromptsMenu onClose={handleClose} />}
        </>
    );
}
