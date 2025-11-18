window.SEARCH_DATA = {
  posts: [],

  async load() {
    if (this.posts.length > 0) return this.posts;

    try {
      const res = await fetch('/posts/posts.json', { cache: 'no-store' });
      if (!res.ok) throw new Error('Erro carregando posts.json');
      this.posts = await res.json();
      return this.posts;
    } catch (e) {
      console.error('[SEARCH_DATA] erro:', e);
      return [];
    }
  }
};
