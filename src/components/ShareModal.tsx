import React, { useState } from 'react';
import { WeddingInfo } from '../types';
import { X, Share2, Copy, Check, MessageCircle, ExternalLink, QrCode } from 'lucide-react';

interface ShareModalProps {
  info: WeddingInfo;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ info, onClose }) => {
  const [copied, setCopied] = useState(false);
  const currentUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const whatsappMessage = encodeURIComponent(
    `Olá! Confiras a Lista de Presentes para o casamento de ${info.coupleNames}:\n\n"${info.headlineQuote}"\n\nAcesse o link abaixo para escolher seu presente:\n${currentUrl}`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;

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
            <Share2 className="w-4 h-4" />
            Compartilhar Lista
          </div>
          <h3 className="font-cormorant text-2xl font-bold">Enviar para os Convidados</h3>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">
          <p className="text-xs text-[#2C3B28]/80 leading-relaxed">
            Compartilhe o link da lista com amigos e familiares via WhatsApp ou redes sociais.
          </p>

          {/* Direct WhatsApp Share */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5" />
            Enviar via WhatsApp
          </a>

          {/* Copy Link Input */}
          <div className="bg-white border border-[#2C3B28]/20 rounded-xl p-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#2C3B28]/70 mb-1">
              Link Direto da Página
            </label>
            <div className="flex items-center justify-between gap-2 bg-[#FAF7F0] p-2 rounded-lg border border-[#2C3B28]/10">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="text-xs font-mono text-[#2C3B28] bg-transparent w-full focus:outline-none select-all"
              />
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
                    Copiar
                  </>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 bg-[#2C3B28]/10 text-[#2C3B28] font-bold text-xs rounded-xl hover:bg-[#2C3B28]/20 transition-all cursor-pointer mt-1"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
