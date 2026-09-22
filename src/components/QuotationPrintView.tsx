import React, { useState } from 'react';
import { Printer, Shield, ArrowLeft, CheckCircle2, Lock, Eye, EyeOff, Sparkles, Building2 } from 'lucide-react';
import { Quotation } from '../types';

interface QuotationPrintViewProps {
  quotation?: Quotation;
  onBackToBuilder?: () => void;
  defaultSanitized?: boolean;
}

export const QuotationPrintView: React.FC<QuotationPrintViewProps> = ({
  quotation,
  onBackToBuilder,
  defaultSanitized = true
}) => {
  const [isSanitized, setIsSanitized] = useState<boolean>(defaultSanitized);

  // Fallback sample quote if none provided
  const activeQuote: Quotation = quotation || {
    id: 'quote-sample',
    quoteNumber: 'QT-2026-0842',
    date: '2026-09-22',
    validUntil: '2026-10-22',
    clientName: 'Robert Langdon',
    clientCompany: 'Apex Industrial Automation Ltd',
    clientEmail: 'procurement@apex-industrial.com',
    clientPhone: '+1 (555) 392-8810',
    clientAddress: '4200 Technology Parkway, Suite 100, Houston, TX',
    staffName: 'David Chen',
    staffRole: 'Senior Technical Sales Eng.',
    status: 'Approved',
    currency: 'USD',
    currencySymbol: '$',
    discountPercent: 0,
    taxRate: 5,
    notes: 'Authorized distributor commercial quotation. Prices valid for 30 calendar days. Ex-works warehouse dispatch.',
    items: [
      {
        id: 'li-1',
        productCode: 'LC1D25M7',
        description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 25 A - 220 V AC coil',
        unitPrice: 78.50,
        quantity: 6,
        discountPercent: 0,
        unit: 'pcs'
      },
      {
        id: 'li-2',
        productCode: 'A9F74216',
        description: 'Acti9 iC60N miniature circuit breaker - 2P - 16A - C curve 6000 A',
        unitPrice: 28.40,
        quantity: 12,
        discountPercent: 0,
        unit: 'pcs'
      },
      {
        id: 'li-3',
        productCode: 'EZC100H3060',
        description: 'EasyPact EZC100H circuit breaker - TMD - 60 A - 3 poles 3d - 30kA',
        unitPrice: 165.00,
        quantity: 2,
        discountPercent: 0,
        unit: 'pcs'
      }
    ]
  };

  const subtotal = activeQuote.items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const tax = (subtotal * activeQuote.taxRate) / 100;
  const grandTotal = subtotal + tax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full h-full min-h-[640px] bg-slate-100 text-slate-800 flex flex-col font-sans">
      {/* Top Action Bar */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs print:hidden">
        <div className="flex items-center gap-3">
          {onBackToBuilder && (
            <button
              onClick={onBackToBuilder}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
              title="Return to Quotation Tool"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <h1 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <span>Official Quotation Document</span>
              <span className="font-mono text-xs font-semibold text-slate-500">
                ({activeQuote.quoteNumber})
              </span>
            </h1>
            <p className="text-[11px] text-slate-500">
              Print-ready formatted document with sanitized proof verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Privacy Sanitizer Toggle */}
          <button
            onClick={() => setIsSanitized(!isSanitized)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isSanitized 
                ? 'bg-amber-50 text-amber-800 border-amber-300 shadow-xs' 
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'
            }`}
          >
            {isSanitized ? <EyeOff className="w-3.5 h-3.5 text-amber-600" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
            <span>{isSanitized ? 'Sanitized Proof View (Active)' : 'Uncensored Internal View'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Document</span>
          </button>
        </div>
      </header>

      {/* Proof Overlay Callouts Banner (35-47s beat) */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 print:hidden">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
            <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>35-47s Proof Mode: Client details, staff identity & proprietary logos sanitized</span>
          </div>

          {/* Three Clean Proof Callouts specified in prompt */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Built for a Schneider Electric-linked distributor</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>~2,000-item master catalog</span>
            </div>
            <div className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-xs">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Quotations in seconds, not hours.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 p-4 sm:p-8 overflow-auto flex justify-center">
        <div className="bg-white rounded-lg shadow-md border border-slate-200 max-w-4xl w-full p-6 sm:p-10 font-sans text-slate-800 relative">
          
          {/* Document Header */}
          <div className="border-b-2 border-slate-800 pb-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-slate-900 text-white font-bold text-base flex items-center justify-center ${
                  isSanitized ? 'blur-xs select-none' : ''
                }`}>
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className={`text-xl font-extrabold text-slate-900 tracking-tight ${
                    isSanitized ? 'blur-xs select-none' : ''
                  }`}>
                    {isSanitized ? 'INDUSTRIAL DISTRIBUTOR LTD' : 'Global Electric Supply & Automation Ltd'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Authorized Industrial Low-Voltage & Automation Systems Distributor
                  </p>
                </div>
              </div>
              <div className={`text-xs text-slate-500 mt-2 space-y-0.5 ${
                isSanitized ? 'blur-xs select-none' : ''
              }`}>
                <p>1200 Switchgear Boulevard, Industrial Zone 4</p>
                <p>sales@distributor-group.com • Tel: +1 (800) 555-8900</p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-2xl font-black text-slate-900 uppercase tracking-wide block">
                COMMERCIAL QUOTATION
              </span>
              <div className="mt-2 space-y-1 text-xs">
                <div>
                  <span className="text-slate-400 font-medium">Quote Reference: </span>
                  <span className="font-mono font-bold text-slate-900">{activeQuote.quoteNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Date Issued: </span>
                  <span className="font-mono text-slate-700">{activeQuote.date}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Valid Until: </span>
                  <span className="font-mono text-slate-700">{activeQuote.validUntil}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Client & Staff Info (Subject to privacy sanitization) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-1">
                QUOTED TO (CLIENT):
              </span>
              <div className={isSanitized ? 'blur-xs select-none' : ''}>
                <div className="font-bold text-slate-900 text-sm">{activeQuote.clientCompany}</div>
                <div className="text-slate-600 font-medium mt-0.5">Attn: {activeQuote.clientName}</div>
                <div className="text-slate-500 mt-1">{activeQuote.clientAddress}</div>
                <div className="text-slate-500">{activeQuote.clientEmail}</div>
              </div>
              {isSanitized && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Lock className="w-3 h-3" /> Confidential Client Data Sanitized
                </div>
              )}
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="text-slate-400 block uppercase font-bold text-[10px] tracking-wider mb-1">
                PREPARED BY (SALES ENGINEER):
              </span>
              <div className={isSanitized ? 'blur-xs select-none' : ''}>
                <div className="font-bold text-slate-900 text-sm">{activeQuote.staffName}</div>
                <div className="text-slate-600 font-medium mt-0.5">{activeQuote.staffRole}</div>
                <div className="text-slate-500 mt-1">Direct: +1 (555) 019-4421</div>
                <div className="text-slate-500">Fast Auto-Matching Logic Applied</div>
              </div>
              {isSanitized && (
                <div className="mt-2 inline-flex items-center gap-1 text-[10px] text-amber-700 font-medium bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                  <Lock className="w-3 h-3" /> Representative Identity Sanitized
                </div>
              )}
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-800 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5 px-2 w-10 text-center">Item</th>
                  <th className="py-2.5 px-3 w-36">Part Number</th>
                  <th className="py-2.5 px-3">Description & Specifications</th>
                  <th className="py-2.5 px-3 w-20 text-center">Qty</th>
                  <th className="py-2.5 px-3 w-24 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 w-28 text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {activeQuote.items.map((item, index) => {
                  const lineTotal = item.unitPrice * item.quantity;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-2 text-center font-mono text-slate-500">
                        {index + 1}
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {item.productCode}
                      </td>
                      <td className="py-3 px-3 text-slate-700">
                        {item.description}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-medium text-slate-900">
                        {item.quantity} {item.unit}
                      </td>
                      <td className={`py-3 px-3 text-right font-mono text-slate-800 ${
                        isSanitized ? 'blur-xs select-none' : ''
                      }`}>
                        ${item.unitPrice.toFixed(2)}
                      </td>
                      <td className={`py-3 px-3 text-right font-mono font-bold text-slate-900 ${
                        isSanitized ? 'blur-xs select-none' : ''
                      }`}>
                        ${lineTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Totals Section */}
          <div className="border-t-2 border-slate-800 pt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="text-xs text-slate-500 max-w-sm space-y-1">
              <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                Commercial Notes:
              </span>
              <p>{activeQuote.notes}</p>
              <p className="text-[10px] text-slate-400">
                Generated via AI-Powered Catalog Matching Tool in 14.2 seconds.
              </p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal Net:</span>
                <span className={`font-mono font-medium text-slate-900 ${
                  isSanitized ? 'blur-xs select-none' : ''
                }`}>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Sales Tax / VAT ({activeQuote.taxRate}%):</span>
                <span className={`font-mono font-medium text-slate-900 ${
                  isSanitized ? 'blur-xs select-none' : ''
                }`}>
                  ${tax.toFixed(2)}
                </span>
              </div>
              <div className="pt-2 border-t-2 border-slate-900 flex justify-between items-baseline">
                <span className="text-sm font-black text-slate-900 uppercase">Grand Total:</span>
                <span className={`text-lg font-mono font-black text-slate-900 ${
                  isSanitized ? 'blur-xs select-none' : ''
                }`}>
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Floating Proof Callout Cards (35-47s Proof & Hold) */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 p-6 rounded-b-lg flex flex-col sm:flex-row items-center justify-around gap-4 text-center">
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900">
                “Built for a Schneider Electric-linked distributor”
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Handles complex model codes, tiered discounts, and stock validation
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900">
                “~2,000-item master catalog”
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Instant fuzzy search, prefix matching, and automatic price lookup
              </p>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block" />
            <div className="flex-1">
              <div className="text-xs font-bold text-slate-900 text-emerald-700">
                “Quotations in seconds, not hours.”
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Zero manual copy-pasting • Zero formula errors
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
