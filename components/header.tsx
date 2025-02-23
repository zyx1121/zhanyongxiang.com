// components/header.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

const links = [
  {
    href: "/",
    label: "README",
  },
  {
    href: "/changelog",
    label: "CHANGELOG",
  },
  {
    href: "/project",
    label: "PROJECT",
  },
  {
    href: "/stack",
    label: "STACK",
  },
];

export default function Header() {
  return (
    <header className="fixed top-8 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-8">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Button
              variant="link"
              className="text-sm text-muted-foreground p-0"
            >
              {link.label}
            </Button>
          </Link>
        ))}
      </div>
    </header>
  );
}
