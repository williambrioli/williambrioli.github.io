/* ============================================
   footer-inject.js
   Injeta automaticamente a seção CONTATO
   para todas as páginas usando SITE_DATA.contact
   ============================================ */

(function () {

  // garante que o arquivo site-data.js foi carregado
  const cfg = window.SITE_DATA && window.SITE_DATA.contact;
  if (!cfg) {
    console.warn("SITE_DATA.contact não encontrado. Verifique site-data.js");
    return;
  }

  // container do footer
  const container = document.getElementById("footerContainer");
  if (!container) {
    console.warn("footerContainer não encontrado. Verifique o HTML.");
    return;
  }

  /* ============================================
     Monta a estrutura HTML do footer
     ============================================ */
  container.innerHTML = `
    <h2>Contato</h2>

    <p style="margin:0 0 12px">
      <strong>${cfg.name}</strong><br>
      ${cfg.title}
    </p>

    <ul class="contact-list">
      <li><strong>Horário de Atendimento:</strong> ${cfg.hoursHTML}</li>
      <li><strong>Telefone:</strong> 
        <a href="${cfg.phoneHref}" id="phoneLink">${cfg.phoneDisplay}</a>
      </li>
    </ul>

    <p style="margin-top:12px">
      <a class="btn" 
         id="btnContact" 
         href="${cfg.phoneHref}" 
         data-wa-msg="${cfg.contactButtonWA}">
         ${cfg.contactButtonText}
      </a>
    </p>
  `;

  /* ============================================
     Reativa o botão de WhatsApp com openWA()
     se existir no site
     ============================================ */

  const btn = document.getElementById("btnContact");

  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // se openWA() existir, usa o fluxo padrão
      if (typeof openWA === "function") {
        openWA(cfg.contactButtonWA || "generic");
      } else {
        // fallback: abrir link direto
        window.location.href = cfg.phoneHref;
      }
    });
  }

})();
