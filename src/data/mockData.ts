/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Partner {
  id: string;
  name: string;
  type: 'Apotek Resmi' | 'Minimarket' | 'Toko Obat';
  categoryKey: 'apotek' | 'minimarket' | 'toko-obat';
  tier: 'Platinum' | 'Platinum Corp' | 'Gold' | 'Silver' | 'Bronze';
  license: string; // SIA or NIB
  address: string;
  city: string;
  regionKey: 'surabaya' | 'sidoarjo' | 'malang' | 'gresik';
  contactPerson: string;
  phone: string;
  creditTerms: string;
  creditLimitJt: number;
  creditUsedJt: number;
  creditUsedPct: number;
  status: 'Aktif' | 'Pending Review' | 'Pembatasan Kredit';
  statusKey: 'aktif' | 'pending' | 'restricted';
  monthlyVolume: string;
  lastOrderDate: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  packageDesc: string;
  category: 'BEBAS' | 'KERAS' | 'SUPLEMEN' | 'FMCG';
  categoryLabel: string;
  batchNumber: string;
  stockQty: number;
  unit: string;
  stockPercentage: number;
  stockStatusNote: string;
  minRestock: string;
  minRestockNum: number;
  expiryDate: string;
  daysRemaining: number;
  relativeExpiryText: string;
  statusLevel: 'CRITICAL' | 'WARNING' | 'SAFE';
  statusLabel: string;
  rackZone: string;
  rackLabel: string;
  principal: string;
}

export interface SalesVisit {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerInitial: string;
  partnerType: 'Apotek' | 'Minimarket' | 'Toko Obat';
  salesRep: string;
  salesArea: string;
  orderValue: string;
  orderValueRaw: number;
  itemsSummary: string;
  checkInTime: string;
  visitStatus: 'Terkirim' | 'Diproses' | 'Pending' | 'On-Route';
  statusBadge: string;
  typeTag: 'Restock Order' | 'Payment Collection' | 'New Onboarding' | 'Pengecekan Stok';
  invoiceOrDo: string;
  remarks: string;
  isToday: boolean;
  completionTime?: string;
  digitalSignatureApoteker?: string;
}

export interface TopProduct {
  rank: number;
  name: string;
  sku: string;
  category: string;
  omzetText: string;
  omzetPct: number;
  barPct: number;
  deliveredText: string;
  avgMargin: string;
  channel: 'all' | 'apotek' | 'minimarket';
}

export interface RegionalPerformance {
  regionName: string;
  hubs: string;
  activeOutlets: number;
  targetM: number;
  targetText: string;
  realizationM: number;
  realizationText: string;
  pctAchievement: number;
  barPct: number;
  status: 'safe' | 'warning';
}

