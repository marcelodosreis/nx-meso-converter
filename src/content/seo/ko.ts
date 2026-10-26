import type { SeoPageContent, SeoPageKey } from "./pages";

export const KO_SEO_PAGES: Record<SeoPageKey, SeoPageContent> = {
  home: {
    title: "NX 메소 변환기 — 메이플스토리 계산기",
    description:
      "서버에 맞는 환율로 NX, 메소, 달러, 현지 화폐를 변환하세요. 로그인 없는 무료 메이플스토리 계산기입니다.",
    h1: "메이플스토리 NX·메소·화폐 계산기",
    intro: "NX, 메소, 달러, 현지 화폐를 한 페이지에서 변환하세요. 환율은 직접 설정할 수 있습니다.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "사용 방법",
        paragraphs: [
          "입력 단위를 선택하고 금액을 입력하면 다른 단위의 결과가 바로 표시됩니다.",
          "환율과 게임 비율은 설정에서 변경할 수 있습니다. 서버에 맞게 조정하세요.",
        ],
      },
      {
        heading: "모든 서버에 사용 가능",
        paragraphs: [
          "고정된 환율을 사용하지 않습니다. 직접 입력한 비율로 메이플스토리의 다양한 서버와 지역에 맞출 수 있습니다.",
        ],
      },
      {
        heading: "브라우저에 저장",
        paragraphs: [
          "환율과 게임 비율은 브라우저에 저장됩니다. 계정이 필요 없으며 값이 서버로 전송되지 않습니다.",
        ],
      },
    ],
    faqs: [
      {
        question: "무엇을 변환할 수 있나요?",
        answer: "NX, 메소, 달러, 그리고 설정한 현지 화폐를 변환할 수 있습니다.",
      },
      {
        question: "공식 환율인가요?",
        answer: "아니요. 자동 환율이 아니라 사용자가 직접 설정한 비율을 사용합니다.",
      },
      {
        question: "계정이 필요한가요?",
        answer: "아니요. 브라우저에서 바로 사용할 수 있습니다.",
      },
      {
        question: "설정이 저장되나요?",
        answer: "네. 환율과 사용자 비율은 이 브라우저에 저장됩니다.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "howToConvert", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos", "usd"] },
  },

  nxToMesos: {
    title: "NX → 메소 변환기 — 메이플스토리",
    description: "서버 환율로 NX를 메소로 변환하세요. 로그인 없는 무료 계산기입니다.",
    h1: "NX → 메소 변환기",
    intro: "NX 금액을 입력하고 서버에 설정한 비율로 메소 환산값을 확인하세요.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "변환 방법",
        paragraphs: [
          "메인 입력란에 NX 금액을 입력하면 메소 결과가 자동으로 표시됩니다.",
          "NX와 메소의 관계는 서버 비율에 따라 달라집니다. 설정에서 먼저 비율을 조정하세요.",
        ],
      },
      {
        heading: "값이 달라지는 이유",
        paragraphs: [
          "서버와 버전마다 경제가 다를 수 있습니다. 이 계산기는 공식 환율을 강제하지 않고 입력한 비율을 사용합니다.",
        ],
      },
    ],
    faqs: [
      {
        question: "1 NX는 몇 메소인가요?",
        answer: "설정한 비율에 따라 달라집니다. 서버 비율을 설정에 입력하세요.",
      },
      {
        question: "자동 변환인가요?",
        answer: "아니요. 환율과 게임 비율은 직접 설정하며 브라우저에 저장됩니다.",
      },
      {
        question: "큰 금액도 변환할 수 있나요?",
        answer: "네. 큰 값도 지원하며 계산은 내부적으로 정확하게 처리됩니다.",
      },
    ],
    related: ["mesosToNx", "howToConvert", "slotGuide", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos"] },
  },

  mesosToNx: {
    title: "메소 → NX 변환기 — 메이플스토리",
    description: "서버 환율로 메소를 NX로 변환하세요. 로그인 없는 무료 계산기입니다.",
    h1: "메소 → NX 변환기",
    intro: "메소 금액을 입력하고 서버에 설정한 비율로 NX 환산값을 확인하세요.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "변환 방법",
        paragraphs: [
          "입력 단위에서 메소를 선택하고 금액을 입력하면 NX 결과가 표시됩니다.",
          "관계는 설정의 슬롯당 NX와 슬롯당 메소 비율로 계산됩니다.",
        ],
      },
      {
        heading: "서버에 맞게 조정",
        paragraphs: ["메소 경제는 서버와 버전마다 다릅니다. 사용하는 서버의 비율을 입력하세요."],
      },
    ],
    faqs: [
      {
        question: "1,000 메소는 몇 NX인가요?",
        answer: "설정한 비율에 따라 달라집니다. 설정에서 서버 비율을 조정하세요.",
      },
      {
        question: "메소→NX 비율은 고정인가요?",
        answer: "아니요. 직접 입력한 비율을 사용하며 브라우저에 저장합니다.",
      },
      {
        question: "달러와 현지 화폐도 표시되나요?",
        answer: "네. 사용 가능한 모든 단위가 한 번에 표시됩니다.",
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
    title: "NX → 달러 변환기 — 메이플스토리",
    description: "설정한 비율로 NX를 달러로 변환하세요. 무료 메이플스토리 계산기입니다.",
    h1: "NX → 달러 변환기",
    intro: "NX 금액을 입력하고 설정한 비율로 달러 환산값을 확인하세요.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "계산 방법",
        paragraphs: [
          "설정에서 US$ 1에 해당하는 NX 수를 기준으로 변환합니다.",
          "달러 결과는 메소와 현지 화폐 결과와 함께 표시됩니다.",
        ],
      },
      {
        heading: "수동 환율",
        paragraphs: ["달러 환율은 자동으로 갱신되지 않습니다. 서버에 맞는 값을 직접 입력하세요."],
      },
    ],
    faqs: [
      {
        question: "US$ 1은 몇 NX인가요?",
        answer: "설정한 NX/달러 비율에 따라 달라집니다.",
      },
      {
        question: "환율이 자동으로 갱신되나요?",
        answer: "아니요. 환율은 수동이며 이 브라우저에 저장됩니다.",
      },
      {
        question: "다른 현지 화폐를 사용할 수 있나요?",
        answer: "네. 현지 화폐와 해당 환율을 설정할 수 있습니다.",
      },
    ],
    related: ["usdToNx", "nxToMesos", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["usd"] },
  },

  usdToNx: {
    title: "달러 → NX 변환기 — 메이플스토리",
    description: "설정한 비율로 달러를 NX로 변환하세요. 무료 메이플스토리 계산기입니다.",
    h1: "달러 → NX 변환기",
    intro: "달러 금액을 입력하고 설정한 비율로 NX 환산값을 확인하세요.",
    sourceUnit: "usd",
    sections: [
      {
        heading: "계산 방법",
        paragraphs: [
          "달러 금액에 US$ 1당 NX 수를 곱해 계산합니다.",
          "결과는 메소와 현지 화폐와 함께 비교할 수 있습니다.",
        ],
      },
      {
        heading: "비율 조정",
        paragraphs: ["상황에 따라 비율이 다를 수 있습니다. 설정에서 NX/달러 비율을 조정하세요."],
      },
    ],
    faqs: [
      {
        question: "US$ 1은 몇 NX인가요?",
        answer: "설정한 NX/달러 비율에 따라 달라집니다.",
      },
      {
        question: "달러를 메소로 변환할 수 있나요?",
        answer: "네. 메소 결과도 함께 표시됩니다.",
      },
      {
        question: "비율이 저장되나요?",
        answer: "네. 환율은 브라우저에 저장됩니다.",
      },
    ],
    related: ["nxToUsd", "nxToMesos", "faq"],
    examples: { sourceUnit: "usd", amounts: [1, 5, 10], targetUnits: ["nx"] },
  },

  whatIsNx: {
    title: "메이플스토리 NX란? — 가이드",
    description:
      "메이플스토리의 NX가 무엇인지, 어디에 사용되는지, 메소와 어떻게 다른지 알아보세요.",
    h1: "메이플스토리 NX란?",
    intro:
      "NX는 메이플스토리에서 사용되는 화폐로, 특히 캐시샵과 관련이 있습니다. 메소와는 다릅니다.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "사용 용도",
        paragraphs: [
          "NX는 코스튬, 펫, 편의 기능 등 캐시샵 아이템에 주로 사용됩니다. 사용 가능 여부는 서버에 따라 다릅니다.",
        ],
      },
      {
        heading: "NX와 메소의 차이",
        paragraphs: [
          "메소는 플레이어 경제에서 사용하는 게임 화폐입니다. NX와 메소는 출처와 용도가 다르지만 설정한 비율로 비교할 수 있습니다.",
        ],
      },
      {
        heading: "계산기를 쓰는 이유",
        paragraphs: ["NX, 메소, 달러, 현지 화폐를 비교하려면 서버에 맞는 비율이 필요합니다."],
      },
    ],
    faqs: [
      {
        question: "NX와 메소는 같은 건가요?",
        answer: "아니요. 용도와 출처가 다른 화폐입니다.",
      },
      {
        question: "모든 서버에서 NX 가치가 같은가요?",
        answer: "아니요. 서버, 지역, 상황에 따라 달라질 수 있습니다.",
      },
      {
        question: "NX를 메소로 변환할 수 있나요?",
        answer: "네. 계산기에 변환 비율을 설정하면 됩니다.",
      },
    ],
    related: ["whatAreMesos", "nxToMesos", "howToConvert", "faq"],
  },

  whatAreMesos: {
    title: "메이플스토리 메소란? — 가이드",
    description: "메이플스토리의 메소가 무엇인지, 게임 경제에서 어떻게 사용되는지 알아보세요.",
    h1: "메이플스토리 메소란?",
    intro: "메소는 플레이어 경제에서 사용하는 주요 게임 화폐입니다. NX와는 다릅니다.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "메소의 사용",
        paragraphs: [
          "메소는 게임 내 구매, 강화, 플레이어 간 거래에 사용됩니다. 경제는 서버와 버전에 따라 다릅니다.",
        ],
      },
      {
        heading: "메소와 NX",
        paragraphs: [
          "NX와 메소는 기본적으로 교환할 수 없습니다. 계산기에서 비율을 설정해 비교할 수 있습니다.",
        ],
      },
      {
        heading: "가치 비교",
        paragraphs: ["서버에 맞는 비율을 사용해 메소를 NX, 달러, 현지 화폐와 비교하세요."],
      },
    ],
    faqs: [
      {
        question: "메소와 NX는 같은 건가요?",
        answer: "아니요. 서로 다른 화폐입니다.",
      },
      {
        question: "메소 가치는 고정인가요?",
        answer: "아니요. 서버와 시점에 따라 달라집니다.",
      },
      {
        question: "메소를 NX로 바꾸려면?",
        answer: "서버 비율을 설정한 뒤 계산기를 사용하세요.",
      },
    ],
    related: ["whatIsNx", "mesosToNx", "howToConvert", "faq"],
  },

  howToConvert: {
    title: "NX를 메소로 변환하는 방법 — 가이드",
    description: "서버 비율과 슬롯, 환율을 사용해 NX를 메소로 변환하는 방법을 알아보세요.",
    h1: "NX를 메소로 변환하는 방법",
    intro:
      "변환은 서버 비율에 따라 달라집니다. 비율을 조정할 수 있는 계산기를 사용하는 것이 가장 안전합니다.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "관계 이해하기",
        paragraphs: [
          "계산기는 슬롯당 NX와 슬롯당 메소로 NX와 메소의 관계를 계산합니다.",
          "서버가 다른 관계를 사용한다면 설정에서 값을 조정하세요.",
        ],
      },
      {
        heading: "계산기 사용하기",
        paragraphs: [
          "NX 금액을 입력하면 메소 결과가 표시됩니다. 달러와 현지 화폐도 함께 확인할 수 있습니다.",
          "계산은 즉시 이루어지며 로그인이 필요 없습니다.",
        ],
      },
      {
        heading: "고정 환율 피하기",
        paragraphs: [
          "모든 서버에 적용되는 보편적인 환율은 없습니다. 잘못된 비율은 결과를 왜곡합니다.",
        ],
      },
    ],
    faqs: [
      {
        question: "변환 공식은 무엇인가요?",
        answer: "슬롯당 NX와 슬롯당 메소 비율로 NX와 메소의 관계를 계산합니다.",
      },
      {
        question: "달러 환율이 필요한가요?",
        answer: "달러나 현지 화폐와 비교하려는 경우에만 필요합니다.",
      },
      {
        question: "결과를 믿을 수 있나요?",
        answer: "설정한 비율에 일관된 결과입니다. 잘못된 비율은 잘못된 결과를 만듭니다.",
      },
    ],
    related: ["nxToMesos", "slotGuide", "whatIsNx", "faq"],
  },

  slotGuide: {
    title: "NX와 메소로 슬롯 계산하는 방법 — 가이드",
    description:
      "슬롯당 NX와 슬롯당 메소 비율을 사용해 메이플스토리 변환을 계산하는 방법을 알아보세요.",
    h1: "NX와 메소로 슬롯 계산하는 방법",
    intro:
      "슬롯은 NX와 메소의 관계를 정하는 기준으로 사용할 수 있습니다. 값은 서버 비율에 따라 달라집니다.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "슬롯 비율의 의미",
        paragraphs: [
          "계산기에서 슬롯 하나에 해당하는 NX와 메소를 입력하면 두 화폐의 관계를 계산할 수 있습니다.",
        ],
      },
      {
        heading: "값 조정",
        paragraphs: [
          "설정에서 서버 값을 입력하세요. NX와 메소의 직접 관계를 알고 있다면 그 값도 조정할 수 있습니다.",
        ],
      },
      {
        heading: "보편적인 값은 없음",
        paragraphs: ["서버와 버전마다 경제가 다르므로 사용하는 환경에 맞는 값을 입력해야 합니다."],
      },
    ],
    faqs: [
      {
        question: "슬롯이란 무엇인가요?",
        answer: "이 계산기에서는 NX와 메소의 변환 비율을 정하는 기준을 의미합니다.",
      },
      {
        question: "슬롯 하나는 몇 메소인가요?",
        answer: "설정한 슬롯당 메소 비율에 따라 달라집니다.",
      },
      {
        question: "슬롯 하나는 몇 NX인가요?",
        answer: "설정한 슬롯당 NX 비율에 따라 달라집니다.",
      },
    ],
    related: ["nxToMesos", "howToConvert", "whatAreMesos", "faq"],
  },

  guideHub: {
    title: "NX와 메소 가이드 — 메이플스토리",
    description: "메이플스토리의 NX, 메소, 슬롯, 변환에 관한 가이드와 계산기입니다.",
    h1: "NX와 메소 가이드",
    intro: "메이플스토리 화폐를 이해하고 서버 비율로 계산기를 사용하세요.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "여기서 시작하세요",
        paragraphs: ["NX와 메소가 무엇인지, 슬롯 비율로 어떻게 비교하는지 알아보세요."],
      },
      {
        heading: "실제로 변환하기",
        paragraphs: ["NX→메소, 메소→NX, NX→달러 변환기에서 서버 비율을 사용하세요."],
      },
    ],
    faqs: [],
    related: [
      "whatIsNx",
      "whatAreMesos",
      "howToConvert",
      "slotGuide",
      "nxToMesos",
      "mesosToNx",
      "nxToUsd",
      "usdToNx",
      "faq",
    ],
  },

  faq: {
    title: "자주 묻는 질문 — NX 메소 변환기",
    description: "NX, 메소, 달러, 슬롯, 설정 가능한 환율에 관한 답변입니다.",
    h1: "자주 묻는 질문",
    intro: "계산기와 화폐, 변환 비율에 관한 빠른 답변입니다.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "계산기 소개",
        paragraphs: ["NX Mesos Converter는 NX, 메소, 달러, 현지 화폐를 비교하는 독립 도구입니다."],
      },
    ],
    faqs: [
      {
        question: "공식 도구인가요?",
        answer: "아니요. Nexon과 관련 없는 독립 프로젝트입니다.",
      },
      {
        question: "환율은 어디서 오나요?",
        answer: "사용자가 직접 설정하며 브라우저에 저장됩니다. 자동 갱신은 없습니다.",
      },
      {
        question: "모든 서버에서 사용할 수 있나요?",
        answer: "네. 서버, 지역, 버전에 맞게 비율을 조정할 수 있습니다.",
      },
      {
        question: "계정이 필요한가요?",
        answer: "아니요. 브라우저에서 바로 사용할 수 있습니다.",
      },
      {
        question: "NX란 무엇인가요?",
        answer: "메이플스토리에서 사용되는 화폐로, 주로 캐시샵과 관련이 있습니다.",
      },
      {
        question: "메소란 무엇인가요?",
        answer: "플레이어 경제에서 사용하는 게임 화폐입니다.",
      },
      {
        question: "NX를 메소로 어떻게 변환하나요?",
        answer: "NX 금액을 입력하고 설정한 비율로 메소 결과를 확인하세요.",
      },
      {
        question: "설정이 저장되나요?",
        answer: "네. 환율과 사용자 비율은 이 브라우저에 저장됩니다.",
      },
      {
        question: "결과가 시장 가격인가요?",
        answer: "아니요. 입력한 비율을 사용한 수학적 변환일 뿐입니다.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "nxToUsd", "usdToNx", "howToConvert"],
  },
};
