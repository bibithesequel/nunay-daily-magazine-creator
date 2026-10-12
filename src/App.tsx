import React, { useState, useRef, useEffect } from 'react';
import type {
  MagazineState,
  MagazineDocument,
  MagazinePage,
  SlideType,
  UserProfile,
} from './types';
import {
  getSavedCreations,
  saveCreation,
  deleteCreation,
  duplicateCreation,
  getUserProfile,
  createInitialDocument,
} from './utils/storage';
import { createNewSlide } from './utils/slideTemplates';
import { validateMagazineNames, nunayize } from './utils/nunayValidator';

import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { PowerPointSlides } from './components/Editor/PowerPointSlides';
import { SlideRenderer } from './components/Editor/SlideRenderer';
import { SlideInspector } from './components/Editor/SlideInspector';
import { PinterestWindow } from './components/PinterestWindow';
import { AuthModal } from './components/AuthModal';
import { WebsitePinBar } from './components/WebsitePinBar';
import { TutorialWidget } from './components/TutorialWidget';

import { Sparkles, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'editor'>('home');
  const [user, setUser] = useState<UserProfile>(getUserProfile());
  const [creations, setCreations] = useState<MagazineDocument[]>(getSavedCreations());
  const [currentDoc, setCurrentDoc] = useState<MagazineDocument>(
    creations[0] || createInitialDocument()
  );
  const [activePageIndex, setActivePageIndex] = useState<number>(0);

  const [isPinterestOpen, setIsPinterestOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const activeNodeRef = useRef<HTMLDivElement | null>(null);

  // Auto-Save when doc changes
  useEffect(() => {
    saveCreation(currentDoc);
  }, [currentDoc]);

  // Active Page & Validation
  const activePage = currentDoc.pages[activePageIndex] || currentDoc.pages[0];
  const validation = validateMagazineNames(currentDoc.coverState);

  // Handle Navigation
  const handleNavigate = (view: 'home' | 'dashboard' | 'editor') => {
    setCurrentView(view);
  };

  // Start new creation
  const handleStartNewCreation = () => {
    const newDoc = createInitialDocument();
    newDoc.title = `NUNAY DAILY • AUSGABE #${Math.floor(Math.random() * 900 + 100)}`;
    const updatedList = [newDoc, ...creations];
    setCreations(updatedList);
    setCurrentDoc(newDoc);
    setActivePageIndex(0);
    setCurrentView('editor');

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.3 },
    });
  };

  const handleOpenCreation = (doc: MagazineDocument) => {
    setCurrentDoc(doc);
    setActivePageIndex(0);
    setCurrentView('editor');
  };

  const handleDuplicate = (id: string) => {
    const copy = duplicateCreation(id);
    if (copy) {
      setCreations(getSavedCreations());
    }
  };

  const handleDelete = (id: string) => {
    const remaining = deleteCreation(id);
    setCreations(remaining);
    if (currentDoc.id === id) {
      setCurrentDoc(remaining[0] || createInitialDocument());
      setActivePageIndex(0);
    }
  };

  // Cover updates
  const handleUpdateCover = (updates: Partial<MagazineState>) => {
    setCurrentDoc((prev) => ({
      ...prev,
      title: updates.title || prev.title,
      coverState: {
        ...prev.coverState,
        ...updates,
      },
      pages: prev.pages.map((p, idx) =>
        idx === 0
          ? {
              ...p,
              title: updates.title || p.title,
              subtitle: updates.subtitle || p.subtitle,
            }
          : p
      ),
    }));
  };

  // Page updates
  const handleUpdatePage = (updates: Partial<MagazinePage>) => {
    setCurrentDoc((prev) => ({
      ...prev,
      pages: prev.pages.map((p, idx) => (idx === activePageIndex ? { ...p, ...updates } : p)),
    }));
  };

  // Add Slide
  const handleAddSlide = (type: SlideType) => {
    const newSlide = createNewSlide(type, currentDoc.pages.length + 1);
    setCurrentDoc((prev) => ({
      ...prev,
      pages: [...prev.pages, newSlide],
    }));
    setActivePageIndex(currentDoc.pages.length);
  };

  // Duplicate Slide
  const handleDuplicateSlide = (index: number) => {
    const target = currentDoc.pages[index];
    const copy: MagazinePage = {
      ...JSON.parse(JSON.stringify(target)),
      id: `page-${Date.now()}`,
      pageNumber: currentDoc.pages.length + 1,
      title: `${target.title} (Kopie)`,
    };
    const newPages = [...currentDoc.pages];
    newPages.splice(index + 1, 0, copy);

    // Renumber
    const renumbered = newPages.map((p, i) => ({ ...p, pageNumber: i + 1 }));

    setCurrentDoc((prev) => ({ ...prev, pages: renumbered }));
    setActivePageIndex(index + 1);
  };

  // Delete Slide
  const handleDeleteSlide = (index: number) => {
    if (currentDoc.pages.length <= 1) return;
    const remaining = currentDoc.pages.filter((_, i) => i !== index);
    const renumbered = remaining.map((p, i) => ({ ...p, pageNumber: i + 1 }));

    setCurrentDoc((prev) => ({ ...prev, pages: renumbered }));
    setActivePageIndex(Math.max(0, index - 1));
  };

  // Move Slide
  const handleMoveSlide = (index: number, direction: 'up' | 'down') => {
    const newPages = [...currentDoc.pages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newPages.length) return;

    const temp = newPages[index];
    newPages[index] = newPages[targetIndex];
    newPages[targetIndex] = temp;

    const renumbered = newPages.map((p, i) => ({ ...p, pageNumber: i + 1 }));
    setCurrentDoc((prev) => ({ ...prev, pages: renumbered }));
    setActivePageIndex(targetIndex);
  };

  // Fix All Nunay
  const handleFixAllNunay = () => {
    const updates: Partial<MagazineState> = {};
    if (!/nunay/i.test(currentDoc.coverState.title)) {
      updates.title = nunayize(currentDoc.coverState.title, 'NUNAY MAGAZINE');
    }
    if (currentDoc.coverState.featuredName && !/nunay/i.test(currentDoc.coverState.featuredName)) {
      updates.featuredName = nunayize(currentDoc.coverState.featuredName, 'Star nunay');
    }
    if (currentDoc.coverState.editorName && !/nunay/i.test(currentDoc.coverState.editorName)) {
      updates.editorName = nunayize(currentDoc.coverState.editorName, 'nunay Studio');
    }

    handleUpdateCover(updates);
  };

  return (
    <div className="min-h-screen bg-[#060c09] text-neutral-100 flex flex-col font-sans select-none">
      {/* HEADER BAR */}
      <Header
        currentView={currentView}
        onNavigate={handleNavigate}
        magazineDoc={currentDoc}
        coverState={currentDoc.coverState}
        onUpdateState={handleUpdateCover}
        onSaveDocument={() => saveCreation(currentDoc)}
        onOpenPinterest={() => setIsPinterestOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTutorial={() => setIsTutorialOpen(true)}
        user={user}
        activeNodeRef={activeNodeRef}
      />

      {/* QUICK-ACCESS WEBSITE PIN-BAR (DRAG & DROP / PASTE) */}
      <WebsitePinBar />

      {/* VIEW: STARTSEITE (LANDING PAGE MIT AUTO-REFRESH) */}
      {currentView === 'home' && (
        <LandingPage
          onStartNewCreation={handleStartNewCreation}
          onOpenDashboard={() => setCurrentView('dashboard')}
          onOpenPinterest={() => setIsPinterestOpen(true)}
          creationsCount={creations.length}
        />
      )}

      {/* VIEW: MEINE KREATIONEN (DASHBOARD) */}
      {currentView === 'dashboard' && (
        <Dashboard
          creations={creations}
          onOpenCreation={handleOpenCreation}
          onNewCreation={handleStartNewCreation}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
          onBackToHome={() => setCurrentView('home')}
        />
      )}

      {/* VIEW: POWERPOINT MULTI-PAGE STUDIO (EDITOR) */}
      {currentView === 'editor' && (
        <div className="flex-1 flex overflow-hidden">
          {/* 1. POWERPOINT SLIDES LEISTE (LINKS) */}
          <PowerPointSlides
            pages={currentDoc.pages}
            activePageIndex={activePageIndex}
            onSelectPage={setActivePageIndex}
            onAddSlide={handleAddSlide}
            onDuplicateSlide={handleDuplicateSlide}
            onDeleteSlide={handleDeleteSlide}
            onMoveSlide={handleMoveSlide}
          />

          {/* 2. ZENTRALER STAGE BEREICH (ACTIVE SLIDE) */}
          <main className="flex-1 bg-gradient-to-b from-[#091711]/60 to-[#060c09] p-4 sm:p-8 flex flex-col items-center justify-center overflow-y-auto">
            {/* Nunay Warning Banner */}
            {!validation.isValid && (
              <div className="w-full max-w-[620px] mb-3 p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-center justify-between gap-3 text-rose-200 shadow-lg no-print animate-pulse">
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>
                    Name muss „nunay” enthalten: {validation.errors.map((e) => e.label).join(', ')}
                  </span>
                </div>
                <button
                  onClick={handleFixAllNunay}
                  className="px-2.5 py-1 rounded bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-bold shrink-0 cursor-pointer transition-colors shadow flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" /> Auto-Fix
                </button>
              </div>
            )}

            {/* Slide Node */}
            <div className="w-full flex items-center justify-center py-2">
              <SlideRenderer
                ref={activeNodeRef}
                page={activePage}
                coverState={currentDoc.coverState}
                magazineDoc={currentDoc}
                isLastPage={activePageIndex === currentDoc.pages.length - 1}
              />
            </div>

            <div className="mt-3 text-center text-xs text-neutral-500 no-print flex items-center gap-2">
              <span>Folie {activePageIndex + 1} von {currentDoc.pages.length}</span>
              <span>•</span>
              <span className="capitalize">{activePage.type}</span>
              <span>•</span>
              <span className="text-amber-400/90 font-medium">NUNAY DAILY Studio</span>
            </div>
          </main>

          {/* 3. SLIDE INSPECTOR (RECHTS) */}
          <SlideInspector
            page={activePage}
            coverState={currentDoc.coverState}
            onUpdatePage={handleUpdatePage}
            onUpdateCover={handleUpdateCover}
          />
        </div>
      )}

      {/* PINTEREST SCHNELL-INSPIRATIONS FENSTER */}
      <PinterestWindow
        isOpen={isPinterestOpen}
        onClose={() => setIsPinterestOpen(false)}
      />

      {/* LOGIN & SIGN-IN MODAL */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onLoginSuccess={(u) => setUser(u)}
      />

      {/* TUTORIAL & AUSPRACHE-WIDGET */}
      <TutorialWidget
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
      />
    </div>
  );
};

export default App;
