<?php
// === upload_sitemap.php ===
// Recebe o sitemap enviado e salva na raiz do site

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['file'])) {
    $targetPath = __DIR__ . '/sitemap.xml';
    if (move_uploaded_file($_FILES['file']['tmp_name'], $targetPath)) {
        echo "✅ Sitemap atualizado com sucesso!";
    } else {
        http_response_code(500);
        echo "❌ Erro ao salvar o arquivo sitemap.xml.";
    }
} else {
    http_response_code(400);
    echo "Nenhum arquivo recebido.";
}
?>
