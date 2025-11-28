// Arquivo: /js/og-default.js
// Este script injeta OG fixos para WhatsApp/Facebook

window.OG_DEFAULT = {
  title: "Blog • Psicanálise, Terapia e Vida Real",
  description: "Reflexões sobre saúde emocional, relacionamentos, carreira, empreendedorismo e desenvolvimento humano, a partir da prática clínica e da experiência no mundo corporativo.",
  image: "https://williambrioli.com.br/img/HEROog.jpg"
};

// Cria tags OG fixas visíveis para WhatsApp/Facebook/LinkedIn
document.addEventListener("DOMContentLoaded", () => {
  const og = window.OG_DEFAULT;
  const metas = [
    { property: "og:title", content: og.title },
    { property: "og:description", content: og.description },
    { property: "og:type", content: "website" },
    { property: "og:locale", content: "pt_BR" },
    { property: "og:image", content: og.image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: og.image }
  ];

  metas.forEach(data => {
    const meta = document.createElement("meta");
    if (data.property) meta.setAttribute("property", data.property);
    if (data.name) meta.setAttribute("name", data.name);
    meta.setAttribute("content", data.content);
    document.head.appendChild(meta);
  });
});
