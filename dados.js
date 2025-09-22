export const dados = {
  modalidades: {
    dedicado: {
      nome: "Dedicado",
      viabilidades: {
        caixaDeAtendimentoGpon: {
          nome: "Caixa de atendimento (GPON)",
          planos: {
            "100-200mega": {
              equipamento: "F601 + RB750G3",
            },
            "200-400mega": {
              equipamento: "F601 + RB3011",
            },
            "500-1000mega": {
              equipamento: "F601 + RB4011",
            },
          },
        },
        ptp: {
          nome: "PTP",
          regraEspecial: "PTP-DEDICADO-01",
        },
      },
    },
    interlan: {
      nome: "Interconexão",
      viabilidades: {
        caixaDeAtendimentoGpon: {
          // ID, sem espaços ou caracteres
          nome: "Caixa de atendimento (GPON)",
          planos: {
            "100-200mega": {
              equipamento: "F601 + RB750G3",
            },
            "200-400mega": {
              equipamento: "F601 + RB3011",
            },
            "500-1000mega": {
              equipamento: "F601 + RB4011",
            },
          },
        },
        ptp: {
          nome: "PTP",
          regraEspecial: "PTP-INTERLAN-01",
        },
      },
    },
    wifibussines: {
      nome: "Wifi-Bussines",
      viabilidades: {
        caixaDeAtendimentoGpon: {
          nome: "Caixa de atendimento (GPON)",
          planos: {
            "100-800mega": {
              equipamento: "F601 + RB750G3",
            },
            "1000mega": {
              equipamento: "F601 + RB4011",
            },
          },
        },
        ptp: {
          nome: "PTP",
          regraEspecial: "PTP-BL-01",
        },
      },
    },
    bandalarga: {
      nome: "Banda Larga PF/PJ",
      viabilidades: {
        caixaDeAtendimentoGpon: {
          nome: "Caixa de atendimento (GPON)",
          planos: {
            "600mega": {
              equipamento: "Tplink XC220-G3",
              mesh: "Tplink HC 220 - WIFI 5",
            },
            "600mega+telefonia": {
              equipamento: "Tplink XC220-G3 + ATA 2P",
              mesh: "Tplink HC 220 - WIFI 5",
              obs: " Necessário para entregar linha fixa Unifique",
            },
            "600mega+2serviçosUnifique": {
              equipamento: "ZTE ONT F670L",
              mesh: "ZTE H119A",
              obs: "Necessário para uso de portas LAN",
            },
            "1000mega": {
              equipamento: "ZTE ONT F6600",
              mesh: "ZTE H3601",
              obs: "quatro portas Gigabit Ethernet (GE LAN)",
            },
            "2000-5000mega": {
              equipamento: "ZTE ONT F8648P",
              mesh: "ZTE H3601",
              obs: "uma porta 10Gigabit Ethernet",
            },
          },
        },
        ptp: {
          nome: "PTP",
          regraEspecial: "PTP-BL-01",
        },
      },
    },
  },
  comentarios: {
    "PTP-DEDICADO-01":
      "Dedicados PTP depende de projeto da engenharia, consulte o protocolo e veja o projeto gerado",
    "PTP-INTERLAN-01":
      "Interconexões PTP depende de projeto da engenharia, consulte o protocolo e veja o projeto",
    "PTP-BL-01":
      "Banda Larga PTP depende de projeto da engenharia, consulte o protocolo e veja o projeto",
  },
};
