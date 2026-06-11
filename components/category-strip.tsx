import Link from "next/link"
import { Pill, Sparkles, Baby, Droplets, FlaskConical, Dumbbell, ShoppingBag, User, Sun, Heart } from "lucide-react"

const categoryItems = [
  {
    name: "Medicamentos",
    icon: Pill,
    href: "/catalogo?categoria=Medicamentos",
    color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
    badge: null,
  },
  {
    name: "Dermocosmética",
    icon: Sparkles,
    href: "/catalogo?categoria=Dermocosmética",
    color: "bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white",
    badge: "Hasta 40% OFF",
  },
  {
    name: "Vitaminas",
    icon: FlaskConical,
    href: "/catalogo?categoria=Vitaminas",
    color: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white",
    badge: "2x1",
  },
  {
    name: "Bebés",
    icon: Baby,
    href: "/catalogo?categoria=Bebés",
    color: "bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white",
    badge: null,
  },
  {
    name: "Higiene Personal",
    icon: Droplets,
    href: "/catalogo?categoria=Higiene Personal",
    color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
    badge: null,
  },
  {
    name: "Cuidado Personal",
    icon: Heart,
    href: "/catalogo?categoria=Cuidado Personal",
    color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white",
    badge: null,
  },
  {
    name: "Adultos Mayores",
    icon: User,
    href: "/catalogo?categoria=Adultos Mayores",
    color: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
    badge: null,
  },
  {
    name: "Belleza",
    icon: Sun,
    href: "/catalogo?categoria=Belleza",
    color: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
    badge: "Nuevo",
  },
  {
    name: "Perfumería",
    icon: ShoppingBag,
    href: "/catalogo?categoria=Perfumería",
    color: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
    badge: null,
  },
  {
    name: "Suplementos",
    icon: Dumbbell,
    href: "/catalogo?categoria=Vitaminas",
    color: "bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white",
    badge: null,
  },
]

export function CategoryStrip() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8" aria-label="Categorías de productos">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-xl font-black text-foreground sm:text-2xl">
            Comprá por categoría
          </h2>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Encontrá lo que necesitás en segundos
          </p>
        </div>
        <Link
          href="/catalogo"
          className="shrink-0 text-sm font-semibold text-primary hover:underline"
        >
          Ver todo
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-2 sm:grid-cols-5 md:grid-cols-10">
        {categoryItems.map((cat) => {
          const Icon = cat.icon
          return (
            <Link
              key={cat.name}
              href={cat.href}
              className="group relative flex flex-col items-center gap-2 rounded-2xl border border-border bg-white p-2 text-center transition-all hover:border-primary/20 hover:shadow-md hover:-translate-y-0.5 sm:p-3"
              aria-label={`Ver categoría ${cat.name}`}
            >
              {cat.badge && (
                <span className="absolute -right-1 -top-1 z-10 rounded-full bg-accent px-1.5 py-0.5 text-[8px] font-bold text-white leading-tight">
                  {cat.badge}
                </span>
              )}
              <span className={`flex size-10 items-center justify-center rounded-xl transition-colors sm:size-12 ${cat.color}`}>
                <Icon className="size-5 sm:size-6" />
              </span>
              <span className="text-[10px] font-semibold leading-tight text-foreground sm:text-xs">
                {cat.name}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
