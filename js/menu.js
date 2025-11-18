// js/menu.js
// =====================================
// Carrega o menu.html em TODAS as páginas
// e aplica o mesmo comportamento (desktop + mobile)
// =====================================

async function carregarMenu() {
  // Cria um <header> no topo da página
  const header = document.createElement('header');
  document.body.prepend(header);

  try {
    // Busca o conteúdo do menu.html (mesma pasta da página)
    const res = await fetch('/menu.html');
    if (!res.ok) throw new Error('Erro ao carregar menu.html');

    const html = await res.text();
    header.innerHTML = html;

    // Depois que o HTML entra na página, ativamos o comportamento
    inicializarMenu();
  } catch (err) {
    console.error('Erro ao carregar o menu:', err);
  }
}

function inicializarMenu() {
  const topMenu   = document.getElementById('topMenu');
  const hamburger = document.getElementById('hamburger');

  if (!topMenu || !hamburger) return;

  // Define o limite de scroll dependendo da página
  // index.html: menu aparece depois de 120px
  // blog.html : menu aparece depois de 20px
  let scrollLimit = 120;
  const path = window.location.pathname;
  if (path.endsWith('blog.html')) {
    scrollLimit = 20;
  }

  // ----------------------------
  // Exibir menu flutuante no desktop
  // ----------------------------
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > scrollLimit && !topMenu.classList.contains('open')) {
      topMenu.classList.add('visible');
    } else if (y <= scrollLimit && !topMenu.classList.contains('open')) {
      topMenu.classList.remove('visible');
    }
  });

  // ----------------------------
  // Menu hambúrguer (mobile)
  // ----------------------------
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = topMenu.classList.contains('open');

    if (!isOpen) {
      topMenu.classList.add('open');
      topMenu.classList.add('visible');
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      topMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      if (window.scrollY <= scrollLimit) {
        topMenu.classList.remove('visible');
      }
    }
  });

  // Fecha ao clicar em um link do menu
  topMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      if (topMenu.classList.contains('open')) {
        topMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Fecha ao clicar fora do menu
  document.addEventListener('click', (e) => {
    if (topMenu.classList.contains('open')) {
      const inside = topMenu.contains(e.target) || hamburger.contains(e.target);
      if (!inside) {
        topMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Fecha com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && topMenu.classList.contains('open')) {
      topMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      hamburger.focus();
    }
  });

  // Scroll suave só para links que começam com "#"
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href && href.length > 1) {
        const el = document.querySelector(href);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
}


// 🔒 Força links absolutos mesmo dentro da pasta /artigos/
document.addEventListener('click', (e) => {
  const link = e.target.closest('a.nav-link');
  if (!link) return;

  const href = link.getAttribute('href');

  // Só executa para links que começam com "/"
  if (href.startsWith('/')) {
    e.preventDefault();
    window.location.href = href; // Força ABSOLUTO
  }
});





// Inicializa tudo quando a página terminar de carregar
document.addEventListener('DOMContentLoaded', carregarMenu);


