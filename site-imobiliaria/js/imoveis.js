document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaImoveis");
  const filtroTipo = document.getElementById("filtroTipo");
  const filtroFinalidade = document.getElementById("filtroFinalidade");

  const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];
  const clientes = JSON.parse(localStorage.getItem("clientes")) || [];

  function buscarNomePorCPF(cpf) {
    const cliente = clientes.find(c => c.cpf === cpf);
    return cliente ? cliente.nome : "Não encontrado";
  }

  function atualizarLocalStorage(novosImoveis) {
    localStorage.setItem("imoveis", JSON.stringify(novosImoveis));
  }

  function abrirModalEdicao(imovel, index) {
    const modal = document.createElement("div");
    modal.className = "modal-edicao";
    modal.innerHTML = `
      <div class="modal-conteudo">
        <h2>Editar Imóvel</h2>
        <form id="formEditar">
          <label>Título</label>
          <input type="text" name="titulo" value="${imovel.titulo}" required />

          <label>Descrição</label>
          <textarea name="descricao" required>${imovel.descricao}</textarea>

          <label>Tipo</label>
          <select name="tipo" required>
            <option ${imovel.tipo === "casa" ? "selected" : ""}>casa</option>
            <option ${imovel.tipo === "apartamento" ? "selected" : ""}>apartamento</option>
            <option ${imovel.tipo === "terreno" ? "selected" : ""}>terreno</option>
            <option ${imovel.tipo === "comercial" ? "selected" : ""}>comercial</option>
          </select>

          <label>Finalidade</label>
          <select name="finalidade" required>
            <option ${imovel.finalidade === "venda" ? "selected" : ""}>venda</option>
            <option ${imovel.finalidade === "locacao" ? "selected" : ""}>locacao</option>
            <option ${imovel.finalidade === "ambos" ? "selected" : ""}>ambos</option>
          </select>

          <label>Valor</label>
          <input type="number" name="valor" value="${imovel.valor}" required />

          <label>IPTU</label>
          <input type="number" name="iptu" value="${imovel.iptu}" />

          <label>Quartos</label>
          <select name="quartos" required>
            <option ${imovel.quartos === "1" ? "selected" : ""}>1</option>
            <option ${imovel.quartos === "2" ? "selected" : ""}>2</option>
            <option ${imovel.quartos === "3" ? "selected" : ""}>3</option>
            <option ${imovel.quartos === "+4" ? "selected" : ""}>+4</option>
          </select>

          <label>Banheiros</label>
          <select name="banheiros" required>
            <option ${imovel.banheiros === "1" ? "selected" : ""}>1</option>
            <option ${imovel.banheiros === "2" ? "selected" : ""}>2</option>
            <option ${imovel.banheiros === "3" ? "selected" : ""}>3</option>
            <option ${imovel.banheiros === "+4" ? "selected" : ""}>+4</option>
          </select>

          <label>Vagas</label>
          <select name="vagas" required>
            <option ${imovel.vagas === "1" ? "selected" : ""}>1</option>
            <option ${imovel.vagas === "2" ? "selected" : ""}>2</option>
            <option ${imovel.vagas === "3" ? "selected" : ""}>3</option>
            <option ${imovel.vagas === "+4" ? "selected" : ""}>+4</option>
          </select>

          <label>Proprietário</label>
          <select name="proprietario" required>
            ${clientes.filter(c => c.tipo === "proprietario").map(c => `
              <option value="${c.cpf}" ${c.cpf === imovel.proprietario ? "selected" : ""}>${c.nome} (${c.cpf})</option>
            `).join("")}
          </select>

          <label>Inquilino</label>
          <select name="inquilino">
            <option value="">Nenhum</option>
            ${clientes.filter(c => c.tipo === "inquilino").map(c => `
              <option value="${c.cpf}" ${c.cpf === imovel.inquilino ? "selected" : ""}>${c.nome} (${c.cpf})</option>
            `).join("")}
          </select>

          <div class="botoes-modal">
            <button type="submit">Salvar</button>
            <button type="button" id="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);

    modal.querySelector("#cancelar").onclick = () => modal.remove();

    modal.querySelector("#formEditar").onsubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      imoveis[index] = {
        ...imoveis[index],
        titulo: form.titulo.value,
        descricao: form.descricao.value,
        tipo: form.tipo.value,
        finalidade: form.finalidade.value,
        valor: parseFloat(form.valor.value),
        iptu: parseFloat(form.iptu.value),
        quartos: form.quartos.value,
        banheiros: form.banheiros.value,
        vagas: form.vagas.value,
        proprietario: form.proprietario.value,
        inquilino: form.inquilino.value || null
      };
      atualizarLocalStorage(imoveis);
      alert("Imóvel atualizado com sucesso!");
      modal.remove();
      renderizarImoveis();
    };
  }

  function renderizarImoveis() {
    lista.innerHTML = "";

    const tipoSelecionado = filtroTipo.value;
    const finalidadeSelecionada = filtroFinalidade.value;

    const imoveisFiltrados = imoveis.filter(imovel => {
      const tipoCond = tipoSelecionado ? imovel.tipo === tipoSelecionado : true;
      const finalidadeCond = finalidadeSelecionada ? imovel.finalidade === finalidadeSelecionada : true;
      return tipoCond && finalidadeCond;
    });

    imoveisFiltrados.forEach((imovel, index) => {
      const div = document.createElement("div");
      div.className = "imovel";

      const swiperId = `swiper-${index}`;
      const swiperHTML = `
        <div class="swiper" id="${swiperId}">
          <div class="swiper-wrapper">
            ${imovel.fotos.map(foto => `
              <div class="swiper-slide"><img src="${foto}" alt="Foto do imóvel"></div>
            `).join("")}
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      `;

      const html = `
        ${swiperHTML}
        <h3>${imovel.titulo}</h3>
        <p><strong>Tipo:</strong> ${imovel.tipo}</p>
        <p><strong>Finalidade:</strong> ${imovel.finalidade}</p>
        <p><strong>Valor:</strong> R$ ${imovel.valor.toFixed(2)}</p>
        <p><strong>IPTU:</strong> R$ ${imovel.iptu.toFixed(2)}</p>
        <p><strong>Quartos:</strong> ${imovel.quartos}</p>
        <p><strong>Banheiros:</strong> ${imovel.banheiros}</p>
        <p><strong>Vagas:</strong> ${imovel.vagas}</p>
        <p><strong>Proprietário:</strong> ${buscarNomePorCPF(imovel.proprietario)}</p>
        <p><strong>Inquilino:</strong> ${imovel.inquilino ? buscarNomePorCPF(imovel.inquilino) : "Nenhum"}</p>
        <p>${imovel.descricao}</p>
        <div class="acoes">
          <button class="editar">Editar</button>
          <button class="excluir">Excluir</button>
        </div>
      `;

      div.innerHTML = html;
      lista.appendChild(div);

      setTimeout(() => {
        new Swiper(`#${swiperId}`, {
          loop: true,
          navigation: {
            nextEl: `#${swiperId} .swiper-button-next`,
            prevEl: `#${swiperId} .swiper-button-prev`
          },
          pagination: {
            el: `#${swiperId} .swiper-pagination`,
            clickable: true
          }
        });
      }, 0);

      div.querySelector(".excluir").onclick = () => {
        if (confirm("Deseja excluir este imóvel?")) {
          const indexOriginal = imoveis.findIndex(i => i === imovel);
          imoveis.splice(indexOriginal, 1);
          atualizarLocalStorage(imoveis);
          renderizarImoveis();
        }
      };

      div.querySelector(".editar").onclick = () => {
        const indexOriginal = imoveis.findIndex(i => i === imovel);
        abrirModalEdicao(imovel, indexOriginal);
      };
    });
  }

  filtroTipo.addEventListener("change", renderizarImoveis);
  filtroFinalidade.addEventListener("change", renderizarImoveis);

  renderizarImoveis();
});