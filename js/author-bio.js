const authorBioHTML = `
<P><strong>SOBRE O AUTOR:</strong><br>
<p><strong>William Brioli</strong> é <strong>Psicanalista Clínico Integrativo</strong>, 
pós-graduado em <strong>Neurociência, Comunicação e Desenvolvimento Humano</strong>.<br>
Atende presencialmente em <strong>Ilha Solteira (SP)</strong> e 
<strong>online para todo o Brasil</strong>.<br>
Atua com <strong>psicoterapia individual, terapia de casal, empreendedores, carreira 
e desenvolvimento emocional</strong>.
</p>
`;

document.addEventListener("DOMContentLoaded", () => {
  const el = document.getElementById("authorBio");
  if (el) el.innerHTML = authorBioHTML;
});
