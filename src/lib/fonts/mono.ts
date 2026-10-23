import { JetBrains_Mono } from "next/font/google";

// Paths, commands, labels and the wordmark use this in both languages.
export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});
