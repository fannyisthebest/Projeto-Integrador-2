
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const cpfInput = document.getElementById("cpfLogin");

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const cpfDigitado = cpfInput.value.trim();
      const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

      const clienteEncontrado = clientes.find(c => c.cpf === cpfDigitado);

      if (!clienteEncontrado) {
        alert("CPF não encontrado. Verifique ou cadastre-se.");
        return;
      }

      if (clienteEncontrado.tipo !== "inquilino") {
        alert("Apenas inquilinos têm acesso a esta área.");
        return;
      }

      // CPF encontrado e é inquilino — redireciona
      window.location.href = "dashboard.html"; // substitua pelo nome correto da página
    });
  });