// Initial Mock Datasets
export const INITIAL_PARTNERS: Partner[] = [
  {
    id: 'KF-RKT-09',
    name: 'Apotek Kimia Farma Rungkut',
    type: 'Apotek Resmi',
    categoryKey: 'apotek',
    tier: 'Platinum',
    license: 'SIA: 503/442.1/2023',
    address: 'Jl. Rungkut Madya No. 42',
    city: 'Surabaya',
    regionKey: 'surabaya',
    contactPerson: 'apt. Siti Rahmawati, S.Farm',
    phone: '0812-3456-7890',
    creditTerms: 'Net 30 Hari',
    creditLimitJt: 150,
    creditUsedJt: 67.5,
    creditUsedPct: 45,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 68.500.000',
    lastOrderDate: '23 Okt 2026, 10:45 WIB',
  },
  {
    id: 'BSM-DHW-02',
    name: 'Minimarket Basmalah Dharmawangsa',
    type: 'Minimarket',
    categoryKey: 'minimarket',
    tier: 'Gold',
    license: 'NIB: 9120002140023',
    address: 'Jl. Dharmawangsa No. 88',
    city: 'Surabaya',
    regionKey: 'surabaya',
    contactPerson: 'Wahyu Hidayat (Store Mgr)',
    phone: '0857-1122-3344',
    creditTerms: 'Net 14 Hari',
    creditLimitJt: 50,
    creditUsedJt: 10.0,
    creditUsedPct: 20,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 32.800.000',
    lastOrderDate: '23 Okt 2026, 09:30 WIB',
  },
  {
    id: 'K24-MNY-01',
    name: 'Apotek K-24 Manyar Kertoarjo',
    type: 'Apotek Resmi',
    categoryKey: 'apotek',
    tier: 'Platinum',
    license: 'SIA: 503/108.2/2024',
    address: 'Jl. Manyar Kertoarjo No. 15',
    city: 'Surabaya',
    regionKey: 'surabaya',
    contactPerson: 'apt. Hendra Gunawan',
    phone: '0811-9876-5432',
    creditTerms: 'Net 30 Hari',
    creditLimitJt: 120,
    creditUsedJt: 74.4,
    creditUsedPct: 62,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 54.200.000',
    lastOrderDate: '23 Okt 2026, 08:15 WIB',
  },
  {
    id: 'SYM-GBG-04',
    name: 'Minimarket Surya Mart Gubeng',
    type: 'Minimarket',
    categoryKey: 'minimarket',
    tier: 'Silver',
    license: 'NIB: 9120005510088',
    address: 'Jl. Raya Gubeng No. 102',
    city: 'Surabaya',
    regionKey: 'surabaya',
    contactPerson: 'Maya Anggraini (Procurement)',
    phone: '0813-7788-9900',
    creditTerms: 'Cash on Delivery (COD)',
    creditLimitJt: 25,
    creditUsedJt: 0,
    creditUsedPct: 0,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 27.400.000',
    lastOrderDate: '23 Okt 2026, 07:45 WIB',
  },
  {
    id: 'VIV-WRU-11',
    name: 'Apotek Viva Generik Waru',
    type: 'Apotek Resmi',
    categoryKey: 'apotek',
    tier: 'Gold',
    license: 'SIA: 503/892.4/2025',
    address: 'Jl. Raya Waru No. 11',
    city: 'Sidoarjo',
    regionKey: 'sidoarjo',
    contactPerson: 'apt. Nurul Azizah, S.Si',
    phone: '0812-7711-2244',
    creditTerms: 'Net 30 Hari',
    creditLimitJt: 80,
    creditUsedJt: 28.0,
    creditUsedPct: 35,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 41.200.000',
    lastOrderDate: '22 Okt 2026, 16:30 WIB',
  },
  {
    id: 'TO-SDA-07',
    name: 'Toko Obat & Herbal Sehat',
    type: 'Toko Obat',
    categoryKey: 'toko-obat',
    tier: 'Bronze',
    license: 'SIA: 503/771.0/2026',
    address: 'Jl. Pahlawan No. 24',
    city: 'Sidoarjo',
    regionKey: 'sidoarjo',
    contactPerson: 'H. Bambang Sutrisno',
    phone: '0812-9900-1122',
    creditTerms: 'Cash on Delivery (COD)',
    creditLimitJt: 15,
    creditUsedJt: 0,
    creditUsedPct: 0,
    status: 'Pending Review',
    statusKey: 'pending',
    monthlyVolume: 'Rp 18.900.000',
    lastOrderDate: '23 Okt 2026, 08:00 WIB',
  },
  {
    id: 'ALFA-MLG-DC',
    name: 'Minimarket Alfamart DC Malang',
    type: 'Minimarket',
    categoryKey: 'minimarket',
    tier: 'Platinum Corp',
    license: 'NIB: 9120008820019',
    address: 'Jl. Letjen Sutoyo No. 50',
    city: 'Malang',
    regionKey: 'malang',
    contactPerson: 'Doni Prasetyo (Reg. Buyer)',
    phone: '0815-4433-2211',
    creditTerms: 'Net 45 Hari',
    creditLimitJt: 300,
    creditUsedJt: 84.0,
    creditUsedPct: 28,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 112.000.000',
    lastOrderDate: '21 Okt 2026, 14:15 WIB',
  },
  {
    id: 'MDK-GRS-03',
    name: 'Apotek Medika Sejahtera Gresik',
    type: 'Apotek Resmi',
    categoryKey: 'apotek',
    tier: 'Gold',
    license: 'SIA: 503/320.1/2024',
    address: 'Jl. RA Kartini No. 89',
    city: 'Gresik',
    regionKey: 'gresik',
    contactPerson: 'apt. Fajar Nugroho',
    phone: '0813-2244-6688',
    creditTerms: 'Net 30 Hari',
    creditLimitJt: 75,
    creditUsedJt: 32.0,
    creditUsedPct: 42,
    status: 'Aktif',
    statusKey: 'aktif',
    monthlyVolume: 'Rp 36.400.000',
    lastOrderDate: '22 Okt 2026, 11:20 WIB',
  },
];

