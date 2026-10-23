import { MePage } from "@/components/pages/MePage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("fa", "/me");

export default function Page() {
  return <MePage locale="fa" />;
}
