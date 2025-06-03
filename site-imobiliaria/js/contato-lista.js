document.addEventListener('DOMContentLoaded', function() {
  const lista = document.getElementById('listaclientes');

  let contatos = JSON.parse(localStorage.getItem('contatos')) || [];

  function renderContatos() {
    lista.innerHTML = '';

    if (contatos.length === 0) {
      lista.innerHTML = '<p>Nenhum contato cadastrado.</p>';
    } else {
      contatos.forEach(function(contato, index) {
        const div = document.createElement('div');
        div.classList.add('contato-item');

        div.innerHTML = `
          <p><strong>Nome:</strong> ${contato.nome}</p>
          <p><strong>Telefone:</strong> ${contato.telefone}</p>
          <p><strong>E-mail:</strong> ${contato.email}</p>
          <p><strong>Pretensão:</strong> ${contato.pretensao || 'Não informado'}</p>
          <p><strong>Mensagem:</strong> ${contato.mensagem}</p>
          <button class="btn-excluir">Excluir</button>
          <hr/>
        `;

        const btnExcluir = div.querySelector('.btn-excluir');
        btnExcluir.addEventListener('click', function() {
          contatos.splice(index, 1);
          localStorage.setItem('contatos', JSON.stringify(contatos));
          renderContatos();
        });

        lista.appendChild(div);
      });
    }
  }

  renderContatos();
});