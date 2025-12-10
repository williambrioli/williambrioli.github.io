// =============================
// /js/menu.js – versão completa e estável
//
// Cabeçalho geral:
// Este arquivo é responsável por:
//
// 1. Procurar o arquivo menu.html em vários caminhos possíveis.
// 2. Carregar esse menu automaticamente dentro de um <header>.
// 3. Controlar toda a lógica do menu no site:
//    • Menu desktop que aparece ao rolar a página.
//    • Menu mobile que abre com o botão hamburger.
//    • Fecha quando clica fora, quando clica em links, etc.
// Tudo isso é feito com funções assíncronas e eventos do DOM.
// =============================


// -------------------------------------------------------------
// BLOCO: Função que tenta carregar menu.html de vários caminhos
// -------------------------------------------------------------
async function fetchAny(paths) {

  // Percorre cada caminho recebido na lista "paths".
  for (const p of paths) {
    try {
      // Tenta fazer o fetch (buscar) do arquivo menu.html no caminho p.
      // cache: "no-store" evita o navegador guardar uma versão antiga.
      const res = await fetch(p, { cache: "no-store" });

      // Se a resposta for OK (HTTP 200), então retornamos o resultado.
      if (res.ok) return { res, path: p };

    } catch (e) {
      // Se der erro, apenas mostra no console.
      console.warn("Falha tentando:", p);
    }
  }

  // Se nenhum caminho funcionou, devolvemos null.
  return null;
}


// -------------------------------------------------------------
// BLOCO: Função que carrega o menu no site
// -------------------------------------------------------------
async function carregarMenu() {

  console.log("[menu] iniciando carregamento…");

  // Procura um <header> que tenha o atributo data-menu.
  let header = document.querySelector('header[data-menu]');

  // Se não existir, criamos um novo <header> e colocamos no topo do body.
  if (!header) {
    header = document.createElement('header');
    header.setAttribute('data-menu', '1');
    document.body.prepend(header); // adiciona no início da página
  }

  // Lista de caminhos possíveis onde menu.html pode estar.
  const paths = [
    "/menu.html",
    "menu.html",
    "../menu.html",
    "../../menu.html"
  ];

  // Tentamos carregar o menu em qualquer um dos caminhos acima.
  const found = await fetchAny(paths);

  // Se não achar o menu, mostramos erro e paramos.
  if (!found) {
    console.error("[menu] menu.html não encontrado.");
    return;
  }

  console.log("[menu] encontrado em:", found.path);

  // Lemos o conteúdo HTML do arquivo menu.html.
  const html = await found.res.text();

  // Colocamos o HTML dentro do header.
  header.innerHTML = html;

  // Agora que o HTML já está na página, iniciamos a lógica do menu.
  inicializarMenu();
}


// =============================
// BLOCO: Função que controla o menu (desktop + mobile)
// =============================
function inicializarMenu() {

  console.log("[menu] inicializarMenu() executado");

  // Pegamos o menu principal e o botão hamburger.
  const topMenu = document.getElementById("topMenu");
  const hamburger = document.getElementById("hamburger");

  // Se qualquer um não existir, não conseguimos iniciar o menu.
  if (!topMenu || !hamburger) {
    console.error("[menu] elementos não encontrados no DOM.");
    return;
  }


  // ---------------------------------------------------------
  // BLOCO: MENU DESKTOP – aparece quando o usuário rola a página
  // ---------------------------------------------------------
  window.addEventListener("scroll", () => {

    // Pega a posição vertical rolada.
    const y = window.scrollY;

    // Se rolou mais de 100px e o menu NÃO está aberto,
    // adiciona a classe "visible".
    if (y > 100 && !topMenu.classList.contains("open")) {
      topMenu.classList.add("visible");

    // Se voltou para o topo (<= 100px) e o menu não está aberto,
    // remove a classe visible.
    } else if (y <= 100 && !topMenu.classList.contains("open")) {
      topMenu.classList.remove("visible");
    }
  });


  // ---------------------------------------------------------
  // BLOCO: MENU MOBILE – abre e fecha com o botão hamburger
  // ---------------------------------------------------------
  hamburger.addEventListener("click", (e) => {

    e.stopPropagation(); // impede que o clique "suba" para o documento

    // Verifica se o menu está aberto
    const isOpen = topMenu.classList.contains("open");

    // Se NÃO está aberto → abrimos
    if (!isOpen) {
      topMenu.classList.add("open");
      topMenu.classList.add("visible"); // garante que apareça
      hamburger.setAttribute("aria-expanded", "true");

    // Se está aberto → fechamos
    } else {
      topMenu.classList.remove("open");
      hamburger.setAttribute("aria-expanded", "false");

      // Só remove visible se estiver no topo da página
      if (window.scrollY <= 100) {
        topMenu.classList.remove("visible");
      }
    }
  });


  // ---------------------------------------------------------
  // BLOCO: Fecha o menu quando o usuário clica fora dele
  // ---------------------------------------------------------
  document.addEventListener("click", (e) => {

    // Se o menu está aberto…
    if (topMenu.classList.contains("open")) {

      // …e o clique NÃO foi no menu e nem no hamburger:
      if (!topMenu.contains(e.target) && !hamburger.contains(e.target)) {

        // então fechamos o menu.
        topMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    }
  });


  // ---------------------------------------------------------
  // BLOCO: Fecha o menu quando o usuário clica em qualquer link
  // ---------------------------------------------------------
  topMenu.querySelectorAll("a").forEach((a) => {

    a.addEventListener("click", () => {

      // Se o menu está aberto e clicou num link, fechamos.
      if (topMenu.classList.contains("open")) {
        topMenu.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  });

}


// =============================
// BLOCO: Inicia tudo quando a página carregar
// =============================
document.addEventListener("DOMContentLoaded", carregarMenu);
