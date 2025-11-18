// =============================
// menu.js – versão completa e estável
// =============================

// Tenta carregar menu.html de vários caminhos possíveis
async function fetchAny(paths) {
  for (const p of paths) {
    try {
      const res = await fetch(p, { cache: "no-store" });
      if (res.ok) return { res, path: p };
    } catch (e) {
      console.warn("Falha tentando:", p);
    }
  }
  return null;
}

async function carregarMenu() {
  console.log("[menu] iniciando carregamento…");

  // Cria o header apenas 1 vez
  let header = document.querySelector('header[data-menu]');
  if (!header) {
    header = document.createElement('header');
    header.setAttribute('data-menu', '1');
    document.body.prepend(header);
  }

  // Tentativas de caminhos
  const paths = [
    "/menu.html",
    "menu.html",
    "../menu.html",
    "../../menu.html"
  ];

  const found = await fetchAny(paths);

  if (!found) {
    console.error("[menu] menu.html não encontrado.");
    return;
  }

  console.log("[menu] encontrado em:", found.path);

  const html = await found.res.text();
  header.innerHTML = html;

  // Agora podemos inicializar o menu
  inicializarMenu();
}

// =============================
// Função que controla o menu
// =============================
function inicializarMenu() {

  console.log("[menu] inicializarMenu() executado");

  const topMenu = document.getElementById("topMenu");
  const hamburger = document.getElementById("hamburger");

  if (!topMenu || !hamburger) {
    console.error("[menu] elementos não encontrados no DOM.");
    return;
  }

  // MENU DESKTOP – APARECE NO SCROLL
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (y > 100 && !topMenu.classList.contains("open")) {
      topMenu.classList.add("visible");
    } else if (y <= 100 && !topMenu.classList.contains("open")) {
      topMenu.classList.remove("visible");
    }
  });

  // MENU MOBILE
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();

    const isOpen = topMenu.classList.contains("open");

    if (!isOpen) {
      topMenu.classList.add("open");
      topMenu.classList.add("visible");
      hamburger.setAttribute("aria-expanded", "true");
    } else {
      topMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");
      if (window.scrollY <= 100) {
        topMenu.classList.remove("visible");
      }
    }
  });

  // Fecha o menu ao clicar fora
  document.addEventListener("click", (e) => {
    if (topMenu.classList.contains("open")) {
      if (!topMenu.contains(e.target) && !hamburger.contains(e.target)) {
        topMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Fecha ao clicar em links
  topMenu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      if (topMenu.classList.contains("open")) {
        topMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

}

// =============================
// Inicializa tudo
// =============================
document.addEventListener("DOMContentLoaded", carregarMenu);
