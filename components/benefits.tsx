import { Truck, ShieldCheck, CreditCard, Headphones, Package, Store } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Envío en el día",
    desc: "Pedidos antes de las 14hs",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Compra protegida",
    desc: "Pago 100% seguro",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: CreditCard,
    title: "Hasta 6 cuotas",
    desc: "Sin interés con Mercado Pago",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Package,
    title: "Productos originales",
    desc: "Garantía de autenticidad",
    color: "bg-violet-50 text-violet-600",
  },
  {
    icon: Store,
    title: "+300 sucursales",
    desc: "Retiro sin cargo en tienda",
    color: "bg-orange-50 text-orange-600",
  },
  {
    icon: Headphones,
    title: "Atención 24/7",
    desc: "Farmacéuticos disponibles",
    color: "bg-rose-50 text-rose-600",
  },
]

export function Benefits() {
  return (
    <section className="bg-muted/30 border-y border-border" aria-label="Beneficios de comprar en Farmacias Buchi">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col items-center gap-2.5 rounded-2xl bg-white p-4 text-center shadow-sm transition-shadow hover:shadow-md"
            >
              <span className={`flex size-12 items-center justify-center rounded-xl ${b.color}`}>
                <b.icon className="size-6" />
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{b.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
