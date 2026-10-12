import React, { useState } from 'react';
import type { MagazineState, MagazineDocument, UserProfile } from '../types';
import { validateMagazineNames, nunayize } from '../utils/nunayValidator';
import {
  Printer,
  Download,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Loader2,
  Home,
  FolderHeart,
  Pin,
  Save,
  HelpCircle,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';
import confetti from 'canvas-confetti';

interface HeaderProps {
  currentView: 'home' | 'dashboard' | 'editor';
  onNavigate: (view: 'home' | 'dashboard' | 'editor') => void;
  magazineDoc: MagazineDocument;
  coverState: MagazineState;
  onUpdateState: (updates: Partial<MagazineState>) => void;
  onSaveDocument: () => void;
  onOpenPinterest: () => void;
  onOpenAuth: () => void;
  onOpenTutorial: () => void;
  user: UserProfile;
  activeNodeRef: React.RefObject<HTMLDivElement | null>;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  magazineDoc,
  coverState,
  onUpdateState,
  onSaveDocument,
  onOpenPinterest,
  onOpenAuth,
  onOpenTutorial,
  user,
  activeNodeRef,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [saveToast, setSaveToast] = useState(false);

  const validation = validateMagazineNames(coverState);

  // Fixes all nunay names
  const handleFixAllNunay = () => {
    const updates: Partial<MagazineState> = {};
    if (!validation.isValid) {
      if (!/nunay/i.test(coverState.title)) {
        updates.title = nunayize(coverState.title, 'NUNAY DAILY');
      }
      if (coverState.featuredName && !/nunay/i.test(coverState.featuredName)) {
        updates.featuredName = nunayize(coverState.featuredName, 'Star nunay');
      }
      if (coverState.editorName && !/nunay/i.test(coverState.editorName)) {
        updates.editorName = nunayize(coverState.editorName, 'nunay Studio');
      }
      const updatedTeasers = coverState.teasers.map((t) => {
        if (t.personName && !/nunay/i.test(t.personName)) {
          return { ...t, personName: nunayize(t.personName) };
        }
        return t;
      });
      updates.teasers = updatedTeasers;
      onUpdateState(updates);

      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.2 },
        colors: ['#059669', '#10b981', '#f59e0b', '#000000'],
      });
    }
  };

  const handleManualSave = () => {
    onSaveDocument();
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handlePrint = () => {
    if (!validation.isValid) {
      alert(
        `Druck nicht möglich!\nFolgende Namen müssen zwingend "nunay" enthalten:\n` +
          validation.errors.map((e) => `- ${e.label} (aktuell: "${e.current}")`).join('\n')
      );
      return;
    }
    window.print();
  };

  const handleDownloadPng = async () => {
    if (!validation.isValid) {
      alert('Bitte stelle sicher, dass alle Namen "nunay" enthalten, bevor du exportierst!');
      return;
    }

    if (!activeNodeRef.current) return;

    try {
      setIsExporting(true);
      const dataUrl = await toPng(activeNodeRef.current, {
        pixelRatio: 3,
        quality: 0.98,
      });

      const link = document.createElement('a');
      link.download = `${magazineDoc.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-page.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('PNG export failed', err);
      alert('Export fehlgeschlagen. Bitte versuche es erneut.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleDownloadPdf = async () => {
    if (!validation.isValid) {
      alert('Bitte stelle sicher, dass alle Namen "nunay" enthalten, bevor du exportierst!');
      return;
    }

    if (!activeNodeRef.current) return;

    try {
      setIsExporting(true);
      const dataUrl = await toPng(activeNodeRef.current, {
        pixelRatio: 2.5,
        quality: 0.98,
      });

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${magazineDoc.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-magazin.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
      alert('PDF Erstellung fehlgeschlagen.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <header className="h-16 border-b border-neutral-200/90 bg-white/95 backdrop-blur-md px-3 sm:px-6 flex items-center justify-between sticky top-0 z-50 no-print shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      {/* Brand with Elegant Cursive Title & Main Navigation */}
      <div className="flex items-center gap-3 sm:gap-6">
        <div
          onClick={() => onNavigate('home')}
          className="flex items-center cursor-pointer group"
        >
          <div className="flex flex-col">
            <span className="font-pinyon text-3xl sm:text-4xl text-neutral-900 leading-none tracking-normal drop-shadow-xs group-hover:text-emerald-700 transition-colors">
              Nunay Daily
            </span>
            <span className="text-[9px] font-mono tracking-[0.25em] uppercase text-emerald-700 font-semibold pl-1">
              Editorial Studio
            </span>
          </div>
        </div>

        {/* View Switcher Tabs - Crisp & Sharp */}
        <nav className="flex items-center gap-1 bg-neutral-100 p-1 rounded-xl border border-neutral-200">
          <button
            onClick={() => onNavigate('home')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              currentView === 'home'
                ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200/80'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-neutral-700" />
            <span className="hidden md:inline">Home</span>
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              currentView === 'dashboard'
                ? 'bg-white text-neutral-900 shadow-sm border border-neutral-200/80'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FolderHeart className="w-3.5 h-3.5 text-emerald-600" />
            <span>Creations</span>
          </button>

          <button
            onClick={() => onNavigate('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
              currentView === 'editor'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-neutral-500 hover:text-neutral-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Editor</span>
          </button>
        </nav>
      </div>

      {/* Middle: Nunay Compliance Pill */}
      {currentView === 'editor' && (
        <div className="hidden xl:flex items-center">
          {validation.isValid ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Nunay rule satisfied ✓</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold animate-pulse">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>"nunay" missing in {validation.errors.length} fields</span>
              <button
                onClick={handleFixAllNunay}
                className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Sparkles className="w-3 h-3" /> Auto-Fix
              </button>
            </div>
          )}
        </div>
      )}

      {/* Actions & User Profile (NO LOGO ON TOP RIGHT) */}
      <div className="flex items-center gap-2">
        {/* Tutorial & Help Button */}
        <button
          onClick={onOpenTutorial}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
          title="Tutorial & Name Story"
        >
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span className="hidden sm:inline">Guide</span>
        </button>

        {/* Pinterest Inspiration Button */}
        <button
          onClick={onOpenPinterest}
          className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-red-200 bg-red-50 hover:bg-red-100/70 text-red-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
          title="Open Pinterest Inspiration"
        >
          <Pin className="w-3.5 h-3.5 text-red-600 fill-current" />
          <span className="hidden sm:inline">Pinterest</span>
        </button>

        {/* Editor Actions: Save, Print, PNG, PDF */}
        {currentView === 'editor' && (
          <>
            <button
              onClick={handleManualSave}
              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              title="Save magazine to 'My Creations'"
            >
              <Save className="w-3.5 h-3.5 text-emerald-600" />
              <span className="hidden md:inline">{saveToast ? 'Saved!' : 'Save'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              title="Print full magazine"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden lg:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={isExporting}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-800 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm disabled:opacity-50"
              title="Download current page as PNG"
            >
              <Download className="w-3.5 h-3.5 text-neutral-600" />
              <span className="hidden xl:inline">PNG</span>
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black flex items-center gap-1.5 cursor-pointer transition-all shadow-sm disabled:opacity-50"
              title="Export as PDF"
            >
              {isExporting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <FileText className="w-3.5 h-3.5" />
              )}
              <span>PDF</span>
            </button>
          </>
        )}

        {/* User Profile / Login - Clean text with NO logo icon */}
        <button
          onClick={onOpenAuth}
          className="flex items-center px-3 py-1.5 rounded-xl border border-neutral-200 bg-white hover:bg-neutral-50 cursor-pointer transition-colors shadow-sm"
          title="User Profile & Sign In"
        >
          <span className="text-xs font-mono font-bold text-neutral-800 max-w-[130px] truncate">
            {user.username}
          </span>
        </button>
      </div>
    </header>
  );
};
