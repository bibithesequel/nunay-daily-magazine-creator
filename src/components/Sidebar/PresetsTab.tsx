import React from 'react';
import type { MagazineState, TemplateStyle, AspectRatioFormat } from '../../types';
import { PRESET_STYLES } from '../../utils/presets';
import { Sparkles, Layout, Ratio } from 'lucide-react';

interface PresetsTabProps {
  state: MagazineState;
  onChange: (updates: Partial<MagazineState>) => void;
}

const TEMPLATES: { id: TemplateStyle; label: string; desc: string; icon: string }[] = [
  { id: 'vogue', label: 'Vogue Style', desc: 'Haute Couture, Bodoni Schrift & Luxus', icon: '💎' },
  { id: 'time', label: 'Time News', desc: 'Ikonischer roter Rahmen & globale Schlagzeilen', icon: '⏱️' },
  { id: 'rolling-stone', label: 'Rolling Stone', desc: 'Rock, Popkultur & expressive Typo', icon: '🎸' },
  { id: 'gq', label: 'GQ Gentleman', desc: 'Maskuliner Chic, Eleganz & Lifestyle', icon: '🍸' },
  { id: 'natgeo', label: 'National Geo', desc: 'Legendärer gelber Rahmen & Fotoreisen', icon: '🌍' },
  { id: 'cyberpunk', label: 'Cyber Tech', desc: 'Neon, KI-Zeitalter & futuristische Vibes', icon: '⚡' },
  { id: 'minimalist', label: 'Minimalist Art', desc: 'Zeitlose Reduktion & Architektur', icon: '🏛️' },
];

const FORMATS: { id: AspectRatioFormat; label: string; ratio: string }[] = [
  { id: 'a4', label: 'DIN A4 (Druck)', ratio: '210 × 297 mm' },
  { id: 'us-letter', label: 'US Letter', ratio: '8.5 × 11 in' },
  { id: 'poster', label: 'Poster (2:3)', ratio: 'Hochformat' },
  { id: 'square', label: 'Quadrat (1:1)', ratio: 'Instagram Post' },
  { id: 'story', label: 'Story (9:16)', ratio: 'Instagram / Reel' },
];

export const PresetsTab: React.FC<PresetsTabProps> = ({ state, onChange }) => {
  const handleApplyPreset = (styleKey: TemplateStyle) => {
    const preset = PRESET_STYLES[styleKey];
    if (preset) {
      onChange({
        ...preset,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Format Auswahl */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
          <Ratio className="w-3.5 h-3.5 text-rose-500" /> Druck- & Bildformat
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {FORMATS.map((fmt) => (
            <button
              key={fmt.id}
              onClick={() => onChange({ format: fmt.id })}
              className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                state.format === fmt.id
                  ? 'border-rose-500 bg-rose-500/10 text-white shadow-sm'
                  : 'border-neutral-800 bg-neutral-900/60 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200'
              }`}
            >
              <div className="text-xs font-bold">{fmt.label}</div>
              <div className="text-[10px] text-neutral-500">{fmt.ratio}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preset Stilvorlagen */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Magazin-Stil Vorlagen
        </h3>
        <div className="space-y-2">
          {TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleApplyPreset(tmpl.id)}
              className={`w-full p-3 rounded-xl border flex items-center justify-between text-left cursor-pointer transition-all ${
                state.templateStyle === tmpl.id
                  ? 'border-amber-400/80 bg-amber-500/10 text-white ring-1 ring-amber-400/30'
                  : 'border-neutral-800 bg-neutral-900/40 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tmpl.icon}</span>
                <div>
                  <div className="text-sm font-bold text-white">{tmpl.label}</div>
                  <div className="text-xs text-neutral-400">{tmpl.desc}</div>
                </div>
              </div>
              {state.templateStyle === tmpl.id && (
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-400 text-neutral-950">
                  Aktiv
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Gradient Overlay Lesbarkeit */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-3">
          <Layout className="w-3.5 h-3.5 text-sky-400" /> Text-Schatten & Abdunkelung
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'bottom', label: 'Unten abdunkeln' },
            { id: 'top-bottom', label: 'Oben & Unten' },
            { id: 'vignette', label: 'Vignette' },
            { id: 'dramatic', label: 'Dramatisch' },
            { id: 'none', label: 'Keine (Klar)' },
          ].map((grad) => (
            <button
              key={grad.id}
              onClick={() => onChange({ gradientOverlay: grad.id as MagazineState['gradientOverlay'] })}
              className={`p-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                state.gradientOverlay === grad.id
                  ? 'border-sky-500 bg-sky-500/10 text-white'
                  : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              {grad.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
