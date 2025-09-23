#  Verificador de Equipamentos

Uma aplicação web simples e dinâmica para consultar planos de internet, equipamentos associados e observações com base em filtros de modalidade e viabilidade técnica. Ideal para equipes de vendas ou técnicos de campo que precisam de acesso rápido a informações de portfólio.

<img width="1908" height="1020" alt="image" src="https://github.com/user-attachments/assets/0a18d166-3815-4405-82c3-34368dc9ec0b" />


---

## 🚀 Funcionalidades

* **Seleção Dinâmica:** Os menus de "Viabilidade" e "Plano" são populados dinamicamente com base na seleção anterior.
* **Centralização de Dados:** Todas as regras, planos e equipamentos são gerenciados a partir de um único arquivo de objeto JavaScript (`dados.js`), facilitando a manutenção.
* **Regras Especiais:** O sistema pode exibir mensagens de alerta ou instruções específicas para determinadas combinações de modalidade e viabilidade (ex: "Necessário visita técnica").
* **Interface Limpa:** Exibe o resultado de forma clara e organizada para o usuário final.
* **Código Modular:** Escrito em JavaScript moderno (ES6 Modules) com funções bem definidas e de fácil compreensão.

## 🛠️ Tecnologias Utilizadas

* HTML5
* CSS3 (Pode ser integrado com frameworks como Bootstrap, etc.)
* JavaScript (Vanilla JS, ES6 Modules)

## ⚙️ Como Executar o Projeto

Este projeto não requer um servidor web ou dependências complexas para ser executado.

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  **Navegue até a pasta do projeto:**
    ```bash
    cd seu-repositorio
    ```
3.  **Abra o arquivo `index.html`** no seu navegador de preferência (Google Chrome, Firefox, etc.).

E pronto! A aplicação estará funcionando localmente.

## 📂 Estrutura dos Arquivos

```
/
├── index.html         # Estrutura principal da página
├── style.css          # Estilos visuais (opcional)
├── script.js          # Lógica principal da aplicação
└── dados.js           # O "banco de dados" com todas as informações
```

## 📊 Estrutura do Arquivo `dados.js`

O arquivo `dados.js` é o núcleo da aplicação. Para adicionar, remover ou modificar planos, você deve editar este arquivo. A estrutura dele é a seguinte:

```javascript
export const dados = {
  // Seção de comentários/regras especiais
  comentarios: {
    regra1: "Atenção: Instalação sujeita a visita técnica para validação de sinal.",
    regra2: "Cliente já possui equipamento compatível. Verificar modelo.",
  },

  // Seção de modalidades (Residencial, Empresarial, etc.)
  modalidades: {
    residencial: {
      nome: "Residencial",
      viabilidades: {
        // Viabilidades dentro de Residencial
        ftth: {
          nome: "Fibra Óptica (FTTH)",
          planos: {
            // Planos disponíveis para FTTH Residencial
            plano100: {
              equipamento: "ONU/Roteador Wi-Fi 5",
              mesh: "Opcional: 1 ponto por R$ XX,XX",
              obs: "Taxa de instalação gratuita na fidelidade.",
            },
            plano500: {
              equipamento: "ONU/Roteador Wi-Fi 6",
              mesh: "Incluso: 1 ponto MESH",
              obs: "IP Fixo opcional.",
            },
          },
        },
        radio: {
          nome: "Rádio",
          // Uma viabilidade pode ter uma regra especial em vez de planos
          regraEspecial: "regra1", // Chave corresponde a um item em 'comentarios'
        },
      },
    },
    // Outras modalidades podem ser adicionadas aqui
    empresarial: {
      nome: "Empresarial",
      viabilidades: {
        // ... viabilidades e planos para empresarial
      },
    },
  },
};
```

### Como Adicionar um Novo Plano:

1.  Abra o arquivo `dados.js`.
2.  Navegue até a `modalidade` e `viabilidade` desejadas.
3.  Dentro do objeto `planos`, adicione uma nova chave (ex: `plano1000`) e seu respectivo objeto com as propriedades `equipamento`, `mesh` (opcional) e `obs` (opcional).

## 🤝 Contribuições

Este é um projeto pessoal, mas sugestões e melhorias são sempre bem-vindas. Sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.

---

Feito com ❤️ por **[Seu Nome Aqui]**
