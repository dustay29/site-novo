
const tipoSelect = document.getElementById('tipo');
const marcaSelect = document.getElementById('marca');
const modeloSelect = document.getElementById('modelo');
const anoSelect = document.getElementById('ano');
const valorInput = document.getElementById('valor');
const valorBotao = document.getElementById('valorBotao')

tipoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  if (!tipo) return;

  fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas`)
    .then(res => res.json())
    .then(data => {
      marcaSelect.innerHTML = '<option>Selecione a marca</option>';
      data.forEach(marca => {
        marcaSelect.innerHTML += `<option value="${marca.codigo}">${marca.nome}</option>`;
      });
      marcaSelect.disabled = false;
    });
});

marcaSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  const marca = marcaSelect.value;
  if (!marca) return;

  fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos`)
    .then(res => res.json())
    .then(data => {
      modeloSelect.innerHTML = '<option>Selecione o modelo</option>';
      data.modelos.forEach(modelo => {
        modeloSelect.innerHTML += `<option value="${modelo.codigo}">${modelo.nome}</option>`;
      });
      modeloSelect.disabled = false;
    });
});

modeloSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  const marca = marcaSelect.value;
  const modelo = modeloSelect.value;
  if (!modelo) return;

  fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos`)
    .then(res => res.json())
    .then(data => {
      anoSelect.innerHTML = '<option>Selecione o ano</option>';
      data.forEach(ano => {
        anoSelect.innerHTML += `<option value="${ano.codigo}">${ano.nome}</option>`;
      });
      anoSelect.disabled = false;
    });
});

anoSelect.addEventListener('change', () => {
  const tipo = tipoSelect.value;
  const marca = marcaSelect.value;
  const modelo = modeloSelect.value;
  const ano = anoSelect.value;

  if (!ano) return;

  fetch(`https://parallelum.com.br/fipe/api/v1/${tipo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
    .then(res => res.json())
    .then(data => {
      if (data.Valor && data.Valor.trim() !== '') {
        valorInput.value = data.Valor;
        valorBotao.style.display = 'block'; 
      } else {
        valorBotao.style.display = 'none'; 
      }
    });
});