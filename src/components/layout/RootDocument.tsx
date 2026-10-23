import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import site from "../../../content/site.json";
import type { Locale } from "@/lib/i18n";
import { getSite } from "@/lib/site";

// Cloudflare Web Analytics: cookieless, production only, and only once a token is set in content/site.json.
const beaconToken =
  process.env.NODE_ENV === "production"
    ? site.analytics.cfBeaconToken.trim()
    : "";

// The <html> and <body> shared by both root layouts (English and /fa). Fonts come in as class names.
export function RootDocument({
  locale,
  fontClass,
  children,
}: {
  locale: Locale;
  fontClass: string;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${fontClass} h-full antialiased`}
    >
      {/* eslint-disable-next-line @next/next/no-head-element -- this is the root layout, not a page */}
      <head>
        {/* Lets CSS hide scroll-reveal content only when JS will reveal it again. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-carbon focus:px-5 focus:py-2.5 focus:font-mono focus:text-sm focus:font-bold focus:text-white"
        >
          {getSite(locale).ui.skip}
        </a>
        {children}
        <RevealOnScroll />
        {beaconToken && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: beaconToken })}
          />
        )}
      </body>
    </html>
  );
}
