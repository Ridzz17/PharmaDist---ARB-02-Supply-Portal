/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SalesVisit, Partner } from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface SalesActivityViewProps {
  visits: SalesVisit[];
  partners: Partner[];
  onNavigate: (screen: ScreenId) => void;
  onOpenNewVisit: () => void;
  onOpenDOModal: (visit: SalesVisit) => void;
  onOpenArmadaMap: () => void;
  onShowToast: (msg: string) => void;
}

export const SalesActivityView: React.FC<SalesActivityViewProps> = ({
  visits,
  partners,
  onNavigate,
  onOpenNewVisit,
  onOpenDOModal,
  onOpenArmadaMap,
  onShowToast,
}) => {
  const [visitTab, setVisitTab] = useState<'all' | 'selesai' | 'on-route'>('all');
  const [visitSearch, setVisitSearch] = useState('');
  const [dirSearch, setDirSearch] = useState('');
  const [dirSegment, setDirSegment] = useState<'all' | 'apotek' | 'minimarket'>('all');

  const filteredVisits = visits.filter((v) => {
    const matchTab =
      visitTab === 'all' ||
      (visitTab === 'selesai' && v.visitStatus === 'Terkirim') ||
      (visitTab === 'on-route' && (v.visitStatus === 'On-Route' || v.visitStatus === 'Diproses'));

    const q = visitSearch.toLowerCase();
    const matchSearch =
      !q ||
      v.partnerName.toLowerCase().includes(q) ||
      v.salesRep.toLowerCase().includes(q);

    return matchTab && matchSearch;
  });

  const filteredPartners = partners.filter((p) => {
    const matchSegment =
      dirSegment === 'all' ||
      (dirSegment === 'apotek' && p.categoryKey === 'apotek') ||
      (dirSegment === 'minimarket' && p.categoryKey === 'minimarket');

    const q = dirSearch.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.contactPerson.toLowerCase().includes(q) ||
      p.address.toLowerCase().includes(q);

    return matchSegment && matchSearch;
  });

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Top Breadcrumb & Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-text-muted-light font-label-sm text-xs tracking-wide uppercase">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-semibold">Aktivitas Sales &amp; Mitra</span>
          </div>
          <h1 className="font-headline-lg text-2xl text-on-surface font-bold tracking-tight">
            Aktivitas Sales Rep &amp; Direktori Mitra
          </h1>
          <p className="font-body-md text-sm text-text-muted-light max-w-3xl">
            Pantau kunjungan sales lapangan secara real-time, jadwal follow-up apotek &amp; minimarket, serta riwayat volume transaksi mitra B2B.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => onShowToast('Mengunduh Log Kunjungan Sales Harian (CSV)...')}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-xs font-semibold shadow-xs hover:bg-surface-container-high border border-border-light transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">download</span>
            <span>Ekspor Log Aktivitas (CSV)</span>
          </button>
          <button
            onClick={onOpenNewVisit}
            className="flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold shadow-xs hover:bg-primary transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add_location_alt</span>
            <span>+ Jadwalkan Kunjungan Baru</span>
          </button>
        </div>
      </div>

      {/* Top Summary Row (3 Metric Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric Card 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Total Mitra Terdaftar
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  1,248
                </span>
                <span className="font-body-sm text-xs text-text-muted-light">Mitra Apotek &amp; Mart</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-2xl">domain</span>
            </div>
          </div>
          <div className="mt-4 pt-2.5 flex flex-wrap items-center justify-between gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-border-light/50">
            <span className="font-body-sm text-xs text-tertiary">842 Apotek Resmi • 406 Minimarket</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-status-safe bg-surface-container-lowest px-2 py-0.5 rounded-full font-bold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span>
              +3 Baru Minggu Ini
            </span>
          </div>
        </div>

        {/* Metric Card 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Jadwal Kunjungan Hari Ini
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  56
                </span>
                <span className="font-body-sm text-xs text-text-muted-light">Rencana Kunjungan</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-status-warning shrink-0">
              <span className="material-symbols-outlined text-2xl">route</span>
            </div>
          </div>
          <div className="mt-4 pt-2.5 flex flex-wrap items-center justify-between gap-2 bg-surface-container-low px-3 py-1.5 rounded-lg border border-border-light/50">
            <div className="flex items-center gap-1.5 font-body-sm text-xs text-tertiary">
              <span className="w-2 h-2 rounded-full bg-status-warning animate-ping"></span>
              <span>14 Sedang berlangsung (On route)</span>
            </div>
            <span className="font-label-sm text-[11px] text-primary font-semibold bg-surface-container-lowest px-2 py-0.5 rounded-full shadow-xs">
              Target 95%
            </span>
          </div>
        </div>

        {/* Metric Card 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 flex flex-col justify-between shadow-xs border border-border-light relative overflow-hidden group">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Kunjungan Selesai Hari Ini
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  42
                </span>
                <span className="font-body-sm text-xs text-text-muted-light">/ 56 Selesai</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-status-safe shrink-0">
              <span className="material-symbols-outlined text-2xl">check_circle</span>
            </div>
          </div>
          <div className="mt-4 pt-2.5 flex flex-col gap-1.5">
            <div className="flex items-center justify-between font-body-sm text-xs">
              <span className="text-tertiary">Tingkat Penyelesaian 75%</span>
              <span className="font-label-sm text-xs text-text-muted-light font-medium">35 min / outlet</span>
            </div>
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
              <div className="bg-status-safe h-2 rounded-full transition-all duration-700" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Split Grid (~58% Left, ~42% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT PANEL: Sales Visit Activity Tracker (7 Cols ~58%) */}
        <div className="lg:col-span-7 flex flex-col bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 gap-2 border-b border-border-light">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">satellite_alt</span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Pelacak Kunjungan Sales Lapangan
                </h2>
              </div>
              <p className="font-body-sm text-xs text-text-muted-light mt-0.5">
                Sinkronisasi live GPS &amp; check-in sales representative di apotek dan minimarket.
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary font-label-sm text-xs font-semibold self-start sm:self-auto">
              <span className="w-2 h-2 rounded-full bg-status-safe animate-pulse"></span>
              Sync Live
            </span>
          </div>

          {/* Filter Tabs & Quick Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3 py-1">
            <div className="flex items-center bg-surface-container-low p-1 rounded-lg border border-border-light/60 text-xs">
              <button
                onClick={() => setVisitTab('all')}
                className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                  visitTab === 'all'
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
              >
                Semua ({visits.length})
              </button>
              <button
                onClick={() => setVisitTab('selesai')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  visitTab === 'selesai'
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
              >
                Selesai (42)
              </button>
              <button
                onClick={() => setVisitTab('on-route')}
                className={`px-3 py-1.5 rounded-md transition-all ${
                  visitTab === 'on-route'
                    ? 'bg-surface-container-lowest text-primary shadow-xs font-semibold'
                    : 'text-text-muted-light hover:text-on-surface'
                }`}
              >
                On-Route (14)
              </button>
            </div>

            <div className="relative flex items-center min-w-[200px]">
              <span className="material-symbols-outlined absolute left-2.5 text-text-muted-light text-base pointer-events-none">
                search
              </span>
              <input
                value={visitSearch}
                onChange={(e) => setVisitSearch(e.target.value)}
                className="w-full h-9 pl-8 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light font-body-sm text-xs outline-none focus:ring-1 focus:ring-primary border border-border-light/60 transition-all"
                placeholder="Filter outlet atau nama sales..."
                type="text"
              />
            </div>
          </div>

          {/* Visit Cards List */}
          <div className="flex flex-col gap-3 mt-3">
            {filteredVisits.map((visit) => {
              const isDelivered = visit.visitStatus === 'Terkirim';
              const isProcessing = visit.visitStatus === 'Diproses';
              const isOnRoute = visit.visitStatus === 'On-Route';

              return (
                <div
                  key={visit.id}
                  className="p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high/60 transition-all flex flex-col gap-2.5 border border-border-light/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0 font-bold text-xs">
                        {visit.partnerInitial}
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-sm text-on-surface font-semibold">
                          {visit.partnerName}
                        </h3>
                        <div className="flex items-center gap-2 text-text-muted-light font-body-sm text-xs">
                          <span className="font-semibold text-primary">{visit.salesRep}</span>
                          <span>•</span>
                          <span>{visit.salesArea}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
                      <span className="inline-flex items-center gap-1 font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-bold">
                        <span className="material-symbols-outlined text-xs">inventory_2</span>
                        {visit.typeTag}
                      </span>
                      {isDelivered && (
                        <span className="inline-flex items-center gap-1 font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-surface-container-lowest text-status-safe font-bold shadow-xs">
                          <span className="material-symbols-outlined text-xs">check_circle</span>
                          Selesai • {visit.checkInTime}
                        </span>
                      )}
                      {isOnRoute && (
                        <span className="inline-flex items-center gap-1 font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-surface-container text-tertiary-container font-bold">
                          <span className="material-symbols-outlined text-xs">near_me</span>
                          {visit.statusBadge}
                        </span>
                      )}
                      {isProcessing && (
                        <span className="inline-flex items-center gap-1 font-label-sm text-[11px] px-2.5 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-primary font-bold">
                          <span className="material-symbols-outlined text-xs">schedule</span>
                          Diproses
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Detail Strip */}
                  <div className="bg-surface-container-lowest p-2.5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs border border-border-light/40">
                    <div className="flex items-center gap-2 text-tertiary">
                      <span className="material-symbols-outlined text-base text-primary">receipt_long</span>
                      <span>
                        Pemesanan • <strong className="text-on-surface font-semibold">{visit.orderValue}</strong>{' '}
                        ({visit.itemsSummary})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-text-muted-light text-[11px]">Check-in {visit.checkInTime}</span>
                      <button
                        onClick={() => onOpenDOModal(visit)}
                        className="px-2.5 py-1 rounded bg-surface-container hover:bg-surface-container-high text-primary font-semibold text-[11px] transition-colors cursor-pointer"
                      >
                        Detail DO
                      </button>
                    </div>
                  </div>

                  <p className="font-body-sm text-xs text-text-muted-light italic pl-1">
                    “{visit.remarks}”
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 flex items-center justify-between text-text-muted-light font-body-sm text-xs border-t border-border-light">
            <span>Menampilkan {filteredVisits.length} dari 56 kunjungan terencana</span>
            <button
              onClick={() => onShowToast('Membuka timeline lengkap 56 kunjungan')}
              className="font-label-md text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span>Lihat Timeline Lengkap</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Customer Quick Directory (5 Cols ~42%) */}
        <div className="lg:col-span-5 flex flex-col bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-border-light">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-xl">contact_page</span>
                <h2 className="font-headline-sm text-base text-on-surface font-bold">
                  Direktori Mitra &amp; Profil
                </h2>
              </div>
              <p className="font-body-sm text-xs text-text-muted-light mt-0.5">
                Ringkasan kontak apotek/mart &amp; riwayat volume bulanan.
              </p>
            </div>
            <span className="font-label-sm text-xs text-primary font-bold bg-surface-container px-2.5 py-1 rounded-full">
              1,248 Toko
            </span>
          </div>

          {/* Search Input Inside Directory */}
          <div className="mt-3 relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-text-muted-light text-base pointer-events-none">
              manage_search
            </span>
            <input
              value={dirSearch}
              onChange={(e) => setDirSearch(e.target.value)}
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light font-body-sm text-xs outline-none focus:ring-1 focus:ring-primary border border-border-light/60 transition-all"
              placeholder="Cari nama apotek, kontak, alamat..."
              type="text"
            />
          </div>

          {/* Segment Filter Pills */}
          <div className="flex items-center gap-1.5 mt-3 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setDirSegment('all')}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-colors ${
                dirSegment === 'all'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Semua ({partners.length})
            </button>
            <button
              onClick={() => setDirSegment('apotek')}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-colors ${
                dirSegment === 'apotek'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Apotek Resmi (842)
            </button>
            <button
              onClick={() => setDirSegment('minimarket')}
              className={`px-3 py-1 rounded-full font-semibold whitespace-nowrap transition-colors ${
                dirSegment === 'minimarket'
                  ? 'bg-primary-container text-on-primary shadow-xs'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
              }`}
            >
              Minimarket (406)
            </button>
          </div>

          {/* Directory Items */}
          <div className="flex flex-col gap-2.5 mt-3">
            {filteredPartners.slice(0, 5).map((partner) => (
              <div
                key={partner.id}
                className="p-3.5 rounded-xl bg-surface-container-low hover:bg-surface-container-high/60 transition-all flex flex-col gap-1.5 border border-border-light/50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <h4 className="font-label-md text-xs text-on-surface font-bold">
                        {partner.name}
                      </h4>
                      <span className="font-label-sm text-[10px] px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-bold">
                        {partner.type}
                      </span>
                    </div>
                    <span className="font-body-sm text-[11px] text-text-muted-light mt-0.5">
                      {partner.address}, {partner.city}
                    </span>
                  </div>
                  <span className="font-label-sm text-[10px] font-bold text-primary bg-surface-container-lowest px-2 py-0.5 rounded shadow-xs border border-border-light/40">
                    {partner.tier}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div className="flex items-center gap-1.5 text-tertiary">
                    <span className="material-symbols-outlined text-base text-text-muted-light">
                      {partner.type.includes('Apotek') ? 'person' : 'store'}
                    </span>
                    <span className="text-[11px]">{partner.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-1 text-text-muted-light font-label-sm text-[11px]">
                    <span className="material-symbols-outlined text-xs">call</span>
                    <span>{partner.phone}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-surface-container-lowest px-3 py-1.5 rounded-lg text-xs mt-1 border border-border-light/40">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[10px] text-text-muted-light">Volume Bulanan</span>
                    <span className="font-headline-sm text-xs text-on-surface font-bold">
                      {partner.monthlyVolume}{' '}
                      <span className="text-[10px] font-normal text-text-muted-light">/bln</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onShowToast(`Membuka WhatsApp untuk ${partner.contactPerson} (${partner.phone})`)}
                      className="p-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container transition-colors"
                      title="Hubungi WhatsApp"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-base">chat</span>
                    </button>
                    <button
                      onClick={() => onShowToast(`PO Cepat dibuat untuk ${partner.name}`)}
                      className="px-2.5 py-1 rounded-lg bg-primary text-on-primary font-label-sm text-[11px] font-semibold hover:bg-primary-container transition-colors cursor-pointer"
                      title="Buat PO Cepat"
                      type="button"
                    >
                      PO Cepat
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Directory Footer Link */}
          <div className="mt-3 pt-3 flex items-center justify-between text-text-muted-light font-body-sm text-xs border-t border-border-light">
            <span>Menampilkan 5 dari 1,248 mitra terdaftar</span>
            <button
              onClick={() => onNavigate('customers')}
              className="font-label-md text-xs text-primary font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              type="button"
            >
              <span>Buka Direktori Lengkap</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live GPS Route & Field Team Quick Telemetry Banner */}
      <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-2xl">location_city</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h3 className="font-headline-sm text-base text-on-surface font-semibold">
                Integrasi GPS Field Sales Surabaya &amp; Sidoarjo
              </h3>
              <span className="font-label-sm text-xs px-2 py-0.5 rounded-full bg-status-safe/10 text-status-safe font-bold">
                3 Tim Online
              </span>
            </div>
            <p className="font-body-sm text-xs text-text-muted-light mt-0.5">
              Semua check-in dan tanda tangan digital bukti penagihan disinkronisasikan langsung ke server ARB-02 Gudang Pusat.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0 w-full md:w-auto justify-end">
          <div className="text-right hidden sm:flex flex-col">
            <span className="font-label-sm text-xs text-text-muted-light">Akurasi Geotagging</span>
            <span className="font-label-md text-xs text-primary font-semibold">
              ± 4.2 Meter (High Precision)
            </span>
          </div>
          <button
            onClick={onOpenArmadaMap}
            className="px-4 py-2.5 rounded-lg bg-surface-container text-primary font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5 cursor-pointer border border-border-light"
            type="button"
          >
            <span className="material-symbols-outlined text-base">map</span>
            <span>Buka Peta Satelit Armada</span>
          </button>
        </div>
      </div>
    </div>
  );
};
