const cardsHTML = document.getElementById('cards');
const nResultadosHtml = document.getElementById('numerodeLivros');

let listaLivros = [];

function gerarHTMLFavoritos(arr) {
    cardsHTML.innerHTML = '';
    nResultadosHtml.innerHTML = `${arr.length} livros favoritos encontrados.`;
    
    if (arr.length === 0) {
        cardsHTML.innerHTML = '<h2 style="text-align: center; width: 100%;">Você ainda não adicionou nenhum favorito!</h2>';
        return;
    }

    arr.forEach(element => {
        cardsHTML.innerHTML += `
        <div class="card">
            <h3 class="titulo">${element.title}</h3>
            <p class="autor">${element.author_name.map((ele) => ele).join(', ')}</p>
            <div class="data"><img src="imgs/calendar-days.png" alt="">${element.first_publish_year}</div>
            <button type='button' data-id="${element.id}" class="heart">
                ${element.fav ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
            </button>
        </div>`;
    });
}


let dadosSalvos = localStorage.getItem("array");

if (dadosSalvos) {
    listaLivros = JSON.parse(dadosSalvos);

    let apenasFavoritos = listaLivros.filter(e => e.fav === true);
    gerarHTMLFavoritos(apenasFavoritos);
} else {
    nResultadosHtml.innerHTML = "0 livros favoritos encontrados.";
    cardsHTML.innerHTML = '<h2 style="text-align: center; width: 100%;">Você ainda não adicionou nenhum favorito!</h2>';
}

cardsHTML.addEventListener('click', (event) => {
    let botaoCoracao = event.target.closest('.heart');
    
    if (botaoCoracao) {
        let id = botaoCoracao.dataset.id;
        
        listaLivros.forEach(e => {
            if (e.id == id) {
                e.fav = !e.fav;
            }
        });
        
        localStorage.setItem("array", JSON.stringify(listaLivros));
        
        let atualizadoFavoritos = listaLivros.filter(e => e.fav === true);
        gerarHTMLFavoritos(atualizadoFavoritos);
    }
});
