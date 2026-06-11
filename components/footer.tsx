"use client"

import Link from "next/link"
import { Send } from "lucide-react"

const columns = [
  {
    title: "Atención al cliente",
    links: [
      { label: "Contacto", href: "#" },
      { label: "Preguntas frecuentes", href: "#" },
      { label: "Cómo comprar", href: "#" },
      { label: "Medios de pago", href: "#" },
      { label: "Envíos y entregas", href: "#" },
    ],
  },
  {
    title: "Farmacias Buchi",
    links: [
      { label: "Quiénes somos", href: "#" },
      { label: "Sucursales", href: "#" },
      { label: "Trabajá con nosotros", href: "#" },
      { label: "Prensa", href: "#" },
      { label: "Blog de salud", href: "#" },
    ],
  },
  {
    title: "Mi cuenta",
    links: [
      { label: "Ingresar", href: "/usuario" },
      { label: "Mis pedidos", href: "/usuario" },
      { label: "Mis favoritos", href: "#" },
      { label: "Mis datos", href: "/usuario" },
      { label: "Recetas médicas", href: "#" },
    ],
  },
  {
    title: "Legales",
    links: [
      { label: "Términos y condiciones", href: "#" },
      { label: "Política de privacidad", href: "#" },
      { label: "Defensa del consumidor", href: "#" },
      { label: "Arrepentimiento de compra", href: "#" },
    ],
  },
]

const socialLinks = [
  {
    label: "Instagram",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4.5" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.8 9.2.8 11.5v2.1c0 2.2.2 4.4.2 4.4s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.1 12 22.1 12 22.1s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.2-2.2.2-4.4v-2.1C23.2 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
]

const paymentMethods = [
  "Mercado Pago",
  "Visa",
  "Mastercard",
  "American Express",
  "Naranja X",
]

function FooterLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex size-9 items-center justify-center rounded-xl bg-primary">
        <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white" aria-hidden="true">
          <rect x="9" y="3" width="6" height="18" fill="currentColor" rx="1.5" />
          <rect x="3" y="9" width="18" height="6" fill="currentColor" rx="1.5" />
        </svg>
      </div>
      <div>
        <p className="text-base font-black text-primary leading-none">Farmacias</p>
        <p className="text-xl font-black text-foreground leading-none">Buchi</p>
      </div>
    </div>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-white" aria-label="Pie de página">
      {/* Newsletter */}
      <div className="bg-gradient-to-r from-primary to-[#007a72]">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 px-4 py-10 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <p className="text-xl font-black text-white">Suscribite y recibí beneficios exclusivos</p>
            <p className="mt-1 text-sm text-white/80">
              Ofertas anticipadas, descuentos y novedades en salud y bienestar.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              className="flex-1 rounded-full bg-white/20 px-5 py-3 text-sm text-white placeholder:text-white/60 outline-none border border-white/30 focus:border-white focus:bg-white/25 transition-colors"
              aria-label="Email para newsletter"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-bold text-white transition-all hover:bg-accent/90 hover:shadow-lg"
            >
              <Send className="size-4" />
              <span className="hidden sm:inline">Suscribirme</span>
            </button>
          </form>
        </div>
      </div>

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <FooterLogo />
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Tu farmacia de confianza, ahora también online. Atención profesional y productos de calidad para toda la familia.
            </p>
            <div className="mt-5 flex gap-2">
              {socialLinks.map(({ svg, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-white"
                >
                  {svg}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-sm font-bold text-foreground">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} Farmacias Buchi. MVP demostrativo. Todos los derechos reservados.
          </p>

          {/* Payment methods */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground">Aceptamos:</span>
            {paymentMethods.map((method) => (
              <span
                key={method}
                className="rounded-md border border-border bg-white px-2 py-1 text-[10px] font-semibold text-foreground"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
