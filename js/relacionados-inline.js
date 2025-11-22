// ===================================================
// 🔗 SISTEMA DE ARTIGOS RELACIONADOS INLINE (versão leve)
// Autor: William Brioli
// ===================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const artigoEl = document.querySelector("#articleContent");
    if (!artigoEl) return;

    // Localiza o último <h2> de "Referências" ou o final do conteúdo
    const refs = artigoEl.querySelector("h2:last-of-type");
    const insertPoint = refs ? refs.nextElementSibling : artigoEl.lastElementChild;

    const response = await fetch("/posts/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar posts.json");
    const posts = await response.json();

    const artigoAtual = ARTICLE.title.trim().toLowerCase();

    // 🧠 lógica simples de similaridade por palavras no título
    const relacionados = posts
      .filter(p => p.title.toLowerCase() !== artigoAtual)
      .map(p => {
        const palavrasArtigo = artigoAtual.split(/\s+/);
        const palavrasPost = p.title.toLowerCase().split(/\s+/);
        const intersecao = palavrasPost.filter(x => palavrasArtigo.includes(x));
        return { ...p, score: intersecao.length };
      })
      .filter(p => p.score > 1)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    if (relacionados.length === 0) return;

    // 🧱 Cria bloco inline de relacionados
    const bloco = document.createElement("div");
    bloco.className = "artigos-relacionados-inline";
    bloco.innerHTML = `
      <h3 class="rel-title">Se você gostou deste tema, leia também:</h3>
      <ul class="rel-list">
        ${relacionados.map(p => `
          <li><a href="/${p.html}">${p.title}</a></li>
        `).join("")}
      </ul>
    `;

    // Insere logo após as referências
    insertPoint.insertAdjacentElement("afterend", bloco);

  } catch (err) {
    console.error("Erro ao gerar artigos relacionados inline:", err);
  }
});
