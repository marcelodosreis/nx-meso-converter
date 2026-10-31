import type { SeoPageContent, SeoPageKey } from "./pages";

export const PT_SEO_PAGES: Record<SeoPageKey, SeoPageContent> = {
  home: {
    title: "NX Mesos Converter — Calculadora para MapleStory",
    description:
      "Converta NX, mesos, dólar e moeda local com taxas ajustáveis para o seu servidor de MapleStory. Calculadora gratuita, sem login.",
    h1: "Calculadora de NX, mesos e moeda para MapleStory",
    intro:
      "Converta valores entre NX, mesos, dólar e moeda local em uma única página. As taxas são manuais e podem ser ajustadas para o seu servidor.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Como usar",
        paragraphs: [
          "Escolha a unidade de origem, digite o valor e confira as conversões. Você pode alternar entre NX, mesos, dólar e moeda local a qualquer momento.",
          "A cotação e as taxas do jogo ficam em Configurações. Ajuste os valores conforme o seu servidor para obter resultados coerentes.",
        ],
      },
      {
        heading: "Funciona para qualquer servidor",
        paragraphs: [
          "As taxas não são fixas. O conversor aceita os valores que você usa, o que permite adaptar o cálculo para diferentes servidores, regiões e versões do MapleStory.",
        ],
      },
      {
        heading: "Dados salvos no navegador",
        paragraphs: [
          "A cotação e as taxas personalizadas ficam salvas localmente. Não é necessário criar conta, e nenhum valor é enviado para um servidor.",
        ],
      },
    ],
    faqs: [
      {
        question: "O que a calculadora converte?",
        answer: "NX, mesos, dólar e a moeda local configurada no conversor.",
      },
      {
        question: "Os valores são oficiais?",
        answer:
          "Não. O conversor usa taxas manuais definidas por você, não uma cotação oficial ou automática.",
      },
      {
        question: "Preciso criar uma conta?",
        answer: "Não. A calculadora funciona direto no navegador e salva os ajustes localmente.",
      },
      {
        question: "As taxas ficam salvas?",
        answer: "Sim. A cotação e as taxas personalizadas ficam salvas neste navegador.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "howToConvert", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos", "usd"] },
  },

  nxToMesos: {
    title: "Conversor de NX para Mesos — MapleStory",
    description:
      "Converta NX em mesos usando a taxa do seu servidor. Calculadora gratuita para MapleStory, sem login.",
    h1: "Conversor de NX para Mesos",
    intro:
      "Informe um valor em NX e veja a equivalência em mesos com a taxa configurada para o seu servidor.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Como fazer a conversão",
        paragraphs: [
          "Digite o valor em NX no campo principal. O resultado em mesos aparece automaticamente, junto com as demais unidades.",
          "A relação entre NX e mesos depende das taxas do seu servidor. Ajuste os valores em Configurações antes de usar o resultado.",
        ],
      },
      {
        heading: "Por que o valor varia",
        paragraphs: [
          "Cada servidor ou versão pode ter uma economia diferente. O conversor não impõe uma taxa oficial: ele usa a relação que você informar.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantos mesos vale 1 NX?",
        answer:
          "Depende da taxa configurada. Informe a relação do seu servidor em Configurações para obter o valor correto.",
      },
      {
        question: "A conversão é automática?",
        answer: "Não. A cotação e as taxas do jogo são manuais e ficam salvas neste navegador.",
      },
      {
        question: "Posso converter valores grandes?",
        answer: "Sim. A calculadora aceita valores grandes e mantém a precisão interna do cálculo.",
      },
    ],
    related: ["mesosToNx", "howToConvert", "ratioGuide", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos"] },
  },

  mesosToNx: {
    title: "Conversor de Mesos para NX — MapleStory",
    description:
      "Converta mesos em NX com a taxa do seu servidor. Calculadora gratuita para MapleStory, sem login.",
    h1: "Conversor de Mesos para NX",
    intro:
      "Informe um valor em mesos e veja quanto ele representa em NX usando a taxa configurada para o seu servidor.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "Como fazer a conversão",
        paragraphs: [
          "Selecione a unidade de entrada Mesos, digite o valor e confira o resultado em NX.",
          "A relação é definida pela taxa de mesos por NX configurada no conversor.",
        ],
      },
      {
        heading: "Ajuste para o seu servidor",
        paragraphs: [
          "A economia de mesos muda entre servidores e versões. Use os valores praticados no seu contexto para que a conversão faça sentido.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantos NX valem 1.000 mesos?",
        answer:
          "Depende das taxas configuradas. Ajuste os valores em Configurações para refletir o seu servidor.",
      },
      {
        question: "A taxa de mesos para NX é fixa?",
        answer: "Não. O conversor usa as taxas que você informar e salva os ajustes localmente.",
      },
      {
        question: "O resultado inclui dólar e moeda local?",
        answer: "Sim. A calculadora mostra todas as unidades disponíveis ao mesmo tempo.",
      },
    ],
    related: ["nxToMesos", "howToConvert", "faq"],
    examples: {
      sourceUnit: "mesos",
      amounts: [45_000, 450_000, 4_500_000],
      targetUnits: ["nx"],
    },
  },

  nxToUsd: {
    title: "Conversor de NX para Dólar — MapleStory",
    description:
      "Converta NX em dólar usando a taxa do seu servidor. Calculadora gratuita para MapleStory.",
    h1: "Conversor de NX para Dólar",
    intro:
      "Informe um valor em NX e veja a equivalência em dólar com a taxa configurada no conversor.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Como calcular",
        paragraphs: [
          "A conversão usa a quantidade de NX equivalente a US$ 1 definida em Configurações.",
          "O resultado em dólar aparece junto com mesos e moeda local para facilitar a comparação.",
        ],
      },
      {
        heading: "Taxa manual",
        paragraphs: [
          "O valor do dólar não é atualizado automaticamente. Use a taxa que você considera adequada para o seu servidor.",
        ],
      },
    ],
    faqs: [
      {
        question: "Quantos NX equivalem a US$ 1?",
        answer: "Depende da taxa de NX por dólar que você configurar no conversor.",
      },
      {
        question: "A cotação é atualizada sozinha?",
        answer: "Não. A cotação é manual e fica salva neste navegador.",
      },
      {
        question: "Posso usar outra moeda local?",
        answer: "Sim. O conversor aceita uma moeda local genérica e a cotação correspondente.",
      },
    ],
    related: ["usdToNx", "nxToMesos", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["usd"] },
  },

  usdToNx: {
    title: "Conversor de Dólar para NX — MapleStory",
    description:
      "Converta dólar em NX usando a taxa configurada. Calculadora gratuita para MapleStory.",
    h1: "Conversor de Dólar para NX",
    intro:
      "Informe um valor em dólar e veja quantos NX ele representa com a taxa configurada no conversor.",
    sourceUnit: "usd",
    sections: [
      {
        heading: "Como calcular",
        paragraphs: [
          "A conversão multiplica o valor em dólar pela quantidade de NX equivalente a US$ 1.",
          "O resultado aparece junto com mesos e moeda local para comparação.",
        ],
      },
      {
        heading: "Ajuste a taxa",
        paragraphs: [
          "Cada contexto pode usar uma taxa diferente. Ajuste NX por dólar em Configurações para refletir o seu servidor.",
        ],
      },
    ],
    faqs: [
      {
        question: "US$ 1 equivale a quantos NX?",
        answer: "Depende da taxa configurada em NX por dólar.",
      },
      {
        question: "Posso converter dólar para mesos?",
        answer: "Sim. O resultado em mesos também aparece na lista de conversões.",
      },
      {
        question: "A taxa fica salva?",
        answer: "Sim. A cotação é salva localmente no navegador.",
      },
    ],
    related: ["nxToUsd", "nxToMesos", "faq"],
    examples: { sourceUnit: "usd", amounts: [1, 5, 10], targetUnits: ["nx"] },
  },

  whatIsNx: {
    title: "O que é NX no MapleStory? — Guia",
    description:
      "Entenda o que é NX no MapleStory, para que serve e como se relaciona com mesos e com a moeda local.",
    h1: "O que é NX no MapleStory?",
    intro:
      "NX é uma moeda usada no universo MapleStory, especialmente no contexto do Cash Shop. Ela não é o mesmo que mesos.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Para que serve",
        paragraphs: [
          "NX costuma ser usada para itens e serviços do Cash Shop, como cosméticos, pets e conveniências. A disponibilidade varia conforme o servidor.",
        ],
      },
      {
        heading: "NX não é mesos",
        paragraphs: [
          "Mesos são a moeda do jogo usada na economia entre jogadores. NX e mesos têm origens e usos diferentes, mas podem ser comparados por uma taxa configurável.",
        ],
      },
      {
        heading: "Por que usar um conversor",
        paragraphs: [
          "Um conversor ajuda a comparar valores entre NX, mesos, dólar e moeda local. Como as taxas variam, o ideal é ajustar o cálculo ao seu servidor.",
        ],
      },
    ],
    faqs: [
      {
        question: "NX é a mesma coisa que mesos?",
        answer: "Não. São moedas diferentes, com usos e origens diferentes.",
      },
      {
        question: "NX tem o mesmo valor em todos os servidores?",
        answer: "Não. Valores e taxas podem variar conforme servidor, região e contexto.",
      },
      {
        question: "Dá para converter NX em mesos?",
        answer: "Sim, usando uma taxa de conversão configurada no conversor.",
      },
    ],
    related: ["whatAreMesos", "nxToMesos", "howToConvert", "faq"],
  },

  whatAreMesos: {
    title: "O que são Mesos no MapleStory? — Guia",
    description:
      "Entenda o que são mesos no MapleStory, como funcionam na economia do jogo e como comparar com NX.",
    h1: "O que são Mesos no MapleStory?",
    intro:
      "Mesos são a principal moeda do jogo usada na economia entre jogadores. Eles são diferentes de NX.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "Como os mesos são usados",
        paragraphs: [
          "Mesos circulam no jogo e são usados para compras, melhorias e negociações entre jogadores. A economia varia conforme servidor e versão.",
        ],
      },
      {
        heading: "Mesos e NX",
        paragraphs: [
          "NX e mesos não são intercambiáveis por padrão. Um conversor permite comparar os valores usando as taxas que você definir.",
        ],
      },
      {
        heading: "Comparando valores",
        paragraphs: [
          "Use as taxas do seu contexto para comparar mesos com NX, dólar ou moeda local sem depender de um valor fixo.",
        ],
      },
    ],
    faqs: [
      {
        question: "Mesos são iguais a NX?",
        answer: "Não. São moedas diferentes, com finalidades diferentes.",
      },
      {
        question: "O valor dos mesos é fixo?",
        answer: "Não. A economia e as taxas variam conforme servidor e momento.",
      },
      {
        question: "Como converter mesos em NX?",
        answer: "Use a calculadora com as taxas do seu servidor configuradas.",
      },
    ],
    related: ["whatIsNx", "mesosToNx", "howToConvert", "faq"],
  },

  howToConvert: {
    title: "Como converter NX em Mesos — Guia",
    description:
      "Aprenda a converter NX em mesos usando as taxas do seu servidor, incluindo a taxa de mesos por NX e cotação.",
    h1: "Como converter NX em mesos",
    intro:
      "A conversão depende das taxas do seu servidor. O caminho mais confiável é usar uma calculadora com taxas ajustáveis.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Entenda a relação",
        paragraphs: [
          "O conversor usa a taxa de mesos por NX para calcular a relação entre NX e mesos.",
          "Se o seu servidor usa outra relação, ajuste os valores em Configurações antes de converter.",
        ],
      },
      {
        heading: "Use a calculadora",
        paragraphs: [
          "Digite o valor em NX e confira o resultado em mesos. A lista também mostra dólar e moeda local.",
          "O cálculo é instantâneo e não exige login.",
        ],
      },
      {
        heading: "Evite taxas fixas",
        paragraphs: [
          "Não existe uma taxa universal para todos os servidores. Usar uma taxa errada produz resultados enganosos.",
        ],
      },
    ],
    faqs: [
      {
        question: "Qual é a fórmula da conversão?",
        answer: "A relação entre NX e mesos é calculada a partir da taxa de mesos por NX.",
      },
      {
        question: "Preciso saber o valor do dólar?",
        answer: "Só se você quiser comparar com dólar ou moeda local.",
      },
      {
        question: "O resultado é confiável?",
        answer:
          "Ele é coerente com as taxas que você configurar. Taxas erradas geram resultados errados.",
      },
    ],
    related: ["nxToMesos", "ratioGuide", "whatIsNx", "faq"],
  },

  ratioGuide: {
    title: "Como calcular a relação entre NX e mesos — Guia",
    description: "Entenda como usar a taxa de mesos por NX para calcular conversões no MapleStory.",
    h1: "Como calcular a relação entre NX e mesos",
    intro:
      "A taxa de mesos por NX define quantos mesos equivalem a 1 NX. O valor depende do seu servidor.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "O que a taxa representa",
        paragraphs: [
          "O conversor usa a taxa de mesos por NX para calcular a relação entre as moedas.",
        ],
      },
      {
        heading: "Ajuste os valores",
        paragraphs: ["Abra Configurações e informe a taxa de mesos por NX do seu servidor."],
      },
      {
        heading: "Não existe valor universal",
        paragraphs: [
          "Servidores e versões diferentes podem ter economias diferentes. Use os valores que fazem sentido para o seu contexto.",
        ],
      },
    ],
    faqs: [
      {
        question: "O que é a taxa de mesos por NX?",
        answer: "É a quantidade de mesos equivalente a 1 NX usada nas conversões do conversor.",
      },
      {
        question: "Quantos mesos vale 1 NX?",
        answer: "Depende da taxa de mesos por NX configurada.",
      },
      {
        question: "Quantos NX valem 1 meso?",
        answer: "É o inverso da taxa de mesos por NX configurada.",
      },
    ],
    related: ["nxToMesos", "howToConvert", "whatAreMesos", "faq"],
  },

  guideHub: {
    title: "Guias de NX e Mesos — MapleStory",
    description:
      "Guias sobre NX, mesos e conversões para MapleStory, com calculadora e taxas ajustáveis.",
    h1: "Guias de NX e Mesos",
    intro: "Entenda as moedas do MapleStory e use a calculadora com as taxas do seu servidor.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Comece por aqui",
        paragraphs: [
          "Aprenda o que é NX, o que são mesos e como a taxa de mesos por NX pode ajudar a comparar valores.",
        ],
      },
      {
        heading: "Converta na prática",
        paragraphs: [
          "Use os conversores de NX para mesos, mesos para NX e NX para dólar com as taxas do seu servidor.",
        ],
      },
    ],
    faqs: [],
    related: [
      "whatIsNx",
      "whatAreMesos",
      "howToConvert",
      "ratioGuide",
      "nxToMesos",
      "mesosToNx",
      "nxToUsd",
      "usdToNx",
      "faq",
    ],
  },

  faq: {
    title: "Perguntas Frequentes — NX Mesos Converter",
    description:
      "Respostas sobre conversão de NX, mesos, dólar e taxas configuráveis no MapleStory.",
    h1: "Perguntas frequentes",
    intro: "Respostas rápidas sobre o conversor, as moedas e as taxas usadas nos cálculos.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Sobre o conversor",
        paragraphs: [
          "O NX Mesos Converter é uma ferramenta independente para comparar valores entre NX, mesos, dólar e moeda local.",
        ],
      },
    ],
    faqs: [
      {
        question: "O conversor é oficial?",
        answer: "Não. É um projeto independente, sem vínculo com a Nexon.",
      },
      {
        question: "De onde vêm as taxas?",
        answer:
          "As taxas são definidas manualmente por você e salvas no navegador. Não há cotação automática.",
      },
      {
        question: "Funciona para qualquer servidor?",
        answer: "Sim. Ajuste as taxas para o seu servidor, região ou versão do MapleStory.",
      },
      {
        question: "Preciso criar conta?",
        answer: "Não. A ferramenta funciona no navegador sem cadastro.",
      },
      {
        question: "O que é NX?",
        answer: "É uma moeda usada no contexto do MapleStory, especialmente no Cash Shop.",
      },
      {
        question: "O que são mesos?",
        answer: "São a moeda do jogo usada na economia entre jogadores.",
      },
      {
        question: "Como converter NX em mesos?",
        answer: "Digite o valor em NX e confira o resultado em mesos usando as taxas configuradas.",
      },
      {
        question: "A calculadora salva os valores?",
        answer: "Sim. A cotação e as taxas personalizadas ficam salvas neste navegador.",
      },
      {
        question: "Os resultados são valores de mercado?",
        answer:
          "Não. São conversões matemáticas baseadas nas taxas que você informar, não preços de mercado em tempo real.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "nxToUsd", "usdToNx", "howToConvert"],
  },
};
