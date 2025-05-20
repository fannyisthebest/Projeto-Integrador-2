document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("clienteForm");
  const cpfInput = document.getElementById("cpf");
  const telefoneInput = document.getElementById("telefone");
  const emailInput = document.getElementById("email");
  const cepInput = document.getElementById("cep");
  const ruaInput = document.getElementById("rua");
  const bairroInput = document.getElementById("bairro");
  const numeroInput = document.getElementById("numero");
  const tipoSelect = document.getElementById("tipo");

  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  // Preenchimento de rua e bairro pelo CEP
  cepInput.addEventListener("blur", () => {
    const cep = cepInput.value.replace(/\D/g, "");
    if (cep.length !== 8) return;

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) {
          alert("CEP não encontrado!");
          return;
        }
        ruaInput.value = data.logradouro;
        bairroInput.value = data.bairro;
      })
      .catch(() => alert("Erro ao buscar o CEP"));
  });

  // Máscara para CPF
  cpfInput.addEventListener("input", () => {
    let valor = cpfInput.value.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 9) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
      valor = valor.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
      valor = valor.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    }

    cpfInput.value = valor;
  });

  // Máscara para telefone
  telefoneInput.addEventListener("input", () => {
    let valor = telefoneInput.value.replace(/\D/g, "").slice(0, 11);
    if (valor.length <= 10) {
      valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else {
      valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    }
    telefoneInput.value = valor.trim().replace(/[-\s]+$/, "");
  });

  // Validação de e-mail
  emailInput.addEventListener("input", () => {
    const email = emailInput.value;
    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    emailInput.setCustomValidity(emailValido ? "" : "Por favor, insira um e-mail válido.");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const cliente = {
      nome: form.nome.value,
      cpf: form.cpf.value,
      telefone: form.telefone.value,
      email: form.email.value,
      cep: form.cep.value,
      rua: form.rua.value,
      bairro: form.bairro.value,
      numero: form.numero.value,
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