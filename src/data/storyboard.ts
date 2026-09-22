import { StoryboardScene } from '../types';

export const STORYBOARD_SCENES: StoryboardScene[] = [
  {
    id: 'hook',
    title: 'Hook: The Manual Excel Bottleneck',
    timeRange: '0-5s',
    startTime: 0,
    endTime: 5,
    bRollDescription: 'Messy Excel / Word quotation workflow with manual price copy-pasting, slow cursor row selection.',
    onScreenText: 'Still building quotes manually… one line at a time?',
    voiceover: 'If your team still copy-pastes prices into every quotation, watch this.',
    activeView: 'messy_excel'
  },
  {
    id: 'reveal',
    title: 'Reveal: Browser-Based Instant Tool',
    timeRange: '5-11s',
    startTime: 5,
    endTime: 11,
    bRollDescription: 'Opening the HTML quotation tool in a browser, clean interface and product search box clearly visible.',
    onScreenText: 'AI-Powered Quotation Tool—runs in any browser.',
    voiceover: 'I build browser-based quotation tools that fill themselves. Type a product code…',
    activeView: 'quote_builder'
  },
  {
    id: 'autofill',
    title: 'Auto-Fill: Instant Lookup & Math',
    timeRange: '11-24s',
    startTime: 11,
    endTime: 24,
    bRollDescription: 'Typing model code, autocomplete matching ~2,000 items, auto-filling unit price, adding 3 items with live math.',
    onScreenText: 'Type a code → price appears instantly',
    voiceover: '…and the system pulls the price from your full catalog automatically—description, unit price, totals—all calculated in seconds. No lookup. No typos. No math.',
    callouts: [
      'Type a code → price appears instantly',
      'Auto-calculated totals',
      '~2,000 items matched from the master catalog'
    ],
    activeView: 'quote_builder'
  },
  {
    id: 'result',
    title: 'Result: Zero Errors & Instant Totals',
    timeRange: '24-28s',
    startTime: 24,
    endTime: 28,
    bRollDescription: 'Hold on completed quotation line items and calculated grand total.',
    onScreenText: 'No lookup. No typos. No math.',
    voiceover: 'No lookup. No typos. No math. Complete accuracy on every quotation.',
    activeView: 'quote_builder'
  },
  {
    id: 'dashboard',
    title: 'Dashboard: Live Manager Analytics',
    timeRange: '28-35s',
    startTime: 28,
    endTime: 35,
    bRollDescription: 'Live manager dashboard: today quotation count, per-staff statistics, recent quotes list.',
    onScreenText: 'Live dashboard: quotes per day, per staff member.',
    voiceover: 'Managers get a live dashboard—how many quotes were made today, by whom, with full totals.',
    activeView: 'dashboard'
  },
  {
    id: 'proof',
    title: 'Proof: Real-World Distribution Production',
    timeRange: '35-42s',
    startTime: 35,
    endTime: 42,
    bRollDescription: 'Sanitized quotation print document view with privacy blur over client and staff details.',
    onScreenText: 'Quotations in seconds, not hours.',
    voiceover: 'This exact system runs for a Schneider Electric-linked distributor—quotations that took hours now take seconds.',
    callouts: [
      'Built for a Schneider Electric-linked distributor',
      '~2,000-item master catalog',
      'Quotations in seconds, not hours.'
    ],
    activeView: 'print_proof'
  },
  {
    id: 'proof_hold',
    title: 'Proof Hold: Sanitized Print View',
    timeRange: '42-47s',
    startTime: 42,
    endTime: 47,
    bRollDescription: 'Holding on sanitized quotation print view with proof callouts readable.',
    onScreenText: 'Proven in production for high-volume electrical distributors.',
    voiceover: 'Real distributor speed, full accuracy, zero margin leakage.',
    callouts: [
      'Built for a Schneider Electric-linked distributor',
      '~2,000-item master catalog',
      'Quotations in seconds, not hours.'
    ],
    activeView: 'print_proof'
  },
  {
    id: 'cta',
    title: 'Call to Action: Send Your Product List',
    timeRange: '47-56s',
    startTime: 47,
    endTime: 56,
    bRollDescription: 'Return to clean quotation tool interface with closing offer.',
    onScreenText: "Send me your product list—I'll build the matching logic around it. Order now or message me.",
    voiceover: "Send me your product list in Excel or CSV, and I'll build a quotation tool around your exact catalog. Message me to get started.",
    activeView: 'quote_builder'
  },
  {
    id: 'cta_hold',
    title: 'CTA Hold: Ready to Build Yours',
    timeRange: '56-60s',
    startTime: 56,
    endTime: 60,
    bRollDescription: 'Clean quotation-tool interface and final call-to-action hold.',
    onScreenText: "Send me your product list—I'll build the matching logic around it. Order now or message me.",
    voiceover: "Message me right now with your product file to launch your custom tool.",
    activeView: 'quote_builder'
  }
];

