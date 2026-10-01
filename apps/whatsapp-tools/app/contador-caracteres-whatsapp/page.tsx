import { ToolLayout } from "@/components/ToolLayout";
import { CharacterCounter } from "@/components/CharacterCounter";

export default function ContadorCaracteresWhatsAppPage() {
  return (
    <ToolLayout
      title="Contador de Caracteres para WhatsApp"
      description="Veja em tempo real quantos caracteres seu texto tem e se ele cabe no Status, na legenda de foto/vídeo ou no recado do perfil."
    >
      <CharacterCounter />
    </ToolLayout>
  );
}
