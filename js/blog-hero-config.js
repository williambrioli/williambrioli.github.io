// ================================================================
// /js/blog-hero-config.js
// Cabeçalho geral:
// Este arquivo define as CONFIGURAÇÕES do "HERO" da página do blog.
// "HERO" = a área grande do topo da página, normalmente com imagem,
// título e uma frase que explica sobre o que é o blog.
// O código cria um objeto global (window.BLOG_HERO) com essas infos,
// para que o site leia e mostre o HERO onde for necessário.
// ================================================================

// --- Bloco: arquivo e descrição principal ---
// Este comentário descreve o arquivo em linhas simples.
// Não muda nada no código, só explica.

// blog-hero-config.js
// ===========================
// Configurações globais do HERO do blog
// ===========================

// --- Bloco: Cria o objeto global com as configurações do HERO ---
// Vamos agora declarar um objeto no `window` (escopo global do navegador)
// chamado BLOG_HERO. Outros scripts da página podem ler esse objeto
// para mostrar a imagem, título, subtítulo e o texto pequeno do HERO.
window.BLOG_HERO = {
  // Propriedade "image": caminho da imagem que será mostrada no HERO.
  // Ex.: "/img/HEROog.jpg"
  // Explicação simples: "qual imagem vamos usar lá no topo?"
  image: "/img/HEROog.jpg",

  // Propriedade "title": título principal do HERO.
  // Ex.: "Blog • Psicanálise, Terapia e Vida Real"
  // Explicação simples: "o nome grande que aparece no topo"
  title: "Blog • Psicanálise, Terapia e Vida Real",

  // Propriedade "subtitle": frase maior que explica sobre o que é o blog.
  // Explicação simples: "uma linha que conta do que o blog fala"
  subtitle: "Reflexões sobre saúde emocional, relacionamentos, carreira, empreendedorismo e desenvolvimento humano, a partir da prática clínica e da experiência no mundo corporativo.",

  // Propriedade "small": texto menor (observação) abaixo do subtítulo.
  // Explicação simples: "uma frase curtinha que complementa (ex.: 'atualizado')."
  small: "Atualizado periodicamente com novos artigos."
};
// Fim do objeto window.BLOG_HERO
// Quando a página carregar, outro script pode usar:
//   const hero = window.BLOG_HERO;
//   e injetar hero.image, hero.title, hero.subtitle e hero.small no HTML.
// ================================================================
