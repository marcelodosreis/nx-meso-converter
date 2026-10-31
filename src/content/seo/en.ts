import type { SeoPageContent, SeoPageKey } from "./pages";

export const EN_SEO_PAGES: Record<SeoPageKey, SeoPageContent> = {
  home: {
    title: "NX Mesos Converter — MapleStory Calculator",
    description:
      "Convert NX, mesos, dollars, and local currency with adjustable rates for your MapleStory server. Free calculator, no login.",
    h1: "NX, Mesos, and Currency Calculator for MapleStory",
    intro:
      "Convert between NX, mesos, dollars, and local currency on one page. Rates are manual and can be adjusted for your server.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "How to use it",
        paragraphs: [
          "Choose the input unit, enter an amount, and review the conversions. You can switch between NX, mesos, dollars, and local currency at any time.",
          "The exchange rate and game rates are available in Settings. Adjust them to match your server.",
        ],
      },
      {
        heading: "Works for any server",
        paragraphs: [
          "Rates are not fixed. The converter uses the values you provide, so it can be adapted to different MapleStory servers, regions, and versions.",
        ],
      },
      {
        heading: "Saved in your browser",
        paragraphs: [
          "Your rate and custom game rates are stored locally. No account is required, and values are not sent to a server.",
        ],
      },
    ],
    faqs: [
      {
        question: "What does the calculator convert?",
        answer: "NX, mesos, dollars, and the local currency configured in the converter.",
      },
      {
        question: "Are the values official?",
        answer:
          "No. The converter uses manual rates that you define, not an official or automatic exchange rate.",
      },
      {
        question: "Do I need an account?",
        answer: "No. The calculator runs in your browser and saves settings locally.",
      },
      {
        question: "Are rates saved?",
        answer: "Yes. The exchange rate and custom game rates are saved in this browser.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "howToConvert", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos", "usd"] },
  },

  nxToMesos: {
    title: "NX to Mesos Converter — MapleStory",
    description:
      "Convert NX to mesos using your server's rate. Free MapleStory calculator, no login.",
    h1: "NX to Mesos Converter",
    intro:
      "Enter an NX amount and see its mesos equivalent using the rate configured for your server.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "How to convert",
        paragraphs: [
          "Enter the NX amount in the main field. The mesos result appears automatically alongside the other units.",
          "The NX-to-mesos relationship depends on your server's rates. Adjust them in Settings before using the result.",
        ],
      },
      {
        heading: "Why values vary",
        paragraphs: [
          "Each server or version may have a different economy. The converter does not enforce an official rate; it uses the relationship you provide.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many mesos is 1 NX?",
        answer:
          "It depends on your configured rate. Enter your server's relationship in Settings to get the correct value.",
      },
      {
        question: "Is the conversion automatic?",
        answer: "No. The exchange rate and game rates are manual and saved in this browser.",
      },
      {
        question: "Can I convert large amounts?",
        answer:
          "Yes. The calculator accepts large values and keeps the calculation internally precise.",
      },
    ],
    related: ["mesosToNx", "howToConvert", "ratioGuide", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["mesos"] },
  },

  mesosToNx: {
    title: "Mesos to NX Converter — MapleStory",
    description:
      "Convert mesos to NX using your server's rate. Free MapleStory calculator, no login.",
    h1: "Mesos to NX Converter",
    intro:
      "Enter a mesos amount and see how much it represents in NX using the rate configured for your server.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "How to convert",
        paragraphs: [
          "Select Mesos as the input unit, enter an amount, and review the NX result.",
          "The relationship is defined by the mesos-per-NX rate configured in the converter.",
        ],
      },
      {
        heading: "Adjust for your server",
        paragraphs: [
          "Meso economies change between servers and versions. Use the values used in your context so the conversion makes sense.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much NX is 1,000 mesos?",
        answer:
          "It depends on your configured rates. Adjust the values in Settings to match your server.",
      },
      {
        question: "Is the mesos-to-NX rate fixed?",
        answer: "No. The converter uses the rates you enter and saves them locally.",
      },
      {
        question: "Does the result include dollars and local currency?",
        answer: "Yes. The calculator shows every available unit at once.",
      },
    ],
    related: ["nxToMesos", "howToConvert", "faq"],
    examples: {
      sourceUnit: "mesos",
      amounts: [45_000, 450_000, 4_500_000],
      targetUnits: ["nx"],
    },
  },

  nxToUsd: {
    title: "NX to USD Converter — MapleStory",
    description: "Convert NX to USD using your configured rate. Free MapleStory calculator.",
    h1: "NX to USD Converter",
    intro:
      "Enter an NX amount and see its USD equivalent using the rate configured in the converter.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "The conversion uses the amount of NX equivalent to US$ 1, defined in Settings.",
          "The USD result appears alongside mesos and local currency for easy comparison.",
        ],
      },
      {
        heading: "Manual exchange rate",
        paragraphs: [
          "The dollar rate is not updated automatically. Use the rate you consider appropriate for your server.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much NX equals US$ 1?",
        answer: "It depends on the NX-per-dollar rate you configure in the converter.",
      },
      {
        question: "Is the exchange rate updated automatically?",
        answer: "No. The exchange rate is manual and saved in this browser.",
      },
      {
        question: "Can I use another local currency?",
        answer: "Yes. The converter supports a generic local currency and its exchange rate.",
      },
    ],
    related: ["usdToNx", "nxToMesos", "faq"],
    examples: { sourceUnit: "nx", amounts: [1_000, 5_000, 10_000], targetUnits: ["usd"] },
  },

  usdToNx: {
    title: "USD to NX Converter — MapleStory",
    description: "Convert USD to NX using your configured rate. Free MapleStory calculator.",
    h1: "USD to NX Converter",
    intro:
      "Enter a USD amount and see how much NX it represents using the rate configured in the converter.",
    sourceUnit: "usd",
    sections: [
      {
        heading: "How it works",
        paragraphs: [
          "The conversion multiplies the USD amount by the amount of NX equivalent to US$ 1.",
          "The result appears alongside mesos and local currency for comparison.",
        ],
      },
      {
        heading: "Adjust the rate",
        paragraphs: [
          "Different contexts may use different rates. Adjust NX per dollar in Settings to match your server.",
        ],
      },
    ],
    faqs: [
      {
        question: "How much NX is US$ 1?",
        answer: "It depends on the configured NX-per-dollar rate.",
      },
      {
        question: "Can I convert USD to mesos?",
        answer: "Yes. The mesos result also appears in the conversion list.",
      },
      {
        question: "Is the rate saved?",
        answer: "Yes. The exchange rate is saved locally in your browser.",
      },
    ],
    related: ["nxToUsd", "nxToMesos", "faq"],
    examples: { sourceUnit: "usd", amounts: [1, 5, 10], targetUnits: ["nx"] },
  },

  whatIsNx: {
    title: "What is NX in MapleStory? — Guide",
    description:
      "Learn what NX is in MapleStory, what it is used for, and how it relates to mesos and local currency.",
    h1: "What is NX in MapleStory?",
    intro:
      "NX is a currency used in the MapleStory universe, especially around the Cash Shop. It is not the same as mesos.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "What it is used for",
        paragraphs: [
          "NX is commonly used for Cash Shop items and services such as cosmetics, pets, and conveniences. Availability varies by server.",
        ],
      },
      {
        heading: "NX is not mesos",
        paragraphs: [
          "Mesos are the in-game currency used in the player economy. NX and mesos have different sources and uses, but they can be compared using a configurable rate.",
        ],
      },
      {
        heading: "Why use a converter",
        paragraphs: [
          "A converter helps compare NX, mesos, dollars, and local currency. Since rates vary, adjust the calculation to your server.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is NX the same as mesos?",
        answer: "No. They are different currencies with different uses and sources.",
      },
      {
        question: "Does NX have the same value on every server?",
        answer: "No. Values and rates can vary by server, region, and context.",
      },
      {
        question: "Can I convert NX to mesos?",
        answer: "Yes, by using a conversion rate configured in the calculator.",
      },
    ],
    related: ["whatAreMesos", "nxToMesos", "howToConvert", "faq"],
  },

  whatAreMesos: {
    title: "What are Mesos in MapleStory? — Guide",
    description:
      "Learn what mesos are in MapleStory, how they work in the game economy, and how to compare them with NX.",
    h1: "What are Mesos in MapleStory?",
    intro:
      "Mesos are the main in-game currency used in the player economy. They are different from NX.",
    sourceUnit: "mesos",
    sections: [
      {
        heading: "How mesos are used",
        paragraphs: [
          "Mesos circulate in the game and are used for purchases, upgrades, and player trading. The economy varies by server and version.",
        ],
      },
      {
        heading: "Mesos and NX",
        paragraphs: [
          "NX and mesos are not interchangeable by default. A converter lets you compare values using rates you define.",
        ],
      },
      {
        heading: "Comparing values",
        paragraphs: [
          "Use your context's rates to compare mesos with NX, dollars, or local currency without relying on a fixed value.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are mesos the same as NX?",
        answer: "No. They are different currencies with different purposes.",
      },
      {
        question: "Is the value of mesos fixed?",
        answer: "No. The economy and rates vary by server and time.",
      },
      {
        question: "How do I convert mesos to NX?",
        answer: "Use the calculator with your server's rates configured.",
      },
    ],
    related: ["whatIsNx", "mesosToNx", "howToConvert", "faq"],
  },

  howToConvert: {
    title: "How to Convert NX to Mesos — Guide",
    description:
      "Learn how to convert NX to mesos using your server's rates, including the mesos-per-NX rate and exchange rates.",
    h1: "How to convert NX to mesos",
    intro:
      "The conversion depends on your server's rates. The most reliable approach is a calculator with adjustable rates.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Understand the relationship",
        paragraphs: [
          "The converter uses the mesos-per-NX rate to calculate the relationship between NX and mesos.",
          "If your server uses a different relationship, adjust the values in Settings before converting.",
        ],
      },
      {
        heading: "Use the calculator",
        paragraphs: [
          "Enter the NX amount and review the mesos result. The list also shows dollars and local currency.",
          "The calculation is instant and requires no login.",
        ],
      },
      {
        heading: "Avoid fixed rates",
        paragraphs: [
          "There is no universal rate for every server. Using the wrong rate produces misleading results.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the conversion formula?",
        answer: "The NX-to-mesos relationship is calculated from the mesos-per-NX rate.",
      },
      {
        question: "Do I need the dollar rate?",
        answer: "Only if you want to compare with dollars or local currency.",
      },
      {
        question: "Is the result reliable?",
        answer: "It is consistent with the rates you configure. Wrong rates produce wrong results.",
      },
    ],
    related: ["nxToMesos", "ratioGuide", "whatIsNx", "faq"],
  },

  ratioGuide: {
    title: "How to Calculate the NX-to-Mesos Ratio — Guide",
    description: "Understand how to use the mesos-per-NX rate for MapleStory conversions.",
    h1: "How to calculate the NX-to-mesos ratio",
    intro:
      "The mesos-per-NX rate defines how many mesos equal 1 NX. The value depends on your server.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "What the rate means",
        paragraphs: [
          "The converter uses the mesos-per-NX rate to calculate the relationship between currencies.",
        ],
      },
      {
        heading: "Adjust the values",
        paragraphs: ["Open Settings and enter your server's mesos-per-NX rate."],
      },
      {
        heading: "There is no universal value",
        paragraphs: [
          "Different servers and versions may have different economies. Use the values that make sense for your context.",
        ],
      },
    ],
    faqs: [
      {
        question: "What is the mesos-per-NX rate?",
        answer:
          "It is the amount of mesos equivalent to 1 NX used in the converter's calculations.",
      },
      {
        question: "How many mesos is 1 NX?",
        answer: "It depends on the configured mesos-per-NX rate.",
      },
      {
        question: "How many NX is 1 meso?",
        answer: "It is the inverse of the configured mesos-per-NX rate.",
      },
    ],
    related: ["nxToMesos", "howToConvert", "whatAreMesos", "faq"],
  },

  guideHub: {
    title: "NX and Mesos Guides — MapleStory",
    description:
      "Guides about NX, mesos, and conversions for MapleStory, with an adjustable calculator.",
    h1: "NX and Mesos Guides",
    intro: "Understand MapleStory currencies and use the calculator with your server's rates.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "Start here",
        paragraphs: [
          "Learn what NX is, what mesos are, and how the mesos-per-NX rate can help you compare values.",
        ],
      },
      {
        heading: "Convert in practice",
        paragraphs: [
          "Use the NX-to-mesos, mesos-to-NX, and NX-to-USD converters with your server's rates.",
        ],
      },
    ],
    faqs: [],
    related: [
      "whatIsNx",
      "whatAreMesos",
      "howToConvert",
      "ratioGuide",
      "nxToMesos",
      "mesosToNx",
      "nxToUsd",
      "usdToNx",
      "faq",
    ],
  },

  faq: {
    title: "Frequently Asked Questions — NX Mesos Converter",
    description:
      "Answers about NX, mesos, dollars, and adjustable rates for MapleStory conversions.",
    h1: "Frequently asked questions",
    intro: "Quick answers about the converter, currencies, and the rates used in calculations.",
    sourceUnit: "nx",
    sections: [
      {
        heading: "About the converter",
        paragraphs: [
          "NX Mesos Converter is an independent tool for comparing NX, mesos, dollars, and local currency.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is the converter official?",
        answer: "No. It is an independent project with no affiliation with Nexon.",
      },
      {
        question: "Where do the rates come from?",
        answer:
          "Rates are defined manually by you and saved in your browser. Nothing is updated automatically.",
      },
      {
        question: "Does it work for any server?",
        answer: "Yes. Adjust the rates for your MapleStory server, region, or version.",
      },
      {
        question: "Do I need an account?",
        answer: "No. The tool runs in your browser without registration.",
      },
      {
        question: "What is NX?",
        answer: "It is a currency used in the MapleStory context, especially around the Cash Shop.",
      },
      {
        question: "What are mesos?",
        answer: "They are the in-game currency used in the player economy.",
      },
      {
        question: "How do I convert NX to mesos?",
        answer: "Enter the NX amount and review the mesos result using your configured rates.",
      },
      {
        question: "Does the calculator save values?",
        answer: "Yes. The exchange rate and custom game rates are saved in this browser.",
      },
      {
        question: "Are results market prices?",
        answer:
          "No. They are mathematical conversions based on the rates you provide, not live market prices.",
      },
    ],
    related: ["nxToMesos", "mesosToNx", "nxToUsd", "usdToNx", "howToConvert"],
  },
};
