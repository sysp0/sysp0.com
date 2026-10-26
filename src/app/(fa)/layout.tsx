import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { vazirmatn } from "@/lib/fonts/fa";
import { jetbrainsMono } from "@/lib/fonts/mono";
import { rootMetadata, rootViewport } from "@/lib/metadata";

export const metadata = rootMetadata("fa");
export const viewport = rootViewport;

// Persian root layout for the default home page and the existing /fa routes.
export default function FaRootLayout({ children }: LayoutProps<"/">) {
  return (
    <RootDocument locale="fa" fontClass={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      {children}
    </RootDocument>
  );
}
