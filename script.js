// Recupera dados salvos ou inicializa com lista vazia
let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

// Elementos DOM
const listaGastos = document.getElementById("listaGastos");
const totalEl = document.getElementById("total");
const nomeInput = document.getElementById("nome");
const valorInput = document.getElementById("valor");
const categoriaInput = document.getElementById("categoria");

// Atualiza a lista de gastos na interface
function atualizarLista() {
  listaGastos.innerHTML = "";
  let total = 0;

  gastos.forEach((gasto, index) => {
    const li = document.createElement("li");

    const texto = document.createElement("span");
    texto.textContent = `${gasto.nome} - R$ ${gasto.valor.toFixed(2)} (${gasto.categoria})`;

    const btnRemover = document.createElement("button");
    btnRemover.className = "btn-remover";
    btnRemover.textContent = "✖";
    btnRemover.setAttribute("aria-label", `Remover gasto ${gasto.nome}`);
    btnRemover.addEventListener("click", () => removerGasto(index));

    li.appendChild(texto);
    li.appendChild(btnRemover);
    listaGastos.appendChild(li);

    total += gasto.valor;
  });

  totalEl.textContent = total.toFixed(2);
}

// Remove um gasto da lista
function removerGasto(index) {
  gastos.splice(index, 1);
  salvarGastos();
  atualizarLista();
}

// Adiciona novo gasto à lista
function adicionarGasto() {
  const nome = nomeInput.value.trim();
  const valor = parseFloat(valorInput.value);
  const categoria = categoriaInput.value.trim();

  if (!nome || isNaN(valor) || valor <= 0 || !categoria) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  gastos.push({ nome, valor, categoria });
  salvarGastos();
  limparFormulario();
  atualizarLista();
}

// Salva os dados no localStorage
function salvarGastos() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Limpa os campos do formulário
function limparFormulario() {
  nomeInput.value = "";
  valorInput.value = "";
  categoriaInput.value = "";
}

// Evento para carregar a lista ao abrir a página
document.addEventListener("DOMContentLoaded", atualizarLista);
