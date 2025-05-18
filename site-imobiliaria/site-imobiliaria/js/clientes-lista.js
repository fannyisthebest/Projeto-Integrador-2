document.addEventListener("DOMContentLoaded", () => {
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
  const tbody = document.querySelector("#clientesTable tbody");

  if (clientes.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;">Nenhum cliente cadastrado.</td></tr>';
    return;
  }

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${cliente.nome}</td>
      <td>${cliente.cpf}</td>
      <td>${cliente.telefone}</td>
      <td>${cliente.email}</td>
      <td>${cliente.endereco}</td>
      <td>${cliente.tipo}</td>
    `;

    tbody.appendChild(tr);
  });
});