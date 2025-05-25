"use client";
import { useState } from "react";

export default function TruthOrDareSpinner() {
  const [mode, setMode] = useState<"truth" | "dare" | "none">("none");
  const [result, setResult] = useState("");
  const [animating, setAnimating] = useState(false);
  const [fillingSide, setFillingSide] = useState<"truth" | "dare" | null>(null);

  const [truths, setTruths] = useState<string[]>([]);
  const [dares, setDares] = useState<string[]>([]);

  const [availableTruths, setAvailableTruths] = useState<string[]>([]);
  const [availableDares, setAvailableDares] = useState<string[]>([]);

  const [newInput, setNewInput] = useState("");
  const [showEditor, setShowEditor] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const addPrompt = () => {
    if (!newInput.trim()) return;
    const newPrompts = newInput
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    if (mode === "truth") {
      const updatedTruths = [...truths, ...newPrompts];
      setTruths(updatedTruths);
      setAvailableTruths((prev) => [...prev, ...newPrompts]);
    } else if (mode === "dare") {
      const updatedDares = [...dares, ...newPrompts];
      setDares(updatedDares);
      setAvailableDares((prev) => [...prev, ...newPrompts]);
    }
    setNewInput("");
  };

  const removePrompt = (index: number) => {
    if (mode === "truth") {
      const updated = [...truths];
      const removed = updated.splice(index, 1)[0];
      setTruths(updated);
      setAvailableTruths((prev) => prev.filter((t) => t !== removed));
    } else if (mode === "dare") {
      const updated = [...dares];
      const removed = updated.splice(index, 1)[0];
      setDares(updated);
      setAvailableDares((prev) => prev.filter((d) => d !== removed));
    }
  };

  const resetSinglePrompt = (prompt: string) => {
    if (mode === "truth") {
      if (!availableTruths.includes(prompt)) {
        setAvailableTruths((prev) => [...prev, prompt]);
      }
    } else if (mode === "dare") {
      if (!availableDares.includes(prompt)) {
        setAvailableDares((prev) => [...prev, prompt]);
      }
    }
  };

  const selectPrompt = (selectedMode: "truth" | "dare") => {
    if (showEditor || animating) return; // don't select if editor is open or already animating

    setMode(selectedMode);
    setResult("");
    setAnimating(true);
    setFillingSide(selectedMode);

    // After animation completes, show result
    setTimeout(() => {
      const pool = selectedMode === "truth" ? availableTruths : availableDares;
      if (pool.length === 0) {
        setResult("Add or reset some prompts first!");
      } else {
        const pick = pool[Math.floor(Math.random() * pool.length)];
        setResult(pick);

        if (selectedMode === "truth") {
          setAvailableTruths((prev) => prev.filter((t) => t !== pick));
        } else {
          setAvailableDares((prev) => prev.filter((d) => d !== pick));
        }
      }

      // Removed automatic reset here
    }, 600); // Animation duration
  };

  const resetPrompts = () => {
    setAvailableTruths([...truths]);
    setAvailableDares([...dares]);
    setResult("");
  };

  const deleteAllPrompts = () => {
    if (mode === "truth") {
      setTruths([]);
      setAvailableTruths([]);
    } else if (mode === "dare") {
      setDares([]);
      setAvailableDares([]);
    }
    setResult("");
  };

  const isPromptAvailable = (prompt: string) => {
    if (mode === "truth") {
      return availableTruths.includes(prompt);
    } else if (mode === "dare") {
      return availableDares.includes(prompt);
    }
    return false;
  };

  const filteredPrompts = (mode === "truth" ? truths : dares).filter((prompt) =>
    prompt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const changeMode = (newMode: "truth" | "dare") => {
    setMode(newMode);
    setNewInput("");
    setSearchTerm("");
  };

  // Reset main menu state to initial
  const resetMainMenuState = () => {
    setMode("none");
    setResult("");
    setAnimating(false);
    setFillingSide(null);
    setNewInput("");
    setSearchTerm("");
  };

  return (
    <div
      className="relative min-h-screen flex"
      style={{
        background: `linear-gradient(
          to bottom right,
          navy 45%,
          rgba(0, 0, 128, 0.8) 50%,
          rgba(220, 20, 60, 0.8) 50%,
          crimson 55%
        )`,
      }}
    >
      {/* Color Fill Overlay */}
      {animating && fillingSide && (
        <div
          className="absolute inset-0 z-10"
          style={{
            background: fillingSide === "truth" ? "navy" : "crimson",
            clipPath:
              fillingSide === "truth"
                ? "circle(150% at 25% 50%)"
                : "circle(150% at 75% 50%)",
            animation: "fillScreen 0.6s ease-in-out forwards",
          }}
        />
      )}

      {/* Opaque Result Popup */}
      {result && !showEditor && animating && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{
            background:
              fillingSide === "truth"
                ? "rgba(0, 0, 128, 0.0)" // Removed dark overlay (set transparent)
                : "rgba(220, 20, 60, 0.0)", // Removed dark overlay (set transparent)
          }}
        >
          <div className="max-w-lg bg-white rounded-lg shadow-2xl p-8 text-center text-2xl font-bold text-gray-800 mx-4">
            {result}
            <button
              onClick={() => {
                setAnimating(false);
                setFillingSide(null);
                setResult("");
              }}
              className="mt-6 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition font-semibold text-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit Prompts Button - Top Left */}
      <div className="absolute top-4 left-4 z-20">
        <button
          className="text-sm text-red-700 font-semibold border border-red-700 rounded px-3 py-1 bg-white bg-opacity-80 hover:bg-opacity-100 transition"
          onClick={() => {
            setShowEditor(true);
            resetMainMenuState();
          }}
        >
          Edit Prompts
        </button>
      </div>

     {/* Left Side - Truth */}
<div
  onClick={() => selectPrompt("truth")}
  className="cursor-pointer select-none"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    clipPath: "polygon(0 0, 100% 0, 0% 100%)",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-start", // shift text closer to left edge inside clip
    alignItems: "center",
    paddingLeft: "8vw", // move text inside so it doesn't get clipped
    zIndex: 15,
    opacity: animating && fillingSide === "dare" ? 0 : 1,
    transition: "opacity 0.3s ease",
    userSelect: "none",
  }}
>
  <div
    style={{
      transform: "rotate(-45deg)",
      color: "white",
      fontWeight: "900",
      fontSize: "10vw",
      fontFamily: "'Arial Black', Gadget, sans-serif",
      whiteSpace: "nowrap",
      userSelect: "none",
      textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      // added some margin to move it slightly right and down so it fits well
      marginLeft: "2vw",
      marginTop: "2vw",
    }}
  >
    TRUTH
  </div>
</div>

{/* Right Side - Dare */}
<div
  onClick={() => selectPrompt("dare")}
  className="cursor-pointer select-none"
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "flex-end", // shift text closer to right edge inside clip
    alignItems: "center",
    paddingRight: "8vw", // move text inside so it doesn't get clipped
    zIndex: 15,
    opacity: animating && fillingSide === "truth" ? 0 : 1,
    transition: "opacity 0.3s ease",
    userSelect: "none",
  }}
