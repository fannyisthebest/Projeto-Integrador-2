document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get("titulo");

    const container = document.getElementById("detalhesImovel");

    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];
    const imovel = imoveis.find(i => i.titulo == titulo);

    if (!imovel) {
        container.innerHTML = "<p class='text-red-500'>Imóvel não encontrado.</p>";
        return;
    }

    const imagem = imovel.fotos && imovel.fotos.length > 0
        ? imovel.fotos[0]
        : "../search/no-image.png";

    container.innerHTML = `
        <img src="${imagem}" alt="${imovel.titulo}" class="w-full h-64 object-cover rounded-md mb-4">

        <h1 class="text-3xl font-bold mb-2">${imovel.titulo}</h1>
        <p class="text-lg text-gray-700 mb-4">${imovel.descricao || "Sem descrição."}</p>

        <p class="text-xl font-semibold text-green-700 mb-2">R$ ${parseFloat(imovel.valor).toLocaleString('pt-BR')}</p>

        <div class="mb-2">
            <strong>Localização:</strong> ${imovel.rua}, ${imovel.bairro}
        </div>

        <div class="grid grid-cols-3 gap-4 mt-4 text-center">
            <div>
                <p class="text-gray-600">Quartos</p>
                <p class="text-xl">${imovel.quartos}</p>
            </div>
            <div>
                <p class="text-gray-600">Banheiros</p>
                <p class="text-xl">${imovel.banheiros}</p>
            </div>
            <div>
                <p class="text-gray-600">Vagas</p>
                <p class="text-xl">${imovel.vagas}</p>
            </div>
        </div>
    `;
});
