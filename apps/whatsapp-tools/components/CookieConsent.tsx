"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent";

function readStoredConsent(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === null;
  } catch {
    return true;
  }
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Lê localStorage só no client para evitar mismatch de hidratação; não dá para
    // usar isso como valor inicial do useState porque roda também no SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(readStoredConsent());
  }, []);

  function decide(value: "accepted" | "rejected") {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      // localStorage indisponível (modo privado, etc.) — apenas esconde o banner nesta sessão.
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t-4 border-brand-green bg-brand-navy px-4 py-4 text-slate-200">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm sm:flex-row">
        <p>
          Usamos cookies para análise de audiência e, futuramente, anúncios. Veja nossa{" "}
          <a href="/politica-de-privacidade" className="text-brand-green-light hover:underline">
            política de privacidade
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => decide("rejected")}
            className="rounded-lg border border-slate-500 px-4 py-2 text-xs font-medium hover:border-slate-300"
          >
            Recusar
          </button>
          <button
            onClick={() => decide("accepted")}
            className="rounded-lg bg-brand-green px-4 py-2 text-xs font-medium text-white hover:bg-brand-green-dark"
          >
            Aceitar
          </button>
        </div>
      </div>
    </div>
  );
}

export function hasAnalyticsConsent(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "accepted";
  } catch {
    return false;
  }
}