>
  <div
    style={{
      transform: "rotate(-45deg)",
      color: "white",
      fontWeight: "900",
      fontSize: "10vw",
      fontFamily: "'Arial Black', Gadget, sans-serif",
      whiteSpace: "nowrap",
      userSelect: "none",
      textShadow: "2px 2px 6px rgba(0,0,0,0.7)",
      marginRight: "2vw",
      marginTop: "2vw",
    }}
  >
    DARE
  </div>
</div>


      {/* Result Card - Only show when not animating */}
      {result && !showEditor && !animating && (
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            max-w-lg bg-white/90 border-2 border-pink-400 rounded p-6 text-center text-xl font-semibold text-red-700 z-30"
          style={{ userSelect: "text" }}
        >
          {result}
        </div>
      )}

      {/* Prompt Editor */}
      {showEditor && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-40 p-6">
          <div className="w-full max-w-md bg-white rounded shadow-lg p-4">
            <div className="flex gap-4 mb-4">
              <button
                className={`flex-grow py-2 rounded ${
                  mode === "truth"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } font-semibold`}
                onClick={() => changeMode("truth")}
              >
                Truths
              </button>
              <button
                className={`flex-grow py-2 rounded ${
                  mode === "dare"
                    ? "bg-pink-500 text-white"
                    : "bg-gray-200 text-gray-700"
                } font-semibold`}
                onClick={() => changeMode("dare")}
              >
                Dares
              </button>
            </div>

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search prompts..."
              className="w-full p-2 mb-2 rounded border border-pink-400 text-lg"
            />

            <textarea
              value={newInput}
              onChange={(e) => setNewInput(e.target.value)}
              placeholder={`Add one or more ${mode}s (each on a new line)...`}
              className="w-full p-2 rounded border border-pink-400 text-lg resize-none h-24 mb-2"
            />
            <button
              className="inline-flex items-center gap-1 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 font-semibold"
              onClick={addPrompt}
              disabled={mode === "none"}
            >
              ➕ Add
            </button>

            <ul className="space-y-2 max-h-48 overflow-y-auto mt-4">
              {filteredPrompts.map((prompt, index) => {
                const available = isPromptAvailable(prompt);
                return (
                  <li
                    key={index}
                    className={`flex justify-between items-center p-2 rounded ${
                      available ? "bg-green-200" : "bg-red-200"
                    }`}
                  >
                    <span>{prompt}</span>

                    <div className="flex gap-2">
                      <button
                        className="text-green-700 border border-green-700 hover:bg-green-100 rounded px-2"
                        onClick={() => resetSinglePrompt(prompt)}
                        title="Reset Prompt"
                      >
                        &#x21bb;
                      </button>

                      <button
                        className="text-red-500 hover:bg-red-200 rounded px-2"
                        onClick={() => removePrompt(index)}
                        title="Delete Prompt"
                      >
                        &#x1F5D1;
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <button
              className="mt-4 w-full py-2 border border-pink-400 text-pink-700 font-semibold rounded hover:bg-pink-100"
              onClick={resetPrompts}
            >
              Reset All Prompts
            </button>

            <button
              className="mt-2 w-full py-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
              onClick={deleteAllPrompts}
            >
              Delete All Prompts
            </button>

            <button
              className="mt-4 w-full py-2 text-center font-semibold text-gray-700 hover:text-red-700"
              onClick={() => {
                setShowEditor(false);
                resetMainMenuState();
              }}
            >
              Close Editor
            </button>
          </div>
        </div>
      )}

      <div style={{ animation: "fillScreen 0.6s ease-in-out forwards" }} />
    </div>
  );
}
