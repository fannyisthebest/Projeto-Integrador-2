document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const finalidade = params.get("finalidade");
    const tipo = params.get("tipo");

    const tipoFiltro = document.getElementById("tipoFiltro");
    const listaImoveis = document.getElementById("listaImoveis");

    tipoFiltro.textContent = finalidade
        ? finalidade.toUpperCase()
        : "TODOS";

    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

    const filtrados = imoveis.filter(imovel => {
        const condFinalidade = !finalidade || imovel.finalidade === finalidade || imovel.finalidade === "ambos";
        const condTipo = !tipo || imovel.tipo === tipo;
        return condFinalidade && condTipo;
    });

    if (filtrados.length === 0) {
        listaImoveis.innerHTML = `<p class="text-gray-500">Nenhum imóvel encontrado para "${finalidade ?? 'todos'}".</p>`;
        return;
    }

    filtrados.forEach(imovel => {
        const div = document.createElement("div");
        div.className = "border rounded-lg overflow-hidden shadow-lg bg-white";

        const imagem = imovel.fotos && imovel.fotos.length > 0
            ? imovel.fotos[0]
            : "../search/no-image.png";

        div.innerHTML = `
            <img src="${imagem}" alt="${imovel.titulo}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-xl font-semibold mb-2">${imovel.titulo}</h3>
                <p class="text-gray-600 mb-2">${imovel.descricao || ""}</p>
                <p class="font-bold mb-2">R$ ${parseFloat(imovel.valor).toLocaleString('pt-BR')}</p>

                <div class="flex items-center text-sm mb-1 text-white">
                    <i class="fas fa-map-marker-alt mr-2 drop-shadow-[0_0_1px_black]"></i>
                    <span class="text-gray-700">${imovel.bairro}, ${imovel.rua}</span>
                </div>
                <div class="flex items-center space-x-4 text-sm text-white">
                    <div class="flex items-center">
                        <i class="fas fa-bed mr-2 drop-shadow-[0_0_1px_black]"></i>
                        <span class="text-gray-700">${imovel.quartos}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-bath mr-2 drop-shadow-[0_0_1px_black]"></i>
                        <span class="text-gray-700">${imovel.banheiros}</span>
                    </div>
                    <div class="flex items-center">
                        <i class="fas fa-car mr-2 drop-shadow-[0_0_1px_black]"></i>
                        <span class="text-gray-700">${imovel.vagas}</span>
                    </div>
                </div>
            </div>
        `;

        div.addEventListener("click", () => {
            window.location.href = `../Imóveis/imovel.html?titulo=${imovel.titulo}`;
            //console.log("deu certo",  window.location.href = `../Imoveis/imovel.html?id=${imovel.id}`);
            console.log(imovel);
            
        });


        listaImoveis.appendChild(div);
    });
});