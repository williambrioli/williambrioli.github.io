// ================================================================
// /js/config-whatsapp.js
// Cabeçalho geral:
// Este arquivo cuida da CONFIGURAÇÃO GLOBAL do WhatsApp no site.
// Ele guarda o número, a forma de mostrar esse número, e mensagens prontas
// que o visitante pode enviar. Também cria funções globais que geram links
// de WhatsApp automaticamente, para que outros scripts usem facilmente.
// É como a “central de telefone” do site: deixa tudo pronto para abrir chats.
// ================================================================

// =========================
// CONFIGURAÇÃO GLOBAL – WHATSAPP
// =========================

// --- Bloco: Função autoexecutável (IIFE)
// Essa função é criada e executada imediatamente.
// Serve para deixar variáveis "protegidas" dentro dela,
// evitando que vazem para o escopo global por acidente.
(function () {

  // --- Bloco: Objeto de configuração principal ---
  // Aqui criamos um objeto CONFIG que guarda:
  // - o número do WhatsApp sem formatação,
  // - o número formatado para exibir na tela,
  // - mensagens prontas que poderão ser usadas na criação dos links.
  const CONFIG = {
    // Número do WhatsApp sem símbolos.
    // Usado para montar o link automaticamente.
    whatsappNumber: "5518988092571",

    // Número bonitinho, como aparece na interface para o usuário.
    phoneDisplay: "(18) 98809-2571",

    // Conjunto de mensagens pré-definidas.
    messages: {
      // Mensagem padrão ("generic").
      // Essa é usada caso nenhuma outra mensagem seja especificada.
      generic: "Oi, William! Encontrei seu site e preciso conversar com você sobre...",
      rodapegeneric: "William! Encontrei seu site e preciso conversar com você sobre...",
      duvidageneric: "Olá, William! Encontrei seu site e preciso conversar com você sobre...",
      psicoterapiaindividuall: "Olá, William! Quero falar sobre Psicoterapia Individual.",
      psicoterapiabrevee: "Olá, William! Quero falar sobre Psicoterapia Breve.",
      psicoterapiaunica: "Olá, William! Quero falar sobre Psicoterapia de Sessão Única.",
      terapiadecasall: "Olá, William! Quero falar sobre Terapia de Casal.",
      terapiaparaempreendedoress: "Olá, William! Quero falar sobre Terapia para empreendedores.",
      mediadorextrajudiciall: "Olá, William! Quero falar sobre Mediação Extrajudicial.",
      consultoriadesenvolvimentohumanoo: "Olá, William! Quero falar sobre Consultoria em Desenvolvimento Humano e Organizacional.",
      estrategiacomercialevendas: "Olá, William! Quero falar sobre Estratégia Comercial e Atitude de Vendas...",
      transicaocarreira: "Olá, William! Quero falar sobre Orientação e Transição de Carreira.",
      treinadorfinanc: "Olá, William! Quero falar sobre Orientação e Transição de Carreira.",
      nr1: "Olá, William! Quero falar sobre implementação de NR-1.",
      depoimentogeneric: "Olá, William! Vi o conteúdo do seu site e depoimento dos clientes e quero falar sobre atendimento com você.",
      palestrageneric: "Olá, William! Vi que você é palestrante e quero falar sobre palestras.",
      posturagerencial: "Olá, William! Quero falar sobre Desenvolvimento de Postura Gerencial.",
      liderancapratica: "Olá, William! Quero falar sobre Desenvolvimento de Lideranças na Prática.",
      acompanhargestores: "Olá, William! Quero falar sobre Acompanhamento de Gestores e Executivos.",
      alinhamentoorganizacional: "Olá, William! Quero falar sobre Alinhamento de Equipes e Cultura Organizacional."


      

      
      
      
      // Exemplos de mensagens adicionais (comentadas).
      // Se quiser criar mais mensagens, basta copiar e alterar:
      // blog: "Olá, William! Li um artigo no seu blog e gostaria de falar sobre terapia.",
      // artigo: "Olá, William! Li um artigo específico e quero tirar uma dúvida."
    }
  };

  // --- Bloco: Exposição global da configuração ---
  // Aqui tornamos o objeto CONFIG acessível globalmente
  // usando window.WA_CONFIG.
  // Assim, outros arquivos do site podem usar os dados,
  // por exemplo, para mostrar o telefone no rodapé.
  window.WA_CONFIG = CONFIG;

  // --- Bloco: Função interna que monta links de WhatsApp ---
  // Esta função recebe uma "chave" (key)
  // e procura a mensagem correspondente dentro de CONFIG.messages.
  // Depois monta e devolve o link pronto do WhatsApp.
  function buildWaLink(key) {
    // Pega o número configurado.
    const num = CONFIG.whatsappNumber;

    // Pega todas as mensagens configuradas.
    // Caso não exista, usa um objeto vazio (fallback de segurança).
    const msgs = CONFIG.messages || {};

    // Escolhe a mensagem pela chave.
    // Se a chave existir e houver mensagem: usa ela.
    // Senão, usa a mensagem "generic".
    const raw = (key && msgs[key]) ? msgs[key] : msgs.generic;

    // Fallback adicional: se por algum motivo a mensagem estiver vazia,
    // nunca deixa "undefined". Coloca sempre esta frase padrão.
    const finalText = raw || "Olá, William! Gostaria de conversar sobre atendimento.";

    // Codifica o texto para URL, para evitar erros com acentos e espaços.
    const encoded = encodeURIComponent(finalText);

    // Retorna o link final completo.
    // Exemplo: https://wa.me/5518988092571?text=mensagem
    return `https://wa.me/${num}?text=${encoded}`;
  }

  // --- Bloco: Expor função global waLink(key) ---
  // Esta função fica disponível no window,
  // para que HTML e outros scripts possam gerar links facilmente.
  window.waLink = function (key) {
    // Retorna o link já montado.
    return buildWaLink(key);
  };

  // --- Bloco: Expor função global openWA(key) ---
  // Esta abre automaticamente uma aba com o WhatsApp,
  // usando a mensagem correspondente.
  window.openWA = function (key) {
    // Primeiro monta o link usando key.
    const url = buildWaLink(key);

    // Depois abre o link numa nova aba.
    window.open(url, "_blank");
  };

})();  // <-- Fim da função autoexecutável
// Fim do arquivo.
// ================================================================
