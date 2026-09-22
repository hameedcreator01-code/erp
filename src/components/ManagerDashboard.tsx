import React from 'react';
import { 
  Users, TrendingUp, CheckCircle, Clock, FileCheck, 
  ArrowUpRight, BarChart3, Plus, ArrowLeft, Shield, DollarSign 
} from 'lucide-react';
import { INITIAL_STAFF_MEMBERS, INITIAL_RECENT_QUOTES } from '../data/storyboard';
import { StaffMember } from '../types';

interface ManagerDashboardProps {
  onBackToBuilder?: () => void;
  onOpenProof?: () => void;
}

export const ManagerDashboard: React.FC<ManagerDashboardProps> = ({
  onBackToBuilder,
  onOpenProof
}) => {
  const staffMembers: StaffMember[] = INITIAL_STAFF_MEMBERS;
  const recentQuotes = INITIAL_RECENT_QUOTES;

  const totalQuotesToday = staffMembers.reduce((sum, s) => sum + s.quotesToday, 0);
  const totalValueToday = staffMembers.reduce((sum, s) => sum + s.valueToday, 0);
  const avgTurnaroundSeconds = Math.round(
    staffMembers.reduce((sum, s) => sum + s.avgTimeSeconds, 0) / staffMembers.length
  );

  return (
    <div className="w-full h-full min-h-[640px] bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3 shadow-xs">
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
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
                Commercial Manager Live Dashboard
              </h1>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live Telemetry
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Quotes per day, per staff member, with real-time margins & turnaround speed
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenProof && (
            <button
              onClick={onOpenProof}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Sanitized Proof View</span>
            </button>
          )}
          {onBackToBuilder && (
            <button
              onClick={onBackToBuilder}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create New Quote</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 overflow-auto max-w-7xl w-full mx-auto space-y-6">
        {/* Exact On-Screen Text Highlight Box (28-35s beat) */}
        <div className="bg-slate-900 text-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-emerald-400 block mb-1">
              28-35s • Management Visibility
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              “Live dashboard: quotes per day, per staff member.”
            </h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Eliminate quote black holes. Track team capacity, see instant daily values, and review exact line items as they are sent to customers.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3.5 py-2 rounded-lg border border-slate-700 font-mono text-emerald-400 shrink-0">
            <TrendingUp className="w-4 h-4" />
            <span>Today: +18.4% volume vs manual</span>
          </div>
        </div>

        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Today's Quotes</span>
              <FileCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {totalQuotesToday}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" />
              <span>100% catalog verified</span>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Total Value Quoted</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              ${(totalValueToday / 1000).toFixed(1)}k
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              ${totalValueToday.toLocaleString()} across 4 engineers
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Avg Generation Time</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {avgTurnaroundSeconds}s
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1">
              vs. 45 min manual Excel
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
              <span className="font-semibold uppercase tracking-wider text-[11px]">Active Sales Staff</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900">
              {staffMembers.length}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              All linked to master price catalog
            </div>
          </div>
        </div>

        {/* Per-Staff Statistics (Prompt specific: per-staff statistics) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Sales Engineering Staff Performance (Today)
              </h3>
              <p className="text-[11px] text-slate-500">Live tally of quotations, volume, and generation speed</p>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">Updated 1 min ago</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 text-[11px] font-semibold">
                  <th className="py-3 px-4">Sales Engineer</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-center">Quotes Today</th>
                  <th className="py-3 px-4 text-right">Value Quoted</th>
                  <th className="py-3 px-4 text-center">Avg Time</th>
                  <th className="py-3 px-4 text-center">Win Rate</th>
                  <th className="py-3 px-4 text-center">Current Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-sans">
                {staffMembers.map((staff) => (
                  <tr key={staff.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                          {staff.avatar}
                        </div>
                        <span className="font-bold text-slate-900">{staff.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{staff.role}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-slate-900 text-sm">
                      {staff.quotesToday}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 text-sm">
                      ${staff.valueToday.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-mono font-medium text-xs border border-emerald-100">
                        {staff.avgTimeSeconds}s
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-semibold text-slate-700">
                      {staff.winRate}%
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        staff.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : staff.status === 'in-quote' 
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          staff.status === 'active' ? 'bg-emerald-500' : staff.status === 'in-quote' ? 'bg-blue-500' : 'bg-slate-400'
                        }`} />
                        {staff.status === 'active' ? 'Active' : staff.status === 'in-quote' ? 'In Quote' : 'Break'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Quotations Stream */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-5 py-3.5 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Live Quotations Stream
              </h3>
              <p className="text-[11px] text-slate-500">Recent quotations created across all distributor branches</p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">Showing last 5</span>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {recentQuotes.map(quote => (
              <div key={quote.id} className="p-4 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-mono font-bold text-xs shrink-0 border border-slate-200">
                    QT
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{quote.quoteNumber}</span>
                      <span className="font-semibold text-slate-800">• {quote.clientCompany}</span>
                    </div>
                    <div className="text-slate-500 text-[11px] mt-0.5 flex items-center gap-2">
                      <span>Prepared by: {quote.staffName}</span>
                      <span>({quote.itemsCount} line items)</span>
                      <span>{quote.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      ${quote.total.toFixed(2)}
                    </div>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded ${
                      quote.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                      quote.status === 'Sent' ? 'bg-blue-100 text-blue-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {quote.status}
                    </span>
                  </div>

                  {onBackToBuilder && (
                    <button
                      onClick={onBackToBuilder}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold px-2.5 py-1.5 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                    >
                      View
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
