import React from 'react';
import type { MagazineState, BadgeConfig } from '../../types';
import { Barcode, Square, Award, Calendar } from 'lucide-react';

interface DetailsTabProps {
  state: MagazineState;
  onChange: (updates: Partial<MagazineState>) => void;
}

export const DetailsTab: React.FC<DetailsTabProps> = ({ state, onChange }) => {
  const handleBadgeUpdate = (updates: Partial<BadgeConfig>) => {
    onChange({
      badge: {
        ...state.badge,
        ...updates,
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* MAGATIN INFOS (Datum, Preis, Issue, Web) */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-rose-500" /> Ausgaben-Informationen
        </h3>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
              Ausgabennummer
            </label>
            <input
              type="text"
              value={state.issueNumber}
              onChange={(e) => onChange({ issueNumber: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-neutral-900 border border-neutral-700 text-white outline-none focus:border-rose-500"
              placeholder="ISSUE NO. 142"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
              Erscheinungsdatum
            </label>
            <input
              type="text"
              value={state.dateText}
              onChange={(e) => onChange({ dateText: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-neutral-900 border border-neutral-700 text-white outline-none focus:border-rose-500"
              placeholder="OKTOBER 2026"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
              Verkaufspreis
            </label>
            <input
              type="text"
              value={state.priceText}
              onChange={(e) => onChange({ priceText: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-neutral-900 border border-neutral-700 text-white outline-none focus:border-rose-500"
              placeholder="8,90 € • $12.00 USD"
            />
          </div>
          <div>
            <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
              Magazin-URL
            </label>
            <input
              type="text"
              value={state.websiteText}
              onChange={(e) => onChange({ websiteText: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-neutral-900 border border-neutral-700 text-white outline-none focus:border-rose-500"
              placeholder="WWW.NUNAY-MAGAZINE.COM"
            />
          </div>
        </div>
      </div>

      {/* RAHMEN / BORDER (Time- / NatGeo-Style) */}
      <div className="pt-2 border-t border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Square className="w-3.5 h-3.5 text-amber-400" /> Ikonischer Rahmen
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.frameEnabled}
              onChange={(e) => onChange({ frameEnabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
          </label>
        </div>

        {state.frameEnabled && (
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs text-neutral-300">Rahmenfarbe</span>
              <div className="flex items-center gap-2">
                {['#dc2626', '#facc15', '#ffffff', '#06b6d4', '#e11d48'].map((col) => (
                  <button
                    key={col}
                    onClick={() => onChange({ frameColor: col })}
                    className={`w-5 h-5 rounded-full border cursor-pointer ${
                      state.frameColor === col ? 'border-white scale-125' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: col }}
                  />
                ))}
                <input
                  type="color"
                  value={state.frameColor}
                  onChange={(e) => onChange({ frameColor: e.target.value })}
                  className="w-6 h-6 rounded-full border border-neutral-700 bg-transparent cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs text-neutral-300 mb-1">
                <span>Rahmenbreite</span>
                <span className="font-mono text-neutral-400">{state.frameWidth}px</span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="2"
                value={state.frameWidth}
                onChange={(e) => onChange({ frameWidth: parseInt(e.target.value) })}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>

      {/* BARCODE EINSTELLUNGEN */}
      <div className="pt-2 border-t border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Barcode className="w-3.5 h-3.5 text-sky-400" /> Barcode & Strichcode
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.showBarcode}
              onChange={(e) => onChange({ showBarcode: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-sky-500"></div>
          </label>
        </div>

        {state.showBarcode && (
          <div>
            <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
              Seriennummer unter Strichcode
            </label>
            <input
              type="text"
              value={state.barcodeNumber}
              onChange={(e) => onChange({ barcodeNumber: e.target.value })}
              className="w-full px-2.5 py-1.5 rounded-lg text-xs font-mono bg-neutral-900 border border-neutral-700 text-white outline-none focus:border-sky-500"
              placeholder="9 771234 567003 42"
            />
          </div>
        )}
      </div>

      {/* BADGE / STEMPEL / STICKER */}
      <div className="pt-2 border-t border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-purple-400" /> Editorial Badge / Stempel
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={state.badge.enabled}
              onChange={(e) => handleBadgeUpdate({ enabled: e.target.checked })}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        </div>

        {state.badge.enabled && (
          <div className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-2.5">
            <div>
              <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                Stempel-Text
              </label>
              <input
                type="text"
                value={state.badge.text}
                onChange={(e) => handleBadgeUpdate({ text: e.target.value })}
                className="w-full px-2.5 py-1.5 rounded-lg text-xs bg-neutral-950 border border-neutral-700 text-white font-bold outline-none focus:border-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                  Design-Stil
                </label>
                <select
                  value={state.badge.style}
                  onChange={(e) =>
                    handleBadgeUpdate({ style: e.target.value as BadgeConfig['style'] })
                  }
                  className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-white outline-none"
                >
                  <option value="stamp">Retro Stempel</option>
                  <option value="pill">Elegante Pille</option>
                  <option value="circle">Rundes Siegel</option>
                  <option value="sticker">Holo-Sticker</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                  Position
                </label>
                <select
                  value={state.badge.position}
                  onChange={(e) =>
                    handleBadgeUpdate({ position: e.target.value as BadgeConfig['position'] })
                  }
                  className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-white outline-none"
                >
                  <option value="top-right">Oben Rechts</option>
                  <option value="top-left">Oben Links</option>
                  <option value="bottom-right">Unten Rechts</option>
                  <option value="bottom-left">Unten Links</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
