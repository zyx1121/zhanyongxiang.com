// components/dnd/provider.tsx

"use client";

import { DragStoreProvider, useDragStore } from "@/components/dnd/context";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { ReactNode } from "react";

function DraggableContextHandler({ children }: { children: ReactNode }) {
  const { updateOffset } = useDragStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    updateOffset(active.id.toString(), delta);
  }

  return <DndContext onDragEnd={handleDragEnd}>{children}</DndContext>;
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
