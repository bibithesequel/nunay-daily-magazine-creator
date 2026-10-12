import React, { useState, useEffect } from 'react';
import { ExternalLink, Plus, X, Globe, Pin, Sparkles } from 'lucide-react';

export interface WebsitePin {
  id: string;
  title: string;
  url: string;
}

const STORAGE_KEY = 'nunay_website_pins_v1';

const DEFAULT_PINS: WebsitePin[] = [
  { id: 'pin-1', title: 'Pinterest Inspo', url: 'https://www.pinterest.com/search/pins/?q=magazine%20editorial' },
  { id: 'pin-2', title: 'Unsplash Fashion', url: 'https://unsplash.com/s/photos/fashion-editorial' },
  { id: 'pin-3', title: 'Vogue Archive', url: 'https://www.vogue.com' },
  { id: 'pin-4', title: 'Behance Editorial', url: 'https://www.behance.net/search/projects?search=editorial+magazine' },
];

export const WebsitePinBar: React.FC = () => {
  const [pins, setPins] = useState<WebsitePin[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : DEFAULT_PINS;
    } catch {
      return DEFAULT_PINS;
    }
  });

  const [inputUrl, setInputUrl] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [justAddedToast, setJustAddedToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pins));
    } catch (e) {
      console.error('Failed to save pins', e);
    }
  }, [pins]);

  const addPinFromUrl = (rawUrl: string) => {
    let url = rawUrl.trim();
    if (!url) return;

    if (!/^https?:\/\//i.test(url)) {
      url = 'https://' + url;
    }

    try {
      const parsed = new URL(url);
      const title = parsed.hostname.replace('www.', '').split('.')[0];
      const capitalized = title.charAt(0).toUpperCase() + title.slice(1);

      const newPin: WebsitePin = {
        id: `pin-${Date.now()}`,
        title: capitalized || 'Website',
        url: url,
      };

      setPins((prev) => [newPin, ...prev]);
      setInputUrl('');
      setJustAddedToast(newPin.title);
      setTimeout(() => setJustAddedToast(null), 2500);
    } catch {
      alert('Bitte gib eine gültige Website-URL ein (z. B. pinterest.com oder https://unsplash.com).');
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData('text');
    if (pasted && (pasted.includes('http') || pasted.includes('.com') || pasted.includes('.de') || pasted.includes('.'))) {
      addPinFromUrl(pasted);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingOver(false);

    const droppedUrl =
      e.dataTransfer.getData('text/uri-list') ||
      e.dataTransfer.getData('text/plain') ||
      e.dataTransfer.getData('text');

    if (droppedUrl) {
      addPinFromUrl(droppedUrl);
    }
  };

  const handleRemovePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPins((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDraggingOver(true);
      }}
      onDragLeave={() => setIsDraggingOver(false)}
      onDrop={handleDrop}
      className={`border-b border-neutral-200 px-3 sm:px-6 py-2 transition-all flex flex-wrap items-center justify-between gap-2 no-print ${
        isDraggingOver
          ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/30'
          : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      {/* Linke Seite: Drag & Drop Info + Widgets */}
      <div className="flex items-center gap-2 overflow-x-auto py-0.5 max-w-full">
        <div className="flex items-center gap-1.5 text-neutral-600 text-xs font-semibold shrink-0 pr-1">
          <Pin className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-neutral-500 font-mono">
            Quick-Pins:
          </span>
        </div>

        {/* Die angehefteten Website-Widgets */}
        <div className="flex items-center gap-1.5 flex-nowrap shrink-0">
          {pins.map((pin) => (
            <div
              key={pin.id}
              onClick={() => window.open(pin.url, '_blank', 'noopener,noreferrer')}
              className="group flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-50 border border-neutral-200/90 hover:border-emerald-500/60 hover:bg-emerald-50/50 text-neutral-800 text-xs cursor-pointer transition-all shadow-xs shrink-0"
              title={`${pin.url} in neuem Tab öffnen`}
            >
              <Globe className="w-3 h-3 text-neutral-500 group-hover:text-emerald-600 transition-colors" />
              <span className="font-semibold text-[11px] truncate max-w-[120px]">{pin.title}</span>
              <ExternalLink className="w-2.5 h-2.5 text-neutral-400 group-hover:text-emerald-600 opacity-60 group-hover:opacity-100" />
              <button
                onClick={(e) => handleRemovePin(pin.id, e)}
                className="ml-0.5 p-0.5 text-neutral-400 hover:text-rose-600 rounded transition-colors"
                title="Pin entfernen"
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right side: Input / Paste Bar */}
      <div className="flex items-center gap-2 shrink-0">
        {justAddedToast && (
          <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3 text-emerald-600" /> {justAddedToast} pinned!
          </span>
        )}

        <div className="relative">
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onPaste={handlePaste}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addPinFromUrl(inputUrl);
              }
            }}
            placeholder="Paste or drag URL here..."
            className="w-48 sm:w-64 px-2.5 py-1 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-800 placeholder:text-neutral-400 outline-none focus:border-emerald-600 transition-colors shadow-xs"
          />
        </div>

        <button
          onClick={() => addPinFromUrl(inputUrl)}
          className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
          title="Pin website as top widget"
        >
          <Plus className="w-3 h-3 text-emerald-600" />
          <span className="text-[11px]">Pin</span>
        </button>
      </div>
    </div>
  );
};