export const INITIAL_STAFF_MEMBERS = [
  {
    id: 'st-1',
    name: 'David Chen',
    role: 'Senior Technical Sales Eng.',
    avatar: 'DC',
    quotesToday: 9,
    valueToday: 58240,
    avgTimeSeconds: 16,
    winRate: 72,
    status: 'active' as const
  },
  {
    id: 'st-2',
    name: 'Sarah Miller',
    role: 'Industrial Project Specialist',
    avatar: 'SM',
    quotesToday: 8,
    valueToday: 46800,
    avgTimeSeconds: 19,
    winRate: 68,
    status: 'active' as const
  },
  {
    id: 'st-3',
    name: 'Alex Vance',
    role: 'Switchgear & Automation Rep',
    avatar: 'AV',
    quotesToday: 5,
    valueToday: 31450,
    avgTimeSeconds: 22,
    winRate: 64,
    status: 'in-quote' as const
  },
  {
    id: 'st-4',
    name: 'Marcus Brody',
    role: 'Inside Sales Associate',
    avatar: 'MB',
    quotesToday: 2,
    valueToday: 12160,
    avgTimeSeconds: 15,
    winRate: 59,
    status: 'break' as const
  }
];

export const INITIAL_RECENT_QUOTES = [
  {
    id: 'q-101',
    quoteNumber: 'QT-2026-0842',
    clientCompany: 'Apex Industrial Automation Ltd',
    staffName: 'David Chen',
    itemsCount: 6,
    total: 14850.00,
    status: 'Approved' as const,
    timestamp: '14 minutes ago'
  },
  {
    id: 'q-102',
    quoteNumber: 'QT-2026-0841',
    clientCompany: 'Metro Switchgear Fabricators',
    staffName: 'Sarah Miller',
    itemsCount: 4,
    total: 9420.50,
    status: 'Sent' as const,
    timestamp: '38 minutes ago'
  },
  {
    id: 'q-103',
    quoteNumber: 'QT-2026-0840',
    clientCompany: 'Gulf Electromechanical Contractors',
    staffName: 'Alex Vance',
    itemsCount: 11,
    total: 31450.00,
    status: 'Draft' as const,
    timestamp: '1 hour ago'
  },
  {
    id: 'q-104',
    quoteNumber: 'QT-2026-0839',
    clientCompany: 'Precision Power & Control Corp',
    staffName: 'David Chen',
    itemsCount: 8,
    total: 22680.00,
    status: 'Approved' as const,
    timestamp: '2 hours ago'
  },
  {
    id: 'q-105',
    quoteNumber: 'QT-2026-0838',
    clientCompany: 'Continental Machinery OEM',
    staffName: 'Marcus Brody',
    itemsCount: 3,
    total: 6180.00,
    status: 'Sent' as const,
    timestamp: '3 hours ago'
  }
];
