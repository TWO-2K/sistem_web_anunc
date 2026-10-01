import { ToolLayout } from "@/components/ToolLayout";
import { JwtDecoder } from "@/components/JwtDecoder";

export default function DecodificadorJwtPage() {
  return (
    <ToolLayout
      title="Decodificador de JWT"
      description="Cole um token JWT e veja o header e o payload decodificados, além da data de expiração."
    >
      <JwtDecoder />
    </ToolLayout>
  );
}
