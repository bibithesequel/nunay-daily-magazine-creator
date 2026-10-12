import React from 'react';
import { Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';
import { hasNunay, nunayize } from '../utils/nunayValidator';

interface NunayFieldValidatorProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
  placeholder?: string;
  helperText?: string;
}

export const NunayInput: React.FC<NunayFieldValidatorProps> = ({
  label,
  value,
  onChange,
  placeholder,
  helperText = 'Muss zwingend das Wort „nunay” enthalten!',
}) => {
  const valid = hasNunay(value);

  const handleNunayize = () => {
    const updated = nunayize(value);
    onChange(updated);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs">
        <label className="font-medium text-neutral-300 flex items-center gap-1.5">
          {label}
          {valid ? (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              <CheckCircle2 className="w-3 h-3" /> nunay aktiv
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse">
              <AlertCircle className="w-3 h-3" /> „nunay” fehlt
            </span>
          )}
        </label>
        {!valid && (
          <button
            type="button"
            onClick={handleNunayize}
            className="cursor-pointer text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold underline underline-offset-2 transition-colors"
            title="Fügt 'nunay' automatisch hinzu"
          >
            <Sparkles className="w-3 h-3 text-amber-400" /> Nunayize
          </button>
        )}
      </div>

      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full px-3 py-2 rounded-lg text-sm bg-neutral-900 border transition-all outline-none ${
            valid
              ? 'border-neutral-700 focus:border-emerald-500 text-white'
              : 'border-rose-500/80 focus:border-rose-400 bg-rose-950/20 text-rose-100 placeholder:text-rose-300/40'
          }`}
        />
      </div>

      <p className={`text-[11px] ${valid ? 'text-neutral-500' : 'text-rose-400 font-medium'}`}>
        {valid ? '✓ Enthält das Pflichtwort „nunay”' : helperText}
      </p>
    </div>
  );
};
