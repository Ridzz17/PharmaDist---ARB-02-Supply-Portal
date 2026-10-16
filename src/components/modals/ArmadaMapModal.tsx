/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ArmadaMapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArmadaMapModal: React.FC<ArmadaMapModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const fleetSales = [
    {
      rep: 'Dimas Prasetyo',
      zone: 'Surabaya Timur (Rungkut, Manyar, Tenggilis)',
      vehicle: 'Motor Box Farmasi L-4819-AZ',
      currentLocation: 'Jl. Manyar Kertoarjo No. 15',
      status: 'On-Route ke Apotek K-24',
      accuracy: '±3.8m',
      lastPing: '2 menit lalu',
      progress: '4 dari 6 Toko Selesai',
      coords: '-7.2891, 112.7782',
    },
    {
      rep: 'Rina Wijaya',
      zone: 'Surabaya Pusat & Selatan (Gubeng, Dharmawangsa)',
      vehicle: 'Motor Box Farmasi L-2910-XX',
      currentLocation: 'Jl. Raya Gubeng No. 102',
      status: 'Check-in di Minimarket Surya Mart',
      accuracy: '±4.1m',
      lastPing: 'Baru saja',
      progress: '5 dari 7 Toko Selesai',
      coords: '-7.2715, 112.7533',
    },
    {
      rep: 'Ahmad Fauzi',
      zone: 'Sidoarjo Barat (Waru, Sepanjang, Gedangan)',
      vehicle: 'Van Logistik W-1902-CD',
      currentLocation: 'Jl. Pahlawan No. 24, Sidoarjo',
      status: 'Menunggu konfirmasi PO Toko Obat Sehat',
      accuracy: '±4.5m',
      lastPing: '5 menit lalu',
      progress: '3 dari 5 Toko Selesai',
      coords: '-7.4478, 112.7183',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
      <div className="bg-surface-container-lowest rounded-2xl shadow-2xl max-w-4xl w-full p-6 relative flex flex-col gap-4 border border-border-light animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-border-light pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl">satellite_alt</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline-md text-lg text-on-surface font-bold">
                  Peta Satelit Armada Field Sales Surabaya & Sidoarjo
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-status-safe/10 text-status-safe border border-status-safe/20 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-safe animate-ping"></span>
                  3 Tim Online
                </span>
              </div>
              <p className="font-label-sm text-xs text-text-muted-light mt-0.5">
                Sinkronisasi telemetri GPS real-time • Akurasi Geotagging ±4.2 Meter
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

        {/* Satellite Map Graphic Simulation */}
        <div className="relative w-full h-72 rounded-xl overflow-hidden bg-slate-900 border border-border-light flex items-center justify-center">
          {/* Stylized dark map grid lines */}
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* Central DC Marker */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg ring-4 ring-primary/30">
              <span className="material-symbols-outlined text-xl">warehouse</span>
            </div>
            <span className="mt-1 font-mono text-[10px] font-bold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-primary/50 shadow">
              DC Surabaya Rungkut
            </span>
          </div>

          {/* Team 1 Pin */}
          <div className="absolute top-1/4 right-1/4 flex flex-col items-center animate-bounce duration-1000">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg ring-4 ring-emerald-500/30">
              <span className="material-symbols-outlined text-base">delivery_dining</span>
            </div>
            <span className="mt-1 font-sans text-[10px] font-semibold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-emerald-500/50">
              Dimas P. (Manyar)
            </span>
          </div>

          {/* Team 2 Pin */}
          <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-cyan-500 text-white flex items-center justify-center shadow-lg ring-4 ring-cyan-500/30">
              <span className="material-symbols-outlined text-base">store</span>
            </div>
            <span className="mt-1 font-sans text-[10px] font-semibold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-cyan-500/50">
              Rina W. (Gubeng)
            </span>
          </div>

          {/* Team 3 Pin */}
          <div className="absolute bottom-1/4 left-1/3 flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-lg ring-4 ring-amber-500/30">
              <span className="material-symbols-outlined text-base">local_shipping</span>
            </div>
            <span className="mt-1 font-sans text-[10px] font-semibold text-white bg-slate-900/90 px-2 py-0.5 rounded border border-amber-500/50">
              Ahmad F. (Sidoarjo)
            </span>
          </div>

          {/* Map Compass HUD */}
          <div className="absolute top-3 right-3 bg-slate-950/80 p-2 rounded-lg border border-slate-700 text-[10px] text-slate-300 font-mono">
            <div>LAT: -7.2891° S</div>
            <div>LNG: 112.7782° E</div>
            <div className="text-emerald-400">GPS FIX: 12 SATS</div>
          </div>
        </div>

        {/* Team details list */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {fleetSales.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-surface-container-low border border-border-light text-xs flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface text-sm">{item.rep}</span>
                <span className="font-mono text-[10px] text-primary bg-surface-container px-1.5 py-0.5 rounded">
                  {item.accuracy}
                </span>
              </div>
              <span className="text-[11px] text-text-muted-light">{item.zone}</span>
              <div className="bg-surface-container-lowest p-2 rounded-lg text-[11px] flex flex-col gap-0.5">
                <span className="text-primary font-semibold truncate">{item.status}</span>
                <span className="text-text-muted-light truncate">{item.currentLocation}</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-text-muted-light pt-1">
                <span>{item.progress}</span>
                <span>{item.lastPing}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-xs font-semibold hover:bg-primary transition-all"
          >
            Tutup Peta Satelit
          </button>
        </div>
      </div>
    </div>
  );
};
