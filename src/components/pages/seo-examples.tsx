import { calculateConversion } from "@/application/conversion/calculate-conversion.use-case";
import type { SeoExampleSpec } from "@/content/seo";
import {
  DEFAULT_CONVERSION_RATES,
  DEFAULT_USD_CURRENCY_RATE,
} from "@/domain/conversion/conversion.constants";
import { LOCALE_DEFINITIONS, type Locale } from "@/i18n/locales";
import { formatUnitValue } from "@/lib/formatters";

type SeoExamplesProps = Readonly<{
  locale: Locale;
  example: SeoExampleSpec;
}>;

const EXAMPLE_NOTE: Record<Locale, string> = {
  pt: "Exemplo com as taxas padrão do conversor. Ajuste as taxas para o seu servidor.",
  en: "Example using the converter's default rates. Adjust the rates for your server.",
  ko: "계산기의 기본 비율을 사용한 예시입니다. 서버에 맞게 비율을 조정하세요.",
};

const EXAMPLE_TITLE: Record<Locale, string> = {
  pt: "Exemplos de conversão",
  en: "Conversion examples",
  ko: "변환 예시",
};

export function SeoExamples({ locale, example }: SeoExamplesProps) {
  const definition = LOCALE_DEFINITIONS[locale];
  const intlLocale = definition.numberFormat.intlLocale;
  const labels = definition.messages.units.labels;
  const sourceLabel = labels[example.sourceUnit].label;
  const targetLabels = example.targetUnits.map((unit) => labels[unit].label);
  const rows = example.amounts.map((amount) => {
    const result = calculateConversion({
      amount,
      sourceUnit: example.sourceUnit,
      usdCurrencyRate: DEFAULT_USD_CURRENCY_RATE,
      rates: DEFAULT_CONVERSION_RATES,
    });
    const values = result.ok
      ? example.targetUnits.map((unit) => formatUnitValue(unit, result.values[unit], intlLocale))
      : example.targetUnits.map(() => "—");

    return {
      source: formatUnitValue(example.sourceUnit, amount, intlLocale),
      values,
    };
  });

  return (
    <section className="mt-6">
      <h3 className="font-display text-lg font-semibold tracking-tight text-maple-ink">
        {EXAMPLE_TITLE[locale]}
      </h3>
      <div className="mt-3 overflow-x-auto rounded-2xl border border-sky-100/80 bg-white/75">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-sky-100/80 text-[0.6875rem] font-extrabold uppercase tracking-[0.08em] text-maple-muted">
              <th scope="col" className="px-3 py-2.5">
                {sourceLabel}
              </th>
              {targetLabels.map((label) => (
                <th key={label} scope="col" className="px-3 py-2.5 text-right">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.source} className="border-b border-sky-100/60 last:border-b-0">
                <th scope="row" className="px-3 py-2.5 font-display font-semibold text-maple-ink">
                  {row.source}
                </th>
                {row.values.map((value, index) => (
                  <td
                    key={`${row.source}-${example.targetUnits[index]}`}
                    className="px-3 py-2.5 text-right font-display font-semibold tabular-nums text-maple-ink"
                  >
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-[0.6875rem] font-semibold leading-relaxed text-maple-muted">
        {EXAMPLE_NOTE[locale]}
      </p>
    </section>
  );
}
