// js/menu.js
// =====================================
// Script de carregamento dinâmico do menu
// =====================================

async function carregarMenu() {
  // Cria o elemento <header> dinamicamente
  const header = document.createElement('header');
  document.body.prepend(header);

  try {
    // Busca o conteúdo de menu.html
    const res = await fetch('menu.html');
    if (!res.ok) throw new Error('Erro ao carregar menu.html');
    const html = await res.text();

    // Insere o HTML dentro do <header>
    header.innerHTML = html;

    // Inicializa o comportamento do menu
    inicializarMenu();
  } catch (err) {
    console.error('Erro ao carregar o menu:', err);
  }
}

function inicializarMenu() {
  const topMenu = document.getElementById('topMenu');
  const hamburger = document.getElementById('hamburger');

  if (!topMenu || !hamburger) return;

  // ----------------------------
  // Exibir menu flutuante no desktop
  // ----------------------------
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    if (y > 120 && !topMenu.classList.contains('open')) {
      topMenu.classList.add('visible');
    } else if (y <= 120 && !topMenu.classList.contains('open')) {
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
      if (window.scrollY <= 120) {
        topMenu.classList.remove('visible');
      }
    }
  });

  // Fecha ao clicar em link
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

  // ----------------------------
  // Scroll suave (anchors internas)
  // ----------------------------
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

// ----------------------------
// Inicialização automática
// ----------------------------
document.addEventListener('DOMContentLoaded', carregarMenu);
