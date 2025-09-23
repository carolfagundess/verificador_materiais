import { dados } from "./dados.js";

//FUNÇÕES AUXILIARES DO CÓDIGO
function formatarNomePlano(nome) {
  const nomeComEspacoes = nome.replace(/([a-z])([0-9])/g, "$1 $2");
  const nomeFormatado =
    nomeComEspacoes.charAt(0).toUpperCase() + nomeComEspacoes.slice(1).trim();
  return nomeFormatado;
}

function getComentario(id) {
  return dados.comentarios?.[id] || "Comentário não encontrado.";
}

// Função para resetar todos os menus e o resultado
function resetarTudo(viabilidadeSelect, planoSelect, resultadoDiv) {
  viabilidadeSelect.innerHTML =
    '<option value="">Selecione a Viabilidade</option>';
  planoSelect.innerHTML = '<option value="">Selecione o Plano</option>';
  viabilidadeSelect.disabled = true;
  planoSelect.disabled = true;
  resultadoDiv.innerHTML = "<h3>Resultado:</h3>";
}

function popularSelect(selectElement, dados, textoDefault, formatadorDeTexto) {
  selectElement.innerHTML = `<option value="">${textoDefault}</option>`;
  Object.keys(dados).forEach((chave) => {
    const option = document.createElement("option");
    option.value = chave;
    // Usa a função de formatação se ela for fornecida, senão usa o nome padrão
    option.textContent = formatadorDeTexto
      ? formatadorDeTexto(chave)
      : dados[chave].nome;
    selectElement.appendChild(option);
  });
}

//INICIAR APLICACÃO
function iniciarAplicacao() {
  const modalidadeSelect = document.getElementById("modalidade");
  const viabilidadeSelect = document.getElementById("viabilidade");
  const planoSelect = document.getElementById("plano");
  const resultadoDiv = document.getElementById("resultado-final");

  function exibirResultadoFinal(
    modalidadeObj,
    viabilidadeObj,
    planoSelecionado,
    planoObj
  ) {
    let resultadoHTML = `
    <h3>Resultado:</h3>
    <p><strong>Modalidade:</strong> ${modalidadeObj.nome}</p>
    <p><strong>Viabilidade:</strong> ${viabilidadeObj.nome}</p>
    <p><strong>Plano:</strong> ${formatarNomePlano(planoSelecionado)}</p>
    <p><strong>Equipamento(s):</strong> ${planoObj.equipamento}</p>
`;

    if (planoObj.mesh) {
      resultadoHTML += `<p><strong>Mesh: </strong>${planoObj.mesh}</p>`;
    }

    if (planoObj.obs) {
      resultadoHTML += `<p><strong>Observação: </strong>${planoObj.obs}</p>`;
    }

    return resultadoHTML;
  }

  popularSelect(modalidadeSelect, dados.modalidades, "Selecione a Modalidade");

  // 1. Ouvinte para o menu de Modalidade
  modalidadeSelect.addEventListener("change", () => {
    resetarTudo(viabilidadeSelect, planoSelect, resultadoDiv);
    const modalidadeSelecionada = modalidadeSelect.value;

    if (modalidadeSelecionada) {
      // CORREÇÃO AQUI: Acessamos o objeto 'viabilidades' diretamente.
      const viabilidadesDaModalidade =
        dados.modalidades[modalidadeSelecionada]?.viabilidades;

      // A verificação agora é se o objeto 'viabilidadesDaModalidade' existe e não está vazio.
      if (
        viabilidadesDaModalidade &&
        Object.keys(viabilidadesDaModalidade).length > 0
      ) {
        popularSelect(
          viabilidadeSelect,
          viabilidadesDaModalidade,
          "Selecione a Viabilidade"
        );
        viabilidadeSelect.disabled = false;
      } else {
        // Caso não haja viabilidades, garantimos que o select continue desabilitado.
        viabilidadeSelect.disabled = true;
      }
    }
  });

  // 2. Ouvinte para o menu de Viabilidade
  viabilidadeSelect.addEventListener("change", () => {
    planoSelect.innerHTML = '<option value="">Selecione o Plano</option>';
    planoSelect.disabled = true;

    if (!viabilidadeSelect.value) {
      resultadoDiv.innerHTML = "<p>O equipamento será exibido aqui.</p>";
      return;
    }

    const modalidadeSelecionada = modalidadeSelect.value;
    const viabilidadeSelecionada = viabilidadeSelect.value;

    const viabilidadeObj =
      dados.modalidades?.[modalidadeSelecionada]?.viabilidades?.[
        viabilidadeSelecionada
      ];

    if (viabilidadeObj) {
      if (viabilidadeObj.regraEspecial) {
        const textoComentario = getComentario(viabilidadeObj.regraEspecial);
        resultadoDiv.innerHTML = `<p class="fw-bold fs-5 text-danger">${textoComentario}</p>`;
        planoSelect.disabled = true;
        return;
      }

      const planosDaViabilidade = viabilidadeObj.planos;
      popularSelect(
        planoSelect,
        planosDaViabilidade,
        "Selecione o Plano",
        formatarNomePlano
      );
      planoSelect.disabled = false;
    }
  });

  // 3. Ouvinte para o menu de Plano
  planoSelect.addEventListener("change", () => {
    if (planoSelect.value === "") {
      resultadoDiv.innerHTML = "<p>O equipamento será exibido aqui.</p>";
      return;
    }

    const modalidadeSelecionada = modalidadeSelect.value;
    const viabilidadeSelecionada = viabilidadeSelect.value;
    const planoSelecionado = planoSelect.value;

    const planoObj =
      dados.modalidades?.[modalidadeSelecionada]?.viabilidades?.[
        viabilidadeSelecionada
      ]?.planos?.[planoSelecionado];

    if (planoObj) {
      const modalidadeObj = dados.modalidades[modalidadeSelecionada];
      const viabilidadeObj =
        dados.modalidades[modalidadeSelecionada].viabilidades[
          viabilidadeSelecionada
        ];

      const resultadoHTML = exibirResultadoFinal(
        modalidadeObj,
        viabilidadeObj,
        planoSelecionado,
        planoObj
      );
      resultadoDiv.innerHTML = resultadoHTML;
    }
  });
}

document.addEventListener("DOMContentLoaded", iniciarAplicacao);
