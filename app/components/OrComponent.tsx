"use client";

import React from "react";

export default function OrComponent() {
  return (
    <div
      className="fixed top-1/2 left-1/2 flex items-center justify-center"
      style={{
        transform: "translate(-50%, -50%)",
        width: "6rem",
        height: "6rem",
        borderRadius: "50%",
        backgroundColor: "black",
        cursor: "default",
        userSelect: "none",
        boxShadow: "0 0 10px rgba(0,0,0,0.7)",
      }}
    >
      <span
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "3rem",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          textShadow: "1px 1px 2px white",
          marginTop: "-0.3rem",  // Push text up by 0.3rem
        }}
      >
        OR
      </span>
    </div>
  );
}
