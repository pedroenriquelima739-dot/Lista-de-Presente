import { GiftItem, WeddingInfo } from '../types';

export function downloadStandaloneOfflineHTML(gifts: GiftItem[], info: WeddingInfo) {
  const giftsJson = JSON.stringify(gifts);
  const infoJson = JSON.stringify(info);

  const htmlContent = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de Presentes | ${info.coupleNames || 'Thayná & Joelton'}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Montserrat', sans-serif; background-color: #FAF7F2; color: #2C3B28; }
    .font-cormorant { font-family: 'Cormorant Garamond', serif; }
  </style>
</head>
<body class="min-h-screen pb-12">
  <!-- Offline Badge Header -->
  <div class="bg-[#2D4A27] text-white text-center py-2 px-4 text-xs font-bold flex items-center justify-center gap-2 shadow-sm">
    <span>⚡ Versão Offline Independente &bull; Dados salvos neste dispositivo</span>
  </div>

  <div class="max-w-4xl mx-auto px-4 pt-8">
    <!-- Header -->
    <header class="text-center mb-8 bg-white/90 p-6 rounded-3xl border border-[#2C3B28]/15 shadow-sm">
      <h1 class="font-cormorant text-4xl sm:text-5xl font-bold text-[#2D4A27] mb-2">${info.coupleNames || 'Thayná & Joelton'}</h1>
      <p class="text-xs uppercase tracking-widest text-[#2C3B28]/70 font-semibold mb-3">Chá de Casa Nova & Lista de Presentes</p>
      <p class="text-sm italic text-[#2C3B28]/80 max-w-lg mx-auto">"${info.headlineQuote || ''}"</p>
    </header>

    <!-- App Container -->
    <div id="app" class="space-y-6"></div>
  </div>

  <!-- Footer -->
  <footer class="mt-12 text-center text-xs text-[#2C3B28]/60 space-y-1">
    <p>Lista de Presentes Oficial &bull; Todos os direitos reservados</p>
    <p class="text-[#2D4A27] font-semibold">Desenvolvido por: Pedro H.S. Lima</p>
  </footer>

  <script>
    // Initial Data
    let gifts = JSON.parse(localStorage.getItem('gifts_thayna_joelton') || '${giftsJson.replace(/'/g, "\\'")}');
    const categories = ['TODOS', 'SALA', 'COZINHA', 'QUARTO', 'BANHEIRO', 'LAVANDERIA', 'DIVERSOS'];
    let selectedCategory = 'TODOS';

    function saveGifts() {
      localStorage.setItem('gifts_thayna_joelton', JSON.stringify(gifts));
      render();
    }

    function toggleReserve(id) {
      gifts = gifts.map(g => {
        if (g.id === id) {
          return { ...g, isReserved: !g.isReserved, reservedAt: !g.isReserved ? new Date().toLocaleDateString('pt-BR') : undefined };
        }
        return g;
      });
      saveGifts();
    }

    function render() {
      const filtered = gifts.filter(g => selectedCategory === 'TODOS' || g.category === selectedCategory);
      const reservedCount = gifts.filter(g => g.isReserved).length;

      let html = \`
        <div class="bg-white p-4 rounded-2xl border border-[#2C3B28]/15 shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs font-bold">
          <div class="flex items-center gap-2 text-[#2D4A27]">
            <span>🎁 Total de Presentes: \${gifts.length}</span>
            <span>&bull;</span>
            <span>✅ Selecionados: \${reservedCount}</span>
          </div>
          <button onclick="window.print()" class="px-4 py-2 bg-[#2D4A27] text-white rounded-xl hover:bg-[#1C3318] transition">Imprimir / Salvar PDF</button>
        </div>

        <div class="flex flex-wrap gap-2 justify-center py-2">
          \${categories.map(cat => \`
            <button onclick="selectedCategory = '\${cat}'; render();" class="px-4 py-2 rounded-xl text-xs font-bold transition \${selectedCategory === cat ? 'bg-[#2D4A27] text-white shadow-sm' : 'bg-white border border-[#2C3B28]/20 text-[#2C3B28]'}">
              \${cat}
            </button>
          \`).join('')}
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          \${filtered.map(item => \`
            <div class="p-4 rounded-2xl border transition \${item.isReserved ? 'bg-emerald-50/70 border-emerald-300' : 'bg-white border-[#2C3B28]/20 shadow-sm'} flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-[#2C3B28]/10 text-[#2C3B28]">\${item.category}</span>
                  \${item.isReserved ? '<span class="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">✓ Selecionado</span>' : ''}
                </div>
                <h3 class="font-bold text-sm text-[#2C3B28] \${item.isReserved ? 'line-through opacity-70' : ''}">\${item.name}</h3>
              </div>
              <button onclick="toggleReserve('\${item.id}')" class="mt-4 w-full py-2.5 rounded-xl font-bold text-xs transition \${item.isReserved ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' : 'bg-[#2D4A27] text-white hover:bg-[#1C3318]'}">
                \${item.isReserved ? 'Desmarcar' : 'Presentear'}
              </button>
            </div>
          \`).join('')}
        </div>
      \`;

      document.getElementById('app').innerHTML = html;
    }

    render();
  </script>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `lista_presentes_thayna_joelton_offline.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
