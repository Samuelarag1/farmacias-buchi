"use client"

import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, User, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react"
import { categories } from "@/lib/products"
import { useCart } from "./cart-context"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"

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
          className="h-11 w-auto object-contain"
          onError={() => setImgError(true)}
          priority
        />
      ) : (
        <Image
          src="/images/logo.svg"
          alt="Farmacias Buchi"
          width={160}
          height={52}
          className="h-11 w-auto"
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
  const [badgePop, setBadgePop] = useState(false)
  const prevCount = useRef(count)

  useEffect(() => {
    if (count > prevCount.current) {
      setBadgePop(true)
      const t = setTimeout(() => setBadgePop(false), 350)
      return () => clearTimeout(t)
    }
    prevCount.current = count
  }, [count])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const navCategories = categories.filter((c) => !c.highlight)

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo bar */}
      <div className="bg-primary px-4 py-2 text-center text-primary-foreground">
        <p className="text-xs font-semibold sm:text-sm">
          🚚 Envíos en el día · Hasta 6 cuotas sin interés con Mercado Pago · ✓ Productos 100% originales
        </p>
      </div>

      {/* Main header */}
      <div className="border-b border-border bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">
          {/* Mobile menu button */}
          <button
            className="flex size-9 items-center justify-center rounded-lg hover:bg-muted lg:hidden"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>

          {/* Logo */}
          <Logo />

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="relative hidden flex-1 md:block"
          >
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
              className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-md"
            >
              <Search className="size-4" />
            </button>
          </form>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-1 sm:gap-3">
            <button className="hidden items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors hover:bg-muted lg:flex">
              <MapPin className="size-5 text-primary" />
              <span className="text-xs leading-tight text-foreground">
                Elegí entrega
                <br />
                <span className="font-semibold">Buenos Aires</span>
              </span>
            </button>

            <Link
              href="/usuario"
              className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted sm:flex"
              aria-label="Mi cuenta"
            >
              <User className="size-5 text-foreground/70" />
              <span className="hidden text-foreground lg:inline">Mi cuenta</span>
            </Link>

            <button
              className="hidden items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted sm:flex"
              aria-label="Favoritos"
            >
              <Heart className="size-5 text-foreground/70" />
              <span className="hidden text-foreground lg:inline">Favoritos</span>
            </button>

            <button
              className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold transition-colors hover:bg-muted"
              onClick={openCheckout}
              aria-label={`Abrir carrito, ${count} productos`}
            >
              <span className="relative">
                <ShoppingCart className="size-6 text-primary" />
                {count > 0 && (
                  <span
                    className={`absolute -right-2 -top-2 flex min-w-[20px] items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-5 text-accent-foreground ${badgePop ? "badge-pop" : ""}`}
                  >
                    {count > 99 ? "99+" : count}
                  </span>
                )}
              </span>
              <span className="hidden text-foreground lg:inline">Carrito</span>
            </button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="px-4 pb-3 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscá productos, marcas..."
              className="w-full rounded-full border border-border bg-muted/50 py-2.5 pl-5 pr-12 text-sm outline-none focus:border-primary focus:bg-white"
              aria-label="Buscar productos"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-1.5 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground"
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
              className="flex h-11 items-center gap-1 rounded-sm px-3 text-sm font-bold text-accent transition-colors hover:bg-accent/5"
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
              className="flex h-11 items-center gap-1 px-3 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
            >
              Ver todo <ChevronDown className="size-3.5" />
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-[calc(var(--header-h,120px))] z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile category drawer */}
      {mobileOpen && (
        <nav
          className="absolute left-0 right-0 z-50 border-b border-border bg-white shadow-xl lg:hidden"
          aria-label="Menú de categorías"
        >
          <div className="mx-auto max-w-7xl px-4 py-3">
            <Link
              href="/catalogo?tag=2x1"
              className="block rounded-xl bg-accent/10 px-4 py-3 text-sm font-bold text-accent"
              onClick={() => setMobileOpen(false)}
            >
              🏷️ Especial 2x1
            </Link>
            <div className="mt-2 grid grid-cols-2 gap-1">
              {navCategories.map((cat) => (
                <Link
                  key={cat.name}
                  href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                  onClick={() => setMobileOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex gap-3 border-t border-border pt-3">
              <Link
                href="/usuario"
                className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <User className="size-4 text-primary" /> Mi cuenta
              </Link>
              <button className="flex flex-1 items-center gap-2 rounded-xl bg-muted px-4 py-2.5 text-sm font-medium">
                <Heart className="size-4 text-primary" /> Favoritos
              </button>
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
