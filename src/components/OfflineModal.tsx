import React from 'react';
import { X, Wifi, Download, Smartphone, CheckCircle, Zap, ShieldCheck } from 'lucide-react';
import { GiftItem, WeddingInfo } from '../types';
import { downloadStandaloneOfflineHTML } from '../utils/offlineHtmlGenerator';

interface OfflineModalProps {
  isOpen: boolean;
  onClose: () => void;
  gifts: GiftItem[];
  info: WeddingInfo;
  deferredPrompt?: any;
}

export const OfflineModal: React.FC<OfflineModalProps> = ({
  isOpen,
  onClose,
  gifts,
  info,
  deferredPrompt,
}) => {
  if (!isOpen) return null;

  const handleInstallPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Instalação PWA outcome: ${outcome}`);
    } else {
      alert(
        'Para instalar no celular/computador:\n1. No Chrome ou Safari, clique no menu do navegador (3 pontinhos ou Compartilhar).\n2. Selecione "Adicionar à Tela Inicial" ou "Instalar Aplicativo".'
      );
    }
  };

  const handleDownloadHTML = () => {
    downloadStandaloneOfflineHTML(gifts, info);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs no-print">
      <div className="bg-[#FAF7F0] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#2C3B28]/20 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#2C3B28]/60 hover:text-[#2C3B28] rounded-full hover:bg-[#2C3B28]/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#2D4A27]/10 text-[#2D4A27] flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-cormorant text-2xl font-bold text-[#2C3B28]">
              Acesso 100% Offline
            </h2>
            <p className="text-xs text-[#2C3B28]/70">
              Utilize o aplicativo sem precisar de conexão com a internet
            </p>
          </div>
        </div>

        {/* Status Box */}
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl mb-6">
          <div className="flex items-start gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-900 leading-relaxed">
              <strong className="block font-bold mb-0.5">Modo Offline Ativo neste Navegador</strong>
              Todas as escolhas de presentes e informações estão salvas localmente no seu dispositivo e o Service Worker já armazenou este aplicativo em cache.
            </div>
          </div>
        </div>

        {/* Action Options */}
        <div className="space-y-4">
          {/* Option 1: Standalone HTML Download */}
          <div className="bg-white p-4 rounded-2xl border border-[#2C3B28]/15 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[#2D4A27]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#2C3B28]">
                Baixar Arquivo HTML Único
              </h3>
            </div>
            <p className="text-xs text-[#2C3B28]/80 leading-relaxed">
              Gera um único arquivo <code className="bg-[#2C3B28]/10 px-1 py-0.5 rounded text-[11px] font-mono">.html</code> que pode ser salvo em qualquer computador ou celular. Funciona abrindo direto em qualquer navegador sem internet.
            </p>
            <button
              onClick={handleDownloadHTML}
              className="mt-1 w-full py-2.5 bg-[#2D4A27] hover:bg-[#1C3318] text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Baixar Arquivo Offline (.html)
            </button>
          </div>

          {/* Option 2: PWA Installation */}
          <div className="bg-white p-4 rounded-2xl border border-[#2C3B28]/15 shadow-xs flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-[#2D4A27]" />
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#2C3B28]">
                Instalar App no Celular / PC
              </h3>
            </div>
            <p className="text-xs text-[#2C3B28]/80 leading-relaxed">
              Adiciona o ícone do aplicativo à sua tela inicial para acesso rápido e instantâneo sem precisar de rede.
            </p>
            <button
              onClick={handleInstallPWA}
              className="mt-1 w-full py-2.5 bg-[#FAF7F0] border border-[#2C3B28]/30 hover:bg-[#2C3B28]/5 text-[#2C3B28] font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-[#2D4A27]" />
              Instalar / Adicionar à Tela Inicial
            </button>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#2C3B28]/15 flex items-center justify-between text-[11px] text-[#2C3B28]/60">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Dados guardados com segurança
          </span>
          <button
            onClick={onClose}
            className="font-bold text-[#2C3B28] hover:underline cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
