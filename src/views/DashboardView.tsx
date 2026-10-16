/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InventoryItem, SalesVisit, SALES_CHART_MONTHS } from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface DashboardViewProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenRestock: (name: string, batch: string, threshold: string) => void;
  onOpenNewVisit: () => void;
  onOpenDOModal: (visit: SalesVisit) => void;
  onShowToast: (msg: string) => void;
  inventory: InventoryItem[];
  visits: SalesVisit[];
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenRestock,
  onOpenNewVisit,
  onOpenDOModal,
  onShowToast,
  inventory,
  visits,
}) => {
  const [chartPeriod, setChartPeriod] = useState<'6m' | '1y'>('6m');
  const [activeVisitTab, setActiveVisitTab] = useState<'all' | 'terkirim' | 'diproses' | 'pending'>('all');
  const [filterPartnerQuery, setFilterPartnerQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered visits
  const filteredVisits = visits.filter((v) => {
    const matchTab =
      activeVisitTab === 'all' ||
      (activeVisitTab === 'terkirim' && v.visitStatus === 'Terkirim') ||
      (activeVisitTab === 'diproses' && v.visitStatus === 'Diproses') ||
      (activeVisitTab === 'pending' && (v.visitStatus === 'Pending' || v.visitStatus === 'On-Route'));

    const matchQuery =
      !filterPartnerQuery ||
      v.partnerName.toLowerCase().includes(filterPartnerQuery.toLowerCase()) ||
      v.salesRep.toLowerCase().includes(filterPartnerQuery.toLowerCase());

    return matchTab && matchQuery;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Header Section */}
      <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="font-headline-lg text-2xl text-on-surface font-bold tracking-tight">
              Selamat Pagi, Budi Santoso
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-primary font-label-sm text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-status-safe animate-pulse"></span>
              Semua sistem sinkronisasi stok cabang aktif (99.8% Uptime)
            </span>
          </div>
          <p className="font-body-md text-sm text-text-muted-light">
            Senin, 23 Oktober 2026 • Wilayah Distribusi Jawa Timur &amp; Bali (DC Surabaya Rungkut)
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => onShowToast('Mengunduh Laporan Operasional Harian (PDF)...')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-primary font-label-md text-xs font-semibold shadow-xs hover:bg-surface-container-high transition-colors border border-border-light cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Unduh Laporan Operasional</span>
          </button>
          <button
            onClick={onOpenNewVisit}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold shadow-xs hover:bg-primary transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Catat Kunjungan / Order Baru</span>
          </button>
        </div>
      </section>

      {/* Top Metrics Row (4 Cards) */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Mitra Aktif */}
        <div
          onClick={() => onNavigate('customers')}
          className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium">
                Total Mitra Aktif
              </span>
              <span className="font-metric-num text-3xl text-on-surface font-bold mt-1">
                1,248
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">local_pharmacy</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-light/60 flex items-center justify-between">
            <span className="font-body-sm text-xs text-text-muted-light">
              842 Apotek • 406 Minimarket
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-status-safe font-label-sm text-[11px] font-semibold">
              +5.2% bulan ini
            </span>
          </div>
        </div>

        {/* Card 2: Pendapatan Distribusi */}
        <div
          onClick={() => onNavigate('analytics')}
          className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium">
                Pendapatan Distribusi Bulanan
              </span>
              <span className="font-metric-num text-3xl text-on-surface font-bold mt-1">
                Rp 3.84 M
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">payments</span>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="w-24 h-6 text-secondary">
              <svg
                className="w-full h-full"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 100 24"
              >
                <path d="M0,20 Q20,16 35,18 T60,8 T85,10 T100,2"></path>
              </svg>
            </div>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-status-safe font-label-sm text-[11px] font-semibold">
              +12.4% vs target
            </span>
          </div>
          <div className="mt-1 flex items-center justify-between text-xs">
            <span className="font-body-sm text-text-muted-light">Target: Rp 3.50 Miliar</span>
            <span className="font-label-sm text-primary font-medium">Capai 109.7%</span>
          </div>
        </div>

        {/* Card 3: Stok Kritis & Expired */}
        <div
          onClick={() => onNavigate('inventory-expiry')}
          className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium">
                Perhatian Khusus SKU
              </span>
              <span className="font-metric-num text-3xl text-status-critical font-bold mt-1">
                18 SKU
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-error-container/40 flex items-center justify-center text-error relative shrink-0">
              <span className="material-symbols-outlined text-2xl">warning</span>
              <span className="w-2.5 h-2.5 rounded-full bg-status-critical absolute -top-0.5 -right-0.5 animate-ping"></span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-light/60 flex items-center justify-between">
            <span className="font-body-sm text-xs text-text-muted-light">
              7 Menipis • 11 &lt;90 hari exp
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-50 dark:bg-red-950/50 text-status-critical font-label-sm text-[11px] font-semibold">
              Perhatian Segera
            </span>
          </div>
        </div>

        {/* Card 4: Kunjungan Sales */}
        <div
          onClick={() => onNavigate('sales-activity')}
          className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium">
                Kunjungan Sales Hari Ini
              </span>
              <span className="font-metric-num text-3xl text-on-surface font-bold mt-1">
                42{' '}
                <span className="font-headline-sm text-lg text-text-muted-light font-normal">
                  / 56
                </span>
              </span>
            </div>
            <div className="w-11 h-11 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">person_pin_circle</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-border-light/60 flex items-center justify-between">
            <span className="font-body-sm text-xs text-text-muted-light">
              14 rute dalam perjalanan
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-status-warning font-label-sm text-[11px] font-semibold">
              75% Selesai
            </span>
          </div>
        </div>
      </section>

      {/* Middle Section: Chart (60%) & Priority Alerts (40%) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column: Sales vs Distribution Chart (~58-60%) */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
            <div>
              <h2 className="font-headline-sm text-base text-on-surface font-bold">
                Tren Penjualan vs Distribusi Barang
              </h2>
              <p className="font-body-sm text-xs text-text-muted-light">
                Volume koli pesanan terkirim periode bulanan 2026
              </p>
            </div>
            <div className="flex items-center gap-1 self-start sm:self-auto bg-surface-container-low p-1 rounded-lg border border-border-light/60">
              <button
                onClick={() => setChartPeriod('6m')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  chartPeriod === '6m'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                6 Bulan
              </button>
              <button
                onClick={() => setChartPeriod('1y')}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  chartPeriod === '1y'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                1 Tahun
              </button>
            </div>
          </div>

          {/* Legend and fulfillment pill */}
          <div className="flex items-center justify-between flex-wrap gap-2 py-2 border-b border-border-light/50">
            <div className="flex items-center gap-4 text-xs font-body-sm">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-primary"></span>
                <span className="text-on-surface font-medium">Target Distribusi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-xs bg-secondary-container"></span>
                <span className="text-on-surface font-medium">Realisasi Pesanan (Apotek &amp; Mart)</span>
              </div>
            </div>
            <span className="font-label-sm text-[11px] text-text-muted-light bg-surface-container-high px-2 py-0.5 rounded-full">
              Unit: Ribu Koli / Karton
            </span>
          </div>

          {/* HTML / Bar Chart Container */}
          <div className="w-full h-64 mt-4 relative flex flex-col justify-end">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-40">
              <div className="w-full h-px bg-border-light"></div>
              <div className="w-full h-px bg-border-light"></div>
              <div className="w-full h-px bg-border-light"></div>
              <div className="w-full h-px bg-border-light"></div>
              <div className="w-full h-px bg-border-light"></div>
            </div>

            {/* Chart Bars Container */}
            <div className="relative z-10 grid grid-cols-6 h-48 items-end gap-2 sm:gap-3 px-2">
              {SALES_CHART_MONTHS.map((item, idx) => {
                const isOct = item.short === 'Okt';
                return (
                  <div
                    key={idx}
                    className="flex flex-col items-center h-full justify-end group cursor-pointer"
                    onClick={() => onShowToast(`Detail ${item.month}: Target ${item.targetM}M, Realisasi ${item.actualM}M (${item.koli} koli)`)}
                  >
                    <div className="relative flex items-end gap-1 sm:gap-1.5 h-full w-full justify-center">
                      <div
                        className={`w-3 sm:w-5 rounded-t-sm transition-all ${
                          isOct
                            ? 'bg-primary/30'
                            : 'bg-primary/25 group-hover:bg-primary/40'
                        }`}
                        style={{ height: `${item.targetH}%` }}
                        title={`Target: ${item.targetM} M`}
                      ></div>
                      <div
                        className={`w-3 sm:w-5 rounded-t-sm transition-all ${
                          isOct
                            ? 'bg-primary shadow-xs'
                            : 'bg-primary group-hover:opacity-90'
                        }`}
                        style={{ height: `${item.realH}%` }}
                        title={`Realisasi: ${item.actualM} M`}
                      ></div>
                    </div>
                    <span
                      className={`font-label-sm text-xs mt-2 ${
                        isOct ? 'text-primary font-bold' : 'text-text-muted-light'
                      }`}
                    >
                      {item.short}
                    </span>
                    <span
                      className={`font-label-sm text-[10px] ${
                        isOct ? 'text-primary font-bold' : 'text-text-muted-light'
                      }`}
                    >
                      {item.koli}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low rounded-lg p-3 border border-border-light/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-status-safe text-lg">check_circle</span>
              <span className="font-body-sm text-xs text-on-surface">
                Rata-rata pemenuhan pesanan (Fulfillment Rate):{' '}
                <strong className="text-primary font-semibold">96.4% tepat waktu</strong>.
              </span>
            </div>
            <span className="font-label-sm text-xs text-text-muted-light">Lead Time: 1.4 Hari</span>
          </div>
        </div>

        {/* Right Column: Stock & Expiry Priority (~40-42%) */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col">
          <div className="flex items-center justify-between pb-1">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-base text-on-surface font-bold">
                Peringatan Stok &amp; Kadaluarsa
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-error-container text-error font-label-sm text-xs font-bold">
                5 Mendesak
              </span>
            </div>
            <button
              onClick={() => onNavigate('inventory-expiry')}
              className="font-label-sm text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold"
            >
              <span>Kelola Stok</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
          <p className="font-body-sm text-xs text-text-muted-light mb-3">
            Top 5 SKU dengan risiko downtime suplai atau kadaluarsa &lt;90 hari.
          </p>

          {/* List of 5 Alert Items */}
          <div className="flex flex-col gap-2.5">
            {inventory.slice(0, 5).map((item) => {
              const isCritical = item.statusLevel === 'CRITICAL';
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors flex items-center justify-between gap-2 border border-border-light/50"
                >
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-label-md text-xs text-on-surface font-semibold truncate">
                        {item.name}
                      </span>
                      <span className="px-1.5 py-0.2 rounded bg-surface-container text-tertiary font-label-sm text-[10px]">
                        {item.categoryLabel}
                      </span>
                    </div>
                    <div className="font-body-sm text-[11px] text-text-muted-light mt-0.5">
                      Batch: <code className="text-on-surface font-semibold font-mono">{item.batchNumber}</code>{' '}
                      • Stok:{' '}
                      <strong className={isCritical ? 'text-status-critical font-bold' : 'text-on-surface'}>
                        {item.stockQty} {item.unit}
                      </strong>{' '}
                      (Min: {item.minRestockNum})
                    </div>
                    <div
                      className={`flex items-center gap-1.5 mt-1 font-label-sm text-xs font-semibold ${
                        isCritical ? 'text-status-critical' : 'text-status-warning'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <span>
                        Exp: {item.expiryDate} ({item.relativeExpiryText})
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span
                      className={`px-2 py-0.5 rounded-full font-label-sm text-[11px] font-bold ${
                        isCritical
                          ? 'bg-red-100 dark:bg-red-950/60 text-status-critical'
                          : 'bg-amber-100 dark:bg-amber-950/60 text-status-warning'
                      }`}
                    >
                      {item.statusLabel}
                    </span>
                    <button
                      onClick={() => onOpenRestock(item.name, item.batchNumber, item.minRestock)}
                      className={`px-2.5 py-1 rounded-md font-label-sm text-xs font-semibold transition-all ${
                        isCritical
                          ? 'bg-primary text-on-primary hover:opacity-90'
                          : 'bg-surface-container-lowest text-primary shadow-xs hover:bg-surface-container'
                      }`}
                      type="button"
                    >
                      {isCritical ? 'Pesan Ulang' : 'Order Baru'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom Section: Sales Activity & Orders (Data Table) */}
      <section className="bg-surface-container-lowest rounded-xl shadow-xs border border-border-light overflow-hidden flex flex-col mb-4">
        <div className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border-light">
          <div>
            <h2 className="font-headline-sm text-base text-on-surface font-bold">
              Aktivitas Kunjungan &amp; Pesanan Sales Terkini
            </h2>
            <p className="font-body-sm text-xs text-text-muted-light">
              Sinkronisasi langsung dari perangkat mobile salesman lapangan
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center bg-surface-container-low rounded-lg p-1 text-xs border border-border-light/60">
              <button
                onClick={() => setActiveVisitTab('all')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
                  activeVisitTab === 'all'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                Semua ({visits.length})
              </button>
              <button
                onClick={() => setActiveVisitTab('terkirim')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeVisitTab === 'terkirim'
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                Terkirim
              </button>
              <button
                onClick={() => setActiveVisitTab('diproses')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeVisitTab === 'diproses'
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                Diproses
              </button>
              <button
                onClick={() => setActiveVisitTab('pending')}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  activeVisitTab === 'pending'
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                Pending
              </button>
            </div>

            <div className="relative">
              <span className="material-symbols-outlined absolute left-2.5 top-2 text-text-muted-light text-base pointer-events-none">
                filter_list
              </span>
              <input
                value={filterPartnerQuery}
                onChange={(e) => setFilterPartnerQuery(e.target.value)}
                className="h-9 pl-8 pr-3 text-xs rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light outline-none focus:ring-1 focus:ring-primary w-40 border border-border-light/60"
                placeholder="Filter mitra..."
                type="text"
              />
            </div>
          </div>
        </div>

        {/* Responsive Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-surface-container-low font-label-sm text-xs text-text-muted-light uppercase tracking-wider">
              <tr>
                <th className="py-3 px-5" scope="col">Pelanggan / Mitra</th>
                <th className="py-3 px-4" scope="col">Tipe Mitra</th>
                <th className="py-3 px-4" scope="col">Sales Representative</th>
                <th className="py-3 px-4" scope="col">Nilai Pesanan</th>
                <th className="py-3 px-4" scope="col">Waktu Kunjungan</th>
                <th className="py-3 px-4" scope="col">Status Pesanan</th>
                <th className="py-3 px-5 text-right" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-xs font-body-sm">
              {filteredVisits.map((visit) => {
                const isDelivered = visit.visitStatus === 'Terkirim';
                const isProcessing = visit.visitStatus === 'Diproses';
                const isPending = visit.visitStatus === 'Pending' || visit.visitStatus === 'On-Route';

                return (
                  <tr key={visit.id} className="hover:bg-surface-container-low/60 transition-colors">
                    <td className="py-3.5 px-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold ${
                            visit.partnerType === 'Apotek'
                              ? 'bg-emerald-50 dark:bg-emerald-950/50 text-status-safe'
                              : 'bg-cyan-50 dark:bg-cyan-950/50 text-secondary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-base">
                            {visit.partnerType === 'Apotek' ? 'local_pharmacy' : 'storefront'}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">
                            {visit.partnerName}
                          </span>
                          <span className="font-body-sm text-[11px] text-text-muted-light truncate">
                            {visit.salesArea}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-[11px] font-semibold">
                        {visit.partnerType}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-on-surface">
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs text-on-surface font-semibold">
                          {visit.salesRep}
                        </span>
                        <span className="font-body-sm text-[11px] text-text-muted-light">
                          {visit.salesArea}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-label-md text-xs text-on-surface font-bold">
                        {visit.orderValue}
                      </span>
                      <span className="block font-body-sm text-[11px] text-text-muted-light">
                        {visit.itemsSummary}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 text-on-surface font-body-sm">
                        <span className="material-symbols-outlined text-xs text-text-muted-light">schedule</span>
                        <span>{visit.checkInTime}</span>
                        {visit.isToday && (
                          <span className="text-primary font-label-sm text-[11px] font-semibold">
                            (Hari ini)
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isDelivered && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-status-safe font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span>
                          Delivered / Terkirim
                        </span>
                      )}
                      {isProcessing && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-primary font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                          Processing / Diproses
                        </span>
                      )}
                      {isPending && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-status-warning font-label-sm text-[11px] font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                          {visit.statusBadge}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      {isDelivered || isProcessing ? (
                        <button
                          onClick={() => onOpenDOModal(visit)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                          type="button"
                        >
                          Detail DO
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            onShowToast(`Pesanan ${visit.partnerName} dikonfirmasi & masuk antrian gudang`);
                          }}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary-container text-on-primary hover:bg-primary font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                          type="button"
                        >
                          Konfirmasi
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer with pagination summary */}
        <div className="px-5 py-3 bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted-light border-t border-border-light">
          <span>Menampilkan {filteredVisits.length} dari 18 transaksi pesanan aktif hari ini</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded bg-surface-container-lowest text-text-muted-light hover:text-on-surface disabled:opacity-40 border border-border-light"
              type="button"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <span className="font-label-sm text-xs font-semibold text-primary px-2">
              Halaman {currentPage} dari 4
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(4, currentPage + 1))}
              className="p-1 rounded bg-surface-container-lowest text-text-muted-light hover:text-on-surface border border-border-light"
              type="button"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
