// components/dnd/context.tsx

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Offset = { x: number; y: number };

type DragStoreContextType = {
  offsets: { [key: string]: Offset };
  updateOffset: (id: string, delta: Offset) => void;
};

const DragStoreContext = createContext<DragStoreContextType | null>(null);

export function DragStoreProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<{ [key: string]: Offset }>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("dragOffsets");
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("dragOffsets", JSON.stringify(offsets));
    }
  }, [offsets, mounted]);

  const updateOffset = (id: string, delta: Offset) => {
    setOffsets((prev) => ({
      ...prev,
      [id]: {
        x: (prev[id]?.x || 0) + delta.x,
        y: (prev[id]?.y || 0) + delta.y,
      },
    }));
  };

  if (!mounted) {
    return null;
  }

  return (
    <DragStoreContext.Provider value={{ offsets, updateOffset }}>
      {children}
    </DragStoreContext.Provider>
  );
}

export function useDragStore() {
  const context = useContext(DragStoreContext);
  if (!context) {
    throw new Error("useDragStore must be used within a DragStoreProvider");
  }
  return context;
}
