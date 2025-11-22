// ===================================================
// 🔗 SISTEMA AUTOMÁTICO DE ARTIGOS RELACIONADOS
// Autor: William Brioli
// ===================================================

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.createElement("section");
  container.className = "relacionados container";
  container.innerHTML = `<h2>Artigos Relacionados</h2><div id="relacionadosGrid" class="posts-grid"></div>`;
  document.querySelector(".article .container").appendChild(container);

  const grid = document.getElementById("relacionadosGrid");
  if (!grid) return;

  try {
    const response = await fetch("/posts/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Erro ao carregar posts.json");

    const posts = await response.json();

    // 🧠 identifica o artigo atual
    const artigoAtual = ARTICLE.title.trim().toLowerCase();

    // 🪄 lógica simples de similaridade (por palavras em comum no título)
    const relacionados = posts
      .filter(post => post.title.toLowerCase() !== artigoAtual)
      .map(post => {
        const palavrasArtigo = artigoAtual.split(/\s+/);
        const palavrasPost = post.title.toLowerCase().split(/\s+/);
        const intersecao = palavrasPost.filter(p => palavrasArtigo.includes(p));
        return { ...post, score: intersecao.length };
      })
      .filter(p => p.score > 1) // pelo menos 2 palavras em comum
      .sort((a, b) => b.score - a.score)
      .slice(0, 3); // limita a 3 relacionados

    // 💅 monta o HTML dos relacionados
    if (relacionados.length === 0) {
      container.style.display = "none";
      return;
    }

    relacionados.forEach(post => {
      const card = document.createElement("article");
      card.className = "post-card";

      if (post.cover) {
        const img = document.createElement("img");
        img.src = post.cover;
        img.alt = post.title;
        card.appendChild(img);
      }

      const body = document.createElement("div");
      body.className = "post-card-body";

      const h3 = document.createElement("h3");
      h3.textContent = post.title;
      body.appendChild(h3);

      const excerpt = document.createElement("p");
      excerpt.textContent = post.excerpt || "";
      body.appendChild(excerpt);

      const btn = document.createElement("button");
      btn.className = "btn";
      btn.textContent = "Ler artigo";
      btn.onclick = () => window.location.href = "/" + post.html;
      body.appendChild(btn);

      card.appendChild(body);
      grid.appendChild(card);
    });
  } catch (err) {
    console.error("Erro ao gerar relacionados:", err);
  }
});
