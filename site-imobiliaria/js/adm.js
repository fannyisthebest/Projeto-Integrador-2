console.log("JS carregado");
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("imovelForm");

  // Inicializa FilePond
  const pond = FilePond.create(document.getElementById("fotos"), {
    allowMultiple: true,
    maxFiles: 10,
    labelIdle: 'Arraste as fotos ou <span class="filepond--label-action">clique aqui</span>',
  });

  function carregarClientes() {
    const clientes = JSON.parse(localStorage.getItem("clientes")) || [];
    const proprietarioSelect = document.getElementById("proprietario");
    const inquilinoSelect = document.getElementById("inquilino");

    proprietarioSelect.innerHTML = `<option value="">Selecione</option>`;
    inquilinoSelect.innerHTML = `<option value="">Nenhum</option>`;

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

  carregarClientes();

  async function converterArquivosParaBase64(arquivos) {
    return Promise.all(
      arquivos.map(fileItem => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(fileItem.file);
        });
      })
    );
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    console.log('pond,getFiles ',pond.getFiles())
    const fotosBase64 = await converterArquivosParaBase64(pond.getFiles());
    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

    const imovel = {
      titulo: form["titulo"].value,
      descricao: form["descricao"].value,
      tipo: form["tipoImovel"].value,
      finalidade: form["finalidade"].value,
      valor: parseFloat(form["valor"].value),
      iptu: parseFloat(form["iptu"].value),
      quartos: form["quartos"].value,
      banheiros: form["banheiros"].value,
      vagas: form["vagas"].value,
      proprietario: form["proprietario"].value,
      inquilino: form["inquilino"].value || null,
      fotos: fotosBase64
    };

    imoveis.push(imovel);
    localStorage.setItem("imoveis", JSON.stringify(imoveis));

    alert("Imóvel cadastrado com sucesso!");
    form.reset();
    pond.removeFiles();
  });
});