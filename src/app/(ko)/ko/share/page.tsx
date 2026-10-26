import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home-page";
import { buildShareMetadata, searchParamsToString } from "@/lib/share-preview";

const LOCALE = "ko" as const;

type SharePageProps = Readonly<{
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}>;

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: SharePageProps): Promise<Metadata> {
  return buildShareMetadata(LOCALE, searchParamsToString(await searchParams));
}

export default function SharePage() {
  return <HomePage locale={LOCALE} />;
}
