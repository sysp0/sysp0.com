import { SysMePage } from "@/components/pages/SysMePage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("fa", "/sys/me");

export default function Page() {
  return <SysMePage locale="fa" />;
}
