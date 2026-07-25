import React, { useState } from 'react';
import { GiftItem, CategoryType } from '../types';
import { Gift, CheckCircle2, Search, Filter, Sparkles, HeartHandshake, DollarSign, ExternalLink, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InteractiveListProps {
  gifts: GiftItem[];
  categories: CategoryType[];
  onReserveClick: (gift: GiftItem) => void;
  onUnreserveClick: (gift: GiftItem) => void;
  onFinishPDF?: () => void;
}

export const InteractiveList: React.FC<InteractiveListProps> = ({
  gifts,
  categories,
  onReserveClick,
  onUnreserveClick,
  onFinishPDF,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'AVAILABLE' | 'RESERVED'>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter gifts
  const filteredGifts = gifts.filter((gift) => {
    const matchesCategory =
      selectedCategory === 'TODOS' || gift.category.toUpperCase() === selectedCategory.toUpperCase();
    const matchesStatus =
      statusFilter === 'ALL' ||
      (statusFilter === 'AVAILABLE' && !gift.isReserved) ||
      (statusFilter === 'RESERVED' && gift.isReserved);
    const matchesSearch = gift.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  // Group items by category for categorized layout view
  const categorizedGroups = categories.reduce((acc, cat) => {
    const items = filteredGifts.filter((g) => g.category.toUpperCase() === cat.toUpperCase());
    if (items.length > 0) {
      acc[cat] = items;
    }
    return acc;
  }, {} as Record<string, GiftItem[]>);

  // Category badge colors/styles
  const getCategoryTheme = (cat: string) => {
    switch (cat.toUpperCase()) {
      case 'SALA':
        return {
          headerBg: 'bg-[#2D4A27]',
          border: 'border-[#2D4A27]',
          accent: 'text-[#2D4A27]',
          badge: 'bg-[#2D4A27]/10 text-[#2D4A27]',
        };
      case 'COZINHA':
        return {
          headerBg: 'bg-[#243E20]',
          border: 'border-[#243E20]',
          accent: 'text-[#243E20]',
          badge: 'bg-[#243E20]/10 text-[#243E20]',
        };
      case 'QUARTO':
        return {
          headerBg: 'bg-[#1C3318]',
          border: 'border-[#1C3318]',
          accent: 'text-[#1C3318]',
          badge: 'bg-[#1C3318]/10 text-[#1C3318]',
        };
      default:
        return {
          headerBg: 'bg-[#3E5C38]',
          border: 'border-[#3E5C38]',
          accent: 'text-[#3E5C38]',
          badge: 'bg-[#3E5C38]/10 text-[#3E5C38]',
        };
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pb-16">
      {/* Top Concluir Action Banner (Above Category Tabs) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/90 backdrop-blur-md border border-[#2C3B28]/20 rounded-2xl p-4 shadow-xs mb-6">
        <div className="flex items-center gap-3 text-left w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-[#2D4A27]/10 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5 text-[#2D4A27]" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#2C3B28]">
              Finalizar Escolhas
            </h3>
            <p className="text-xs text-[#2C3B28]/70">
              Gere o PDF com os presentes selecionados
            </p>
          </div>
        </div>
        <button
          onClick={onFinishPDF}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-[#2D4A27] hover:bg-[#1C3318] text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <FileText className="w-4 h-4 text-emerald-200" />
          Concluir
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#2C3B28]/15 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#2C3B28]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar presente (ex: Batedeira...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF7F0] border border-[#2C3B28]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2C3B28] text-[#2C3B28] placeholder:text-[#2C3B28]/40"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory('TODOS')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                selectedCategory === 'TODOS'
                  ? 'bg-[#2C3B28] text-white shadow-xs'
                  : 'bg-[#2C3B28]/5 text-[#2C3B28] hover:bg-[#2C3B28]/15'
              }`}
            >
              TODOS
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat.toUpperCase())}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                  selectedCategory === cat.toUpperCase()
                    ? 'bg-[#2C3B28] text-white shadow-xs'
                    : 'bg-[#2C3B28]/5 text-[#2C3B28] hover:bg-[#2C3B28]/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status Filter Toggle */}
          <div className="flex items-center gap-1 bg-[#2C3B28]/5 p-1 rounded-xl text-xs font-medium w-full md:w-auto justify-center">
            <button
              onClick={() => setStatusFilter('ALL')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'ALL' ? 'bg-white font-bold text-[#2C3B28] shadow-2xs' : 'text-[#2C3B28]/70'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setStatusFilter('AVAILABLE')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'AVAILABLE' ? 'bg-white font-bold text-emerald-800 shadow-2xs' : 'text-[#2C3B28]/70'
              }`}
            >
              Disponíveis
            </button>
            <button
              onClick={() => setStatusFilter('RESERVED')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                statusFilter === 'RESERVED' ? 'bg-white font-bold text-amber-800 shadow-2xs' : 'text-[#2C3B28]/70'
              }`}
            >
              Presenteados
            </button>
          </div>
        </div>
      </div>

      {/* Main Category Columns or Empty State */}
      {Object.keys(categorizedGroups).length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-[#2C3B28]/20 p-8">
          <Gift className="w-12 h-12 text-[#2C3B28]/30 mx-auto mb-3" />
          <h3 className="font-cormorant text-2xl font-bold text-[#2C3B28]">Nenhum presente encontrado</h3>
          <p className="text-sm text-[#2C3B28]/60 mt-1">
            Tente ajustar os termos de busca ou mudar o filtro selecionado.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {(Object.entries(categorizedGroups) as [string, GiftItem[]][]).map(([categoryName, items]) => {
            const theme = getCategoryTheme(categoryName);

            return (
              <div key={categoryName} className="flex flex-col gap-3">
                {/* Category Header Box matching original design */}
                <div
                  className={`${theme.headerBg} text-[#FAF7F0] py-3 px-4 rounded-xl text-center shadow-xs relative overflow-hidden`}
                >
                  <h3 className="font-cormorant text-xl font-bold tracking-widest uppercase">
                    {categoryName}
                  </h3>
                  <span className="text-[10px] uppercase font-sans tracking-wider opacity-80 block mt-0.5">
                    {items.length} {items.length === 1 ? 'item' : 'itens'}
                  </span>
                </div>

                {/* Items List */}
                <div className="flex flex-col gap-2.5">
                  <AnimatePresence>
                    {items.map((gift) => (
                      <motion.div
                        key={gift.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className={`group relative bg-white border-2 rounded-2xl p-3.5 transition-all duration-200 ${
                          gift.isReserved
                            ? 'border-emerald-200 bg-emerald-50/40 shadow-2xs'
                            : 'border-[#2C3B28]/20 hover:border-[#2C3B28] hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h4
                                className={`font-cormorant text-lg font-bold truncate ${
                                  gift.isReserved ? 'text-emerald-900 line-through opacity-75' : 'text-[#2C3B28]'
                                }`}
                              >
                                {gift.name}
                              </h4>
                              {gift.isReserved && (
                                <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
                                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                                  Presenteado
                                </span>
                              )}
                            </div>

                            {/* Reserved by info */}
                            {gift.isReserved && gift.reservedBy && (
                              <p className="text-xs text-emerald-800 font-medium italic mt-0.5 truncate">
                                Com carinho por: <span className="font-bold">{gift.reservedBy}</span>
                              </p>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="shrink-0 flex items-center gap-1.5">
                            {!gift.isReserved ? (
                              <button
                                onClick={() => onReserveClick(gift)}
                                className="flex items-center gap-1 px-3 py-1.5 bg-[#2C3B28] hover:bg-[#1C2A19] text-white text-xs font-medium rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
                              >
                                <Gift className="w-3.5 h-3.5" />
                                Presentear
                              </button>
                            ) : (
                              <button
                                onClick={() => onUnreserveClick(gift)}
                                title="Desfazer escolha"
                                className="px-2.5 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100/50 text-emerald-800 text-xs font-semibold rounded-xl transition-all cursor-pointer"
                              >
                                Alterar
                              </button>
                            )}
                          </div>
                        </div>

                        {/* Optional Message if reserved */}
                        {gift.isReserved && gift.reservedMessage && (
                          <div className="mt-2 pt-2 border-t border-emerald-200/60 text-xs text-emerald-900/80 italic font-serif">
                            "{gift.reservedMessage}"
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Concluir Section (End of page) */}
      <div className="mt-12 pt-8 border-t border-[#2C3B28]/20 flex flex-col items-center justify-center text-center gap-3 bg-white/80 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-[#2C3B28]/15 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-[#2D4A27]/10 flex items-center justify-center mb-1">
          <CheckCircle2 className="w-6 h-6 text-[#2D4A27]" />
        </div>
        <h3 className="font-cormorant text-2xl font-bold text-[#2C3B28]">
          Concluiu suas escolhas?
        </h3>
        <p className="text-xs sm:text-sm text-[#2C3B28]/80 max-w-md">
          Clique no botão abaixo para gerar automaticamente o PDF com a lista dos presentes selecionados.
        </p>
        <button
          onClick={onFinishPDF}
          className="mt-2 flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#2D4A27] hover:bg-[#1C3318] text-white text-sm sm:text-base font-bold rounded-2xl shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <FileText className="w-5 h-5 text-emerald-200" />
          Concluir
        </button>
      </div>
    </div>
  );
};
