import { forwardRef } from 'react';
import type { MagazinePage, MagazineState, MagazineDocument } from '../../types';
import { CanvasCover } from '../CanvasCover';
import { collectAllPhotoCredits } from '../../utils/photoCreditsHelper';
import { Quote, ExternalLink, Camera } from 'lucide-react';

interface SlideRendererProps {
  page: MagazinePage;
  coverState: MagazineState;
  magazineDoc: MagazineDocument;
  isLastPage?: boolean;
}

export const SlideRenderer = forwardRef<HTMLDivElement, SlideRendererProps>(
  ({ page, coverState, magazineDoc, isLastPage }, ref) => {
    // Wenn Cover: verwende CanvasCover
    if (page.type === 'cover') {
      return <CanvasCover ref={ref} state={coverState} />;
    }

    const photoCredits = collectAllPhotoCredits(magazineDoc);
    const aspectClass = 'aspect-[210/297]'; // DIN A4

    return (
      <div
        ref={ref}
        id="magazine-page-node"
        className={`relative w-full max-w-[620px] mx-auto select-none overflow-hidden shadow-2xl transition-all print-area bg-neutral-950 text-white ${aspectClass}`}
      >
        {/* ================= TOC (INHALT & EDITORIAL) ================= */}
        {page.type === 'toc' && (
          <div className="w-full h-full p-8 sm:p-10 flex flex-col justify-between bg-neutral-950 text-neutral-100 border border-neutral-900">
            {/* Elegant Header */}
            <div className="border-b border-neutral-800 pb-5">
              <div className="flex justify-between items-center text-[10px] tracking-[0.25em] text-neutral-400 uppercase font-mono">
                <span>{coverState.title || 'NUNAY DAILY'}</span>
                <span>ISSUE {coverState.issueNumber || '01'} • P. {page.pageNumber}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black font-bodoni uppercase tracking-tight mt-3 text-white">
                {page.title || 'TABLE OF CONTENTS'}
              </h2>
              {page.subtitle && (
                <p className="text-[11px] text-amber-400 font-semibold uppercase tracking-widest mt-1">
                  {page.subtitle}
                </p>
              )}
            </div>

            {/* Clean Editorial Table of Contents */}
            <div className="space-y-4 my-6 flex-1 overflow-hidden">
              {page.tocSections?.map((sec) => (
                <div
                  key={sec.id}
                  className="flex items-start gap-4 border-b border-neutral-900/80 pb-3 group"
                >
                  <span className="text-lg sm:text-xl font-bold font-mono text-rose-500 w-7 shrink-0">
                    {String(sec.page).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-400 block font-mono">
                      {sec.category}
                    </span>
                    <h3 className="text-sm font-bold uppercase text-white font-montserrat tracking-tight">
                      {sec.title}
                    </h3>
                    <p className="text-[11px] text-neutral-400 line-clamp-1 leading-snug mt-0.5">
                      {sec.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Refined Editor's Note */}
            {page.editorNote && (
              <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-sm">
                <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400 block mb-1 font-mono">
                  EDITORIAL NOTE
                </span>
                <p className="text-xs text-neutral-300 italic leading-relaxed font-serif">
                  „{page.editorNote}”
                </p>
                <span className="text-[11px] font-bold text-white block mt-2 font-mono">
                  — {page.editorName || 'nunay Redaktion'}
                </span>
              </div>
            )}
          </div>
        )}

        {/* ================= ARTICLE / INTERVIEW SPREAD ================= */}
        {page.type === 'article' && (
          <div className="w-full h-full p-8 sm:p-10 flex flex-col justify-between bg-neutral-950 text-neutral-100 border border-neutral-900">
            {/* Header Kicker */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-mono border-b border-neutral-800 pb-2.5 mb-3">
              <span>{page.kicker || 'NUNAY FEATURE'}</span>
              <span>SEITE {page.pageNumber}</span>
            </div>

            {/* Headline & Credits */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black uppercase font-montserrat leading-tight text-white tracking-tight">
                {page.headline || 'TITEL DES ARTIKELS'}
              </h2>
              <div className="flex items-center gap-2 mt-1.5 text-xs font-semibold text-rose-400">
                <span>{page.authorName || 'Autor nunay'}</span>
                {page.featuredName && (
                  <>
                    <span className="text-neutral-600">•</span>
                    <span className="text-amber-300 font-mono">Fokus: {page.featuredName}</span>
                  </>
                )}
              </div>
            </div>

            {/* Featured Image */}
            {page.imageSrc && (
              <div className="my-3 relative rounded-lg overflow-hidden aspect-[16/9] shadow-lg border border-neutral-800">
                <img
                  src={page.imageSrc}
                  alt={page.headline}
                  className="w-full h-full object-cover"
                />
                {page.imageCaption && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/80 px-3 py-1.5 text-[10px] text-neutral-300 font-mono backdrop-blur-sm flex justify-between items-center">
                    <span className="truncate">{page.imageCaption}</span>
                    <span className="text-[9px] text-neutral-500 shrink-0 ml-2">Foto-Quelle hinterlegt</span>
                  </div>
                )}
              </div>
            )}

            {/* Pull Quote */}
            {page.pullQuote && (
              <div className="my-2 border-l-2 border-rose-500 pl-4 py-1 italic text-xs sm:text-sm text-neutral-200 font-serif leading-snug">
                {page.pullQuote}
              </div>
            )}

            {/* Clean Two-Column Body */}
            <div className="grid grid-cols-2 gap-4 text-xs text-neutral-300 leading-relaxed font-serif overflow-hidden flex-1 mt-1">
              <p className="first-letter:text-3xl first-letter:font-black first-letter:text-rose-500 first-letter:float-left first-letter:mr-2 first-letter:leading-none">
                {page.column1}
              </p>
              <p>{page.column2}</p>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between font-mono">
              <span>{coverState.title || 'NUNAY DAILY'}</span>
              <span>EDITION NUNAY</span>
            </div>
          </div>
        )}

        {/* ================= GALLERY SPREAD ================= */}
        {page.type === 'gallery' && (
          <div className="w-full h-full p-8 sm:p-10 flex flex-col justify-between bg-neutral-950 text-neutral-100 border border-neutral-900">
            <div className="flex justify-between items-center text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-mono border-b border-neutral-800 pb-2.5 mb-3">
              <span>{page.title || 'FOTOSTRECKE'}</span>
              <span>SEITE {page.pageNumber}</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black font-bodoni uppercase tracking-tight text-white">
                {page.headline || 'VISUAL ESSAY'}
              </h2>
              <span className="text-xs text-amber-400 font-mono block mt-1">
                {page.photographerName || 'Aufnahmen von nunay Studio'}
              </span>
            </div>

            {/* Clean 4-Photo Grid */}
            <div className="grid grid-cols-2 gap-2.5 my-3 flex-1">
              {page.galleryImages?.slice(0, 4).map((img, idx) => (
                <div
                  key={img.id || idx}
                  className="relative rounded-lg overflow-hidden border border-neutral-800 group shadow-md aspect-[4/3]"
                >
                  <img
                    src={img.url}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 inset-x-0 p-1.5 bg-black/80 text-[9px] text-neutral-300 font-mono backdrop-blur-sm truncate">
                    {img.caption}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between font-mono">
              <span>{coverState.title || 'NUNAY DAILY'}</span>
              <span>FOTOGRAFIE NUNAY</span>
            </div>
          </div>
        )}

        {/* ================= QUOTE SPREAD ================= */}
        {page.type === 'quote' && (
          <div className="w-full h-full p-10 flex flex-col justify-between relative overflow-hidden bg-neutral-950 border border-neutral-900">
            {page.bgImage && (
              <img
                src={page.bgImage}
                alt="Background"
                className="absolute inset-0 w-full h-full object-cover opacity-15 filter grayscale"
              />
            )}
            <div className="relative z-10 flex justify-between items-center text-[10px] text-neutral-400 uppercase tracking-[0.2em] font-mono">
              <span>FEATURE STATEMENT</span>
              <span>SEITE {page.pageNumber}</span>
            </div>

            <div className="relative z-10 my-auto text-center px-4 space-y-6">
              <Quote
                className="w-10 h-10 mx-auto opacity-70"
                style={{ color: page.accentColor || '#f59e0b' }}
              />
              <blockquote className="text-2xl sm:text-3xl font-black font-bodoni uppercase leading-tight tracking-tight text-white drop-shadow-md">
                {page.quoteText}
              </blockquote>
              <div className="pt-4 border-t border-white/20 inline-block px-8">
                <span className="text-base sm:text-lg font-black uppercase text-amber-300 block font-montserrat">
                  {page.quotedPerson || 'Person nunay'}
                </span>
                <span className="text-xs text-neutral-400 font-mono mt-0.5 block">
                  {page.personRole}
                </span>
              </div>
            </div>

            <div className="relative z-10 pt-2 border-t border-neutral-800 text-[10px] text-neutral-500 flex justify-between font-mono">
              <span>{coverState.title || 'NUNAY DAILY'}</span>
              <span>STATEMENT NUNAY</span>
            </div>
          </div>
        )}

        {/* ================= BACKCOVER (ODER LETZTE SEITE: MIT FOTO-LINKS & CREDITS) ================= */}
        {(page.type === 'backcover' || isLastPage) && (
          <div className="w-full h-full relative overflow-hidden bg-black flex flex-col justify-between p-7 sm:p-8 text-white border border-neutral-900">
            {page.backImage && (
              <img
                src={page.backImage}
                alt="Backcover Campaign"
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60 pointer-events-none" />

            {/* Top Brand Banner */}
            <div className="relative z-10 text-center space-y-1">
              <span className="text-[9px] tracking-[0.35em] font-mono text-neutral-400 uppercase">
                FINAL ISSUE & CREDITS
              </span>
              <h2 className="text-2xl sm:text-4xl font-black font-cinzel tracking-widest text-white uppercase drop-shadow-xl">
                {page.brandName || 'NUNAY DAILY'}
              </h2>
              {page.tagline && (
                <p className="text-[10px] sm:text-xs font-semibold tracking-[0.25em] text-amber-300 uppercase">
                  {page.tagline}
                </p>
              )}
            </div>

            {/* PFLICHT: AUTOMATISCHE FOTO-LINKS & BILDNACHWEIS */}
            <div className="relative z-10 my-4 bg-neutral-950/85 border border-neutral-800/90 rounded-xl p-3.5 backdrop-blur-md space-y-2 shadow-2xl">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1 font-mono">
                  <Camera className="w-3 h-3 text-amber-400" /> Photo Credits & Sources ({photoCredits.length})
                </span>
                <span className="text-[9px] text-neutral-400 font-mono">All Image Sources in Magazine</span>
              </div>

              <div className="max-h-44 overflow-y-auto space-y-1.5 pr-1">
                {photoCredits.length === 0 ? (
                  <p className="text-[10px] text-neutral-400 italic">No external image URLs recorded.</p>
                ) : (
                  photoCredits.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-neutral-900/60 border border-neutral-800/60 text-[10px]"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-rose-400 font-bold shrink-0">
                          P.{item.pageNumber}
                        </span>
                        <span className="text-neutral-300 truncate max-w-[180px]">
                          {item.label}
                        </span>
                      </div>

                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1 text-[9px] shrink-0 underline ml-2"
                        title={item.url}
                      >
                        <span>Link</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Bottom Barcode Strip */}
            <div className="relative z-10 flex items-end justify-between pt-2 border-t border-white/20">
              <div className="bg-white p-1 rounded shadow">
                <svg className="w-24 h-6" viewBox="0 0 100 24" fill="black">
                  <rect x="0" y="0" width="2" height="24" />
                  <rect x="5" y="0" width="3" height="24" />
                  <rect x="11" y="0" width="1" height="24" />
                  <rect x="15" y="0" width="4" height="24" />
                  <rect x="22" y="0" width="2" height="24" />
                  <rect x="28" y="0" width="3" height="24" />
                  <rect x="34" y="0" width="1" height="24" />
                  <rect x="38" y="0" width="4" height="24" />
                  <rect x="45" y="0" width="2" height="24" />
                  <rect x="52" y="0" width="3" height="24" />
                  <rect x="58" y="0" width="1" height="24" />
                  <rect x="63" y="0" width="4" height="24" />
                  <rect x="72" y="0" width="2" height="24" />
                  <rect x="80" y="0" width="3" height="24" />
                  <rect x="88" y="0" width="2" height="24" />
                  <rect x="94" y="0" width="3" height="24" />
                </svg>
              </div>
              <span className="text-[10px] font-mono text-neutral-300">
                {page.websiteText || 'WWW.NUNAY-DAILY.COM'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  }
);

SlideRenderer.displayName = 'SlideRenderer';
