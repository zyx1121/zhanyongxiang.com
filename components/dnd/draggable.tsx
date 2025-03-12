// components/dnd/draggable.tsx

"use client";

import { useDragStore } from "@/components/dnd/context";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useEffect, useState } from "react";

interface DraggableDivProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: React.ReactNode;
  randomOffset?: boolean;
  slideIn?: boolean;
}

export function DraggableDiv({
  id,
  children,
  style,
  randomOffset = false,
  slideIn = false,
  ...props
}: DraggableDivProps) {
  const { offsets, zIndexes, setActiveId, setRandomOffset } = useDragStore();
  const offset = offsets[id] || { x: 0, y: 0 };
  const zIndex = zIndexes[id] || 0;
  const [isAnimating, setIsAnimating] = useState(slideIn);
  const [initialPosition, setInitialPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (slideIn && !initialPosition) {
      const directions = ["top", "right", "bottom", "left"];
      const direction =
        directions[Math.floor(Math.random() * directions.length)];

      let x = 0;
      let y = 0;

      if (direction === "top") {
        y = -2000;
        x = Math.random() * window.innerWidth - window.innerWidth / 2;
      } else if (direction === "right") {
        x = 2000;
        y = Math.random() * window.innerHeight - window.innerHeight / 2;
      } else if (direction === "bottom") {
        y = 2000;
        x = Math.random() * window.innerWidth - window.innerWidth / 2;
      } else if (direction === "left") {
        x = -2000;
        y = Math.random() * window.innerHeight - window.innerHeight / 2;
      }

      setInitialPosition({ x, y });

      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }
  }, [slideIn, initialPosition]);

  useEffect(() => {
    if (randomOffset && !offsets[id]) {
      setRandomOffset(id);
    }
  }, [id, randomOffset, offsets, setRandomOffset]);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: { id },
    });

  useEffect(() => {
    if (isDragging) {
      setActiveId(id);
    }
  }, [isDragging, id, setActiveId]);

  const dragTransform = transform ? CSS.Translate.toString(transform) : "";

  const persistentTransform =
    isAnimating && initialPosition
      ? `translate3d(${initialPosition.x}px, ${initialPosition.y}px, 0)`
      : `translate3d(${offset.x}px, ${offset.y}px, 0)`;

  const combinedStyle = {
    ...style,
    cursor: "grab",
    transform: `${persistentTransform} ${dragTransform}`,
    zIndex: zIndex,
    transition: isAnimating
      ? "none"
      : "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
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
