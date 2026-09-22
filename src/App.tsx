import React, { useState, useEffect, useRef } from 'react';
import { StoryboardPlayer } from './components/StoryboardPlayer';
import { MessyExcelMockup } from './components/MessyExcelMockup';
import { QuotationBuilder } from './components/QuotationBuilder';
import { ManagerDashboard } from './components/ManagerDashboard';
import { QuotationPrintView } from './components/QuotationPrintView';
import { CTAInquiryModal } from './components/CTAInquiryModal';
import { STORYBOARD_SCENES } from './data/storyboard';
import { StoryboardScene, Quotation } from './types';
import { Sparkles, ArrowRight, UploadCloud, MessageSquare } from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mode, setMode] = useState<'video' | 'interactive'>('video');
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'builder' | 'dashboard' | 'proof'>('builder');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState<boolean>(false);
  const [currentQuotation, setCurrentQuotation] = useState<Quotation | undefined>(undefined);

  // Time-driven animation states for video mode
  const [simulatedTypeCode, setSimulatedTypeCode] = useState<string>('');
  const [simulatedCallout, setSimulatedCallout] = useState<string | null>(null);

  // Find active scene based on currentTime
  const activeScene: StoryboardScene = STORYBOARD_SCENES.find(
    (scene) => currentTime >= scene.startTime && currentTime < scene.endTime
  ) || STORYBOARD_SCENES[0];

  // Video playback clock loop
  useEffect(() => {
    if (!isPlaying || mode !== 'video') return;

    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= 60) {
          setIsPlaying(false);
          return 60;
        }
        return Math.round((prev + 0.1) * 10) / 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, mode]);

  // Timed simulated actions during the 11-24s Auto-Fill phase
  useEffect(() => {
    if (mode !== 'video') {
      setSimulatedTypeCode('');
      setSimulatedCallout(null);
      return;
    }

    if (currentTime >= 11 && currentTime < 15) {
      // Step 1: Type model code LC1D25M7
      const progress = (currentTime - 11) / 4;
      const fullText = 'LC1D25M7';
      const charCount = Math.floor(progress * fullText.length);
      setSimulatedTypeCode(fullText.substring(0, charCount));
      setSimulatedCallout('Type a code → price appears instantly');
    } else if (currentTime >= 15 && currentTime < 19) {
      // Step 2: Auto-calculated totals callout
      setSimulatedTypeCode('');
      setSimulatedCallout('Auto-calculated totals');
    } else if (currentTime >= 19 && currentTime < 24) {
      // Step 3: Master catalog match callout
      setSimulatedTypeCode('');
      setSimulatedCallout('~2,000 items matched from the master catalog');
    } else {
      setSimulatedTypeCode('');
      setSimulatedCallout(null);
    }
  }, [currentTime, mode]);

  // Seek handler
  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  const handlePlayPause = () => {
    if (currentTime >= 60) {
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleReset = () => {
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Determine which main view to display
  const renderCurrentView = () => {
    if (mode === 'interactive') {
      if (activeInteractiveTab === 'dashboard') {
        return (
          <ManagerDashboard
            onBackToBuilder={() => setActiveInteractiveTab('builder')}
            onOpenProof={() => setActiveInteractiveTab('proof')}
          />
        );
      }
      if (activeInteractiveTab === 'proof') {
        return (
          <QuotationPrintView
            quotation={currentQuotation}
            onBackToBuilder={() => setActiveInteractiveTab('builder')}
            defaultSanitized={false}
          />
        );
      }
      return (
        <QuotationBuilder
          onOpenPrintProof={() => setActiveInteractiveTab('proof')}
          onOpenDashboard={() => setActiveInteractiveTab('dashboard')}
          onOpenInquiry={() => setIsInquiryModalOpen(true)}
          onQuoteUpdated={setCurrentQuotation}
        />
      );
    }

    // Video Storyboard Mode
    switch (activeScene.activeView) {
      case 'messy_excel':
        return (
          <MessyExcelMockup
            onSwitchToTool={() => {
              setCurrentTime(5.1);
            }}
            isAutoPlaying={isPlaying}
          />
        );
      case 'dashboard':
        return (
          <ManagerDashboard
            onBackToBuilder={() => setCurrentTime(11)}
            onOpenProof={() => setCurrentTime(35)}
          />
        );
      case 'print_proof':
        return (
          <QuotationPrintView
            quotation={currentQuotation}
            onBackToBuilder={() => setCurrentTime(11)}
            defaultSanitized={true}
          />
        );
      case 'quote_builder':
      default:
        return (
          <div className="relative w-full h-full">
            <QuotationBuilder
              onOpenPrintProof={() => setCurrentTime(35)}
              onOpenDashboard={() => setCurrentTime(28)}
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
              highlightSearch={currentTime >= 5 && currentTime < 24}
              highlightResult={currentTime >= 24 && currentTime < 28}
              autoTypedCode={simulatedTypeCode}
              activeCallout={simulatedCallout}
              onQuoteUpdated={setCurrentQuotation}
            />

            {/* CTA Overlay banner during 47-60s CTA phase */}
            {currentTime >= 47 && (
              <div className="absolute inset-0 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-6 z-30">
                <div className="max-w-xl w-full bg-slate-900 border border-emerald-500/50 rounded-2xl p-6 sm:p-8 text-white shadow-2xl text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-emerald-500/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    47-60s • Ready to Automate Your Quotes?
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    “Send me your product list—<br className="hidden sm:block" />
                    <span className="text-emerald-400">I'll build the matching logic around it.</span>”
                  </h3>

                  <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto mb-6 leading-relaxed">
                    Order now or message me. Upload your catalog in Excel or CSV, and get a fast, browser-based quotation tool tailored to your exact parts and pricing.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => setIsInquiryModalOpen(true)}
                      className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <UploadCloud className="w-4 h-4" />
                      <span>Order Now / Send Product List</span>
                    </button>

                    <button
                      onClick={() => setMode('interactive')}
                      className="w-full sm:w-auto px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <span>Explore Interactive App</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Storyboard Video Controller Top Bar */}
      <StoryboardPlayer
        currentTime={currentTime}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSeek={handleSeek}
        onReset={handleReset}
        activeScene={activeScene}
        mode={mode}
        onToggleMode={(newMode) => {
          setMode(newMode);
          if (newMode === 'video' && !isPlaying) {
            setIsPlaying(true);
          }
        }}
      />

      {/* Interactive Mode Navigation Tabs (Visible when user switches to free interactive exploration) */}
      {mode === 'interactive' && (
        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-700 shadow-xs z-30">
          <div className="flex items-center gap-1">
            <span className="font-bold text-slate-900 mr-2">Interactive Tabs:</span>
            <button
              onClick={() => setActiveInteractiveTab('builder')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeInteractiveTab === 'builder'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Quotation Tool
            </button>
            <button
              onClick={() => setActiveInteractiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeInteractiveTab === 'dashboard'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Manager Dashboard
            </button>
            <button
              onClick={() => setActiveInteractiveTab('proof')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                activeInteractiveTab === 'proof'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Print / Proof Document
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsInquiryModalOpen(true)}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>Send Me Your Product List</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Display Viewport */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-slate-100">
        {renderCurrentView()}
      </main>

      {/* Contact / Catalog Ingestion Modal */}
      <CTAInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
      />
    </div>
  );
}
