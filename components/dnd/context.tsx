// components/dnd/context.tsx

"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Offset = { x: number; y: number };

type DragStoreContextType = {
  offsets: { [key: string]: Offset };
  zIndexes: { [key: string]: number };
  activeId: string | null;
  updateOffset: (id: string, delta: Offset) => void;
  setActiveId: (id: string | null) => void;
  setRandomOffset: (id: string) => void;
};

const DragStoreContext = createContext<DragStoreContextType | null>(null);

// 生成隨機偏移的函數
function generateRandomOffset(): Offset {
  // 根據需要調整範圍
  const maxX = typeof window !== "undefined" ? window.innerWidth * 0.5 : 0;
  const maxY = typeof window !== "undefined" ? window.innerHeight * 0.5 : 0;

  return {
    x: Math.floor(Math.random() * maxX) - maxX / 2,
    y: Math.floor(Math.random() * maxY) - maxY / 2,
  };
}

export function DragStoreProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [offsets, setOffsets] = useState<{ [key: string]: Offset }>({});
  const [zIndexes, setZIndexes] = useState<{ [key: string]: number }>({});
  const [activeId, setActiveId] = useState<string | null>(null);
  const maxZIndexRef = useRef(0); // 使用 useRef 而不是 useState

  useEffect(() => {
    setMounted(true);
  }, []);

  // 修改 activeId 變更時的處理邏輯
  useEffect(() => {
    if (activeId) {
      const newZIndex = maxZIndexRef.current + 1;
      maxZIndexRef.current = newZIndex; // 更新 ref 值

      setZIndexes((prev) => ({
        ...prev,
        [activeId]: newZIndex,
      }));
    }
  }, [activeId]); // 移除 maxZIndex 依賴

  const updateOffset = (id: string, delta: Offset) => {
    setOffsets((prev) => ({
      ...prev,
      [id]: {
        x: (prev[id]?.x || 0) + delta.x,
        y: (prev[id]?.y || 0) + delta.y,
      },
    }));
  };

  // 設置隨機偏移的函數
  const setRandomOffset = (id: string) => {
    if (typeof window !== "undefined") {
      const randomOffset = generateRandomOffset();
      setOffsets((prev) => {
        // 只有當該 ID 沒有偏移時才設置
        if (!prev[id]) {
          return {
            ...prev,
            [id]: randomOffset,
          };
        }
        return prev;
      });
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <DragStoreContext.Provider
      value={{
        offsets,
        zIndexes,
        activeId,
        updateOffset,
        setActiveId,
        setRandomOffset,
      }}
    >
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
