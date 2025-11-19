// ================================================================
// /js/search-data.js
// Cabeçalho geral:
// Este arquivo cria um objeto global `window.SEARCH_DATA` que guarda
// a lista de posts do site e uma função assíncrona `load()` para
// carregar esses posts a partir do arquivo '/posts/posts.json'.
// Em resumo:
// - Guarda os posts em memória (this.posts)
// - Quando chamado, tenta carregar posts.json (uma vez) e retorna os posts
// - Se já carregou antes, retorna os posts em memória (evita refetch)
// - Tem tratamento de erro para nunca quebrar o site
// ================================================================

window.SEARCH_DATA = {             // Cria um objeto no escopo global chamado SEARCH_DATA
  posts: [],                       // ← Propriedade "posts": começa vazia; aqui armazenamos os posts

  // --- Bloco: Função assíncrona load() ---
  // Esta função carrega os posts do arquivo JSON se ainda não tiver carregado.
  async load() {                    // Declara a função assíncrona 'load'
    if (this.posts.length > 0) return this.posts; // Se já houver posts carregados, retorna eles imediatamente

    try {                           // Tenta executar o bloco de carregamento (tratando erros)
      const res = await fetch('/posts/posts.json', { cache: 'no-store' }); // Faz uma requisição ao arquivo posts.json (sem cache)
      if (!res.ok) throw new Error('Erro carregando posts.json'); // Se a resposta HTTP NÃO for 200-299, lança um erro
      this.posts = await res.json(); // Se estiver tudo ok, converte a resposta para JSON e guarda em this.posts
      return this.posts;             // Retorna a lista de posts carregada
    } catch (e) {                    // Se ocorrer qualquer erro no try acima
      console.error('[SEARCH_DATA] erro:', e); // Mostra o erro no console (útil para debug)
      return [];                     // Retorna uma lista vazia como fallback seguro
    }
  }
}; // Fim de window.SEARCH_DATA
