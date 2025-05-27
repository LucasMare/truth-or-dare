import React, { useEffect, useRef, useState } from "react";
import { usePromptsLists } from "./PromptsLists";

type PromptsTableProps = {
  children?: React.ReactNode;
};

export default function TruthsPromptsTable({ children }: PromptsTableProps) {
  const { truths, setTruths } = usePromptsLists();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  // Track which item is hovered (store index or null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;

    const threshold = 2;

    setShowTopArrow(el.scrollTop > threshold);
    setShowBottomArrow(el.scrollTop + el.clientHeight < el.scrollHeight - threshold);
  };

  useEffect(() => {
    handleScroll();
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  const deleteTruth = (indexToDelete: number) => {
    setTruths(truths.filter((_, i) => i !== indexToDelete));
  };

  return (
    <div style={{ position: "relative", width: "50%", height: "63%", marginTop: "2rem" }}>
      {showTopArrow && <div style={arrowStyle("top")}>▲</div>}
      {showBottomArrow && <div style={arrowStyle("bottom")}>▼</div>}

      <div
        ref={containerRef}
        className="hide-scrollbar"
        style={{
          height: "100%",
          overflowY: "auto",
          borderRadius: "8px",
          padding: "1rem",
          background:
            "radial-gradient(circle at center,rgb(39, 83, 155) 0%,rgb(42, 89, 190) 40%, #1e40af 80%)",
          color: "white",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {truths.map((truth, index) => {
            const isHovered = hoveredIndex === index;
            return (
              <li
                key={index}
                style={{
                  position: "relative",
                  width: "97%",
                  margin: "0.4rem auto",
                  padding: "0.6rem 1rem",
                  paddingRight: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "12px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  wordWrap: "break-word",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: isHovered ? 0.6 : 1,
                  transition: "opacity 0.2s ease",
                  textShadow: "4px 4px 8px rgba(0, 0, 0, 0.6)", // adds a subtle drop shadow
                  borderWidth: "2px",
                  borderColor: "black",
                  borderStyle: truth.used ? "dashed" : "solid",
                }}
              >
                {truth.text}

                <button
                  onClick={() => deleteTruth(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    position: "absolute",
                    right: "8px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                    fontWeight: "bold",
                    fontSize: "16px",
                    lineHeight: "1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    userSelect: "none",
                    backgroundColor: "transparent", // Make trash can button transparent
                  }}
                  aria-label={`Delete truth: ${truth.text}`}
                >
                  🗑️
                </button>
              </li>
            );
          })}

        </ul>
        {children}
      </div>
    </div>
  );
}

const arrowStyle = (position: "top" | "bottom"): React.CSSProperties => ({
  position: "absolute",
  [position]: "4px",
  right: "2px",
  fontSize: "1.25rem",
  color: "white",
  opacity: 0.6,
  pointerEvents: "none",
  zIndex: 10,
});
