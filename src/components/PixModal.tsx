import React, { useState } from 'react';
import { WeddingInfo, GiftItem } from '../types';
import { X, QrCode, Copy, Check, Heart, Sparkles, DollarSign } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PixModalProps {
  info: WeddingInfo;
  selectedGift?: GiftItem | null;
  onClose: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({ info, selectedGift, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [customAmount, setCustomAmount] = useState<string>(
    selectedGift?.suggestedPrice ? selectedGift.suggestedPrice.toString() : '100'
  );

  const pixKey = info.pixKey || 'thayna.joelton.casamento@gmail.com';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF7F0] border border-[#2C3B28]/20 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden text-[#2C3B28] relative">
        {/* Header */}
        <div className="bg-emerald-800 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-emerald-200 text-xs font-bold uppercase tracking-widest mb-1">
            <QrCode className="w-4 h-4" />
            Presente em Dinheiro / PIX
          </div>
          <h3 className="font-cormorant text-2xl font-bold">
            {selectedGift ? `PIX para ${selectedGift.name}` : 'Presentear via PIX'}
          </h3>
          <p className="text-xs text-white/80 mt-0.5">
            Sua contribuição ajudará na construção do nosso novo lar!
          </p>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-center">
          {/* Simulated QR Code card */}
          <div className="bg-white p-4 rounded-2xl border border-[#2C3B28]/15 shadow-xs flex flex-col items-center justify-center max-w-[220px] mx-auto w-full">
            <div className="w-40 h-40 bg-emerald-950 p-2 rounded-xl flex items-center justify-center relative overflow-hidden group">
              {/* QR Code visual simulation using SVG */}
              <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                <rect x="35" y="5" width="10" height="20" />
                <rect x="50" y="15" width="15" height="10" />
                <rect x="35" y="35" width="30" height="30" />
                <rect x="70" y="35" width="25" height="15" />
                <rect x="70" y="55" width="15" height="20" />
                <rect x="35" y="70" width="15" height="25" />
                <rect x="55" y="75" width="40" height="10" />
                <rect x="85" y="88" width="10" height="10" />
              </svg>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-white font-bold bg-emerald-800 px-2 py-1 rounded-full">
                  Copiar Chave
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#2C3B28]/60 font-medium mt-2">
              Escaneie ou copie a chave abaixo
            </p>
          </div>

          {/* Pix Key Info */}
          <div className="bg-white border border-[#2C3B28]/20 rounded-xl p-3 text-left">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2C3B28]/70 mb-1">
              Chave PIX ({info.pixBank || 'E-mail'})
            </label>
            <div className="flex items-center justify-between gap-2 bg-[#FAF7F0] p-2.5 rounded-lg border border-[#2C3B28]/10">
              <span className="text-xs font-mono font-bold text-[#2C3B28] truncate select-all">
                {pixKey}
              </span>
              <button
                onClick={handleCopy}
                className={`flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#2D4A27] text-white hover:bg-[#1C3318]'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar Chave
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Account Holder Info */}
          <div className="text-xs text-[#2C3B28]/80 text-left bg-[#2C3B28]/5 p-3 rounded-xl flex flex-col gap-1">
            <div className="flex justify-between">
              <span>Favorecidos:</span>
              <span className="font-bold">{info.pixName || 'Thayná & Joelton'}</span>
            </div>
            <div className="flex justify-between">
              <span>Instituição:</span>
              <span className="font-bold">{info.pixBank || 'Banco do Brasil / Nubank'}</span>
            </div>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#2C3B28] text-white font-bold text-xs rounded-xl hover:bg-[#1C3318] transition-all cursor-pointer mt-1"
          >
            Concluído
          </button>
        </div>
      </div>
    </div>
  );
};
