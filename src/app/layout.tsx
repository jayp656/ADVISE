import type { Metadata } from "next";
import { Inter, Shippori_Mincho_B1, M_PLUS_1p } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const cormorant = Shippori_Mincho_B1({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "800"],
});

const dmSans = M_PLUS_1p({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["100", "300", "400"],
});

const OG_IMAGE = "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=85&fit=crop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.domaineco.com"),
  title: {
    default: "Domaine Co. | ADU & Property Intelligence — San Diego",
    template: "%s | Domaine Co.",
  },
  description:
    "San Diego's property intelligence advisory. Discover hidden value in your home — ADU feasibility, garage conversions, SB9 lot splits, CalHFA grants, and ROI modeling. Most homeowners are leaving $40,000–$185,000 on the table.",
  keywords: [
    "ADU San Diego",
    "ADU feasibility analysis",
    "accessory dwelling unit San Diego",
    "garage conversion San Diego",
    "SB9 lot split San Diego",
    "CalHFA ADU grant",
    "property ROI analysis",
    "San Diego property investment",
    "ADU builder San Diego",
    "home addition ROI San Diego",
    "ADU rental income San Diego",
    "property intelligence platform",
    "ADU North Park",
    "ADU Ocean Beach",
    "ADU Hillcrest",
    "ADU Kensington",
    "ADU Encinitas",
    "Domaine Co",
  ],
  authors: [{ name: "Jason Umana", url: "https://www.domaineco.com" }],
  creator: "Domaine Co.",
  publisher: "Domaine Co.",
  category: "Real Estate Advisory",
  alternates: {
    canonical: "https://www.domaineco.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.domaineco.com",
    siteName: "Domaine Co.",
    title: "Domaine Co. | Property Intelligence & ADU Advisory — San Diego",
    description:
      "Most San Diego properties hold more potential than their owners realize. Expert ADU feasibility, ROI modeling, and financing guidance for San Diego County homeowners.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Domaine Co. — San Diego Property Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Domaine Co. | Property Intelligence — San Diego",
    description:
      "Most San Diego properties hold more potential than their owners realize. Discover yours.",
    images: [OG_IMAGE],
    creator: "@domaineco",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.domaineco.com/#business",
      name: "Domaine Co.",
      description:
        "Property intelligence and ADU advisory for San Diego County homeowners. We reveal hidden value — ADU feasibility, garage conversions, SB9 lot splits, CalHFA grants, and ROI analysis.",
      url: "https://www.domaineco.com",
      logo: "https://www.domaineco.com/logo.png",
      image: OG_IMAGE,
      foundingDate: "2019",
      areaServed: [
        { "@type": "City", name: "San Diego", sameAs: "https://en.wikipedia.org/wiki/San_Diego" },
        { "@type": "City", name: "Chula Vista" },
        { "@type": "City", name: "Encinitas" },
        { "@type": "City", name: "Oceanside" },
        { "@type": "City", name: "Carlsbad" },
        { "@type": "City", name: "El Cajon" },
        { "@type": "City", name: "Santee" },
        { "@type": "City", name: "La Mesa" },
        { "@type": "City", name: "National City" },
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Diego",
        addressRegion: "CA",
        addressCountry: "US",
      },
      serviceType: [
        "ADU Feasibility Analysis",
        "Property ROI Modeling",
        "Garage Conversion Advisory",
        "SB9 Lot Split Analysis",
        "CalHFA Grant Identification",
        "ADU Financing Guidance",
      ],
      knowsAbout: [
        "Accessory Dwelling Units",
        "California ADU Laws",
        "SB9 Senate Bill 9",
        "CalHFA ADU Grant Program",
        "DSCR Loans",
        "Property Development",
        "Rental Income Analysis",
      ],
      sameAs: [],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.domaineco.com/#website",
      url: "https://www.domaineco.com",
      name: "Domaine Co.",
      description: "Property Intelligence & ADU Advisory — San Diego County",
      publisher: { "@id": "https://www.domaineco.com/#business" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.domaineco.com/#webpage",
      url: "https://www.domaineco.com",
      name: "ADU Feasibility & Property Intelligence — San Diego | Domaine Co.",
      isPartOf: { "@id": "https://www.domaineco.com/#website" },
      about: { "@id": "https://www.domaineco.com/#business" },
      description:
        "Discover the hidden value in your San Diego property. ADU feasibility analysis, garage conversions, SB9 lot splits, CalHFA grant identification, and ROI modeling.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.domaineco.com",
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is an ADU and can I build one in San Diego?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "An Accessory Dwelling Unit (ADU) is a secondary housing unit on your property — a detached cottage, garage conversion, or attached suite. California state law strongly favors ADU construction, and most San Diego residential lots qualify. Domaine analyzes your specific parcel to confirm feasibility.",
          },
        },
        {
          "@type": "Question",
          name: "How much does it cost to build an ADU in San Diego?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ADU construction costs in San Diego typically range from $85,000 for a garage conversion to $200,000+ for a detached studio or 1BR ADU. The CalHFA ADU Grant provides up to $40,000 in no-repayment funding to qualifying homeowners.",
          },
        },
        {
          "@type": "Question",
          name: "What is the CalHFA ADU Grant?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The California Housing Finance Agency (CalHFA) provides up to $40,000 in grant funding — no repayment required — to income-qualifying homeowners who build an ADU and agree to rent at below-market rates. San Diego County is eligible.",
          },
        },
        {
          "@type": "Question",
          name: "What is SB9 and how does it apply in San Diego?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Senate Bill 9 (SB9) allows most California single-family homeowners to split their lot and build up to 4 units without a public hearing. This is a ministerial, by-right approval — your city cannot deny it for discretionary reasons. Domaine identifies SB9 opportunities and models the income potential.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${cormorant.variable} ${dmSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://videos.pexels.com" />
        <meta name="geo.region" content="US-CA" />
        <meta name="geo.placename" content="San Diego" />
        <meta name="geo.position" content="32.7157;-117.1611" />
        <meta name="ICBM" content="32.7157, -117.1611" />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-inter), 'Inter', sans-serif",
          WebkitFontSmoothing: "antialiased",
          MozOsxFontSmoothing: "grayscale",
        } as React.CSSProperties}
      >
        {children}
      </body>
    </html>
  );
}
