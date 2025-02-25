import { useEffect, useRef, useState } from "react";

function useFadeOnScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const elementHead = rect.top - rect.height / 10;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(viewportCenter - elementHead);
        const threshold = window.innerHeight / 2;
        const newOpacity = Math.max(0.2, 1 - distance / threshold);
        setOpacity(newOpacity);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { ref, opacity };
}

export default useFadeOnScroll;
