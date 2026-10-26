import { describe, expect, it } from "vitest";
import { buildShareMetadata, buildSharePreview, searchParamsToString } from "./share-preview";

describe("share preview", () => {
  it("builds scenario values for the default rates", () => {
    const preview = buildSharePreview("pt", "?amount=5000&unit=nx");

    expect(preview.nxValue).toBe("5.000");
    expect(preview.mesosValue).toBe("45.000");
    expect(preview.usdValue).toBe("US$ 5,00");
    expect(preview.title).toContain("5.000");
    expect(preview.title).toContain("45.000");
    expect(preview.title).toContain("Cenário compartilhado");
    expect(preview.description).toContain("Confira a conversão que eu montei");
  });

  it("updates the shared text with the scenario values", () => {
    const small = buildSharePreview("pt", "?amount=1000&unit=nx");
    const large = buildSharePreview("pt", "?amount=10000&unit=nx");

    expect(small.title).not.toBe(large.title);
    expect(small.title).toContain("1.000");
    expect(large.title).toContain("10.000");
  });

  it("applies custom rates from the shared scenario", () => {
    const preview = buildSharePreview(
      "en",
      "?amount=4000&nxPerUsd=2000&nxPerSlot=6000&mesosPerSlot=30000",
    );

    expect(preview.nxValue).toBe("4,000");
    expect(preview.mesosValue).toBe("20,000");
    expect(preview.usdValue).toBe("US$ 2.00");
  });

  it("builds noindex metadata with a scenario-specific image", () => {
    const metadata = buildShareMetadata("pt", "?amount=5000&unit=mesos");
    const images = metadata.openGraph?.images;

    expect(metadata.robots).toEqual({ index: false, follow: true });
    expect(metadata.alternates?.canonical).toBe("/");
    expect(Array.isArray(images)).toBe(true);

    if (!Array.isArray(images)) {
      throw new Error("Expected an OG image.");
    }

    const imageUrl = getImageUrl(images[0]);

    expect(imageUrl).toContain("/api/og?");
    expect(imageUrl).toContain("amount=5000");
    expect(imageUrl).toContain("locale=pt");
  });

  it("serializes Next search params", () => {
    expect(searchParamsToString({ amount: "5000", unit: ["nx", "mesos"] })).toBe(
      "?amount=5000&unit=nx&unit=mesos",
    );
  });
});

function getImageUrl(image: unknown): string {
  if (typeof image === "string") {
    return image;
  }

  if (image instanceof URL) {
    return image.toString();
  }

  if (typeof image === "object" && image !== null && "url" in image) {
    return String(image.url);
  }

  return "";
}
