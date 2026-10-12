import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Volume2,
  Layers,
  Pin,
  Camera,
  CheckCircle2,
} from 'lucide-react';

interface TutorialWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TutorialWidget: React.FC<TutorialWidgetProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0);

  if (!isOpen) return null;

  const steps = [
    {
      badge: 'Welcome',
      title: 'Welcome to NUNAY DAILY',
      icon: Sparkles,
      content: (
        <div className="space-y-2 text-xs text-neutral-600">
          <p>
            <strong>NUNAY DAILY</strong> is your interactive editorial studio for creating complete multi-page magazines with <strong>PowerPoint simplicity</strong>.
          </p>
          <p className="text-neutral-500">
            Every creation is powered by the <em>NUNAY DAILY</em> masthead, featuring covers, table of contents, article spreads, and quotes.
          </p>
        </div>
      ),
    },
    {
      badge: 'Name Origin & Story',
      title: 'The Meaning & Pronunciation of "nunay"',
      icon: Volume2,
      content: (
        <div className="space-y-3 text-xs text-neutral-600">
          {/* Namensherkunft */}
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
            <span className="font-bold block mb-1 text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Combination of both creator names
            </span>
            <p className="text-[11px] leading-relaxed">
              The name <strong>"nunay"</strong> represents the <strong>combination of both creators' names</strong>!
            </p>
          </div>

          {/* Aussprache */}
          <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-800 space-y-1">
            <span className="font-bold block text-neutral-900 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> How to pronounce it:
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
              <div className="p-2 rounded bg-white border border-neutral-200 font-mono">
                <span className="text-emerald-700 font-bold">"nu"</span> sounds like the <strong className="text-neutral-900">"oo" in moon</strong>
              </div>
              <div className="p-2 rounded bg-white border border-neutral-200 font-mono">
                <span className="text-emerald-700 font-bold">"ay"</span> sounds like <strong className="text-neutral-900">"ai" / "eye"</strong>
              </div>
            </div>
            <p className="text-[10px] text-neutral-500 pt-1 font-mono text-center">
              Phonetic: [nuːˈaɪ] • Pronounced: <em>"Noo-eye"</em>
            </p>
          </div>

          {/* Automatischer Username */}
          <p className="text-[11px] text-neutral-500">
            Therefore, all magazine titles, featured personalities, and your user account must contain the word <strong>"nunay"</strong>!
          </p>
        </div>
      ),
    },
    {
      badge: 'PowerPoint Deck',
      title: 'Multi-Page Slide Navigator',
      icon: Layers,
      content: (
        <div className="space-y-2 text-xs text-neutral-600">
          <p>
            The left sidebar organizes your magazine pages exactly like slides in <strong>PowerPoint</strong>:
          </p>
          <ul className="list-disc list-inside space-y-1 text-neutral-500 text-[11px]">
            <li>Front cover in Vogue, Time, and GQ aesthetics</li>
            <li>Table of Contents with Editor’s Letter</li>
            <li>Two-column editorial articles and interviews</li>
            <li>Photo essays and typographic pull quotes</li>
            <li>Reorder pages via arrow controls or duplicate in 1 click</li>
          </ul>
        </div>
      ),
    },
    {
      badge: 'Pin Bar',
      title: 'Drag & Drop Website Quick-Access Bar',
      icon: Pin,
      content: (
        <div className="space-y-2 text-xs text-neutral-600">
          <p>
            At the top header bar, you can easily <strong>drag & drop or paste URLs</strong> from your favorite design websites (such as Pinterest, Behance, or Unsplash).
          </p>
          <p className="text-neutral-500 text-[11px]">
            They stay permanently pinned as handy quick-access widgets.
          </p>
        </div>
      ),
    },
    {
      badge: 'Photo Credits',
      title: 'Automatic Photo Credits on Final Page',
      icon: Camera,
      content: (
        <div className="space-y-2 text-xs text-neutral-600">
          <p>
            The final page of your magazine automatically gathers all image URLs used across all pages into a <strong>Photo Credits directory</strong>.
          </p>
          <p className="text-neutral-500 text-[11px]">
            Your magazine is instantly print-ready, legally transparent, and publication-ready.
          </p>
        </div>
      ),
    },
  ];

  const current = steps[step];
  const Icon = current.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-200 no-print">
      <div className="bg-white border border-neutral-200 rounded-3xl w-full max-w-lg shadow-2xl p-6 relative overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              {current.badge}
            </span>
            <span className="text-xs text-neutral-400 font-mono">
              {step + 1} / {steps.length}
            </span>
          </div>

          {/* Skip Button */}
          <button
            onClick={onClose}
            className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>Skip Guide</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="space-y-4 my-2 flex-1">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 uppercase font-montserrat leading-tight">
              {current.title}
            </h3>
          </div>

          <div className="py-1">{current.content}</div>
        </div>

        {/* Footer Navigation */}
        <div className="pt-4 border-t border-neutral-100 flex items-center justify-between mt-3">
          <button
            onClick={() => setStep((prev) => Math.max(0, prev - 1))}
            disabled={step === 0}
            className="px-3 py-1.5 rounded-xl border border-neutral-200 bg-white text-neutral-600 hover:text-black disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 text-xs font-semibold cursor-pointer transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-2 rounded-full transition-all ${
                  step === i ? 'bg-emerald-600 w-5' : 'bg-neutral-200 w-2'
                }`}
              />
            ))}
          </div>

          {step < steps.length - 1 ? (
            <button
              onClick={() => setStep((prev) => Math.min(steps.length - 1, prev + 1))}
              className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors shadow-sm"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white flex items-center gap-1.5 text-xs font-bold cursor-pointer transition-colors shadow-sm"
            >
              <span>Get Started</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
