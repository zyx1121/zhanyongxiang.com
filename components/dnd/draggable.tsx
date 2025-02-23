// components/dnd/draggable.tsx

"use client";

import { useDragStore } from "@/components/dnd/context";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

interface DraggableDivProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
}

export function DraggableDiv({
  id,
  children,
  style,
  ...props
}: DraggableDivProps) {
  const { offsets } = useDragStore();
  const offset = offsets[id] || { x: 0, y: 0 };
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
  const dragTransform = transform ? CSS.Translate.toString(transform) : "";
  const persistentTransform = `translate3d(${offset.x}px, ${offset.y}px, 0)`;
  const combinedStyle = {
    ...style,
    transform: `${persistentTransform} ${dragTransform}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      {...listeners}
      {...attributes}
      {...props}
    >
      {children}
    </div>
  );
}
