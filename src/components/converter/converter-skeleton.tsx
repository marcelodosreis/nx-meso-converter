"use client";

import { useLocale } from "@/i18n/locale-provider";

const UNIT_SKELETONS = ["nx", "mesos", "usd", "currency"] as const;
const ROW_SKELETONS = ["first", "second", "third"] as const;

export function ConverterSkeleton() {
  const { messages } = useLocale();

  return (
    <div className="calculator-surface flex flex-col" aria-busy="true">
      <span role="status" className="sr-only">
        {messages.loading}
      </span>

      <div className="contents md:grid md:grid-cols-[minmax(0,2.1fr)_minmax(18rem,1fr)]">
        <section className="order-1 min-w-0 p-4 sm:p-5" aria-hidden="true">
          <Skeleton className="h-6 w-24 lg:h-7" />
          <Skeleton className="mt-2 h-[5.25rem] w-full rounded-2xl sm:h-[5.5rem]" />
          <Skeleton className="mt-3 h-3 w-24" />
          <div className="mt-1.5 grid grid-cols-4 gap-1 rounded-2xl border border-sky-100/80 bg-sky-50/60 p-1">
            {UNIT_SKELETONS.map((unit) => (
              <Skeleton key={unit} className="h-11 rounded-xl sm:h-12 lg:h-14" />
            ))}
          </div>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-9 w-28 rounded-full lg:h-11" />
          </div>
        </section>

        <div
          className="order-3 min-w-0 border-t border-sky-100/80 p-4 sm:p-5 md:border-l md:border-t-0"
          aria-hidden="true"
        >
          <Skeleton className="h-5 w-40" />
          <Skeleton className="mt-3 h-12 w-full rounded-xl" />
          <div className="mt-3 flex items-center justify-between gap-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="mt-3 border-t border-sky-100/80 pt-2.5">
            <Skeleton className="h-3 w-24" />
            <div className="mt-2 grid grid-cols-3 gap-2">
              {ROW_SKELETONS.map((row) => (
                <Skeleton key={row} className="h-10 rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="order-2 border-t border-sky-100/80 p-4 sm:p-5" aria-hidden="true">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Skeleton className="h-7 w-32" />
            <Skeleton className="mt-2.5 h-4 w-44" />
          </div>
          <Skeleton className="h-10 w-24 rounded-xl lg:h-12" />
        </div>

        <div className="mt-2 grid grid-cols-1 divide-y divide-sky-100/80 border-t border-sky-100/80 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          {ROW_SKELETONS.map((row) => (
            <div
              key={row}
              className="flex items-center gap-2.5 py-2.5 sm:gap-3 sm:py-4 lg:px-4 lg:py-5"
            >
              <Skeleton className="size-9 rounded-lg sm:size-10 sm:rounded-xl lg:size-12" />
              <div className="min-w-0 flex-1">
                <Skeleton className="h-3.5 w-16 lg:h-5" />
                <Skeleton className="mt-1.5 h-6 w-40 max-w-full rounded-md lg:mt-2 lg:h-10" />
              </div>
              <Skeleton className="size-11 rounded-xl sm:size-10 lg:size-11" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Skeleton({ className }: Readonly<{ className: string }>) {
  return <div aria-hidden="true" className={`animate-pulse bg-sky-100/80 ${className}`} />;
}
