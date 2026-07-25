import React from 'react';
import { GiftItem, WeddingInfo } from '../types';
import { BotanicalFrame } from './BotanicalFrame';
import { Check, Sparkles, Printer } from 'lucide-react';

interface DigitalPaperCardProps {
  info: WeddingInfo;
  gifts: GiftItem[];
  onItemClick: (gift: GiftItem) => void;
}

export const DigitalPaperCard: React.FC<DigitalPaperCardProps> = ({ info, gifts, onItemClick }) => {
  const salaItems = gifts.filter((g) => g.category.toUpperCase() === 'SALA');
  const cozinhaItems = gifts.filter((g) => g.category.toUpperCase() === 'COZINHA');
  const quartoItems = gifts.filter((g) => g.category.toUpperCase() === 'QUARTO');
  const customItems = gifts.filter(
    (g) => !['SALA', 'COZINHA', 'QUARTO'].includes(g.category.toUpperCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-4 pb-12">
      {/* Print / Save Hint Bar */}
      <div className="flex justify-between items-center mb-4 no-print text-xs text-[#2C3B28]/70 px-2">
        <span className="font-medium">
          💡 Clique em qualquer item para presentear ou ver status.
        </span>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#2C3B28]/20 rounded-xl hover:bg-[#2C3B28]/5 text-[#2C3B28] font-medium shadow-2xs transition-all cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          Imprimir Folha
        </button>
      </div>

      {/* The Digital Paper Frame matching exact aspect & styling of uploaded document */}
      <div className="print-page relative bg-[#FAF7F0] border-2 border-[#2C3B28]/20 rounded-2xl shadow-xl p-6 sm:p-10 overflow-hidden text-[#2C3B28]">
        {/* Botanical leaf corner artwork decorations */}
        <BotanicalFrame position="top-left" className="absolute top-2 left-2 w-20 h-20 sm:w-28 sm:h-28" />
        <BotanicalFrame position="top-right" className="absolute top-2 right-2 w-20 h-20 sm:w-28 sm:h-28" />
        <BotanicalFrame position="bottom-left" className="absolute bottom-2 left-2 w-24 h-24 sm:w-36 sm:h-36" />
        <BotanicalFrame position="bottom-right" className="absolute bottom-2 right-2 w-24 h-24 sm:w-36 sm:h-36" />

        {/* Paper Content Header */}
        <div className="relative z-10 text-center max-w-xl mx-auto mb-6">
          {/* Top Couples Emblem Wreath */}
          <div className="inline-flex flex-col items-center justify-center mb-3">
            <div className="w-16 h-16 rounded-full border border-[#2C3B28]/40 p-1 flex items-center justify-center bg-[#FAF7F0]">
              <div className="w-full h-full rounded-full bg-[#2D4A27] text-white flex flex-col items-center justify-center">
                <span className="font-cormorant text-[10px] tracking-widest uppercase opacity-90">Thayná</span>
                <span className="font-display text-xs text-amber-200 font-bold">&</span>
                <span className="font-cormorant text-[10px] tracking-widest uppercase opacity-90">Joelton</span>
              </div>
            </div>
            <h1 className="font-cormorant text-2xl sm:text-3xl font-bold tracking-widest text-[#2D4A27] uppercase mt-2">
              {info.coupleNames}
            </h1>
          </div>

          <p className="font-cormorant italic text-base sm:text-lg text-[#2C3B28]/90 font-medium">
            "{info.headlineQuote}"
          </p>
          <p className="font-sans text-xs tracking-wide text-[#2C3B28]/70 mt-0.5 uppercase">
            {info.subQuote}
          </p>

          <div className="mt-4 border-b border-[#2C3B28]/30 pb-2">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-bold tracking-widest text-[#2D4A27] uppercase">
              LISTA DE PRESENTES
            </h2>
          </div>
        </div>

        {/* Columns matching original layout: SALA | COZINHA | QUARTO */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-6">
          {/* SALA COLUMN */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#2D4A27] text-white py-2 px-3 rounded-xl text-center shadow-xs">
              <h3 className="font-cormorant text-xl font-bold tracking-widest uppercase">SALA</h3>
            </div>

            <div className="flex flex-col gap-2">
              {salaItems.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => onItemClick(gift)}
                  className={`w-full py-2 px-4 rounded-xl text-center font-cormorant text-lg font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    gift.isReserved
                      ? 'bg-emerald-100/90 border-emerald-400 text-emerald-900 line-through'
                      : 'bg-white border-[#2C3B28]/30 text-[#2C3B28] hover:border-[#2D4A27] hover:shadow-xs hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span>{gift.name}</span>
                  {gift.isReserved && (
                    <span className="inline-flex items-center text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full no-underline">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* COZINHA COLUMN */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#2D4A27] text-white py-2 px-3 rounded-xl text-center shadow-xs">
              <h3 className="font-cormorant text-xl font-bold tracking-widest uppercase">COZINHA</h3>
            </div>

            <div className="flex flex-col gap-2">
              {cozinhaItems.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => onItemClick(gift)}
                  className={`w-full py-2 px-4 rounded-xl text-center font-cormorant text-lg font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    gift.isReserved
                      ? 'bg-emerald-100/90 border-emerald-400 text-emerald-900 line-through'
                      : 'bg-white border-[#2C3B28]/30 text-[#2C3B28] hover:border-[#2D4A27] hover:shadow-xs hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span>{gift.name}</span>
                  {gift.isReserved && (
                    <span className="inline-flex items-center text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full no-underline">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* QUARTO COLUMN */}
          <div className="flex flex-col gap-2.5">
            <div className="bg-[#2D4A27] text-white py-2 px-3 rounded-xl text-center shadow-xs">
              <h3 className="font-cormorant text-xl font-bold tracking-widest uppercase">QUARTO</h3>
            </div>

            <div className="flex flex-col gap-2">
              {quartoItems.map((gift) => (
                <button
                  key={gift.id}
                  onClick={() => onItemClick(gift)}
                  className={`w-full py-2 px-4 rounded-xl text-center font-cormorant text-lg font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    gift.isReserved
                      ? 'bg-emerald-100/90 border-emerald-400 text-emerald-900 line-through'
                      : 'bg-white border-[#2C3B28]/30 text-[#2C3B28] hover:border-[#2D4A27] hover:shadow-xs hover:bg-[#FAF7F0]'
                  }`}
                >
                  <span>{gift.name}</span>
                  {gift.isReserved && (
                    <span className="inline-flex items-center text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full no-underline">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              ))}

              {/* Custom Category Items if added by couple */}
              {customItems.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#2C3B28]/20">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2D4A27] block mb-2 text-center">
                    OUTROS PRESENTES
                  </span>
                  {customItems.map((gift) => (
                    <button
                      key={gift.id}
                      onClick={() => onItemClick(gift)}
                      className={`w-full py-2 px-4 mb-2 rounded-xl text-center font-cormorant text-lg font-bold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                        gift.isReserved
                          ? 'bg-emerald-100/90 border-emerald-400 text-emerald-900 line-through'
                          : 'bg-white border-[#2C3B28]/30 text-[#2C3B28] hover:border-[#2D4A27] hover:shadow-xs hover:bg-[#FAF7F0]'
                      }`}
                    >
                      <span>{gift.name}</span>
                      {gift.isReserved && (
                        <span className="inline-flex items-center text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded-full no-underline">
                          <Check className="w-3 h-3" />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
