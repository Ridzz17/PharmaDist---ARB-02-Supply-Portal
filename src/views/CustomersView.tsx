/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Partner } from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface CustomersViewProps {
  partners: Partner[];
  onNavigate: (screen: ScreenId) => void;
  onOpenAddPartner: () => void;
  onShowToast: (msg: string) => void;
}

export const CustomersView: React.FC<CustomersViewProps> = ({
  partners,
  onNavigate,
  onOpenAddPartner,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [quickFilter, setQuickFilter] = useState<'none' | 'apotek' | 'minimarket' | 'platinum' | 'net30'>('none');
  const [currentPage, setCurrentPage] = useState(1);
  const [isSyncing, setIsSyncing] = useState(false);

  // Filtering
  const filteredPartners = partners.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.license.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      p.contactPerson.toLowerCase().includes(q);

    const matchType =
      selectedType === 'all' ||
      (selectedType === 'apotek' && p.categoryKey === 'apotek') ||
      (selectedType === 'minimarket' && p.categoryKey === 'minimarket') ||
      (selectedType === 'toko-obat' && p.categoryKey === 'toko-obat');

    const matchStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'aktif' && p.statusKey === 'aktif') ||
      (selectedStatus === 'pending' && p.statusKey === 'pending') ||
      (selectedStatus === 'restricted' && p.statusKey === 'restricted');

    const matchRegion = selectedRegion === 'all' || p.regionKey === selectedRegion;

    const matchQuick =
      quickFilter === 'none' ||
      (quickFilter === 'apotek' && p.categoryKey === 'apotek') ||
      (quickFilter === 'minimarket' && p.categoryKey === 'minimarket') ||
      (quickFilter === 'platinum' && p.tier.toLowerCase().includes('platinum')) ||
      (quickFilter === 'net30' && p.creditTerms.includes('30'));

    return matchSearch && matchType && matchStatus && matchRegion && matchQuick;
  });

  const handleSatuSehatSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      onShowToast('Sinkronisasi izin BPOM & SIA/SIPA SatuSehat Kemenkes berhasil diperbarui (842 Apotek Valid)');
    }, 1200);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-1.5 text-text-muted-light font-label-sm text-xs uppercase tracking-wider mb-0.5">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-bold">Pelanggan &amp; Mitra</span>
          </nav>
          <h1 className="font-headline-lg text-2xl text-on-surface font-bold tracking-tight">
            Direktori Pelanggan &amp; Mitra Apotek
          </h1>
          <p className="font-body-md text-sm text-text-muted-light max-w-3xl">
            Kelola data master apotek resmi, jaringan minimarket ritel, limit kredit (PKS), dan status operasional outlet B2B secara terintegrasi.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <button
            onClick={() => onShowToast('Mengekspor direktori mitra (CSV/Excel)...')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-xs font-semibold shadow-xs hover:bg-surface-container-high hover:text-primary transition-all border border-border-light cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base text-tertiary">file_download</span>
            <span>Ekspor Data (CSV/Excel)</span>
          </button>
          <button
            onClick={onOpenAddPartner}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold shadow-xs hover:bg-primary transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Tambah Mitra Baru</span>
          </button>
        </div>
      </div>

      {/* Metrics Summary Row (3 Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium uppercase tracking-wide">
                Total Mitra Terdaftar
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  1,248
                </span>
                <span className="font-headline-sm text-sm text-text-muted-light font-normal">Outlet</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-high flex items-center justify-center text-primary shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">domain</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border-light/60 text-body-sm text-xs text-text-muted-light">
            <span className="truncate">842 Apotek Resmi • 406 Minimarket</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-status-safe bg-surface-container-low px-2 py-0.5 rounded-full font-bold shrink-0">
              <span className="material-symbols-outlined text-xs">trending_up</span> +18 Bulan Ini
            </span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium uppercase tracking-wide">
                Apotek Resmi Aktif
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  842
                </span>
                <span className="font-headline-sm text-sm text-text-muted-light font-normal">Apotek</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-primary-container shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">medical_services</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border-light/60 text-body-sm text-xs text-text-muted-light">
            <span>98.4% Berizin SIA/SIPA Aktif</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-status-safe bg-surface-container px-2 py-0.5 rounded-full font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span> Tervalidasi BPOM
            </span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-surface-container-lowest rounded-xl p-5 shadow-xs border border-border-light flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light font-medium uppercase tracking-wide">
                Jaringan Minimarket FMCG
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold tracking-tight">
                  406
                </span>
                <span className="font-headline-sm text-sm text-text-muted-light font-normal">Toko</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-tertiary shrink-0 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-2xl">storefront</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-border-light/60 text-body-sm text-xs text-text-muted-light">
            <span>Mitra Konsinyasi &amp; Distribusi Cepat</span>
            <span className="inline-flex items-center gap-1 font-label-sm text-[11px] text-tertiary bg-surface-container-high px-2 py-0.5 rounded-full font-semibold shrink-0">
              <span className="material-symbols-outlined text-xs">verified</span> Kredit Lancar (99.1%)
            </span>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH PANEL */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-border-light flex flex-col gap-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-text-muted-light text-base pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light font-body-sm text-xs outline-none focus:ring-1 focus:ring-primary border border-border-light/60 transition-colors"
              placeholder="Cari nama apotek, minimarket, NIB/SIA, atau kota..."
              type="text"
            />
          </div>

          {/* Store Type Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light/60 outline-none cursor-pointer"
            >
              <option value="all">Semua Tipe Mitra</option>
              <option value="apotek">Apotek Resmi</option>
              <option value="minimarket">Minimarket</option>
              <option value="toko-obat">Toko Obat</option>
            </select>
          </div>

          {/* Account Status Filter */}
          <div className="md:col-span-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light/60 outline-none cursor-pointer"
            >
              <option value="all">Semua Status Akun</option>
              <option value="aktif">Aktif</option>
              <option value="pending">Menunggu Verifikasi</option>
              <option value="restricted">Pembatasan Kredit</option>
            </select>
          </div>

          {/* Region Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light/60 outline-none cursor-pointer"
            >
              <option value="all">Semua Wilayah (Jawa Timur &amp; Bali)</option>
              <option value="surabaya">Surabaya Raya</option>
              <option value="sidoarjo">Sidoarjo</option>
              <option value="malang">Malang Raya</option>
              <option value="gresik">Gresik &amp; Pantura</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Pills & Data Counter */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs border-t border-border-light/50">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-label-sm text-[11px] text-text-muted-light uppercase mr-1">
              Filter Cepat:
            </span>
            <button
              onClick={() => setQuickFilter(quickFilter === 'apotek' ? 'none' : 'apotek')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                quickFilter === 'apotek'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Apotek Resmi (842)
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'minimarket' ? 'none' : 'minimarket')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                quickFilter === 'minimarket'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Minimarket (406)
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'platinum' ? 'none' : 'platinum')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                quickFilter === 'platinum'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Top Volume (Platinum)
            </button>
            <button
              onClick={() => setQuickFilter(quickFilter === 'net30' ? 'none' : 'net30')}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors cursor-pointer ${
                quickFilter === 'net30'
                  ? 'bg-primary-container text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
              }`}
            >
              Termin Net 30+
            </button>
          </div>

          <div className="flex items-center gap-2 text-text-muted-light font-body-sm text-xs">
            <span>
              Menampilkan <strong className="text-on-surface font-semibold">{filteredPartners.length} mitra</strong>
            </span>
          </div>
        </div>
      </div>

      {/* MAIN DATA TABLE */}
      <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-border-light overflow-hidden flex flex-col">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-text-muted-light font-label-sm text-xs uppercase tracking-wider">
                <th className="py-3 px-5" scope="col">Nama Toko &amp; Identitas</th>
                <th className="py-3 px-4" scope="col">Tipe Mitra</th>
                <th className="py-3 px-4" scope="col">Kota / Lokasi</th>
                <th className="py-3 px-4" scope="col">Kontak Person &amp; Apoteker</th>
                <th className="py-3 px-4" scope="col">Ketentuan Kredit / Termin</th>
                <th className="py-3 px-4" scope="col">Status</th>
                <th className="py-3 px-5 text-right" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-xs font-body-sm text-on-surface">
              {filteredPartners.map((partner) => {
                const isApotek = partner.categoryKey === 'apotek';
                const isAktif = partner.statusKey === 'aktif';

                return (
                  <tr key={partner.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-5">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform ${
                            isApotek
                              ? 'bg-surface-container text-primary'
                              : 'bg-surface-container-high text-tertiary'
                          }`}
                        >
                          <span className="material-symbols-outlined text-xl">
                            {isApotek ? 'local_pharmacy' : 'shopping_bag'}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">
                              {partner.name}
                            </span>
                            <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[10px] font-bold bg-surface-container text-primary uppercase">
                              {partner.tier}
                            </span>
                          </div>
                          <span className="font-body-sm text-[11px] text-text-muted-light font-mono mt-0.5 truncate">
                            {partner.license} • ID: {partner.id}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-surface-container text-primary">
                        <span className="material-symbols-outlined text-xs">
                          {isApotek ? 'medication' : 'store'}
                        </span>
                        {partner.type}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs text-on-surface font-semibold">{partner.city}</span>
                        <span className="font-body-sm text-[11px] text-text-muted-light truncate max-w-[170px]">
                          {partner.address}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-label-md text-xs text-on-surface font-semibold">
                          {partner.contactPerson}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-body-sm text-[11px] text-text-muted-light">{partner.phone}</span>
                          <button
                            onClick={() => onShowToast(`Membuka WhatsApp untuk ${partner.contactPerson}`)}
                            className="text-status-safe hover:opacity-80 leading-none"
                            title="Kirim Pesan WhatsApp"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-sm">chat</span>
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 w-40">
                        <div className="flex items-center justify-between text-[11px] font-semibold">
                          <span className="text-on-surface">{partner.creditTerms}</span>
                          <span className="text-text-muted-light font-normal">
                            Rp {partner.creditLimitJt} Jt
                          </span>
                        </div>
                        <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              partner.creditUsedPct > 50 ? 'bg-status-warning' : 'bg-primary'
                            }`}
                            style={{ width: `${partner.creditUsedPct}%` }}
                          ></div>
                        </div>
                        <span className="font-body-sm text-[10px] text-text-muted-light">
                          Terpakai {partner.creditUsedPct}% (Rp {partner.creditUsedJt} Jt)
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-label-sm text-[11px] font-semibold ${
                          isAktif
                            ? 'text-status-safe bg-surface-container-low'
                            : 'text-status-warning bg-amber-50 dark:bg-amber-950/60'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isAktif ? 'bg-status-safe' : 'bg-status-warning'
                          }`}
                        ></span>
                        {partner.status}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() =>
                            onShowToast(
                              `Detail Mitra: ${partner.name} - Volume Bulanan ${partner.monthlyVolume}, Order Terakhir ${partner.lastOrderDate}`
                            )
                          }
                          className="inline-flex items-center gap-0.5 px-2.5 py-1.5 rounded-lg bg-surface-container-low text-primary hover:bg-surface-container font-label-sm text-xs font-semibold transition-colors cursor-pointer border border-border-light/60"
                          type="button"
                        >
                          <span>Detail</span>
                          <span className="material-symbols-outlined text-xs">chevron_right</span>
                        </button>
                        <button
                          onClick={() => onShowToast(`Menu aksi untuk ${partner.name}`)}
                          className="p-1 rounded-lg text-text-muted-light hover:bg-surface-container hover:text-on-surface transition-colors"
                          title="Aksi Lainnya"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-base leading-none">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* PAGINATION & ROW CONTROLS */}
        <div className="p-4 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-border-light text-xs text-text-muted-light">
          <div className="flex items-center gap-3">
            <span>
              Menampilkan <strong className="text-on-surface font-semibold">1 - {filteredPartners.length}</strong>{' '}
              dari <strong className="text-on-surface font-semibold">1,248</strong> mitra terdaftar
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg text-text-muted-light hover:bg-surface-container disabled:opacity-40"
              type="button"
            >
              <span className="material-symbols-outlined text-base">chevron_left</span>
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold flex items-center justify-center shadow-xs">
              1
            </button>
            <button
              onClick={() => onShowToast('Halaman 2 mitra')}
              className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
            >
              2
            </button>
            <button
              onClick={() => onShowToast('Halaman 3 mitra')}
              className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
            >
              3
            </button>
            <span className="px-1 text-text-muted-light">…</span>
            <button
              onClick={() => onShowToast('Halaman 178 mitra')}
              className="w-8 h-8 rounded-lg text-on-surface hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
            >
              178
            </button>
            <button
              onClick={() => onShowToast('Halaman selanjutnya')}
              className="p-1.5 rounded-lg text-text-muted-light hover:bg-surface-container"
              type="button"
            >
              <span className="material-symbols-outlined text-base">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM INTEGRATION & COMPLIANCE BANNER */}
      <div className="bg-surface-container-lowest rounded-xl p-4 shadow-xs border border-border-light flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-sm text-on-surface font-semibold">
                Sistem Verifikasi Otomatis Izin BPOM &amp; SIA/SIPA Aktif
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-surface-container-high text-tertiary">
                ISO 9001:2015
              </span>
            </div>
            <span className="font-body-sm text-xs text-text-muted-light">
              Sinkronisasi berkala dengan database Kemenkes SatuSehat &amp; Badan Pengawas Obat dan Makanan RI untuk menjamin legalitas CDOB distribusi.
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-end">
          <span className="font-label-sm text-[11px] text-text-muted-light hidden lg:inline-block">
            Update Terakhir: Hari ini, 08:30 WIB
          </span>
          <button
            onClick={handleSatuSehatSync}
            disabled={isSyncing}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface-container text-primary font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors cursor-pointer border border-border-light"
            type="button"
          >
            <span className={`material-symbols-outlined text-base leading-none ${isSyncing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>{isSyncing ? 'Sinkronisasi...' : 'Perbarui Sinkronisasi SatuSehat'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
