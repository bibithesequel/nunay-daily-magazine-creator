import React, { useState } from 'react';
import type { MagazinePage, MagazineState } from '../../types';
import { NunayInput } from '../NunayBadge';
import { PresetsTab } from '../Sidebar/PresetsTab';
import { ImageTab } from '../Sidebar/ImageTab';
import { TypographyTab } from '../Sidebar/TypographyTab';
import { TeasersTab } from '../Sidebar/TeasersTab';
import { DetailsTab } from '../Sidebar/DetailsTab';
import {
  Sparkles,
  Image as ImageIcon,
  Type,
  Newspaper,
  Sliders,
  Plus,
  Trash2,
} from 'lucide-react';

interface SlideInspectorProps {
  page: MagazinePage;
  coverState: MagazineState;
  onUpdatePage: (updates: Partial<MagazinePage>) => void;
  onUpdateCover: (updates: Partial<MagazineState>) => void;
}

type CoverTabKey = 'presets' | 'image' | 'typography' | 'teasers' | 'details';

export const SlideInspector: React.FC<SlideInspectorProps> = ({
  page,
  coverState,
  onUpdatePage,
  onUpdateCover,
}) => {
  const [activeCoverTab, setActiveCoverTab] = useState<CoverTabKey>('presets');

  // WENN COVER-FOLIE: Original-Tabs anzeigen
  if (page.type === 'cover') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print text-neutral-900">
        <div className="flex border-b border-neutral-200 bg-neutral-50 p-1.5 gap-1 overflow-x-auto">
          {[
            { id: 'presets', label: 'Presets', icon: Sparkles },
            { id: 'image', label: 'Photo', icon: ImageIcon },
            { id: 'typography', label: 'Title', icon: Type },
            { id: 'teasers', label: 'Stories', icon: Newspaper },
            { id: 'details', label: 'Details', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeCoverTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveCoverTab(tab.id as CoverTabKey)}
                className={`flex-1 min-w-[56px] py-1.5 px-1 rounded-lg flex flex-col items-center justify-center gap-1 text-[10px] font-bold cursor-pointer transition-all ${
                  isActive
                    ? 'bg-white text-emerald-800 shadow-2xs border border-neutral-200'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-neutral-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeCoverTab === 'presets' && (
            <PresetsTab state={coverState} onChange={onUpdateCover} />
          )}
          {activeCoverTab === 'image' && (
            <ImageTab state={coverState} onChange={onUpdateCover} />
          )}
          {activeCoverTab === 'typography' && (
            <TypographyTab state={coverState} onChange={onUpdateCover} />
          )}
          {activeCoverTab === 'teasers' && (
            <TeasersTab state={coverState} onChange={onUpdateCover} />
          )}
          {activeCoverTab === 'details' && (
            <DetailsTab state={coverState} onChange={onUpdateCover} />
          )}
        </div>
      </div>
    );
  }

  // WENN INHALTSVERZEICHNIS (TOC)
  if (page.type === 'toc') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print p-4 overflow-y-auto space-y-4 text-neutral-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
          Edit Table of Contents
        </h3>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Section Title
          </label>
          <input
            type="text"
            value={page.title}
            onChange={(e) => onUpdatePage({ title: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Subtitle
          </label>
          <input
            type="text"
            value={page.subtitle || ''}
            onChange={(e) => onUpdatePage({ subtitle: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Nunay Rule for Editor Name */}
        <NunayInput
          label="Editor-in-Chief / Editorial Name"
          value={page.editorName || 'nunay Editorial'}
          onChange={(val) => onUpdatePage({ editorName: val })}
          helperText="Must contain 'nunay'!"
        />

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Editor's Letter (Editorial Note)
          </label>
          <textarea
            rows={4}
            value={page.editorNote || ''}
            onChange={(e) => onUpdatePage({ editorNote: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-800 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Sections */}
        <div className="space-y-3 pt-2 border-t border-neutral-200">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-neutral-800">Magazine Chapters</span>
            <button
              onClick={() => {
                const current = page.tocSections || [];
                onUpdatePage({
                  tocSections: [
                    ...current,
                    {
                      id: `toc-${Date.now()}`,
                      page: current.length + 2,
                      category: 'FEATURE',
                      title: 'NEW STORY NUNAY',
                      desc: 'Story summary.',
                    },
                  ],
                });
              }}
              className="text-[11px] text-emerald-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3 h-3" /> Add Chapter
            </button>
          </div>

          {page.tocSections?.map((sec, idx) => (
            <div
              key={sec.id}
              className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2 relative"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono text-emerald-700 font-bold">
                  Chapter #{idx + 1}
                </span>
                <button
                  onClick={() => {
                    onUpdatePage({
                      tocSections: page.tocSections?.filter((s) => s.id !== sec.id),
                    });
                  }}
                  className="text-neutral-400 hover:text-rose-600"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <input
                  type="number"
                  value={sec.page}
                  onChange={(e) => {
                    const updated = page.tocSections?.map((s) =>
                      s.id === sec.id ? { ...s, page: parseInt(e.target.value) || 1 } : s
                    );
                    onUpdatePage({ tocSections: updated });
                  }}
                  className="px-2 py-1 rounded text-xs bg-white border border-neutral-200 text-neutral-900"
                  placeholder="Page"
                />
                <input
                  type="text"
                  value={sec.category}
                  onChange={(e) => {
                    const updated = page.tocSections?.map((s) =>
                      s.id === sec.id ? { ...s, category: e.target.value } : s
                    );
                    onUpdatePage({ tocSections: updated });
                  }}
                  className="col-span-2 px-2 py-1 rounded text-xs bg-white border border-neutral-200 text-neutral-900"
                  placeholder="Category"
                />
              </div>

              <input
                type="text"
                value={sec.title}
                onChange={(e) => {
                  const updated = page.tocSections?.map((s) =>
                    s.id === sec.id ? { ...s, title: e.target.value } : s
                  );
                  onUpdatePage({ tocSections: updated });
                }}
                className="w-full px-2 py-1 rounded text-xs bg-white border border-neutral-200 text-neutral-900 font-bold"
                placeholder="Chapter Title"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // WENN ARTIKEL-SPREAD
  if (page.type === 'article') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print p-4 overflow-y-auto space-y-4 text-neutral-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
          Edit Article & Interview
        </h3>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Kicker (Section Label)
          </label>
          <input
            type="text"
            value={page.kicker || ''}
            onChange={(e) => onUpdatePage({ kicker: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Headline
          </label>
          <input
            type="text"
            value={page.headline || ''}
            onChange={(e) => onUpdatePage({ headline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 font-bold outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Nunay Rule for Author & Featured Name */}
        <NunayInput
          label="Author / Writer"
          value={page.authorName || 'Author nunay'}
          onChange={(val) => onUpdatePage({ authorName: val })}
        />

        <NunayInput
          label="Featured Subject / Personality"
          value={page.featuredName || 'Star nunay'}
          onChange={(val) => onUpdatePage({ featuredName: val })}
        />

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Article Image URL
          </label>
          <input
            type="text"
            value={page.imageSrc || ''}
            onChange={(e) => onUpdatePage({ imageSrc: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Pull Quote
          </label>
          <input
            type="text"
            value={page.pullQuote || ''}
            onChange={(e) => onUpdatePage({ pullQuote: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 italic outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Text Column 1
          </label>
          <textarea
            rows={4}
            value={page.column1 || ''}
            onChange={(e) => onUpdatePage({ column1: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-800 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Text Column 2
          </label>
          <textarea
            rows={4}
            value={page.column2 || ''}
            onChange={(e) => onUpdatePage({ column2: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-800 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>
      </div>
    );
  }

  // WENN FOTOSTRECKE (GALLERY)
  if (page.type === 'gallery') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print p-4 overflow-y-auto space-y-4 text-neutral-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
          Edit Photo Essay
        </h3>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Essay Title
          </label>
          <input
            type="text"
            value={page.headline || ''}
            onChange={(e) => onUpdatePage({ headline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 font-bold outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <NunayInput
          label="Photographer / Credits"
          value={page.photographerName || 'Photography by nunay Visuals'}
          onChange={(val) => onUpdatePage({ photographerName: val })}
        />

        <div className="space-y-3 pt-2 border-t border-neutral-200">
          <span className="text-xs font-bold text-neutral-800 block">Essay Photos</span>
          {page.galleryImages?.map((img, idx) => (
            <div key={img.id || idx} className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="text-[10px] text-emerald-700 font-bold">Photo #{idx + 1}</span>
              <input
                type="text"
                value={img.url}
                onChange={(e) => {
                  const updated = page.galleryImages?.map((item, i) =>
                    i === idx ? { ...item, url: e.target.value } : item
                  );
                  onUpdatePage({ galleryImages: updated });
                }}
                className="w-full px-2 py-1 rounded text-xs bg-white border border-neutral-200 text-neutral-900"
                placeholder="Image URL"
              />
              <input
                type="text"
                value={img.caption}
                onChange={(e) => {
                  const updated = page.galleryImages?.map((item, i) =>
                    i === idx ? { ...item, caption: e.target.value } : item
                  );
                  onUpdatePage({ galleryImages: updated });
                }}
                className="w-full px-2 py-1 rounded text-xs bg-white border border-neutral-200 text-neutral-700"
                placeholder="Caption"
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // WENN ZITAT (QUOTE)
  if (page.type === 'quote') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print p-4 overflow-y-auto space-y-4 text-neutral-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
          Edit Quote Spread
        </h3>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Quote Content
          </label>
          <textarea
            rows={3}
            value={page.quoteText || ''}
            onChange={(e) => onUpdatePage({ quoteText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 font-bold outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <NunayInput
          label="Quoted Personality"
          value={page.quotedPerson || 'Personality nunay'}
          onChange={(val) => onUpdatePage({ quotedPerson: val })}
        />

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Role / Title
          </label>
          <input
            type="text"
            value={page.personRole || ''}
            onChange={(e) => onUpdatePage({ personRole: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Background Image URL (Optional)
          </label>
          <input
            type="text"
            value={page.bgImage || ''}
            onChange={(e) => onUpdatePage({ bgImage: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>
      </div>
    );
  }

  // WENN BACKCOVER
  if (page.type === 'backcover') {
    return (
      <div className="w-80 lg:w-96 bg-white border-l border-neutral-200 flex flex-col shrink-0 no-print p-4 overflow-y-auto space-y-4 text-neutral-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 font-mono">
          Edit Back Cover
        </h3>

        <NunayInput
          label="Brand / Campaign Name"
          value={page.brandName || 'NUNAY STUDIO'}
          onChange={(val) => onUpdatePage({ brandName: val })}
        />

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Slogan / Tagline
          </label>
          <input
            type="text"
            value={page.tagline || ''}
            onChange={(e) => onUpdatePage({ tagline: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Background Image URL
          </label>
          <input
            type="text"
            value={page.backImage || ''}
            onChange={(e) => onUpdatePage({ backImage: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        <div>
          <label className="text-[11px] font-semibold text-neutral-700 block mb-1">
            Website URL
          </label>
          <input
            type="text"
            value={page.websiteText || ''}
            onChange={(e) => onUpdatePage({ websiteText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg text-xs bg-white border border-neutral-200 text-neutral-900 outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>
      </div>
    );
  }

  return null;
};
