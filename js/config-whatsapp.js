// =========================
// CONFIGURAÇÃO GLOBAL – WHATSAPP
// =========================
window.SITE_CONFIG = {
  whatsappNumber: "5518988092571",
  phoneDisplay: "(18) 98809-2571",
  messages: {
    generic: "Olá, William! Encontrei seu site e gostaria de conversar sobre atendimento."
    // se quiser, depois você pode criar:
    // blog: "Olá, William! Li um artigo no blog e quero falar sobre terapia.",
    // index: "Olá, William! Visitei seu site e quero saber sobre atendimentos."
  }
};

// Gera o link do WhatsApp a partir de UMA CHAVE (ex: "generic", "blog"...)
window.waLink = function (key) {
  const num = window.SITE_CONFIG.whatsappNumber;
  const msgs = window.SITE_CONFIG.messages || {};

  // se a chave existir, usa; se não, cai no generic
  const raw = (key && msgs[key]) ? msgs[key] : msgs.generic;

  // se por algum motivo ainda assim não houver texto, evita "undefined"
  const finalText = raw || "Olá, William! Gostaria de conversar sobre atendimento.";
  const encoded = encodeURIComponent(finalText);

  return `https://wa.me/${num}?text=${encoded}`;
};

// Abre o WhatsApp
window.openWA = function (key) {
  const url = window.waLink(key);
  window.open(url, "_blank");
};
