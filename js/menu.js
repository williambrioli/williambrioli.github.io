// js/menu.js (versão resiliente)
// =====================================
// Carrega o menu.html em TODAS as páginas
// Tenta vários caminhos (root, relativo, subpastas) e resolve automaticamente.
// =====================================

async function fetchAny(pathCandidates, opts = {}) {
  for (const p of pathCandidates) {
    try {
      const res = await fetch(p, opts);
      if (res.ok) {
        console.info('[menu] encontrado em:', p);
        return { res, path: p };
      } else {
        console.debug('[menu] tentou e falhou (status):', p, res.status);
      }
    } catch (err) {
      console.debug('[menu] erro ao tentar:', p, err && err.message);
    }
  }
  return null;
}

async function carregarMenu() {
  // Cria um <header> no topo da página (se já existir, não cria outra)
  let header = document.querySelector('header[data-injected-menu="1"]');
  if (!header) {
    header = document.createElement('header');
    header.setAttribute('data-injected-menu', '1');
    document.body.prepend(header);
  }

  // caminhos a tentar (ordem: raiz absoluta, relativo à página, subpastas)
  const candidates = [
    '/menu.html',
    'menu.html',
    '../menu.html',
    '../../menu.html',
    '../../../menu.html'
  ];

  // opção: sem cache para evitar resultados velhos
  const found = await fetchAny(candidates, { cache: 'no-store' });

  if (!found) {
    console.error('[menu] Não foi possível localizar menu.html. Verifique onde o arquivo está publicado e se o caminho /menu.html é acessível.');
    header.innerHTML = ''; // garante que não fique conteúdo parcial
    return;
  }

  try {
    const html = await found.res.text();
    header.innerHTML = html;
    // opcional: marca do caminho para diagnóstico
    header.setAttribute('data-menu-path-tried', found.path);
    // ativa comportamento
    inicializarMenu();
  } catch (err) {
    console.error('[menu] erro ao processar menu.html:', err);
  }
}

// export para testes (opcional)
if (typeof window !== 'undefined') {
  window.carregarMenu = carregarMenu;
}

