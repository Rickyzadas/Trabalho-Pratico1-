// Dados das receitas (JSON)
const dados = {
    "receitas": [
        {
            "id": 1,
            "titulo": "Ovos Perfeitos",
            "descricao": "Aprenda a fazer ovos fritos e cozidos perfeitos.",
            "conteudo": "Técnicas para ovos mexidos, pochê e cozidos.",
            "tempo": "10 min",
            "dificuldade": "Fácil",
            "categoria": "Lanches",
            "destaque": true,
            "imagem_principal": "Ovos.webp",
            "ingredientes": ["2 ovos", "Sal", "Pimenta", "Manteiga"],
            "modo_preparo": [
                "Aqueça a frigideira com manteiga.",
                "Quebre os ovos sem furar a gema.",
                "Cozinhe em fogo baixo até o ponto desejado."
            ]
        },
        {
            "id": 2,
            "titulo": "Batatas Crocantes",
            "descricao": "Batatas fritas e assadas perfeitas.",
            "conteudo": "Dicas para deixar as batatas douradas por fora e macias por dentro.",
            "tempo": "30 min",
            "dificuldade": "Médio",
            "categoria": "Acompanhamentos",
            "destaque": true,
            "imagem_principal": "batatas.jpg",
            "ingredientes": ["4 batatas", "Óleo", "Sal", "Páprica"],
            "modo_preparo": [
                "Corte as batatas em palitos.",
                "Frite em óleo quente até dourarem.",
                "Tempere com sal e páprica."
            ]
        },
        {
            "id": 3,
            "titulo": "Brownie de Chocolate",
            "descricao": "Brownie fudgy com casca crocante.",
            "conteudo": "Receita fácil e rápida para um brownie irresistível.",
            "tempo": "40 min",
            "dificuldade": "Fácil",
            "categoria": "Sobremesas",
            "destaque": false,
            "imagem_principal": "brownie.jpg",
            "ingredientes": ["200g chocolate", "100g manteiga", "2 ovos", "1 xícara de açúcar"],
            "modo_preparo": [
                "Derreta o chocolate com a manteiga.",
                "Misture os ovos e o açúcar.",
                "Asse em forno pré-aquecido a 180°C por 25 min."
            ]
        }
    ]
};

// Carrega o carrossel de destaques
function carregarDestaques() {
    const destaques = dados.receitas.filter(receita => receita.destaque);
    const carouselInner = document.getElementById('carousel-inner');
    const carouselIndicators = document.getElementById('carousel-indicators');

    if (destaques.length === 0) {
        carouselInner.innerHTML = `
            <div class="carousel-item active">
                <img src="https://via.placeholder.com/800x400?text=Nenhum+destaque+disponível" class="d-block w-100" alt="Sem destaques">
                <div class="carousel-caption">
                    <h5>Nenhum destaque disponível</h5>
                    <p>Volte mais tarde para conferir nossas receitas em destaque!</p>
                </div>
            </div>
        `;
        return;
    }

    destaques.forEach((receita, index) => {
        // Indicadores
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.setAttribute('data-bs-target', '#carouselDestaques');
        indicator.setAttribute('data-bs-slide-to', index);
        if (index === 0) indicator.classList.add('active');
        carouselIndicators.appendChild(indicator);

        // Itens do carrossel
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
            <img src="${receita.imagem_principal}" class="d-block w-100" alt="${receita.titulo}">
            <div class="carousel-caption">
                <h3>${receita.titulo}</h3>
                <p>${receita.descricao}</p>
                <a href="detalhes.html?id=${receita.id}" class="btn btn-primary">Ver Receita</a>
            </div>
        `;
        carouselInner.appendChild(item);
    });
}

// Carrega os cards de receitas
function carregarCards() {
    const cardGroup = document.getElementById('card-group-receitas');
    
    if (dados.receitas.length === 0) {
        cardGroup.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info text-center">
                    Nenhuma receita cadastrada ainda. Volte mais tarde!
                </div>
            </div>
        `;
        return;
    }

    dados.receitas.forEach(receita => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${receita.imagem_principal}" class="card-img-top" alt="${receita.titulo}">
            <div class="card-body">
                <h5 class="card-title">${receita.titulo}</h5>
                <p class="card-text">${receita.descricao}</p>
            </div>
            <div class="card-footer">
                <a href="detalhes.html?id=${receita.id}" class="btn btn-sm btn-primary">Ver Receita</a>
                <small class="text-muted float-end">${receita.tempo} | ${receita.dificuldade}</small>
            </div>
        `;
        cardGroup.appendChild(card);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    carregarDestaques();
    carregarCards();
});
// Função para carregar os detalhes da receita
function carregarDetalhes() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));
    const receita = dados.receitas.find(r => r.id === id);

    if (receita) {
        // Informações básicas
        document.getElementById('titulo-receita').textContent = receita.titulo;
        document.getElementById('imagem-receita').src = receita.imagem_principal;
        document.getElementById('imagem-receita').alt = receita.titulo;
        document.querySelector('.tempo-texto').textContent = receita.tempo;
        document.querySelector('.dificuldade-texto').textContent = receita.dificuldade;
        document.querySelector('.categoria-texto').textContent = receita.categoria;
        document.getElementById('descricao-receita').textContent = receita.descricao;

        // Ingredientes
        const listaIngredientes = document.getElementById('lista-ingredientes');
        listaIngredientes.innerHTML = '';
        receita.ingredientes.forEach(ingrediente => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = ingrediente;
            listaIngredientes.appendChild(li);
        });

        // Modo de preparo
        const passosPreparo = document.getElementById('passos-preparo');
        passosPreparo.innerHTML = '';
        receita.modo_preparo.forEach(passo => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = passo;
            passosPreparo.appendChild(li);
        });

        // Fotos adicionais (se existirem)
        const fotosContainer = document.getElementById('fotos-receita');
        fotosContainer.innerHTML = '';
        if (receita.imagens_complementares && receita.imagens_complementares.length > 0) {
            receita.imagens_complementares.forEach(foto => {
                const col = document.createElement('div');
                col.className = 'col-md-4 col-6';
                col.innerHTML = `
                    <div class="card h-100">
                        <img src="${foto.src}" class="card-img-top" alt="${foto.descricao}">
                        <div class="card-body">
                            <p class="card-text small">${foto.descricao}</p>
                        </div>
                    </div>
                `;
                fotosContainer.appendChild(col);
            });
        } else {
            fotosContainer.innerHTML = '<p class="text-center text-muted">Nenhuma foto adicional disponível</p>';
        }
    } else {
        window.location.href = 'index.html';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('detalhes.html')) {
        carregarDetalhes();
    }
});