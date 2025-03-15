import { draggable } from "@/components/dnd";
import { LucideArrowUpRight } from "lucide-react";
import Link from "next/link";

type Project = {
  title: string;
  description: string;
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    title: "Notepad",
    description: "",
    image: "project_notepad.webp",
    link: "https://notepad.zhanyongxiang.com",
  },
  {
    title: "Meet",
    description: "",
    image: "  project_meet.webp",
    link: "https://meet.zhanyongxiang.com",
  },
  {
    title: "Minesweeper",
    description: "",
    image: "project_minesweeper.webp",
    link: "https://minesweeper.zhanyongxiang.com",
  },
  {
    title: "Task",
    description: "",
    image: "project_task.webp",
    link: "https://task.zhanyongxiang.com",
  },
  {
    title: "Jenkins Terminal",
    description: "",
    image: "project_jenkins_terminal.webp",
    link: "https://pypi.org/project/jenkins-terminal",
  },
  {
    title: "FindMy API",
    description: "API for FindMy",
    image: "",
    link: "https://github.com/zyx1121/findmy-api",
  },
  {
    title: "mmWave Radar AI Gesture Recognition",
    description: "Gesture Recognition Using mmWave Sensor - TI AWR1642",
    image: "",
    link: "https://github.com/zyx1121/mmwave-gesture-recognition",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <draggable.div
      randomOffset={true}
      slideIn={true}
      id={project.title}
      className="fixed max-w-lg w-8/10 md:w-lg h-auto"
    >
      <div className="w-full h-full rounded-lg p-4 border hover:border-primary/20 bg-background/20 backdrop-blur-sm transition-all duration-300 hover:scale-102">
        <div className="flex flex-row items-center justify-between w-full mb-2">
          <h1 className="text-sm md:text-lg">{project.title}</h1>
          <Link
            className="hover:font-bold hover:scale-130 transition-all duration-300"
            href={project.link}
            target="_blank"
          >
            <LucideArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {project.description && (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        )}
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="rounded-lg object-cover"
            draggable="false"
            loading="eager"
            fetchPriority="high"
          />
        )}
      </div>
    </draggable.div>
  );
}

export default function Project() {
  return (
    <main className="w-dvw min-h-dvh flex flex-col items-center justify-center gap-4 p-4">
      {projects.map((project) => (
        <ProjectCard key={project.title} project={project} />
      ))}
    </main>
  );
}
