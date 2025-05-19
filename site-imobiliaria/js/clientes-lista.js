document.addEventListener("DOMContentLoaded", () => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const tbody = document.querySelector("#clientesTable tbody");

  if (clientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Nenhum cliente cadastrado.</td></tr>';
    return;
  }

  clientes.forEach((cliente, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email}</td>
      <td>${cliente.endereco || ''}</td>
      <td>${cliente.tipo || ''}</td>
      <td>
        <button class="editar" onclick="editCliente(${index})">Editar</button>
        <button class="excluir" onclick="deleteCliente(${index})">Excluir</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
});

function editCliente(index) {
  const clientes = JSON.parse(localStorage.getItem("clientes"));
  const cliente = clientes[index];

  document.getElementById("editNome").value = cliente.nome;
  document.getElementById("editCPF").value = cliente.cpf;
  document.getElementById("editTelefone").value = cliente.telefone;
  document.getElementById("editEmail").value = cliente.email;
  document.getElementById("editEndereco").value = cliente.endereco;
  document.getElementById("editTipo").value = cliente.tipo;

  document.getElementById("editModal").classList.remove("hidden");

  document.getElementById("saveEdit").onclick = () => {
    cliente.nome = document.getElementById("editNome").value;
    cliente.telefone = document.getElementById("editTelefone").value;
    cliente.email = document.getElementById("editEmail").value;
    cliente.endereco = document.getElementById("editEndereco").value;
    cliente.tipo = document.getElementById("editTipo").value;

    clientes[index] = cliente;
    localStorage.setItem("clientes", JSON.stringify(clientes));
    location.reload();
  };
}

function deleteCliente(index) {
  if (confirm("Deseja excluir este cliente?")) {
    const clientes = JSON.parse(localStorage.getItem("clientes"));
    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    location.reload();
  }
}

function closeModal() {
  document.getElementById("editModal").classList.add("hidden");
}