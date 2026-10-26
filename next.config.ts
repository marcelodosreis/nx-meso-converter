import type { NextConfig } from "next";

const legacyContentRedirects = [
  { source: "/nx-para-mesos", destination: "/guide" },
  { source: "/mesos-para-nx", destination: "/guide" },
  { source: "/nx-para-dolar", destination: "/guide" },
  { source: "/dolar-para-nx", destination: "/guide" },
  { source: "/guia/o-que-e-nx", destination: "/guide" },
  { source: "/guia/o-que-sao-mesos", destination: "/guide" },
  { source: "/guia/como-converter-nx-em-mesos", destination: "/guide" },
  { source: "/guia/como-calcular-slots", destination: "/guide" },
  { source: "/guia", destination: "/guide" },
  { source: "/perguntas-frequentes", destination: "/guide" },
  { source: "/en/nx-to-mesos", destination: "/en/guide" },
  { source: "/en/mesos-to-nx", destination: "/en/guide" },
  { source: "/en/nx-to-usd", destination: "/en/guide" },
  { source: "/en/usd-to-nx", destination: "/en/guide" },
  { source: "/en/guides/what-is-nx", destination: "/en/guide" },
  { source: "/en/guides/what-are-mesos", destination: "/en/guide" },
  { source: "/en/guides/how-to-convert-nx-to-mesos", destination: "/en/guide" },
  { source: "/en/guides/how-to-calculate-slots", destination: "/en/guide" },
  { source: "/en/guides", destination: "/en/guide" },
  { source: "/en/faq", destination: "/en/guide" },
  { source: "/ko/nx-to-mesos", destination: "/ko/guide" },
  { source: "/ko/mesos-to-nx", destination: "/ko/guide" },
  { source: "/ko/nx-to-usd", destination: "/ko/guide" },
  { source: "/ko/usd-to-nx", destination: "/ko/guide" },
  { source: "/ko/guides/what-is-nx", destination: "/ko/guide" },
  { source: "/ko/guides/what-are-mesos", destination: "/ko/guide" },
  { source: "/ko/guides/how-to-convert-nx-to-mesos", destination: "/ko/guide" },
  { source: "/ko/guides/how-to-calculate-slots", destination: "/ko/guide" },
  { source: "/ko/guides", destination: "/ko/guide" },
  { source: "/ko/faq", destination: "/ko/guide" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return legacyContentRedirects.map(({ source, destination }) => ({
      source,
      destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
