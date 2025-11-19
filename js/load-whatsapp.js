function carregarWhatsApp() {
  fetch("/whatsapp.html")
    .then(resp => resp.text())
    .then(html => {
      const container = document.createElement("div");
      container.innerHTML = html;
      document.body.appendChild(container);
    })
    .catch(err => console.error("[WhatsApp] Erro ao carregar:", err));
}

document.addEventListener("DOMContentLoaded", carregarWhatsApp);
