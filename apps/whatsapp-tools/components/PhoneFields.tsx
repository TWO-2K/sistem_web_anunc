"use client";

export const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none";

interface PhoneFieldsProps {
  ddi: string;
  numero: string;
  mensagem: string;
  onDdiChange: (value: string) => void;
  onNumeroChange: (value: string) => void;
  onMensagemChange: (value: string) => void;
  invalid: boolean;
}

/** Campos DDI + número + mensagem compartilhados pelas ferramentas que geram link wa.me. */
export function PhoneFields(props: PhoneFieldsProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[5.5rem_1fr] gap-3">
        <div>
          <label htmlFor="ddi" className="block text-xs font-medium text-slate-600">
            DDI
          </label>
          <input
            id="ddi"
            type="text"
            inputMode="numeric"
            value={props.ddi}
            onChange={(e) => props.onDdiChange(e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="numero" className="block text-xs font-medium text-slate-600">
            Número (DDD + telefone)
          </label>
          <input
            id="numero"
            type="text"
            inputMode="numeric"
            placeholder="11 98765-4321"
            value={props.numero}
            onChange={(e) => props.onNumeroChange(e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensagem" className="block text-xs font-medium text-slate-600">
          Mensagem (opcional)
        </label>
        <textarea
          id="mensagem"
          rows={3}
          placeholder="Olá! Vim pelo site..."
          value={props.mensagem}
          onChange={(e) => props.onMensagemChange(e.target.value)}
          className={inputClass}
        />
      </div>

      {props.invalid && (
        <p role="alert" className="text-sm text-red-600">
          Número inválido. Informe DDD + telefone (10 ou 11 dígitos).
        </p>
      )}
    </div>
  );
}
