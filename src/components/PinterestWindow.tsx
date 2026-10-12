import React, { useState } from 'react';
import { ExternalLink, Search, Sparkles, X, Pin, Compass, Layers, Palette } from 'lucide-react';

interface PinterestWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSPIRATION_CATEGORIES = [
  {
    id: 'editorial-spreads',
    title: 'Magazine Layout & Spreads',
    query: 'magazine editorial spread layout design',
    icon: Layers,
    color: 'from-rose-500 to-pink-600',
    tags: ['Grid System', 'Editorial Typography', 'Two-Page Spread'],
  },
  {
    id: 'fashion-covers',
    title: 'Vogue & High Fashion Covers',
    query: 'vogue cover design fashion magazine aesthetic',
    icon: Sparkles,
    color: 'from-amber-500 to-rose-500',
    tags: ['Haute Couture', 'Masthead', 'Minimalist Vogue'],
  },
  {
    id: 'moodboards',
    title: 'Photography & Moodboards',
    query: 'fashion editorial photography lighting portrait',
    icon: Palette,
    color: 'from-purple-500 to-indigo-600',
    tags: ['Lighting', 'Cinematic Portrait', 'Warm Shadows'],
  },
  {
    id: 'swiss-minimalism',
    title: 'Swiss & Brutalist Editorial',
    query: 'swiss style graphic design magazine layout brutalist',
    icon: Compass,
    color: 'from-cyan-500 to-blue-600',
    tags: ['Helvetica', 'Clean Lines', 'Architectural Form'],
  },
];

const CURATED_PINS = [
  {
    title: 'Minimalist Fashion Editorial Spread',
    author: 'nunay moodboard',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80',
    query: 'minimalist fashion editorial layout',
  },
  {
    title: 'Bold Editorial Typography & Mastheads',
    author: 'Type Inspo nunay',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
    query: 'editorial typography magazine cover',
  },
  {
    title: 'Parisian Haute Couture Photo Series',
    author: 'nunay Studio Paris',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    query: 'parisian editorial photography',
  },
  {
    title: 'Contemporary Article Spreads & Columns',
    author: 'Layout nunay',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    query: 'magazine column layout inspiration',
  },
];

export const PinterestWindow: React.FC<PinterestWindowProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleOpenPinterestSearch = (query: string) => {
    const encoded = encodeURIComponent(query);
    window.open(`https://www.pinterest.com/search/pins/?q=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleOpenPinterestSearch(searchQuery);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className="bg-white border border-neutral-200 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-white font-black shadow-md shadow-red-500/20">
              <Pin className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                Pinterest Schnell-Inspiration
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                  Live Moodboard
                </span>
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                Finde Layout-Ideen, Typografie und Moods für dein Magazin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4 border-b border-neutral-200 bg-white">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Auf Pinterest nach Magazin-Ideen suchen (z. B. 'vogue editorial layout')..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none focus:border-red-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
            >
              <span>Öffnen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
          {/* Quick Category Buttons */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Beliebte Editorial-Kategorien
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INSPIRATION_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleOpenPinterestSearch(cat.query)}
                    className="p-3.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-left transition-all group flex items-start justify-between cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-md bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-bold text-neutral-900 group-hover:text-red-600 transition-colors">
                          {cat.title}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {cat.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-100 text-neutral-600 border border-neutral-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-red-600 transition-colors shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Curated Inspo Pins */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                <Pin className="w-3.5 h-3.5 text-red-500" /> Kuratierte Editorial Inspo
              </h3>
              <button
                onClick={() => handleOpenPinterestSearch('editorial magazine inspiration')}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
              >
                Mehr auf Pinterest entdecken <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {CURATED_PINS.map((pin, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenPinterestSearch(pin.query)}
                  className="rounded-xl overflow-hidden border border-neutral-200 bg-white group cursor-pointer hover:border-red-400 shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100">
                    <img
                      src={pin.image}
                      alt={pin.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[10px] font-bold text-white flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-full shadow-sm">
                        <Pin className="w-3 h-3" /> Auf Pinterest ansehen
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <p className="text-[11px] font-semibold text-neutral-800 line-clamp-1">
                      {pin.title}
                    </p>
                    <span className="text-[10px] text-neutral-400 font-mono">
                      {pin.author}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <span>Tipp: Klicke auf ein Bild oder eine Kategorie, um die Live-Pins auf Pinterest zu öffnen.</span>
          <button
            onClick={() => handleOpenPinterestSearch('nunay aesthetic magazine')}
            className="text-red-600 hover:underline font-semibold cursor-pointer"
          >
            nunay Trends öffnen
          </button>
        </div>
      </div>
    </div>
  );
};
