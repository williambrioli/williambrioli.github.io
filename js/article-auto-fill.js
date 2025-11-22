// ============================================================
// 🤖 AUTO-PREENCHIMENTO DE DADOS DO ARTIGO
// Versão final – SEO completo + autor dinâmico
// ============================================================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/posts/posts.json", { cache: "no-store" });
    const posts = await res.json();

    // Localiza o artigo pelo título
    const artigo = posts.find(p => p.title.trim() === ARTICLE.title.trim());
    if (!artigo) {
      console.warn("Artigo não encontrado no posts.json para:", ARTICLE.title);
      return;
    }

    // Corrige data e fuso
    const rawDate = artigo.date;
    const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;

    // Dados consolidados
    const meta = {
      title: artigo.title,
      description: artigo.excerpt || "",
      author: artigo.author || "Autor não informado",
      cover: artigo.cover || "",
      canonical: "https://williambrioli.com.br/" + artigo.html
    };

    // ================================
    // 🧭 SEO TAGS
    // ================================
    document.title = `${meta.title} | ${meta.author}`;
    document.getElementById("metaTitle").textContent = meta.title;
    document.getElementById("metaDescription").content = meta.description;
    document.getElementById("ogTitle").content = meta.title;
    document.getElementById("ogDescription").content = meta.description;
    document.getElementById("ogImage").content = meta.cover;
    document.getElementById("canonicalLink").href = meta.canonical;

    // Atualiza também o <meta name="author">
    const authorTag = document.querySelector('meta[name="author"]');
    if (authorTag) authorTag.content = meta.author;

    // ================================
    // 📰 CONTEÚDO DO ARTIGO
    // ================================
    document.getElementById("articleTitle").textContent = meta.title;

    const dateStr = parsedDate
      ? parsedDate.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "numeric"
        })
      : "Data não disponível";

    document.getElementById("articleMeta").textContent =
      `${dateStr} • por ${meta.author}`;

    // Capa
    const coverImg = document.getElementById("articleCover");
    if (meta.cover) {
      coverImg.src = meta.cover;
      coverImg.alt = meta.title;
      coverImg.style.display = "block";
    } else {
      coverImg.style.display = "none";
    }

  } catch (err) {
    console.error("Erro ao preencher metadados:", err);
  }
});
