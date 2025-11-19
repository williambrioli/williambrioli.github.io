// ================================================================
// /js/load-whatsapp.js
// Cabeçalho geral:
// Este arquivo é responsável por carregar automaticamente,
// via AJAX (fetch), o arquivo "whatsapp.html" e inserir
// esse conteúdo dentro da página.
//
// Depois que o HTML é inserido no DOM, ele procura o botão
// flutuante do WhatsApp (waFab) e conecta o clique dele
// à função openWA(), que abre o WhatsApp com a mensagem
// apropriada.
//
// Em resumo:
// 1. Carrega o código HTML do botão de WhatsApp.
// 2. Injeta esse HTML no final do <body>.
// 3. Conecta o botão ao WhatsApp.
// 4. Garante que tudo só acontece depois que a página carrega.
// ================================================================


// --- BLOCO: Função principal que carrega o WhatsApp ---
function carregarWhatsApp() {

  // Faz uma requisição para pegar o conteúdo do arquivo /whatsapp.html.
  fetch("/whatsapp.html")

    // Quando a resposta chega, convertemos ela para texto.
    .then(resp => resp.text())

    // Quando o texto é obtido, recebemos ele aqui na variável "html".
    .then(html => {

      // Criamos uma <div> vazia apenas para inserir o HTML baixado.
      const container = document.createElement("div");

      // Jogamos dentro da div o conteúdo do whatsapp.html.
      container.innerHTML = html;

      // Agora adicionamos essa div no final do <body>.
      document.body.appendChild(container);


      // 🔥 Depois que o botão existir no DOM, conecta o clique
      // Agora procuramos o botão flutuante do WhatsApp,
      // que deve ter id="waFab".
      const waFab = document.getElementById("waFab");

      // Se o botão existir, conectamos eventos nele.
      if (waFab) {

        // Conecta o clique diretamente no botão.
        waFab.addEventListener("click", (e) => {
          e.preventDefault(); // Impede comportamento padrão do link.

          // Verifica se a função openWA existe.
          if (typeof openWA === "function") {

            // Chama openWA com a mensagem padrão "generic".
            openWA("generic");
          }
        });

        // Também adiciona clique no elemento pai do botão.
        // Isso garante que mesmo clicando em volta funcione.
        if (waFab.parentElement) {

          waFab.parentElement.addEventListener("click", (e) => {
            e.preventDefault(); // Evita navegação padrão.

            // Mesma lógica: chama openWA se existir.
            if (typeof openWA === "function") {
              openWA("generic");
            }
          });
        }
      }
    })

    // Caso algo dê errado no fetch (erro de rede, arquivo faltando...),
    // mostramos o erro no console.
    .catch(err => console.error("[WhatsApp] Erro ao carregar:", err));
}


// --- BLOCO: Aciona o carregamento somente quando o DOM estiver pronto ---
document.addEventListener("DOMContentLoaded", carregarWhatsApp);
