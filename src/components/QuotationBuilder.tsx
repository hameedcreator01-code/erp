import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Plus, Trash2, Printer, CheckCircle2, 
  Sparkles, FileText, ArrowRight, Zap, RefreshCw, 
  DollarSign, ShieldCheck, Download, Sliders, Info
} from 'lucide-react';
import { ProductItem, QuoteLineItem, Quotation } from '../types';
import { MASTER_CATALOG, searchCatalog, POPULAR_ITEMS } from '../data/catalog';

interface QuotationBuilderProps {
  onOpenPrintProof?: () => void;
  onOpenDashboard?: () => void;
  onOpenInquiry?: () => void;
  highlightSearch?: boolean;
  highlightResult?: boolean;
  autoTypedCode?: string;
  activeCallout?: string | null;
  onQuoteUpdated?: (quote: Quotation) => void;
}

export const QuotationBuilder: React.FC<QuotationBuilderProps> = ({
  onOpenPrintProof,
  onOpenDashboard,
  onOpenInquiry,
  highlightSearch = false,
  highlightResult = false,
  autoTypedCode,
  activeCallout,
  onQuoteUpdated
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<ProductItem[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastAddedPrice, setLastAddedPrice] = useState<number | null>(null);
  const [priceHighlightNotice, setPriceHighlightNotice] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Initial quotation state
  const [quotation, setQuotation] = useState<Quotation>({
    id: 'quote-current',
    quoteNumber: 'QT-2026-0842',
    date: new Date().toISOString().split('T')[0],
    validUntil: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    clientName: 'Robert Langdon',
    clientCompany: 'Apex Industrial Automation Ltd',
    clientEmail: 'procurement@apex-industrial.com',
    clientPhone: '+1 (555) 392-8810',
    clientAddress: '4200 Technology Parkway, Suite 100',
    staffName: 'David Chen',
    staffRole: 'Senior Technical Sales Eng.',
    status: 'Draft',
    currency: 'USD',
    currencySymbol: '$',
    discountPercent: 0,
    taxRate: 5,
    notes: 'Standard distributor commercial quotation. Prices valid for 30 days. Delivery EXW warehouse.',
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
      }
    ]
  });

  // Handle external auto-typed query during video simulation
  useEffect(() => {
    if (autoTypedCode !== undefined) {
      setSearchQuery(autoTypedCode);
      if (autoTypedCode.trim()) {
        const matches = searchCatalog(autoTypedCode, 6);
        setSearchResults(matches);
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }
  }, [autoTypedCode]);

  // Handle manual typing
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      const results = searchCatalog(val, 6);
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectItem = (item: ProductItem) => {
    const newLineItem: QuoteLineItem = {
      id: 'li-' + Date.now() + Math.random().toString(36).substring(2, 5),
      productCode: item.code,
      description: item.description,
      unitPrice: item.unitPrice,
      quantity: 1,
      discountPercent: 0,
      unit: item.unit
    };

    const updated = {
      ...quotation,
      items: [newLineItem, ...quotation.items]
    };
    setQuotation(updated);
    if (onQuoteUpdated) onQuoteUpdated(updated);

    // Visual feedback for instant price auto-fill
    setLastAddedPrice(item.unitPrice);
    setPriceHighlightNotice(`Price pulled: $${item.unitPrice.toFixed(2)} (${item.code})`);
    setTimeout(() => {
      setPriceHighlightNotice(null);
    }, 3000);

    setSearchQuery('');
    setIsDropdownOpen(false);
  };

  const updateItemQty = (id: string, qty: number) => {
    const newQty = Math.max(1, qty);
    const updated = {
      ...quotation,
      items: quotation.items.map(it => it.id === id ? { ...it, quantity: newQty } : it)
    };
    setQuotation(updated);
    if (onQuoteUpdated) onQuoteUpdated(updated);
  };

  const updateItemDiscount = (id: string, disc: number) => {
    const updated = {
      ...quotation,
      items: quotation.items.map(it => it.id === id ? { ...it, discountPercent: Math.max(0, Math.min(100, disc)) } : it)
    };
    setQuotation(updated);
    if (onQuoteUpdated) onQuoteUpdated(updated);
  };

  const removeItem = (id: string) => {
    const updated = {
      ...quotation,
      items: quotation.items.filter(it => it.id !== id)
    };
    setQuotation(updated);
    if (onQuoteUpdated) onQuoteUpdated(updated);
  };

  const resetSampleQuote = () => {
    const initialItems: QuoteLineItem[] = [
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
    ];
    const updated = { ...quotation, items: initialItems };
    setQuotation(updated);
    if (onQuoteUpdated) onQuoteUpdated(updated);
  };

  // Math Calculations (Instant & 100% typo-free)
  const subtotal = quotation.items.reduce((sum, item) => {
    const lineDiscount = (item.unitPrice * item.discountPercent) / 100;
    return sum + (item.unitPrice - lineDiscount) * item.quantity;
  }, 0);

  const globalDiscountAmount = (subtotal * quotation.discountPercent) / 100;
  const taxableAmount = subtotal - globalDiscountAmount;
  const taxAmount = (taxableAmount * quotation.taxRate) / 100;
  const grandTotal = taxableAmount + taxAmount;

  return (
    <div className="relative w-full h-full min-h-[640px] bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Top Banner with exact on-screen prompt text indicator */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                AI-Powered Quotation Tool
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <CheckCircle2 className="w-3 h-3" /> Runs in any browser
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Instant master catalog lookup • ~2,000 live items • Zero manual lookup
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenDashboard && (
            <button
              onClick={onOpenDashboard}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Manager Dashboard</span>
            </button>
          )}

          {onOpenPrintProof && (
            <button
              onClick={onOpenPrintProof}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Document / Proof View</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto max-w-7xl w-full mx-auto space-y-5">
        {/* Active Timed Callouts Overlay (Timed to video sequence) */}
        {activeCallout && (
          <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs sm:text-sm font-semibold animate-bounce">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>{activeCallout}</span>
            </div>
            <span className="text-[11px] bg-emerald-700/80 px-2 py-0.5 rounded text-emerald-100 font-normal">
              Automated Catalog Engine
            </span>
          </div>
        )}

        {/* Floating Price Match Notification */}
        {priceHighlightNotice && (
          <div className="fixed top-20 right-6 z-50 bg-slate-900 text-emerald-400 px-4 py-2.5 rounded-xl shadow-xl border border-emerald-500/30 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{priceHighlightNotice}</span>
          </div>
        )}

        {/* Quotation Metadata Card */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Quote Ref</span>
              <span className="font-mono font-bold text-slate-800 text-sm">{quotation.quoteNumber}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Customer</span>
              <span className="font-medium text-slate-800 truncate block">{quotation.clientCompany}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Prepared By</span>
              <span className="font-medium text-slate-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {quotation.staffName}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold">Status / Date</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                {quotation.status} • {quotation.date}
              </span>
            </div>
          </div>
        </div>

        {/* PRODUCT SEARCH & AUTO-FILL BOX (Centerpiece of the Video 11-24s) */}
        <div className={`relative bg-white rounded-xl border transition-all duration-300 p-4 sm:p-5 shadow-sm ${
          highlightSearch ? 'ring-4 ring-emerald-500/20 border-emerald-500 shadow-md' : 'border-slate-200'
        }`}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
            <label className="text-xs font-bold text-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-emerald-600" />
              <span>Type a Product Code or Model Number:</span>
              <span className="text-[11px] font-normal text-slate-400">
                (~2,000 Schneider Electric distributor items indexed)
              </span>
            </label>
            <div className="flex items-center gap-1 text-[11px] text-slate-500">
              <span className="text-slate-400">Try typing:</span>
              {POPULAR_ITEMS.slice(0, 4).map(code => (
                <button
                  key={code}
                  onClick={() => {
                    const match = searchCatalog(code, 1)[0];
                    if (match) handleSelectItem(match);
                  }}
                  className="px-1.5 py-0.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded font-mono text-[10px] font-medium transition-colors cursor-pointer"
                >
                  {code}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="flex items-center">
              <div className="absolute left-3.5 text-slate-400 pointer-events-none">
                <Search className="w-4 h-4" />
              </div>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="e.g. LC1D25M7, A9F74216, EZC100H, ATV320, LRD14..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => {
                  if (searchQuery.trim()) setIsDropdownOpen(true);
                }}
                className="w-full pl-10 pr-24 py-3 bg-slate-50 hover:bg-white focus:bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 rounded-xl text-sm font-mono transition-all outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setIsDropdownOpen(false);
                  }}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 px-1 py-0.5 rounded cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Instant Autocomplete Dropdown */}
            {isDropdownOpen && searchResults.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl z-30 overflow-hidden divide-y divide-slate-100 max-h-80 overflow-y-auto">
                <div className="bg-slate-50 px-3 py-1.5 text-[11px] font-semibold text-slate-500 flex justify-between">
                  <span>Matched Products ({searchResults.length} results)</span>
                  <span className="text-emerald-600">Click to auto-fill description & price</span>
                </div>
                {searchResults.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="p-3 hover:bg-emerald-50/70 cursor-pointer flex items-center justify-between gap-4 transition-colors group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm group-hover:text-emerald-700">
                          {item.code}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded font-sans">
                          {item.category}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-medium">
                          In Stock ({item.stock} {item.unit})
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-mono font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                        ${item.unitPrice.toFixed(2)}
                      </div>
                      <span className="text-[10px] text-slate-400 block">per {item.unit}</span>
                    </div>

                    <div className="text-emerald-600 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* LINE ITEMS TABLE */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-slate-500" />
              <h2 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Quotation Line Items ({quotation.items.length})
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={resetSampleQuote}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Demo Items</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-semibold">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-3 w-36">Product Code</th>
                  <th className="py-2.5 px-3">Catalog Description</th>
                  <th className="py-2.5 px-3 w-28 text-right">Unit Price</th>
                  <th className="py-2.5 px-3 w-24 text-center">Qty</th>
                  <th className="py-2.5 px-3 w-20 text-center">Disc%</th>
                  <th className="py-2.5 px-3 w-28 text-right">Line Total</th>
                  <th className="py-2.5 px-2 w-10 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {quotation.items.map((item, index) => {
                  const lineDiscount = (item.unitPrice * item.discountPercent) / 100;
                  const lineTotal = (item.unitPrice - lineDiscount) * item.quantity;
                  const isRecentlyAdded = index === 0 && lastAddedPrice !== null;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        isRecentlyAdded ? 'bg-emerald-50/50' : ''
                      }`}
                    >
                      <td className="py-2.5 px-3 text-center text-slate-400 font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-block">
                          {item.productCode}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="text-slate-700 font-medium text-xs leading-snug">
                          {item.description}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <div className="font-mono font-bold text-slate-900">
                          ${item.unitPrice.toFixed(2)}
                        </div>
                        <span className="text-[10px] text-slate-400">catalog auto-fill</span>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => updateItemQty(item.id, item.quantity - 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateItemQty(item.id, parseInt(e.target.value) || 1)}
                            className="w-10 text-center py-0.5 font-mono text-xs border border-slate-200 rounded focus:border-emerald-600 outline-none"
                          />
                          <button
                            onClick={() => updateItemQty(item.id, item.quantity + 1)}
                            className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={item.discountPercent}
                          onChange={(e) => updateItemDiscount(item.id, parseFloat(e.target.value) || 0)}
                          className="w-12 text-center py-0.5 font-mono text-xs border border-slate-200 rounded focus:border-emerald-600 outline-none"
                        />
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 text-sm">
                        ${lineTotal.toFixed(2)}
                      </td>
                      <td className="py-2.5 px-2 text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 p-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {quotation.items.length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-400">
                      No line items yet. Type a code like <strong className="font-mono text-slate-600">LC1D25M7</strong> in the search box above.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* BOTTOM SECTION: Math Calculation Box & Guarantees (24-28s Result beat) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Commercial Notes & Guarantees */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Commercial Terms & Automation Guarantees
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All prices are matched in real-time against verified distributor price lists. Master list discounts, currency conversions, and line multiplications execute instantly with complete mathematical precision.
              </p>
              
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> No Manual Lookup
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> No Typos
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Instant Math
                </span>
              </div>
            </div>

            {/* Custom Catalog CTA banner */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
              <div>
                <h4 className="font-bold text-sm text-white">Have your own product catalog?</h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Send your product list in Excel or CSV—we'll build the matching logic around your exact codes and pricing rules.
                </p>
              </div>
              {onOpenInquiry && (
                <button
                  onClick={onOpenInquiry}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs whitespace-nowrap shadow-md cursor-pointer transition-colors"
                >
                  Send Product List
                </button>
              )}
            </div>
          </div>

          {/* Real-Time Mathematical Engine Total Card */}
          <div className={`bg-white rounded-xl border p-5 shadow-sm space-y-3 transition-all duration-300 ${
            highlightResult ? 'ring-4 ring-emerald-500/30 border-emerald-500' : 'border-slate-200'
          }`}>
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">
              Quotation Summary
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({quotation.items.length} items):</span>
                <span className="font-mono font-medium text-slate-900">${subtotal.toFixed(2)}</span>
              </div>

              {globalDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Special Project Discount ({quotation.discountPercent}%):</span>
                  <span className="font-mono font-medium">-${globalDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Sales Tax / VAT ({quotation.taxRate}%):</span>
                <span className="font-mono font-medium text-slate-900">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-slate-900 block">Grand Total:</span>
                  <span className="text-[10px] text-slate-400">USD, Tax inclusive</span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-extrabold text-emerald-600 tracking-tight">
                    ${grandTotal.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Restrained Overlay Callout for Result Phase (24-28s) */}
            {highlightResult && (
              <div className="mt-3 p-2.5 bg-slate-950 text-white rounded-lg text-center text-xs font-bold tracking-wide border border-emerald-500/40 animate-pulse">
                “No lookup. No typos. No math.”
              </div>
            )}

            <div className="pt-2 flex flex-col gap-2">
              {onOpenPrintProof && (
                <button
                  onClick={onOpenPrintProof}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Generate Official Quotation</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
