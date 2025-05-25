
  const form = document.getElementById('form-contato');
  let pretensaoSelecionada = ""; // Nova variável para armazenar a escolha

  const pretensaoBotoes = document.querySelectorAll('.pretensao-btn');

  pretensaoBotoes.forEach(botao => {
    botao.addEventListener('click', function() {
      pretensaoSelecionada = this.getAttribute('data-value');

      // Destacar botão selecionado
      pretensaoBotoes.forEach(b => b.classList.remove('bg-[#1B57A5]', 'text-white'));
      this.classList.add('bg-[#1B57A5]', 'text-white');
    });
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('name').value;
    const telefone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('message').value;

    const contato = {
      nome,
      telefone,
      email,
      mensagem,
      pretensao: pretensaoSelecionada
    };

    let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

    contatos.push(contato);

    localStorage.setItem('contatos', JSON.stringify(contatos));

    alert('Contato enviado com sucesso!');

    form.reset();

    // Resetar seleção visual e variável
    pretensaoSelecionada = "";
    pretensaoBotoes.forEach(b => b.classList.remove('bg-[#1B57A5]', 'text-white'));
  });