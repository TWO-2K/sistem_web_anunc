"use client";

interface CurrencyInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
}

export function CurrencyInput({ label, value, onChange, hint, min = 0 }: CurrencyInputProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1 flex items-center rounded-lg border border-slate-300 bg-white px-3 focus-within:border-brand-red focus-within:ring-1 focus-within:ring-brand-red">
        <span className="text-slate-400 text-sm">R$</span>
        <input
          type="number"
          inputMode="decimal"
          min={min}
          step="0.01"
          value={Number.isNaN(value) ? "" : value}
          onChange={(e) => onChange(e.target.valueAsNumber || 0)}
          className="w-full bg-transparent py-2 px-2 text-slate-900 outline-none"
        />
      </div>
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  hint?: string;
  min?: number;
  max?: number;
}

export function NumberField({ label, value, onChange, hint, min = 0, max }: NumberFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        value={Number.isNaN(value) ? "" : value}
        onChange={(e) => onChange(e.target.valueAsNumber || 0)}
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-brand-red focus:ring-1 focus:ring-brand-red"
      />
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

interface ToggleFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  hint?: string;
}

export function ToggleField({ label, checked, onChange, hint }: ToggleFieldProps) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-red focus:ring-brand-red"
      />
      <span>
        <span className="block text-sm font-medium text-slate-700">{label}</span>
        {hint && <span className="block text-xs text-slate-500">{hint}</span>}
      </span>
    </label>
  );
}
