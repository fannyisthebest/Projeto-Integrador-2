document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("imovelForm");
  const fileInput = document.getElementById("fotos");

  const filepond = FilePond.create(fileInput);

  function buscarEnderecoPorCEP(cep) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        if (!data.erro) {
          document.getElementById("rua").value = data.logradouro;
          document.getElementById("bairro").value = data.bairro;
        }
      });
  }

  document.getElementById("cep").addEventListener("blur", e => {
    const cep = e.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      buscarEnderecoPorCEP(cep);
    }
  });

  function preencherClientes() {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const proprietarioSelect = document.getElementById("proprietario");
    const inquilinoSelect = document.getElementById("inquilino");

    clientes.forEach(cliente => {
      const option = document.createElement("option");
      option.value = cliente.cpf;
      option.textContent = `${cliente.nome} (${cliente.cpf})`;
      if (cliente.tipo === "proprietario") {
        proprietarioSelect.appendChild(option);
      } else if (cliente.tipo === "inquilino") {
        inquilinoSelect.appendChild(option);
      }
    });
  }

  preencherClientes();

  // Mostrar campo extra se "+4" for selecionado
  const quartos = document.getElementById("quartos");
  const banheiros = document.getElementById("banheiros");
  const vagas = document.getElementById("vagas");

  quartos.addEventListener("change", () => {
    document.getElementById("quartosExtraContainer").style.display = quartos.value === "+4" ? "block" : "none";
  });

  banheiros.addEventListener("change", () => {
    document.getElementById("banheirosExtraContainer").style.display = banheiros.value === "+4" ? "block" : "none";
  });

  vagas.addEventListener("change", () => {
    document.getElementById("vagasExtraContainer").style.display = vagas.value === "+4" ? "block" : "none";
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();

    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

    const fotos = await Promise.all(filepond.getFiles().map(fileItem => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); // base64 string
        reader.onerror = reject;
        reader.readAsDataURL(fileItem.file);
      });
    }));

    const imovel = {
      titulo: document.getElementById("titulo").value,
      descricao: document.getElementById("descricao").value,
      tipo: document.getElementById("tipoImovel").value,
      finalidade: document.getElementById("finalidade").value,
      quartos: quartos.value === "+4" ? document.getElementById("quartosExtra").value : quartos.value,
      banheiros: banheiros.value === "+4" ? document.getElementById("banheirosExtra").value : banheiros.value,
      vagas: vagas.value === "+4" ? document.getElementById("vagasExtra").value : vagas.value,
      cep: document.getElementById("cep").value,
      rua: document.getElementById("rua").value,
      bairro: document.getElementById("bairro").value,
      numero: document.getElementById("numero").value,
      valor: parseFloat(document.getElementById("valor").value),
      iptu: parseFloat(document.getElementById("iptu").value) || 0,
      proprietario: document.getElementById("proprietario").value,
      inquilino: document.getElementById("inquilino").value || null,
      fotos: fotos
    };

    imoveis.push(imovel);
    localStorage.setItem("imoveis", JSON.stringify(imoveis));
    alert("Imóvel salvo com sucesso!");
    form.reset();
    filepond.removeFiles();
    document.getElementById("rua").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("quartosExtraContainer").style.display = "none";
    document.getElementById("banheirosExtraContainer").style.display = "none";
    document.getElementById("vagasExtraContainer").style.display = "none";
  });
});