import Link from "next/link";
import { SEO_LAST_MODIFIED } from "@/config/seo";
import { GUIDE_META, GUIDE_SOURCE_KEYS, getRoutePath, getSeoPageContent } from "@/content/seo";
import { LOCALE_DEFINITIONS, type Locale } from "@/i18n/locales";
import { SeoExamples } from "./seo-examples";

type GuideArticleProps = Readonly<{
  locale: Locale;
}>;

const LABELS: Record<
  Locale,
  Readonly<{
    contents: string;
    calculator: string;
    faq: string;
    updated: string;
    independent: string;
  }>
> = {
  pt: {
    contents: "Nesta página",
    calculator: "Abrir calculadora",
    faq: "Perguntas frequentes",
    updated: "Última revisão",
    independent:
      "Ferramenta independente, sem vínculo com a Nexon. As taxas são configuráveis e não representam valores oficiais de mercado.",
  },
  en: {
    contents: "On this page",
    calculator: "Open calculator",
    faq: "Frequently asked questions",
    updated: "Last reviewed",
    independent:
      "Independent tool with no affiliation with Nexon. Rates are configurable and do not represent official market values.",
  },
  ko: {
    contents: "이 페이지에서",
    calculator: "계산기 열기",
    faq: "자주 묻는 질문",
    updated: "마지막 검토",
    independent:
      "Nexon과 관련 없는 독립 도구입니다. 비율은 사용자가 설정하며 공식 시장 가격을 의미하지 않습니다.",
  },
};

export function GuideArticle({ locale }: GuideArticleProps) {
  const meta = GUIDE_META[locale];
  const labels = LABELS[locale];
  const intlLocale = LOCALE_DEFINITIONS[locale].numberFormat.intlLocale;
  const updated = new Intl.DateTimeFormat(intlLocale, {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(SEO_LAST_MODIFIED));
  const calculatorHref = getRoutePath("home", locale);
  const sources = GUIDE_SOURCE_KEYS.map((key) => {
    const page = getSeoPageContent(locale, key);

    return { key, page };
  });
  const contentSources = sources.filter(({ key }) => key !== "faq");
  const faqPage = getSeoPageContent(locale, "faq");
  const faqs = Array.from(
    new Map(sources.flatMap(({ page }) => page.faqs).map((item) => [item.question, item])).values(),
  );

  return (
    <article className="mx-auto w-full max-w-[78ch] pb-2">
      <header className="border-b border-sky-100/80 pb-5">
        <p className="text-[0.625rem] font-extrabold uppercase tracking-[0.2em] text-maple-orange-dark">
          MapleStory
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight tracking-tight text-maple-ink sm:text-4xl">
          {meta.h1}
        </h1>
        <p className="mt-2 max-w-[68ch] text-sm font-semibold leading-relaxed text-maple-muted sm:text-base">
          {meta.intro}
        </p>
        <Link
          href={calculatorHref}
          className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-maple-orange-dark px-4 text-xs font-extrabold text-white shadow-control transition-colors hover:bg-maple-orange-deep"
        >
          {labels.calculator}
        </Link>
      </header>

      <nav aria-label={labels.contents} className="mt-5">
        <h2 className="text-[0.625rem] font-extrabold uppercase tracking-[0.16em] text-maple-muted">
          {labels.contents}
        </h2>
        <ol className="mt-2 grid gap-x-4 gap-y-1 text-sm font-bold text-sky-800 sm:grid-cols-2">
          {contentSources.map(({ key, page }) => (
            <li key={key}>
              <a href={`#${key}`} className="hover:underline">
                {page.h1}
              </a>
            </li>
          ))}
          <li>
            <a href="#faq" className="hover:underline">
              {labels.faq}
            </a>
          </li>
        </ol>
      </nav>

      {contentSources.map(({ key, page }) => (
        <section key={key} id={key} className="mt-8 scroll-mt-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-maple-ink">
            {page.h1}
          </h2>
          <p className="mt-2 text-sm font-semibold leading-relaxed text-maple-muted sm:text-[0.9375rem]">
            {page.intro}
          </p>
          {page.sections.map((section) => (
            <section key={section.heading} className="mt-4">
              <h3 className="font-display text-lg font-semibold tracking-tight text-maple-ink">
                {section.heading}
              </h3>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-1.5 text-sm font-semibold leading-relaxed text-maple-muted sm:text-[0.9375rem]"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          {page.examples === undefined ? null : (
            <SeoExamples locale={locale} example={page.examples} />
          )}
        </section>
      ))}

      <section id="faq" className="mt-8 scroll-mt-6">
        <h2 className="font-display text-2xl font-semibold tracking-tight text-maple-ink">
          {labels.faq}
        </h2>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-maple-muted sm:text-[0.9375rem]">
          {faqPage.intro}
        </p>
        {faqPage.sections.map((section) => (
          <section key={section.heading} className="mt-4">
            <h3 className="font-display text-lg font-semibold tracking-tight text-maple-ink">
              {section.heading}
            </h3>
            {section.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-1.5 text-sm font-semibold leading-relaxed text-maple-muted sm:text-[0.9375rem]"
              >
                {paragraph}
              </p>
            ))}
          </section>
        ))}
        <div className="mt-2 divide-y divide-sky-100/80 border-t border-sky-100/80">
          {faqs.map((item) => (
            <section key={item.question} className="py-3">
              <h3 className="text-sm font-extrabold leading-snug text-maple-ink">
                {item.question}
              </h3>
              <p className="mt-1 text-sm font-semibold leading-relaxed text-maple-muted">
                {item.answer}
              </p>
            </section>
          ))}
        </div>
      </section>

      <div className="mt-8 flex flex-col items-start gap-3 border-t border-sky-100/80 pt-4">
        <Link
          href={calculatorHref}
          className="inline-flex min-h-10 items-center justify-center rounded-xl border border-sky-100 bg-white px-4 text-xs font-extrabold text-sky-800 transition-colors hover:border-sky-200 hover:bg-sky-50"
        >
          {labels.calculator}
        </Link>
        <p className="text-[0.6875rem] font-semibold leading-relaxed text-maple-muted">
          {labels.independent}
        </p>
        <p className="text-[0.6875rem] font-semibold text-maple-muted">
          {labels.updated}: {updated}
        </p>
      </div>
    </article>
  );
}
