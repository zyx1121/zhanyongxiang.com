// app/page.tsx

"use client";

import { draggable } from "@/components/dnd";

export default function Main() {
  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center text-center">
      <draggable.div id="0">Hi! I’m 詹詠翔 from Taiwan</draggable.div>
      <draggable.div id="1">but you can also call me Loki</draggable.div>
      <br />
      <draggable.div id="2">I’m a university student at NTUST</draggable.div>
      <draggable.div id="3">
        majoring in Electronic and Computer Engineering
      </draggable.div>
      <br />
      <draggable.div id="4">
        I mainly work on network-related research
      </draggable.div>
      <draggable.div id="5">
        and also enjoy automation and building fun web apps with Next.js
      </draggable.div>
    </main>
  );
}
