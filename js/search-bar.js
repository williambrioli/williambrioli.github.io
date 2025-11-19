// ================================================================
// /js/search-bar.js
//
// Cabeçalho geral:
// Este arquivo cria e controla a BARRA DE PESQUISA do blog.
// Ele faz o seguinte:
//
// 1. Carrega a lista de posts do site (window.SEARCH_DATA).
// 2. Procura o espaço onde a barra deve aparecer (searchContainer).
// 3. Insere o HTML da barra de pesquisa automaticamente.
// 4. Escuta digitação no campo.
// 5. Filtra os posts conforme o usuário escreve.
// 6. Exibe os resultados em tempo real.
//
// Tudo isso é feito dentro de uma função assíncrona autoexecutada,
// garantindo que nada vaze para o escopo global.
// ================================================================


// ===================================================================
// BLOCO: Função assíncrona autoexecutada (IIFE)
// -------------------------------------------------------------------
// Esta função começa a rodar assim que o arquivo é carregado.
// O "async" permite usar "await" dentro dela.
// ===================================================================
(async function () {

  // ----------------------------------------------------------------
  // BLOCO: Carregar posts de SEARCH_DATA
  // ----------------------------------------------------------------
  // Tenta acessar window.SEARCH_DATA.load()
  // Caso não exista, usa lista vazia "[]".
  // O ?. é uma checagem segura ("só chama se existir").
  const posts = await (window.SEARCH_DATA?.load?.() ?? []);

  // ----------------------------------------------------------------
  // BLOCO: Verificar se existe o container da barra de pesquisa
  // ----------------------------------------------------------------
  // Procura o elemento onde o HTML da barra será inserido.
  const container = document.getElementById("searchContainer");

  // Se o container não existe, sai da função e não faz nada.
  if (!container) return;

  // ----------------------------------------------------------------
  // BLOCO: Inserir o HTML da barra de pesquisa
  // ----------------------------------------------------------------
  container.innerHTML = `
    <div class="search-bar-wrap">
      <input type="text" id="searchInput" placeholder="Pesquisar artigos…" autocomplete="off"/>
      <ul id="searchResults" class="search-results"></ul>
    </div>
  `;

  // ----------------------------------------------------------------
  // BLOCO: Pegar referências aos elementos recém-criados
  // ----------------------------------------------------------------
  const input = document.getElementById("searchInput");   // campo de texto
  const results = document.getElementById("searchResults"); // lista de resultados

  // ----------------------------------------------------------------
  // BLOCO: Renderizar resultados na tela
  // ----------------------------------------------------------------
  function renderResults(list) {

    // Se a lista de resultados estiver vazia → mostra "Nenhum resultado".
    if (!list.length) {
      results.innerHTML = `<li class="no-results">Nenhum resultado encontrado</li>`;
      return;
    }

    // Se encontrou resultados → monta cada <li> usando map().
    results.innerHTML = list.map(post => `
      <li class="result-item">
        <a href="/${post.html}">
          <strong>${post.title}</strong><br>
          <small>${post.excerpt || ""}</small>
        </a>
      </li>
    `).join('');  
    // join('') → junta todos os <li> em uma única string.
  }

  // ----------------------------------------------------------------
  // BLOCO: Listener do campo de pesquisa (quando o usuário digita)
  // ----------------------------------------------------------------
  input.addEventListener("input", () => {

    // Pega o texto que o usuário digitou
    const q = input.value.trim().toLowerCase();

    // Se o campo estiver vazio → limpa resultados e sai
    if (!q) {
      results.innerHTML = "";
      return;
    }

    // ----------------------------------------------------------------
    // BLOCO: Filtrar posts pelo texto digitado
    // ----------------------------------------------------------------
    // Procuramos o texto digitado:
    //   • no título
    //   • no resumo (excerpt)
    //   • nas tags
    const found = posts.filter(post =>
      post.title?.toLowerCase().includes(q) ||       // busca no título
      post.excerpt?.toLowerCase().includes(q) ||     // busca no resumo
      JSON.stringify(post.tags || []).toLowerCase().includes(q) // busca nas tags
    );

    // Mostra os resultados filtrados na tela.
    renderResults(found);
  });

})(); // ← fim da função autoexecutada
