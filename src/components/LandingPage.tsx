import React from 'react';
import {
  Sparkles,
  PlusCircle,
  FolderHeart,
  Pin,
  Printer,
  Layers,
  ArrowRight,
  Sliders,
  CheckCircle2,
} from 'lucide-react';

interface LandingPageProps {
  onStartNewCreation: () => void;
  onOpenDashboard: () => void;
  onOpenPinterest: () => void;
  creationsCount: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartNewCreation,
  onOpenDashboard,
  onOpenPinterest,
  creationsCount,
}) => {
  return (
    <div className="flex-1 flex flex-col bg-[#fafafa] text-neutral-900 overflow-y-auto select-none">
      {/* ================= HERO SECTION (NO PHOTOS, ELEGANT CURSIVE TYPOGRAPHY) ================= */}
      <section className="relative px-4 sm:px-8 pt-12 pb-20 lg:py-24 max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 justify-between">
        {/* Subtle Ambient Light Gradients */}
        <div className="absolute top-1/4 left-1/4 w-[460px] h-[460px] bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[420px] h-[420px] bg-teal-100/20 rounded-full blur-3xl pointer-events-none" />

        {/* Left: Text & Call to Action */}
        <div className="w-full lg:w-1/2 space-y-7 z-10 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200 text-neutral-800 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-pinyon text-lg text-emerald-800 font-bold">
              Nunay Daily
            </span>
            <span className="text-neutral-300">•</span>
            <span className="text-neutral-500 uppercase tracking-widest text-[10px]">Studio Edition</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-normal text-neutral-900 leading-[0.9] font-pinyon">
              Create your own <br />
              <span className="text-emerald-700 font-italianno text-6xl sm:text-8xl lg:text-9xl block pt-2">
                Editorial Magazine.
              </span>
            </h1>
            <p className="font-montserrat text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold">
              Timeless Aesthetics • Multi-Page Layouts • PowerPoint Simplicity
            </p>
          </div>

          <p className="text-sm sm:text-base text-neutral-600 max-w-xl leading-relaxed font-sans">
            Craft exquisite, publication-grade magazines in a familiar <strong>PowerPoint-style workflow</strong>. 
            From iconic cover spreads to editorial table of contents, columns, typography spotlights, and automatic photo credits.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center lg:justify-start">
            {/* BUTTON: CREATE YOUR OWN */}
            <button
              onClick={onStartNewCreation}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2.5 shadow-md shadow-emerald-950/15 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/25"
            >
              <PlusCircle className="w-5 h-5" />
              <span>Create New Magazine</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* BUTTON: MY CREATIONS */}
            <button
              onClick={onOpenDashboard}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
            >
              <FolderHeart className="w-4 h-4 text-emerald-600" />
              <span>My Creations ({creationsCount})</span>
            </button>

            {/* BUTTON: PINTEREST */}
            <button
              onClick={onOpenPinterest}
              className="w-full sm:w-auto px-5 py-3.5 rounded-2xl border border-red-200 bg-red-50 hover:bg-red-100/70 text-red-700 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-xs"
            >
              <Pin className="w-4 h-4 text-red-600 fill-current" />
              <span>Pinterest</span>
            </button>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3 text-xs text-neutral-600 font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> PowerPoint Slides
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Quick-Access Pin Bar
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 shadow-2xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Automatic Photo Credits
            </span>
          </div>
        </div>

        {/* Right: TYPOGRAPHIC ELEGANT EDITORIAL CARD (NO PHOTOS) */}
        <div className="w-full lg:w-1/2 flex flex-col items-center z-10">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl bg-white border border-neutral-200 p-8 sm:p-10 flex flex-col justify-between magazine-shadow transition-all duration-500 hover:shadow-2xl">
            {/* Top Masthead Accent */}
            <div className="flex justify-between items-center text-xs text-neutral-500 uppercase tracking-widest font-mono border-b border-neutral-100 pb-4">
              <span className="font-pinyon text-xl text-neutral-900 tracking-normal normal-case">
                Nunay Daily
              </span>
              <span className="text-[10px] text-emerald-700 font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200">
                Studio Issue No. 01
              </span>
            </div>

            {/* Center Typographic Editorial Highlight */}
            <div className="text-center py-6 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-400 font-bold font-montserrat block">
                The Art of Editorial Publishing
              </span>
              <h2 className="text-5xl sm:text-6xl font-normal font-pinyon text-neutral-900 leading-none">
                Elegance in Every Page
              </h2>
              <div className="w-12 h-px bg-emerald-600 mx-auto" />
              <p className="text-sm font-serif italic text-neutral-600 max-w-xs mx-auto leading-relaxed">
                "Where bespoke names and high fashion typography unite in seamless harmony."
              </p>
            </div>

            {/* Bottom Card Notes */}
            <div className="pt-4 border-t border-neutral-100 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <span>Rule: Contains "nunay"</span>
                <span>Format: DIN A4 Print</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-serif text-neutral-700 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/80">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="italic">Named after both creators • Pure minimal beauty</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= POWERPOINT WORKFLOW HIGHLIGHTS ================= */}
      <section className="bg-white border-t border-neutral-200 py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-800 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
              POWERPOINT MAGAZINE WORKFLOW
            </span>
            <h3 className="text-3xl sm:text-4xl font-normal text-neutral-900 font-pinyon tracking-normal">
              A Complete Magazine, Page by Page
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-sans">
              Manage your pages in the left slide deck, choose from curated editorial templates, and
              print the entire publication as a DIN A4 booklet with automatic photo attribution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: 'Cover Spread',
                desc: 'Vogue, Time, Rolling Stone & GQ styles with barcodes, mastheads & precision controls.',
                icon: Sparkles,
                badge: 'Page 1',
              },
              {
                title: 'Table of Contents',
                desc: 'Editorial index with page markers, feature topics & custom Editor’s Letter.',
                icon: Layers,
                badge: 'Page 2',
              },
              {
                title: 'Articles & Interviews',
                desc: 'Two-column editorial text with drop caps, imagery & pull quotes.',
                icon: Sliders,
                badge: 'Page 3',
              },
              {
                title: 'Photo Essays & Credits',
                desc: 'Curated 4-image grid and mandatory photo links automatically indexed on back cover.',
                icon: Printer,
                badge: 'Pages 4–6',
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-neutral-50/70 border border-neutral-200/90 hover:border-emerald-500/50 hover:bg-white transition-all duration-300 ease-out hover:-translate-y-1 shadow-2xs space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white border border-neutral-200 flex items-center justify-center text-emerald-600 shadow-2xs group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-neutral-200/70 text-neutral-700">
                      {feat.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-neutral-900 uppercase font-montserrat">{feat.title}</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          {/* Bottom Big Banner */}
          <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left shadow-xs">
            <div>
              <h4 className="text-2xl font-normal font-pinyon text-neutral-900">
                Ready to create your Nunay Daily edition?
              </h4>
              <p className="text-xs text-neutral-600 mt-1">
                Start crafting right in your browser. No download or setup required.
              </p>
            </div>
            <button
              onClick={onStartNewCreation}
              className="px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs uppercase tracking-wider cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shadow-md shadow-emerald-950/20 flex items-center gap-2 shrink-0"
            >
              <PlusCircle className="w-4 h-4 text-white" />
              <span>Start Designing Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
