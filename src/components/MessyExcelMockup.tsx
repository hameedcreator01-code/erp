import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Search, Copy, AlertTriangle, ArrowRight, CornerDownLeft, Clock } from 'lucide-react';

interface MessyExcelMockupProps {
  onSwitchToTool?: () => void;
  isAutoPlaying?: boolean;
}

export const MessyExcelMockup: React.FC<MessyExcelMockupProps> = ({ onSwitchToTool, isAutoPlaying }) => {
  const [activeCell, setActiveCell] = useState<{ r: number; c: number }>({ r: 4, c: 3 });
  const [copyStep, setCopyStep] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCopyStep(prev => (prev + 1) % 4);
    }, 1200);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full h-full min-h-[620px] bg-slate-900 text-slate-100 flex flex-col font-sans overflow-hidden select-none">
      {/* Excel Window Header */}
      <div className="bg-[#107c41] text-white px-4 py-2 flex items-center justify-between text-xs font-medium shadow">
        <div className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          <span className="font-semibold tracking-wide">Quotation_Draft_2026_FINAL_v3_copy(2).xlsx - Excel</span>
        </div>
        <div className="flex items-center gap-4 text-emerald-100 text-[11px]">
          <span>AutoSave: OFF</span>
          <span className="bg-red-500/80 text-white px-2 py-0.5 rounded font-mono">Unsaved changes</span>
        </div>
      </div>

      {/* Excel Ribbon Toolbar */}
      <div className="bg-slate-100 text-slate-700 px-3 py-1.5 border-b border-slate-300 flex items-center gap-4 text-xs">
        <div className="flex items-center gap-1 font-semibold text-[#107c41] border-b-2 border-[#107c41] pb-0.5">
          Home
        </div>
        <span className="text-slate-400">Insert</span>
        <span className="text-slate-400">Page Layout</span>
        <span className="text-slate-400">Formulas</span>
        <span className="text-slate-400">Data</span>
        <div className="ml-auto flex items-center gap-2 text-slate-500 text-[11px]">
          <span className="flex items-center gap-1 bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
            <AlertTriangle className="w-3 h-3" /> Manual Price Entry
          </span>
        </div>
      </div>

      {/* Formula Bar */}
      <div className="bg-white border-b border-slate-300 px-3 py-1.5 flex items-center gap-2 text-xs text-slate-700 font-mono">
        <div className="w-10 bg-slate-100 text-center py-0.5 rounded border border-slate-300 text-slate-600 font-semibold">
          D{activeCell.r + 1}
        </div>
        <div className="text-slate-400 font-serif italic text-sm">fx</div>
        <div className="flex-1 bg-white px-2 py-0.5 border border-slate-200 rounded text-slate-800">
          {copyStep === 0 && 'LC1D25M7'}
          {copyStep === 1 && '=VLOOKUP(B5, PriceList_2024.xlsx!$A$1:$E$2000, 4, FALSE)'}
          {copyStep === 2 && '#N/A (Catalog file disconnected)'}
          {copyStep === 3 && '78.50 /* manual override from PDF sheet */'}
        </div>
      </div>

      {/* Spreadsheets Area */}
      <div className="flex-1 bg-slate-200 overflow-auto p-2">
        <div className="bg-white rounded shadow border border-slate-300 overflow-hidden">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 text-slate-500 font-semibold text-center border-b border-slate-300">
                <th className="w-10 py-1 border-r border-slate-300">#</th>
                <th className="w-14 py-1 border-r border-slate-300">A</th>
                <th className="w-36 py-1 border-r border-slate-300">B (Part Number)</th>
                <th className="py-1 border-r border-slate-300">C (Description)</th>
                <th className="w-24 py-1 border-r border-slate-300">D (Unit Price)</th>
                <th className="w-16 py-1 border-r border-slate-300">E (Qty)</th>
                <th className="w-28 py-1">F (Total)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              <tr className="hover:bg-slate-50">
                <td className="bg-slate-100 text-slate-500 text-center py-1.5 font-sans border-r border-slate-300">1</td>
                <td className="p-1.5 text-center text-slate-400">01</td>
                <td className="p-1.5 text-slate-800 font-medium">LC1D09M7</td>
                <td className="p-1.5 text-slate-600 truncate max-w-[200px]">TeSys D contactor 9A 220V AC coil</td>
                <td className="p-1.5 text-right text-slate-800">$46.20</td>
                <td className="p-1.5 text-center text-slate-800">4</td>
                <td className="p-1.5 text-right font-medium text-slate-900">$184.80</td>
              </tr>

              <tr className="bg-amber-50/70 border-l-4 border-l-amber-500">
                <td className="bg-slate-100 text-slate-500 text-center py-1.5 font-sans border-r border-slate-300">2</td>
                <td className="p-1.5 text-center text-slate-400">02</td>
                <td className="p-1.5 text-amber-900 font-medium">LC1D25M7</td>
                <td className="p-1.5 text-slate-600 truncate max-w-[200px]">
                  <span className="bg-yellow-200 px-1 py-0.5 rounded text-amber-950 font-sans">
                    [Need to check PDF pricelist page 114]
                  </span>
                </td>
                <td className="p-1.5 text-right bg-yellow-200/90 text-amber-950 font-bold border-2 border-amber-500 animate-pulse">
                  $78.50?
                </td>
                <td className="p-1.5 text-center text-slate-800">6</td>
                <td className="p-1.5 text-right text-red-600 font-medium">#VALUE!</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="bg-slate-100 text-slate-500 text-center py-1.5 font-sans border-r border-slate-300">3</td>
                <td className="p-1.5 text-center text-slate-400">03</td>
                <td className="p-1.5 text-slate-800 font-medium">A9F74216</td>
                <td className="p-1.5 text-slate-600 truncate max-w-[200px]">Acti9 iC60N 2P 16A C-curve breaker</td>
                <td className="p-1.5 text-right text-slate-800">$28.40</td>
                <td className="p-1.5 text-center text-slate-800">12</td>
                <td className="p-1.5 text-right font-medium text-slate-900">$340.80</td>
              </tr>

              <tr className="hover:bg-slate-50">
                <td className="bg-slate-100 text-slate-500 text-center py-1.5 font-sans border-r border-slate-300">4</td>
                <td className="p-1.5 text-center text-slate-400">04</td>
                <td className="p-1.5 text-slate-800 font-medium">EZC100H3060</td>
                <td className="p-1.5 text-slate-600 truncate max-w-[200px]">EasyPact EZC100H TMD 60A 3P 30kA</td>
                <td className="p-1.5 text-right text-slate-400 italic">Looking up...</td>
                <td className="p-1.5 text-center text-slate-800">2</td>
                <td className="p-1.5 text-right text-slate-400">--</td>
              </tr>

              {/* Empty placeholder rows showing tedious manual sheet */}
              {[5, 6, 7, 8].map(i => (
                <tr key={i} className="text-slate-300">
                  <td className="bg-slate-100 text-slate-400 text-center py-1.5 font-sans border-r border-slate-300">{i}</td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                  <td className="p-1.5"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Manual Clutter (Simulating Real Distractions: Sticky Notes, PDF Lookups, Calculator) */}
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-amber-100 border border-amber-300 rounded p-2.5 text-xs text-amber-900 shadow-sm font-sans flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-amber-950">Discrepancy Warning</div>
              <div className="text-[11px] mt-0.5 text-amber-800">
                "Wait, did Schneider increase TeSys D list prices last month? Check email thread from procurement."
              </div>
            </div>
          </div>

          <div className="bg-slate-100 border border-slate-300 rounded p-2.5 text-xs text-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              <div>
                <div className="font-medium text-slate-800">Time spent on this quote</div>
                <div className="text-[11px] text-red-600 font-semibold font-mono">42 minutes 18 seconds</div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-300 rounded p-2.5 text-xs text-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Copy className="w-4 h-4 text-blue-600" />
              <div>
                <div className="font-medium text-slate-800">Manual Copy-Pasting</div>
                <div className="text-[11px] text-slate-500">14 open browser tabs for catalog PDFs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Mouse Cursor Moving Slowly */}
      <div 
        className="absolute pointer-events-none transition-all duration-1000 ease-out z-20 flex items-center gap-1"
        style={{
          top: copyStep === 0 ? '42%' : copyStep === 1 ? '48%' : copyStep === 2 ? '54%' : '44%',
          left: copyStep === 0 ? '38%' : copyStep === 1 ? '62%' : copyStep === 2 ? '78%' : '52%'
        }}
      >
        <svg className="w-6 h-6 text-slate-900 drop-shadow-md -rotate-45" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2 1-3.2-7.4L7 18.5V2z" />
        </svg>
        <span className="bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow font-sans">
          Copying from PDF...
        </span>
      </div>

      {/* Central Hook Overlay Callout (0-5s exact on-screen text) */}
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px] flex items-center justify-center p-6 z-30">
        <div className="max-w-xl w-full bg-slate-900/95 border border-amber-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl text-center text-white relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-amber-500/20">
            <AlertTriangle className="w-3.5 h-3.5" />
            0-5s • The Manual Quotation Trap
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-3">
            “Still building quotes manually… <br className="hidden sm:block" />
            <span className="text-amber-400">one line at a time?</span>”
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6 font-light max-w-md mx-auto">
            Copy-pasting prices between PDFs and spreadsheets leads to pricing errors, lost margins, and hours wasted on routine lookups.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {onSwitchToTool && (
              <button
                onClick={onSwitchToTool}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>See The Browser-Based Solution</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Voiceover Caption Bar */}
      <div className="bg-slate-950 text-slate-300 border-t border-slate-800 px-4 py-2.5 text-xs flex items-center justify-between z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-semibold text-slate-200">Voiceover (0-5s):</span>
          <span className="text-amber-300 italic">“If your team still copy-pastes prices into every quotation, watch this.”</span>
        </div>
        <span className="text-[11px] text-slate-500">Hook Phase</span>
      </div>
    </div>
  );
};
