import { ProductItem } from '../types';

// Curated high-frequency industrial catalog items based on Schneider Electric distributor catalog
const coreCatalogItems: ProductItem[] = [
  // Contactors & Starters (TeSys)
  {
    id: 'p-1',
    code: 'LC1D25M7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 25 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 78.50,
    unit: 'pcs',
    stock: 142,
    leadTime: 'Immediate',
    series: 'TeSys D'
  },
  {
    id: 'p-2',
    code: 'LC1D09M7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 9 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 46.20,
    unit: 'pcs',
    stock: 210,
    leadTime: 'Immediate',
    series: 'TeSys D'
  },
  {
    id: 'p-3',
    code: 'LC1D32M7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 32 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 112.00,
    unit: 'pcs',
    stock: 88,
    leadTime: 'Immediate',
    series: 'TeSys D'
  },
  {
    id: 'p-4',
    code: 'LC1D65AM7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 65 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 245.00,
    unit: 'pcs',
    stock: 45,
    leadTime: '2 Days',
    series: 'TeSys D'
  },
  {
    id: 'p-5',
    code: 'LC1D80M7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 80 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 320.00,
    unit: 'pcs',
    stock: 31,
    leadTime: '2 Days',
    series: 'TeSys D'
  },
  {
    id: 'p-6',
    code: 'LC1D115M7',
    description: 'TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V 115 A - 220 V AC coil',
    category: 'Contactors',
    unitPrice: 480.00,
    unit: 'pcs',
    stock: 18,
    leadTime: '3 Days',
    series: 'TeSys D'
  },

  // Miniature Circuit Breakers (Acti9 / iC60N)
  {
    id: 'p-7',
    code: 'A9F74216',
    description: 'Acti9 iC60N miniature circuit breaker - 2P - 16A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 28.40,
    unit: 'pcs',
    stock: 350,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-8',
    code: 'A9F74220',
    description: 'Acti9 iC60N miniature circuit breaker - 2P - 20A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 28.40,
    unit: 'pcs',
    stock: 420,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-9',
    code: 'A9F74232',
    description: 'Acti9 iC60N miniature circuit breaker - 2P - 32A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 31.90,
    unit: 'pcs',
    stock: 290,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-10',
    code: 'A9F74316',
    description: 'Acti9 iC60N miniature circuit breaker - 3P - 16A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 44.50,
    unit: 'pcs',
    stock: 195,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-11',
    code: 'A9F74320',
    description: 'Acti9 iC60N miniature circuit breaker - 3P - 20A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 44.50,
    unit: 'pcs',
    stock: 240,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-12',
    code: 'A9F74332',
    description: 'Acti9 iC60N miniature circuit breaker - 3P - 32A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 48.00,
    unit: 'pcs',
    stock: 310,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },
  {
    id: 'p-13',
    code: 'A9F74363',
    description: 'Acti9 iC60N miniature circuit breaker - 3P - 63A - C curve 6000 A',
    category: 'Circuit Breakers',
    unitPrice: 62.00,
    unit: 'pcs',
    stock: 165,
    leadTime: 'Immediate',
    series: 'Acti9 iC60N'
  },

  // Moulded Case Circuit Breakers (EasyPact EZC & Compact NSX)
  {
    id: 'p-14',
    code: 'EZC100H3060',
    description: 'EasyPact EZC100H circuit breaker - TMD - 60 A - 3 poles 3d - 30kA',
    category: 'Moulded Case Breakers',
    unitPrice: 165.00,
    unit: 'pcs',
    stock: 75,
    leadTime: 'Immediate',
    series: 'EasyPact EZC'
  },
  {
    id: 'p-15',
    code: 'EZC100H3100',
    description: 'EasyPact EZC100H circuit breaker - TMD - 100 A - 3 poles 3d - 30kA',
    category: 'Moulded Case Breakers',
    unitPrice: 195.00,
    unit: 'pcs',
    stock: 62,
    leadTime: 'Immediate',
    series: 'EasyPact EZC'
  },
  {
    id: 'p-16',
    code: 'LV429630',
    description: 'Compact NSX100F circuit breaker - TMD - 100 A - 3 poles 3d - 36kA',
    category: 'Moulded Case Breakers',
    unitPrice: 340.00,
    unit: 'pcs',
    stock: 42,
    leadTime: '1 Day',
    series: 'Compact NSX'
  },
  {
    id: 'p-17',
    code: 'LV430630',
    description: 'Compact NSX160F circuit breaker - TMD - 160 A - 3 poles 3d - 36kA',
    category: 'Moulded Case Breakers',
    unitPrice: 485.00,
    unit: 'pcs',
    stock: 28,
    leadTime: '2 Days',
    series: 'Compact NSX'
  },
  {
    id: 'p-18',
    code: 'LV431630',
    description: 'Compact NSX250F circuit breaker - TMD - 250 A - 3 poles 3d - 36kA',
    category: 'Moulded Case Breakers',
    unitPrice: 620.00,
    unit: 'pcs',
    stock: 22,
    leadTime: '2 Days',
    series: 'Compact NSX'
  },

  // Overload Relays (TeSys LRD)
  {
    id: 'p-19',
    code: 'LRD14',
    description: 'TeSys LRD thermal overload relay - 7...10 A - class 10A for LC1D09-D38',
    category: 'Thermal Overload',
    unitPrice: 52.80,
    unit: 'pcs',
    stock: 130,
    leadTime: 'Immediate',
    series: 'TeSys LRD'
  },
  {
    id: 'p-20',
    code: 'LRD21',
    description: 'TeSys LRD thermal overload relay - 12...18 A - class 10A for LC1D18-D38',
    category: 'Thermal Overload',
    unitPrice: 56.40,
    unit: 'pcs',
    stock: 115,
    leadTime: 'Immediate',
    series: 'TeSys LRD'
  },
  {
    id: 'p-21',
    code: 'LRD3353',
    description: 'TeSys LRD thermal overload relay - 23...32 A - class 10A for LC1D40-D95',
    category: 'Thermal Overload',
    unitPrice: 89.00,
    unit: 'pcs',
    stock: 74,
    leadTime: 'Immediate',
    series: 'TeSys LRD'
  },

  // Pushbuttons & Pilot Lights (Harmony XB4 / XB5)
  {
    id: 'p-22',
    code: 'XB4BA21',
    description: 'Harmony XB4 black flush pushbutton 22mm spring return 1 NO screw clamp',
    category: 'Control & Signalling',
    unitPrice: 14.20,
    unit: 'pcs',
    stock: 450,
    leadTime: 'Immediate',
    series: 'Harmony XB4'
  },
  {
    id: 'p-23',
    code: 'XB4BA31',
    description: 'Harmony XB4 green flush pushbutton 22mm spring return 1 NO screw clamp',
    category: 'Control & Signalling',
    unitPrice: 14.20,
    unit: 'pcs',
    stock: 580,
    leadTime: 'Immediate',
    series: 'Harmony XB4'
  },
  {
    id: 'p-24',
    code: 'XB4BS542',
    description: 'Harmony XB4 emergency stop 40mm mushroom head red trigger latching 1 NC',
    category: 'Control & Signalling',
    unitPrice: 38.60,
    unit: 'pcs',
    stock: 180,
    leadTime: 'Immediate',
    series: 'Harmony XB4'
  },
  {
    id: 'p-25',
    code: 'XB4BVM3',
    description: 'Harmony XB4 pilot light green with integral LED 230...240 V AC',
    category: 'Control & Signalling',
    unitPrice: 22.10,
    unit: 'pcs',
    stock: 310,
    leadTime: 'Immediate',
    series: 'Harmony XB4'
  },

  // Variable Speed Drives (Altivar ATV320 & ATV630)
  {
    id: 'p-26',
    code: 'ATV320U15N4B',
    description: 'Altivar Machine ATV320 variable speed drive - 1.5 kW - 380...500 V - 3-phase book',
    category: 'Drives & Softstarters',
    unitPrice: 540.00,
    unit: 'set',
    stock: 25,
    leadTime: '3 Days',
    series: 'Altivar ATV320'
  },
  {
    id: 'p-27',
    code: 'ATV320U22N4B',
    description: 'Altivar Machine ATV320 variable speed drive - 2.2 kW - 380...500 V - 3-phase book',
    category: 'Drives & Softstarters',
    unitPrice: 620.00,
    unit: 'set',
    stock: 19,
    leadTime: '3 Days',
    series: 'Altivar ATV320'
  },
  {
    id: 'p-28',
    code: 'ATV320U55N4B',
    description: 'Altivar Machine ATV320 variable speed drive - 5.5 kW - 380...500 V - 3-phase book',
    category: 'Drives & Softstarters',
    unitPrice: 910.00,
    unit: 'set',
    stock: 14,
    leadTime: '5 Days',
    series: 'Altivar ATV320'
  },

  // Power Monitoring (PowerLogic)
  {
    id: 'p-29',
    code: 'METSEPM5350',
    description: 'PowerLogic PM5350 power and energy meter - RS485 - BACnet/Modbus - THD - alarm',
    category: 'Power Management',
    unitPrice: 580.00,
    unit: 'pcs',
    stock: 34,
    leadTime: '2 Days',
    series: 'PowerLogic PM5000'
  },
  {
    id: 'p-30',
    code: 'METSEPM8000',
    description: 'PowerLogic PM8000 precision power quality meter - dual Ethernet - modular I/O',
    category: 'Power Management',
    unitPrice: 1450.00,
    unit: 'pcs',
    stock: 12,
    leadTime: '7 Days',
    series: 'PowerLogic PM8000'
  },

  // Enclosures & Accessories
  {
    id: 'p-31',
    code: 'NSYS3D6420P',
    description: 'Spacial S3D wall-mounting steel enclosure H600xW400xD200mm with mounting plate IP66',
    category: 'Enclosures',
    unitPrice: 175.00,
    unit: 'pcs',
    stock: 45,
    leadTime: 'Immediate',
    series: 'Spacial S3D'
  },
  {
    id: 'p-32',
    code: 'NSYS3D8630P',
    description: 'Spacial S3D wall-mounting steel enclosure H800xW600xD300mm with mounting plate IP66',
    category: 'Enclosures',
    unitPrice: 265.00,
    unit: 'pcs',
    stock: 30,
    leadTime: '1 Day',
    series: 'Spacial S3D'
  }
];

