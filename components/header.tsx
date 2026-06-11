"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, User, ShoppingCart, Menu, X, ChevronDown, ChevronRight } from "lucide-react"
import { categories } from "@/lib/products"
import { useCart } from "./cart-context"
import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

function Logo() {
  const [imgError, setImgError] = useState(false)

  return (
    <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Farmacias Buchi - Ir al inicio">
      {!imgError ? (
        <Image
          src="/images/logo.png"
          alt="Farmacias Buchi"
          width={160}
          height={52}
          className="h-10 w-auto object-contain"
          onError={() => setImgError(true)}
          priority
        />
      ) : (
        <Image
          src="/images/logo.svg"
          alt="Farmacias Buchi"
          width={160}
          height={52}
          className="h-10 w-auto"
          priority
          unoptimized
        />
      )}
    </Link>
  )
}

export function Header() {
  const { count, openCheckout } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const [badgePop, setBadgePop] = useState(false)
  const prevCount = useRef(count)

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (count > prevCount.current) {
      setBadgePop(true)
      const t = setTimeout(() => setBadgePop(false), 350)
      return () => clearTimeout(t)
    }
    prevCount.current = count
  }, [count])

  // Lock body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setMobileOpen(false)
    }
  }

  const navCategories = categories.filter((c) => !c.highlight)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo bar */}
      <div className="bg-primary px-4 py-1.5 text-center text-primary-foreground">
        <p className="text-[11px] font-semibold sm:text-sm">
          🚚 Envíos en el día en Catamarca Capital · 6 cuotas sin interés con Mercado Pago
        </p>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">

          {/* Mobile: hamburger */}
          <button
            className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/50 transition-all active:scale-95 hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span className={`transition-all duration-200 ${mobileOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"}`}>
              <Menu className="size-5" />
            </span>
            <span className={`transition-all duration-200 ${mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"}`}>
              <X className="size-5" />
            </span>
          </button>

          {/* Logo */}
          <Logo />

          {/* Desktop search */}
          <form onSubmit={handleSearch} className="relative hidden flex-1 md:block">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscá medicamentos, marcas, categorías..."
              className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-5 pr-14 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:bg-white focus:shadow-sm"
              aria-label="Buscar productos"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md active:scale-95"
            >
              <Search className="size-4" />
            </button>
          </form>

          {/* Desktop actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button className="hidden items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-muted lg:flex">
              <MapPin className="size-4 shrink-0 text-primary" />
              <span className="text-xs leading-tight text-foreground">
                Entregamos en
                <br />
                <span className="font-bold text-primary">Catamarca, Capital</span>
              </span>
            </button>

            <Link
              href="/usuario"
              className="hidden items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm transition-colors hover:bg-muted sm:flex"
              aria-label="Mi cuenta"
            >
              <User className="size-5 text-foreground/60" />
              <span className="hidden text-sm font-medium text-foreground lg:inline">Mi cuenta</span>
            </Link>

            <button
              className="flex items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold transition-all hover:bg-muted active:scale-95"
              onClick={openCheckout}
              aria-label={`Abrir carrito, ${count} productos`}
            >
              <span className="relative">
                <ShoppingCart className="size-6 text-primary" />
                {count > 0 && (
                  <span
                    className={`absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-5 text-accent-foreground shadow-sm ${badgePop ? "badge-pop" : ""}`}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </span>
              <span className="hidden text-foreground lg:inline">Carrito</span>
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="px-4 pb-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscá medicamentos, vitaminas..."
              className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-5 pr-12 text-sm outline-none transition-all focus:border-primary focus:bg-white"
              aria-label="Buscar productos"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground active:scale-90"
            >
              <Search className="size-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Desktop category nav */}
      <nav
        className="hidden border-b border-border bg-white shadow-sm lg:block"
        aria-label="Navegación por categorías"
      >
        <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4">
          <li>
            <Link
              href="/catalogo?tag=2x1"
              className="flex h-11 items-center gap-1.5 rounded-sm px-3 text-sm font-bold text-accent transition-colors hover:bg-accent/5"
            >
              🏷️ Especial 2x1
            </Link>
          </li>
          {navCategories.slice(0, 8).map((cat) => (
            <li key={cat.name}>
              <Link
                href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                className="flex h-11 items-center px-3 text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {cat.name}
              </Link>
            </li>
          ))}
          <li className="ml-auto">
            <Link
              href="/catalogo"
              className="flex h-11 items-center gap-1 px-3 text-sm font-semibold text-primary"
            >
              Ver todo <ChevronDown className="size-3.5" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 top-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          style={{ top: "var(--header-h, 110px)" }}
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile category drawer — slides down from header */}
      <div
        className={`absolute left-0 right-0 z-50 lg:hidden transition-all duration-250 ease-out origin-top ${
          mobileOpen
            ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-y-95 -translate-y-2 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <nav className="border-b border-border bg-white shadow-2xl" aria-label="Menú de categorías">
          <div className="mx-auto max-w-7xl px-4 py-3">

            {/* Location badge */}
            <div className="mb-3 flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2">
              <MapPin className="size-4 shrink-0 text-primary" />
              <div className="flex-1 text-xs">
                <span className="text-muted-foreground">Entregando en </span>
                <span className="font-bold text-primary">Catamarca, Capital</span>
              </div>
            </div>

            {/* 2x1 highlight */}
            <Link
              href="/catalogo?tag=2x1"
              onClick={() => setMobileOpen(false)}
              className="mb-2 flex items-center justify-between rounded-xl bg-accent/10 px-4 py-3 transition-colors active:bg-accent/20"
            >
              <span className="text-sm font-bold text-accent">🏷️ Especial 2x1</span>
              <ChevronRight className="size-4 text-accent" />
            </Link>

            {/* Category grid */}
            <div className="grid grid-cols-2 gap-1.5">
              {navCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted active:bg-muted"
                >
                  {cat.name}
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>

            {/* Bottom actions */}
            <div className="mt-3 flex gap-2 border-t border-border pt-3">
              <Link
                href="/usuario"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-muted py-3 text-sm font-semibold text-foreground transition-colors active:bg-border"
              >
                <User className="size-4 text-primary" /> Mi cuenta
              </Link>
              <Link
                href="/catalogo"
                onClick={() => setMobileOpen(false)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-bold text-white transition-colors active:bg-primary/90"
              >
                Ver catálogo completo
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
