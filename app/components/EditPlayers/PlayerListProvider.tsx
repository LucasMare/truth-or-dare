// app/components/EditPlayers/PlayersContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

type PlayersContextType = {
  players: string[];
  setPlayers: React.Dispatch<React.SetStateAction<string[]>>;
  currentTurnIndex: number;
  setCurrentTurnIndex: React.Dispatch<React.SetStateAction<number>>;
  nextTurn: () => void;
};


const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const [currentTurnIndex, setCurrentTurnIndex] = useState<number>(0);
  const isInitialMount = useRef(true);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedPlayers = localStorage.getItem("players");
      const storedIndex = localStorage.getItem("currentTurnIndex");

      if (storedPlayers) {
        setPlayers(JSON.parse(storedPlayers));
        setCurrentTurnIndex(storedIndex ? parseInt(storedIndex) : 0);
      } else {
        setPlayers(["Player 1", "Player 2"]);
        setCurrentTurnIndex(0);
      }
    } catch (e) {
      console.warn("Failed to load from localStorage", e);
      setPlayers(["Player 1", "Player 2"]);
      setCurrentTurnIndex(0);
    }
  }, []);

  useEffect(() => {
    if (players.length === 0) {
      setCurrentTurnIndex(0);
    } else if (currentTurnIndex >= players.length) {
      setCurrentTurnIndex(players.length - 1);
    }
  }, [players, currentTurnIndex]);

  // Save players & turn index
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("players", JSON.stringify(players));
    localStorage.setItem("currentTurnIndex", currentTurnIndex.toString());
  }, [players, currentTurnIndex]);

  const nextTurn = () => {
    setCurrentTurnIndex((prev) =>
      players.length === 0 ? 0 : (prev + 1) % players.length
    );
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        currentTurnIndex,
        setCurrentTurnIndex, // added here
        nextTurn,
      }}
    >
      {children}
    </PlayersContext.Provider>
  );
};

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (!context) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};