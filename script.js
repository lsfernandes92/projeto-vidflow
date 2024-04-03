const videosEndpoint = "https://videos-api-two.vercel.app/videos"
const containerVideos = document.querySelector(".videos__container")
const barraDePesquisa = document.querySelector(".pesquisar__input")
const categoriaSecaoSuperior = document.querySelectorAll(".superior__item")

async function buscarEMostrarVideos() {
  try {
    const busca = await fetch(videosEndpoint)
    const videos = await busca.json()
  
    videos.forEach(video => {
      if (video.categoria == "") {
        throw new Error("Algum dos vídeos não tem categoria")
      }

      containerVideos.innerHTML += `
        <li class="videos__item">
          <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowfullscreen></iframe>
          <div class="descricao-video">
            <img class="img-canal" src="${video.imagem}" alt="Logo do canal">
            <h3 class="titulo-video">${video.titulo}</h3>
            <p class="visualizacoes-video">${video.descricao}</p>
            <p class="categoria-video" hidden>${video.categoria}</p>
          </div>
        </li>
      `
    })
  } catch (error) {
    containerVideos.innerHTML = `<p>Houve um erro ao carregar os vídeos. ${error}</p>`
  }
}

buscarEMostrarVideos()

barraDePesquisa.addEventListener("input", filtrarPesquisa)

function filtrarPesquisa() {
  const videos = document.querySelectorAll('.videos__item');
  const valorFiltro = barraDePesquisa.value.toLowerCase();

  videos.forEach((video) => {
    const titulo = video.querySelector('.titulo-video').textContent.toLowerCase();

    video.style.display = valorFiltro ? titulo.includes(valorFiltro) ? 'block' : 'none' : 'block';
  });
}

categoriaSecaoSuperior.forEach(categoria => {
  const nomeCategoria = categoria.textContent.toLowerCase()
  categoria.addEventListener("click", () => filtrarPesquisaPorCategoria(nomeCategoria))
});

function filtrarPesquisaPorCategoria(categoria) {
  const videos = document.querySelectorAll('.videos__item');
  
  videos.forEach(video => {
    const categoriaVideo = video.querySelector(".categoria-video").textContent.toLowerCase()

    video.style.display =
      categoria.includes(categoriaVideo) || categoria == "tudo" ? "block" : "none"
  });
}
