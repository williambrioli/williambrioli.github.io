/* ============================================
   /js/footer-inject.js (VERSÃO SEGURO-FALHA)

   Cabeçalho geral:
   Este arquivo cria e coloca automaticamente no site
   a seção "CONTATO" do rodapé. Ele faz isso lendo
   informações salvas no objeto window.SITE_DATA.
   
   Ele usa MUITAS proteções (try/catch) para evitar
   que qualquer erro que aconteça aqui QUEBRE o resto
   da página. Por isso é chamado de "versão seguro-falha".
   
   Em resumo:
   - Espera o site carregar
   - Procura a DIV do rodapé
   - Monta o HTML do contato com dados fornecidos
   - Se algum dado faltar, usa valores padrão
   - Reativa o botão de WhatsApp de forma segura
   ============================================ */

(function () {  // ← Início de uma função que se executa sozinha
  try {

    // --- BLOCO: GARANTE QUE O DOM ESTÁ PRONTO ---
    // Aqui verificamos se o documento ainda está carregando.
    // Se estiver, esperamos o evento "DOMContentLoaded".
    // Se já carregou, chamamos init() direto.
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    // --- BLOCO: FUNÇÃO PRINCIPAL QUE MONTA O RODAPÉ ---
    function init() {
      try {

        // Pegamos a configuração do site de maneira segura.
        // Se window.SITE_DATA não existir, usamos um objeto vazio.
        const SITE = window.SITE_DATA || {};

        // Pegamos SITE.contact (dados da área de contato).
        // Se não existir, vira null.
        const cfg = SITE.contact || null;

        // Pegamos o container onde o rodapé será injetado.
        const container = document.getElementById("footerContainer");
        if (!container) {
          // Se o container não existir, avisamos e saímos.
          console.warn("footer-inject.js: footerContainer não encontrado.");
          return;
        }

        // --- BLOCO: CRIA VALORES SEGUROS PARA O HTML ---

        // Nome da pessoa (escapado para evitar problemas no HTML)
        const name = cfg && cfg.name ? escapeHtml(cfg.name) : "Nome";

        // Título profissional
        const title = cfg && cfg.title ? escapeHtml(cfg.title) : "";

        // Horário de atendimento (aqui é HTML permitido)
        const hoursHTML = cfg && cfg.hoursHTML ? cfg.hoursHTML : "Horário indisponível";

        // Link clicável do telefone
        const phoneHref = cfg && cfg.phoneHref ? cfg.phoneHref : "#";

        // Número exibido dentro do site
        const phoneDisplay = cfg && cfg.phoneDisplay ? escapeHtml(cfg.phoneDisplay) : "";

        // Texto do botão "Enviar mensagem"
        const contactButtonText =
          cfg && cfg.contactButtonText ? escapeHtml(cfg.contactButtonText) : "Enviar mensagem";

        // Chave da mensagem do WhatsApp (generic, blog, artigo…)
        const contactButtonWA =
          cfg && cfg.contactButtonWA ? cfg.contactButtonWA : "rodapegeneric";



         // normaliza a chave para evitar cair no "generic"
         const waKey = String(contactButtonWA || "rodapegeneric")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "");


        // Se o telefone não tiver texto para exibir,
        // simplesmente não mostramos o bloco <li>.
        const phoneBlock = phoneDisplay
          ? `<li><strong>Telefone:</strong> <a href="${phoneHref}" id="phoneLink">${phoneDisplay}</a></li>`
          : "";

        // --- BLOCO: MONTA O HTML DO RODAPÉ ---
        // Aqui escrevemos dentro do container todo o bloco do card de contato.
        container.innerHTML = `
          <div class="footer-card">
            <h2>Contato</h2>

            <p style="margin:0 0 12px">
              <strong>${name}</strong><br>
              ${title}
            </p>

            <ul class="contact-list">
              <li><strong>Horário de Atendimento:</strong> ${hoursHTML}</li>
              ${phoneBlock}
            </ul>

            <p style="margin-top:12px">
              <a class="btn" 
                 id="btnContact" 
                 href="${phoneHref}" 
                 data-wa-msg="${escapeHtmlAttr(contactButtonWA)}">
                 ${contactButtonText}
              </a>
            </p>
          </div>
        `;

       // --- BLOCO: REATIVAR O BOTÃO DO WHATSAPP ---
const btn = document.getElementById("btnContact");

if (btn) {
  // prepara o href com a mensagem certa — funciona mesmo sem openWA
  try {
    if (typeof window.waLink === "function") {
      btn.setAttribute("href", window.waLink(waKey || "rodapegeneric"));
    } else {
      btn.setAttribute("href", phoneHref);
    }
  } catch {
    btn.setAttribute("href", phoneHref);
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault(); // impede navegação direta

    if (typeof window.openWA === "function") {
      try {
        window.openWA(waKey || "rodapegeneric"); // usa a chave normalizada
      } catch (err) {
        console.warn("openWA falhou:", err);
        // fallback: segue o href já com a mensagem correta
        window.location.href = btn.getAttribute("href") || phoneHref;
      }
    } else {
      // sem openWA: segue o href já preparado
      window.location.href = btn.getAttribute("href") || phoneHref;
    }
  });
}


    // --- BLOCO: FUNÇÃO QUE ESCAPA TEXTO PARA HTML ---
    // Isso impede que alguém quebre o HTML usando caracteres especiais.
    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    // --- BLOCO: ESCAPA TEXTO PARA ATRIBUTOS HTML ---
    // Mesmo objetivo da função acima, mas inclui a crase (`).
    function escapeHtmlAttr(str) {
      return escapeHtml(str).replace(/`/g, "&#96;");
    }

  } catch (err) {
    // --- BLOCO: ERRO CRÍTICO GLOBAL ---
    // Se acontecer algum erro completamente inesperado,
    // mostramos no console, mas nunca paramos o funcionamento do site.
    console.error("footer-inject.js erro crítico:", err);
  }
})(); // ← fim da função autoexecutada
