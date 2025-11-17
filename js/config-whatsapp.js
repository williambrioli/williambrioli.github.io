// =========================
// CONFIGURAÇÃO GLOBAL – WHATSAPP
// =========================
window.SITE_CONFIG = {
  whatsappNumber: "5518988092571",
  phoneDisplay: "(18) 98809-2571",
  message: "Olá, William! Encontrei seu site e gostaria de conversar sobre atendimento."
};

// Função para gerar o link do WhatsApp
window.waLink = function(customMsg) {
  const num = SITE_CONFIG.whatsappNumber;
  // 👇 aqui está a chave: usar SITE_CONFIG.message, não messages.generic
  const msg = encodeURIComponent(customMsg || SITE_CONFIG.message);
  return `https://wa.me/${num}?text=${msg}`;
};

// Função para abrir o WhatsApp
window.openWA = function(customMsg) {
  window.open(waLink(customMsg), "_blank");
};
