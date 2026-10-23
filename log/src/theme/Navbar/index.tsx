import type { ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import SearchBar from "@theme/SearchBar";
import { Logo } from "@site/src/components/Brand";

// Same header as the main site: logo and the four paths. The first three leave Docusaurus, so they are plain links.
const SITE_PATHS = ["/me", "/sys/me", "/lab"];

// The `navbar` class on the header is needed: Docusaurus hooks (sticky table of contents) measure `.navbar`.
export default function Navbar(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();
  const researchPath = useBaseUrl("/research");
  const inResearch = pathname.startsWith(researchPath);
  const hasResearch = Boolean(siteConfig.customFields?.hasResearch);

  return (
    <header className="navbar sysp0-header">
      <a href="/" aria-label="sysp0.com home">
        <Logo />
      </a>
      <div className="sysp0-header__right">
        <nav className="sysp0-nav" dir="ltr" aria-label="Main">
          {SITE_PATHS.map((path) => (
            <a key={path} href={path}>
              {path}
            </a>
          ))}
          <Link to="/" aria-current={inResearch ? undefined : "page"}>
            /log
          </Link>
          {hasResearch && (
            <Link to="/research" aria-current={inResearch ? "page" : undefined}>
              /research
            </Link>
          )}
        </nav>
        <SearchBar />
      </div>
    </header>
  );
}