export const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: 'item-1',
    name: 'Paracetamol 500mg Strip',
    sku: 'FAR-PCT-001',
    packageDesc: 'Box 100 Kaplet',
    category: 'BEBAS',
    categoryLabel: 'Obat Bebas (OTC)',
    batchNumber: '#PCT-2024-B12',
    stockQty: 18,
    unit: 'Box',
    stockPercentage: 18,
    stockStatusNote: 'Di bawah threshold',
    minRestock: '100 Box',
    minRestockNum: 100,
    expiryDate: '15 Nov 2026',
    daysRemaining: 23,
    relativeExpiryText: '23 Hari Lagi',
    statusLevel: 'CRITICAL',
    statusLabel: 'Kritis (<1 bln)',
    rackZone: 'RAK_C',
    rackLabel: 'Zona C: Pallet OTC Mass',
    principal: 'PT Kimia Farma Tbk',
  },
  {
    id: 'item-2',
    name: 'Amoxicillin Trihydrate 500mg',
    sku: 'FAR-AMX-005',
    packageDesc: 'Box 100 Kapsul',
    category: 'KERAS',
    categoryLabel: 'Obat Keras (Resep)',
    batchNumber: '#AMX-2023-A09',
    stockQty: 45,
    unit: 'Box',
    stockPercentage: 30,
    stockStatusNote: 'Perlu reorder segera',
    minRestock: '150 Box',
    minRestockNum: 150,
    expiryDate: '02 Des 2026',
    daysRemaining: 40,
    relativeExpiryText: '40 Hari Lagi',
    statusLevel: 'WARNING',
    statusLabel: 'Waspada (<3 bln)',
    rackZone: 'RAK_B',
    rackLabel: 'Zona B: Obat Keras & Narkotika',
    principal: 'PT Kalbe Farma Tbk',
  },
  {
    id: 'item-3',
    name: 'Minyak Kayu Putih 120ml',
    sku: 'FMC-MKP-022',
    packageDesc: 'Dus 24 Botol',
    category: 'FMCG',
    categoryLabel: 'FMCG & Retail',
    batchNumber: '#MKP-2025-C03',
    stockQty: 32,
    unit: 'Dus',
    stockPercentage: 26,
    stockStatusNote: 'Stok menipis',
    minRestock: '120 Dus',
    minRestockNum: 120,
    expiryDate: '28 Jan 2028',
    daysRemaining: 470,
    relativeExpiryText: '14 Bulan Lagi',
    statusLevel: 'SAFE',
    statusLabel: 'Aman (>6 bln)',
    rackZone: 'RAK_D',
    rackLabel: 'Zona D: FMCG & Personal Care',
    principal: 'PT Eagle Indo Pharma',
  },
  {
    id: 'item-4',
    name: 'Vitamin C 1000mg Effervescent',
    sku: 'SUP-VTC-014',
    packageDesc: 'Tube 10 Tablet',
    category: 'SUPLEMEN',
    categoryLabel: 'Suplemen',
    batchNumber: '#VTC-2024-D44',
    stockQty: 60,
    unit: 'Tube',
    stockPercentage: 30,
    stockStatusNote: 'Permintaan stabil',
    minRestock: '200 Tube',
    minRestockNum: 200,
    expiryDate: '12 Des 2026',
    daysRemaining: 50,
    relativeExpiryText: '50 Hari Lagi',
    statusLevel: 'WARNING',
    statusLabel: 'Waspada (<3 bln)',
    rackZone: 'RAK_C',
    rackLabel: 'Zona C: Pallet OTC Mass',
    principal: 'PT Bayer Indonesia',
  },
  {
    id: 'item-5',
    name: 'Cefixime 100mg Kapsul',
    sku: 'FAR-CFX-008',
    packageDesc: 'Box 30 Kapsul',
    category: 'KERAS',
    categoryLabel: 'Obat Keras',
    batchNumber: '#CFX-2024-E18',
    stockQty: 24,
    unit: 'Box',
    stockPercentage: 30,
    stockStatusNote: 'Buffer stock cukup',
    minRestock: '80 Box',
    minRestockNum: 80,
    expiryDate: '05 Jan 2027',
    daysRemaining: 74,
    relativeExpiryText: '74 Hari Lagi',
    statusLevel: 'WARNING',
    statusLabel: 'Waspada (<3 bln)',
    rackZone: 'RAK_B',
    rackLabel: 'Zona B: Obat Keras & Narkotika',
    principal: 'PT Dexa Medica',
  },
  {
    id: 'item-6',
    name: 'Betadine Antiseptic Solution 60ml',
    sku: 'FAR-BTD-003',
    packageDesc: 'Botol 60ml',
    category: 'BEBAS',
    categoryLabel: 'Obat Bebas',
    batchNumber: '#BTD-2025-F02',
    stockQty: 350,
    unit: 'Botol',
    stockPercentage: 100,
    stockStatusNote: 'Stok melimpah',
    minRestock: '150 Botol',
    minRestockNum: 150,
    expiryDate: '18 Agu 2027',
    daysRemaining: 300,
    relativeExpiryText: 'Aman (>9 Bln)',
    statusLevel: 'SAFE',
    statusLabel: 'Aman (>6 bln)',
    rackZone: 'RAK_C',
    rackLabel: 'Zona C: Pallet OTC Mass',
    principal: 'PT Mundipharma Healthcare',
  },
  {
    id: 'item-7',
    name: 'Diapet Kapsul Herbal',
    sku: 'FAR-DPT-019',
    packageDesc: 'Box 25 Catch Cover',
    category: 'BEBAS',
    categoryLabel: 'Obat Bebas',
    batchNumber: '#DPT-2025-G11',
    stockQty: 410,
    unit: 'Box',
    stockPercentage: 100,
    stockStatusNote: 'Buffer optimal',
    minRestock: '120 Box',
    minRestockNum: 120,
    expiryDate: '10 Mei 2028',
    daysRemaining: 570,
    relativeExpiryText: 'Aman (>18 Bln)',
    statusLevel: 'SAFE',
    statusLabel: 'Aman (>6 bln)',
    rackZone: 'RAK_C',
    rackLabel: 'Zona C: Pallet OTC Mass',
    principal: 'PT Soho Industri Pharmasi',
  },
];

