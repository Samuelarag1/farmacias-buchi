"use client"

import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight, ShoppingCart } from "lucide-react"
import { formatPrice } from "@/lib/products"
import { useCart } from "./cart-context"

export function CheckoutDrawer() {
  const {
    items,
    count,
    total,
    checkoutOpen,
    closeCheckout,
    setItemQty,
    removeItem,
  } = useCart()

  const shippingCost = total > 0 && total < 15000 ? 1800 : 0
  const grandTotal = total + shippingCost

  if (!checkoutOpen) return null

  return (
    <div className="fixed inset-0 z-[80]">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeCheckout}
        aria-label="Cerrar carrito"
      />

      {/* Drawer */}
      <aside
        className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShoppingBag className="size-5" />
            </span>
            <div>
              <h2 className="font-bold text-foreground">Mi carrito</h2>
              <p className="text-xs text-muted-foreground">
                {count === 0
                  ? "Sin productos"
                  : `${count} producto${count > 1 ? "s" : ""}`}
              </p>
            </div>
          </div>
          <button
            className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={closeCheckout}
            aria-label="Cerrar"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="flex size-20 items-center justify-center rounded-full bg-muted">
                <ShoppingCart className="size-10 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-bold text-foreground">Tu carrito está vacío</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Agregá productos para continuar con tu compra.
              </p>
              <Link
                href="/catalogo"
                onClick={closeCheckout}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary/90"
              >
                Ver catálogo <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-2xl border border-border p-3"
                >
                  <Link
                    href={`/producto/${item.id}`}
                    onClick={closeCheckout}
                    className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary/50"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-1"
                    />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                          {item.brand}
                        </p>
                        <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">
                          {item.name}
                        </p>
                      </div>
                      <button
                        className="flex size-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Quitar ${item.name}`}
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center rounded-full border border-border">
                        <button
                          className="flex size-7 items-center justify-center rounded-l-full text-foreground transition-colors hover:bg-muted"
                          onClick={() =>
                            item.qty === 1 ? removeItem(item.id) : setItemQty(item.id, item.qty - 1)
                          }
                          aria-label="Restar"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-7 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          className="flex size-7 items-center justify-center rounded-r-full text-foreground transition-colors hover:bg-muted"
                          onClick={() => setItemQty(item.id, item.qty + 1)}
                          aria-label="Sumar"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <p className="font-bold text-foreground">
                        {formatPrice(item.price * item.qty)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Totals */}
        {items.length > 0 && (
          <div className="border-t border-border bg-white px-5 py-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Envío</span>
                <span className={shippingCost === 0 ? "font-semibold text-emerald-600" : ""}>
                  {shippingCost === 0 ? "¡Gratis!" : formatPrice(shippingCost)}
                </span>
              </div>
              {shippingCost > 0 && (
                <p className="text-xs text-muted-foreground">
                  Envío gratis en compras mayores a $15.000
                </p>
              )}
              <div className="flex justify-between border-t border-border pt-2 text-base font-black text-foreground">
                <span>Total</span>
                <span>{formatPrice(grandTotal)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={closeCheckout}
              className="btn-primary-gradient mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/20"
            >
              Finalizar compra
              <ArrowRight className="size-4" />
            </Link>

            <button
              onClick={closeCheckout}
              className="mt-2.5 w-full rounded-full py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
