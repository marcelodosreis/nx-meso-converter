import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidePage } from "@/components/pages/guide-page";
import { HomePage } from "@/components/pages/home-page";
import { getRouteKeyFromSlug, getStaticRouteSlugs } from "@/content/seo";
import { buildRouteMetadata } from "@/lib/seo";

type PageProps = Readonly<{
  params: Promise<{ slug?: string[] }>;
}>;

const LOCALE = "en" as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return getStaticRouteSlugs(LOCALE);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const routeKey = getRouteKeyFromSlug(LOCALE, slug);

  return routeKey === null ? {} : buildRouteMetadata(routeKey, LOCALE);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const routeKey = getRouteKeyFromSlug(LOCALE, slug);

  if (routeKey === null) {
    notFound();
  }

  return routeKey === "guide" ? <GuidePage locale={LOCALE} /> : <HomePage locale={LOCALE} />;
}
