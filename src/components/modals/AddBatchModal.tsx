/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { InventoryItem } from '../../data/mockData';

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBatch: (newItem: InventoryItem) => void;
}

export const AddBatchModal: React.FC<AddBatchModalProps> = ({
  isOpen,
  onClose,
  onAddBatch,
}) => {
  const [productName, setProductName] = useState('');
  const [batchNumber, setBatchNumber] = useState('');
  const [category, setCategory] = useState<'BEBAS' | 'KERAS' | 'SUPLEMEN' | 'FMCG'>('BEBAS');
  const [rackZone, setRackZone] = useState('RAK_C');
  const [quantity, setQuantity] = useState(250);
  const [expiryDate, setExpiryDate] = useState('2027-12-31');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || !batchNumber) return;

    const categoryLabels: Record<string, string> = {
      BEBAS: 'Obat Bebas (OTC)',
      KERAS: 'Obat Keras (Resep)',
      SUPLEMEN: 'Suplemen & Vitamin',
      FMCG: 'FMCG & Retail',
    };

    const rackLabels: Record<string, string> = {
      RAK_A: 'Zona A: Cold Storage (2-8°C)',
      RAK_B: 'Zona B: Obat Keras & Narkotika',
      RAK_C: 'Zona C: Pallet OTC Massal',
      RAK_D: 'Zona D: FMCG & Personal Care',
    };

    const expYear = new Date(expiryDate).getFullYear();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const expMonth = months[new Date(expiryDate).getMonth()];
    const expDay = new Date(expiryDate).getDate();
    const formattedExp = `${expDay < 10 ? '0' + expDay : expDay} ${expMonth} ${expYear}`;

    const daysRemaining = Math.max(
      1,
      Math.round((new Date(expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    );

    let statusLevel: 'CRITICAL' | 'WARNING' | 'SAFE' = 'SAFE';
    let statusLabel = 'Aman (>6 bln)';
    if (daysRemaining < 30) {
      statusLevel = 'CRITICAL';
      statusLabel = 'Kritis (<1 bln)';
    } else if (daysRemaining < 90) {
      statusLevel = 'WARNING';
      statusLabel = 'Waspada (<3 bln)';
    }

    const newItem: InventoryItem = {
      id: `item-${Date.now()}`,
      name: productName,
      sku: `FAR-${batchNumber.replace(/[^a-zA-Z0-9]/g, '').slice(0, 6).toUpperCase()}`,
      packageDesc: 'Box 100 Unit Standar',
      category,
      categoryLabel: categoryLabels[category],
      batchNumber: batchNumber.startsWith('#') ? batchNumber : `#${batchNumber.toUpperCase()}`,
      stockQty: quantity,
      unit: 'Box',
      stockPercentage: Math.min(100, Math.round((quantity / 200) * 100)),
      stockStatusNote: 'Penerimaan baru terverifikasi',
      minRestock: '100 Box',
      minRestockNum: 100,
      expiryDate: formattedExp,
      daysRemaining,
      relativeExpiryText: `${daysRemaining} Hari Lagi`,
      statusLevel,
      statusLabel,
      rackZone,
      rackLabel: rackLabels[rackZone] || rackZone,
      principal: 'PT Kalbe Farma Tbk',
    };

    onAddBatch(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">post_add</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Penerimaan Batch Baru Masuk
              </h3>
              <p className="font-label-sm text-xs text-text-muted-light">
                Catat nomor batch dan tanggal kadaluarsa (Surabaya Rungkut)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted-light hover:text-on-surface p-1 rounded-lg hover:bg-surface-container transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                SKU / Nama Produk
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="e.g. Amoxicillin 500mg"
                required
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Nomor Batch Principal
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-mono font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary uppercase border border-border-light"
                placeholder="e.g. #BATCH-2024-X99"
                required
                type="text"
                value={batchNumber}
                onChange={(e) => setBatchNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Kategori
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light cursor-pointer"
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
              >
                <option value="BEBAS">Obat Bebas (OTC)</option>
                <option value="KERAS">Obat Resep / Keras</option>
                <option value="SUPLEMEN">Suplemen & Vitamin</option>
                <option value="FMCG">FMCG & Retail</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Zona Rak / Lokasi
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light cursor-pointer"
                value={rackZone}
                onChange={(e) => setRackZone(e.target.value)}
              >
                <option value="RAK_A">Zona A: Cold Storage (2-8°C)</option>
                <option value="RAK_B">Zona B: Rak Keras / Narkotika</option>
                <option value="RAK_C">Zona C: Pallet OTC Massal</option>
                <option value="RAK_D">Zona D: FMCG & Retail</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Jumlah Diterima (Pcs/Box)
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="250"
                required
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 0)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Tanggal Kadaluarsa (ED)
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                required
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-light mt-1">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-xs font-semibold hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base leading-none">save</span>
              <span>Simpan ke Database Stok</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
