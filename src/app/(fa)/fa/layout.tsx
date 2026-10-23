import "../../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { vazirmatn } from "@/lib/fonts/fa";
import { jetbrainsMono } from "@/lib/fonts/mono";
import { rootMetadata, rootViewport } from "@/lib/metadata";

export const metadata = rootMetadata("fa");
export const viewport = rootViewport;

// Second root layout: <html lang="fa" dir="rtl"> with Vazirmatn. Everything under /fa uses it.
export default function FaRootLayout({ children }: LayoutProps<"/fa">) {
  return (
    <RootDocument locale="fa" fontClass={`${vazirmatn.variable} ${jetbrainsMono.variable}`}>
      {children}
    </RootDocument>
  );
}
