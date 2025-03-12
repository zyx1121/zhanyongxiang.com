// app/changelog/page.tsx

"use client";

import { Timeline, TimelineItem } from "@/components/ui/timeline";

const changelog = [
  {
    date: "",
    content: "",
  },
  {
    date: "2024-11-13",
    content:
      "Directly admitted to the Master's Program (Practical Group) of the Institute of Computer Science and Engineering at National Yang Ming Chiao Tung University.",
  },
  {
    date: "2024-05-16",
    content: "Started an internship at Clounix.",
  },
  {
    date: "2021-09-01",
    content:
      "Enrolled in the Electronic and Computer Engineering program at National Taiwan University of Science and Technology.",
  },
  {
    date: "2020-11-27",
    content:
      "Won first place in the National Skills Competition for Industrial High School Students.",
  },
  {
    date: "2018-09-01",
    content:
      "Enrolled in the Department of Computer at National Yuanlin ChungShih Industrial Vocational High School.",
  },
  {
    date: "2002-11-21",
    content: "Born in Taiwan.",
  },
  {
    date: "",
    content: "",
  },
];

export default function Changelog() {
  return (
    <main className="w-dvw min-h-dvh flex flex-col items-center">
      <Timeline>
        {changelog.map((item, index) => (
          <TimelineItem key={item.date} showLine={true}>
            <h3 className="font-bold mb-2">{item.date}</h3>
            <p
              className={`max-w-2xl break-words ${
                index === changelog.length - 2
                  ? "pb-[30dvh]"
                  : index === 0
                  ? "pb-[35dvh] pt-[-10rem]"
                  : ""
              }
              `}
            >
              {item.content}
            </p>
          </TimelineItem>
        ))}
      </Timeline>
    </main>
  );
}
