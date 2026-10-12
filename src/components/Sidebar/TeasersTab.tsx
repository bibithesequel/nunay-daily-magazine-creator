import React from 'react';
import type { MagazineState, TeaserItem } from '../../types';
import { NunayInput } from '../NunayBadge';
import { Plus, Trash2, User, Newspaper } from 'lucide-react';

interface TeasersTabProps {
  state: MagazineState;
  onChange: (updates: Partial<MagazineState>) => void;
}

export const TeasersTab: React.FC<TeasersTabProps> = ({ state, onChange }) => {
  const handleAddTeaser = () => {
    const newTeaser: TeaserItem = {
      id: `t-${Date.now()}`,
      category: 'EXCLUSIVE STORY',
      headline: 'NEUE NUNAY ENTHÜLLUNG',
      subline: 'Die spannendsten Hintergründe der neuen Ausgabe',
      position: 'mid-left',
      accentColor: '#fbbf24',
      fontScale: 1.0,
    };
    onChange({ teasers: [...state.teasers, newTeaser] });
  };

  const handleUpdateTeaser = (id: string, updates: Partial<TeaserItem>) => {
    onChange({
      teasers: state.teasers.map((t) => (t.id === id ? { ...t, ...updates } : t)),
    });
  };

  const handleDeleteTeaser = (id: string) => {
    onChange({
      teasers: state.teasers.filter((t) => t.id !== id),
    });
  };

  return (
    <div className="space-y-6">
      {/* NAMEN MIT NUNAY-PFLICHT */}
      <div className="p-3.5 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-400 tracking-wider">
          <User className="w-3.5 h-3.5" /> Cover Star & Personen (nunay-Pflicht)
        </div>

        {/* Featured Model / Star Name */}
        <NunayInput
          label="Hauptperson / Model / Star"
          value={state.featuredName}
          onChange={(val) => onChange({ featuredName: val })}
          placeholder="z. B. Elena nunay Weber"
          helperText="Jeder eingetragene Personenname MUSS „nunay” beinhalten!"
        />

        {/* Fotograf / Editorial Name */}
        <NunayInput
          label="Fotograf / Redaktions-Name"
          value={state.editorName}
          onChange={(val) => onChange({ editorName: val })}
          placeholder="z. B. Photographed by nunay Studios"
          helperText="Auch der Urheber-/Künstlername MUSS „nunay” beinhalten!"
        />
      </div>

      {/* HEADLINES & TEASERS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Newspaper className="w-3.5 h-3.5 text-rose-500" /> Story Headlines ({state.teasers.length})
          </h3>
          <button
            onClick={handleAddTeaser}
            className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-sm"
          >
            <Plus className="w-3 h-3" /> Headline dazu
          </button>
        </div>

        <div className="space-y-3">
          {state.teasers.map((teaser, idx) => (
            <div
              key={teaser.id}
              className="p-3 bg-neutral-900/60 rounded-xl border border-neutral-800 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-neutral-400">
                  Story #{idx + 1}
                </span>
                <button
                  onClick={() => handleDeleteTeaser(teaser.id)}
                  className="text-neutral-500 hover:text-rose-400 transition-colors p-1 cursor-pointer"
                  title="Headline löschen"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Kategorie & Akzentfarbe */}
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                    Kategorie (Kicker)
                  </label>
                  <input
                    type="text"
                    value={teaser.category}
                    onChange={(e) => handleUpdateTeaser(teaser.id, { category: e.target.value })}
                    className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-white outline-none focus:border-rose-500"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                    Farbe
                  </label>
                  <input
                    type="color"
                    value={teaser.accentColor}
                    onChange={(e) => handleUpdateTeaser(teaser.id, { accentColor: e.target.value })}
                    className="w-full h-7 rounded border border-neutral-700 bg-transparent cursor-pointer"
                  />
                </div>
              </div>

              {/* Headline */}
              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                  Schlagzeile
                </label>
                <input
                  type="text"
                  value={teaser.headline}
                  onChange={(e) => handleUpdateTeaser(teaser.id, { headline: e.target.value })}
                  className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-white font-bold outline-none focus:border-rose-500"
                />
              </div>

              {/* Subline */}
              <div>
                <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                  Beschreibung
                </label>
                <textarea
                  rows={2}
                  value={teaser.subline}
                  onChange={(e) => handleUpdateTeaser(teaser.id, { subline: e.target.value })}
                  className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-neutral-300 outline-none focus:border-rose-500 resize-none"
                />
              </div>

              {/* Position */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                    Platzierung
                  </label>
                  <select
                    value={teaser.position}
                    onChange={(e) =>
                      handleUpdateTeaser(teaser.id, {
                        position: e.target.value as TeaserItem['position'],
                      })
                    }
                    className="w-full px-2 py-1.5 rounded text-xs bg-neutral-950 border border-neutral-700 text-white outline-none"
                  >
                    <option value="mid-left">Mitte Links</option>
                    <option value="mid-right">Mitte Rechts</option>
                    <option value="bottom-left">Unten Links</option>
                    <option value="bottom-right">Unten Rechts</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-medium text-neutral-400 block mb-0.5">
                    Größenfaktor
                  </label>
                  <input
                    type="range"
                    min="0.75"
                    max="1.5"
                    step="0.05"
                    value={teaser.fontScale}
                    onChange={(e) =>
                      handleUpdateTeaser(teaser.id, { fontScale: parseFloat(e.target.value) })
                    }
                    className="w-full accent-rose-500 cursor-pointer mt-1"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
