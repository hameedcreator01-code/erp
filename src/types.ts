export interface ProductItem {
  id: string;
  code: string;
  description: string;
  category: string;
  unitPrice: number;
  unit: string;
  stock: number;
  leadTime: string;
  series: string;
}

export interface QuoteLineItem {
  id: string;
  productCode: string;
  description: string;
  unitPrice: number;
  quantity: number;
  discountPercent: number;
  unit: string;
}

export interface Quotation {
  id: string;
  quoteNumber: string;
  date: string;
  validUntil: string;
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
  staffName: string;
  staffRole: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Revised';
  items: QuoteLineItem[];
  discountPercent: number;
  taxRate: number;
  currency: string;
  currencySymbol: string;
  notes: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quotesToday: number;
  valueToday: number;
  avgTimeSeconds: number;
  winRate: number;
  status: 'active' | 'in-quote' | 'break';
}

export type SceneId = 
  | 'hook'
  | 'reveal'
  | 'autofill'
  | 'result'
  | 'dashboard'
  | 'proof'
  | 'proof_hold'
  | 'cta'
  | 'cta_hold';

export interface StoryboardScene {
  id: SceneId;
  title: string;
  timeRange: string;
  startTime: number;
  endTime: number;
  bRollDescription: string;
  onScreenText: string;
  voiceover: string;
  callouts?: string[];
  activeView: 'messy_excel' | 'quote_builder' | 'dashboard' | 'print_proof';
}
