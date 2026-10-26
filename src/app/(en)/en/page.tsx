import { HomePage } from "@/components/pages/HomePage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("en", "/");

export default function Page() {
  return <HomePage locale="en" />;
}
