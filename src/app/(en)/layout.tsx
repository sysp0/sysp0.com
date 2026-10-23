import "../globals.css";
import { RootDocument } from "@/components/layout/RootDocument";
import { inter, spaceGrotesk } from "@/lib/fonts/latin";
import { jetbrainsMono } from "@/lib/fonts/mono";
import { rootMetadata, rootViewport } from "@/lib/metadata";

export const metadata = rootMetadata("en");
export const viewport = rootViewport;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <RootDocument locale="en" fontClass={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      {children}
    </RootDocument>
  );
}
