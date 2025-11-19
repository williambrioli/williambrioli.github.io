// ================================================================
// /js/site-data.js
// Cabeçalho geral:
// Este arquivo guarda informações do SITE que outros scripts podem usar,
// por exemplo os dados de contato que aparecem no rodapé ou em botões.
// Ele cria um objeto global chamado `window.SITE_DATA` com esses valores.
// ================================================================

window.SITE_DATA = {   // ← Cria um objeto global chamado SITE_DATA
  // --- Bloco: Dados de contato ---
  contact: {           // ← Propriedade "contact": aqui estão os dados que descrevem o contato do site

    // Nome do responsável / autor que aparecerá no contato
    name: "William Brioli",

    // Cargo ou descrição curta que aparecerá junto ao nome
    title: "Psicanalista Clínico Integrativo",

    // Horário de atendimento — aqui é HTML simples (strings com quebras, travessão etc.)
    hoursHTML: "Segunda à sexta-feira — 8h00 às 22h00 (consulte agenda)",

    // Texto que será exibido na página para o telefone (ex.: "(18) 98809-2571")
    // Está vazio por padrão; se quiser exibir telefone, coloque o número aqui.
    phoneDisplay: "",

    // Link do telefone (href), por exemplo "tel:+5518988092571" ou link de fallback.
    // Está vazio por padrão; se quiser que o botão vá para o telefone, coloque o href aqui.
    phoneHref: "",

    // Texto do botão de contato que aparece no rodapé (label do botão)
    contactButtonText: "Enviar mensagem",

    // Chave da mensagem de WhatsApp (por exemplo: "generic", "blog", "artigo")
    // Essa chave é usada por openWA() / config-whatsapp para escolher a mensagem.
    contactButtonWA: "generic"
  },

  // --- Observação ---
  // Você pode mover outras configurações (ex.: SITE_CONFIG) para dentro deste objeto,
  // adicionando novas propriedades aqui, por exemplo:
  // siteConfig: { theme: "claro", analytics: true }
  // Isso facilita que todo o site leia as mesmas informações de um lugar só.

}; // ← fim de window.SITE_DATA
