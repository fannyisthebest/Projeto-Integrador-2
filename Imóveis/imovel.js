document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const titulo = params.get("titulo");

    const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];
    const imovel = imoveis.find(i => i.titulo === titulo);

    if (!imovel) {
        document.body.innerHTML = "<p class='text-red-500 p-6 text-center'>Imóvel não encontrado.</p>";
        return;
    }

    document.getElementById("imagemImovel").src =
        imovel.fotos?.[0] || "../search/no-image.png";

    document.getElementById("tituloImovel").textContent = imovel.titulo;
    document.getElementById("descricaoImovel").textContent = imovel.descricao || "Sem descrição.";
    document.getElementById("valorImovel").textContent = "R$ " + parseFloat(imovel.valor).toLocaleString('pt-BR');

    document.getElementById("localizacaoImovel").textContent = `${imovel.rua}, ${imovel.bairro}`;
    document.getElementById("quartosImovel").textContent = imovel.quartos;
    document.getElementById("banheirosImovel").textContent = imovel.banheiros;
    document.getElementById("vagasImovel").textContent = imovel.vagas;
});
