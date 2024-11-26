
async function carregarClientes() {
  const response = await fetch('http://localhost:3000/api/clientes');
  const clientes = await response.json();
  const listaClientes = document.getElementById('listaClientes');
  listaClientes.innerHTML = clientes.map(cliente => `
    <div>
      <strong>${cliente.nome}</strong> - ${cliente.telefone} - ${cliente.endereco}
      <button onclick="deletarCliente(${cliente.id})">Excluir</button>
    </div>
  `).join('');
}

async function salvarCliente(event) {
  event.preventDefault();
  const nome = document.getElementById('nome').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;

  await fetch('http://localhost:3000/api/clientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, telefone, endereco })
  });

  carregarClientes();
}

document.getElementById('clienteForm').addEventListener('submit', salvarCliente);
carregarClientes();