export const INITIAL_SALES_VISITS: SalesVisit[] = [
  {
    id: 'VIS-001',
    partnerId: 'KF-RKT-09',
    partnerName: 'Apotek Kimia Farma Rungkut',
    partnerInitial: 'KF',
    partnerType: 'Apotek',
    salesRep: 'Dimas Prasetyo',
    salesArea: 'Sales Field A (Rungkut-Tenggilis)',
    orderValue: 'Rp 14.500.000',
    orderValueRaw: 14500000,
    itemsSummary: '6 Item (14 Koli)',
    checkInTime: '10:45 WIB',
    visitStatus: 'Terkirim',
    statusBadge: 'Delivered / Terkirim',
    typeTag: 'Restock Order',
    invoiceOrDo: 'DO-2026-8812',
    remarks: 'Order Paracetamol 500mg dan Amoxicillin disetujui, tanda tangan digital apoteker penanggung jawab tercatat.',
    isToday: true,
    completionTime: '11:20 WIB',
    digitalSignatureApoteker: 'apt. Siti Rahmawati, S.Farm (Verified via SIPA)',
  },
  {
    id: 'VIS-002',
    partnerId: 'BSM-DHW-02',
    partnerName: 'Minimarket Basmalah Dharmawangsa',
    partnerInitial: 'BM',
    partnerType: 'Minimarket',
    salesRep: 'Rina Wijaya',
    salesArea: 'Sales Field B (Gubeng-Dharmawangsa)',
    orderValue: 'Rp 8.250.000',
    orderValueRaw: 8250000,
    itemsSummary: '12 SKU FMCG',
    checkInTime: '09:30 WIB',
    visitStatus: 'Diproses',
    statusBadge: 'Processing / Diproses',
    typeTag: 'Payment Collection',
    invoiceOrDo: 'INV-2026-0891',
    remarks: 'Faktur jatuh tempo 30 hari telah terbayar lunas via virtual account Bank Jatim.',
    isToday: true,
    completionTime: '10:15 WIB',
  },
  {
    id: 'VIS-003',
    partnerId: 'K24-MNY-01',
    partnerName: 'Apotek K-24 Manyar',
    partnerInitial: 'K24',
    partnerType: 'Apotek',
    salesRep: 'Dimas Prasetyo',
    salesArea: 'Sales Field A (Surabaya Timur)',
    orderValue: 'Rp 22.100.000',
    orderValueRaw: 22100000,
    itemsSummary: '9 Item Ethical & OTC',
    checkInTime: '08:15 WIB',
    visitStatus: 'Terkirim',
    statusBadge: 'Delivered / Terkirim',
    typeTag: 'Restock Order',
    invoiceOrDo: 'DO-2026-8809',
    remarks: 'Pengecekan Stok Kritis Ethical, Sirup Anak, & OTC Fast Moving selesai.',
    isToday: true,
    completionTime: '09:05 WIB',
    digitalSignatureApoteker: 'apt. Hendra Gunawan (Verified)',
  },
  {
    id: 'VIS-004',
    partnerId: 'TO-SDA-07',
    partnerName: 'Toko Obat Sehat Sejahtera',
    partnerInitial: 'SS',
    partnerType: 'Toko Obat',
    salesRep: 'Ahmad Fauzi',
    salesArea: 'Sales Field C (Sidoarjo Barat)',
    orderValue: 'Rp 5.450.000',
    orderValueRaw: 5450000,
    itemsSummary: '4 Item Suplemen',
    checkInTime: '08:00 WIB',
    visitStatus: 'Pending',
    statusBadge: 'Pending Konfirmasi Gudang',
    typeTag: 'Restock Order',
    invoiceOrDo: 'DRAFT-PO-3341',
    remarks: 'Restock Suplemen Herbal, Vitamin C, & Minyak Kayu Putih. Menunggu verifikasi kuota COD.',
    isToday: true,
  },
  {
    id: 'VIS-005',
    partnerId: 'SYM-GBG-04',
    partnerName: 'Minimarket Surya Mart Gubeng',
    partnerInitial: 'SM',
    partnerType: 'Minimarket',
    salesRep: 'Rina Wijaya',
    salesArea: 'Sales Field B (Surabaya Pusat)',
    orderValue: 'Rp 11.800.000',
    orderValueRaw: 11800000,
    itemsSummary: '8 SKU Personal Care',
    checkInTime: '07:45 WIB',
    visitStatus: 'Diproses',
    statusBadge: 'Processing / Diproses',
    typeTag: 'New Onboarding',
    invoiceOrDo: 'DO-2026-8805',
    remarks: 'Perjanjian Konsinyasi & Penataan Etalase FMCG Produk Bayi terverifikasi kepala toko.',
    isToday: true,
  },
  {
    id: 'VIS-006',
    partnerId: 'K24-MNY-01',
    partnerName: 'Apotek K-24 Manyar (Kunjungan 2)',
    partnerInitial: 'K24',
    partnerType: 'Apotek',
    salesRep: 'Dimas Prasetyo',
    salesArea: 'Sales Field A (Surabaya Timur)',
    orderValue: 'Rp 6.300.000',
    orderValueRaw: 6300000,
    itemsSummary: 'Repeat Order Sirup Anak',
    checkInTime: '13:30 WIB (Est)',
    visitStatus: 'On-Route',
    statusBadge: 'On-Route • Est. 13:30 WIB',
    typeTag: 'Restock Order',
    invoiceOrDo: 'DRAFT-PO-3352',
    remarks: 'Sales representative sedang dalam perjalanan menuju outlet.',
    isToday: true,
  },
];

