import type { ReactNode } from "react";
import site from "@site/../content/site.json";
import { Logo } from "@site/src/components/Brand";

const PATHS = ["/me", "/sys/me", "/lab", "/log"];
const LINKS = Object.entries(site.me.links).filter(([, href]) => href && href !== "TODO");

export default function Footer(): ReactNode {
  return (
    <footer className="sysp0-footer" dir="ltr">
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Logo tone="dark" />
        <p style={{ margin: 0, fontFamily: "var(--font-mono)", fontSize: "1.125rem" }}>
          There is always another <span style={{ color: "var(--orange-light)" }}>P0</span>.
        </p>
      </div>
      <div className="sysp0-footer__links">
        <p>
          {PATHS.map((p) => (
            <a key={p} href={p}>
              {p}
            </a>
          ))}
        </p>
        <p>
          {LINKS.map(([key, href]) => (
            <a key={key} href={key === "email" ? `mailto:${href}` : href} target={key === "email" ? undefined : "_blank"} rel="noreferrer">
              {key}
            </a>
          ))}
        </p>
        <p>{site.footer.copyright}</p>
      </div>
    </footer>
  );
}
