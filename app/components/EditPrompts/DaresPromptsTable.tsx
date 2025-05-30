import React, { useEffect, useRef, useState } from "react";
import { usePromptsLists } from "./PromptsLists";

type PromptsTableProps = {
  children?: React.ReactNode;
};

export default function DaresPromptsTable({ children }: PromptsTableProps) {
  const { dares, setDares } = usePromptsLists();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);
  const [hoveredTrashIndex, setHoveredTrashIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const deleteDare = (indexToDelete: number) => {
    setDares(dares.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div style={{ position: "relative", width: "50%", height: "100%", paddingTop: "2.5rem" }}>
      <div
        ref={containerRef}
        className="hide-scrollbar"
        style={{
          height: "100%",
          overflowY: "auto",
          borderRadius: "8px",
          padding: "1rem",
          background:
            "radial-gradient(circle at center, rgb(220, 20, 60) 0%, rgb(194, 68, 68) 40%, rgb(139, 0, 0) 80%, rgb(116, 7, 7) 90%)",
          color: "white",
          borderWidth: "3px",
          borderColor: "rgb(59, 11, 11)",
        }}
      >
        {dares.length === 0 ? (
          <>
            <span
              style={{
                color: "white",
                fontSize: "1rem",
                fontStyle: "italic",
                display: "block",
                textAlign: "center",
                marginTop: "1rem",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
              }}
            >
              No dares available
            </span>
            {children}
          </>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {dares.map((dare, index) => (
                <li
                  key={index}
                  style={{
                    width: "97%",
                    margin: "0.4rem auto",
                    padding: "0.6rem 1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                    wordWrap: "break-word",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    transition: "border 0.2s ease",
                    opacity: hoveredTrashIndex === index ? 0.6 : 1,
                    textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)",
                    borderWidth: "2px",
                    borderColor: "black",
                    borderStyle:
                      dare.used
                        ? hoveredIndex === index
                          ? "solid"
                          : "dashed"
                        : "solid",
                  }}
                >
                  {/* Reset Button */}
                  <button
                    onClick={() => {
                      const updatedDares = dares.map((d, i) =>
                        i === index ? { ...d, used: false } : d
                      );
                      setDares(updatedDares);
                    }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: "transparent",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      padding: 0,
                      marginRight: "0.8rem",
                    }}
                    aria-label={`Reset dare: ${dare.text}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="white">
                      <path d="M27.1 14.313V5.396L24.158 8.34c-2.33-2.325-5.033-3.503-8.11-3.503C9.902 4.837 4.901 9.847 4.899 16c.001 6.152 5.003 11.158 11.15 11.16 4.276 0 9.369-2.227 10.836-8.478l.028-.122h-3.23l-.022.068c-1.078 3.242-4.138 5.421-7.613 5.421a8 8 0 0 1-5.691-2.359A7.993 7.993 0 0 1 8 16.001c0-4.438 3.611-8.049 8.05-8.049 2.069 0 3.638.58 5.924 2.573l-3.792 3.789H27.1z" />
                    </svg>
                  </button>

                  {/* Dare Text */}
                  <span style={{ flex: 1, textAlign: "center" }}>{dare.text}</span>

                  {/* Trash Button */}
                  <button
                    onClick={() => deleteDare(index)}
                    onMouseEnter={() => setHoveredTrashIndex(index)}
                    onMouseLeave={() => setHoveredTrashIndex(null)}
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      userSelect: "none",
                      backgroundColor: "transparent",
                      padding: 0,
                      marginLeft: "0.8rem",
                    }}
                    aria-label={`Delete dare: ${dare.text}`}
                  >
                    <svg
                      fill="white"
                      width="20px"
                      height="20px"
                      viewBox="-6.7 0 122.88 122.88"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.347,9.633h38.297V3.76c0-2.068,1.689-3.76,3.76-3.76h21.144
                  c2.07,0,3.76,1.691,3.76,3.76v5.874h37.83c1.293,0,2.347,1.057,2.347,2.349v11.514H0V11.982C0,10.69,1.055,9.633,2.347,9.633
                  L2.347,9.633z M8.69,29.605h92.921c1.937,0,3.696,1.599,3.521,3.524l-7.864,86.229c-0.174,1.926-1.59,3.521-3.523,3.521h-77.3
                  c-1.934,0-3.352-1.592-3.524-3.521L5.166,33.129C4.994,31.197,6.751,29.605,8.69,29.605L8.69,29.605z M69.077,42.998h9.866v65.314
                  h-9.866V42.998L69.077,42.998z M30.072,42.998h9.867v65.314h-9.867V42.998L30.072,42.998z M49.572,42.998h9.869v65.314h-9.869
                  V42.998L49.572,42.998z"
                      />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            {children}
          </>
        )}
      </div>
    </div>
  );
}