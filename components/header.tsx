"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Search, MapPin, User, ShoppingCart, Menu, X,
  ChevronDown, ChevronRight, Pill, Sparkles,
  Baby, Droplets, FlaskConical, Heart, Star,
  ShoppingBag, Sun, Dumbbell,
} from "lucide-react"
import { categories } from "@/lib/products"
import { useCart } from "./cart-context"
import { useState, useRef, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

/* ─── Subcategory data ─────────────────────────────────────── */
const SUBCATS: Record<string, string[]> = {
  Medicamentos:       ["Analgésicos y antifebriles", "Antiinflamatorios", "Antigripales y resfríos", "Digestivos", "Dermatológicos", "Oftalmología"],
  Dermocosmética:     ["Hidratantes faciales", "Protectores solares", "Contorno de ojos", "Sérums y ampollas", "Anti-edad", "Exfoliantes"],
  Vitaminas:          ["Vitamina C", "Complejo B", "Omega-3 y ácidos grasos", "Multivitamínicos", "Probióticos", "Zinc y minerales"],
  "Bebés":            ["Pañales", "Cremas y talcos", "Shampoo y baño", "Leche de fórmula", "Accesorios", "Ropa protectora"],
  "Higiene Personal": ["Shampoo y acondicionador", "Jabones y geles", "Desodorantes", "Higiene bucal", "Afeitado y depilación"],
  "Cuidado Personal": ["Cremas corporales", "Autobronceantes", "Aceites esenciales", "Protector labial"],
  "Adultos Mayores":  ["Suplementos", "Movilidad y bastones", "Incontinencia", "Tensiómetros"],
  Belleza:            ["Labiales y gloss", "Base y corrector", "Sombras y delineador", "Rímel", "Removedor de maquillaje"],
  Perfumería:         ["Perfumes mujer", "Perfumes hombre", "Colonias y body splash"],
}

const CAT_ICONS: Record<string, React.ElementType> = {
  Medicamentos:       Pill,
  Dermocosmética:     Sparkles,
  Vitaminas:          FlaskConical,
  "Bebés":            Baby,
  "Higiene Personal": Droplets,
  "Cuidado Personal": Heart,
  "Adultos Mayores":  User,
  Belleza:            Sun,
  Perfumería:         ShoppingBag,
  Suplementos:        Dumbbell,
}

/* ─── Logo ─────────────────────────────────────────────────── */
function Logo({ onClick }: { onClick?: () => void }) {
  const [imgError, setImgError] = useState(false)
  return (
    <Link
      href="/"
      className="flex shrink-0 items-center"
      aria-label="Farmacias Buchi — Inicio"
      onClick={onClick}
    >
      {!imgError ? (
        <Image src="/images/logo.png" alt="Farmacias Buchi" width={150} height={48}
          className="h-9 w-auto object-contain" onError={() => setImgError(true)} priority />
      ) : (
        <Image src="/images/logo.svg" alt="Farmacias Buchi" width={150} height={48}
          className="h-9 w-auto" priority unoptimized />
      )}
    </Link>
  )
}

/* ─── Mobile full-screen drawer ─────────────────────────────── */
function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const router = useRouter()
  const [search, setSearch] = useState("")
  const [openCat, setOpenCat] = useState<string | null>(null)
  const navCats = categories.filter((c) => !c.highlight)

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(search.trim())}`)
      setSearch("")
      onClose()
    }
  }

  function toggle(name: string) {
    setOpenCat((p) => (p === name ? null : name))
  }

  function handleNavLink() {
    onClose()
    setOpenCat(null)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Panel */}
      <div
        className={`fixed left-0 top-0 bottom-0 z-[70] flex w-[85vw] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border bg-white px-4 py-3 shrink-0">
          <Logo onClick={handleNavLink} />
          <button
            onClick={onClose}
            className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-all hover:bg-muted active:scale-90"
            aria-label="Cerrar menú"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-border px-4 py-3 shrink-0">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscá medicamentos, vitaminas..."
              className="w-full rounded-full border border-border bg-muted/40 py-2.5 pl-10 pr-4 text-sm outline-none transition-all focus:border-primary focus:bg-white"
              autoComplete="off"
            />
          </form>
        </div>

        {/* Location chip */}
        <div className="border-b border-border px-4 py-2 shrink-0">
          <div className="flex items-center gap-2 rounded-lg bg-secondary/60 px-3 py-2">
            <MapPin className="size-3.5 shrink-0 text-primary" />
            <p className="text-xs text-foreground">
              Entregamos en{" "}
              <span className="font-bold text-primary">Catamarca, Capital</span>
            </p>
          </div>
        </div>

        {/* Category list — scrollable */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* 2x1 highlight */}
          <Link
            href="/catalogo?tag=2x1"
            onClick={handleNavLink}
            className="flex items-center justify-between border-b border-border/50 bg-accent/5 px-5 py-4 transition-colors active:bg-accent/10"
          >
            <span className="text-sm font-bold text-accent">🏷️ Especial 2x1</span>
            <ChevronRight className="size-4 text-accent" />
          </Link>

          {navCats.map((cat) => {
            const Icon = CAT_ICONS[cat.name] ?? Star
            const subs = SUBCATS[cat.name] ?? []
            const isOpen = openCat === cat.name

            return (
              <div key={cat.name} className="border-b border-border/50">
                {/* Category row */}
                <button
                  onClick={() => (subs.length > 0 ? toggle(cat.name) : undefined)}
                  className="flex w-full items-center gap-3 px-5 py-4 text-left transition-colors active:bg-muted"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="flex-1 text-sm font-semibold text-foreground">{cat.name}</span>
                  {subs.length > 0 && (
                    <ChevronDown
                      className={`size-4 text-muted-foreground transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    />
                  )}
                </button>

                {/* Subcategory accordion */}
                <div
                  className={`overflow-hidden transition-all duration-200 ease-out ${
                    isOpen ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="bg-muted/30 pb-2 pt-1">
                    {/* Link to whole category */}
                    <Link
                      href={`/catalogo?categoria=${encodeURIComponent(cat.name)}`}
                      onClick={handleNavLink}
                      className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-primary transition-colors active:bg-muted/60"
                    >
                      Ver todo en {cat.name}
                    </Link>
                    {/* Individual subcategories */}
                    {subs.map((sub) => (
                      <Link
                        key={sub}
                        href={`/catalogo?categoria=${encodeURIComponent(cat.name)}&q=${encodeURIComponent(sub)}`}
                        onClick={handleNavLink}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm text-muted-foreground transition-colors active:bg-muted/60"
                      >
                        <span className="size-1 shrink-0 rounded-full bg-muted-foreground/40" />
                        {sub}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Drawer footer */}
        <div className="shrink-0 border-t border-border bg-white px-4 py-3">
          <Link
            href="/usuario"
            onClick={handleNavLink}
            className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-muted active:bg-muted"
          >
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10">
              <User className="size-5 text-primary" />
            </span>
            <div>
              <p className="text-sm font-bold text-foreground">Mi cuenta</p>
              <p className="text-xs text-muted-foreground">Pedidos, direcciones y perfil</p>
            </div>
            <ChevronRight className="ml-auto size-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </>
  )
}

/* ─── Header ─────────────────────────────────────────────────── */
export function Header() {
  const { count, openCheckout } = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const [badgePop, setBadgePop] = useState(false)
  const prevCount = useRef(count)

  useEffect(() => { setDrawerOpen(false) }, [pathname])

  useEffect(() => {
    if (count > prevCount.current) {
      setBadgePop(true)
      const t = setTimeout(() => setBadgePop(false), 350)
      return () => clearTimeout(t)
    }
    prevCount.current = count
  }, [count])

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [drawerOpen])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/catalogo?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const navCategories = categories.filter((c) => !c.highlight)

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Promo bar */}
        <div className="bg-primary px-4 py-1.5 text-center text-primary-foreground">
          <p className="text-[11px] font-semibold sm:text-sm">
            🚚 Envíos en el día en Catamarca Capital · 6 cuotas sin interés con Mercado Pago
          </p>
        </div>

        {/* Main bar */}
        <div className="border-b border-border bg-white/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 lg:gap-6">

            {/* Mobile: hamburger */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/40 transition-all active:scale-90 hover:bg-muted lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="size-5" />
            </button>

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

            {/* Actions */}
            <div className="ml-auto flex items-center gap-1 sm:gap-2">
              <button className="hidden items-center gap-2 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-muted lg:flex">
                <MapPin className="size-4 shrink-0 text-primary" />
                <span className="text-xs leading-tight">
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
                <span className="hidden text-sm font-medium lg:inline">Mi cuenta</span>
              </Link>

              {/* Cart — hidden on mobile (bottom nav handles it) */}
              <button
                onClick={openCheckout}
                className="hidden items-center gap-1.5 rounded-xl px-2.5 py-2 text-sm font-semibold transition-all hover:bg-muted active:scale-95 md:flex"
                aria-label={`Abrir carrito, ${count} productos`}
              >
                <span className="relative">
                  <ShoppingCart className="size-6 text-primary" />
                  {count > 0 && (
                    <span className={`absolute -right-2 -top-2 flex min-w-5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-5 text-white shadow-sm ${badgePop ? "badge-pop" : ""}`}>
                      {count > 99 ? "99+" : count}
                    </span>
                  )}
                </span>
                <span className="hidden lg:inline">Carrito</span>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop category nav */}
        <nav className="hidden border-b border-border bg-white shadow-sm lg:block" aria-label="Categorías">
          <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4">
            <li>
              <Link href="/catalogo?tag=2x1" className="flex h-11 items-center gap-1.5 px-3 text-sm font-bold text-accent transition-colors hover:bg-accent/5">
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
              <Link href="/catalogo" className="flex h-11 items-center gap-1 px-3 text-sm font-semibold text-primary">
                Ver todo <ChevronDown className="size-3.5" />
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* Full-screen mobile drawer — rendered outside <header> to avoid z-index issues */}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
