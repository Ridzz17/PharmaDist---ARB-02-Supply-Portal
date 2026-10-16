/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  TOP_PRODUCTS_DATA,
  REGIONAL_PERFORMANCES,
} from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface AnalyticsViewProps {
  onNavigate: (screen: ScreenId) => void;
  onOpenFefoConfig: () => void;
  onShowToast: (msg: string) => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  onNavigate,
  onOpenFefoConfig,
  onShowToast,
}) => {
  const [dateRange, setDateRange] = useState('Bulan Ini (Oktober 2026)');
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Semua Kategori (Farmasi & FMCG)');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'6m' | '12m' | 'q'>('6m');
  const [productChannel, setProductChannel] = useState<'all' | 'apotek' | 'minimarket'>('all');
  const [hoveredDataPoint, setHoveredDataPoint] = useState<string | null>(null);

  const dateRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dateRef.current && !dateRef.current.contains(e.target as Node)) {
        setShowDateDropdown(false);
      }
      if (catRef.current && !catRef.current.contains(e.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredProducts = TOP_PRODUCTS_DATA.filter((p) => {
    if (productChannel === 'all') return true;
    return p.channel === productChannel || p.channel === 'all';
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Header Section with Breadcrumbs & Action Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-text-muted-light font-label-sm text-xs uppercase tracking-wider mb-0.5">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              DASHBOARD
            </button>
            <span className="material-symbols-outlined text-xs leading-none">chevron_right</span>
            <span className="text-primary font-bold">ANALISIS &amp; LAPORAN BISNIS</span>
          </div>
          <h1 className="font-display-lg text-2xl sm:text-3xl text-on-surface tracking-tight font-bold">
            Analisis Kinerja &amp; Laporan Distribusi
          </h1>
          <p className="font-body-md text-sm text-text-muted-light max-w-3xl">
            Pantau realisasi pendapatan, pergerakan kategori terlaris, serta efektivitas distribusi farmasi dan FMCG di seluruh jaringan mitra.
          </p>
        </div>

        {/* Controls Toolbar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Date Selector Dropdown */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => setShowDateDropdown(!showDateDropdown)}
              className="h-10 px-3 bg-surface-container-lowest border border-border-light rounded-lg flex items-center gap-2 text-on-surface hover:bg-surface-container-low transition-colors shadow-xs text-xs font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-primary text-base">calendar_month</span>
              <span>{dateRange}</span>
              <span className="material-symbols-outlined text-text-muted-light text-base">expand_more</span>
            </button>
            {showDateDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-border-light z-50 p-1 flex flex-col gap-1 text-xs">
                {['Bulan Ini (Oktober 2026)', 'Kuartal 3 (Q3 2026)', 'Kuartal 2 (Q2 2026)', 'Tahun Berjalan (YTD 2026)'].map(
                  (range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setDateRange(range);
                        setShowDateDropdown(false);
                        onShowToast(`Periode analisis disesuaikan: ${range}`);
                      }}
                      className={`px-3 py-2 text-left rounded-lg transition-colors flex items-center justify-between ${
                        dateRange === range
                          ? 'bg-surface-container-low text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                      type="button"
                    >
                      <span>{range}</span>
                      {dateRange === range && (
                        <span className="material-symbols-outlined text-primary text-base">check</span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Category Filter Dropdown */}
          <div className="relative" ref={catRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="h-10 px-3 bg-surface-container-lowest border border-border-light rounded-lg flex items-center gap-2 text-on-surface hover:bg-surface-container-low transition-colors shadow-xs text-xs font-semibold cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-secondary text-base">category</span>
              <span className="truncate max-w-[180px]">{selectedCategory}</span>
              <span className="material-symbols-outlined text-text-muted-light text-base">expand_more</span>
            </button>
            {showCategoryDropdown && (
              <div className="absolute right-0 mt-1 w-64 bg-surface-container-lowest rounded-xl shadow-xl border border-border-light z-50 p-1 flex flex-col gap-1 text-xs">
                {['Semua Kategori (Farmasi & FMCG)', 'Farmasi Saja (Ethical & OTC)', 'FMCG Retail & Personal Care'].map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                        onShowToast(`Filter kategori: ${cat}`);
                      }}
                      className={`px-3 py-2 text-left rounded-lg transition-colors flex items-center justify-between ${
                        selectedCategory === cat
                          ? 'bg-surface-container-low text-primary font-bold'
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                      type="button"
                    >
                      <span>{cat}</span>
                      {selectedCategory === cat && (
                        <span className="material-symbols-outlined text-primary text-base">check</span>
                      )}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Export Action */}
          <button
            onClick={() => onShowToast('Mengekspor Laporan Bisnis Komprehensif (PDF/Excel)...')}
            className="h-10 px-3.5 bg-surface-container-lowest hover:bg-surface-container-low text-primary border border-border-light rounded-lg font-label-md text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-primary text-base">download</span>
            <span>Ekspor Laporan (PDF/Excel)</span>
          </button>

          {/* Create Custom Report */}
          <button
            onClick={() => onShowToast('Membuka wizard pembuatan laporan analitik custom')}
            className="h-10 px-3.5 bg-primary-container text-on-primary hover:bg-primary rounded-lg font-label-md text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base leading-none">add</span>
            <span>Buat Laporan Khusus</span>
          </button>
        </div>
      </div>

      {/* Top Summary Row: 3 Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Card 1: Total Revenue */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-text-muted-light font-semibold">
                Pendapatan Periode Berjalan
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold">Rp 3.84 Miliar</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 border-t border-border-light/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-status-safe font-label-sm text-[11px] font-bold">
                <span className="material-symbols-outlined text-xs leading-none">arrow_upward</span>
                +12.4% vs Bulan Lalu
              </span>
              <span className="font-body-sm text-xs text-text-muted-light">
                Target Rp 3.50 M (<span className="font-semibold text-primary">109.7%</span>)
              </span>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-primary h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="font-body-sm text-[11px] text-text-muted-light mt-1">
              <span className="font-medium text-on-surface">Farmasi:</span> Rp 2.42 M (63%) •{' '}
              <span className="font-medium text-on-surface">FMCG Retail:</span> Rp 1.42 M (37%)
            </p>
          </div>
        </div>

        {/* Card 2: Top Product Category */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-text-muted-light font-semibold">
                Kategori Produk Terlaris
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-headline-md text-xl text-on-surface font-bold">
                  Obat Bebas (OTC) &amp; Suplemen
                </span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary shrink-0">
              <span className="material-symbols-outlined text-2xl">medication</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 border-t border-border-light/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-status-safe font-label-sm text-[11px] font-bold">
                <span className="material-symbols-outlined text-xs leading-none">trending_up</span>
                +18.2% MoM Demand
              </span>
              <span className="font-body-sm text-xs text-text-muted-light">
                54.2% Total Penjualan
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-text-muted-light mt-1">
              <div className="h-2 rounded-full bg-primary flex-1" title="OTC: 54.2%"></div>
              <div className="h-2 rounded-full bg-secondary w-1/4 opacity-80" title="FMCG: 28.5%"></div>
              <div className="h-2 rounded-full bg-tertiary w-1/6 opacity-70" title="Resep: 17.3%"></div>
            </div>
            <p className="font-body-sm text-[11px] text-text-muted-light mt-1 truncate">
              Paracetamol &amp; Vitamin C memimpin repeat order apotek
            </p>
          </div>
        </div>

        {/* Card 3: Completed Orders */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-sm text-xs uppercase tracking-wider text-text-muted-light font-semibold">
                Total Pesanan Selesai Terkirim
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold">1,842 Pesanan</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 pt-2 border-t border-border-light/60">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-status-safe font-label-sm text-[11px] font-bold">
                <span className="material-symbols-outlined text-xs leading-none">check_circle</span>
                97.5% Fulfillment Rate
              </span>
              <span className="font-body-sm text-xs text-text-muted-light">
                +8.6% Efisiensi Distribusi
              </span>
            </div>
            <div className="w-full bg-surface-container-low h-1.5 rounded-full overflow-hidden mt-1">
              <div className="bg-secondary h-full rounded-full" style={{ width: '97.5%' }}></div>
            </div>
            <p className="font-body-sm text-[11px] text-text-muted-light mt-1">
              Dari 1,890 order masuk • <span className="font-medium text-on-surface">Rata-rata:</span> Rp 2.08 Juta / Order
            </p>
          </div>
        </div>
      </div>

      {/* Main Section: Sales & Revenue Area/Line Chart */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col gap-4">
        {/* Card Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-2 border-b border-border-light">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <h2 className="font-headline-sm text-base text-on-surface font-bold">
                Tren Penjualan &amp; Pendapatan Bulanan (6 Bulan Terakhir)
              </h2>
            </div>
            <p className="font-body-sm text-xs text-text-muted-light">
              Perbandingan realisasi pendapatan aktual vs target distribusi (Mei – Oktober 2026)
            </p>
          </div>

          {/* Legend and Period Toggles */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-3 text-xs font-body-sm text-text-muted-light">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 bg-primary rounded-full"></span>
                <span className="text-on-surface font-semibold">Pendapatan Aktual</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 border-t border-dashed border-tertiary"></span>
                <span>Target Penjualan</span>
              </div>
            </div>

            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-border-light/60 text-xs">
              <button
                onClick={() => setChartPeriod('6m')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  chartPeriod === '6m'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                6 Bulan
              </button>
              <button
                onClick={() => setChartPeriod('12m')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  chartPeriod === '12m'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                12 Bulan
              </button>
              <button
                onClick={() => setChartPeriod('q')}
                className={`px-3 py-1 rounded font-semibold transition-colors ${
                  chartPeriod === 'q'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
                type="button"
              >
                Kuartalan
              </button>
            </div>
          </div>
        </div>

        {/* High-Fidelity SVG Area Chart */}
        <div className="relative w-full pt-2">
          <div className="w-full h-72 md:h-80 relative">
            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 320">
              <defs>
                <linearGradient id="analyticsGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#0f766e" stopOpacity="0.25"></stop>
                  <stop offset="60%" stopColor="#0f766e" stopOpacity="0.06"></stop>
                  <stop offset="100%" stopColor="#0f766e" stopOpacity="0.00"></stop>
                </linearGradient>
                <linearGradient id="analyticsTargetGrad" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#64748b" stopOpacity="0.5"></stop>
                  <stop offset="100%" stopColor="#425268" stopOpacity="0.8"></stop>
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line stroke="#E2E8F0" strokeDasharray="4,4" strokeWidth="1" x1="60" x2="980" y1="30" y2="30"></line>
              <text fill="#64748B" fontFamily="Inter" fontSize="11" textAnchor="end" x="50" y="34">
                Rp 4.0M
              </text>

              <line stroke="#E2E8F0" strokeDasharray="4,4" strokeWidth="1" x1="60" x2="980" y1="90" y2="90"></line>
              <text fill="#64748B" fontFamily="Inter" fontSize="11" textAnchor="end" x="50" y="94">
                Rp 3.5M
              </text>

              <line stroke="#E2E8F0" strokeDasharray="4,4" strokeWidth="1" x1="60" x2="980" y1="150" y2="150"></line>
              <text fill="#64748B" fontFamily="Inter" fontSize="11" textAnchor="end" x="50" y="154">
                Rp 3.0M
              </text>

              <line stroke="#E2E8F0" strokeDasharray="4,4" strokeWidth="1" x1="60" x2="980" y1="210" y2="210"></line>
              <text fill="#64748B" fontFamily="Inter" fontSize="11" textAnchor="end" x="50" y="214">
                Rp 2.5M
              </text>

              <line stroke="#CBD5E1" strokeWidth="1" x1="60" x2="980" y1="270" y2="270"></line>
              <text fill="#64748B" fontFamily="Inter" fontSize="11" textAnchor="end" x="50" y="274">
                Rp 2.0M
              </text>

              {/* Target Dashed Line */}
              <path
                d="M 130 162 L 290 150 L 450 138 L 610 120 L 770 108 L 930 90"
                fill="none"
                stroke="url(#analyticsTargetGrad)"
                strokeDasharray="6,6"
                strokeWidth="2"
              ></path>

              {/* Actual Revenue Area Fill */}
              <path
                d="M 130 168 
                   C 200 156, 230 142, 290 138 
                   C 350 134, 390 124, 450 120 
                   C 510 116, 560 98, 610 92 
                   C 670 86, 710 79, 770 75 
                   C 830 71, 880 54, 930 49 
                   L 930 270 L 130 270 Z"
                fill="url(#analyticsGradient)"
              ></path>

              {/* Actual Line Stroke */}
              <path
                d="M 130 168 
                   C 200 156, 230 142, 290 138 
                   C 350 134, 390 124, 450 120 
                   C 510 116, 560 98, 610 92 
                   C 670 86, 710 79, 770 75 
                   C 830 71, 880 54, 930 49"
                fill="none"
                stroke="#0f766e"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3.5"
              ></path>

              {/* Data Points */}
              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDataPoint('Mei: Rp 2.85M')}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <circle cx="130" cy="168" fill="#ffffff" r="5" stroke="#0f766e" strokeWidth="3"></circle>
                <text fill="#131B2E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="130" y="152">
                  Rp 2.85M
                </text>
              </g>

              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDataPoint('Juni: Rp 3.10M')}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <circle cx="290" cy="138" fill="#ffffff" r="5" stroke="#0f766e" strokeWidth="3"></circle>
                <text fill="#131B2E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="290" y="122">
                  Rp 3.10M
                </text>
              </g>

              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDataPoint('Juli: Rp 3.25M')}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <circle cx="450" cy="120" fill="#ffffff" r="5" stroke="#0f766e" strokeWidth="3"></circle>
                <text fill="#131B2E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="450" y="104">
                  Rp 3.25M
                </text>
              </g>

              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDataPoint('Agustus: Rp 3.48M')}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <circle cx="610" cy="92" fill="#ffffff" r="5" stroke="#0f766e" strokeWidth="3"></circle>
                <text fill="#131B2E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="610" y="76">
                  Rp 3.48M
                </text>
              </g>

              <g
                className="cursor-pointer"
                onMouseEnter={() => setHoveredDataPoint('September: Rp 3.62M')}
                onMouseLeave={() => setHoveredDataPoint(null)}
              >
                <circle cx="770" cy="75" fill="#ffffff" r="5" stroke="#0f766e" strokeWidth="3"></circle>
                <text fill="#131B2E" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="770" y="59">
                  Rp 3.62M
                </text>
              </g>

              {/* October Peak Callout */}
              <g className="cursor-pointer">
                <circle cx="930" cy="49" fill="#0f766e" fillOpacity="0.2" r="10"></circle>
                <circle cx="930" cy="49" fill="#0f766e" r="6" stroke="#ffffff" strokeWidth="2.5"></circle>
                <rect fill="#131B2E" height="34" rx="8" width="200" x="760" y="6"></rect>
                <polygon fill="#131B2E" points="924,40 930,47 936,40"></polygon>
                <text fill="#ffffff" fontFamily="Plus Jakarta Sans" fontSize="11" fontWeight="600" textAnchor="middle" x="860" y="27">
                  Oktober: Rp 3.84M (+109.7%)
                </text>
              </g>

              {/* Month Labels */}
              <text fill="#64748B" fontFamily="Inter" fontSize="12" fontWeight="500" textAnchor="middle" x="130" y="295">
                Mei 2026
              </text>
              <text fill="#64748B" fontFamily="Inter" fontSize="12" fontWeight="500" textAnchor="middle" x="290" y="295">
                Jun 2026
              </text>
              <text fill="#64748B" fontFamily="Inter" fontSize="12" fontWeight="500" textAnchor="middle" x="450" y="295">
                Jul 2026
              </text>
              <text fill="#64748B" fontFamily="Inter" fontSize="12" fontWeight="500" textAnchor="middle" x="610" y="295">
                Agu 2026
              </text>
              <text fill="#64748B" fontFamily="Inter" fontSize="12" fontWeight="500" textAnchor="middle" x="770" y="295">
                Sep 2026
              </text>
              <text fill="#0f766e" fontFamily="Inter" fontSize="12" fontWeight="700" textAnchor="middle" x="930" y="295">
                Okt 2026
              </text>
            </svg>
          </div>
        </div>

        {/* Highlights Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-border-light">
          <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3 border border-border-light/60">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-base">query_stats</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-xs text-text-muted-light">Rata-rata Pertumbuhan</span>
              <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">+5.8% per Bulan</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3 border border-border-light/60">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-secondary shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-base">verified</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-xs text-text-muted-light">Peak Season Kinerja</span>
              <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">Oktober 2026 (Rekor)</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-lg p-3 flex items-center gap-3 border border-border-light/60">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-status-safe shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-base">inventory_2</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-xs text-text-muted-light">Ketersediaan Stok Gudang</span>
              <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">Zero Stockout: 99.1%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: 2 Balanced Columns (~58% / ~42%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left Column (7 cols ~ 58%): 5 Produk Terlaris di Apotek & Minimarket */}
        <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-border-light pb-2">
              <div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  5 Produk Terlaris di Apotek &amp; Minimarket
                </h3>
                <p className="font-body-sm text-xs text-text-muted-light">
                  Peringkat volume penjualan dan kontribusi omzet pada periode berjalan
                </p>
              </div>

              <div className="inline-flex items-center bg-surface-container-low p-1 rounded-lg shrink-0 border border-border-light/60 text-xs">
                <button
                  onClick={() => setProductChannel('all')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    productChannel === 'all'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-text-muted-light hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Semua Mitra
                </button>
                <button
                  onClick={() => setProductChannel('apotek')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    productChannel === 'apotek'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-text-muted-light hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Apotek
                </button>
                <button
                  onClick={() => setProductChannel('minimarket')}
                  className={`px-2.5 py-1 rounded font-semibold transition-colors ${
                    productChannel === 'minimarket'
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-text-muted-light hover:text-on-surface'
                  }`}
                  type="button"
                >
                  Minimarket
                </button>
              </div>
            </div>

            {/* Product Ranked Bars List */}
            <div className="flex flex-col gap-3.5">
              {filteredProducts.map((p) => (
                <div key={p.rank} className="flex flex-col gap-1.5 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`w-5 h-5 rounded-full font-label-sm text-xs font-bold flex items-center justify-center shrink-0 ${
                          p.rank === 1
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-high text-on-surface'
                        }`}
                      >
                        {p.rank}
                      </span>
                      <span className="font-label-md text-xs text-on-surface font-semibold truncate">
                        {p.name}
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-[10px]">
                        {p.category}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-label-md text-xs text-on-surface font-bold">{p.omzetText}</span>
                      <span className="font-body-sm text-[11px] text-text-muted-light ml-1">({p.omzetPct}%)</span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{ width: `${p.barPct}%` }}
                    ></div>
                  </div>
                  <div className="flex items-center justify-between text-text-muted-light font-body-sm text-[11px]">
                    <span>{p.deliveredText}</span>
                    <span>Margin Rata-rata: {p.avgMargin}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-border-light flex items-center justify-between text-xs">
            <span className="font-body-sm text-text-muted-light">
              Mencakup 84% volume total gudang utama
            </span>
            <button
              onClick={() => onNavigate('inventory-expiry')}
              className="inline-flex items-center gap-1 font-label-md text-primary font-semibold hover:underline cursor-pointer"
            >
              <span>Lihat Semua 284 SKU Terjual</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols ~ 42%): Kinerja Distribusi Regional */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3 border-b border-border-light pb-2">
              <div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Kinerja Distribusi Regional
                </h3>
                <p className="font-body-sm text-xs text-text-muted-light">
                  Pencapaian kuota per hub logistik Jawa Timur &amp; Bali
                </p>
              </div>
              <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-[11px] font-semibold shrink-0">
                5 Wilayah
              </span>
            </div>

            {/* Regional Rows */}
            <div className="flex flex-col divide-y divide-border-light">
              {REGIONAL_PERFORMANCES.map((reg, idx) => (
                <div key={idx} className="py-2.5 flex flex-col gap-1.5 first:pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col min-w-0">
                      <span className="font-label-md text-xs text-on-surface font-semibold truncate">
                        {reg.regionName}
                      </span>
                      <span className="font-body-sm text-[11px] text-text-muted-light">
                        {reg.activeOutlets} Outlet Aktif • Target: {reg.targetText}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-label-md text-xs text-on-surface font-bold">{reg.realizationText}</span>
                      <span
                        className={`inline-block ml-1.5 px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold ${
                          reg.status === 'safe'
                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-status-safe'
                            : 'bg-amber-50 dark:bg-amber-950/60 text-status-warning'
                        }`}
                      >
                        {reg.pctAchievement.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        reg.status === 'safe' ? 'bg-primary' : 'bg-status-warning'
                      }`}
                      style={{ width: `${reg.barPct}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 mt-4 border-t border-border-light flex items-center justify-between text-xs">
            <span className="font-body-sm text-text-muted-light">
              Cakupan: 5 Hub Logistik • Total Outlet Terlayani:{' '}
              <strong className="text-on-surface font-semibold">1,248 Toko</strong>
            </span>
            <button
              onClick={() => onShowToast('Membuka perincian kuota regional Jawa Timur & Bali')}
              className="text-primary hover:text-on-surface transition-colors p-1"
              title="Buka Detail Wilayah"
              type="button"
            >
              <span className="material-symbols-outlined text-lg">map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Compliance / Insight Recommendation Banner */}
      <div className="bg-surface-container-low rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xs border border-border-light">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container-lowest text-primary flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <span className="material-symbols-outlined text-xl">lightbulb</span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-md text-xs text-on-surface font-bold">
              Rekomendasi Alokasi Stok FEFO (First-Expired, First-Out)
            </span>
            <p className="font-body-sm text-xs text-text-muted-light">
              Permintaan antibiotik &amp; antipiretik di area Surabaya &amp; Sidoarjo diproyeksikan naik 14% menjelang musim pancaroba. Penambahan kuota batch gudang Rungkut disarankan sebelum akhir pekan.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={() => onShowToast('Rekomendasi diarsipkan')}
            className="h-9 px-3.5 bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-md text-xs font-semibold rounded-lg transition-colors shadow-xs border border-border-light cursor-pointer"
            type="button"
          >
            Abaikan
          </button>
          <button
            onClick={() => {
              onOpenFefoConfig();
              onShowToast('Membuka alokasi kuota FEFO gudang');
            }}
            className="h-9 px-3.5 bg-primary-container text-on-primary hover:bg-primary font-label-md text-xs font-semibold rounded-lg flex items-center gap-1 transition-opacity shadow-xs cursor-pointer"
            type="button"
          >
            <span>Atur Alokasi Gudang</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
