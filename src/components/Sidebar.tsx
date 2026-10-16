/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export type ScreenId = 'dashboard' | 'customers' | 'sales-activity' | 'inventory-expiry' | 'analytics';

interface SidebarProps {
  activeScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeScreen,
  onNavigate,
  mobileOpen,
  onCloseMobile,
}) => {
  const navItems = [
    {
      id: 'dashboard' as ScreenId,
      label: 'Dashboard',
      icon: 'dashboard',
      sublabel: undefined,
      badge: undefined,
    },
    {
      id: 'customers' as ScreenId,
      label: 'Pelanggan & Mitra',
      icon: 'local_pharmacy',
      sublabel: 'Apotek & FMCG',
      badge: undefined,
    },
    {
      id: 'sales-activity' as ScreenId,
      label: 'Aktivitas Sales',
      icon: 'point_of_sale',
      sublabel: undefined,
      badge: undefined,
    },
    {
      id: 'inventory-expiry' as ScreenId,
      label: 'Kelola Stok',
      icon: 'inventory_2',
      sublabel: undefined,
      badge: '5 Alert',
    },
    {
      id: 'analytics' as ScreenId,
      label: 'Analisis',
      icon: 'analytics',
      sublabel: undefined,
      badge: undefined,
    },
  ];

  const handleSelect = (id: ScreenId) => {
    onNavigate(id);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-transform duration-200 border-r border-border-light ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col">
          {/* Logo Brand Header */}
          <button
            onClick={() => handleSelect('dashboard')}
            className="h-16 px-5 flex items-center gap-3 text-left hover:opacity-90 transition-opacity border-b border-border-light/40 w-full"
          >
            <img
              alt="PharmaDist B2B Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UiI5dffI4MUYDzevC2LAYcIGYor1CFpXPV7y5BiCZc4RAIArgGgG-P9U5UKQn76ca3MQmFg5ii8SV97Fu7u1WBsiqWutdv_AVjXOZ2uA7sDzV7bkZG6xygDWFF8NUPOb0EUe4inwZaZOy9zaTKe9JkCb3tj1se_qfhZpGx0_sWkzzekImE3Qn0JK9ADxfQB37Uvj4lVs-W7axIKhbx2zQ3Fh_DdB7HMgd1zChmws15B8GFuSOuWwVfJKw"
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-primary tracking-tight leading-tight truncate font-bold text-base">
                PharmaDist
              </span>
              <span className="font-label-sm text-text-muted-light text-[11px] leading-none truncate font-medium">
                ARB-02 Supply Portal
              </span>
            </div>
          </button>

          {/* Subheader Badge */}
          <div className="px-4 py-2">
            <div className="bg-surface-container-low rounded-lg px-2.5 py-1 flex items-center justify-between">
              <span className="font-label-sm text-[10px] text-tertiary uppercase font-semibold tracking-wider">
                Distribusi Farmasi & FMCG
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 px-3 mt-2">
            {navItems.map((item) => {
              const isActive = activeScreen === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-primary-container text-on-primary font-semibold shadow-xs'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="material-symbols-outlined text-xl shrink-0">
                      {item.icon}
                    </span>
                    <span className="font-label-md text-[13px] truncate">
                      {item.label}
                    </span>
                  </div>

                  {item.sublabel && (
                    <span
                      className={`font-label-sm text-[10px] truncate ml-1 ${
                        isActive
                          ? 'text-on-primary-container bg-surface-container-lowest/20 px-1.5 py-0.5 rounded'
                          : 'text-text-muted-light'
                      }`}
                    >
                      {item.sublabel}
                    </span>
                  )}

                  {item.badge && (
                    <span className="bg-error-container text-error font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold ml-1 shrink-0">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Node Status Box */}
        <div className="p-3.5 m-3 bg-surface-container-low rounded-xl border border-border-light/60">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="w-2 h-2 rounded-full bg-status-safe animate-pulse"></span>
            <span className="font-label-sm text-[10px] text-text-muted-light uppercase font-semibold tracking-wider">
              Node Status
            </span>
          </div>
          <p className="font-label-md text-on-surface font-semibold text-[13px] truncate">
            Gudang Pusat Surabaya
          </p>
          <div className="flex items-center justify-between mt-1 text-[11px]">
            <span className="font-label-sm text-primary font-medium">Online</span>
            <span className="font-label-sm text-text-muted-light">v2.4.1</span>
          </div>
        </div>
      </aside>
    </>
  );
};
