import React from 'react';
import { Gift, Heart, Share2, Settings, Sparkles, LayoutGrid, FileText, WifiOff } from 'lucide-react';
import { WeddingInfo } from '../types';

interface HeaderProps {
  info: WeddingInfo;
  activeTab: 'interactive' | 'paper';
  setActiveTab: (tab: 'interactive' | 'paper') => void;
  onOpenPix?: () => void;
  onOpenShare: () => void;
  onOpenAdmin: () => void;
  onOpenOffline: () => void;
  totalGifts: number;
  reservedGifts: number;
}

export const Header: React.FC<HeaderProps> = ({
  info,
  activeTab,
  setActiveTab,
  onOpenShare,
  onOpenAdmin,
  onOpenOffline,
  totalGifts,
  reservedGifts,
}) => {
  const percentComplete = totalGifts > 0 ? Math.round((reservedGifts / totalGifts) * 100) : 0;

  return (
    <header className="relative pt-8 pb-6 px-4 text-center max-w-4xl mx-auto">
      {/* Top Couple Logo / Emblem */}
      <div className="inline-flex flex-col items-center justify-center mb-4">
        <div className="relative flex items-center justify-center mb-2">
          {/* Subtle floral wreath decoration */}
          <div className="w-20 h-20 rounded-full border border-[#2C3B28]/30 flex items-center justify-center p-1 bg-[#FAF7F0] shadow-sm">
            <div className="w-full h-full rounded-full bg-[#2C3B28] text-[#FAF7F0] flex flex-col items-center justify-center">
              <span className="font-cormorant text-xs tracking-widest uppercase opacity-80">Thayná</span>
              <span className="font-display text-sm font-bold text-amber-200/90 my-[-2px]">&</span>
              <span className="font-cormorant text-xs tracking-widest uppercase opacity-80">Joelton</span>
            </div>
          </div>
        </div>
        <h1 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider text-[#2C3B28] uppercase">
          {info.coupleNames}
        </h1>
      </div>

      {/* Subtitle Quotes */}
      <div className="max-w-xl mx-auto mb-6 px-4">
        <p className="font-cormorant italic text-lg sm:text-xl text-[#2C3B28]/90 font-medium leading-snug">
          "{info.headlineQuote}"
        </p>
        <p className="font-sans text-xs sm:text-sm tracking-wide text-[#2C3B28]/70 mt-1 uppercase">
          {info.subQuote}
        </p>
      </div>

      {/* Main Banner Title "LISTA DE PRESENTES" */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="w-full border-t border-[#2C3B28]/20 absolute"></div>
        <div className="bg-[#FAF7F0] px-6 relative z-10">
          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold tracking-widest text-[#2C3B28] uppercase border-b-2 border-[#2C3B28] pb-1">
            Lista de Presentes
          </h2>
        </div>
      </div>

      {/* Progress Counter */}
      <div className="max-w-md mx-auto mb-6 bg-white/80 backdrop-blur-xs border border-[#2C3B28]/15 rounded-2xl p-4 shadow-xs">
        <div className="flex justify-between items-center text-xs sm:text-sm font-medium text-[#2C3B28] mb-2">
          <span className="flex items-center gap-1.5 font-semibold">
            <Gift className="w-4 h-4 text-[#3E5C38]" />
            Progresso da Lista
          </span>
          <span className="bg-[#2C3B28]/10 px-2.5 py-0.5 rounded-full text-xs font-bold text-[#2C3B28]">
            {reservedGifts} de {totalGifts} escolhidos ({percentComplete}%)
          </span>
        </div>
        <div className="w-full bg-[#2C3B28]/10 h-2.5 rounded-full overflow-hidden p-0.5">
          <div
            className="bg-[#3E5C38] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-sm no-print">
        {/* Switch View Tabs */}
        <div className="bg-[#2C3B28]/10 p-1 rounded-xl flex items-center gap-1">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'interactive'
                ? 'bg-[#2C3B28] text-white shadow-xs'
                : 'text-[#2C3B28] hover:bg-white/50'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Visão Interativa
          </button>
          <button
            onClick={() => setActiveTab('paper')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
              activeTab === 'paper'
                ? 'bg-[#2C3B28] text-white shadow-xs'
                : 'text-[#2C3B28] hover:bg-white/50'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Folha Original
          </button>
        </div>

        {/* Offline Access Button */}
        <button
          onClick={onOpenOffline}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 text-emerald-900 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          title="Modo e Arquivo Offline"
        >
          <WifiOff className="w-4 h-4 text-emerald-700" />
          Offline
        </button>

        {/* Share Button */}
        <button
          onClick={onOpenShare}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-[#2C3B28]/20 hover:bg-[#2C3B28]/5 text-[#2C3B28] font-medium text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
        >
          <Share2 className="w-4 h-4 text-[#3E5C38]" />
          Compartilhar
        </button>

        {/* Couple Settings/Admin */}
        <button
          onClick={onOpenAdmin}
          title="Modo Casal (Gerenciar Lista)"
          className="p-2 rounded-xl bg-white border border-[#2C3B28]/20 hover:bg-[#2C3B28]/5 text-[#2C3B28] transition-all cursor-pointer"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
