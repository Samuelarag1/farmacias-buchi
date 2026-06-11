"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ShieldCheck, Truck, Clock, Star } from "lucide-react"
import { useState } from "react"

const heroSlides = [
  {
    eyebrow: "La farmacia de confianza",
    headline: "Tu salud, nuestra prioridad",
    sub: "Medicamentos, dermocosmética, vitaminas y más. Envío en el día a todo el país.",
    cta1: { label: "Comprar Ahora", href: "/catalogo" },
    cta2: { label: "Ver Promociones", href: "/catalogo?tag=Oferta" },
    accent: "Hasta 40% OFF en Dermocosmética",
    bg: "from-[#00a89e] to-[#007a72]",
  },
  {
    eyebrow: "Especial esta semana",
    headline: "2x1 en Vitaminas y Suplementos",
    sub: "Cuida tu salud y la de tu familia. Llevá el doble pagando uno en productos seleccionados.",
    cta1: { label: "Ver Ofertas 2x1", href: "/catalogo?tag=2x1" },
    cta2: { label: "Ver Catálogo", href: "/catalogo" },
    accent: "Oferta por tiempo limitado",
    bg: "from-[#007a72] to-[#005a54]",
  },
]

const trustBadges = [
  { icon: Truck, text: "Envío en 24hs" },
  { icon: ShieldCheck, text: "100% Originales" },
  { icon: Clock, text: "Atención 24/7" },
  { icon: Star, text: "4.9 en Google" },
]

export function Hero() {
  const [slide, setSlide] = useState(0)
  const current = heroSlides[slide]

  return (
    <section aria-label="Ofertas destacadas">
      {/* Main hero banner */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${current.bg}`}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="cross" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <rect x="17" y="8" width="6" height="24" fill="white" rx="1" />
                <rect x="8" y="17" width="24" height="6" fill="white" rx="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cross)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:py-14 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Logo */}
              <div className="mb-4 flex justify-center lg:justify-start">
                <LogoHero />
              </div>

              {/* Eyebrow */}
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 backdrop-blur-sm">
                <span className="size-1.5 rounded-full bg-white" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">
                  {current.eyebrow}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                {current.headline}
              </h1>
              <p className="mt-3 text-base text-white/85 sm:text-lg lg:max-w-md">
                {current.sub}
              </p>

              {/* Accent badge */}
              <div className="mt-4 inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-accent-foreground shadow-lg">
                {current.accent}
              </div>

              {/* CTAs */}
              <div className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start">
                <Link
                  href={current.cta1.href}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-primary shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
                >
                  {current.cta1.label}
                  <ArrowRight className="size-4" />
                </Link>
                <Link
                  href={current.cta2.href}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-white/50 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white"
                >
                  {current.cta2.label}
                </Link>
              </div>

              {/* Slide indicators */}
              <div className="mt-6 flex justify-center gap-2 lg:justify-start">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className={`h-2 rounded-full transition-all ${i === slide ? "w-6 bg-white" : "w-2 bg-white/40"}`}
                    aria-label={`Ir a slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Right: floating product cards */}
            <div className="relative hidden lg:flex lg:items-center lg:justify-center">
              <div className="relative h-72 w-full max-w-[400px]">
                {/* Decorative background */}
                <div className="absolute inset-6 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20" />

                {/* Card 1 — rotated top left */}
                <div className="glass-card absolute -rotate-6 left-2 top-4 w-36 rounded-2xl p-3 shadow-xl">
                  <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-secondary p-2">
                    <Image src="/products/protector-solar.png" alt="Protector Solar" width={70} height={70} className="object-contain" />
                  </div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">ISDIN</p>
                  <p className="text-xs font-semibold leading-snug text-foreground">Protector Solar FPS50</p>
                  <p className="mt-1 text-sm font-bold text-primary">$18.999</p>
                </div>

                {/* Card 2 — center */}
                <div className="glass-card absolute left-1/2 top-1/2 w-36 -translate-x-1/2 -translate-y-1/2 rounded-2xl p-3 shadow-2xl">
                  <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-secondary p-2">
                    <Image src="/products/vitaminas.png" alt="Vitaminas" width={70} height={70} className="object-contain" />
                  </div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Redoxon</p>
                  <p className="text-xs font-semibold leading-snug text-foreground">Vitamina C 1000mg</p>
                  <p className="mt-1 text-sm font-bold text-primary">$9.899</p>
                  <span className="mt-1 inline-block rounded-full bg-accent px-1.5 text-[9px] font-bold text-white">2x1</span>
                </div>

                {/* Card 3 — rotated bottom right */}
                <div className="glass-card absolute -bottom-2 right-2 rotate-6 w-36 rounded-2xl p-3 shadow-xl">
                  <div className="mb-2 flex aspect-square items-center justify-center rounded-xl bg-secondary p-2">
                    <Image src="/products/crema-facial.png" alt="Crema Facial" width={70} height={70} className="object-contain" />
                  </div>
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Neutrogena</p>
                  <p className="text-xs font-semibold leading-snug text-foreground">Crema Hidratante</p>
                  <p className="mt-1 text-sm font-bold text-primary">$14.499</p>
                  <span className="mt-1 inline-block rounded-full bg-emerald-100 px-1.5 text-[9px] font-bold text-emerald-700">-24%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges strip */}
      <div className="border-b border-border bg-white shadow-sm">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-0 divide-x divide-border sm:grid-cols-4">
          {trustBadges.map((badge) => (
            <div
              key={badge.text}
              className="flex items-center justify-center gap-2 px-4 py-3 sm:py-4"
            >
              <badge.icon className="size-5 shrink-0 text-primary" />
              <span className="text-xs font-semibold text-foreground sm:text-sm">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function LogoHero() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="flex items-center gap-2">
      {!imgError ? (
        <Image
          src="/images/logo.png"
          alt="Farmacias Buchi"
          width={180}
          height={60}
          className="h-12 w-auto object-contain brightness-0 invert"
          onError={() => setImgError(true)}
          priority
        />
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl bg-white/20">
            <svg viewBox="0 0 24 24" fill="none" className="size-6 text-white" aria-hidden="true">
              <rect x="9" y="3" width="6" height="18" fill="currentColor" rx="1.5" />
              <rect x="3" y="9" width="18" height="6" fill="currentColor" rx="1.5" />
            </svg>
          </div>
          <span className="text-2xl font-black text-white">Farmacias Buchi</span>
        </div>
      )}
    </div>
  )
}
