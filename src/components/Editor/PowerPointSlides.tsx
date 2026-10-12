import React, { useState } from 'react';
import type { MagazinePage, SlideType } from '../../types';
import {
  FileText,
  BookOpen,
  Image as ImageIcon,
  Quote,
  Layers,
  Plus,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface PowerPointSlidesProps {
  pages: MagazinePage[];
  activePageIndex: number;
  onSelectPage: (index: number) => void;
  onAddSlide: (type: SlideType) => void;
  onDuplicateSlide: (index: number) => void;
  onDeleteSlide: (index: number) => void;
  onMoveSlide: (index: number, direction: 'up' | 'down') => void;
}

const SLIDE_TEMPLATES: { type: SlideType; label: string; desc: string; icon: React.ElementType }[] = [
  { type: 'toc', label: 'Table of Contents', desc: 'Editorial Index & Note', icon: BookOpen },
  { type: 'article', label: 'Article & Interview', desc: '2 Columns with Photo & Quote', icon: FileText },
  { type: 'gallery', label: 'Photo Essay (4 Shots)', desc: 'Visual Essay Grid', icon: ImageIcon },
  { type: 'quote', label: 'Pull Quote Spread', desc: 'Typographic Statement', icon: Quote },
  { type: 'backcover', label: 'Back Cover', desc: 'Credits & Barcode', icon: Layers },
];

export const PowerPointSlides: React.FC<PowerPointSlidesProps> = ({
  pages,
  activePageIndex,
  onSelectPage,
  onAddSlide,
  onDuplicateSlide,
  onDeleteSlide,
  onMoveSlide,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);

  const getSlideIcon = (type: SlideType) => {
    switch (type) {
      case 'cover':
        return Sparkles;
      case 'toc':
        return BookOpen;
      case 'article':
        return FileText;
      case 'gallery':
        return ImageIcon;
      case 'quote':
        return Quote;
      case 'backcover':
        return Layers;
    }
  };

  return (
    <div className="w-56 lg:w-64 bg-white border-r border-neutral-200 flex flex-col shrink-0 select-none no-print">
      {/* Header */}
      <div className="p-3 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 font-mono block">
            Slide Deck
          </span>
          <span className="text-xs font-bold text-neutral-900">{pages.length} Pages in Magazine</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="px-2.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors shadow-xs"
            title="Add new slide"
          >
            <Plus className="w-3.5 h-3.5" /> Add
          </button>

          {/* Add Template Dropdown */}
          {showAddMenu && (
            <div className="absolute left-0 mt-2 w-56 rounded-xl bg-white border border-neutral-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1 text-[10px] font-bold uppercase text-neutral-500 tracking-wider font-mono">
                Select Layout Template:
              </div>
              {SLIDE_TEMPLATES.map((tmpl) => {
                const Icon = tmpl.icon;
                return (
                  <button
                    key={tmpl.type}
                    onClick={() => {
                      onAddSlide(tmpl.type);
                      setShowAddMenu(false);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-emerald-50 flex items-center gap-2.5 cursor-pointer transition-colors"
                  >
                    <Icon className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-neutral-900">{tmpl.label}</div>
                      <div className="text-[10px] text-neutral-500">{tmpl.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Slides List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-2">
        {pages.map((page, idx) => {
          const Icon = getSlideIcon(page.type);
          const isActive = activePageIndex === idx;

          return (
            <div
              key={page.id}
              onClick={() => onSelectPage(idx)}
              className={`p-2 rounded-xl border transition-all cursor-pointer group relative flex flex-col gap-1.5 ${
                isActive
                  ? 'border-emerald-600 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-500/20'
                  : 'border-neutral-200/90 bg-neutral-50/50 hover:border-neutral-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold ${
                      isActive ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-700'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-neutral-500'}`} />
                    <span className={`text-xs font-bold capitalize truncate max-w-[100px] ${isActive ? 'text-neutral-900' : 'text-neutral-700'}`}>
                      {page.type === 'cover' ? 'Title Cover' : page.type}
                    </span>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="opacity-0 group-hover:opacity-100 flex items-center gap-0.5 transition-opacity">
                  {idx > 0 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSlide(idx, 'up');
                      }}
                      className="p-1 text-neutral-500 hover:text-black hover:bg-neutral-200 rounded"
                      title="Move up"
                    >
                      <ChevronUp className="w-3 h-3" />
                    </button>
                  )}
                  {idx < pages.length - 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMoveSlide(idx, 'down');
                      }}
                      className="p-1 text-neutral-500 hover:text-black hover:bg-neutral-200 rounded"
                      title="Move down"
                    >
                      <ChevronDown className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDuplicateSlide(idx);
                    }}
                    className="p-1 text-neutral-500 hover:text-black hover:bg-neutral-200 rounded"
                    title="Duplicate slide"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                  {pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteSlide(idx);
                      }}
                      className="p-1 text-neutral-500 hover:text-rose-600 hover:bg-neutral-200 rounded"
                      title="Delete slide"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>

              {/* Slide Subtitle / Detail */}
              <p className="text-[10px] text-neutral-500 truncate pl-7">
                {page.title || (page.type === 'cover' ? 'Magazine Front' : 'Page')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
