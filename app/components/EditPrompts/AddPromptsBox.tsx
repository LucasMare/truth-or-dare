import React, { useRef } from "react";
import { usePromptsLists } from "./PromptsLists"; // Adjust the import path as needed

export default function AddPromptsBox() {
    const { truths, setTruths, dares, setDares } = usePromptsLists();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleAddTruth = () => {
        const rawText = textareaRef.current?.value || "";
        const lines = rawText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        if (lines.length === 0) {
            return;
        }

        const newPrompts = lines.map((text) => ({ text, used: false }));
        setTruths([...truths, ...newPrompts]);

        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
    };

    const handleAddDare = () => {
        const rawText = textareaRef.current?.value || "";
        const lines = rawText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);

        if (lines.length === 0) return;

        const newPrompts = lines.map((text) => ({ text, used: false }));
        setDares([...dares, ...newPrompts]);

        if (textareaRef.current) {
            textareaRef.current.value = "";
        }
    };


    const handleClick = () => {
        alert("Right button clicked!");
    };

    return (
        <div style={{ position: "relative", width: "100%", height: "100%", paddingTop: "1rem" }}>
            <textarea
                ref={textareaRef}
                placeholder="Enter your new prompts here..."
                className="hide-scrollbar"
                style={{
                    width: "100%",
                    height: "100%",
                    resize: "none",
                    padding: "0.5rem",
                    fontSize: "1rem",
                    borderRadius: "8px",
                    boxSizing: "border-box",
                    backgroundColor: "rgba(255, 255, 255, 0.35)",
                    borderColor: "rgb(41, 39, 39)",
                    borderWidth: "3px",
                    outline: "none",
                    color: "white",
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
                }}
            />

            {/* Right button - original functionality */}
            <button
                onClick={handleAddDare}
                style={{
                    position: "absolute",
                    bottom: "7px",
                    right: "7px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
            >

                {/* Red SVG */}
                <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#ad1109" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <g opacity="1">
                        <path d="M9 9.50977L12 6.50977L15 9.50977" stroke="#ad1109" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6.50977V14.5098" stroke="#ad1109" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <path opacity="1" d="M6 16.5098C9.89 17.8098 14.11 17.8098 18 16.5098" stroke="#ad1109" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            {/* Left button - adds to truths */}
            <button
                onClick={handleAddTruth}
                style={{
                    position: "absolute",
                    bottom: "7px",
                    right: "52px",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                }}
            >
                {/* Blue SVG */}
                <svg width="42px" height="42px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#123ea6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <g opacity="1">
                        <path d="M9 9.50977L12 6.50977L15 9.50977" stroke="#123ea6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 6.50977V14.5098" stroke="#123ea6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                    <path opacity="1" d="M6 16.5098C9.89 17.8098 14.11 17.8098 18 16.5098" stroke="#123ea6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
        </div>
    );
}
