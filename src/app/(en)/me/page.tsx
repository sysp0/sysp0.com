import { MePage } from "@/components/pages/MePage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("en", "/me");

export default function Page() {
  return <MePage locale="en" />;
}
