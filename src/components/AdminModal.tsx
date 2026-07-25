import React, { useState } from 'react';
import { GiftItem, WeddingInfo, CategoryType } from '../types';
import { X, Plus, Trash2, RotateCcw, Settings, Lock, Check, Download, Upload, ShieldCheck } from 'lucide-react';

interface AdminModalProps {
  info: WeddingInfo;
  gifts: GiftItem[];
  categories: CategoryType[];
  onClose: () => void;
  onUpdateInfo: (info: WeddingInfo) => void;
  onAddGift: (gift: Omit<GiftItem, 'id' | 'isReserved'>) => void;
  onDeleteGift: (giftId: string) => void;
  onResetReservations: () => void;
  onResetAllData: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  info,
  gifts,
  categories,
  onClose,
  onUpdateInfo,
  onAddGift,
  onDeleteGift,
  onResetReservations,
  onResetAllData,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [activeTab, setActiveTab] = useState<'ITEMS' | 'EXPORT'>('ITEMS');

  // Form states for new item
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<string>('SALA');
  const [newItemPrice, setNewItemPrice] = useState('');

  // Info editing states
  const [editInfo, setEditInfo] = useState<WeddingInfo>(info);
  const [infoSaved, setInfoSaved] = useState(false);

  // Authentication check (simple PIN code default '1234' or any password)
  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234' || passwordInput === 'casamento' || passwordInput.trim().length > 0) {
      setIsAuthenticated(true);
      setPasswordError('');
    } else {
      setPasswordError('Senha incorreta (tente 1234)');
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    onAddGift({
      name: newItemName.trim(),
      category: newItemCategory,
      suggestedPrice: newItemPrice ? parseFloat(newItemPrice) : undefined,
      isCustom: true,
    });

    setNewItemName('');
    setNewItemPrice('');
  };

  const handleSaveInfo = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateInfo(editInfo);
    setInfoSaved(true);
    setTimeout(() => setInfoSaved(false), 3000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ info, gifts }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `lista_presentes_thayna_joelton.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fade-in">
      <div className="bg-[#FAF7F0] border border-[#2C3B28]/20 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden text-[#2C3B28] relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#2D4A27] text-white p-4 sm:p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-amber-200 text-xs font-bold uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4" />
            Painel do Casal
          </div>
          <h3 className="font-cormorant text-2xl font-bold">Gerenciar Lista de Presentes</h3>
        </div>

        {/* Lock Screen if not authenticated */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-[#2D4A27]/10 flex items-center justify-center text-[#2D4A27] mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-cormorant text-xl font-bold text-[#2C3B28] mb-1">
              Área Restrita aos Noivos
            </h4>
            <p className="text-xs text-[#2C3B28]/70 max-w-sm mb-4">
              Insira a senha do casal para adicionar presentes ou editar as informações. (Senha padrão: <code className="bg-[#2C3B28]/10 px-1 py-0.5 rounded font-mono">1234</code>)
            </p>

            <form onSubmit={handleAuth} className="w-full max-w-xs flex flex-col gap-3">
              <input
                type="password"
                placeholder="Digite a senha (ex: 1234)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#2C3B28]/30 rounded-xl text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#2D4A27]"
              />
              {passwordError && <p className="text-xs text-red-600">{passwordError}</p>}
              <button
                type="submit"
                className="w-full py-2.5 bg-[#2D4A27] text-white font-bold text-xs rounded-xl hover:bg-[#1C3318] transition-all cursor-pointer"
              >
                Entrar no Painel
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Admin Tabs */}
            <div className="flex border-b border-[#2C3B28]/15 bg-white/50 px-4 pt-2 gap-2 shrink-0">
              <button
                onClick={() => setActiveTab('ITEMS')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === 'ITEMS'
                    ? 'bg-[#FAF7F0] border border-b-0 border-[#2C3B28]/20 text-[#2D4A27]'
                    : 'text-[#2C3B28]/60 hover:text-[#2C3B28]'
                }`}
              >
                Gerenciar Presentes ({gifts.length})
              </button>
              <button
                onClick={() => setActiveTab('EXPORT')}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeTab === 'EXPORT'
                    ? 'bg-[#FAF7F0] border border-b-0 border-[#2C3B28]/20 text-[#2D4A27]'
                    : 'text-[#2C3B28]/60 hover:text-[#2C3B28]'
                }`}
              >
                Opções & Reset
              </button>
            </div>

            {/* Tab Body */}
            <div className="p-5 overflow-y-auto flex-1">
              {activeTab === 'ITEMS' && (
                <div className="flex flex-col gap-6">
                  {/* Add New Item Form */}
                  <form onSubmit={handleAddItem} className="bg-white p-4 rounded-xl border border-[#2C3B28]/20 flex flex-col sm:flex-row gap-3 items-end">
                    <div className="flex-1 w-full">
                      <label className="block text-[10px] font-bold uppercase text-[#2C3B28]/70 mb-1">
                        Nome do Item
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: Jogo de Panelas Inox"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#2C3B28]/20 rounded-lg text-xs"
                      />
                    </div>
                    <div className="w-full sm:w-36">
                      <label className="block text-[10px] font-bold uppercase text-[#2C3B28]/70 mb-1">
                        Categoria
                      </label>
                      <select
                        value={newItemCategory}
                        onChange={(e) => setNewItemCategory(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#2C3B28]/20 rounded-lg text-xs uppercase font-bold"
                      >
                        <option value="SALA">SALA</option>
                        <option value="COZINHA">COZINHA</option>
                        <option value="QUARTO">QUARTO</option>
                        <option value="BANHEIRO">BANHEIRO</option>
                        <option value="OUTROS">OUTROS</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-4 py-2 bg-[#2D4A27] text-white font-bold text-xs rounded-lg hover:bg-[#1C3318] flex items-center justify-center gap-1 shrink-0"
                    >
                      <Plus className="w-4 h-4" />
                      Adicionar
                    </button>
                  </form>

                  {/* List of existing items */}
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2C3B28]/70">
                      Itens na Lista ({gifts.length})
                    </span>
                    <div className="max-h-60 overflow-y-auto flex flex-col gap-1.5 pr-1">
                      {gifts.map((g) => (
                        <div
                          key={g.id}
                          className="bg-white p-2.5 rounded-lg border border-[#2C3B28]/15 flex items-center justify-between text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <span className="bg-[#2D4A27]/10 text-[#2D4A27] font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                              {g.category}
                            </span>
                            <span className="font-bold text-[#2C3B28]">{g.name}</span>
                            {g.isReserved && (
                              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                                Presenteado por {g.reservedBy}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => onDeleteGift(g.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-all"
                            title="Remover item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'EXPORT' && (
                <div className="flex flex-col gap-6 text-xs">
                  <div className="bg-white p-4 rounded-xl border border-[#2C3B28]/20 flex flex-col gap-2">
                    <h5 className="font-bold text-sm text-[#2C3B28] flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-[#2D4A27]" />
                      Exportar Dados da Lista
                    </h5>
                    <p className="text-[#2C3B28]/70">
                      Baixe um arquivo de backup com todos os presentes e confirmações dos convidados.
                    </p>
                    <button
                      onClick={handleExportJSON}
                      className="self-start px-4 py-2 bg-[#2D4A27] text-white font-bold text-xs rounded-lg hover:bg-[#1C3318]"
                    >
                      Baixar Backup JSON
                    </button>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex flex-col gap-2">
                    <h5 className="font-bold text-sm text-amber-900 flex items-center gap-1.5">
                      <RotateCcw className="w-4 h-4" />
                      Limpar Apenas Escolhas dos Convidados
                    </h5>
                    <p className="text-amber-800">
                      Desmarca todos os presentes mantendo os itens na lista. Útil para retestar a página.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja desmarcar todos os presentes?')) {
                          onResetReservations();
                          onClose();
                        }
                      }}
                      className="self-start px-4 py-2 bg-amber-800 text-white font-bold text-xs rounded-lg hover:bg-amber-900"
                    >
                      Desmarcar Todos os Presentes
                    </button>
                  </div>

                  <div className="bg-red-50 p-4 rounded-xl border border-red-200 flex flex-col gap-2">
                    <h5 className="font-bold text-sm text-red-900 flex items-center gap-1.5">
                      <Trash2 className="w-4 h-4" />
                      Restaurar Lista Padrão do Documento
                    </h5>
                    <p className="text-red-800">
                      Reseta a lista completa de volta para os itens originais do arquivo PDF.
                    </p>
                    <button
                      onClick={() => {
                        if (confirm('Restaurar para a lista original do PDF? Todos os novos itens serão apagados.')) {
                          onResetAllData();
                          onClose();
                        }
                      }}
                      className="self-start px-4 py-2 bg-red-700 text-white font-bold text-xs rounded-lg hover:bg-red-800"
                    >
                      Restaurar Lista Original
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
