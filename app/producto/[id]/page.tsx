"use client"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Check,
  Truck,
  ShieldCheck,
  ChevronRight,
  Minus,
  Plus,
  Package,
} from "lucide-react"
import { getProductById, getRelatedProducts, formatPrice } from "@/lib/products"
import { useCart } from "@/components/cart-context"
import { useToast } from "@/components/toast"
import { ProductCard } from "@/components/product-card"

const TABS = ["Descripción", "Beneficios", "Modo de uso", "Preguntas frecuentes"] as const
type Tab = (typeof TABS)[number]

const faqItems = [
  {
    q: "¿El producto incluye factura?",
    a: "Sí, todos nuestros productos incluyen factura electrónica. La recibirás por correo electrónico después de tu compra.",
  },
  {
    q: "¿Puedo devolver el producto si no lo necesito?",
    a: "Tenés 30 días para solicitar la devolución del producto en perfectas condiciones y sin abrir. Aplicamos la Ley de Defensa del Consumidor.",
  },
  {
    q: "¿El producto es original?",
    a: "Todos los productos de Farmacias Buchi son 100% originales y adquiridos directamente de distribuidores autorizados. Garantizamos autenticidad.",
  },
  {
    q: "¿Cuánto tarda el envío?",
    a: "Para pedidos realizados antes de las 14hs, despachamos el mismo día. La entrega se realiza en 24-48hs hábiles en AMBA y 3-5 días en el interior del país.",
  },
]

const mockReviews = [
  {
    author: "María G.",
    rating: 5,
    date: "hace 2 semanas",
    text: "Excelente producto, lo uso hace años y nunca me falló. La entrega fue rapidísima.",
  },
  {
    author: "Carlos M.",
    rating: 5,
    date: "hace 1 mes",
    text: "Muy buen precio comparado con otras farmacias. Llegó en perfectas condiciones.",
  },
  {
    author: "Ana L.",
    rating: 4,
    date: "hace 1 mes",
    text: "Producto de calidad, tal como lo describe. Contento con la compra.",
  },
]

