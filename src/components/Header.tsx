/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { ScreenId } from './Sidebar';

interface HeaderProps {
  onToggleMobileMenu: () => void;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleMobileMenu,
  onNavigate,
  onShowToast,
  searchQuery,
  onSearchChange,
}) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [showProfileMenu, setShowProfileMenu] = useState<boolean>(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check initial dark theme
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = (dark: boolean) => {
    setIsDark(dark);
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Close popovers on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 border-b border-border-light">
      <div className="h-16 w-full px-4 lg:px-8 flex items-center justify-between gap-4">
        {/* Mobile menu button */}
        <button
          onClick={onToggleMobileMenu}
          className="lg:hidden p-2 rounded-lg text-text-muted-light hover:bg-surface-container-high transition-colors"
          title="Buka Menu"
          type="button"
        >
          <span className="material-symbols-outlined text-2xl">menu</span>
        </button>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3 text-text-muted-light text-xl pointer-events-none">
              search
            </span>
            <input
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full h-10 pl-10 pr-8 rounded-lg bg-surface-container-low text-on-surface placeholder:text-text-muted-light font-body-sm text-[13px] outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
              placeholder="Cari apotek, minimarket, SKU, atau no batch..."
              type="text"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 text-text-muted-light hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Light / Dark Mode Toggle */}
          <div className="flex items-center bg-surface-container-low rounded-full p-1 border border-border-light/60">
            <button
              onClick={() => toggleTheme(false)}
              className={`p-1.5 rounded-full transition-colors ${
                !isDark
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-text-muted-light hover:text-on-surface'
              }`}
              title="Light Mode"
              type="button"
            >
              <span className="material-symbols-outlined text-lg leading-none">light_mode</span>
            </button>
            <button
              onClick={() => toggleTheme(true)}
              className={`p-1.5 rounded-full transition-colors ${
                isDark
                  ? 'bg-surface-container-lowest text-primary shadow-xs'
                  : 'text-text-muted-light hover:text-on-surface'
              }`}
              title="Dark Mode"
              type="button"
            >
              <span className="material-symbols-outlined text-lg leading-none">dark_mode</span>
            </button>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
              title="Notifikasi"
              type="button"
            >
              <span className="material-symbols-outlined text-xl leading-none">notifications</span>
              <span className="absolute top-1.5 right-1.5 flex h-4 min-w-[1rem] px-1 items-center justify-center rounded-full bg-status-critical text-on-error font-label-sm text-[10px] font-bold">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-xl shadow-xl border border-border-light z-50 p-3 flex flex-col gap-2 animate-in fade-in zoom-in-95 duration-100">
                <div className="flex items-center justify-between pb-2 border-b border-border-light">
                  <div className="flex items-center gap-1.5">
                    <span className="font-headline-sm text-sm font-bold text-on-surface">Notifikasi Operasional</span>
                    <span className="bg-error-container text-error text-[10px] font-bold px-1.5 py-0.5 rounded-full">3 Baru</span>
                  </div>
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onShowToast('Semua notifikasi ditandai telah dibaca');
                    }}
                    className="text-[11px] text-primary hover:underline font-semibold"
                  >
                    Tandai dibaca
                  </button>
                </div>

                <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('inventory-expiry');
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer flex gap-2.5 items-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-status-critical mt-1.5 shrink-0"></span>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-xs font-semibold text-on-surface">Stok Kritis Paracetamol 500mg</span>
                      <span className="text-[11px] text-text-muted-light mt-0.5">Sisa 18 box (#PCT-2024-B12). Expired dalam 23 hari.</span>
                      <span className="text-[10px] text-primary font-semibold mt-1">Klik untuk Restock Segera</span>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('sales-activity');
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer flex gap-2.5 items-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-status-safe mt-1.5 shrink-0"></span>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-xs font-semibold text-on-surface">Pembayaran Faktur Lunas</span>
                      <span className="text-[11px] text-text-muted-light mt-0.5">Minimarket Basmalah menyelesaikan #INV-2026-0891 (Rp 8.25M).</span>
                      <span className="text-[10px] text-text-muted-light mt-1">Hari ini • 09:30 WIB</span>
                    </div>
                  </div>

                  <div
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('customers');
                    }}
                    className="p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container-high transition-colors cursor-pointer flex gap-2.5 items-start"
                  >
                    <span className="w-2 h-2 rounded-full bg-status-warning mt-1.5 shrink-0"></span>
                    <div className="flex flex-col text-left">
                      <span className="font-label-md text-xs font-semibold text-on-surface">Sinkronisasi SatuSehat Kemenkes</span>
                      <span className="text-[11px] text-text-muted-light mt-0.5">Data izin operasional SIA/SIPA 842 apotek resmi terverifikasi.</span>
                      <span className="text-[10px] text-text-muted-light mt-1">Hari ini • 08:30 WIB</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="h-7 w-px bg-border-light"></div>

          {/* User Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2.5 p-1 rounded-lg hover:bg-surface-container transition-colors text-left"
              type="button"
            >
              <div className="relative">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-border-light"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuxcDPKb9zk5jEcFN9i-6rhHGnWWZzRHWSaI0FrJkjiaF5yKBYYIVCJ8Sek4vSLZwqvi6DzqIVc0Ox4_gfQTHwXucv6zAz7MpZevc1K90dhHG1tmgue7dExbYj4I2vmNXv4pWWAEK2iO4kHgley6WF64wbRiR6rmCZd3BCl5UVtk3XvoILX5kU1ECVwT9B0cJkP5eKE9FPEwIw5exSHDm0ZTauHoSFB5vwdqx_sCAlNnC6LWGycyxqmg"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-status-safe rounded-full ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="font-label-md text-[13px] text-on-surface font-semibold leading-tight">
                  Budi Santoso
                </span>
                <span className="font-label-sm text-[11px] text-text-muted-light leading-none mt-0.5">
                  Operations Manager
                </span>
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-border-light z-50 p-1.5 flex flex-col gap-1 text-xs">
                <div className="p-2 border-b border-border-light">
                  <p className="font-semibold text-on-surface">Budi Santoso, S.Farm</p>
                  <p className="text-text-muted-light text-[11px]">DC Surabaya Rungkut • ID: OPS-782</p>
                </div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onShowToast('Membuka pengaturan profil operasional');
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base text-text-muted-light">manage_accounts</span>
                  <span>Pengaturan Akun</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onShowToast('Log aktivitas sinkronisasi gudang berhasil diunduh');
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base text-text-muted-light">history</span>
                  <span>Log Aktivitas Sistem</span>
                </button>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    onShowToast('Pedoman CDOB BPOM Versi 2024 siap diakses');
                  }}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-on-surface hover:bg-surface-container transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-base text-text-muted-light">menu_book</span>
                  <span>Pedoman CDOB & SOP</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
