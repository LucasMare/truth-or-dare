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
  setPlayers: (players: string[]) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const PlayersProvider = ({ children }: { children: ReactNode }) => {
  const [players, setPlayers] = useState<string[]>([]);
  const isInitialMount = useRef(true);

  // Load players from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("players");
      if (stored) {
        setPlayers(JSON.parse(stored));
      } else {
        setPlayers(["Player 1", "Player 2"]);
      }
    } catch (e) {
      console.warn("Failed to load players from localStorage", e);
      setPlayers(["Player 1", "Player 2"]);
    }
  }, []);

  // Save to localStorage after initial mount
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  return (
    <PlayersContext.Provider value={{ players, setPlayers }}>
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
