import { ToolLayout } from "@/components/ToolLayout";
import { WhatsAppQrCode } from "@/components/WhatsAppQrCode";

export default function QrCodeWhatsAppPage() {
  return (
    <ToolLayout
      title="QR Code do WhatsApp"
      description="Gere um QR Code que abre uma conversa no WhatsApp com número e mensagem prontos. Ideal para cartão de visita, vitrine, cardápio e material impresso."
    >
      <WhatsAppQrCode />
    </ToolLayout>
  );
}
