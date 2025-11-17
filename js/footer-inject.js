/* ============================================
   footer-inject.js (VERSÃO SEGURO-FALHA)
   Injeta automaticamente a seção CONTATO
   Usa try/catch e checagens defensivas para nunca
   interromper a execução do restante dos scripts.
   ============================================ */

(function () {
  try {
    // segurança: garante que o DOM já existe (caso o arquivo seja carregado no <head>)
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }

    function init() {
      try {
        // pega config de forma defensiva
        const SITE = window.SITE_DATA || {};
        const cfg = SITE.contact || null;

        // se não tiver cfg, ainda assim não quebra: mostra só título genérico
        const container = document.getElementById("footerContainer");
        if (!container) {
          // nada a fazer se container não existe
          console.warn("footer-inject.js: footerContainer não encontrado.");
          return;
        }

        // monta HTML básico sem depender 100% de campos
        const name = cfg && cfg.name ? escapeHtml(cfg.name) : "Nome";
        const title = cfg && cfg.title ? escapeHtml(cfg.title) : "";
        const hoursHTML = cfg && cfg.hoursHTML ? cfg.hoursHTML : "Horário indisponível";
        const phoneHref = cfg && cfg.phoneHref ? cfg.phoneHref : "#";
        const phoneDisplay = cfg && cfg.phoneDisplay ? escapeHtml(cfg.phoneDisplay) : "";
        const contactButtonText = cfg && cfg.contactButtonText ? escapeHtml(cfg.contactButtonText) : "Enviar mensagem";
        const contactButtonWA = cfg && cfg.contactButtonWA ? cfg.contactButtonWA : "generic";

        // Observação: deixei o bloco telefone opcional (não o mostro se phoneDisplay vazio)
        const phoneBlock = phoneDisplay
          ? `<li><strong>Telefone:</strong> <a href="${phoneHref}" id="phoneLink">${phoneDisplay}</a></li>`
          : "";

        // Monta innerHTML com cuidado (sem injetar valores não escapados onde possam quebrar)
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

        // Reativa o botão de WhatsApp com openWA() se existir
        const btn = document.getElementById("btnContact");
        if (btn) {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof openWA === "function") {
              // se openWA existe, chama com a chave do botão
              try { openWA(contactButtonWA || "generic"); }
              catch (err) { console.warn("openWA falhou:", err); window.location.href = phoneHref; }
            } else {
              // fallback: abrir link direto
              window.location.href = phoneHref;
            }
          });
        }
      } catch (innerErr) {
        console.error("footer-inject.js (init) erro:", innerErr);
      }
    }

    // pequenas funções utilitárias para escapar texto
    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }
    function escapeHtmlAttr(str) {
      return escapeHtml(str).replace(/`/g, "&#96;");
    }

  } catch (err) {
    // Se qualquer coisa falhar aqui, garante que não quebra resto da página
    console.error("footer-inject.js erro crítico:", err);
  }
})();
