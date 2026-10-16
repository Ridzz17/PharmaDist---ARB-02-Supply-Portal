/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface RestockModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  batchCode: string;
  threshold: string;
  onConfirm: (productName: string, batchCode: string, qty: number) => void;
}

export const RestockModal: React.FC<RestockModalProps> = ({
  isOpen,
  onClose,
  productName,
  batchCode,
  threshold,
  onConfirm,
}) => {
  const [qty, setQty] = useState<number>(150);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">shopping_cart_checkout</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Buat Order Restock (PO)
              </h3>
              <p className="font-label-sm text-xs text-text-muted-light">
                Pengadaan cepat ke principal farmasi terdaftar
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

        {/* Product Details Box */}
        <div className="bg-surface-container-low p-4 rounded-xl flex flex-col gap-2 border border-border-light/60">
          <div className="flex justify-between text-body-sm text-xs">
            <span className="text-text-muted-light">Produk:</span>
            <span className="font-semibold text-on-surface text-right">{productName}</span>
          </div>
          <div className="flex justify-between text-body-sm text-xs">
            <span className="text-text-muted-light">Batch Prioritas:</span>
            <span className="font-mono font-semibold text-primary">{batchCode}</span>
          </div>
          <div className="flex justify-between text-body-sm text-xs">
            <span className="text-text-muted-light">Threshold Standard:</span>
            <span className="font-semibold text-on-surface">{threshold}</span>
          </div>
        </div>

        {/* Input quantity */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-md text-xs text-on-surface font-semibold">
            Jumlah Pemesanan Restock
          </label>
          <div className="relative flex items-center">
            <input
              className="w-full h-11 px-4 rounded-lg bg-surface-container-low text-on-surface font-headline-sm text-base font-semibold focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
              type="number"
              value={qty}
              min={1}
              onChange={(e) => setQty(Number(e.target.value) || 0)}
            />
            <span className="absolute right-4 text-text-muted-light font-label-md text-xs">
              Unit / Dus
            </span>
          </div>
          <span className="font-body-sm text-[11px] text-text-muted-light">
            Estimasi pengiriman gudang: 2 hari kerja via Jalur Dingin Express
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onConfirm(productName, batchCode, qty)}
            className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg leading-none">send</span>
            <span>Kirim Purchase Order (PO)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
