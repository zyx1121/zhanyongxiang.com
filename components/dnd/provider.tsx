// components/dnd/provider.tsx

"use client";

import { DragStoreProvider, useDragStore } from "@/components/dnd/context";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ReactNode } from "react";

function DraggableContextHandler({ children }: { children: ReactNode }) {
  const { updateOffset, setActiveId } = useDragStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    updateOffset(active.id.toString(), delta);
    setActiveId(null);
  }

  function handleDragStart(event: any) {
    const { active } = event;
    setActiveId(active.id.toString());
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
}

export default function DraggableProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <DragStoreProvider>
      <DraggableContextHandler>{children}</DraggableContextHandler>
    </DragStoreProvider>
  );
}
