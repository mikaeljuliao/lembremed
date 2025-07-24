
document.addEventListener('DOMContentLoaded', () => {
  const formularioMedicamento = document.getElementById('medForm');
  const listaDeMedicamentos = document.getElementById('listaMedicamentos');
  const inputNome = document.getElementById('nome');
  const sugestoes = document.getElementById('sugestoes');
  const modal = document.getElementById('modalConfirmacao');
  const btnCancelarModal = document.getElementById('btnCancelarModal');
  const btnConfirmarModal = document.getElementById('btnConfirmarModal');

  let indiceEditando = null; // esse let vai guardar qual item está editando, se for null, significa que não está editando nada, só adicionando novo
  let bancoDeMedicamentos = [];
  let medicamentoSelecionado = null;
  const medicamentosSalvos = JSON.parse(localStorage.getItem('medicamentos')) || [];
  let nomesMedicamentos = [];
  let indiceParaRemover = null;

  // Salva no localStorage
  function salvarNoArmazenamento() {
    localStorage.setItem('medicamentos', JSON.stringify(medicamentosSalvos));
  }

  // Mostra a mensagem de sucesso
  function mostrarMensagemDeSucesso() {
    const mensagem = document.getElementById('mensagemDeSucesso');
    mensagem.style.display = 'block';

    setTimeout(() => {
      mensagem.style.display = 'none';
    }, 3000);
  }

  // Cria o item da lista com os dados
  function criarItemDaLista(medicamento, index) {
    const item = document.createElement('li');
    const tempoRestanteSpan = document.createElement('span');
    tempoRestanteSpan.classList.add('tempo-restante');
    item.classList.add('medicamento-item');

<<<<<<< HEAD
    const horaAlvo = new Date(medicamento.tempoAlvoEmMilessegundos);
const atualizarContador = () => {
  const agora = new Date();
  const diferenca = horaAlvo - agora;

  if (diferenca <= 0) {
    clearInterval(intervalo);
    tempoRestanteSpan.textContent = '⏰ Tempo esgotado!';
    return;
  }

  const totalSegundos = Math.floor(diferenca / 1000);
  const horas = Math.floor(totalSegundos / 3600);
  const minutos = Math.floor((totalSegundos % 3600) / 60);
  const segundos = totalSegundos % 60;

  tempoRestanteSpan.textContent = `⏳ Faltam ${horas}h ${minutos}min ${segundos}s`;
};

atualizarContador();
const intervalo = setInterval(atualizarContador, 1000);
    const dataHoraAtual = new Date();
    const [horaDigitada, minutoDigitado] = medicamento.horario.split(':');

    const dataHoraDoMedicamento = new Date(
    dataHoraAtual.getFullYear(),
    dataHoraAtual.getMonth(),
    dataHoraAtual.getDate(),
    parseInt(horaDigitada),
    parseInt(minutoDigitado)
  );
    const diferencaEmMilissegundos = dataHoraDoMedicamento.getTime() - dataHoraAtual.getTime();
    let mensagemDeTempoRestante = '';
    
    if (diferencaEmMilissegundos > 0) {
    const totalMinutosRestantes = Math.floor(diferencaEmMilissegundos / 1000 / 60);
    const horasRestantes = Math.floor(totalMinutosRestantes / 60);
    const minutosRestantes = totalMinutosRestantes % 60;

  mensagemDeTempoRestante = `⏳ Faltam ${horasRestantes}h e ${minutosRestantes}min`;
} else {
  mensagemDeTempoRestante = `⏰ Já passou do horário`;
}
>>>>>>> 9bd0242b5da84e043c1ab08bb466e756291b34bc

    item.innerHTML = `
  <strong>${medicamento.nome}</strong> - ${medicamento.dosagem} - a cada ${medicamento.intervaloHoras}hr<br/>
`;

// Adiciona o contador logo abaixo do título
item.appendChild(tempoRestanteSpan);

// Continua o restante do conteúdo HTML abaixo do contador
item.innerHTML += ` <br/>
 <strong> Observação: </strong>${medicamento.observacoes}

  ${
    medicamento.fabricante || medicamento.tipo || medicamento.classe || medicamento.via
      ? `
      <div class="dados-json">
        <p><strong>Informações do medicamento:</strong></p>
        <ul>
          <li><strong>Fabricante:</strong> ${medicamento.fabricante || 'Não informado'}</li>
          <li><strong>Tipo:</strong> ${medicamento.tipo || 'Não informado'}</li>
          <li><strong>Classe:</strong> ${medicamento.classe || 'Não informado'}</li>
          <li><strong>Via:</strong> ${medicamento.via || 'Não informado'}</li>
        </ul>
      </div>
      `
      : ''
  }

  <button class="btn-remover" data-index="${index}">Remover</button>
  <button class="btn-editar" data-index="${index}">Editar</button>
`;
    

    return item;
  }

  // Renderiza a lista de medicamentos salvos
  function renderizarListaDeMedicamentos() {
    listaDeMedicamentos.innerHTML = '';

    medicamentosSalvos.forEach((medicamento, index) => {
      const item = criarItemDaLista(medicamento, index);
      listaDeMedicamentos.appendChild(item);
    });

    // Ativar os botões de editar
    const botoesDeEditar = document.querySelectorAll('.btn-editar');
    botoesDeEditar.forEach((botao) => {
      botao.addEventListener('click', () => {
        const index = botao.dataset.index;
        const medicamento = medicamentosSalvos[index];

        // Preenche os campos do formulário com os dados do item já existentes
        formularioMedicamento.nome.value = medicamento.nome;
        formularioMedicamento.dosagem.value = medicamento.dosagem;
        formularioMedicamento.horario.value = medicamento.horario;
        formularioMedicamento.obs.value = medicamento.observacoes;

        inputNome.focus();
        formularioMedicamento.classList.add('editando');
        indiceEditando = index;

        document.getElementById('status-edicao').style.display = 'block';
        formularioMedicamento.classList.add('modo-edicao');
        document.querySelector('button[type="submit"]').textContent = 'Atualizar';
      });
    });

    // Ativar os botões de remover
    const botoesRemover = document.querySelectorAll('.btn-remover');
    botoesRemover.forEach((botao) => {
      botao.addEventListener('click', () => {
        const index = botao.dataset.index;
        indiceParaRemover = index; // armazena temporariamente o índice
        modal.style.display = 'flex';
      });
    });
  }

  // Modal de confirmação
  btnCancelarModal.addEventListener("click", () => {
    modal.style.display = 'none';
    indiceParaRemover = null;
  });

  btnConfirmarModal.addEventListener('click', () => {
    if (indiceParaRemover !== null) {
      medicamentosSalvos.splice(indiceParaRemover, 1);
      salvarNoArmazenamento();
      renderizarListaDeMedicamentos();
    }
    indiceParaRemover = null;
    modal.style.display = 'none';
  });

  // Função ao enviar o formulário
  function aoEnviarFormulario(evento) {
  evento.preventDefault();

  const nomeDigitado = formularioMedicamento.nome.value.trim();
  const intervaloDigitado = parseInt(formularioMedicamento.horario.value); // número de horas

  if (isNaN(intervaloDigitado) || intervaloDigitado <= 0) {
    alert('Informe o intervalo em horas corretamente.');
    return;
  }

  const dadosDoJson = bancoDeMedicamentos.find(
    (med) => med.nome.toLowerCase() === nomeDigitado.toLowerCase()
  );

  const novoMedicamento = {
    nome: nomeDigitado,
    dosagem: formularioMedicamento.dosagem.value.trim(),
    intervaloHoras: intervaloDigitado,
    tempoAlvoEmMilessegundos: Date.now() + intervaloDigitado * 60 * 60 * 1000,
    observacoes: formularioMedicamento.obs.value.trim(),
    ...dadosDoJson
  };

  if (indiceEditando !== null) {
    medicamentosSalvos.splice(indiceEditando, 1, novoMedicamento);
    indiceEditando = null;
  } else {
    medicamentosSalvos.push(novoMedicamento);
  }

  salvarNoArmazenamento();
  renderizarListaDeMedicamentos();
  formularioMedicamento.reset();
  sugestoes.innerHTML = '';
  medicamentoSelecionado = null;

  document.getElementById('status-edicao').style.display = 'none';
  formularioMedicamento.classList.remove('modo-edicao');
  formularioMedicamento.classList.remove('editando');
  document.querySelector('button[type="submit"]').textContent = 'Adicionar Medicamento';

  mostrarMensagemDeSucesso();
}0

  // Parte do autocomplete do nome do medicamento
  inputNome.addEventListener('input', () => {
    const termo = inputNome.value.toLowerCase();
    sugestoes.innerHTML = '';

    if (termo.length === 0) return;

    const filtrados = nomesMedicamentos.filter((nome) =>
      nome.toLowerCase().startsWith(termo)
    );

    filtrados.forEach((nome) => {
      const item = document.createElement('li');
      item.textContent = nome;
      item.classList.add('sugestao-item');

      item.addEventListener('click', () => {
        const nomeSelecionado = item.textContent;
        medicamentoSelecionado = bancoDeMedicamentos.find((med) => med.nome === nomeSelecionado);
        inputNome.value = nomeSelecionado;
        sugestoes.innerHTML = '';
      });

      sugestoes.appendChild(item);
    });
  });


  // Carrega o JSON de medicamentos
  fetch('data/medicamentos.json')
    .then((res) => res.json())
    .then((dados) => {
      bancoDeMedicamentos = dados;
      nomesMedicamentos = dados.map((med) => med.nome);
      console.log('Medicamentos carregados:', nomesMedicamentos);
    })
    .catch((erro) => console.error('Erro ao carregar medicamentos:', erro));

  formularioMedicamento.addEventListener('submit', aoEnviarFormulario);
  renderizarListaDeMedicamentos();

});11 



