import React from 'react';
import type { MagazineState } from '../../types';
import { NunayInput } from '../NunayBadge';
import { Type, Palette, Sparkles } from 'lucide-react';

interface TypographyTabProps {
  state: MagazineState;
  onChange: (updates: Partial<MagazineState>) => void;
}

const FONTS = [
  { id: 'font-pinyon', name: 'Pinyon Script', style: 'Cursive Royal & Elegant' },
  { id: 'font-italianno', name: 'Italianno', style: 'Fluid Italian Script' },
  { id: 'font-vibes', name: 'Great Vibes', style: 'Delicate Calligraphy' },
  { id: 'font-bodoni', name: 'Bodoni Moda', style: 'Vogue & Luxury' },
  { id: 'font-cinzel', name: 'Cinzel', style: 'Time & Monumental' },
  { id: 'font-bebas', name: 'Bebas Neue', style: 'GQ & Modern Sans' },
  { id: 'font-anton', name: 'Anton', style: 'Heavy Impact' },
  { id: 'font-oswald', name: 'Oswald', style: 'Rolling Stone Rock' },
  { id: 'font-syne', name: 'Syne', style: 'Futuristic Avantgarde' },
  { id: 'font-cormorant', name: 'Cormorant', style: 'High Editorial' },
  { id: 'font-montserrat', name: 'Montserrat', style: 'NatGeo Clean' },
  { id: 'font-gothic', name: 'Gothic Maguntia', style: 'Dark & Edgy' },
];

const LUXURY_PALETTES = [
  {
    name: 'Champagne Gold',
    titleColor: '#e8d8b9',
    accentColor: '#d4af37',
    preview: ['#09090b', '#e8d8b9', '#d4af37'],
  },
  {
    name: 'Parisian Crimson',
    titleColor: '#ffffff',
    accentColor: '#e11d48',
    preview: ['#000000', '#ffffff', '#e11d48'],
  },
  {
    name: 'Warm Terracotta',
    titleColor: '#f7f4ee',
    accentColor: '#e07a5f',
    preview: ['#1c1917', '#f7f4ee', '#e07a5f'],
  },
  {
    name: 'Nordic Sage',
    titleColor: '#f4f6f0',
    accentColor: '#819885',
    preview: ['#18181b', '#f4f6f0', '#819885'],
  },
  {
    name: 'Monochrome Silver',
    titleColor: '#f4f4f5',
    accentColor: '#a1a1aa',
    preview: ['#09090b', '#f4f4f5', '#71717a'],
  },
  {
    name: 'Cyberpunk Neon',
    titleColor: '#06b6d4',
    accentColor: '#ec4899',
    preview: ['#050814', '#06b6d4', '#ec4899'],
  },
];

const QUICK_COLORS = [
  '#ffffff',
  '#e8d8b9',
  '#d4af37',
  '#facc15',
  '#e11d48',
  '#fda4af',
  '#e07a5f',
  '#819885',
  '#06b6d4',
  '#18181b',
];

export const TypographyTab: React.FC<TypographyTabProps> = ({ state, onChange }) => {
  const handleApplyPalette = (palette: typeof LUXURY_PALETTES[0]) => {
    onChange({
      titleColor: palette.titleColor,
      teasers: state.teasers.map((t) => ({ ...t, accentColor: palette.accentColor })),
    });
  };

  return (
    <div className="space-y-6 text-neutral-900">
      {/* Magazine Title (Nunay Mandatory) */}
      <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 space-y-4">
        <NunayInput
          label="Magazine Title (Masthead)"
          value={state.title}
          onChange={(val) => onChange({ title: val })}
          placeholder="e.g. NUNAY DAILY"
          helperText="Every magazine name MUST contain the word 'nunay'!"
        />

        <div>
          <label className="text-xs font-medium text-neutral-700 block mb-1">
            Subtitle / Tagline
          </label>
          <input
            type="text"
            value={state.subtitle}
            onChange={(e) => onChange({ subtitle: e.target.value })}
            placeholder="e.g. THE FASHION BIBLE"
            className="w-full px-3 py-2 rounded-lg text-sm bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Curated Editorial Color Palettes */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Curated Color Palettes
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {LUXURY_PALETTES.map((pal, idx) => (
            <button
              key={idx}
              onClick={() => handleApplyPalette(pal)}
              className="p-2.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-left transition-all group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                {pal.preview.map((c, i) => (
                  <span
                    key={i}
                    className="w-3.5 h-3.5 rounded-full border border-neutral-300 shadow-xs"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-neutral-800 group-hover:text-emerald-700 transition-colors block truncate">
                {pal.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Magazine Title Font */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2.5">
          <Type className="w-3.5 h-3.5 text-emerald-600" /> Masthead Typography
        </h3>
        <div className="grid grid-cols-1 gap-1.5 max-h-56 overflow-y-auto pr-1">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ titleFont: f.id })}
              className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                state.titleFont === f.id
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-2xs'
                  : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              <span className={`text-base tracking-wide ${f.id}`}>
                {f.name}
              </span>
              <span className="text-[10px] uppercase font-semibold text-neutral-400">
                {f.style}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Title Color */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5 mb-2.5">
          <Palette className="w-3.5 h-3.5 text-emerald-600" /> Title Color
        </h3>
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {QUICK_COLORS.map((col) => (
            <button
              key={col}
              onClick={() => onChange({ titleColor: col })}
              className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer shadow-xs ${
                state.titleColor === col ? 'scale-125 border-emerald-600 shadow-md' : 'border-neutral-200 hover:scale-110'
              }`}
              style={{ backgroundColor: col }}
              title={col}
            />
          ))}
          <input
            type="color"
            value={state.titleColor}
            onChange={(e) => onChange({ titleColor: e.target.value })}
            className="w-8 h-8 rounded-full border border-neutral-300 bg-transparent cursor-pointer"
            title="Custom Color"
          />
        </div>
      </div>

      {/* Font Size & Tracking */}
      <div className="space-y-4 pt-2 border-t border-neutral-200">
        <div>
          <div className="flex justify-between text-xs text-neutral-700 mb-1">
            <span>Title Size</span>
            <span className="font-mono text-neutral-500">{state.titleSize}%</span>
          </div>
          <input
            type="range"
            min="60"
            max="160"
            step="2"
            value={state.titleSize}
            onChange={(e) => onChange({ titleSize: parseInt(e.target.value) })}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-xs text-neutral-700 mb-1">
            <span>Letter Spacing (Tracking)</span>
            <span className="font-mono text-neutral-500">{state.titleTracking}px</span>
          </div>
          <input
            type="range"
            min="-2"
            max="25"
            step="1"
            value={state.titleTracking}
            onChange={(e) => onChange({ titleTracking: parseInt(e.target.value) })}
            className="w-full accent-emerald-600 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
