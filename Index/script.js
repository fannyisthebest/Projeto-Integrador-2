document.addEventListener("DOMContentLoaded", () => {
  const imoveis = JSON.parse(localStorage.getItem("imoveis")) || [];

  // LOCACAO
  const listaLocacao = imoveis.filter(imovel => imovel.finalidade === "locacao" || imovel.finalidade === "ambos");
  const carrossel = document.getElementById("carrosselImoveis");

  if (listaLocacao.length === 0) {
    carrossel.innerHTML = "<p class='text-center w-full'>Nenhum imóvel disponível para locação.</p>";
  } else {
    listaLocacao.forEach(imovel => {
      const div = document.createElement("div");
      div.className = "swiper-slide border rounded-lg overflow-hidden shadow-lg bg-white";

      const imagem = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos[0] : "../search/no-image.png";

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
      carrossel.appendChild(div);
    });
  }

  new Swiper(".swiper-container", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  // VENDA
  const listaVenda = imoveis.filter(imovel => imovel.finalidade === "venda" || imovel.finalidade === "ambos");
  const carrosselVenda = document.getElementById("carrosselImoveisVenda");

  if (listaVenda.length === 0) {
    carrosselVenda.innerHTML = "<p class='text-center w-full'>Nenhum imóvel disponível para venda.</p>";
  } else {
    listaVenda.forEach(imovel => {
      const div = document.createElement("div");
      div.className = "swiper-slide border rounded-lg overflow-hidden shadow-lg bg-white";

      const imagem = imovel.fotos && imovel.fotos.length > 0 ? imovel.fotos[0] : "../search/no-image.png";

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
      carrosselVenda.appendChild(div);
    });
  }

  new Swiper("#carrosselVendaContainer", {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    navigation: {
      nextEl: ".venda-next",
      prevEl: ".venda-prev"
    },
    pagination: {
      el: ".venda-pagination",
      clickable: true
    },
    breakpoints: {
      640: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
});