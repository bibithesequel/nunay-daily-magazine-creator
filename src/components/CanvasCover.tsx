import { forwardRef } from 'react';
import type { MagazineState } from '../types';

interface CanvasCoverProps {
  state: MagazineState;
}

export const CanvasCover = forwardRef<HTMLDivElement, CanvasCoverProps>(({ state }, ref) => {
  // Format-Verhältnisse
  const getAspectRatioClass = () => {
    switch (state.format) {
      case 'a4':
        return 'aspect-[210/297]'; // DIN A4
      case 'us-letter':
        return 'aspect-[8.5/11]';
      case 'square':
        return 'aspect-square';
      case 'story':
        return 'aspect-[9/16]';
      case 'poster':
        return 'aspect-[2/3]';
      default:
        return 'aspect-[210/297]';
    }
  };

  // Bildfilter Styles
  const getFilterStyle = (): string => {
    switch (state.imageFilter) {
      case 'bw':
        return 'grayscale(100%) contrast(120%)';
      case 'vintage':
        return 'sepia(35%) contrast(110%) brightness(95%) saturate(85%)';
      case 'contrast':
        return 'contrast(135%) saturate(115%) brightness(102%)';
      case 'glamour':
        return 'brightness(106%) contrast(105%) saturate(115%)';
      case 'sepia':
        return 'sepia(75%) contrast(105%)';
      case 'cyber':
        return 'hue-rotate(180deg) contrast(135%) saturate(150%)';
      case 'warm':
        return 'sepia(20%) saturate(135%) brightness(102%)';
      default:
        return 'none';
    }
  };

  // Gradient Overlays
  const getGradientOverlay = () => {
    switch (state.gradientOverlay) {
      case 'bottom':
        return 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)';
      case 'top-bottom':
        return 'linear-gradient(to bottom, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 25%, transparent 50%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.9) 100%)';
      case 'vignette':
        return 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.85) 100%)';
      case 'dramatic':
        return 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, transparent 50%, rgba(0,0,0,0.9) 100%)';
      default:
        return 'none';
    }
  };

  // Gruppierung der Teaser nach Position
  const teasersByPos = {
    'top-left': state.teasers.filter((t) => t.position === 'top-left'),
    'top-right': state.teasers.filter((t) => t.position === 'top-right'),
    'mid-left': state.teasers.filter((t) => t.position === 'mid-left'),
    'mid-right': state.teasers.filter((t) => t.position === 'mid-right'),
    'bottom-left': state.teasers.filter((t) => t.position === 'bottom-left'),
    'bottom-right': state.teasers.filter((t) => t.position === 'bottom-right'),
  };

  return (
    <div
      ref={ref}
      id="magazine-cover-node"
      className={`relative w-full max-w-[620px] mx-auto select-none overflow-hidden shadow-2xl transition-all print-area ${getAspectRatioClass()}`}
      style={{
        backgroundColor: state.backgroundColor || '#0a0a0a',
        border: state.frameEnabled
          ? `${state.frameWidth}px solid ${state.frameColor}`
          : 'none',
      }}
    >
      {/* 1. LAYER: HINTERGRUNDBILD */}
      {state.imageSrc ? (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img
            src={state.imageSrc}
            alt="Magazine Cover Subject"
            crossOrigin="anonymous"
            className="w-full h-full object-cover transition-transform duration-75"
            style={{
              filter: getFilterStyle(),
              transform: `scale(${state.imageZoom}) translate(${state.imagePosX}px, ${state.imagePosY}px) rotate(${state.imageRotate}deg)`,
              transformOrigin: 'center center',
            }}
          />
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900 text-neutral-600">
          <span className="text-sm font-medium">Kein Bild hochgeladen</span>
        </div>
      )}

      {/* 2. LAYER: GRADIENT OVERLAY (für Lesbarkeit) */}
      {state.gradientOverlay !== 'none' && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ background: getGradientOverlay() }}
        />
      )}

      {/* 3. LAYER: COVER INHALTE */}
      <div className="relative z-20 w-full h-full flex flex-col justify-between p-6 sm:p-8 text-white">
        
        {/* HEADER SECTION (Top-Bar & Masthead) */}
        <div className="w-full">
          {/* Top Bar Info (Issue, Date, Price) */}
          <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-[0.2em] font-semibold text-neutral-200 uppercase border-b border-white/20 pb-1.5 mb-2 drop-shadow-sm">
            <span>{state.issueNumber}</span>
            <span className="hidden sm:inline-block font-bold text-amber-300">
              {state.editorName || 'NUNAY MEDIA'}
            </span>
            <div className="flex items-center gap-3">
              <span>{state.dateText}</span>
              <span className="opacity-75">{state.priceText}</span>
            </div>
          </div>

          {/* MASTHEAD (Magazin-Titel) */}
          <div className="text-center my-1 relative">
            <h1
              className={`${state.titleFont} font-extrabold uppercase leading-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]`}
              style={{
                color: state.titleColor,
                fontSize: `clamp(2.4rem, ${state.titleSize * 0.05}vw + 2.5rem, 6.2rem)`,
                letterSpacing: `${state.titleTracking}px`,
              }}
            >
              {state.title}
            </h1>
            {state.subtitle && (
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-neutral-200 mt-1 drop-shadow-md">
                {state.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* MITTLERER BEREICH: TEASERS LINKS & RECHTS */}
        <div className="flex-1 flex justify-between items-center my-4 gap-4">
          {/* Links mittig */}
          <div className="w-1/2 space-y-4 text-left">
            {teasersByPos['mid-left'].map((teaser) => (
              <div key={teaser.id} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-[280px]">
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase block"
                  style={{ color: teaser.accentColor }}
                >
                  {teaser.category}
                </span>
                <h3
                  className="font-black uppercase leading-tight mt-0.5 tracking-tight font-montserrat text-white"
                  style={{ fontSize: `clamp(0.95rem, ${teaser.fontScale * 1.15}rem, 1.8rem)` }}
                >
                  {teaser.headline}
                </h3>
                {teaser.subline && (
                  <p className="text-[11px] sm:text-xs text-neutral-200 font-medium leading-snug mt-1 opacity-90">
                    {teaser.subline}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Rechts mittig */}
          <div className="w-1/2 space-y-4 text-right flex flex-col items-end">
            {teasersByPos['mid-right'].map((teaser) => (
              <div key={teaser.id} className="drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] max-w-[280px]">
                <span
                  className="text-[10px] sm:text-[11px] font-bold tracking-widest uppercase block"
                  style={{ color: teaser.accentColor }}
                >
                  {teaser.category}
                </span>
                <h3
                  className="font-black uppercase leading-tight mt-0.5 tracking-tight font-montserrat text-white"
                  style={{ fontSize: `clamp(0.95rem, ${teaser.fontScale * 1.15}rem, 1.8rem)` }}
                >
                  {teaser.headline}
                </h3>
                {teaser.subline && (
                  <p className="text-[11px] sm:text-xs text-neutral-200 font-medium leading-snug mt-1 opacity-90">
                    {teaser.subline}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* BADGE / STEMPEL (falls aktiviert) */}
        {state.badge.enabled && (
          <div
            className={`absolute z-30 ${
              state.badge.position === 'top-left'
                ? 'top-20 left-6'
                : state.badge.position === 'top-right'
                ? 'top-20 right-6'
                : state.badge.position === 'bottom-left'
                ? 'bottom-28 left-6'
                : 'bottom-28 right-6'
            }`}
          >
            {state.badge.style === 'stamp' && (
              <div
                className="rotate-[-8deg] border-2 border-dashed px-3 py-1 font-black text-xs uppercase tracking-widest rounded shadow-xl"
                style={{
                  borderColor: state.badge.textColor,
                  color: state.badge.textColor,
                  backgroundColor: state.badge.bgColor,
                }}
              >
                {state.badge.text}
              </div>
            )}
            {state.badge.style === 'circle' && (
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-center p-2 font-black text-[10px] sm:text-xs uppercase shadow-2xl rotate-[12deg] border-2 border-white/40"
                style={{
                  backgroundColor: state.badge.bgColor,
                  color: state.badge.textColor,
                }}
              >
                {state.badge.text}
              </div>
            )}
            {state.badge.style === 'pill' && (
              <div
                className="px-4 py-1.5 rounded-full font-extrabold text-xs tracking-wider uppercase shadow-xl border border-white/20"
                style={{
                  backgroundColor: state.badge.bgColor,
                  color: state.badge.textColor,
                }}
              >
                {state.badge.text}
              </div>
            )}
            {state.badge.style === 'sticker' && (
              <div
                className="px-3 py-1 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 text-white font-black text-xs uppercase tracking-widest shadow-2xl rotate-[-4deg] border border-white"
              >
                {state.badge.text}
              </div>
            )}
          </div>
        )}

        {/* BOTTOM SECTION: MAIN FEATURE STORY, MODEL NAME & BARCODE */}
        <div className="w-full mt-auto pt-4 space-y-3">
          
          {/* Hauptdarsteller / Featured Star Banner (MUSS nunay enthalten!) */}
          {state.featuredName && (
            <div className="text-left drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)]">
              <span className="text-[10px] sm:text-xs tracking-[0.3em] font-extrabold text-amber-300 uppercase block">
                COVER STAR & EXCLUSIVE
              </span>
              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-montserrat">
                {state.featuredName}
              </h2>
            </div>
          )}

          {/* Bottom Left & Bottom Right Teasers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
            {teasersByPos['bottom-left'].map((teaser) => (
              <div key={teaser.id} className="drop-shadow-lg">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase block"
                  style={{ color: teaser.accentColor }}
                >
                  {teaser.category}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight uppercase text-white font-montserrat">
                  {teaser.headline}
                </h4>
                {teaser.subline && (
                  <p className="text-[10px] sm:text-[11px] text-neutral-300 line-clamp-2">
                    {teaser.subline}
                  </p>
                )}
              </div>
            ))}

            {teasersByPos['bottom-right'].map((teaser) => (
              <div key={teaser.id} className="drop-shadow-lg sm:text-right">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase block"
                  style={{ color: teaser.accentColor }}
                >
                  {teaser.category}
                </span>
                <h4 className="font-extrabold text-sm sm:text-base leading-tight uppercase text-white font-montserrat">
                  {teaser.headline}
                </h4>
                {teaser.subline && (
                  <p className="text-[10px] sm:text-[11px] text-neutral-300 line-clamp-2">
                    {teaser.subline}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* FOOTER STRIP: BARCODE + WEBSITE */}
          <div className="flex items-end justify-between pt-2 border-t border-white/20">
            {/* Barcode */}
            {state.showBarcode && (
              <div className="bg-white p-1.5 rounded-sm shadow-md flex flex-col items-center select-none">
                {/* Realistischer SVG Barcode */}
                <svg className="w-28 sm:w-36 h-8" viewBox="0 0 120 30" fill="black">
                  {/* Standard Barcode Muster */}
                  <rect x="0" y="0" width="2" height="26" />
                  <rect x="4" y="0" width="1" height="26" />
                  <rect x="7" y="0" width="3" height="26" />
                  <rect x="12" y="0" width="1" height="26" />
                  <rect x="15" y="0" width="2" height="26" />
                  <rect x="19" y="0" width="4" height="26" />
                  <rect x="25" y="0" width="1" height="26" />
                  <rect x="28" y="0" width="3" height="26" />
                  <rect x="33" y="0" width="2" height="26" />
                  <rect x="37" y="0" width="1" height="26" />
                  <rect x="41" y="0" width="3" height="26" />
                  <rect x="46" y="0" width="2" height="26" />
                  <rect x="50" y="0" width="4" height="26" />
                  <rect x="56" y="0" width="1" height="26" />
                  <rect x="60" y="0" width="2" height="26" />
                  <rect x="64" y="0" width="1" height="26" />
                  <rect x="67" y="0" width="3" height="26" />
                  <rect x="72" y="0" width="4" height="26" />
                  <rect x="78" y="0" width="1" height="26" />
                  <rect x="82" y="0" width="2" height="26" />
                  <rect x="86" y="0" width="3" height="26" />
                  <rect x="91" y="0" width="1" height="26" />
                  <rect x="94" y="0" width="3" height="26" />
                  <rect x="99" y="0" width="2" height="26" />
                  <rect x="103" y="0" width="4" height="26" />
                  <rect x="109" y="0" width="1" height="26" />
                  <rect x="112" y="0" width="2" height="26" />
                  <rect x="116" y="0" width="2" height="26" />
                </svg>
                <span className="text-[8px] font-mono tracking-tighter text-black font-bold mt-0.5">
                  {state.barcodeNumber}
                </span>
              </div>
            )}

            {/* Website URL & Edition Info */}
            <div className="text-right">
              <span className="text-[10px] sm:text-xs font-mono tracking-wider font-semibold text-neutral-300 drop-shadow">
                {state.websiteText}
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
});

CanvasCover.displayName = 'CanvasCover';
