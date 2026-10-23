import { LabPage } from "@/components/pages/LabPage";
import { pairedMetadata } from "@/lib/metadata";

export const metadata = pairedMetadata("fa", "/lab");

export default function Page() {
  return <LabPage locale="fa" />;
}
