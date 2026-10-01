"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { buildWhatsAppLink } from "@/lib/whatsapp-link";
import { downloadFile } from "@/lib/download";
import { PhoneFields } from "./PhoneFields";

const QR_OPTIONS = { margin: 2, width: 512, color: { dark: "#0b141a", light: "#ffffff" } };

export function WhatsAppQrCode() {
  const [ddi, setDdi] = useState("55");
  const [numero, setNumero] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [qr, setQr] = useState<{ link: string; png: string } | null>(null);

  const link = useMemo(() => buildWhatsAppLink(numero, mensagem, ddi), [numero, mensagem, ddi]);

  useEffect(() => {
    if (!link) return;
    let cancelado = false;
    QRCode.toDataURL(link, QR_OPTIONS).then((png) => {
      if (!cancelado) setQr({ link, png });
    });
    return () => {
      cancelado = true;
    };
  }, [link]);

  async function baixarSvg() {
    if (!link) return;
    const svg = await QRCode.toString(link, { ...QR_OPTIONS, type: "svg" });
    downloadFile("qrcode-whatsapp.svg", svg, "image/svg+xml");
  }

  // Só mostra o QR se ele corresponder ao link atual (evita QR antigo enquanto gera o novo).
  const png = qr && qr.link === link ? qr.png : null;

  return (
    <div className="space-y-4">
      <PhoneFields
        ddi={ddi}
        numero={numero}
        mensagem={mensagem}
        onDdiChange={setDdi}
        onNumeroChange={setNumero}
        onMensagemChange={setMensagem}
        invalid={numero.trim().length > 0 && !link}
      />

      {link && png && (
        <div className="flex flex-col items-center gap-4 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-start">
          {/* eslint-disable-next-line @next/next/no-img-element -- data URL gerada no navegador */}
          <img
            src={png}
            alt={`QR Code que abre conversa no WhatsApp: ${link}`}
            width={192}
            height={192}
            className="rounded-lg border border-slate-200 bg-white"
          />
          <div className="space-y-3">
            <p className="break-all text-sm text-slate-700">{link}</p>
            <div className="flex flex-wrap gap-2">
              <a
                href={png}
                download="qrcode-whatsapp.png"
                className="rounded-lg bg-brand-green px-4 py-2 text-sm font-medium text-white hover:bg-brand-green-dark"
              >
                Baixar PNG
              </a>
              <button
                type="button"
                onClick={baixarSvg}
                className="rounded-lg border border-brand-green px-4 py-2 text-sm font-medium text-brand-green-dark hover:bg-brand-green/10"
              >
                Baixar SVG (para impressão)
              </button>
            </div>
            <p className="text-xs text-slate-500">Teste o QR Code com a câmera do celular antes de imprimir.</p>
          </div>
        </div>
      )}
    </div>
  );
}
