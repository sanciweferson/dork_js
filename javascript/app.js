const app = document.getElementById("app")

// Intercepta cliques em links SPA
document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]")
  if (!link) return

  e.preventDefault()
  navegar(link.getAttribute("href"))
})

// Função principal de navegação
async function navegar(url) {
  history.pushState(null, "", url)
  await carregarPagina(url)
}

// Carrega o conteúdo da página e injeta no app
async function carregarPagina(url) {
  try {
    const resposta = await fetch(url)
    const html = await resposta.text()

    // Extrai só o conteúdo do <body>
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const conteudo = doc.body.innerHTML

    app.innerHTML = conteudo
  } catch (erro) {
    app.innerHTML = "<h2>Erro ao carregar página</h2>"
  }
}

// Suporte ao botão voltar / avançar do navegador
window.addEventListener("popstate", () => {
  carregarPagina(location.pathname)
})

// Carrega a página inicial
carregarPagina(location.pathname)
