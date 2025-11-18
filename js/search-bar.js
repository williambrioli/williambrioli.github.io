(async function () {
  // Aguarda carregar posts
  const posts = await (window.SEARCH_DATA?.load?.() ?? []);

  // Se não existe container → não faz nada
  const container = document.getElementById("searchContainer");
  if (!container) return;

  // Insere HTML da barra
  container.innerHTML = `
    <div class="search-bar-wrap">
      <input type="text" id="searchInput" placeholder="Pesquisar artigos…" autocomplete="off"/>
      <ul id="searchResults" class="search-results"></ul>
    </div>
  `;

  const input = document.getElementById("searchInput");
  const results = document.getElementById("searchResults");

  function renderResults(list) {
    if (!list.length) {
      results.innerHTML = `<li class="no-results">Nenhum resultado encontrado</li>`;
      return;
    }

    results.innerHTML = list.map(post => `
      <li class="result-item">
        <a href="/artigos/${post.html}">
          <strong>${post.title}</strong><br>
          <small>${post.excerpt || ""}</small>
        </a>
      </li>
    `).join('');
  }

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    if (!q) {
      results.innerHTML = "";
      return;
    }

    const found = posts.filter(post =>
      post.title?.toLowerCase().includes(q) ||
      post.excerpt?.toLowerCase().includes(q) ||
      JSON.stringify(post.tags || []).toLowerCase().includes(q)
    );

    renderResults(found);
  });
})();
