// =========================
// CONFIGURAÇÃO GLOBAL – WHATSAPP
// =========================

window.SITE_CONFIG = {
  whatsappNumber: "5518988092571", // ✅ insira seu número no formato internacional
  phoneDisplay: "(18) 98809-2571",
  message: "Olá, William! Encontrei seu site e gostaria de conversar sobre atendimento."
};

// Função utilitária global (disponível em qualquer página)
window.waLink = function(customMsg) {
  const num = SITE_CONFIG.whatsappNumber;
  const msg = encodeURIComponent(customMsg || SITE_CONFIG.message);
  return `https://wa.me/${num}?text=${msg}`;
};

// Função global para abrir o WhatsApp
window.openWA = function(customMsg) {
  window.open(waLink(customMsg), "_blank");
};