export const TOP_PRODUCTS_DATA: TopProduct[] = [
  {
    rank: 1,
    name: 'Paracetamol 500mg Strip (10x10)',
    sku: 'FAR-PCT-001',
    category: 'Obat Bebas',
    omzetText: 'Rp 356.25 Juta',
    omzetPct: 9.3,
    barPct: 95,
    deliveredText: '14,250 Box terkirim',
    avgMargin: '14.2%',
    channel: 'all',
  },
  {
    rank: 2,
    name: 'Amoxicillin Trihydrate 500mg Kapsul',
    sku: 'FAR-AMX-005',
    category: 'Obat Keras',
    omzetText: 'Rp 311.50 Juta',
    omzetPct: 8.1,
    barPct: 78,
    deliveredText: '8,900 Box terkirim',
    avgMargin: '16.5%',
    channel: 'apotek',
  },
  {
    rank: 3,
    name: 'Minyak Kayu Putih Cajuput 120ml',
    sku: 'FMC-MKP-022',
    category: 'FMCG Retail',
    omzetText: 'Rp 259.70 Juta',
    omzetPct: 6.8,
    barPct: 65,
    deliveredText: '7,420 Botol terkirim',
    avgMargin: '11.8%',
    channel: 'minimarket',
  },
  {
    rank: 4,
    name: 'Vitamin C 1000mg Effervescent Orange',
    sku: 'SUP-VTC-014',
    category: 'Suplemen',
    omzetText: 'Rp 239.75 Juta',
    omzetPct: 6.2,
    barPct: 58,
    deliveredText: '6,850 Tube terkirim',
    avgMargin: '18.0%',
    channel: 'all',
  },
  {
    rank: 5,
    name: 'Betadine Antiseptic Solution 60ml',
    sku: 'FAR-BTD-003',
    category: 'P3K / OTC',
    omzetText: 'Rp 179.20 Juta',
    omzetPct: 4.7,
    barPct: 45,
    deliveredText: '5,120 Botol terkirim',
    avgMargin: '13.5%',
    channel: 'all',
  },
];