/* 
algunas coisas que foi usado nesse projeto pra revisão:

,
  
Palavra-chave               	O que faz

.addEventListener()	            Escuta eventos como clique, input, submit, etc.
.value	                        Pega o valor de um input ou textarea.
.trim()	                        Remove espaços em branco do início e do fim da string.
.push()	                        Adiciona um item no final de um array.
localStorage                    Armazena dados no navegador de forma persistente.
.forEach()                  	Executa uma função para cada item de um array.
.filter()	                    Filtra os itens de um array com base em uma condição.
.startsWith()                  	Verifica se uma string começa com um determinado texto.
.createElement()	            Cria um elemento HTML pelo JavaScript.
.appendChild()	                Adiciona um elemento dentro de outro no HTML.
.innerHTML	                    Define ou pega o conteúdo HTML interno de um elemento.
.reset()	                    Limpa todos os campos de um formulário.
JSON.stringify()              	Converte um objeto ou array em texto JSON.
JSON.parse()	                Converte texto JSON em objeto ou array JavaScript.
fetch()	                        Faz requisições HTTP para buscar arquivos ou APIs.
.map()	                        Cria um novo array com base no original, aplicando uma função.

 */



/*
🧠 Explicação do funcionamento do botão "Remover"
📌 Caso eu (ou qualquer outra pessoa) precise entender ou replicar essa funcionalidade futuramente.

=======================================================
1. Criei o atributo data-index no botão:
=======================================================

Dentro da função criarItemDaLista(medicamento, index), usei:
<button class="btn-remover" data-index="${index}">Remover</button>

Esse data-index guarda a posição real do item no array medicamentosSalvos.
Assim, cada botão "lembra" de qual item ele está cuidando.

=======================================================
2. Selecionei todos os botões com querySelectorAll:
=======================================================

const botoesRemover = document.querySelectorAll('.btn-remover');

Isso pega todos os botões "Remover" que foram criados dinamicamente.

=======================================================
3. Adicionei um evento de clique em cada botão:
=======================================================

botoesRemover.forEach((botao) => {
  botao.addEventListener('click', () => {
    // ação de remoção
  });
});

Cada botão vai escutar seu próprio clique individualmente.

=======================================================
4. Peguei o índice salvo no botão com dataset.index:
=======================================================

const index = botao.dataset.index;

Assim consigo saber exatamente a posição no array para remover aquele item.

=======================================================
5. Removi o item do array com .splice():
=======================================================

medicamentosSalvos.splice(index, 1);

.splice(posição, quantidade) remove elementos do array.
Aqui, removo 1 item a partir da posição index.

=======================================================
6. Atualizei o localStorage:
=======================================================

salvarNoArmazenamento();

Isso salva a nova versão do array no armazenamento local do navegador,
já sem o item que foi removido.

=======================================================
7. Atualizei a interface:
=======================================================

renderizarListaDeMedicamentos();

Isso redesenha a lista de medicamentos na tela, já sem o item excluído.

=======================================================
📌 Recapitulando: se eu precisar refazer do zero...
=======================================================

✅ Passo a passo rápido:

1. Adicione o atributo data-index="${index}" no botão.
2. Após renderizar os itens, selecione todos os botões com .btn-remover.
3. Adicione um addEventListener('click') em cada botão.
4. Use dataset.index para descobrir a posição.
5. Use splice() para remover do array.
6. Salve no localStorage.
7. Recarregue a lista com a função de renderização.

=======================================================
💬 Observação para mim mesmo:
=======================================================

Essa lógica é super útil e pode ser reaproveitada em qualquer lista dinâmica, como:
✔ tarefas
✔ produtos em carrinho
✔ itens salvos
✔ anotações
✔ e claro, medicamentos!

*/