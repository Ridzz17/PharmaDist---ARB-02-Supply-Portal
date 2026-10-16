/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sidebar, ScreenId } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './views/DashboardView';
import { InventoryExpiryView } from './views/InventoryExpiryView';
import { SalesActivityView } from './views/SalesActivityView';
import { CustomersView } from './views/CustomersView';
import { AnalyticsView } from './views/AnalyticsView';

import { RestockModal } from './components/modals/RestockModal';
import { AddBatchModal } from './components/modals/AddBatchModal';
import { AddPartnerModal } from './components/modals/AddPartnerModal';
import { NewVisitModal } from './components/modals/NewVisitModal';
import { DeliveryOrderDetailModal } from './components/modals/DeliveryOrderDetailModal';
import { ArmadaMapModal } from './components/modals/ArmadaMapModal';
import { FefoConfigModal } from './components/modals/FefoConfigModal';

import {
  INITIAL_INVENTORY,
  INITIAL_PARTNERS,
  INITIAL_SALES_VISITS,
  InventoryItem,
  Partner,
  SalesVisit,
} from './data/mockData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');

  // Data states
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [visits, setVisits] = useState<SalesVisit[]>(INITIAL_SALES_VISITS);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  // Modal states
  const [restockModal, setRestockModal] = useState<{
    isOpen: boolean;
    productName: string;
    batchCode: string;
    threshold: string;
  }>({
    isOpen: false,
    productName: '',
    batchCode: '',
    threshold: '',
  });

  const [addBatchOpen, setAddBatchOpen] = useState(false);
  const [addPartnerOpen, setAddPartnerOpen] = useState(false);
  const [newVisitOpen, setNewVisitOpen] = useState(false);
  const [selectedVisitForDO, setSelectedVisitForDO] = useState<SalesVisit | null>(null);
  const [armadaMapOpen, setArmadaMapOpen] = useState(false);
  const [fefoConfigOpen, setFefoConfigOpen] = useState(false);

  // Handlers
  const handleOpenRestock = (productName: string, batchCode: string, threshold: string) => {
    setRestockModal({
      isOpen: true,
      productName,
      batchCode,
      threshold,
    });
  };

  const handleConfirmRestock = (name: string, batch: string, qty: number) => {
    setRestockModal({ isOpen: false, productName: '', batchCode: '', threshold: '' });
    // update inventory stock status
    setInventory((prev) =>
      prev.map((item) =>
        item.name === name || item.batchNumber === batch
          ? {
              ...item,
              stockQty: item.stockQty + qty,
              stockStatusNote: 'PO diproses ke Principal (Dalam pengiriman)',
              stockPercentage: Math.min(100, Math.round(((item.stockQty + qty) / item.minRestockNum) * 100)),
            }
          : item
      )
    );
    showToast(`Purchase Order untuk ${qty} Box ${name} berhasil diteruskan ke Principal!`);
  };

  const handleAddBatch = (newItem: InventoryItem) => {
    setInventory((prev) => [newItem, ...prev]);
    showToast(`Batch baru ${newItem.batchNumber} (${newItem.name}) berhasil dicatat ke sistem FEFO!`);
  };

  const handleAddPartner = (newPartner: Partner) => {
    setPartners((prev) => [newPartner, ...prev]);
    showToast(`Mitra baru ${newPartner.name} berhasil didaftarkan dan terverifikasi!`);
  };

  const handleAddVisit = (newVisit: SalesVisit) => {
    setVisits((prev) => [newVisit, ...prev]);
    showToast(`Kunjungan ke ${newVisit.partnerName} (${newVisit.salesRep}) berhasil dijadwalkan!`);
  };

  const handleSaveFefoConfig = (config: { criticalDays: number; warningDays: number; autoPicking: boolean }) => {
    setFefoConfigOpen(false);
    showToast(
      `Parameter FEFO berhasil diperbarui: Kritis <${config.criticalDays} hari, Waspada <${config.warningDays} hari`
    );
  };

  return (
    <div className="min-h-screen bg-bg-light text-on-surface flex flex-col font-body antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        activeScreen={activeScreen}
        onNavigate={setActiveScreen}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Wrapper with left margin on desktop */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header Topbar */}
        <Header
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onNavigate={setActiveScreen}
          onShowToast={showToast}
          searchQuery={globalSearch}
          onSearchChange={setGlobalSearch}
        />

        {/* Main Content Area */}
        <main className="w-full pt-16 flex-1 bg-bg-light">
          {activeScreen === 'dashboard' && (
            <DashboardView
              onNavigate={setActiveScreen}
              onOpenRestock={handleOpenRestock}
              onOpenNewVisit={() => setNewVisitOpen(true)}
              onOpenDOModal={setSelectedVisitForDO}
              onShowToast={showToast}
              inventory={inventory}
              visits={visits}
            />
          )}

          {activeScreen === 'inventory-expiry' && (
            <InventoryExpiryView
              inventory={inventory}
              onNavigate={setActiveScreen}
              onOpenRestock={handleOpenRestock}
              onOpenAddBatch={() => setAddBatchOpen(true)}
              onOpenFefoConfig={() => setFefoConfigOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'sales-activity' && (
            <SalesActivityView
              visits={visits}
              partners={partners}
              onNavigate={setActiveScreen}
              onOpenNewVisit={() => setNewVisitOpen(true)}
              onOpenDOModal={setSelectedVisitForDO}
              onOpenArmadaMap={() => setArmadaMapOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'customers' && (
            <CustomersView
              partners={partners}
              onNavigate={setActiveScreen}
              onOpenAddPartner={() => setAddPartnerOpen(true)}
              onShowToast={showToast}
            />
          )}

          {activeScreen === 'analytics' && (
            <AnalyticsView
              onNavigate={setActiveScreen}
              onOpenFefoConfig={() => setFefoConfigOpen(true)}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <RestockModal
        isOpen={restockModal.isOpen}
        onClose={() => setRestockModal({ ...restockModal, isOpen: false })}
        productName={restockModal.productName}
        batchCode={restockModal.batchCode}
        threshold={restockModal.threshold}
        onConfirm={handleConfirmRestock}
      />

      <AddBatchModal
        isOpen={addBatchOpen}
        onClose={() => setAddBatchOpen(false)}
        onAddBatch={handleAddBatch}
      />

      <AddPartnerModal
        isOpen={addPartnerOpen}
        onClose={() => setAddPartnerOpen(false)}
        onAddPartner={handleAddPartner}
      />

      <NewVisitModal
        isOpen={newVisitOpen}
        onClose={() => setNewVisitOpen(false)}
        partners={partners}
        onAddVisit={handleAddVisit}
      />

      <DeliveryOrderDetailModal
        visit={selectedVisitForDO}
        onClose={() => setSelectedVisitForDO(null)}
        onPrintOrDownload={() => {
          showToast(`Surat Jalan ${selectedVisitForDO?.invoiceOrDo} berhasil diunduh (PDF)`);
          setSelectedVisitForDO(null);
        }}
      />

      <ArmadaMapModal
        isOpen={armadaMapOpen}
        onClose={() => setArmadaMapOpen(false)}
      />

      <FefoConfigModal
        isOpen={fefoConfigOpen}
        onClose={() => setFefoConfigOpen(false)}
        onSave={handleSaveFefoConfig}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-bottom-5 duration-200 border border-slate-700/60 max-w-md">
          <span className="material-symbols-outlined text-status-safe text-xl">check_circle</span>
          <span className="font-body-sm text-xs leading-snug">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-auto"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
