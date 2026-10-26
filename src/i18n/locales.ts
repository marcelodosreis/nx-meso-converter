import type { ConversionUnit } from "@/domain/conversion/conversion.types";

export const LOCALES = ["pt", "en", "ko"] as const;
export type Locale = (typeof LOCALES)[number];

export type LocaleNumberFormat = Readonly<{
  intlLocale: string;
  groupSeparator: string;
  decimalSeparator: string;
}>;

export type UnitMessages = Readonly<{
  label: string;
  shortLabel: string;
  ariaLabel: string;
  copyAriaLabel: string;
}>;

export type Messages = Readonly<{
  header: Readonly<{
    tagline: string;
  }>;
  share: Readonly<{
    label: string;
    copied: string;
    failed: string;
  }>;
  language: Readonly<{
    label: string;
    change: string;
  }>;
  amount: Readonly<{
    label: string;
    placeholder: string;
    help: string;
    clear: string;
    invalid: string;
    inputSectionTitle: string;
    quickValues: string;
    quickShort: string;
    useValue: string;
  }>;
  units: Readonly<{
    legend: string;
    labels: Record<ConversionUnit, UnitMessages>;
  }>;
  results: Readonly<{
    title: string;
    source: (value: string) => string;
    empty: string;
    fixAmount: string;
    fixRate: string;
    unavailable: string;
    copyAll: string;
    copyAllShort: string;
    affectedByCustomRates: string;
  }>;
  rate: Readonly<{
    title: string;
    manual: string;
    ariaLabel: string;
    equalsPrefix: string;
    suffix: string;
    defaultPrefix: string;
    reset: string;
    resetShort: string;
    note: string;
    description: string;
    disabledDescription: string;
    reference: string;
    disabled: string;
    hide: string;
    show: string;
    errors: Readonly<{
      empty: string;
      nonPositive: string;
      invalid: string;
    }>;
  }>;
  copy: Readonly<{
    success: string;
    failure: string;
  }>;
  settings: Readonly<{
    open: string;
    title: string;
    description: string;
    custom: string;
    close: string;
    nxPerUsd: string;
    nxPerUsdHint: string;
    nxPerSlot: string;
    nxPerSlotHint: string;
    mesosPerSlot: string;
    mesosPerSlotHint: string;
    mesosPerNx: string;
    mesosPerNxHint: string;
    currentRelation: string;
    derived: (mesosPerNx: string) => string;
    syncNote: string;
    note: string;
    reset: string;
    cancel: string;
    save: string;
    invalidField: string;
  }>;
  metaDescription: string;
  disclaimer: string;
}>;

export type LocaleDefinition = Readonly<{
  locale: Locale;
  htmlLang: string;
  name: string;
  shortLabel: string;
  numberFormat: LocaleNumberFormat;
  messages: Messages;
}>;

export const DEFAULT_LOCALE: Locale = "pt";

