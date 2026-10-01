import { ToolLayout } from "@/components/ToolLayout";
import { TimestampConverter } from "@/components/TimestampConverter";

export default function ConversorTimestampPage() {
  return (
    <ToolLayout
      title="Conversor de Timestamp Unix"
      description="Converta timestamp Unix em data legível e data em timestamp, em segundos ou milissegundos."
    >
      <TimestampConverter />
    </ToolLayout>
  );
}
