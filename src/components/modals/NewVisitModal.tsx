/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { SalesVisit, Partner } from '../../data/mockData';

interface NewVisitModalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: Partner[];
  onAddVisit: (visit: SalesVisit) => void;
}

export const NewVisitModal: React.FC<NewVisitModalProps> = ({
  isOpen,
  onClose,
  partners,
  onAddVisit,
}) => {
  const [partnerId, setPartnerId] = useState(partners[0]?.id || '');
  const [salesRep, setSalesRep] = useState('Dimas Prasetyo');
  const [visitType, setVisitType] = useState<'Restock Order' | 'Payment Collection' | 'New Onboarding' | 'Pengecekan Stok'>('Restock Order');
  const [orderValueJt, setOrderValueJt] = useState(12.5);
  const [scheduledTime, setScheduledTime] = useState('14:30 WIB');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedPartner = partners.find((p) => p.id === partnerId) || partners[0];

    let partnerType: 'Apotek' | 'Minimarket' | 'Toko Obat' = 'Apotek';
    if (selectedPartner.type.includes('Minimarket')) partnerType = 'Minimarket';
    if (selectedPartner.type.includes('Toko Obat')) partnerType = 'Toko Obat';

    const words = selectedPartner.name.split(' ');
    const initial = words.length > 1 ? `${words[0][0]}${words[1][0]}`.toUpperCase() : selectedPartner.name.slice(0, 2).toUpperCase();

    const formattedOrderVal = `Rp ${(orderValueJt * 1000000).toLocaleString('id-ID')}`;

    const newVisit: SalesVisit = {
      id: `VIS-${Date.now().toString().slice(-3)}`,
      partnerId: selectedPartner.id,
      partnerName: selectedPartner.name,
      partnerInitial: initial,
      partnerType,
      salesRep,
      salesArea: `${salesRep.includes('Dimas') ? 'Sales Field A (Surabaya Timur)' : salesRep.includes('Rina') ? 'Sales Field B (Surabaya Pusat)' : 'Sales Field C (Sidoarjo)'}`,
      orderValue: formattedOrderVal,
      orderValueRaw: orderValueJt * 1000000,
      itemsSummary: `${visitType}: Pengadaan Rutin`,
      checkInTime: scheduledTime,
      visitStatus: 'Diproses',
      statusBadge: 'Processing / Diproses',
      typeTag: visitType,
      invoiceOrDo: `DO-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      remarks: remarks || `Kunjungan sales & pencatatan order ${selectedPartner.name}`,
      isToday: true,
    };

    onAddVisit(newVisit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-lg w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-border-light pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">add_location_alt</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Jadwalkan Kunjungan Sales Baru
              </h3>
              <p className="font-label-sm text-xs text-text-muted-light">
                Penugasan salesman lapangan & pesanan langsung (PO/DO)
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
          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface font-semibold">
              Pilih Outlet / Mitra Apotek
            </label>
            <select
              className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light cursor-pointer"
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
            >
              {partners.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.city}) - {p.type}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Sales Representative
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light cursor-pointer"
                value={salesRep}
                onChange={(e) => setSalesRep(e.target.value)}
              >
                <option value="Dimas Prasetyo">Dimas Prasetyo (Sales Field A)</option>
                <option value="Rina Wijaya">Rina Wijaya (Sales Field B)</option>
                <option value="Ahmad Fauzi">Ahmad Fauzi (Sales Field C)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Agenda Kunjungan
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light cursor-pointer"
                value={visitType}
                onChange={(e) => setVisitType(e.target.value as any)}
              >
                <option value="Restock Order">Restock Order</option>
                <option value="Payment Collection">Payment Collection</option>
                <option value="New Onboarding">New Onboarding</option>
                <option value="Pengecekan Stok">Pengecekan Stok</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Estimasi Nilai Pesanan (Juta Rp)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={orderValueJt}
                onChange={(e) => setOrderValueJt(Number(e.target.value) || 0)}
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Waktu Kunjungan (WIB)
              </label>
              <input
                type="text"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="e.g. 15:00 WIB"
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-label-sm text-xs text-on-surface font-semibold">
              Catatan Instruksi Salesman
            </label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Periksa stok Paracetamol dan konfirmasi tanda tangan digital"
              className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light"
            />
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
              <span>Jadwalkan Kunjungan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
