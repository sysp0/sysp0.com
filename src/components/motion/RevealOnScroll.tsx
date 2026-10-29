"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Marks every [data-reveal] element with data-visible once it scrolls into view (see globals.css).
export function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-visible", "");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    targets.forEach((t) => observer.observe(t));
    document.documentElement.classList.add("reveal-ready");
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
