"use client";

import React from "react";
import { usePromptsLists } from "./PromptsLists";

type AddPromptsMenuProps = {
  onClose: () => void;
};

export default function AddPromptsMenu({ onClose }: AddPromptsMenuProps) {
  const { truths } = usePromptsLists();

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
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Add Prompts Menu</h2>
        <button onClick={onClose}>Close</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Truth</th>
          </tr>
        </thead>
        <tbody>
          {truths.map((truth, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{truth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
