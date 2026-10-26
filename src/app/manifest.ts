import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/config/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "Convert NX, mesos, dollars, and local currency with adjustable rates for MapleStory.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f9ff",
    theme_color: "#c8edff",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
