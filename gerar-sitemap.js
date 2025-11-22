/**
 * gerar-sitemap.js
 * 🔄 Gera sitemap.xml automaticamente com base na pasta /artigos
 * 🧠 Atualiza <lastmod> com a data atual
 * 🚀 Envia ping ao Google, Bing e Yandex
 */

const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");

// Caminho da pasta de artigos
const ARTIGOS_DIR = path.join(__dirname, "artigos");

// URLs fixas que sempre entram no sitemap
const BASE_URL = "https://williambrioli.com.br";
const URLS_FIXAS = [
  { loc: `${BASE_URL}/`, priority: "1.0" },
  { loc: `${BASE_URL}/blog.html`, priority: "0.9" },
];

// Gera a data de hoje no formato ISO
const hoje = new Date().toISOString().split("T")[0];

(async () => {
  try {
    console.log("🧩 Iniciando geração automática do sitemap...");

    // --- 1️⃣ Lê todos os arquivos da pasta /artigos ---
    const arquivos = fs.readdirSync(ARTIGOS_DIR)
      .filter(file => file.endsWith(".html"))
      .sort();

    // --- 2️⃣ Gera as URLs dos artigos ---
    const urlsArtigos = arquivos.map(nome => {
      const loc = `${BASE_URL}/artigos/${nome}`;
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    }).join("\n");

    // --- 3️⃣ Monta o XML final ---
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${URLS_FIXAS.map(u => `
  <url>
    <loc>${u.loc}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
${urlsArtigos}
</urlset>`.trim();

    // --- 4️⃣ Salva o sitemap.xml ---
    fs.writeFileSync(path.join(__dirname, "sitemap.xml"), xml, "utf8");
    console.log("✅ Sitemap gerado com sucesso!");

    // --- 5️⃣ Valida rapidamente o arquivo ---
    if (!xml.includes("<urlset") || !xml.includes("<url>")) {
      throw new Error("❌ XML inválido. O sitemap não contém URLs.");
    }

    // --- 6️⃣ Envia pings automáticos ---
    const sitemapURL = encodeURIComponent(`${BASE_URL}/sitemap.xml`);
    const pingUrls = [
      `https://www.google.com/ping?sitemap=${sitemapURL}`,
      `https://www.bing.com/ping?sitemap=${sitemapURL}`,
      `https://webmaster.yandex.com/ping?sitemap=${sitemapURL}`,
    ];

    console.log("📡 Enviando pings para mecanismos de busca...");
    for (const pingURL of pingUrls) {
      try {
        const res = await fetch(pingURL);
        console.log(`   🔗 Ping enviado: ${pingURL} [${res.status}]`);
      } catch (err) {
        console.warn(`   ⚠️ Falha ao pingar ${pingURL}:`, err.message);
      }
    }

    console.log("🎯 Processo concluído com sucesso!");

  } catch (err) {
    console.error("❌ Erro ao gerar sitemap:", err);
    process.exit(1);
  }
})();
