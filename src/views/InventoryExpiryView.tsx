/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InventoryItem } from '../data/mockData';
import { ScreenId } from '../components/Sidebar';

interface InventoryExpiryViewProps {
  inventory: InventoryItem[];
  onNavigate: (screen: ScreenId) => void;
  onOpenRestock: (name: string, batch: string, threshold: string) => void;
  onOpenAddBatch: () => void;
  onOpenFefoConfig: () => void;
  onShowToast: (msg: string) => void;
}

export const InventoryExpiryView: React.FC<InventoryExpiryViewProps> = ({
  inventory,
  onNavigate,
  onOpenRestock,
  onOpenAddBatch,
  onOpenFefoConfig,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedRack, setSelectedRack] = useState('ALL');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter logic
  const filteredInventory = inventory.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    const matchQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.batchNumber.toLowerCase().includes(query);

    const matchCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchStatus = selectedStatus === 'ALL' || item.statusLevel === selectedStatus;
    const matchRack = selectedRack === 'ALL' || item.rackZone === selectedRack;

    return matchQuery && matchCategory && matchStatus && matchRack;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedRack('ALL');
    onShowToast('Filter inventaris telah diatur ulang');
  };

  const getProductIcon = (cat: string) => {
    switch (cat) {
      case 'KERAS':
        return 'vaccines';
      case 'FMCG':
        return 'sanitizer';
      case 'SUPLEMEN':
        return 'vital_signs';
      default:
        return 'medication';
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
      {/* Top Breadcrumb & Page Actions Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col">
          <nav className="flex items-center gap-1.5 text-text-muted-light font-label-sm text-xs mb-1">
            <button
              onClick={() => onNavigate('dashboard')}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              Dashboard
            </button>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-primary font-semibold">Kelola Stok &amp; Kadaluarsa</span>
          </nav>
          <h1 className="font-headline-lg text-2xl text-on-surface font-bold tracking-tight">
            Manajemen Stok &amp; Kontrol Kadaluarsa
          </h1>
          <p className="font-body-md text-sm text-text-muted-light mt-0.5">
            Pantau ketersediaan SKU, pelacakan nomor batch, dan mitigasi kadaluarsa produk farmasi &amp; FMCG gudang Surabaya Rungkut.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start md:self-auto shrink-0 flex-wrap">
          <button
            onClick={() => onShowToast('Mengunduh Laporan Stok Gudang (Excel/CSV)...')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-xs font-semibold shadow-xs hover:bg-surface-container-high transition-colors border border-border-light cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base text-text-muted-light">download</span>
            <span>Ekspor Laporan (CSV/Excel)</span>
          </button>
          <button
            onClick={onOpenAddBatch}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold shadow-xs hover:bg-primary transition-all cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>+ Tambah Batch Masuk</span>
          </button>
        </div>
      </div>

      {/* 3 Metrics KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="relative overflow-hidden bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-border-light flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Total SKU Tersedia
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold">4,820</span>
                <span className="font-headline-sm text-sm text-text-muted-light font-normal">SKU</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-surface-container-low text-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">inventory_2</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-surface-container-low/50 px-2.5 py-1.5 rounded-lg border border-border-light/40">
            <span className="font-body-sm text-xs text-text-muted-light">
              284 Kategori • 98.2% Siap Kirim
            </span>
            <span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-status-safe/10 text-status-safe font-semibold flex items-center gap-0.5">
              <span className="material-symbols-outlined text-xs">trending_up</span> +120 SKU Baru
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="relative overflow-hidden bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-border-light flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Mendekati Kadaluarsa (30–90 Hari)
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-on-surface font-bold">34</span>
                <span className="font-headline-sm text-sm text-text-muted-light font-normal">Batch</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-status-warning/10 text-status-warning flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">hourglass_top</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-status-warning/5 px-2.5 py-1.5 rounded-lg border border-status-warning/20">
            <span className="font-body-sm text-xs text-text-muted-light truncate">
              Prioritas distribusi (FEFO Aktif)
            </span>
            <span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-status-warning/20 text-status-warning font-semibold flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-status-warning animate-pulse"></span>
              Waspada
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="relative overflow-hidden bg-surface-container-lowest p-5 rounded-xl shadow-xs border border-border-light flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div className="flex flex-col">
              <span className="font-label-md text-xs text-text-muted-light uppercase tracking-wider font-semibold">
                Stok Kritis / Habis
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-metric-num text-3xl text-error font-bold">8</span>
                <span className="font-headline-sm text-sm text-error font-medium">SKU Habis</span>
              </div>
            </div>
            <div className="w-11 h-11 rounded-lg bg-error-container text-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">fmd_bad</span>
            </div>
          </div>
          <div className="mt-4 pt-3 flex items-center justify-between bg-error-container/40 px-2.5 py-1.5 rounded-lg border border-error/20">
            <span className="font-body-sm text-xs text-error font-medium truncate">
              14 SKU di bawah threshold
            </span>
            <span className="px-2 py-0.5 rounded-full font-label-sm text-[11px] bg-error text-on-error font-bold flex items-center gap-1 shrink-0">
              <span className="material-symbols-outlined text-xs">priority_high</span>
              Tindakan Mendesak
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Real-Time Query Section */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-xs border border-border-light flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search bar with clear interaction */}
          <div className="relative flex-1 min-w-[240px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light text-base pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-9 pr-8 rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light/60 transition-all"
              placeholder="Cari nama obat, FMCG, nomor batch, atau SKU..."
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Filter Kategori */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light/60 appearance-none cursor-pointer"
            >
              <option value="ALL">Semua Kategori</option>
              <option value="KERAS">Obat Resep / Keras</option>
              <option value="BEBAS">Obat Bebas (OTC)</option>
              <option value="SUPLEMEN">Suplemen &amp; Vitamin</option>
              <option value="FMCG">Produk FMCG &amp; Retail</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light pointer-events-none text-base">
              arrow_drop_down
            </span>
          </div>

          {/* Filter Status Kadaluarsa */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light/60 appearance-none cursor-pointer"
            >
              <option value="ALL">Semua Status Kadaluarsa</option>
              <option value="SAFE">Aman (&gt;6 Bulan)</option>
              <option value="WARNING">Waspada (&lt;3 Bulan)</option>
              <option value="CRITICAL">Kritis (&lt;1 Bulan / Habis)</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light pointer-events-none text-base">
              arrow_drop_down
            </span>
          </div>

          {/* Filter Lokasi / Rak */}
          <div className="relative">
            <select
              value={selectedRack}
              onChange={(e) => setSelectedRack(e.target.value)}
              className="h-10 pl-3 pr-8 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light/60 appearance-none cursor-pointer"
            >
              <option value="ALL">Semua Rak (Gudang Rungkut)</option>
              <option value="RAK_A">Zona A: Cold Storage (2-8°C)</option>
              <option value="RAK_B">Zona B: Obat Keras &amp; Narkotika</option>
              <option value="RAK_C">Zona C: Pallet OTC Mass</option>
              <option value="RAK_D">Zona D: FMCG &amp; Personal Care</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-text-muted-light pointer-events-none text-base">
              arrow_drop_down
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <span className="font-label-sm text-xs text-text-muted-light bg-surface-container-high px-2.5 py-1 rounded-md font-medium">
            Total {filteredInventory.length} Batch Ditampilkan
          </span>
          <button
            onClick={resetFilters}
            className="font-label-sm text-xs text-primary hover:underline flex items-center gap-0.5 font-semibold cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-sm">refresh</span> Reset Filter
          </button>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-xs border border-border-light overflow-hidden flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[1040px]">
            <thead>
              <tr className="bg-surface-container-low text-text-muted-light font-label-sm text-xs uppercase tracking-wider select-none">
                <th className="py-3 px-4 font-semibold" scope="col">Produk &amp; SKU</th>
                <th className="py-3 px-4 font-semibold" scope="col">Kategori</th>
                <th className="py-3 px-4 font-semibold" scope="col">Nomor Batch</th>
                <th className="py-3 px-4 font-semibold min-w-[170px]" scope="col">Tingkat Stok</th>
                <th className="py-3 px-4 font-semibold text-center" scope="col">Min. Restock</th>
                <th className="py-3 px-4 font-semibold" scope="col">Tgl Kadaluarsa</th>
                <th className="py-3 px-4 font-semibold" scope="col">Status</th>
                <th className="py-3 px-4 font-semibold text-right" scope="col">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-on-surface font-body-sm text-xs">
              {filteredInventory.map((item) => {
                const isCritical = item.statusLevel === 'CRITICAL';
                const isWarning = item.statusLevel === 'WARNING';
                const isSafe = item.statusLevel === 'SAFE';

                return (
                  <tr key={item.id} className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary shrink-0">
                          <span className="material-symbols-outlined text-xl">
                            {getProductIcon(item.category)}
                          </span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-headline-sm text-xs text-on-surface font-semibold truncate">
                            {item.name}
                          </span>
                          <span className="font-label-sm text-[11px] text-text-muted-light">
                            SKU: {item.sku} • {item.packageDesc}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-surface-container-high text-tertiary font-medium">
                        {item.categoryLabel}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-container text-on-surface">
                        {item.batchNumber}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`font-bold ${
                              isCritical ? 'text-error' : isWarning ? 'text-status-warning' : 'text-status-safe'
                            }`}
                          >
                            {item.stockQty} {item.unit}
                          </span>
                          <span className="text-text-muted-light text-[11px]">
                            {item.stockPercentage}% dari target
                          </span>
                        </div>
                        <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-1.5 rounded-full ${
                              isCritical
                                ? 'bg-error'
                                : isWarning
                                ? 'bg-status-warning'
                                : 'bg-status-safe'
                            }`}
                            style={{ width: `${Math.min(100, item.stockPercentage)}%` }}
                          ></div>
                        </div>
                        <span
                          className={`text-[10px] font-medium ${
                            isCritical ? 'text-error' : 'text-text-muted-light'
                          }`}
                        >
                          {item.stockStatusNote}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="font-label-md text-xs text-text-muted-light font-medium">
                        {item.minRestock}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{item.expiryDate}</span>
                        <span
                          className={`font-label-sm text-[11px] font-semibold ${
                            isCritical
                              ? 'text-error font-bold'
                              : isWarning
                              ? 'text-status-warning'
                              : 'text-status-safe'
                          }`}
                        >
                          {item.relativeExpiryText}
                        </span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      {isCritical && (
                        <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-error-container text-error font-bold flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                          {item.statusLabel}
                        </span>
                      )}
                      {isWarning && (
                        <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-status-warning/15 text-status-warning font-semibold flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-warning"></span>
                          {item.statusLabel}
                        </span>
                      )}
                      {isSafe && (
                        <span className="px-2.5 py-1 rounded-full font-label-sm text-[11px] bg-status-safe/10 text-status-safe font-semibold flex items-center gap-1 w-fit">
                          <span className="w-1.5 h-1.5 rounded-full bg-status-safe"></span>
                          {item.statusLabel}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onOpenRestock(item.name, item.batchNumber, item.minRestock)}
                          className={`px-2.5 py-1.5 rounded-lg font-label-sm text-xs font-semibold transition-all flex items-center gap-1 shadow-xs cursor-pointer ${
                            isCritical
                              ? 'bg-primary-container text-on-primary hover:bg-primary'
                              : 'bg-surface-container-lowest text-primary hover:bg-surface-container-high border border-border-light'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">autorenew</span>
                          <span>Restock</span>
                        </button>
                        <button
                          onClick={() => onShowToast(`Detail Batch ${item.batchNumber}: ${item.principal} (${item.rackLabel})`)}
                          className="p-1 rounded-lg text-text-muted-light hover:bg-surface-container hover:text-on-surface"
                          title="Detail Batch"
                        >
                          <span className="material-symbols-outlined text-base">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer & Pagination Controls */}
        <div className="p-4 bg-surface-container-lowest flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border-light">
          <div className="flex items-center gap-2 text-text-muted-light font-body-sm text-xs">
            <span>
              Menampilkan <span className="font-semibold text-on-surface">1 - {filteredInventory.length}</span>{' '}
              dari <span className="font-semibold text-on-surface">34 batch berisiko</span> dan{' '}
              <span className="font-semibold text-on-surface">4,820 SKU</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-xs text-text-muted-light">Baris per halaman:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
                className="h-8 px-2 rounded bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className="p-1.5 rounded-lg text-text-muted-light hover:bg-surface-container disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-base">chevron_left</span>
              </button>
              <button className="w-8 h-8 rounded-lg bg-primary text-on-primary font-label-sm text-xs font-bold flex items-center justify-center">
                1
              </button>
              <button
                onClick={() => onShowToast('Halaman 2 inventaris')}
                className="w-8 h-8 rounded-lg text-text-muted-light hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
              >
                2
              </button>
              <button
                onClick={() => onShowToast('Halaman 3 inventaris')}
                className="w-8 h-8 rounded-lg text-text-muted-light hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
              >
                3
              </button>
              <span className="px-1 text-text-muted-light text-xs">...</span>
              <button
                onClick={() => onShowToast('Halaman 48 inventaris')}
                className="w-8 h-8 rounded-lg text-text-muted-light hover:bg-surface-container font-label-sm text-xs flex items-center justify-center"
              >
                48
              </button>
              <button
                onClick={() => onShowToast('Halaman selanjutnya')}
                className="p-1.5 rounded-lg text-text-muted-light hover:bg-surface-container"
              >
                <span className="material-symbols-outlined text-base">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FEFO Compliance & Warehouse Operational Banner */}
      <div className="bg-surface-container p-4 rounded-xl shadow-xs border border-border-light flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">verified</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-sm text-primary font-bold">
                Protokol FEFO Aktif (First Expired First Out)
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-primary-container text-on-primary">
                ISO 9001:2015
              </span>
            </div>
            <p className="font-body-sm text-xs text-text-muted-light mt-0.5">
              Sistem secara otomatis mengarahkan picking list ke batch dengan kadaluarsa terdekat guna mencegah retur kadaluarsa dari jaringan apotek dan minimarket mitra.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenFefoConfig}
            className="px-3.5 py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors flex items-center gap-1.5 shadow-xs border border-border-light cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Konfigurasi Threshold FEFO</span>
          </button>
        </div>
      </div>
    </div>
  );
};
