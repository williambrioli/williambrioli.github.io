// =========================
// CONFIGURAÇÃO GLOBAL – WHATSAPP
// =========================
(function () {
  const CONFIG = {
    whatsappNumber: "5518988092571",
    phoneDisplay: "(18) 98809-2571",
    messages: {
      generic: "Olá, William! Encontrei seu site e gostaria de conversar sobre atendimento."
      // Você pode criar mais, se quiser:
      // blog: "Olá, William! Li um artigo no seu blog e gostaria de falar sobre terapia.",
      // artigo: "Olá, William! Li um artigo específico e quero tirar uma dúvida."
    }
  };

  // Expõe no escopo global para usar em outros scripts (telefone no rodapé, etc.)
  window.WA_CONFIG = CONFIG;

  // Gera o link do WhatsApp a partir de UMA CHAVE (ex: "generic", "blog"...)
  function buildWaLink(key) {
    const num = CONFIG.whatsappNumber;
    const msgs = CONFIG.messages || {};

    // pega a mensagem pela chave ou cai no generic
    const raw = (key && msgs[key]) ? msgs[key] : msgs.generic;

    // fallback extra pra NUNCA virar "undefined"
    const finalText = raw || "Olá, William! Gostaria de conversar sobre atendimento.";
    const encoded = encodeURIComponent(finalText);

    return `https://wa.me/${num}?text=${encoded}`;
  }

  // Expor função global
  window.waLink = function (key) {
    return buildWaLink(key);
  };

  window.openWA = function (key) {
    const url = buildWaLink(key);
    window.open(url, "_blank");
  };
})();
