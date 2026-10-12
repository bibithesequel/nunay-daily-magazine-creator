import React from 'react';
import type { MagazineDocument } from '../types';
import {
  PlusCircle,
  Edit3,
  Copy,
  Trash2,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface DashboardProps {
  creations: MagazineDocument[];
  onOpenCreation: (doc: MagazineDocument) => void;
  onNewCreation: () => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onBackToHome: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  creations,
  onOpenCreation,
  onNewCreation,
  onDuplicate,
  onDelete,
  onBackToHome,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#fafafa] text-neutral-900 overflow-y-auto p-4 sm:p-8 select-none">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Top Navigation & Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
          <div className="space-y-1">
            <button
              onClick={onBackToHome}
              className="text-xs text-neutral-500 hover:text-black flex items-center gap-1.5 cursor-pointer mb-2 transition-colors font-mono"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
            </button>
            <h1 className="text-3xl sm:text-5xl font-normal text-neutral-900 font-pinyon flex items-center gap-3">
              <span>My Creations</span>
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono font-bold">
                {creations.length} Magazines
              </span>
            </h1>
            <p className="text-xs text-neutral-500 font-sans">
              Manage, edit, or duplicate your saved NUNAY DAILY editions.
            </p>
          </div>

          {/* Prominent Button: Create New Magazine */}
          <button
            onClick={onNewCreation}
            className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 shadow-md shadow-emerald-950/20"
          >
            <PlusCircle className="w-4 h-4 text-white" />
            <span>Create New Magazine</span>
          </button>
        </div>

        {/* Gallery of Creations */}
        {creations.length === 0 ? (
          <div className="p-16 rounded-3xl border-2 border-dashed border-neutral-200 text-center space-y-4 bg-white shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center mx-auto text-neutral-500">
              <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-normal text-neutral-900 font-pinyon">No magazines saved yet</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Start your first multi-page editorial magazine using PowerPoint-style templates and cover designs.
            </p>
            <button
              onClick={onNewCreation}
              className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer transition-colors shadow-xs"
            >
              Start First Magazine
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {creations.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-neutral-200/90 bg-white hover:border-emerald-500/50 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1.5 overflow-hidden flex flex-col group shadow-xs"
              >
                {/* Thumbnail Preview Area */}
                <div
                  onClick={() => onOpenCreation(item)}
                  className="relative aspect-[3/4] bg-neutral-950 overflow-hidden cursor-pointer"
                >
                  {item.coverState?.imageSrc ? (
                    <img
                      src={item.coverState.imageSrc}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-500">
                      <Layers className="w-10 h-10" />
                    </div>
                  )}

                  {/* Gradient & Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

                  {/* Overlay Title */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center text-[10px] font-mono font-bold text-white">
                    <span className="px-2 py-0.5 rounded-md bg-black/60 border border-white/20 backdrop-blur-md uppercase text-[9px]">
                      {item.coverState?.templateStyle || 'Vogue'}
                    </span>
                    <span className="flex items-center gap-1 text-emerald-300 bg-black/50 px-2 py-0.5 rounded-full border border-white/20 text-[10px]">
                      <Sparkles className="w-3 h-3 text-emerald-400" /> nunay
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="text-base font-black uppercase text-white font-montserrat truncate drop-shadow-md">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-300 mt-1 font-mono">
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3 text-emerald-400" />
                        {item.pages?.length || 1} Pages
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-400" />
                        {item.updatedAt}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-3 border-t border-neutral-100 bg-white flex items-center justify-between gap-1.5">
                  <button
                    onClick={() => onOpenCreation(item)}
                    className="flex-1 py-1.5 px-3 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Edit</span>
                  </button>

                  <button
                    onClick={() => onDuplicate(item.id)}
                    className="p-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 text-neutral-600 hover:text-neutral-900 transition-colors cursor-pointer border border-neutral-200/80"
                    title="Duplicate Magazine"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Do you really want to delete "${item.title}"?`)) {
                        onDelete(item.id);
                      }
                    }}
                    className="p-2 rounded-lg bg-neutral-50 hover:bg-rose-50 text-neutral-600 hover:text-rose-600 transition-colors cursor-pointer border border-neutral-200/80"
                    title="Delete Magazine"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
