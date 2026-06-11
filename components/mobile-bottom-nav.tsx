"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, LayoutGrid, ShoppingCart, User } from "lucide-react"
import { useCart } from "./cart-context"

const links = [
  { href: "/", icon: Home, label: "Inicio" },
  { href: "/catalogo", icon: LayoutGrid, label: "Catálogo" },
  { href: "/usuario", icon: User, label: "Mi cuenta" },
]

export function MobileBottomNav() {
  const pathname = usePathname()
  const { count, openCheckout } = useCart()

  function isActive(href: string) {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-white/98 backdrop-blur-lg md:hidden"
      aria-label="Navegación principal"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="grid h-[60px] grid-cols-4">
        {links.map(({ href, icon: Icon, label }) => {
          const active = isActive(href)
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-all duration-150 active:scale-90 ${
                active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {active && (
                <span className="absolute top-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
              <Icon className={`size-[22px] transition-transform duration-150 ${active ? "scale-110" : ""}`} />
              <span>{label}</span>
            </Link>
          )
        })}

        {/* Cart */}
        <button
          onClick={openCheckout}
          className="relative flex flex-col items-center justify-center gap-1 text-[10px] font-semibold text-muted-foreground transition-all duration-150 active:scale-90"
          aria-label={`Abrir carrito, ${count} productos`}
        >
          <span className="relative">
            <ShoppingCart className="size-[22px]" />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-accent px-[3px] text-[9px] font-black leading-none text-white shadow-sm">
                {count > 99 ? "99+" : count}
              </span>
            )}
          </span>
          <span>Carrito</span>
        </button>
      </div>
    </nav>
  )
}