// Master generator that expands to full ~2,000 distributor items
function generateMasterCatalog(): ProductItem[] {
  const items = [...coreCatalogItems];
  const ratings = [6, 10, 16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 400, 630];
  const poleTypes = ['1P', '2P', '3P', '4P'];
  const coilVoltages = ['24V', '110V', '220V', '380V'];

  let idCounter = 33;

  // Generate Acti9 variants (~400 items)
  for (const pole of poleTypes) {
    for (const rating of ratings) {
      for (const curve of ['B', 'C', 'D']) {
        if (items.length >= 2048) break;
        const code = `A9F${curve === 'B' ? '6' : curve === 'C' ? '7' : '8'}${pole[0]}${rating < 10 ? '0' + rating : rating}`;
        if (!items.find(x => x.code === code)) {
          items.push({
            id: `p-${idCounter++}`,
            code,
            description: `Acti9 iC60N miniature circuit breaker - ${pole} - ${rating}A - ${curve} curve 6kA 415V`,
            category: 'Circuit Breakers',
            unitPrice: Math.round((18 + (rating * 0.45) + (parseInt(pole) * 11)) * 100) / 100,
            unit: 'pcs',
            stock: 30 + (rating * 7) % 180,
            leadTime: rating > 63 ? '2 Days' : 'Immediate',
            series: 'Acti9 iC60N'
          });
        }
      }
    }
  }

  // Generate TeSys D Contactor variants (~500 items)
  const contactorRatings = [9, 12, 18, 25, 32, 38, 40, 50, 65, 80, 95, 115, 150];
  const coilCodes = [
    { code: 'B7', label: '24V AC' },
    { code: 'F7', label: '110V AC' },
    { code: 'M7', label: '220V AC' },
    { code: 'Q7', label: '380V AC' },
    { code: 'BD', label: '24V DC' }
  ];

  for (const cRating of contactorRatings) {
    for (const coil of coilCodes) {
      if (items.length >= 2048) break;
      const code = `LC1D${cRating < 10 ? '0' + cRating : cRating}${coil.code}`;
      if (!items.find(x => x.code === code)) {
        items.push({
          id: `p-${idCounter++}`,
          code,
          description: `TeSys D contactor - 3P(3 NO) - AC-3 - <= 440 V ${cRating} A - ${coil.label} coil`,
          category: 'Contactors',
          unitPrice: Math.round((35 + (cRating * 2.8) + (coil.code === 'BD' ? 18 : 0)) * 100) / 100,
          unit: 'pcs',
          stock: 20 + (cRating * 5) % 120,
          leadTime: cRating > 80 ? '3 Days' : 'Immediate',
          series: 'TeSys D'
        });
      }
    }
  }

  // Generate EasyPact & Compact NSX breakers (~400 items)
  const mccbRatings = [15, 20, 30, 40, 50, 60, 75, 100, 125, 150, 160, 200, 250, 400, 630];
  for (const mRating of mccbRatings) {
    for (const poles of [3, 4]) {
      if (items.length >= 2048) break;
      const ezCode = `EZC100H${poles}${mRating < 100 ? '0' + mRating : mRating}`;
      if (!items.find(x => x.code === ezCode)) {
        items.push({
          id: `p-${idCounter++}`,
          code: ezCode,
          description: `EasyPact EZC100H circuit breaker - TMD - ${mRating} A - ${poles} poles - 30kA`,
          category: 'Moulded Case Breakers',
          unitPrice: Math.round((120 + (mRating * 0.95) + (poles === 4 ? 45 : 0)) * 100) / 100,
          unit: 'pcs',
          stock: 15 + (mRating * 3) % 60,
          leadTime: 'Immediate',
          series: 'EasyPact EZC'
        });
      }

      const nsxCode = `LV4${mRating > 100 ? '3' : '2'}96${mRating > 200 ? '50' : '30'}-${poles}P`;
      if (!items.find(x => x.code === nsxCode)) {
        items.push({
          id: `p-${idCounter++}`,
          code: nsxCode,
          description: `Compact NSX${mRating}F circuit breaker - TMD - ${mRating} A - ${poles} poles - 36kA 415V`,
          category: 'Moulded Case Breakers',
          unitPrice: Math.round((280 + (mRating * 1.5) + (poles === 4 ? 80 : 0)) * 100) / 100,
          unit: 'pcs',
          stock: 10 + (mRating * 2) % 40,
          leadTime: '2 Days',
          series: 'Compact NSX'
        });
      }
    }
  }

  // Generate Harmony Control buttons, switches, lights (~300 items)
  const colors = [
    { code: '1', name: 'White' },
    { code: '2', name: 'Black' },
    { code: '3', name: 'Green' },
    { code: '4', name: 'Red' },
    { code: '5', name: 'Yellow' },
    { code: '6', name: 'Blue' }
  ];
  for (const color of colors) {
    for (let i = 1; i <= 15; i++) {
      if (items.length >= 2048) break;
      const bCode = `XB4BA${color.code}${i}`;
      items.push({
        id: `p-${idCounter++}`,
        code: bCode,
        description: `Harmony XB4 ${color.name} flush pushbutton 22mm spring return 1NO+1NC screw clamp ver.${i}`,
        category: 'Control & Signalling',
        unitPrice: Math.round((12.50 + color.code.charCodeAt(0) % 5 + i * 0.5) * 100) / 100,
        unit: 'pcs',
        stock: 50 + i * 20,
        leadTime: 'Immediate',
        series: 'Harmony XB4'
      });
    }
  }

  // Generate Altivar & Softstarters (~200 items)
  const kwRatings = [0.37, 0.75, 1.5, 2.2, 3.0, 4.0, 5.5, 7.5, 11, 15, 18.5, 22, 30, 37, 45, 55, 75, 90];
  for (const kw of kwRatings) {
    if (items.length >= 2048) break;
    const kwCode = kw.toString().replace('.', '');
    items.push({
      id: `p-${idCounter++}`,
      code: `ATV320U${kwCode}N4B`,
      description: `Altivar Machine ATV320 variable speed drive - ${kw} kW - 380...500 V 3-phase book`,
      category: 'Drives & Softstarters',
      unitPrice: Math.round((380 + kw * 48) * 100) / 100,
      unit: 'set',
      stock: 8 + Math.floor(kw % 10),
      leadTime: kw > 30 ? '7 Days' : '3 Days',
      series: 'Altivar ATV320'
    });
    items.push({
      id: `p-${idCounter++}`,
      code: `ATS22D${Math.round(kw * 2)}Q`,
      description: `Altivar Soft Starter ATS22 - control 220V - supply 230...440V ${kw}kW`,
      category: 'Drives & Softstarters',
      unitPrice: Math.round((290 + kw * 35) * 100) / 100,
      unit: 'set',
      stock: 6 + Math.floor(kw % 8),
      leadTime: '3 Days',
      series: 'Altistart ATS22'
    });
  }

  // Fill up to exactly 2,000 items if needed
  while (items.length < 2000) {
    const idx = items.length + 1;
    items.push({
      id: `p-${idCounter++}`,
      code: `SE-CAT-${1000 + idx}`,
      description: `Schneider Electric auxiliary block & terminal accessory pack #${idx}`,
      category: 'Accessories',
      unitPrice: Math.round((8.50 + (idx % 40) * 1.25) * 100) / 100,
      unit: 'pcs',
      stock: 120,
      leadTime: 'Immediate',
      series: 'Linergy'
    });
  }

  return items;
}

export const MASTER_CATALOG: ProductItem[] = generateMasterCatalog();

export const POPULAR_ITEMS = [
  'LC1D25M7',
  'A9F74216',
  'EZC100H3060',
  'LRD14',
  'XB4BA31',
  'ATV320U15N4B'
];

export function searchCatalog(query: string, limit = 8): ProductItem[] {
  if (!query.trim()) return [];
  const q = query.trim().toLowerCase();
  
  // Exact match first, then prefix, then fuzzy
  const exact: ProductItem[] = [];
  const prefix: ProductItem[] = [];
  const contains: ProductItem[] = [];

  for (const item of MASTER_CATALOG) {
    const code = item.code.toLowerCase();
    const desc = item.description.toLowerCase();
    
    if (code === q) {
      exact.push(item);
    } else if (code.startsWith(q)) {
      prefix.push(item);
    } else if (code.includes(q) || desc.includes(q) || item.category.toLowerCase().includes(q)) {
      contains.push(item);
    }

    if (exact.length + prefix.length + contains.length >= limit * 2) {
      break;
    }
  }

  return [...exact, ...prefix, ...contains].slice(0, limit);
}
