/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Partner } from '../../data/mockData';

interface AddPartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPartner: (partner: Partner) => void;
}

export const AddPartnerModal: React.FC<AddPartnerModalProps> = ({
  isOpen,
  onClose,
  onAddPartner,
}) => {
  const [name, setName] = useState('');
  const [type, setType] = useState<'Apotek Resmi' | 'Minimarket' | 'Toko Obat'>('Apotek Resmi');
  const [tier, setTier] = useState<'Platinum' | 'Gold' | 'Silver' | 'Bronze'>('Gold');
  const [license, setLicense] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('Surabaya');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [creditTerms, setCreditTerms] = useState('Net 30 Hari');
  const [creditLimitJt, setCreditLimitJt] = useState(50);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !license) return;

    let categoryKey: 'apotek' | 'minimarket' | 'toko-obat' = 'apotek';
    if (type === 'Minimarket') categoryKey = 'minimarket';
    if (type === 'Toko Obat') categoryKey = 'toko-obat';

    let regionKey: 'surabaya' | 'sidoarjo' | 'malang' | 'gresik' = 'surabaya';
    if (city.toLowerCase().includes('sidoarjo')) regionKey = 'sidoarjo';
    if (city.toLowerCase().includes('malang')) regionKey = 'malang';
    if (city.toLowerCase().includes('gresik')) regionKey = 'gresik';

    const newPartner: Partner = {
      id: `MITRA-${Date.now().toString().slice(-4)}`,
      name,
      type,
      categoryKey,
      tier,
      license,
      address,
      city,
      regionKey,
      contactPerson,
      phone,
      creditTerms,
      creditLimitJt,
      creditUsedJt: 0,
      creditUsedPct: 0,
      status: 'Aktif',
      statusKey: 'aktif',
      monthlyVolume: 'Rp 0',
      lastOrderDate: 'Baru Terdaftar',
    };

    onAddPartner(newPartner);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-xl w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">domain_add</span>
            </div>
            <div>
              <h3 className="font-headline-md text-lg text-on-surface font-bold">
                Pendaftaran Mitra Baru (B2B)
              </h3>
              <p className="font-label-sm text-xs text-text-muted-light">
                Verifikasi izin SIA / SIPA Apotek atau NIB Jaringan Minimarket
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
                Nama Apotek / Toko / Outlet
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="e.g. Apotek Sehat Sentosa"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Nomor Izin (SIA / NIB)
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light font-mono"
                placeholder="e.g. SIA: 503/120.4/2026"
                required
                type="text"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Tipe Mitra
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light cursor-pointer"
                value={type}
                onChange={(e) => setType(e.target.value as any)}
              >
                <option value="Apotek Resmi">Apotek Resmi</option>
                <option value="Minimarket">Minimarket</option>
                <option value="Toko Obat">Toko Obat</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Klasifikasi Tier
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light cursor-pointer"
                value={tier}
                onChange={(e) => setTier(e.target.value as any)}
              >
                <option value="Platinum">Platinum</option>
                <option value="Gold">Gold</option>
                <option value="Silver">Silver</option>
                <option value="Bronze">Bronze</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Kota / Wilayah
              </label>
              <select
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light cursor-pointer"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="Surabaya">Surabaya</option>
                <option value="Sidoarjo">Sidoarjo</option>
                <option value="Malang">Malang</option>
                <option value="Gresik">Gresik</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Alamat Lengkap
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="Jl. Raya No..."
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Kontak Person / Apoteker PJ
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="apt. Budi Santoso / Manager"
                type="text"
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Nomor Telepon / WhatsApp
              </label>
              <input
                className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-border-light"
                placeholder="0812-xxxx-xxxx"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-label-sm text-xs text-on-surface font-semibold">
                Ketentuan Kredit & Plafon (Rp Juta)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className="h-10 px-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light"
                  value={creditTerms}
                  onChange={(e) => setCreditTerms(e.target.value)}
                >
                  <option value="Net 30 Hari">Net 30 Hari</option>
                  <option value="Net 14 Hari">Net 14 Hari</option>
                  <option value="Net 45 Hari">Net 45 Hari</option>
                  <option value="Cash on Delivery (COD)">COD</option>
                </select>
                <input
                  className="h-10 px-3 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-border-light"
                  type="number"
                  min={5}
                  value={creditLimitJt}
                  onChange={(e) => setCreditLimitJt(Number(e.target.value) || 0)}
                  placeholder="Limit Jt"
                />
              </div>
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
              className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-base leading-none">add_circle</span>
              <span>Daftarkan Mitra Baru</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
