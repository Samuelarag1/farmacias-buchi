"use client"

import { useState, useMemo, useEffect } from "react"
import { products, categories } from "@/lib/products"
import { ProductCard, ProductCardSkeleton } from "@/components/product-card"
import { X, SlidersHorizontal, Search } from "lucide-react"
import Link from "next/link"

const allBrands = [...new Set(products.map((p) => p.brand))].sort()
const allCategories = categories.filter((c) => !c.highlight).map((c) => c.name)

const priceRanges = [
  { label: "Hasta $5.000", max: 5000 },
  { label: "$5.000 – $15.000", min: 5000, max: 15000 },
  { label: "$15.000 – $30.000", min: 15000, max: 30000 },
  { label: "Más de $30.000", min: 30000 },
]

type SortOption = "relevance" | "price-asc" | "price-desc" | "discount"

function FilterCheckbox({
  checked,
  onChange,
  label,
  count,
}: {
  checked: boolean
  onChange: () => void
  label: string
  count?: number
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="size-4 accent-primary rounded"
        />
        <span className={checked ? "font-semibold text-primary" : "text-foreground"}>
          {label}
        </span>
      </div>
      {count !== undefined && (
        <span className="text-xs text-muted-foreground">({count})</span>
      )}
    </label>
  )
}

function FilterPanel({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  priceRange,
  setPriceRange,
  onlyOffers,
  setOnlyOffers,
  onClear,
  activeCount,
}: {
  selectedCategories: string[]
  setSelectedCategories: (v: string[]) => void
  selectedBrands: string[]
  setSelectedBrands: (v: string[]) => void
  priceRange: number | null
  setPriceRange: (v: number | null) => void
  onlyOffers: boolean
  setOnlyOffers: (v: boolean) => void
  onClear: () => void
  activeCount: number
}) {
  function toggleCategory(cat: string) {
    setSelectedCategories(
      selectedCategories.includes(cat)
        ? selectedCategories.filter((c) => c !== cat)
        : [...selectedCategories, cat],
    )
  }

  function toggleBrand(brand: string) {
    setSelectedBrands(
      selectedBrands.includes(brand)
        ? selectedBrands.filter((b) => b !== brand)
        : [...selectedBrands, brand],
    )
  }

  return (
    <div className="space-y-5">
      {activeCount > 0 && (
        <button
          onClick={onClear}
          className="flex w-full items-center justify-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/5 py-2 text-xs font-semibold text-destructive transition-colors hover:bg-destructive/10"
        >
          <X className="size-3.5" /> Limpiar filtros ({activeCount})
        </button>
      )}

      {/* Ofertas */}
      <div>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-3 transition-colors hover:bg-accent/10">
          <input
            type="checkbox"
            checked={onlyOffers}
            onChange={() => setOnlyOffers(!onlyOffers)}
            className="size-4 accent-primary"
          />
          <span className="text-sm font-bold text-accent">Solo ofertas y descuentos</span>
        </label>
      </div>

      {/* Categories */}
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Categorías
        </h3>
        <div className="space-y-0.5">
          {allCategories.map((cat) => {
            const count = products.filter((p) => p.category === cat).length
            return (
              <FilterCheckbox
                key={cat}
                checked={selectedCategories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                label={cat}
                count={count}
              />
            )
          })}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Marcas
        </h3>
        <div className="max-h-52 space-y-0.5 overflow-y-auto">
          {allBrands.map((brand) => {
            const count = products.filter((p) => p.brand === brand).length
            return (
              <FilterCheckbox
                key={brand}
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                label={brand}
                count={count}
              />
            )
          })}
        </div>
      </div>

      {/* Price range */}
      <div>
        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          Rango de precio
        </h3>
        <div className="space-y-1">
          {priceRanges.map((range, i) => (
            <label
              key={i}
              className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-muted"
            >
              <input
                type="radio"
                name="price-range"
                checked={priceRange === i}
                onChange={() => setPriceRange(priceRange === i ? null : i)}
                className="size-4 accent-primary"
              />
              <span className={priceRange === i ? "font-semibold text-primary" : "text-foreground"}>
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CatalogoPage() {
  const [search, setSearch] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<number | null>(null)
  const [onlyOffers, setOnlyOffers] = useState(false)
  const [sortBy, setSortBy] = useState<SortOption>("relevance")
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const q = params.get("q")
    const categoria = params.get("categoria")
    const tag = params.get("tag")

    if (q) setSearch(q)
    if (categoria) setSelectedCategories([categoria])
    if (tag === "2x1" || tag === "Oferta" || tag === "Nuevo") {
      // handled via filtering in useMemo
      setSearch(tag === "2x1" ? "" : "")
    }

    const timer = setTimeout(() => setLoading(false), 600)
    return () => clearTimeout(timer)
  }, [])

  const tagParam =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tag") || ""
      : ""

  const filtered = useMemo(() => {
    let result = [...products]

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      )
    }

    if (tagParam) {
      result = result.filter((p) => p.tag === tagParam)
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand))
    }

    if (priceRange !== null) {
      const range = priceRanges[priceRange]
      result = result.filter(
        (p) =>
          (range.min === undefined || p.price >= range.min) &&
          (range.max === undefined || p.price <= range.max),
      )
    }

    if (onlyOffers) {
      result = result.filter((p) => p.discount && p.discount > 0)
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
    }

    return result
  }, [search, selectedCategories, selectedBrands, priceRange, onlyOffers, sortBy, tagParam])

  const activeFiltersCount =
    selectedCategories.length +
    selectedBrands.length +
    (priceRange !== null ? 1 : 0) +
    (onlyOffers ? 1 : 0)

  function clearFilters() {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange(null)
    setOnlyOffers(false)
    setSearch("")
  }

  const breadcrumbLabel = selectedCategories.length === 1 ? selectedCategories[0] : "Todos los productos"

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Breadcrumb + heading */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <nav className="mb-1 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <span>/</span>
            <span className="font-medium text-foreground">{breadcrumbLabel}</span>
          </nav>
          <div className="flex items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-foreground">
                {selectedCategories.length === 1 ? selectedCategories[0] : "Nuestros productos"}
              </h1>
              {!loading && (
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {filtered.length} resultado{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <aside
            className="hidden w-60 shrink-0 lg:block"
            aria-label="Filtros de búsqueda"
          >
            <div className="sticky top-32 rounded-2xl border border-border bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-bold text-foreground">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              <FilterPanel
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                onlyOffers={onlyOffers}
                setOnlyOffers={setOnlyOffers}
                onClear={clearFilters}
                activeCount={activeFiltersCount}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search + sort bar */}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <div className="relative flex-1">
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar en el catálogo..."
                  className="w-full rounded-full border border-border bg-white py-2.5 pl-4 pr-10 text-sm outline-none focus:border-primary focus:shadow-sm"
                  aria-label="Buscar productos"
                />
                <Search className="absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Mobile filter button */}
              <button
                onClick={() => setFilterDrawerOpen(true)}
                className="flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2.5 text-sm font-semibold lg:hidden"
              >
                <SlidersHorizontal className="size-4" />
                Filtrar
                {activeFiltersCount > 0 && (
                  <span className="rounded-full bg-primary px-1.5 text-xs font-bold text-white">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-border bg-white px-4 py-2.5 text-sm font-medium outline-none focus:border-primary"
                aria-label="Ordenar resultados"
              >
                <option value="relevance">Relevancia</option>
                <option value="price-asc">Menor precio</option>
                <option value="price-desc">Mayor precio</option>
                <option value="discount">Mayor descuento</option>
              </select>
            </div>

            {/* Active filter chips */}
            {activeFiltersCount > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedCategories.map((cat) => (
                  <span
                    key={cat}
                    className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
                  >
                    {cat}
                    <button
                      onClick={() =>
                        setSelectedCategories(selectedCategories.filter((c) => c !== cat))
                      }
                      aria-label={`Quitar filtro ${cat}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground"
                  >
                    {brand}
                    <button
                      onClick={() =>
                        setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                      }
                      aria-label={`Quitar filtro ${brand}`}
                    >
                      <X className="size-3" />
                    </button>
                  </span>
                ))}
                {onlyOffers && (
                  <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    Solo ofertas
                    <button onClick={() => setOnlyOffers(false)} aria-label="Quitar filtro ofertas">
                      <X className="size-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            {/* Product grid */}
            {loading ? (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-20 text-center">
                <div className="text-5xl" aria-hidden="true">🔍</div>
                <h3 className="mt-4 text-lg font-bold text-foreground">
                  No encontramos resultados
                </h3>
                <p className="mt-2 max-w-xs text-sm text-muted-foreground">
                  Probá con otros términos de búsqueda o eliminá algunos filtros.
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-90 lg:hidden">
          <button
            className="absolute inset-0 bg-black/50"
            onClick={() => setFilterDrawerOpen(false)}
            aria-label="Cerrar filtros"
          />
          <aside className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Filtros</h2>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="flex size-9 items-center justify-center rounded-full bg-muted"
              >
                <X className="size-5" />
              </button>
            </div>
            <FilterPanel
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              onlyOffers={onlyOffers}
              setOnlyOffers={setOnlyOffers}
              onClear={clearFilters}
              activeCount={activeFiltersCount}
            />
            <button
              onClick={() => setFilterDrawerOpen(false)}
              className="btn-primary-gradient mt-6 w-full rounded-full py-3.5 text-sm font-bold text-white"
            >
              Ver {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
            </button>
          </aside>
        </div>
      )}
    </div>
  )
}
