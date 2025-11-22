// ============================================================
// 🤖 AUTO-PREENCHIMENTO DE DADOS DO ARTIGO
// Mantém compatibilidade total com SEO e estrutura atual
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  if (!window.ARTICLE?.title) return;

  try {
    const response = await fetch("/posts/posts.json", { cache: "no-store" });
    if (!response.ok) throw new Error("posts.json não encontrado");
    const posts = await response.json();

    // Localiza o artigo com o mesmo título
    const artigo = posts.find(p => p.title.trim() === ARTICLE.title.trim());
    if (!artigo) {
      console.warn("⚠️ Artigo não encontrado no posts.json:", ARTICLE.title);
      return;
    }

    // 🔁 Preenche dados automáticos
    ARTICLE.description = artigo.excerpt || "";
    ARTICLE.date = artigo.date || "";
    ARTICLE.author = artigo.author || "William Brioli";
    ARTICLE.cover = artigo.cover || "";
    ARTICLE.canonical = "https://williambrioli.com.br/" + artigo.html;
    ARTICLE.alt = artigo.title;
    ARTICLE.showCover = false;

    // =============================================
    // 🧠 SEO e Metatags (mantém estrutura atual)
    // =============================================
    document.title = `${ARTICLE.title} | William Brioli`;
    document.getElementById("metaTitle").textContent = ARTICLE.title;
    document.getElementById("metaDescription").content = ARTICLE.description;
    document.getElementById("ogTitle").content = ARTICLE.title;
    document.getElementById("ogDescription").content = ARTICLE.description;
    document.getElementById("ogImage").content = ARTICLE.cover;
    document.getElementById("canonicalLink").href = ARTICLE.canonical;

    // =============================================
    // 🖼️ Dados visuais do artigo
    // =============================================
    const titleEl = document.getElementById("articleTitle");
    const metaEl = document.getElementById("articleMeta");
    const coverImg = document.getElementById("articleCover");

    if (titleEl) titleEl.textContent = ARTICLE.title;

    if (metaEl && ARTICLE.date) {
      const d = new Date(ARTICLE.date);
      const dataFormatada = d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
      });
      metaEl.textContent = `${dataFormatada} • por ${ARTICLE.author}`;
    }

    if (coverImg) {
      coverImg.src = ARTICLE.cover;
      coverImg.alt = ARTICLE.alt;
      coverImg.style.display = ARTICLE.showCover ? "block" : "none";
    }

    // =============================================
    // 📝 Insere o conteúdo do artigo
    // =============================================
    const contentEl = document.getElementById("articleContent");
    if (contentEl && ARTICLE.content) {
      contentEl.innerHTML = ARTICLE.content;
    }

  } catch (err) {
    console.error("Erro ao preencher automaticamente o artigo:", err);
  }
});
