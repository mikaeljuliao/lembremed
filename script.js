document.addEventListener('DOMContentLoaded', () => {
  const formularioMedicamento = document.getElementById('medForm');
  const listaDeMedicamentos = document.getElementById('listaMedicamentos');
  const inputNome = document.getElementById('nome');
  const sugestoes = document.getElementById('sugestoes');

  const medicamentosSalvos = JSON.parse(localStorage.getItem('medicamentos')) || [];
  let nomesMedicamentos = [];

  function salvarNoArmazenamento() {
    localStorage.setItem('medicamentos', JSON.stringify(medicamentosSalvos));
  }

  function criarItemDaLista(medicamento) {
    const item = document.createElement('li');
    item.classList.add('medicamento-item');
    item.innerHTML = `
      <strong>${medicamento.nome}</strong> - ${medicamento.dosagem} - ${medicamento.horario}<br/>
      <em>${medicamento.observacoes}</em>
    `;
    return item;
  }

  function renderizarListaDeMedicamentos() {
    listaDeMedicamentos.innerHTML = '';
    medicamentosSalvos.forEach((medicamento) => {
      const item = criarItemDaLista(medicamento);
      listaDeMedicamentos.appendChild(item);
    });
  }

  function aoEnviarFormulario(evento) {
    evento.preventDefault();

    const novoMedicamento = {
      nome: formularioMedicamento.nome.value.trim(),
      dosagem: formularioMedicamento.dosagem.value.trim(),
      horario: formularioMedicamento.horario.value,
      observacoes: formularioMedicamento.obs.value.trim()
    };

    medicamentosSalvos.push(novoMedicamento);
    salvarNoArmazenamento();
    renderizarListaDeMedicamentos();
    formularioMedicamento.reset();
    sugestoes.innerHTML = '';
  }

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
        inputNome.value = nome;
        sugestoes.innerHTML = '';
      });
      sugestoes.appendChild(item);
    });
  });

  fetch('data/medicamentos.json')
    .then((res) => res.json())
    .then((dados) => {
      nomesMedicamentos = dados.map((med) => med.nome);
      console.log('Medicamentos carregados:', nomesMedicamentos);
    })
    .catch((erro) => console.error('Erro ao carregar medicamentos:', erro));

  formularioMedicamento.addEventListener('submit', aoEnviarFormulario);
  renderizarListaDeMedicamentos();
});