// ============================================================
// 🤖 AUTO-PREENCHIMENTO DE DADOS DO ARTIGO
// Mantém compatibilidade total com SEO e estrutura atual
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

    // Garante data válida (corrige erro de fuso/ISO)
    const rawDate = artigo.date;
    const parsedDate = rawDate ? new Date(rawDate + "T00:00:00") : null;

    // Preenche metadados
    const meta = {
      title: artigo.title,
      description: artigo.excerpt || "",
      author: artigo.author || "William Brioli",
      cover: artigo.cover || "",
      canonical: "https://williambrioli.com.br/" + artigo.html
    };

    // SEO tags
    document.title = `${meta.title} | William Brioli`;
    document.getElementById("metaTitle").textContent = meta.title;
    document.getElementById("metaDescription").content = meta.description;
    document.getElementById("ogTitle").content = meta.title;
    document.getElementById("ogDescription").content = meta.description;
    document.getElementById("ogImage").content = meta.cover;
    document.getElementById("canonicalLink").href = meta.canonical;

    // Preenche artigo
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
