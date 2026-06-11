import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-context"
import { ToastProvider } from "@/components/toast"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutDrawer } from "@/components/checkout-drawer"

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] })

const SITE_URL = "https://farmaciasbuchi.com"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Farmacias Buchi | Farmacia Online",
    template: "%s | Farmacias Buchi",
  },
  description:
    "Comprá medicamentos, dermocosmética, vitaminas, productos para bebés e higiene personal en Farmacias Buchi. Atención profesional y envíos rápidos.",
  keywords: [
    "farmacia online",
    "medicamentos",
    "dermocosmética",
    "vitaminas",
    "cuidado personal",
    "farmacia argentina",
    "Farmacias Buchi",
    "higiene personal",
    "bebés",
    "adultos mayores",
    "protector solar",
    "suplementos",
  ],
  authors: [{ name: "Farmacias Buchi" }],
  creator: "Farmacias Buchi",
  publisher: "Farmacias Buchi",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Farmacias Buchi",
    title: "Farmacias Buchi | Farmacia Online",
    description:
      "Comprá medicamentos, dermocosmética, vitaminas, productos para bebés e higiene personal en Farmacias Buchi. Atención profesional y envíos rápidos.",
    images: [
      {
        url: "/images/logo.svg",
        width: 1200,
        height: 630,
        alt: "Farmacias Buchi — Tu farmacia de confianza, ahora también online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Farmacias Buchi | Farmacia Online",
    description:
      "Comprá medicamentos, dermocosmética, vitaminas, productos para bebés e higiene personal en Farmacias Buchi.",
    images: ["/images/logo.svg"],
    creator: "@farmaciasbuchi",
    site: "@farmaciasbuchi",
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
  other: {
    "theme-color": "#00a89e",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Farmacias Buchi",
      description: "Tu farmacia de confianza, ahora también online.",
      inLanguage: "es-AR",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/catalogo?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Pharmacy",
      "@id": `${SITE_URL}/#organization`,
      name: "Farmacias Buchi",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo.svg`,
      description:
        "Farmacia online argentina con más de 300 sucursales. Medicamentos, dermocosmética, vitaminas y más con atención profesional y envíos rápidos.",
      telephone: "+54-11-0000-0000",
      priceRange: "$$",
      currenciesAccepted: "ARS",
      paymentAccepted: "Credit Card, Debit Card, Mercado Pago",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Av. Corrientes 1234",
        addressLocality: "Buenos Aires",
        addressRegion: "Ciudad Autónoma de Buenos Aires",
        addressCountry: "AR",
      },
      sameAs: [
        "https://www.instagram.com/farmaciasbuchi",
        "https://www.facebook.com/farmaciasbuchi",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Farmacia Online — Productos de salud y bienestar",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Medicamentos" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Dermocosmética" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Vitaminas y Suplementos" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Productos para Bebés" } },
          { "@type": "Offer", itemOffered: { "@type": "Product", name: "Higiene Personal" } },
        ],
      },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: "Farmacias Buchi | Farmacia Online",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      description:
        "Comprá medicamentos, dermocosmética, vitaminas, productos para bebés e higiene personal en Farmacias Buchi.",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
        ],
      },
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={geistSans.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={SITE_URL} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-background">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[999] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        >
          Saltar al contenido principal
        </a>
        <CartProvider>
          <ToastProvider>
            <Header />
            <CheckoutDrawer />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  )
}
