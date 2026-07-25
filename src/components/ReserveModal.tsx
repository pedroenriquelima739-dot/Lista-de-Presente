import React from 'react';
import { GiftItem } from '../types';
import { X, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReserveModalProps {
  gift: GiftItem | null;
  onClose: () => void;
  onConfirm: (giftId: string) => void;
}

export const ReserveModal: React.FC<ReserveModalProps> = ({
  gift,
  onClose,
  onConfirm,
}) => {
  if (!gift) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger confetti explosion
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2D4A27', '#3E5C38', '#F3E5AB', '#ffffff'],
    });

    onConfirm(gift.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF7F0] border border-[#2C3B28]/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-[#2C3B28] relative">
        {/* Header */}
        <div className="bg-[#2D4A27] text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-widest mb-1">
            <Sparkles className="w-4 h-4" />
            Presentear o Casal
          </div>
          <h3 className="font-cormorant text-2xl font-bold">{gift.name}</h3>
          <p className="text-xs text-white/80 mt-0.5">Categoria: {gift.category}</p>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="text-center py-2">
            <p className="text-sm font-medium text-[#2C3B28] leading-relaxed">
              Deseja confirmar a escolha do item <span className="font-bold font-cormorant text-lg text-[#2D4A27]">"{gift.name}"</span>?
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 mt-2 pt-3 border-t border-[#2C3B28]/15">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#2C3B28]/70 hover:text-[#2C3B28] cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#2D4A27] hover:bg-[#1C3318] text-white text-xs font-bold rounded-xl shadow-md transition-all active:scale-95 cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
              Confirmar Presente
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

