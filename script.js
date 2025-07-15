document.addEventListener('DOMContentLoaded', () => {
  const formularioMedicamento = document.getElementById('medForm');
  const listaDeMedicamentos = document.getElementById('listaMedicamentos');

  const medicamentosSalvos = JSON.parse(localStorage.getItem('medicamentos')) || [];

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
  }

  formularioMedicamento.addEventListener('submit', aoEnviarFormulario);

  renderizarListaDeMedicamentos();
});