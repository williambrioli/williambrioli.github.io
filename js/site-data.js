/**
 * /js/site-data.js
 *
 * Cabeçalho geral:
 * Este arquivo cria um objeto global `window.SITE_DATA` que guarda informações
 * do site como contato e textos dos botões. É usado pelo front-end para mostrar
 * nomes, horários, textos dos botões e outros textos fixos que aparecem no site.
 *
 * Explicação como para criança:
 * "Aqui nós guardamos os textos e dados do site dentro de uma caixinha (SITE_DATA)
 *  para outras partes do site pegarem e mostrarem para as pessoas."
 */

window.SITE_DATA = { // Cria um objeto global chamado SITE_DATA no objeto window (acessível em qualquer lugar do site).
  contact: { // Inicio do bloco "contact": guarda dados de contato (nome, título, telefone, horário, textos do botão).
    name: "William Brioli", // O nome que será exibido no site (por exemplo no cabeçalho ou seção de contato).
    title: "Psicanalista Clínico Integrativo e Bacharel em Psicologia pela EBWU (Miani, Flórida - EUA)", // O título ou profissão que será exibido junto do nome.
    hoursHTML: "Segunda à sexta-feira — 8h00 às 22h00 (consulte agenda)", // Texto com o horário de atendimento; pode conter HTML se necessário.
    phoneDisplay: "", // Texto para exibir o telefone (visível para o usuário). Está vazio aqui — preencha se quiser mostrar o número.
    phoneHref: "", // Valor para usar em links (ex: "tel:+5511999999999"). Está vazio — preencha para tornar o telefone clicável.
    contactButtonText: "Enviar mensagem", // Texto do botão principal de contato (o que o usuário verá).
    contactButtonWA: "generic" // Configuração relacionada ao botão WhatsApp (ex.: tipo de botão). Aqui está como "generic".
  }, // Fim do bloco "contact"

  // 🔘 NOVO BLOCO: textos de botões do site
  buttons: { // Inicio do bloco "buttons": guarda todos os textos usados em botões do site, centralizando alterações.
    articleCTA: "Agendar atendimento",            // botão no final do artigo — CTA (call to action) que convida o leitor a agendar.
    modalCTA: "Agendar atendimento",              // botão dentro do modal — texto exibido no botão do modal.
    readMore: "Ler artigo completo",              // texto do botão "ler mais" nos cards da home/blog.
    closeModal: "Fechar",                          // texto do botão para fechar modais.
    psicoterapiaindividual: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    psicoterapiabreve: "Agendar Consulta",       // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    sessaounica: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    terapiadecasal: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    terapiaparaempreendedores: "Agendar Atendimento",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    orientacaoetransicaodecarreira: "Agendar Atendimento",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    orientacaofinanceira: "Agendar Atendimento",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    nr1: "Contratar Serviço",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Como te ajudo.
    planosaude: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Dúvidas.
    horariofuncionamento: "Agendar Atendimento",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Dúvidas.
    precisoterapia: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Dúvidas.
    comofuncionaterapia: "Agendar Consulta",        // 🔥 novos botões globais que alterar os boões dos ACOORDIONS Dúvidas.
    palestras: "Contratar Palestrante",        // 🔥 novos botões globais que alterar os boões Palestras.
    mediadorextrajudicial: "Agendar Atendimento",       
    consultor: "Agendar Atendimento",        
    depoimentos: "Agendar Atendimento"
    
  } // Fim do bloco "buttons"
}; // Fecha o objeto window.SITE_DATA
