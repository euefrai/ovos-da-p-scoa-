let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const lista = document.getElementById("lista-carrinho");
const totalEl = document.getElementById("total");

function salvar() {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    renderizarCarrinho();
}

function aumentar(id) {
    carrinho.find(i => i.id === id).quantidade++;
    salvar();
}

function diminuir(id) {
    const item = carrinho.find(i => i.id === id);
    item.quantidade--;

    if (item.quantidade <= 0) {
        carrinho = carrinho.filter(i => i.id !== id);
    }

    salvar();
}

function remover(id) {
    carrinho = carrinho.filter(i => i.id !== id);
    salvar();
}

function renderizarCarrinho() {
    lista.innerHTML = "";
    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio 🐰</p>";
        totalEl.innerText = "R$ 0,00";
        return;
    }

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("card-produto");

        div.innerHTML = `
            <h3>${item.nome}</h3>
            <p>R$ ${item.preco.toFixed(2)}</p>

            <div class="quantidade">
                <button onclick="diminuir('${item.id}')">−</button>
                <span>${item.quantidade}</span>
                <button onclick="aumentar('${item.id}')">+</button>
            </div>

            <p><strong>Subtotal:</strong> R$ ${subtotal.toFixed(2)}</p>

            <button class="btn-remover" onclick="remover('${item.id}')">
                Remover ❌
            </button>
        `;

        lista.appendChild(div);
    });

    totalEl.innerText = `R$ ${total.toFixed(2)}`;
}

renderizarCarrinho();

// ============================
// FINALIZAR PEDIDO
// ============================

function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    const nome = document.getElementById("nome").value.trim();
    const endereco = document.getElementById("endereco").value.trim();
    const obs = document.getElementById("observacoes").value.trim();

    if (!nome || !endereco) {
        alert("Por favor, preencha nome e endereço.");
        return;
    }

    let totalPedido = 0;
    let totalItens = 0;

    let mensagem = "🐰🍫 *PEDIDO - OVOS DE PÁSCOA*\n\n";
    mensagem += "*📦 Itens do pedido:*\n";

    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        totalPedido += subtotal;
        totalItens += item.quantidade;

        mensagem += `• ${item.nome}\n`;
        mensagem += `   Quantidade: ${item.quantidade}\n`;
        mensagem += `   Valor unitário: R$ ${item.preco.toFixed(2)}\n`;
        mensagem += `   Subtotal: R$ ${subtotal.toFixed(2)}\n\n`;
    });

    mensagem += "-------------------------\n";
    mensagem += `🧮 *Total de itens:* ${totalItens}\n`;
    mensagem += `💰 *Total do pedido:* R$ ${totalPedido.toFixed(2)}\n`;
    mensagem += "-------------------------\n\n";

    mensagem += "*📍 Dados do cliente:*\n";
    mensagem += `👤 Nome: ${nome}\n`;
    mensagem += `🏠 Endereço: ${endereco}\n`;

    if (obs) {
        mensagem += `📝 Observações: ${obs}\n`;
    }

    mensagem += "\n🙏 Obrigado pela preferência!";

    const telefone = "5573988424147"; // SEM +
    const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");

    // Limpar carrinho após envio
    localStorage.removeItem("carrinho");
    carrinho = [];
}
