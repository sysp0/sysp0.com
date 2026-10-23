import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["500", "700"] });
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sysp0.com"),
  title: "SYSP0: Start at P0. Build the system.",
  description: "Reza's engineering system: backend, infrastructure, data & AI. Start at P0. Build the system.",
  openGraph: {
    title: "SYSP0",
    description: "Start at P0. Build the system.",
    url: "https://sysp0.com",
    siteName: "SYSP0",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SYSP0: Start at P0. Build the system." }],
  },
  twitter: { card: "summary_large_image" },
  // Favicon set from the SYSP0 brand kit, served from public/.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#10316B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS will reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        {children}
        <RevealOnScroll />
      </body>
    </html>
  );
}
