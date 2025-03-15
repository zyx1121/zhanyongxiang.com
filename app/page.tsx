// app/page.tsx

"use client";

import { draggable } from "@/components/dnd";
import { Badge } from "@/components/ui/badge";
import { Cursors, init } from "@instantdb/react";

const db = init({
  appId: "ad6ce41f-5eb0-47c0-800c-93ac6f64301c",
});

const room = db.room("cursors", "1121");

const userId = Math.random().toString(36).slice(2, 6);

export default function Main() {
  db.rooms.useSyncPresence(room, {
    name: userId,
  });

  return (
    <Cursors
      room={room}
      renderCursor={(props) => (
        <Badge variant="outline" className="bg-background/20 backdrop-blur-sm">
          {props.presence.name}
        </Badge>
      )}
      className="w-screen h-screen flex flex-col items-center justify-center overflow-hidden px-4 text-sm md:text-base"
    >
      <draggable.div id="0" className="text-center max-w-full">
        Hi! I’m 詹詠翔 from Taiwan
      </draggable.div>
      <draggable.div id="1" className="text-center max-w-full">
        but you can also call me Loki
      </draggable.div>
      <br />
      <draggable.div id="2" className="text-center max-w-full">
        I’m a university student at NTUST
      </draggable.div>
      <draggable.div id="3" className="text-center max-w-full">
        majoring in Electronic and Computer Engineering
      </draggable.div>
      <br />
      <draggable.div id="4" className="text-center max-w-full">
        I mainly work on network-related research
      </draggable.div>
      <draggable.div id="5" className="text-center max-w-full">
        and also enjoy automation and building fun web apps with Next.js
      </draggable.div>
    </Cursors>
  );
}
