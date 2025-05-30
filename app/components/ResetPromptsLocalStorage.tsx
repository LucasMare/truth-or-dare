import React from "react";

const ResetLocalStorageButton = () => {
  const handleReset = () => {
    localStorage.removeItem("dares");
    localStorage.removeItem("truths");
    window.location.reload(); // Optional: refresh to reflect reset state
  };

  return (
    <button
      onClick={handleReset}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        padding: "10px 16px",
        backgroundColor: "#ff4d4f",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 9999,
      }}
    >
      Reset App Storage
    </button>
  );
};

export default ResetLocalStorageButton;
