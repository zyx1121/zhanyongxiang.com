// components/footer.tsx

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-8 left-1/2 -translate-x-1/2">
      <div className="flex items-center gap-2">
        <Link href="https://github.com/zyx1121" target="_blank">
          <Button variant="link" className="text-sm text-muted-foreground p-0">
            Loki
          </Button>
        </Link>
        <span className="text-sm text-muted-foreground">2025</span>
      </div>
    </footer>
  );
}
