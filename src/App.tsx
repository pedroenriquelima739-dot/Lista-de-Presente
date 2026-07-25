/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { GiftItem, WeddingInfo, CategoryType } from './types';
import { INITIAL_WEDDING_INFO, INITIAL_GIFTS } from './data/initialData';
import { Header } from './components/Header';
import { InteractiveList } from './components/InteractiveList';
import { DigitalPaperCard } from './components/DigitalPaperCard';
import { ReserveModal } from './components/ReserveModal';
import { PixModal } from './components/PixModal';
import { ShareModal } from './components/ShareModal';
import { AdminModal } from './components/AdminModal';
import { OfflineModal } from './components/OfflineModal';
import { generateSelectedGiftsPDF } from './utils/pdfGenerator';
import { Heart, Sparkles, CheckCircle2, QrCode } from 'lucide-react';

export default function App() {
  // Load state from localStorage or initial defaults
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo>(() => {
    const saved = localStorage.getItem('wedding_info_thayna_joelton');
    return saved ? JSON.parse(saved) : INITIAL_WEDDING_INFO;
  });

  const [gifts, setGifts] = useState<GiftItem[]>(() => {
    const saved = localStorage.getItem('gifts_thayna_joelton');
    if (!saved) return INITIAL_GIFTS;
    try {
      const parsed: GiftItem[] = JSON.parse(saved);
      const hasCortina = parsed.some(
        (g) => g.name.toLowerCase().trim() === 'cortina' && g.category.toUpperCase() === 'SALA'
      );
      if (!hasCortina) {
        return [{ id: 'sala-1', name: 'Cortina', category: 'SALA', isReserved: false }, ...parsed];
      }
      return parsed;
    } catch {
      return INITIAL_GIFTS;
    }
  });

  // Active view tab: 'interactive' or 'paper'
  const [activeTab, setActiveTab] = useState<'interactive' | 'paper'>('interactive');

  // Modals
  const [selectedGiftForReserve, setSelectedGiftForReserve] = useState<GiftItem | null>(null);
  const [selectedGiftForPix, setSelectedGiftForPix] = useState<GiftItem | null>(null);
  const [isPixModalOpen, setIsPixModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('wedding_info_thayna_joelton', JSON.stringify(weddingInfo));
  }, [weddingInfo]);

  useEffect(() => {
    localStorage.setItem('gifts_thayna_joelton', JSON.stringify(gifts));
  }, [gifts]);

  // Derived categories
  const categories: CategoryType[] = Array.from(
    new Set(gifts.map((g) => g.category.toUpperCase()))
  );

  const totalGifts = gifts.length;
  const reservedGifts = gifts.filter((g) => g.isReserved).length;

  // Handlers
  const handleConfirmReservation = (giftId: string) => {
    setGifts((prev) =>
      prev.map((g) =>
        g.id === giftId
          ? {
              ...g,
              isReserved: true,
              reservedAt: new Date().toLocaleDateString('pt-BR'),
            }
          : g
      )
    );
    showToast('Presente marcado com sucesso!');
  };

  const handleUnreserve = (gift: GiftItem) => {
    if (confirm(`Deseja desfazer a marcação do item "${gift.name}"?`)) {
      setGifts((prev) =>
        prev.map((g) =>
          g.id === gift.id
            ? {
                ...g,
                isReserved: false,
                reservedBy: undefined,
                reservedMessage: undefined,
                reservedAt: undefined,
              }
            : g
        )
      );
      showToast(`Item "${gift.name}" voltou a ficar disponível.`);
    }
  };

  const handleAddGift = (newGift: Omit<GiftItem, 'id' | 'isReserved'>) => {
    const item: GiftItem = {
      ...newGift,
      id: `custom-${Date.now()}`,
      isReserved: false,
    };
    setGifts((prev) => [...prev, item]);
    showToast(`Novo item "${item.name}" adicionado à lista!`);
  };

  const handleDeleteGift = (giftId: string) => {
    setGifts((prev) => prev.filter((g) => g.id !== giftId));
    showToast('Item removido da lista.');
  };

  const handleResetReservations = () => {
    setGifts((prev) =>
      prev.map((g) => ({
        ...g,
        isReserved: false,
        reservedBy: undefined,
        reservedMessage: undefined,
        reservedAt: undefined,
      }))
    );
    showToast('Todas as escolhas foram desmarcadas.');
  };

  const handleResetAllData = () => {
    setWeddingInfo(INITIAL_WEDDING_INFO);
    setGifts(INITIAL_GIFTS);
    localStorage.removeItem('wedding_info_thayna_joelton');
    localStorage.removeItem('gifts_thayna_joelton');
    showToast('Lista restaurada para a versão original do documento!');
  };

  const handleFinishPDF = () => {
    generateSelectedGiftsPDF(gifts, weddingInfo);
    showToast('PDF com a lista de presentes gerado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-wedding-paper flex flex-col justify-between selection:bg-[#3E5C38] selection:text-white">
      {/* Main Container */}
      <main className="flex-1">
        {/* Header Section */}
        <Header
          info={weddingInfo}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenShare={() => setIsShareModalOpen(true)}
          onOpenAdmin={() => setIsAdminModalOpen(true)}
          onOpenOffline={() => setIsOfflineModalOpen(true)}
          totalGifts={totalGifts}
          reservedGifts={reservedGifts}
        />

        {/* View Content */}
        {activeTab === 'interactive' ? (
          <InteractiveList
            gifts={gifts}
            categories={categories}
            onReserveClick={(gift) => setSelectedGiftForReserve(gift)}
            onUnreserveClick={handleUnreserve}
            onFinishPDF={handleFinishPDF}
          />
        ) : (
          <DigitalPaperCard
            info={weddingInfo}
            gifts={gifts}
            onItemClick={(gift) => {
              if (gift.isReserved) {
                handleUnreserve(gift);
              } else {
                setSelectedGiftForReserve(gift);
              }
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#2C3B28] text-[#FAF7F0] py-8 px-4 text-center border-t border-[#3E5C38] mt-12 no-print">
        <div className="max-w-2xl mx-auto flex flex-col items-center gap-3">
          <div className="flex items-center gap-2 text-amber-200">
            <Heart className="w-5 h-5 fill-amber-200" />
            <span className="font-cormorant text-2xl font-bold uppercase tracking-widest">
              {weddingInfo.coupleNames}
            </span>
          </div>
          <p className="font-cormorant italic text-sm opacity-90 max-w-md">
            "{weddingInfo.headlineQuote} {weddingInfo.subQuote}"
          </p>
          <div className="text-[11px] uppercase tracking-widest text-[#FAF7F0]/60 mt-2 font-sans flex flex-col gap-1 items-center">
            <span>Lista de Presentes Oficial &bull; Todos os direitos reservados</span>
            <span className="text-amber-200/80 font-medium normal-case tracking-normal text-xs">Desenvolvido por: Pedro H.S. Lima</span>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2D4A27] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-semibold border border-amber-200/30 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Modals */}
      {selectedGiftForReserve && (
        <ReserveModal
          gift={selectedGiftForReserve}
          onClose={() => setSelectedGiftForReserve(null)}
          onConfirm={handleConfirmReservation}
        />
      )}

      {isPixModalOpen && (
        <PixModal
          info={weddingInfo}
          selectedGift={selectedGiftForPix}
          onClose={() => {
            setIsPixModalOpen(false);
            setSelectedGiftForPix(null);
          }}
        />
      )}

      {isShareModalOpen && (
        <ShareModal
          info={weddingInfo}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {isAdminModalOpen && (
        <AdminModal
          info={weddingInfo}
          gifts={gifts}
          categories={categories}
          onClose={() => setIsAdminModalOpen(false)}
          onUpdateInfo={setWeddingInfo}
          onAddGift={handleAddGift}
          onDeleteGift={handleDeleteGift}
          onResetReservations={handleResetReservations}
          onResetAllData={handleResetAllData}
        />
      )}

      {isOfflineModalOpen && (
        <OfflineModal
          isOpen={isOfflineModalOpen}
          onClose={() => setIsOfflineModalOpen(false)}
          gifts={gifts}
          info={weddingInfo}
          deferredPrompt={deferredPrompt}
        />
      )}
    </div>
  );
}
