// ================================================================
// /js/author-bio.js
// Cabeçalho geral:
// Este arquivo coloca o bloco "SOBRE O AUTOR" dentro da página.
// Ele guarda o HTML do autor numa variável e, quando a página termina
// de carregar, procura um elemento com id "authorBio" e insere esse HTML.
// Ou seja: prepara o texto do autor e cola ele no lugar certo da página.
// ================================================================

// --- Bloco: Define o conteúdo HTML que será inserido na página ---
// A seguir criamos uma variável que contém o texto HTML do "Sobre o Autor".
// Tudo entre as crases (`) é texto bruto com marcações HTML.
const authorBioHTML = `
<p><h2>Sobre o autor</h2>

<strong>William Brioli</strong> é <em>Psicanalista Clínico Integrativo</em> e <em>Bacharel em Psicologia (EBWU – EUA)</em>. Há <strong>22 anos</strong> ajuda adultos, casais, líderes e equipes a compreenderem emoções, fortalecerem vínculos e encontrarem equilíbrio entre vida e trabalho.
Atende <strong>presencialmente em Ilha Solteira (SP)</strong> e <strong>online para todo o Brasil</strong>. Seu método integra psicanálise clássica com ferramentas modernas (TCC, PNL, Neurociências, CNV e Hipnose Ericksoniana), unindo profundidade emocional e resultados práticos.
Atua em: psicoterapia individual, terapia de casal, desenvolvimento emocional, carreira & liderança e <strong>consultorias e palestras voltadas ao desenvolvimento humano e saúde mental em ambientes corporativos</strong>.
<em>“Minha missão é te ajudar a ressignificar histórias, organizar pensamentos e construir um caminho mais leve, consciente e possível.”</em>

</p>
`;
// Linha acima (a variável authorBioHTML) guarda uma string grande que contém
// - <p> ... </p> : parágrafo onde está todo o conteúdo do autor
// - <strong> ... </strong> : deixa as palavras em negrito (importantes)
// - <br> : quebra de linha, serve para pular para a linha de baixo
// Essa variável NÃO imprime nada sozinha — só guarda o texto para usar depois.

// --- Bloco: Espera a página carregar e insere o HTML no elemento certo ---
// O evento "DOMContentLoaded" espera a página terminar de carregar.
// Só então o código dentro da função será executado.
document.addEventListener("DOMContentLoaded", () => {
  // Esta linha procura na página um elemento que tenha id="authorBio"
  // getElementById retorna esse elemento se ele existir, ou null se não existir.
  const el = document.getElementById("authorBio");

  // Esta linha verifica se o elemento foi encontrado.
  // Se ele existir (el é truthy), então colocamos o conteúdo HTML lá dentro.
  if (el) el.innerHTML = authorBioHTML;
  // Explicação simples da linha acima:
  // - if (el) : "se o elemento existe"
  // - el.innerHTML = authorBioHTML; : "coloca o texto do authorBioHTML dentro desse elemento"
  // Assim, o texto do autor aparece na página exatamente onde o elemento com id "authorBio" estiver.
});
