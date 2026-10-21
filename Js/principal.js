let cardsHTML = document.getElementById('cards');
let nResultadosHtml = document.getElementById('numerodeLivros');
let copia = [];
let psqsarBtn = document.getElementById('bt');
function gerarHTML(arr){
      cardsHTML.innerHTML = '';
      nResultadosHtml.innerHTML = `${arr.length} livros encontrados.`;
        arr.forEach(element => {
            cardsHTML.innerHTML += 
            `<div class="card"">
                <h3 class="titulo">${element.title}</h3>
                <p class="autor">${element.author_name.map((ele) => {return ele})}</p>
                <div class="data"><img src="imgs/calendar-days.png" alt="">${element.first_publish_year}</div>
                <button type='button'  data-id="${element.id}" class="heart">${element.fav ? 'Remover dos favoritos' : 'Adicionar dos favoritos'}</button>
            </div>`
        });
    }

    async function buscarLivros(){
        try{
        let n = 1;
        let resposta = await fetch('https://openlibrary.org/search.json?q=javascript');
        
        if(!resposta.ok){
            throw new Error('algo deu errado ' + resposta.status)
        }

        let dados = await resposta.json();
        let {numFound: nResultado, docs} = dados;
        copia = docs;
        //document.body.innerHTML = JSON.stringify(docs[0]);
        copia.forEach(ele => {ele.id = n++; ele.fav = false});
        if(localStorage.getItem('array')){
          copia = JSON.parse(localStorage.getItem("array"))
        }
        gerarHTML(copia.filter(e => e.id < 11));
        
        }
        catch(err){
            alert(err.message)
        }
    }

    cardsHTML.addEventListener('click', (event) => {
      let botaoCoracao = event.target.closest('.heart');
      if (botaoCoracao) {
            let id = botaoCoracao.dataset.id;
            let favorito = copia.filter(e => e.id == id);
            favorito.forEach(e => e.fav = !e.fav);
            localStorage.setItem("array", JSON.stringify(copia));
            gerarHTML(copia.filter(e => e.id < 11));
      }
    });

    psqsarBtn.addEventListener('click', () => {
        // e.author_name.filter(n => n.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(campoDePsqsa))
        let campoDePsqsa = document.getElementById('campo').value.trim().toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        let res = copia.filter(e => e.title.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(campoDePsqsa));
        
        if(res.length == 0){
          gerarHTML(res)
            cardsHTML.innerHTML = '<h1 style="color: red; text-align: center;">Nenhum resultado encontrado!<h1>'
            cardsHTML.insertAdjacentHTML('afterend', '<a href="index.html" style="padding: 5px">Voltar</a>')
        }
        else{
          gerarHTML(res)
          cardsHTML.insertAdjacentHTML('afterend', '<a href="index.html" style="padding: 5px">Voltar</a>')
        }
        
    })

    buscarLivros();