import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://nuvdev.vercel.app";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "NuvDev",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/NuvDev.png`,
        width: 500,
        height: 500,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+55-11-93248-2402",
        contactType: "customer service",
        availableLanguage: "Portuguese",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "NuvDev — Modernização de Sistemas Legados",
      image: `${BASE_URL}/NuvDev.png`,
      url: BASE_URL,
      telephone: "+55-11-93248-2402",
      email: "aquasferium@gmail.com",
      description:
        "Software house especializada em modernização de sistemas legados para indústrias, logística e comércio em Cotia e região.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cotia",
        addressRegion: "SP",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -23.6027,
        longitude: -46.9191,
      },
      areaServed: [
        "Cotia",
        "Granja Viana",
        "Itapevi",
        "Osasco",
        "Barueri",
        "São Paulo",
      ],
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "NuvDev",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "pt-BR",
    },
    {
      "@type": "Service",
      "@id": `${BASE_URL}/#service`,
      name: "Modernização de Sistemas Legados",
      provider: { "@id": `${BASE_URL}/#organization` },
      serviceType: "Software Development",
      areaServed: "Cotia, SP, Brasil",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços NuvDev",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Modernização Incremental" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Dashboards de Indicadores" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Automação de Processos" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Chatbots de Vendas" } },
        ],
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "NuvDev | Modernização de Sistemas Legados — Cotia e Região",
    template: "%s | NuvDev",
  },
  description:
    "Transforme seu software antigo em uma plataforma moderna, na nuvem e mobile. Especialistas em modernização incremental para indústrias, logística e comércio em Cotia e região.",
  keywords: [
    "modernização de sistemas",
    "software Cotia",
    "desenvolvimento de software Cotia SP",
    "modernização ERP",
    "sistema legado nuvem",
    "dashboard mobile empresa",
    "automação de processos",
    "chatbot WhatsApp vendas",
    "software house Cotia",
    "software house Granja Viana",
    "desenvolvimento web Cotia",
    "migração sistema legado",
    "integração WhatsApp Business",
    "landing page",
    "NuvDev",
  ],
  authors: [{ name: "NuvDev", url: BASE_URL }],
  creator: "NuvDev",
  category: "Software Development",
  alternates: {
    canonical: BASE_URL,
    languages: { "pt-BR": BASE_URL },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "NuvDev — Modernização de Sistemas Legados",
    description:
      "Modernizamos sistemas legados sem jogar nada fora. Dashboards, automação e nuvem para sua empresa em Cotia e região.",
    url: BASE_URL,
    siteName: "NuvDev",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/NuvDev.png",
        width: 500,
        height: 500,
        alt: "NuvDev — Modernização de Sistemas Legados",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "NuvDev — Modernização de Sistemas Legados",
    description:
      "Transforme seu software antigo em plataforma moderna. Dashboards, automação e nuvem para sua empresa.",
    images: ["/NuvDev.png"],
  },
  icons: {
    icon: "/NuvDev.png",
    shortcut: "/NuvDev.png",
    apple: "/NuvDev.png",
  },
  verification: {
    // google: "cole-aqui-o-codigo-do-google-search-console",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}