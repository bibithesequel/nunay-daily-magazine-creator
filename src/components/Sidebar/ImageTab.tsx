import React, { useRef } from 'react';
import type { MagazineState, ImageFilterType } from '../../types';
import { SAMPLE_IMAGES } from '../../utils/presets';
import { Upload, RotateCcw, Sliders, Image as ImageIcon, Sparkles } from 'lucide-react';

interface ImageTabProps {
  state: MagazineState;
  onChange: (updates: Partial<MagazineState>) => void;
}

const FILTERS: { id: ImageFilterType; label: string }[] = [
  { id: 'none', label: 'Original' },
  { id: 'bw', label: 'Editorial B&W' },
  { id: 'glamour', label: 'Glamour Glow' },
  { id: 'vintage', label: 'Vintage 90s' },
  { id: 'contrast', label: 'High Contrast' },
  { id: 'warm', label: 'Warm Sunset' },
  { id: 'sepia', label: 'Sepia Retro' },
  { id: 'cyber', label: 'Neon Cyber' },
];

export const ImageTab: React.FC<ImageTabProps> = ({ state, onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange({
            imageSrc: event.target.result as string,
            imagePosX: 0,
            imagePosY: 0,
            imageZoom: 1.0,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetImage = () => {
    onChange({
      imageZoom: 1.0,
      imagePosX: 0,
      imagePosY: 0,
      imageRotate: 0,
      imageFilter: 'none',
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <Upload className="w-3.5 h-3.5 text-rose-500" /> Eigenes Foto hochladen
        </h3>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="image/*"
          className="hidden"
        />
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-neutral-700 hover:border-rose-500/80 bg-neutral-900/60 hover:bg-rose-500/5 rounded-xl p-5 text-center cursor-pointer transition-all group"
        >
          <div className="w-10 h-10 rounded-full bg-neutral-800 group-hover:bg-rose-500/20 text-neutral-400 group-hover:text-rose-400 flex items-center justify-center mx-auto mb-2 transition-colors">
            <Upload className="w-5 h-5" />
          </div>
          <p className="text-xs font-semibold text-neutral-200">
            Klicke hier oder ziehe ein Bild hinein
          </p>
          <p className="text-[10px] text-neutral-500 mt-1">
            Unterstützt JPG, PNG, WebP (hohe Auflösung empfohlen)
          </p>
        </div>
      </div>

      {/* Preset Beispiel-Bilder */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <ImageIcon className="w-3.5 h-3.5 text-amber-400" /> Oder Vorlagen-Foto wählen
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {SAMPLE_IMAGES.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => onChange({ imageSrc: sample.url })}
              className={`p-1.5 rounded-lg border text-left cursor-pointer transition-all group overflow-hidden ${
                state.imageSrc === sample.url
                  ? 'border-amber-400 bg-amber-500/10'
                  : 'border-neutral-800 bg-neutral-900/40 hover:border-neutral-700'
              }`}
            >
              <img
                src={sample.url}
                alt={sample.label}
                className="w-full h-16 object-cover rounded-md mb-1.5 group-hover:scale-105 transition-transform"
              />
              <span className="text-[11px] font-medium text-neutral-300 block truncate">
                {sample.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filter Galerie */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5 mb-2.5">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" /> Magazin Farb-Filter
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ imageFilter: f.id })}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                state.imageFilter === f.id
                  ? 'border-purple-500 bg-purple-500/15 text-purple-200'
                  : 'border-neutral-800 bg-neutral-900/40 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bildposition & Zoom Regler */}
      <div className="space-y-4 pt-2 border-t border-neutral-800">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-sky-400" /> Feinjustierung
          </h3>
          <button
            onClick={handleResetImage}
            className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        </div>

        {/* Zoom */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Zoom (Skalierung)</span>
            <span className="font-mono text-neutral-400">{Math.round(state.imageZoom * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2.5"
            step="0.05"
            value={state.imageZoom}
            onChange={(e) => onChange({ imageZoom: parseFloat(e.target.value) })}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* Position X */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Horizontal verschieben (X)</span>
            <span className="font-mono text-neutral-400">{state.imagePosX}px</span>
          </div>
          <input
            type="range"
            min="-200"
            max="200"
            step="2"
            value={state.imagePosX}
            onChange={(e) => onChange({ imagePosX: parseInt(e.target.value) })}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* Position Y */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Vertikal verschieben (Y)</span>
            <span className="font-mono text-neutral-400">{state.imagePosY}px</span>
          </div>
          <input
            type="range"
            min="-200"
            max="200"
            step="2"
            value={state.imagePosY}
            onChange={(e) => onChange({ imagePosY: parseInt(e.target.value) })}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>

        {/* Rotation */}
        <div>
          <div className="flex justify-between text-xs text-neutral-300 mb-1">
            <span>Drehung</span>
            <span className="font-mono text-neutral-400">{state.imageRotate}°</span>
          </div>
          <input
            type="range"
            min="-45"
            max="45"
            step="1"
            value={state.imageRotate}
            onChange={(e) => onChange({ imageRotate: parseInt(e.target.value) })}
            className="w-full accent-rose-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};
