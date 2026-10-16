/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { SalesVisit } from '../../data/mockData';

interface DeliveryOrderDetailModalProps {
  visit: SalesVisit | null;
  onClose: () => void;
  onPrintOrDownload: () => void;
}

export const DeliveryOrderDetailModal: React.FC<DeliveryOrderDetailModalProps> = ({
  visit,
  onClose,
  onPrintOrDownload,
}) => {
  if (!visit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-2xl w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-border-light pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">description</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-lg text-on-surface font-bold">
                  Surat Jalan / Delivery Order (DO)
                </h3>
                <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-container text-primary">
                  {visit.invoiceOrDo}
                </span>
              </div>
              <p className="font-label-sm text-xs text-text-muted-light mt-0.5">
                Gudang Pusat Surabaya Rungkut • Distribusi Berizin CDOB
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

        {/* Content Details */}
        <div className="grid grid-cols-2 gap-4 text-xs bg-surface-container-low p-4 rounded-xl border border-border-light/60">
          <div>
            <span className="text-text-muted-light block">Pelanggan / Penerima:</span>
            <span className="font-bold text-on-surface text-sm block mt-0.5">{visit.partnerName}</span>
            <span className="text-text-muted-light block mt-0.5">{visit.salesArea}</span>
          </div>
          <div>
            <span className="text-text-muted-light block">Sales Representative:</span>
            <span className="font-bold text-on-surface text-sm block mt-0.5">{visit.salesRep}</span>
            <span className="text-text-muted-light block mt-0.5">Waktu Kunjungan: {visit.checkInTime}</span>
          </div>
        </div>

        {/* Item table mock */}
        <div className="border border-border-light rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface-container-low text-text-muted-light uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Item / SKU</th>
                <th className="py-2.5 px-3">Batch Number</th>
                <th className="py-2.5 px-3 text-center">Qty Koli</th>
                <th className="py-2.5 px-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-light text-on-surface">
              <tr>
                <td className="py-2.5 px-3">
                  <span className="font-semibold block">Paracetamol 500mg Kaplet</span>
                  <span className="text-[10px] text-text-muted-light">Box 100 Kaplet</span>
                </td>
                <td className="py-2.5 px-3 font-mono font-medium">#PCT-2024-B12</td>
                <td className="py-2.5 px-3 text-center font-semibold">10 Box</td>
                <td className="py-2.5 px-3 text-right font-semibold">Rp 3.500.000</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">
                  <span className="font-semibold block">Amoxicillin Trihydrate 500mg</span>
                  <span className="text-[10px] text-text-muted-light">Box 100 Kapsul</span>
                </td>
                <td className="py-2.5 px-3 font-mono font-medium">#AMX-2023-A09</td>
                <td className="py-2.5 px-3 text-center font-semibold">15 Box</td>
                <td className="py-2.5 px-3 text-right font-semibold">Rp 7.500.000</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3">
                  <span className="font-semibold block">Vitamin C 1000mg Effervescent</span>
                  <span className="text-[10px] text-text-muted-light">Tube 10 Tablet</span>
                </td>
                <td className="py-2.5 px-3 font-mono font-medium">#VTC-2024-D44</td>
                <td className="py-2.5 px-3 text-center font-semibold">20 Tube</td>
                <td className="py-2.5 px-3 text-right font-semibold">Rp 3.500.000</td>
              </tr>
            </tbody>
            <tfoot className="bg-surface-container-low font-bold">
              <tr>
                <td colSpan={3} className="py-2 px-3 text-right">Total Nilai Pesanan (PPN Incl.):</td>
                <td className="py-2 px-3 text-right text-primary text-sm">{visit.orderValue}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Verification and Signature */}
        <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-status-safe text-lg">verified</span>
            <div>
              <span className="font-semibold text-emerald-900 dark:text-emerald-300 block">
                Validasi Digital Apoteker PJ
              </span>
              <span className="text-[11px] text-emerald-800 dark:text-emerald-400">
                {visit.digitalSignatureApoteker || 'Disetujui oleh Penanggung Jawab Outlet'}
              </span>
            </div>
          </div>
          <span className="font-mono text-[10px] text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2 py-0.5 rounded">
            CDOB-COMPLIANT
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-text-muted-light text-xs italic">
            "{visit.remarks}"
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              Tutup
            </button>
            <button
              onClick={onPrintOrDownload}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-all flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-base">print</span>
              <span>Cetak / Unduh PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
