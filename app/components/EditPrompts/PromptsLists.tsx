import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  ReactNode,
} from "react";

type PromptItem = {
  text: string;
  used: boolean;
};

type PromptsListsContextType = {
  dares: PromptItem[];
  truths: PromptItem[];
  setDares: (dares: PromptItem[]) => void;
  setTruths: (truths: PromptItem[]) => void;
};

const PromptsListsContext = createContext<PromptsListsContextType | undefined>(undefined);

export const PromptsListsProvider = ({ children }: { children: ReactNode }) => {
  const [dares, setDares] = useState<PromptItem[]>([]);
  const [truths, setTruths] = useState<PromptItem[]>([]);
  const isInitialMount = useRef(true);

  // Load from localStorage on first mount
  useEffect(() => {
    try {
      const storedDares = localStorage.getItem("dares");
      if (storedDares) {
        setDares(JSON.parse(storedDares));
      } else {
        setDares([
          { text: "Do 10 jumping jacks", used: false },
          { text: "Dance in front of everyone", used: true },
        ]);
      }
    } catch (e) {
      console.warn("Failed to parse dares from localStorage:", e);
      setDares([
        { text: "Do 10 jumping jacks", used: false },
        { text: "Dance in front of everyone", used: true },
      ]);
    }

    try {
      const storedTruths = localStorage.getItem("truths");
      if (storedTruths) {
        setTruths(JSON.parse(storedTruths));
      } else {
        setTruths([
          { text: "What's your biggest fear?", used: false },
          {
            text:
              "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
            used: true,
          },
        ]);
      }
    } catch (e) {
      console.warn("Failed to parse truths from localStorage:", e);
      setTruths([
        { text: "What's your biggest fear?", used: false },
        {
          text:
            "Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend? Have you ever lied to a friend?",
          used: true,
        },
      ]);
    }
  }, []);

  // Prevent saving immediately on first mount
  useEffect(() => {
    if (isInitialMount.current) return;
    localStorage.setItem("dares", JSON.stringify(dares));
  }, [dares]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem("truths", JSON.stringify(truths));
  }, [truths]);

  return (
    <PromptsListsContext.Provider value={{ dares, truths, setDares, setTruths }}>
      {children}
    </PromptsListsContext.Provider>
  );
};

export const usePromptsLists = () => {
  const context = useContext(PromptsListsContext);
  if (!context) {
    throw new Error("usePromptsLists must be used within a PromptsListsProvider");
  }
  return context;
};
