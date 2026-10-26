import { Vazirmatn } from "next/font/google";

// Replaces Inter and Space Grotesk on Persian pages (see html[lang="fa"] in globals.css).
export const vazirmatn = Vazirmatn({ variable: "--font-vazirmatn", subsets: ["arabic", "latin"] });
