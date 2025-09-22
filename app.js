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

//INICIAR APLICACÃO
function iniciarAplicacao() {
  const modalidadeSelect = document.getElementById("modalidade");
  const viabilidadeSelect = document.getElementById("viabilidade");
  const planoSelect = document.getElementById("plano");
  const resultadoDiv = document.getElementById("resultado-final");

  function popularModalidades(modalidadeSelect) {
    const modalidades = Object.keys(dados.modalidades);
    modalidades.forEach((modalidade) => {
      const option = document.createElement("option");
      option.value = modalidade;
      option.textContent = dados.modalidades[modalidade].nome;
      modalidadeSelect.appendChild(option);
    });
  }

  popularModalidades(modalidadeSelect);

  // 1. Ouvinte para o menu de Modalidade
  modalidadeSelect.addEventListener("change", () => {
    resetarTudo(viabilidadeSelect, planoSelect, resultadoDiv);
    const modalidadeSelecionada = modalidadeSelect.value;

    if (modalidadeSelecionada) {
      const viabilidadesDaModalidade =
        dados.modalidades[modalidadeSelecionada].viabilidades;
      const chavesDasViabilidades = Object.keys(viabilidadesDaModalidade);

      viabilidadeSelect.disabled = false;
      viabilidadeSelect.innerHTML =
        '<option value="">Selecione a Viabilidade</option>';

      chavesDasViabilidades.forEach((chaveViabilidade) => {
        const viabilidade = viabilidadesDaModalidade[chaveViabilidade];
        const option = document.createElement("option");
        option.value = chaveViabilidade;
        option.textContent = viabilidade.nome;
        viabilidadeSelect.appendChild(option);
      });
    }
  });

  // 2. Ouvinte para o menu de Viabilidade
  viabilidadeSelect.addEventListener("change", () => {
    planoSelect.innerHTML = '<option value="">Selecione o Plano</option>';
    planoSelect.disabled = true;
    resultadoDiv.innerHTML = "<h3>Resultado:</h3>";

    const modalidadeSelecionada = modalidadeSelect.value;
    const viabilidadeSelecionada = viabilidadeSelect.value;

    if (viabilidadeSelecionada) {
      const viabilidadeObj =
        dados.modalidades[modalidadeSelecionada].viabilidades[
          viabilidadeSelecionada
        ];

      if (viabilidadeObj.regraEspecial) {
        const textoComentario = getComentario(viabilidadeObj.regraEspecial);
        resultadoDiv.innerHTML = `<p class="fw-bold fs-5 text-danger">${textoComentario}</p>`;
        planoSelect.disabled = true;
        return;
      }

      const planosDaViabilidade = viabilidadeObj.planos;
      const chavesDosPlanos = Object.keys(planosDaViabilidade);

      planoSelect.disabled = false;

      chavesDosPlanos.forEach((chavePlano) => {
        const option = document.createElement("option");
        option.value = chavePlano;
        option.textContent = formatarNomePlano(chavePlano);
        planoSelect.appendChild(option);
      });
    }
  });

  // 3. Ouvinte para o menu de Plano
  planoSelect.addEventListener("change", () => {
    resultadoDiv.innerHTML = "<p>O equipamento será exibido aqui.</p>";

    const modalidadeSelecionada = modalidadeSelect.value;
    const viabilidadeSelecionada = viabilidadeSelect.value;
    const planoSelecionado = planoSelect.value;

    const planoObj =
      dados.modalidades?.[modalidadeSelecionada]?.viabilidades?.[
        viabilidadeSelecionada
      ]?.planos?.[planoSelecionado];

    if (planoObj) {
      const modalidadeObj = dados.modalidades[modalidadeSelecionada];
      const viabilidadeObj = modalidadeObj.viabilidades[viabilidadeSelecionada];

      let resultadoHTML = `
            <h3>Resultado:</h3>
            <p><strong>Modalidade:</strong> ${modalidadeObj.nome}</p>
            <p><strong>Viabilidade:</strong> ${viabilidadeObj.nome}</p>
            <p><strong>Plano:</strong> ${formatarNomePlano(
              planoSelecionado
            )}</p>
            <p><strong>Equipamento:</strong> ${planoObj.equipamento}</p>
        `;

      if (planoObj.mesh) {
        resultadoHTML += `<p><strong>Mesh:</strong>${planoObj.mesh}</p>`;
      }

      if (planoObj.obs) {
        resultadoHTML += `<p><strong>Observação:</strong>${planoObj.obs}</p>`;
      }

      resultadoDiv.innerHTML = resultadoHTML;
    }
  });
}

document.addEventListener("DOMContentLoaded", iniciarAplicacao);
