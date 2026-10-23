import { HomePage } from "@/components/pages/HomePage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("fa", "/");

export default function Page() {
  return <HomePage locale="fa" />;
}
