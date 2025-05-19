document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clienteForm");
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      telefone: form.telefone.value,
      email: form.email.value,
      endereco: form.endereco.value,
      tipo: form.tipo.value,
    };

    const cpfJaExiste = clientes.some((c) => c.cpf === cliente.cpf);
    if (cpfJaExiste) {
      alert("Este CPF já está cadastrado.");
      return;
    }

    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    alert("Cliente cadastrado com sucesso!");
    form.reset();
  });
});