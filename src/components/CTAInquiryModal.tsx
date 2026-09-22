import React, { useState } from 'react';
import { 
  X, UploadCloud, FileSpreadsheet, CheckCircle2, 
  Send, Sparkles, ArrowRight, ShieldCheck, Mail, Phone, Building, User 
} from 'lucide-react';

interface CTAInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CTAInquiryModal: React.FC<CTAInquiryModalProps> = ({ isOpen, onClose }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('We need a custom quotation builder for our industrial supply catalog (~1,500 - 5,000 items) with automatic pricing and distributor margins.');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const dropped = e.dataTransfer.files[0];
      setFile(dropped);
      setFileName(dropped.name);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selected = e.target.files[0];
      setFile(selected);
      setFileName(selected.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden font-sans my-8">
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 border border-emerald-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            47-60s • Custom Tool Development
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            “Send me your product list—I'll build the matching logic around it.”
          </h2>
          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
            Order now or message me. Send your catalog in Excel or CSV, and I'll deliver a dedicated browser-based quotation tool tailored to your exact SKU codes, descriptions, and pricing tiers.
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Product List Received!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Thank you! I will review your product catalog structure ({fileName || 'Standard Industrial Catalog'}) and configure the automated autocomplete lookup, pricing algorithms, and manager dashboard for your team.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Return to Quotation Tool
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* File Upload Zone */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">
                  1. Upload Your Product Catalog (Excel / CSV):
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleFileDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-all ${
                    isDragging
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : file
                      ? 'border-emerald-400 bg-emerald-50/20'
                      : 'border-slate-300 bg-slate-50 hover:bg-slate-100/70'
                  }`}
                >
                  <input
                    type="file"
                    id="catalog-upload"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <label htmlFor="catalog-upload" className="cursor-pointer flex flex-col items-center">
                    {file ? (
                      <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                        <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                        <span className="font-mono text-sm">{fileName}</span>
                        <span className="text-[10px] bg-emerald-100 px-2 py-0.5 rounded text-emerald-800">
                          Ready for ingestion
                        </span>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="w-8 h-8 text-slate-400 mb-1.5" />
                        <span className="font-semibold text-slate-700 text-sm">
                          Click to browse or drag & drop catalog file
                        </span>
                        <span className="text-[11px] text-slate-500 mt-0.5">
                          Supports .xlsx, .xls, or .csv up to 100,000 SKUs
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Contact Information Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Your Name *</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Henderson"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-emerald-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Work Email *</label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="e.g. alex@distributor.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-emerald-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Company / Organization *</label>
                  <div className="relative">
                    <Building className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Midwest Switchgear & Controls"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-emerald-600 focus:bg-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Approx. Catalog Items</label>
                  <select
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-emerald-600 focus:bg-white outline-none"
                  >
                    <option>500 – 2,000 items (Standard)</option>
                    <option>2,000 – 10,000 items (Medium)</option>
                    <option>10,000+ items (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Specific Requirements or Formulas:</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-900 focus:border-emerald-600 focus:bg-white outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Confidential NDA • No data shared</span>
                </div>

                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Order Now / Send Product List</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
