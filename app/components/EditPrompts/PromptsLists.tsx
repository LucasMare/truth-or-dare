import React, { createContext, useContext, useState, ReactNode } from 'react';

type PromptsListsContextType = {
  dares: string[];
  truths: string[];
  setDares: (dares: string[]) => void;
  setTruths: (truths: string[]) => void;
};

const PromptsListsContext = createContext<PromptsListsContextType | undefined>(undefined);

export const PromptsListsProvider = ({ children }: { children: ReactNode }) => {
  const [dares, setDares] = useState<string[]>([
    "Do 10 jumping jacks",
    "Dance in front of everyone ",
  ]);
  const [truths, setTruths] = useState<string[]>([
    "What's your biggest fear?",
    "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
    "What's your biggest fear?",
    "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
    "What's your biggest fear?",
    "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
    "What's your biggest fear?",
    "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
    "What's your biggest fear?",
  ]);

  return (
    <PromptsListsContext.Provider value={{ dares, truths, setDares, setTruths }}>
      {children}
    </PromptsListsContext.Provider>
  );
};

export const usePromptsLists = () => {
  const context = useContext(PromptsListsContext);
  if (!context) {
    throw new Error("useGameLists must be used within a GameListsProvider");
  }
  return context;
};