export const LOCALE_DEFINITIONS: Record<Locale, LocaleDefinition> = {
  pt: {
    locale: "pt",
    htmlLang: "pt-BR",
    name: "Português",
    shortLabel: "PT",
    numberFormat: {
      intlLocale: "pt-BR",
      groupSeparator: ".",
      decimalSeparator: ",",
    },
    messages: {
      header: {
        tagline: "NX, mesos, dólar e moeda no mesmo lugar.",
      },
      share: {
        label: "Copiar link do cenário",
        copied: "Link copiado!",
        failed: "Não foi possível copiar o link.",
      },
      language: {
        label: "Idioma",
        change: "Alterar idioma",
      },
      amount: {
        label: "Valor",
        placeholder: "0,00",
        help: "Use vírgula para decimais.",
        clear: "Limpar valor",
        invalid: "Digite um valor válido.",
        inputSectionTitle: "Entrada da conversão",
        quickValues: "Valores rápidos",
        quickShort: "Atalhos",
        useValue: "Usar valor",
      },
      units: {
        legend: "Unidade de entrada",
        labels: {
          nx: {
            label: "NX",
            shortLabel: "NX",
            ariaLabel: "valor em NX",
            copyAriaLabel: "Copiar valor em NX",
          },
          mesos: {
            label: "Mesos",
            shortLabel: "Mesos",
            ariaLabel: "valor em mesos",
            copyAriaLabel: "Copiar valor em mesos",
          },
          usd: {
            label: "Dólar",
            shortLabel: "USD",
            ariaLabel: "valor em dólar",
            copyAriaLabel: "Copiar valor em dólar",
          },
          currency: {
            label: "Moeda",
            shortLabel: "Moeda",
            ariaLabel: "valor em moeda",
            copyAriaLabel: "Copiar valor em moeda",
          },
        },
      },
      results: {
        title: "Conversões",
        source: (value) => `Origem: ${value}`,
        empty: "Digite um valor para converter.",
        fixAmount: "Corrija o valor para continuar.",
        fixRate: "Ajuste a cotação para continuar.",
        unavailable: "Conversão indisponível.",
        copyAll: "Copiar todas as conversões",
        copyAllShort: "Copiar",
        affectedByCustomRates: "Valor afetado pelas configurações personalizadas",
      },
      rate: {
        title: "Cotação da moeda",
        manual: "Manual",
        ariaLabel: "Cotação do dólar na moeda escolhida",
        equalsPrefix: "1 US$ =",
        suffix: "moedas",
        defaultPrefix: "Padrão:",
        reset: "Restaurar cotação padrão",
        resetShort: "Restaurar",
        note: "Salva neste navegador.",
        description: "Conversão opcional para a moeda local.",
        disabledDescription: "Desativada e oculta dos resultados.",
        reference: "Referência rápida",
        disabled: "Desativada",
        hide: "Ocultar moeda",
        show: "Mostrar moeda",
        errors: {
          empty: "Informe uma cotação maior que zero.",
          nonPositive: "A cotação deve ser maior que zero.",
          invalid: "Use um número válido, como 5,40.",
        },
      },
      copy: {
        success: "Valor copiado.",
        failure: "Não foi possível copiar o valor.",
      },
      settings: {
        open: "Configurações",
        title: "Configurações de conversão",
        description: "Ajuste como NX, mesos e dólar se relacionam.",
        custom: "Personalizado",
        close: "Fechar configurações",
        nxPerUsd: "NX por US$",
        nxPerUsdHint: "Quantidade de NX equivalente a 1 dólar.",
        nxPerSlot: "NX por slot",
        nxPerSlotHint: "Quantidade de NX equivalente a 1 slot.",
        mesosPerSlot: "Mesos por slot",
        mesosPerSlotHint: "Quantidade de mesos equivalente a 1 slot.",
        mesosPerNx: "Mesos por NX",
        mesosPerNxHint:
          "Taxa direta entre NX e mesos. Alterar este campo atualiza os mesos por slot.",
        currentRelation: "Relação atual",
        derived: (mesosPerNx) => `1 NX = ${mesosPerNx} mesos`,
        syncNote: "NX por slot, mesos por slot e mesos por NX são sincronizados automaticamente.",
        note: "As alterações são aplicadas a todas as conversões e salvas neste navegador.",
        reset: "Restaurar padrões",
        cancel: "Cancelar",
        save: "Salvar alterações",
        invalidField: "Informe um valor maior que zero.",
      },
      metaDescription: "Converta NX, mesos, dólar e moeda com taxas ajustáveis.",
      disclaimer: "Apenas para métricas e conversões. Não apoiamos RMT.",
    },
  },
  en: {
    locale: "en",
    htmlLang: "en",
    name: "English",
    shortLabel: "EN",
    numberFormat: {
      intlLocale: "en-US",
      groupSeparator: ",",
      decimalSeparator: ".",
    },
    messages: {
      header: {
        tagline: "NX, mesos, dollars, and currency in one place.",
      },
      share: {
        label: "Copy scenario link",
        copied: "Link copied!",
        failed: "Could not copy the link.",
      },
      language: {
        label: "Language",
        change: "Change language",
      },
      amount: {
        label: "Amount",
        placeholder: "0.00",
        help: "Use a period for decimals.",
        clear: "Clear amount",
        invalid: "Enter a valid amount.",
        inputSectionTitle: "Conversion input",
        quickValues: "Quick values",
        quickShort: "Quick",
        useValue: "Use value",
      },
      units: {
        legend: "Input unit",
        labels: {
          nx: {
            label: "NX",
            shortLabel: "NX",
            ariaLabel: "value in NX",
            copyAriaLabel: "Copy NX value",
          },
          mesos: {
            label: "Mesos",
            shortLabel: "Mesos",
            ariaLabel: "value in mesos",
            copyAriaLabel: "Copy mesos value",
          },
          usd: {
            label: "Dollar",
            shortLabel: "USD",
            ariaLabel: "value in dollars",
            copyAriaLabel: "Copy dollar value",
          },
          currency: {
            label: "Currency",
            shortLabel: "Currency",
            ariaLabel: "value in currency",
            copyAriaLabel: "Copy currency value",
          },
        },
      },
      results: {
        title: "Conversions",
        source: (value) => `Source: ${value}`,
        empty: "Enter an amount to convert.",
        fixAmount: "Fix the amount to continue.",
        fixRate: "Adjust the rate to continue.",
        unavailable: "Conversion unavailable.",
        copyAll: "Copy all conversions",
        copyAllShort: "Copy",
        affectedByCustomRates: "Value affected by custom settings",
      },
      rate: {
        title: "Currency rate",
        manual: "Manual",
        ariaLabel: "Dollar rate in the selected currency",
        equalsPrefix: "1 US$ =",
        suffix: "units",
        defaultPrefix: "Default:",
        reset: "Reset default rate",
        resetShort: "Reset",
        note: "Saved in this browser.",
        description: "Optional conversion to the local currency.",
        disabledDescription: "Disabled and hidden from the results.",
        reference: "Quick reference",
        disabled: "Disabled",
        hide: "Hide currency",
        show: "Show currency",
        errors: {
          empty: "Enter a rate greater than zero.",
          nonPositive: "The rate must be greater than zero.",
          invalid: "Use a valid number, such as 5.40.",
        },
      },
      copy: {
        success: "Value copied.",
        failure: "Could not copy the value.",
      },
      settings: {
        open: "Settings",
        title: "Conversion settings",
        description: "Adjust how NX, mesos, and dollars relate.",
        custom: "Custom",
        close: "Close settings",
        nxPerUsd: "NX per US$",
        nxPerUsdHint: "Amount of NX equal to US$ 1.",
        nxPerSlot: "NX per slot",
        nxPerSlotHint: "Amount of NX equal to one slot.",
        mesosPerSlot: "Mesos per slot",
        mesosPerSlotHint: "Amount of mesos equal to one slot.",
        mesosPerNx: "Mesos per NX",
        mesosPerNxHint: "Direct NX-to-mesos rate. Changing this field updates mesos per slot.",
        currentRelation: "Current ratio",
        derived: (mesosPerNx) => `1 NX = ${mesosPerNx} mesos`,
        syncNote: "NX per slot, mesos per slot, and mesos per NX are synchronized automatically.",
        note: "Changes apply to all conversions and are saved in this browser.",
        reset: "Restore defaults",
        cancel: "Cancel",
        save: "Save changes",
        invalidField: "Enter a value greater than zero.",
      },
      metaDescription: "Convert NX, mesos, dollars, and a custom currency with adjustable rates.",
      disclaimer: "For metrics and conversions only. We do not support RMT.",
    },
  },
  ko: {
    locale: "ko",
    htmlLang: "ko",
    name: "한국어",
    shortLabel: "KO",
    numberFormat: {
      intlLocale: "ko-KR",
      groupSeparator: ",",
      decimalSeparator: ".",
    },
    messages: {
      header: {
        tagline: "NX, 메소, 달러, 화폐를 한곳에서.",
      },
      share: {
        label: "시나리오 링크 복사",
        copied: "링크가 복사되었습니다!",
        failed: "링크를 복사하지 못했습니다.",
      },
      language: {
        label: "언어",
        change: "언어 변경",
      },
      amount: {
        label: "금액",
        placeholder: "0.00",
        help: "소수점에는 마침표를 사용하세요.",
        clear: "금액 지우기",
        invalid: "올바른 금액을 입력하세요.",
        inputSectionTitle: "변환 입력",
        quickValues: "빠른 값",
        quickShort: "빠른 값",
        useValue: "값 사용",
      },
      units: {
        legend: "입력 단위",
        labels: {
          nx: {
            label: "NX",
            shortLabel: "NX",
            ariaLabel: "NX 값",
            copyAriaLabel: "NX 값 복사",
          },
          mesos: {
            label: "메소",
            shortLabel: "메소",
            ariaLabel: "메소 값",
            copyAriaLabel: "메소 값 복사",
          },
          usd: {
            label: "달러",
            shortLabel: "USD",
            ariaLabel: "달러 값",
            copyAriaLabel: "달러 값 복사",
          },
          currency: {
            label: "화폐",
            shortLabel: "화폐",
            ariaLabel: "화폐 값",
            copyAriaLabel: "화폐 값 복사",
          },
        },
      },
      results: {
        title: "변환 결과",
        source: (value) => `원본: ${value}`,
        empty: "변환할 금액을 입력하세요.",
        fixAmount: "계속하려면 금액을 확인하세요.",
        fixRate: "계속하려면 환율을 조정하세요.",
        unavailable: "변환할 수 없습니다.",
        copyAll: "모든 변환 결과 복사",
        copyAllShort: "복사",
        affectedByCustomRates: "사용자 지정 설정의 영향을 받는 값",
      },
      rate: {
        title: "화폐 환율",
        manual: "수동",
        ariaLabel: "선택한 화폐의 달러 환율",
        equalsPrefix: "1 US$ =",
        suffix: "단위",
        defaultPrefix: "기본값:",
        reset: "기본 환율로 재설정",
        resetShort: "초기화",
        note: "이 브라우저에 저장됩니다.",
        description: "현지 화폐로의 선택적 변환입니다.",
        disabledDescription: "비활성화되어 결과에서 숨겨집니다.",
        reference: "빠른 참조",
        disabled: "비활성화",
        hide: "화폐 숨기기",
        show: "화폐 표시",
        errors: {
          empty: "0보다 큰 환율을 입력하세요.",
          nonPositive: "환율은 0보다 커야 합니다.",
          invalid: "5.40과 같은 올바른 숫자를 입력하세요.",
        },
      },
      copy: {
        success: "값이 복사되었습니다.",
        failure: "값을 복사하지 못했습니다.",
      },
      settings: {
        open: "설정",
        title: "변환 설정",
        description: "NX, 메소, 달러의 관계를 조정하세요.",
        custom: "사용자 지정",
        close: "설정 닫기",
        nxPerUsd: "US$당 NX",
        nxPerUsdHint: "1달러에 해당하는 NX 수입니다.",
        nxPerSlot: "슬롯당 NX",
        nxPerSlotHint: "슬롯 1개에 해당하는 NX 수입니다.",
        mesosPerSlot: "슬롯당 메소",
        mesosPerSlotHint: "슬롯 1개에 해당하는 메소 수입니다.",
        mesosPerNx: "NX당 메소",
        mesosPerNxHint: "NX와 메소의 직접 환율입니다. 변경하면 슬롯당 메소가 업데이트됩니다.",
        currentRelation: "현재 비율",
        derived: (mesosPerNx) => `1 NX = ${mesosPerNx} 메소`,
        syncNote: "슬롯당 NX, 슬롯당 메소, NX당 메소는 자동으로 동기화됩니다.",
        note: "변경 사항은 모든 변환에 적용되며 이 브라우저에 저장됩니다.",
        reset: "기본값 복원",
        cancel: "취소",
        save: "변경 사항 저장",
        invalidField: "0보다 큰 값을 입력하세요.",
      },
      metaDescription: "조정 가능한 환율로 NX, 메소, 달러, 화폐를 변환하세요.",
      disclaimer: "지표 및 변환 용도로만 사용하세요. RMT는 지원하지 않습니다.",
    },
  },
};

export function isLocale(value: unknown): value is Locale {
  return LOCALES.some((locale) => locale === value);
}

export function detectPreferredLocale(languages: readonly string[]): Locale | null {
  for (const language of languages) {
    const baseLanguage = language.toLowerCase().split("-")[0];

    if (isLocale(baseLanguage)) {
      return baseLanguage;
    }
  }

  return null;
}
