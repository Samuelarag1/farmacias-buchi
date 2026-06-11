"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Check, Eye } from "lucide-react"
import { type Product, formatPrice } from "@/lib/products"
import { useCart } from "./cart-context"
import { useToast } from "./toast"
import { useState } from "react"

const tagConfig: Record<string, { label: string; className: string }> = {
  "2x1": { label: "2x1", className: "bg-accent text-accent-foreground" },
  Oferta: { label: "Oferta", className: "bg-accent text-accent-foreground" },
  Nuevo: { label: "Nuevo", className: "bg-primary text-primary-foreground" },
}

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const { toast } = useToast()
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault()
    addItem(product)
    setAdded(true)
    toast(`${product.name} agregado al carrito`, "success")
    setTimeout(() => setAdded(false), 1800)
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault()
    setWishlist((v) => !v)
    toast(wishlist ? "Eliminado de favoritos" : "Guardado en favoritos", "info")
  }

  const tag = product.tag ? tagConfig[product.tag] : null

  return (
    <Link
      href={`/producto/${product.id}`}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all duration-200 hover:border-primary/20 hover:shadow-xl hover:-translate-y-1"
      aria-label={`Ver ${product.name} de ${product.brand}`}
    >
      {/* Image area */}
      <div className="relative overflow-hidden bg-secondary/40 px-4 pt-4 pb-2">
        {/* Tag badge */}
        {tag && (
          <span
            className={`absolute left-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${tag.className}`}
          >
            {tag.label}
          </span>
        )}

        {/* Discount badge */}
        {product.discount && !product.tag && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-accent px-2.5 py-1 text-[10px] font-bold text-accent-foreground">
            -{product.discount}%
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={handleWishlist}
          className={`absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full transition-all ${
            wishlist
              ? "bg-rose-50 text-rose-500 shadow-sm"
              : "bg-white/70 text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-rose-50 hover:text-rose-500"
          }`}
          aria-label={wishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          <Heart className={`size-4 transition-transform ${wishlist ? "fill-rose-500 scale-110" : ""}`} />
        </button>

        {/* Quick view button */}
        <Link
          href={`/producto/${product.id}`}
          className="absolute right-3 bottom-3 z-10 flex size-8 items-center justify-center rounded-full bg-white/70 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 hover:bg-primary hover:text-white"
          aria-label="Vista rápida"
          onClick={(e) => e.stopPropagation()}
        >
          <Eye className="size-4" />
        </Link>

        {/* Product image */}
        <div className="flex aspect-square items-center justify-center p-2">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={`${product.name} - ${product.brand}`}
            width={200}
            height={200}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1 p-3 pt-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {product.brand}
        </span>
        <p className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-foreground">
          {product.name}
        </p>

        {/* Price */}
        <div className="mt-auto pt-2">
          {product.oldPrice && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
              {product.discount && (
                <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[10px] font-bold text-accent">
                  -{product.discount}%
                </span>
              )}
            </div>
          )}
          <p className="text-lg font-black text-foreground">{formatPrice(product.price)}</p>

          {/* Stock indicator */}
          {product.stock !== undefined && product.stock <= 5 && (
            <p className="text-[10px] font-medium text-destructive">
              ⚡ Últimas {product.stock} unidades
            </p>
          )}
        </div>

        {/* Add to cart button */}
        <button
          onClick={handleAdd}
          className={`mt-2 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-bold transition-all duration-200 ${
            added
              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
              : "btn-primary-gradient text-white"
          }`}
          aria-label={added ? "Producto agregado" : `Agregar ${product.name} al carrito`}
        >
          {added ? (
            <>
              <Check className="size-4" />
              Agregado
            </>
          ) : (
            <>
              <ShoppingCart className="size-4" />
              Agregar
            </>
          )}
        </button>
      </div>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="flex w-full flex-col rounded-2xl border border-border bg-white">
      <div className="aspect-square skeleton rounded-t-2xl" />
      <div className="flex flex-col gap-2 p-3">
        <div className="skeleton h-3 w-16 rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton mt-2 h-6 w-24 rounded" />
        <div className="skeleton mt-2 h-9 w-full rounded-full" />
      </div>
    </div>
  )
}
