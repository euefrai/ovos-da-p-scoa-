let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const botoesAdicionar = document.querySelectorAll(".btn-adicionar");
const contador = document.getElementById("contador-carrinho");

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const id = botao.dataset.id;
        const nome = botao.dataset.nome;
        const preco = parseFloat(botao.dataset.preco);

        adicionarAoCarrinho(id, nome, preco);
    });
});

function adicionarAoCarrinho(id, nome, preco) {
    const item = carrinho.find(p => p.id === id);

    if (item) {
        item.quantidade++;
    } else {
        carrinho.push({ id, nome, preco, quantidade: 1 });
    }

    salvarCarrinho();
    atualizarContador();
    alert("Produto adicionado ao carrinho 🛒");
}

function salvarCarrinho() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function atualizarContador() {
    if (!contador) return;
    const totalItens = carrinho.reduce((soma, item) => soma + item.quantidade, 0);
    contador.innerText = totalItens;
}

atualizarContador();
