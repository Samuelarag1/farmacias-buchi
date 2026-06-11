import Link from "next/link"
import { products, type Product } from "@/lib/products"
import { ProductCard } from "./product-card"
import { ArrowRight } from "lucide-react"

interface ProductSectionProps {
  title: string
  subtitle?: string
  filterTag?: Product["tag"]
  filterCategory?: string
  limit?: number
  viewAllHref?: string
}

export function ProductSection({
  title,
  subtitle,
  filterTag,
  filterCategory,
  limit = 8,
  viewAllHref,
}: ProductSectionProps) {
  let filtered = [...products]

  if (filterTag) {
    filtered = filtered.filter((p) => p.tag === filterTag)
  }
  if (filterCategory) {
    filtered = filtered.filter((p) => p.category === filterCategory)
  }

  const displayed = filtered.slice(0, limit)

  if (displayed.length === 0) return null

  const href =
    viewAllHref ||
    (filterTag
      ? `/catalogo?tag=${filterTag}`
      : filterCategory
      ? `/catalogo?categoria=${encodeURIComponent(filterCategory)}`
      : "/catalogo")

  return (
    <section className="mx-auto max-w-7xl px-4 py-6" aria-label={title}>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-foreground sm:text-2xl">{title}</h2>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        <Link
          href={href}
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
        >
          Ver todo <ArrowRight className="size-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {displayed.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
