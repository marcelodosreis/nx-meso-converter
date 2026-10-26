import type { Metadata } from "next";
import type { ReactNode } from "react";
import { RootDocument } from "@/components/root-document";
import "@/app/globals.css";
import { APP_VIEWPORT } from "@/config/viewport";
import { buildRouteMetadata } from "@/lib/seo";

export const metadata: Metadata = buildRouteMetadata("home", "ko");
export const viewport = APP_VIEWPORT;

export default function KoLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <RootDocument lang="ko">{children}</RootDocument>;
}
