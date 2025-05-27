import React, { useEffect, useRef, useState } from "react";
import { usePromptsLists } from "./PromptsLists";

type PromptsTableProps = {
  children?: React.ReactNode;
};

export default function TruthsPromptsTable({ children }: PromptsTableProps) {
  const { truths } = usePromptsLists();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showTopArrow, setShowTopArrow] = useState(false);
  const [showBottomArrow, setShowBottomArrow] = useState(false);

  const handleScroll = () => {
  const el = containerRef.current;
  if (!el) return;

  const threshold = 2; // pixels of error margin

  setShowTopArrow(el.scrollTop > threshold);
  setShowBottomArrow(el.scrollTop + el.clientHeight < el.scrollHeight - threshold);
};

  useEffect(() => {
    handleScroll(); // initialize on mount
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ position: "relative", width: "50%", height: "63%", marginTop: "2rem" }}>
      {/* Top Indicator */}
      {showTopArrow && (
        <div style={arrowStyle("top")}>
          ▲
        </div>
      )}

      {/* Bottom Indicator */}
      {showBottomArrow && (
        <div style={arrowStyle("bottom")}>
          ▼
        </div>
      )}

      {/* Scrollable List */}
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
          {truths.map((truth, index) => (
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
                textAlign: "center",
              }}
            >
              {truth}
            </li>
          ))}
        </ul>
        {children}
      </div>
    </div>
  );
}

const arrowStyle = (position: "top" | "bottom"): React.CSSProperties => ({
  position: "absolute",
  [position]: "4px",
  right: "2px",          // Move arrow to the right side with some padding
  fontSize: "1.25rem",
  color: "white",
  opacity: 0.6,
  pointerEvents: "none",
  zIndex: 10,
});