export default function ProductoPage() {
  const { id } = useParams<{ id: string }>()
  const product = getProductById(id)
  const { addItem } = useCart()
  const { toast } = useToast()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [wishlist, setWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("Descripción")

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="text-6xl" aria-hidden="true">🔍</div>
        <h1 className="text-2xl font-bold text-foreground">Producto no encontrado</h1>
        <p className="text-muted-foreground">
          El producto que buscás no existe o fue removido.
        </p>
        <Link
          href="/catalogo"
          className="rounded-full bg-primary px-6 py-3 text-sm font-bold text-white"
        >
          Ver catálogo
        </Link>
      </div>
    )
  }

  const relatedProducts = getRelatedProducts(product, 4)

  function handleAddToCart() {
    for (let i = 0; i < qty; i++) addItem(product)
    setAdded(true)
    toast(`${product.name} agregado al carrito`, "success")
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-muted/20">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary">Inicio</Link>
            <ChevronRight className="size-3.5" />
            <Link href="/catalogo" className="hover:text-primary">Catálogo</Link>
            <ChevronRight className="size-3.5" />
            <Link
              href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
              className="hover:text-primary"
            >
              {product.category}
            </Link>
            <ChevronRight className="size-3.5" />
            <span className="line-clamp-1 max-w-[200px] font-medium text-foreground">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Product main section */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Images */}
          <div className="space-y-3">
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <div className="relative flex aspect-square items-center justify-center p-8">
                {product.tag && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                    {product.tag}
                  </span>
                )}
                {product.discount && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-destructive px-2.5 py-1 text-xs font-bold text-white">
                    -{product.discount}%
                  </span>
                )}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="h-full w-full object-contain"
                  priority
                />
              </div>
            </div>
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <button
                  key={i}
                  className={`overflow-hidden rounded-xl border-2 bg-white p-2 transition-all ${i === 1 ? "border-primary shadow-sm" : "border-border hover:border-primary/50"}`}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`Vista ${i}`}
                    width={80}
                    height={80}
                    className="aspect-square w-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            {/* Brand + Name */}
            <div>
              <Link
                href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
              >
                {product.category}
              </Link>
              <h1 className="mt-1 text-2xl font-black leading-tight text-foreground sm:text-3xl">
                {product.name}
              </h1>
              <p className="mt-1 text-sm font-semibold text-muted-foreground">{product.brand}</p>
              {product.sku && (
                <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
              )}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-label="Calificación 4.8 de 5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`size-4 ${star <= 4 ? "fill-amber-400 text-amber-400" : "fill-muted text-muted-foreground"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.8</span>
              <span className="text-sm text-muted-foreground">
                ({mockReviews.length} reseñas)
              </span>
            </div>

            {/* Price */}
            <div className="rounded-2xl bg-secondary/50 p-4">
              {product.oldPrice && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                  {product.discount && (
                    <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-black text-white">
                      -{product.discount}% OFF
                    </span>
                  )}
                </div>
              )}
              <p className="mt-1 text-4xl font-black text-foreground">
                {formatPrice(product.price)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                o 6 cuotas sin interés de{" "}
                <span className="font-bold text-primary">
                  {formatPrice(Math.ceil(product.price / 6))}
                </span>
              </p>
            </div>

            {/* Stock */}
            {product.stock !== undefined && (
              <div className="flex items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    product.stock > 10
                      ? "bg-emerald-50 text-emerald-700"
                      : product.stock > 0
                      ? "bg-amber-50 text-amber-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span
                    className={`size-2 rounded-full ${
                      product.stock > 10
                        ? "bg-emerald-500"
                        : product.stock > 0
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                  />
                  {product.stock > 10
                    ? "Stock disponible"
                    : product.stock > 0
                    ? `Últimas ${product.stock} unidades`
                    : "Sin stock"}
                </span>
                <Package className="size-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Entrega en 24-48hs</span>
              </div>
            )}

            {/* Qty + Add to cart */}
            <div className="flex gap-3">
              <div className="flex items-center rounded-full border-2 border-border">
                <button
                  className="flex size-11 items-center justify-center text-foreground transition-colors hover:bg-muted"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Restar unidad"
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-10 text-center text-base font-bold">{qty}</span>
                <button
                  className="flex size-11 items-center justify-center text-foreground transition-colors hover:bg-muted"
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  aria-label="Sumar unidad"
                >
                  <Plus className="size-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-bold transition-all ${
                  added
                    ? "bg-emerald-500 text-white"
                    : "btn-primary-gradient text-white"
                }`}
                disabled={added}
              >
                {added ? (
                  <>
                    <Check className="size-5" /> Agregado al carrito
                  </>
                ) : (
                  <>
                    <ShoppingCart className="size-5" /> Agregar al carrito
                  </>
                )}
              </button>
            </div>

            {/* Wishlist + Share */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setWishlist((v) => !v)
                  toast(wishlist ? "Quitado de favoritos" : "Guardado en favoritos", "info")
                }}
                className={`flex flex-1 items-center justify-center gap-2 rounded-full border-2 py-2.5 text-sm font-semibold transition-all ${
                  wishlist
                    ? "border-rose-300 bg-rose-50 text-rose-600"
                    : "border-border text-foreground hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600"
                }`}
              >
                <Heart className={`size-4 ${wishlist ? "fill-rose-500" : ""}`} />
                {wishlist ? "En favoritos" : "Favoritos"}
              </button>
              <button
                className="flex items-center gap-2 rounded-full border-2 border-border px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-muted"
                onClick={() => toast("Enlace copiado", "success")}
              >
                <Share2 className="size-4" />
                Compartir
              </button>
            </div>

            {/* Delivery benefits */}
            <div className="space-y-2 rounded-2xl border border-border bg-white p-4">
              {[
                { icon: Truck, text: "Envío en el día con pedidos antes de las 14hs" },
                { icon: ShieldCheck, text: "Compra protegida — Pago 100% seguro" },
                { icon: Package, text: "Producto original con garantía de autenticidad" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon className="size-5 shrink-0 text-primary" />
                  <span className="text-sm text-foreground">{text}</span>
                </div>
              ))}
            </div>

            {/* Link to checkout */}
            <Link
              href="/checkout"
              className="flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold text-white shadow-md shadow-accent/20 transition-all hover:bg-accent/90 hover:shadow-lg"
            >
              Comprar ahora
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10 rounded-2xl border border-border bg-white">
          <div className="flex overflow-x-auto border-b border-border">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 px-5 py-4 text-sm font-semibold transition-colors ${
                  activeTab === tab
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === "Descripción" && (
              <div className="prose prose-sm max-w-none text-foreground">
                <p className="leading-relaxed text-muted-foreground">
                  {product.description || "Descripción no disponible para este producto."}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                  {[
                    { label: "Marca", value: product.brand },
                    { label: "Categoría", value: product.category },
                    { label: "SKU", value: product.sku || "—" },
                    { label: "Stock", value: product.stock ? `${product.stock} unidades` : "—" },
                  ].map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-muted/50 px-3 py-2">
                      <p className="text-xs text-muted-foreground">{label}</p>
                      <p className="font-semibold text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Beneficios" && (
              <ul className="space-y-3">
                {(product.benefits || ["Alta calidad garantizada", "Producto original", "Efectividad comprobada"]).map(
                  (benefit) => (
                    <li key={benefit} className="flex items-start gap-3">
                      <Check className="mt-0.5 size-5 shrink-0 text-primary" />
                      <span className="text-sm text-foreground">{benefit}</span>
                    </li>
                  ),
                )}
              </ul>
            )}

            {activeTab === "Modo de uso" && (
              <div className="rounded-xl bg-secondary/50 p-5">
                <p className="text-sm leading-relaxed text-foreground">
                  {product.usage ||
                    "Consulte las indicaciones del envase y a su médico o farmacéutico de confianza antes de usar este producto."}
                </p>
                <p className="mt-3 text-xs text-muted-foreground">
                  ⚠ Mantener fuera del alcance de los niños. Conservar en lugar fresco y seco.
                </p>
              </div>
            )}

            {activeTab === "Preguntas frecuentes" && (
              <div className="space-y-4">
                {faqItems.map((item, i) => (
                  <div key={i} className="rounded-xl border border-border p-4">
                    <p className="font-semibold text-foreground">{item.q}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{item.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-6 rounded-2xl border border-border bg-white p-6">
          <h2 className="mb-4 text-lg font-bold text-foreground">Reseñas de clientes</h2>
          <div className="mb-5 flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-black text-foreground">4.8</p>
              <div className="mt-1 flex justify-center gap-0.5">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`size-4 ${s <= 4 ? "fill-amber-400 text-amber-400" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{mockReviews.length} reseñas</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {[5, 4, 3].map((star) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="w-3 text-right text-xs text-muted-foreground">{star}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-amber-400"
                      style={{ width: star === 5 ? "70%" : star === 4 ? "25%" : "5%" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            {mockReviews.map((review, i) => (
              <div key={i} className="border-t border-border pt-4">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{review.author}</p>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="mt-1 flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`size-3.5 ${s <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <div className="mb-4 flex items-end justify-between">
              <h2 className="text-xl font-black text-foreground">Productos relacionados</h2>
              <Link
                href={`/catalogo?categoria=${encodeURIComponent(product.category)}`}
                className="text-sm font-semibold text-primary hover:underline"
              >
                Ver todos
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
