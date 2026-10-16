/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface FefoConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: { criticalDays: number; warningDays: number; autoPicking: boolean }) => void;
}

export const FefoConfigModal: React.FC<FefoConfigModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [criticalDays, setCriticalDays] = useState(30);
  const [warningDays, setWarningDays] = useState(90);
  const [autoPicking, setAutoPicking] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-border-light pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">tune</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Konfigurasi Threshold FEFO (First-Expired, First-Out)
              </h3>
              <p className="font-label-sm text-xs text-text-muted-light">
                Parameter otomatisasi picking list standar ISO 9001:2015 & CDOB
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

        <div className="flex flex-col gap-4 text-xs">
          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-on-surface">
              Threshold Kritis Kadaluarsa (Hari)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={7}
                max={60}
                value={criticalDays}
                onChange={(e) => setCriticalDays(Number(e.target.value) || 0)}
                className="w-28 h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-semibold border border-border-light"
              />
              <span className="text-text-muted-light">
                Produk berumur kurang dari {criticalDays} hari dikunci otomatis dari order baru.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-bold text-on-surface">
              Threshold Waspada / Warning (Hari)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={30}
                max={180}
                value={warningDays}
                onChange={(e) => setWarningDays(Number(e.target.value) || 0)}
                className="w-28 h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-semibold border border-border-light"
              />
              <span className="text-text-muted-light">
                Batch berumur kurang dari {warningDays} hari diprioritaskan keluar lebih dahulu ke apotek high-turnover.
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-border-light">
            <div>
              <span className="font-bold text-on-surface block">
                Otomatisasi Direct Picking List (FEFO Prioritas)
              </span>
              <span className="text-text-muted-light text-[11px]">
                Sistem WMS mengarahkan barcode scanner staf gudang ke rak dengan tanggal ED terdekat.
              </span>
            </div>
            <input
              type="checkbox"
              checked={autoPicking}
              onChange={(e) => setAutoPicking(e.target.checked)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border-light">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-surface-container text-on-surface font-label-md text-xs font-semibold hover:bg-surface-container-high transition-colors"
          >
            Batal
          </button>
          <button
            onClick={() => onSave({ criticalDays, warningDays, autoPicking })}
            className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-all shadow-sm"
          >
            Simpan Konfigurasi
          </button>
        </div>
      </div>
    </div>
  );
};
