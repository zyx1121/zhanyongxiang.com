import useFadeOnScroll from "@/hook/fade-on-scroll";
import React, { Children, cloneElement, ReactElement } from "react";

interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Timeline({
  children,
  className = "",
  ...props
}: TimelineProps) {
  const items = Children.toArray(children) as ReactElement<TimelineItemProps>[];
  return (
    <div className={`relative px-4 ${className}`} {...props}>
      {items.map((child, index) =>
        cloneElement(child, {
          isLast: index === items.length - 1,
          key: index,
        })
      )}
    </div>
  );
}

interface TimelineItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isLast?: boolean;
  showLine?: boolean;
}

export function TimelineItem({
  children,
  className = "",
  isLast,
  showLine = false,
  ...props
}: TimelineItemProps) {
  const { ref, opacity } = useFadeOnScroll();
  return (
    <div
      ref={ref}
      className={`flex items-stretch ${className}`}
      {...props}
      style={{ opacity }}
    >
      <div className="flex flex-col items-center pt-2">
        <div className="bg-muted-foreground w-1 h-1 rounded-full" />
        {(!isLast || showLine) && (
          <div className="w-px bg-muted-foreground mt-2 flex-1" />
        )}
      </div>
      <div className="pb-8 pl-8">{children}</div>
    </div>
  );
}
