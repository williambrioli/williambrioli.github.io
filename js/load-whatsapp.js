function carregarWhatsApp() {
  fetch("/whatsapp.html")
    .then(resp => resp.text())
    .then(html => {
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);

      // 🔥 Depois que o botão existir no DOM, conecta o clique
      const waFab = document.getElementById("waFab");
      if (waFab) {
        waFab.addEventListener("click", (e) => {
          e.preventDefault();
          if (typeof openWA === "function") {
            openWA("generic");
          }
        });

        // Se clicar no container externo também funciona
        if (waFab.parentElement) {
          waFab.parentElement.addEventListener("click", (e) => {
            e.preventDefault();
            if (typeof openWA === "function") {
              openWA("generic");
            }
          });
        }
      }
    })
    .catch(err => console.error("[WhatsApp] Erro ao carregar:", err));
}

document.addEventListener("DOMContentLoaded", carregarWhatsApp);
