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
  const pendingIndex = useRef<number | null>(null);

  // Load from localStorage
  useEffect(() => {
    try {
      const storedPlayers = localStorage.getItem("players");
      const storedIndex = localStorage.getItem("currentTurnIndex");

      if (storedPlayers) {
        const parsedPlayers = JSON.parse(storedPlayers);
        setPlayers(parsedPlayers);

        // Store index to apply after players load
        pendingIndex.current = storedIndex ? parseInt(storedIndex) : 0;
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

  // Once players are loaded, apply stored index if available
  useEffect(() => {
    if (players.length && pendingIndex.current !== null) {
      const safeIndex = Math.min(pendingIndex.current, players.length - 1);
      setCurrentTurnIndex(safeIndex);
      pendingIndex.current = null;
    }
  }, [players]);

  // Ensure index remains in bounds when players change
  useEffect(() => {
    if (players.length === 0) {
      setCurrentTurnIndex(0);
    } else if (currentTurnIndex >= players.length) {
      setCurrentTurnIndex(players.length - 1);
    }
  }, [players, currentTurnIndex]);

  // Save players & turn index to localStorage
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
        setCurrentTurnIndex,
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