export const REGIONAL_PERFORMANCES: RegionalPerformance[] = [
  {
    regionName: 'Surabaya Pusat & Timur (DC Rungkut)',
    hubs: 'DC Surabaya Rungkut',
    activeOutlets: 512,
    targetM: 1.40,
    targetText: 'Rp 1.40 M',
    realizationM: 1.54,
    realizationText: 'Rp 1.54 M',
    pctAchievement: 110.0,
    barPct: 100,
    status: 'safe',
  },
  {
    regionName: 'Surabaya Barat & Sidoarjo',
    hubs: 'Sub-Hub Waru',
    activeOutlets: 320,
    targetM: 0.90,
    targetText: 'Rp 900 Jt',
    realizationM: 0.98,
    realizationText: 'Rp 980 Jt',
    pctAchievement: 108.8,
    barPct: 90,
    status: 'safe',
  },
  {
    regionName: 'Malang Raya & Pasuruan',
    hubs: 'DC Singosari',
    activeOutlets: 246,
    targetM: 0.70,
    targetText: 'Rp 700 Jt',
    realizationM: 0.72,
    realizationText: 'Rp 720 Jt',
    pctAchievement: 102.8,
    barPct: 75,
    status: 'safe',
  },
  {
    regionName: 'Gresik, Mojokerto & Jombang',
    hubs: 'Sub-Hub Manyar',
    activeOutlets: 118,
    targetM: 0.35,
    targetText: 'Rp 350 Jt',
    realizationM: 0.38,
    realizationText: 'Rp 380 Jt',
    pctAchievement: 108.5,
    barPct: 50,
    status: 'safe',
  },
  {
    regionName: 'Denpasar & Badung (Hub Bali)',
    hubs: 'Hub Denpasar Sanur',
    activeOutlets: 52,
    targetM: 0.25,
    targetText: 'Rp 250 Jt',
    realizationM: 0.22,
    realizationText: 'Rp 220 Jt',
    pctAchievement: 88.0,
    barPct: 35,
    status: 'warning',
  },
];

export const SALES_CHART_MONTHS = [
  { month: 'Mei 2026', short: 'Mei', actualM: 2.85, targetM: 2.90, koli: '1.8k', targetH: 60, realH: 55 },
  { month: 'Jun 2026', short: 'Jun', actualM: 3.10, targetM: 3.00, koli: '2.1k', targetH: 68, realH: 65 },
  { month: 'Jul 2026', short: 'Jul', actualM: 3.25, targetM: 3.10, koli: '2.3k', targetH: 75, realH: 72 },
  { month: 'Agu 2026', short: 'Agu', actualM: 3.48, targetM: 3.25, koli: '2.5k', targetH: 70, realH: 78 },
  { month: 'Sep 2026', short: 'Sep', actualM: 3.62, targetM: 3.35, koli: '2.7k', targetH: 85, realH: 82 },
  { month: 'Okt 2026', short: 'Okt', actualM: 3.84, targetM: 3.50, koli: '3.1k', targetH: 90, realH: 95 },
];
