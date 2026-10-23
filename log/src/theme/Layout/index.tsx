import type { ReactNode } from "react";
import { useLocation } from "@docusaurus/router";
import useBaseUrl from "@docusaurus/useBaseUrl";
import Layout from "@theme-original/Layout";
import type LayoutType from "@theme/Layout";
import type { WrapperProps } from "@docusaurus/types";
import site from "@site/../content/site.json";
import { PathBar } from "@site/src/components/PathBar";

type Props = WrapperProps<typeof LayoutType>;

// Every page starts with its path (sysp0.com/log/...). The index also gets the page heading.
export default function LayoutWrapper({ children, ...props }: Props): ReactNode {
  const { pathname } = useLocation();
  const home = useBaseUrl("/");
  const path = pathname.replace(/\/+$/, "") || "/log";
  const isIndex = pathname === home || pathname === home.replace(/\/$/, "");

  return (
    <Layout {...props}>
      <nav aria-label="Location">
        <PathBar path={path} />
      </nav>
      {isIndex && (
        <section className="sysp0-intro" aria-labelledby="log-title">
          <h1 id="log-title">{site.log.subtitle}</h1>
          <p>{site.log.intro}</p>
        </section>
      )}
      {children}
    </Layout>
  );
}
