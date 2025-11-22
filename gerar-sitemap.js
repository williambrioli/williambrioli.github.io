/**
 * gerar-sitemap.js
 * Gera sitemap.xml automaticamente com data atual e envia ping ao Google
 */
const fs = require('fs');
const fetch = require('node-fetch');

(async () => {
  try {
    // Lê o arquivo posts.json
    const postsData = JSON.parse(fs.readFileSync('./posts/posts.json', 'utf8'));

    // Data atual em formato ISO
    const hoje = new Date().toISOString().split('T')[0];

    // Gera blocos de URL
    const urls = postsData.map(p => `
  <url>
    <loc>https://williambrioli.com.br/${p.html}</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n');

    // Monta o XML completo
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://williambrioli.com.br/</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://williambrioli.com.br/blog.html</loc>
    <lastmod>${hoje}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  ${urls}
</urlset>`.trim();

    // Salva o sitemap.xml na raiz do projeto
    fs.writeFileSync('sitemap.xml', xml, 'utf8');
    console.log('✅ sitemap.xml atualizado com sucesso.');

    // Envia ping para o Google
    const sitemapURL = encodeURIComponent('https://williambrioli.com.br/sitemap.xml');
    const pingURL = `https://www.google.com/ping?sitemap=${sitemapURL}`;
    await fetch(pingURL);
    console.log('📣 Ping enviado ao Google.');

  } catch (err) {
    console.error('❌ Erro ao gerar sitemap:', err);
    process.exit(1);
  }
})();
